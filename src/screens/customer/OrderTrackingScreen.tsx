import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useOrder } from '../../context/OrderContext';
import { OrderStatus } from '../../types';

const STEP_CONFIG: { key: OrderStatus; icon: string; label: string }[] = [
  { key: 'PENDING', icon: 'hourglass-empty', label: 'Onay Bekleniyor' },
  { key: 'PREPARING', icon: 'restaurant-menu', label: 'Hazırlanıyor' },
  { key: 'ON_WAY', icon: 'delivery-dining', label: 'Kuryede' },
  { key: 'DELIVERED', icon: 'home', label: 'Teslim Edildi' },
];

function getStepIndex(status: OrderStatus): number {
  return STEP_CONFIG.findIndex((s) => s.key === status);
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function OrderTrackingScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const { activeOrders, orderHistory } = useOrder();
  const [rating, setRating] = React.useState(0);
  const [hasRated, setHasRated] = React.useState(false);

  // Look for the order in active first, then history
  const activeOrder = activeOrders.find(o => o.id === orderId) || orderHistory.find(o => o.id === orderId);

  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sipariş Bulunamadı</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.noActiveContainer}>
          <MaterialIcons name="error-outline" size={48} color="#CCC" />
          <Text style={styles.noActiveTitle}>Sipariş Bulunamadı</Text>
          <Text style={styles.noActiveSubtitle}>Bu sipariş numarasına ait bir kayıt görüntülenemiyor.</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('MarketplaceHome')}
          >
            <Text style={styles.browseBtnText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TopAppBar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Sipariş Detayı</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>{activeOrder.status === 'DELIVERED' ? 'GEÇMİŞ SİPARİŞ' : 'AKTİF SİPARİŞ'}</Text>
          <Text style={styles.sectionTitle}>Durumu Takip Et</Text>
        </View>

        <View style={styles.activeCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.restaurantName}>{activeOrder.restaurantName}</Text>
              <Text style={styles.orderNumber}>Sipariş #{activeOrder.id}</Text>
            </View>
            <View style={styles.statusBadge}>
              <MaterialIcons
                name="restaurant"
                size={14}
                color={activeOrder.status === 'DELIVERED' ? theme.colors.success : theme.colors.primary}
              />
              <Text style={styles.statusBadgeText}>
                {STEP_CONFIG[getStepIndex(activeOrder.status)].label.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Vertical Stepper */}
          <View style={styles.stepper}>
            {STEP_CONFIG.map((step, index) => {
              const currentIdx = getStepIndex(activeOrder.status);
              const isCompleted = index <= currentIdx;
              const isCurrent = index === currentIdx;

              return (
                <View key={step.key} style={styles.step}>
                  {/* Connector Line */}
                  {index < STEP_CONFIG.length - 1 && (
                    <View
                      style={[
                        styles.connectorLine,
                        isCompleted && index < currentIdx && styles.connectorLineActive,
                      ]}
                    />
                  )}
                  {/* Step Icon */}
                  <View
                    style={[
                      styles.stepIcon,
                      isCompleted && styles.stepIconActive,
                      isCurrent && styles.stepIconHighlight,
                    ]}
                  >
                    {isCompleted && !isCurrent ? (
                      <MaterialIcons name="check" size={14} color="#FFF" />
                    ) : (
                      <MaterialIcons
                        name={step.icon as any}
                        size={14}
                        color={isCompleted ? '#FFF' : '#999'}
                      />
                    )}
                  </View>
                  {/* Step Text */}
                  <View style={styles.stepText}>
                    <Text
                      style={[
                        styles.stepTitle,
                        !isCompleted && styles.stepTitleInactive,
                        isCurrent && { color: theme.colors.success },
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={[styles.stepSubtitle, !isCompleted && styles.stepSubtitleInactive]}>
                      {isCompleted
                        ? isCurrent
                          ? 'Şu an bu aşamada'
                          : `${formatDate(activeOrder.createdAt)} tamamlandı`
                        : 'Bekleniyor'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Order Total */}
          <View style={styles.orderTotalRow}>
            <Text style={styles.orderTotalLabel}>Sipariş Toplamı</Text>
            <Text style={styles.orderTotalValue}>${activeOrder.totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Rating Section - Only for Delivered Orders */}
        {activeOrder.status === 'DELIVERED' && !hasRated && (
          <View style={styles.ratingCard}>
            <Text style={styles.ratingTitle}>Siparişi Değerlendir</Text>
            <Text style={styles.ratingSubtitle}>Deneyiminizi paylaşarak diğer kullanıcılarımıza yardımcı olun.</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setRating(s)}>
                  <MaterialIcons 
                    name={s <= rating ? "star" : "star-border"} 
                    size={40} 
                    color={s <= rating ? "#FACC15" : "#CBD5E1"} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.submitRatingBtn, rating === 0 && styles.disabledBtn]} 
              disabled={rating === 0}
              onPress={() => {
                setHasRated(true);
                alert('Değerlendirmeniz için teşekkürler!');
              }}
            >
              <Text style={styles.submitRatingText}>Değerlendirmeyi Gönder</Text>
            </TouchableOpacity>
          </View>
        )}

        {hasRated && (
          <View style={styles.successCard}>
            <MaterialIcons name="check-circle" size={48} color={theme.colors.success} />
            <Text style={styles.successText}>Değerlendirmeniz alındı!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  // === SECTION HEADER ===
  sectionHeader: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -1,
  },
  // === ACTIVE CARD ===
  activeCard: {
    backgroundColor: '#FFF',
    borderRadius: theme.radius.md,
    padding: 24,
    marginBottom: 40,
    ...theme.shadows.light,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  orderNumber: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: 'rgba(56, 142, 60, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.success,
    letterSpacing: 0.5,
  },
  // === STEPPER ===
  stepper: {
    paddingLeft: 4,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 36,
    gap: 16,
    position: 'relative',
  },
  connectorLine: {
    position: 'absolute',
    left: 11,
    top: 24,
    bottom: -12,
    width: 2,
    backgroundColor: '#F0F0F0',
  },
  connectorLineActive: {
    backgroundColor: theme.colors.success,
  },
  stepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepIconActive: {
    backgroundColor: theme.colors.success,
  },
  stepIconHighlight: {
    shadowColor: theme.colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  stepTitleInactive: {
    color: '#AAA',
  },
  stepSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  stepSubtitleInactive: {
    color: '#CCC',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F6',
  },
  orderTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  orderTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  // === NO ACTIVE ORDER ===
  noActiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
  noActiveTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  noActiveSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  browseBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  browseBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Rating
  ratingCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: theme.radius.md,
    ...theme.shadows.light,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  submitRatingBtn: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitRatingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledBtn: {
    backgroundColor: '#E2E8F0',
  },
  successCard: {
    backgroundColor: '#FFF',
    padding: 32,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    ...theme.shadows.light,
  },
  successText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});
