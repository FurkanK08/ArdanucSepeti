import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export function CheckoutScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { items, itemCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const [selectedAddress, setSelectedAddress] = React.useState<any>(null);
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    
    if (!selectedAddress || !selectedPayment) {
      Alert.alert('Eksik Bilgi', 'Lütfen teslimat adresi ve ödeme yöntemi seçiniz.');
      return;
    }

    Alert.alert(
      'Siparişi Onayla',
      `Toplam: $${totalPrice.toFixed(2)}\n${itemCount} ürün sipariş edilecek.`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Siparişi Ver',
          onPress: () => {
            placeOrder(items, totalPrice, items[0].restaurantName);
            clearCart();
            navigation.navigate('MarketplaceHome');
          },
        },
      ],
    );
  };

  // === BOŞ SEPET DURUMU ===
  if (itemCount === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* TopAppBar */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="location-on" size={24} color="#EA580C" />
            <Text style={styles.brandTitle}>Citrus Market</Text>
          </View>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
              }}
              style={styles.avatarImg}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 120) }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.mainWrapper}>
            {/* Empty State Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.glowBg} />
              <View style={styles.boxShell}>
                <View style={styles.geoCircle} />
                <View style={styles.geoSquare} />
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={110}
                  color="#CBD5E1"
                  style={styles.mainIcon}
                />
                <MaterialIcons name="bakery-dining" size={28} color="#E2E8F0" style={styles.floatIconTopRight} />
                <MaterialIcons name="restaurant" size={36} color="#E2E8F0" style={styles.floatIconBotLeft} />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Sepetiniz biraz hafif görünüyor</Text>
              <Text style={styles.subtitle}>
                Hemen restoranlardan lezzetli yemekler eklemeye başlayın! Aradığınız lezzetler sadece bir tık
                uzağınızda.
              </Text>
            </View>

            <View style={styles.actionArea}>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('MarketplaceHome')}
              >
                <MaterialIcons name="explore" size={24} color="#FFF" />
                <Text style={styles.primaryBtnText}>Restoranlara Göz At</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
                <MaterialIcons name="history" size={20} color={theme.colors.textPrimary} />
                <Text style={styles.secondaryBtnText}>Önceki Siparişlerim</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chipsWrapper}>
              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <MaterialIcons name="local-pizza" size={18} color={theme.colors.textSecondary} />
                  <Text style={styles.chipText}>Pizza</Text>
                </View>
                <View style={styles.chip}>
                  <MaterialIcons name="lunch-dining" size={18} color={theme.colors.textSecondary} />
                  <Text style={styles.chipText}>Burger</Text>
                </View>
                <View style={styles.chip}>
                  <MaterialIcons name="icecream" size={18} color={theme.colors.textSecondary} />
                  <Text style={styles.chipText}>Tatlı</Text>
                </View>
                <View style={styles.chip}>
                  <MaterialIcons name="ramen-dining" size={18} color={theme.colors.textSecondary} />
                  <Text style={styles.chipText}>Uzak Doğu</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <BottomNavBar navigation={navigation} activeTab="CART" itemCount={itemCount} />
      </View>
    );
  }

  // === DOLU SEPET DURUMU ===
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sepetim</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Temizle</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Info */}
      <View style={styles.restaurantBanner}>
        <MaterialIcons name="store" size={20} color={theme.colors.primary} />
        <Text style={styles.restaurantBannerText}>{items[0].restaurantName}</Text>
      </View>

      {/* Cart Items */}
      <ScrollView
        contentContainerStyle={[styles.cartScrollContent, { paddingBottom: Math.max(insets.bottom, 180) }]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.imageUri }} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemTitle} numberOfLines={2}>{item.title}</Text>
              {item.selectedOptions && item.selectedOptions.length > 0 && (
                <Text style={styles.cartItemOptions}>
                  {item.selectedOptions.map(o => o.optionName).join(', ')}
                </Text>
              )}
              <Text style={styles.cartItemPrice}>
                ${((item.price + (item.selectedOptions?.reduce((a, b) => a + b.price, 0) || 0)) * item.quantity).toFixed(2)}
              </Text>
            </View>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <MaterialIcons
                  name={item.quantity === 1 ? 'delete-outline' : 'remove'}
                  size={18}
                  color={item.quantity === 1 ? theme.colors.error : theme.colors.textPrimary}
                />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <MaterialIcons name="add" size={18} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Delivery & Payment Selection */}
        <View style={styles.selectionSection}>
          <Text style={styles.selectionSectionLabel}>SİPARİŞ DETAYLARI</Text>
          
          <TouchableOpacity 
            style={[styles.selectorCard, selectedAddress && styles.selectorCardActive]}
            onPress={() => navigation.navigate('SavedAddresses')}
          >
            <View style={styles.selectorLeft}>
              <View style={[styles.selectorIconBg, selectedAddress && styles.selectorIconBgActive]}>
                <MaterialIcons name="location-on" size={24} color={selectedAddress ? '#FFF' : theme.colors.textSecondary} />
              </View>
              <View>
                <Text style={styles.selectorTitle}>{selectedAddress ? 'Ev Adresi' : 'Adres Seç'}</Text>
                <Text style={styles.selectorSubtitle}>{selectedAddress ? 'Bağcılar Mah. 1234. Sok...' : 'Nereye gelsin?'}</Text>
              </View>
            </View>
            {!selectedAddress && (
              <TouchableOpacity style={styles.autoSelect} onPress={(e) => { e.stopPropagation(); setSelectedAddress({id:1}); }}>
                <Text style={styles.autoSelectText}>SEÇ</Text>
              </TouchableOpacity>
            )}
            <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.selectorCard, selectedPayment && styles.selectorCardActive]}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <View style={styles.selectorLeft}>
              <View style={[styles.selectorIconBg, selectedPayment && styles.selectorIconBgActive]}>
                <MaterialIcons name="payment" size={24} color={selectedPayment ? '#FFF' : theme.colors.textSecondary} />
              </View>
              <View>
                <Text style={styles.selectorTitle}>{selectedPayment ? 'Visa **** 4242' : 'Ödeme Seç'}</Text>
                <Text style={styles.selectorSubtitle}>{selectedPayment ? 'Varsayılan Kartım' : 'Nasıl ödeyeceksiniz?'}</Text>
              </View>
            </View>
            {!selectedPayment && (
              <TouchableOpacity style={styles.autoSelect} onPress={(e) => { e.stopPropagation(); setSelectedPayment({id:1}); }}>
                <Text style={styles.autoSelectText}>SEÇ</Text>
              </TouchableOpacity>
            )}
            <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Sipariş Özeti</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ara Toplam</Text>
            <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Teslimat Ücreti</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.success }]}>Ücretsiz</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Toplam</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating CTA */}
      <View style={[styles.floatingCta, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity 
          style={[styles.placeOrderBtn, (!selectedAddress || !selectedPayment) && styles.placeOrderBtnDisabled]} 
          activeOpacity={0.9} 
          onPress={handlePlaceOrder}
          disabled={!selectedAddress || !selectedPayment}
        >
          <View style={styles.placeOrderLeft}>
            <View style={styles.placeOrderBadge}>
              <Text style={styles.placeOrderBadgeText}>{itemCount}</Text>
            </View>
            <Text style={styles.placeOrderText}>Siparişi Ver</Text>
          </View>
          <Text style={styles.placeOrderPrice}>${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// === Shared Bottom NavBar ===
function BottomNavBar({ navigation, activeTab, itemCount }: { navigation: any; activeTab: string; itemCount: number }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('MarketplaceHome')}
      >
        <MaterialIcons name="home" size={24} color={theme.colors.textSecondary} />
        <Text style={styles.navText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={activeTab === 'CART' ? styles.navItemActive : styles.navItem}
      >
        <View>
          <MaterialIcons name="shopping-cart" size={24} color={activeTab === 'CART' ? '#C2410C' : theme.colors.textSecondary} />
          {itemCount > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{itemCount}</Text>
            </View>
          )}
        </View>
        <Text style={activeTab === 'CART' ? styles.navTextActive : styles.navText}>CART</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialIcons name="person" size={24} color={theme.colors.textSecondary} />
        <Text style={styles.navText}>PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  // === HEADER ===
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#EA580C',
    letterSpacing: -0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.error,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F4F6',
    borderWidth: 2,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  // === EMPTY STATE ===
  scrollContent: {
    flexGrow: 1,
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  illustrationContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBg: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 237, 213, 0.6)',
  },
  boxShell: {
    width: 256,
    height: 256,
    backgroundColor: '#F2F4F6',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  geoCircle: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(224, 227, 229, 0.4)',
    borderRadius: 64,
  },
  geoSquare: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderWidth: 4,
    borderColor: 'rgba(224, 227, 229, 0.3)',
    borderRadius: 12,
    transform: [{ rotate: '12deg' }],
  },
  mainIcon: {
    transform: [{ rotate: '-12deg' }],
  },
  floatIconTopRight: {
    position: 'absolute',
    top: 48,
    right: 48,
  },
  floatIconBotLeft: {
    position: 'absolute',
    bottom: 64,
    left: 48,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 340,
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionArea: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 64,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
  },
  secondaryBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  chipsWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  // === DOLU SEPET ===
  restaurantBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFF7ED',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F6',
  },
  restaurantBannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  cartScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    ...theme.shadows.light,
    elevation: 2,
  },
  cartItemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginTop: 4,
  },
  cartItemOptions: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
    lineHeight: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F6',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    paddingHorizontal: 12,
  },
  // === SUMMARY ===
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    ...theme.shadows.light,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F4F6',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.primary,
  },
  // === FLOATING CTA ===
  floatingCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F2F4F6',
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 20,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  placeOrderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  placeOrderBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
  placeOrderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  placeOrderPrice: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  placeOrderBtnDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  // Selection
  selectionSection: {
    marginTop: 24,
    marginBottom: 8,
  },
  selectionSectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  selectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  selectorCardActive: {
    borderColor: 'rgba(234, 88, 12, 0.2)',
    backgroundColor: '#FFF7ED',
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  selectorIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorIconBgActive: {
    backgroundColor: theme.colors.primary,
  },
  selectorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  selectorSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  autoSelect: {
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  autoSelectText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  // === BOTTOM NAV ===
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 12,
    borderTopColor: '#F2F4F6',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
    color: '#C2410C',
    letterSpacing: 1,
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: theme.colors.error,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
