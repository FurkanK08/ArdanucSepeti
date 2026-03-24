import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

type MenuItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  soldOut: boolean;
};

const POPULAR_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Klasik Gurme Burger',
    price: '145.00 TL',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80',
    soldOut: false,
  },
  {
    id: '2',
    name: 'Avokado Fit Kase',
    price: '180.00 TL',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=120&q=80',
    soldOut: true,
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    price: '210.00 TL',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=120&q=80',
    soldOut: false,
  },
];

const DRINK_ITEMS: MenuItem[] = [
  {
    id: '4',
    name: 'Kutu Kola 330ml',
    price: '45.00 TL',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=120&q=80',
    soldOut: false,
  },
  {
    id: '5',
    name: 'Taze Sıkma Portakal',
    price: '65.00 TL',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=120&q=80',
    soldOut: false,
  },
];

export function StoreSettingsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [storeOnline, setStoreOnline] = useState(true);
  const [popularItems, setPopularItems] = useState(POPULAR_ITEMS);
  const [drinkItems, setDrinkItems] = useState(DRINK_ITEMS);

  const toggleItem = (id: string, isPopular: boolean) => {
    if (isPopular) {
      setPopularItems(prev =>
        prev.map(item => item.id === id ? { ...item, soldOut: !item.soldOut } : item)
      );
    } else {
      setDrinkItems(prev =>
        prev.map(item => item.id === id ? { ...item, soldOut: !item.soldOut } : item)
      );
    }
  };

  const renderMenuItem = (item: MenuItem, isPopular: boolean) => (
    <View key={item.id} style={[styles.menuItem, item.soldOut && styles.menuItemSoldOut]}>
      <View style={styles.menuItemLeft}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <View>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemPrice}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        <Switch
          value={item.soldOut}
          onValueChange={() => toggleItem(item.id, isPopular)}
          trackColor={{ false: '#E0E3E5', true: theme.colors.primary }}
          thumbColor="#FFF"
        />
        <Text style={[styles.soldOutLabel, item.soldOut && { color: theme.colors.primary }]}>
          Tükendi
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TopAppBar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-on" size={24} color="#EA580C" />
          <Text style={styles.brandTitle}>Citrus Market</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80' }}
          style={styles.avatar}
        />
      </View>

      {/* Master Store Kill Switch */}
      <View style={styles.killSwitchBar}>
        <TouchableOpacity
          style={[styles.killSwitchBtn, !storeOnline && styles.killSwitchBtnOff]}
          activeOpacity={0.9}
          onPress={() => setStoreOnline(prev => !prev)}
        >
          <View style={styles.killSwitchText}>
            <Text style={styles.killSwitchLabel}>MAĞAZA DURUMU</Text>
            <Text style={styles.killSwitchTitle}>{storeOnline ? 'DÜKKAN ÇEVRİMİÇİ' : 'DÜKKAN KAPALI'}</Text>
            <Text style={styles.killSwitchSubtitle}>{storeOnline ? 'Sipariş Alınıyor' : 'Sipariş Alınmıyor'}</Text>
          </View>
          <View style={styles.killSwitchIcon}>
            <MaterialIcons name="power-settings-new" size={32} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content Area: Menu Inventory */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 80) + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Menü Yönetimi Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menü Yönetimi</Text>
          <View style={styles.productCountBadge}>
            <Text style={styles.productCountText}>32 Ürün</Text>
          </View>
        </View>

        {/* Popular Items Category */}
        <View style={styles.category}>
          <Text style={styles.categoryLabel}>POPÜLER ÜRÜNLER</Text>
          <View style={styles.categoryList}>
            {popularItems.map(item => renderMenuItem(item, true))}
          </View>
        </View>

        {/* Drinks Category */}
        <View style={styles.category}>
          <Text style={styles.categoryLabel}>İÇECEKLER</Text>
          <View style={styles.categoryList}>
            {drinkItems.map(item => renderMenuItem(item, false))}
          </View>
        </View>

        {/* Floating Quick Action */}
        <View style={styles.addButtonWrapper}>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <MaterialIcons name="add-circle-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.addButtonText}>Yeni Ürün Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('VendorDashboard')}>
          <MaterialIcons name="dashboard" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="shopping-bag" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>ORDERS</Text>
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
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  killSwitchBar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  killSwitchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  killSwitchBtnOff: {
    backgroundColor: '#6B7280',
  },
  killSwitchText: {
    flex: 1,
  },
  killSwitchLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  killSwitchTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 2,
  },
  killSwitchSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  killSwitchIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 50,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  productCountBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  productCountText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  category: {
    marginBottom: 32,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#94A3B8',
    letterSpacing: 2,
    marginBottom: 16,
  },
  categoryList: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemSoldOut: {
    opacity: 0.5,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F2F4F6',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  menuItemPrice: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  menuItemRight: {
    alignItems: 'center',
    gap: 4,
  },
  soldOutLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addButtonWrapper: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8EA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: 4,
  },
});
