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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';

function formatHistoryDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const months = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { orderHistory } = useOrder();
  const { itemCount } = useCart();

  const MENU_ITEMS = [
    { id: '1', title: 'My Addresses', icon: 'location-on', description: 'Manage your delivery locations', screen: 'SavedAddresses' },
    { id: '2', title: 'Payment Methods', icon: 'payment', description: 'Saved cards and wallet', screen: 'PaymentMethods' },
    { id: '3', title: 'Notifications', icon: 'notifications-none', description: 'Preferences and alerts' },
    { id: '4', title: 'Language', icon: 'language', description: 'English (US)' },
    { id: '5', title: 'Help & Support', icon: 'help-outline', description: 'FAQs and live chat' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Editorial Header Background */}
      <View style={styles.headerBg} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card / Identity */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <MaterialIcons name="edit" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Ardanuç Yılmaz</Text>
          <Text style={styles.userEmail}>ardanucyilmaz@example.com</Text>
        </View>

        {/* Stats Row - Asymmetrical Editorial Look */}
        <View style={styles.statsRow}>
          <View style={[styles.statItem, styles.statItemLarge]}>
            <Text style={styles.statValue}>{orderHistory.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statsColumn}>
            <View style={[styles.statItem, styles.statItemSmall]}>
              <Text style={styles.statValueSmall}>1.2k</Text>
              <Text style={styles.statLabelSmall}>Points</Text>
            </View>
            <View style={[styles.statItem, styles.statItemSmall, { backgroundColor: '#FFF7ED' }]}>
              <Text style={[styles.statValueSmall, { color: theme.colors.primary }]}>5</Text>
              <Text style={styles.statLabelSmall}>Coupons</Text>
            </View>
          </View>
        </View>

        {/* Order History */}
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.menuSectionTitle}>GEÇMİŞ SİPARİŞLERİM</Text>
            {orderHistory.length > 3 && (
              <TouchableOpacity>
                <Text style={styles.viewAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            )}
          </View>

          {orderHistory.length === 0 ? (
            <View style={styles.emptyHistory}>
              <MaterialIcons name="history" size={24} color="#CCC" />
              <Text style={styles.emptyHistoryText}>Henüz geçmiş siparişiniz yok.</Text>
            </View>
          ) : (
            <View style={styles.historyList}>
              {orderHistory.slice(0, 3).map((order) => (
                <TouchableOpacity 
                  key={order.id} 
                  style={styles.historyItem}
                  onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
                >
                  <View style={styles.historyIconBg}>
                    <MaterialIcons name="storefront" size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyRestaurant}>{order.restaurantName}</Text>
                    <Text style={styles.historyDate}>{formatHistoryDate(order.createdAt)} • {order.items.length} Ürün</Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyPrice}>${order.totalPrice.toFixed(2)}</Text>
                    <Text style={styles.historyStatus}>TESLİM EDİLDİ</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>ACCOUNT SETTINGS</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem} 
              activeOpacity={0.7}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.menuIconBg}>
                <MaterialIcons name={item.icon as any} size={22} color={theme.colors.textPrimary} />
              </View>
              <View style={styles.menuTextContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDesc}>{item.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Area */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.9}>
            <MaterialIcons name="logout" size={20} color="#FFF" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Citrus Market v1.0.4 (Editorial Edition)</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 8 || 24 }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MarketplaceHome')}>
          <MaterialIcons name="home" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Checkout')}>
          <View>
            <MaterialIcons name="shopping-cart" size={26} color={theme.colors.textSecondary} />
            {itemCount > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.navText}>CART</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="person" size={26} color={theme.colors.primary} />
          <Text style={styles.navTextActive}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB', // surface
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 64,
    borderBottomRightRadius: 64,
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -1,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  statItem: {
    padding: 20,
    borderRadius: 24,
    justifyContent: 'center',
  },
  statItemLarge: {
    flex: 1.2,
    backgroundColor: '#191C1E', // on-surface
  },
  statsColumn: {
    flex: 1,
    gap: 16,
  },
  statItemSmall: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  statValueSmall: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  statLabelSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuContainer: {
    marginBottom: 48,
  },
  menuSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1.5,
    marginBottom: 24,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  menuItemDesc: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    gap: 12,
    width: '100%',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  versionText: {
    fontSize: 11,
    color: '#CCC',
    marginTop: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F6',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: 4,
    letterSpacing: 0.5,
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
  historyContainer: {
    marginBottom: 40,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 24,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  historyIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyRestaurant: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  historyDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  historyStatus: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.success,
    marginTop: 4,
  },
  emptyHistory: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyHistoryText: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
    fontWeight: '500',
  },
});
