import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { RestaurantCard } from '../../components/customer/RestaurantCard';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

const CATEGORIES = ['All', 'Burger', 'Pizza', 'Kebab', 'Sushi', 'Desserts'];

const RESTAURANTS = [
  {
    id: '1',
    title: 'The Burger Bastion',
    minOrder: 'Minimum 150 TL',
    deliveryTime: 'Delivery 30 min',
    rating: '4.8',
    imageUri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    logoUri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=150&auto=format&fit=crop',
    categories: ['Burger'],
  },
  {
    id: '2',
    title: 'Stone Fire Pizza',
    minOrder: 'Minimum 200 TL',
    deliveryTime: 'Delivery 45 min',
    rating: '4.5',
    imageUri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    logoUri: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=150&auto=format&fit=crop',
    categories: ['Pizza'],
  },
  {
    id: '3',
    title: 'Kyoto Sushi Bar',
    minOrder: 'Minimum 300 TL',
    deliveryTime: 'Delivery 50 min',
    rating: '4.9',
    imageUri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    logoUri: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=150&auto=format&fit=crop',
    categories: ['Sushi'],
  },
  {
    id: '4',
    title: 'Kebab Kingdom',
    minOrder: 'Minimum 180 TL',
    deliveryTime: 'Delivery 25 min',
    rating: '4.7',
    imageUri: 'https://images.unsplash.com/photo-1561651823-34fed022510d?q=80&w=800&auto=format&fit=crop',
    logoUri: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=150&auto=format&fit=crop',
    categories: ['Kebab'],
  },
];

export function MarketplaceHomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const { itemCount } = useCart();
  const { activeOrders } = useOrder();

  const filteredRestaurants = RESTAURANTS.filter(rest => {
    const matchesSearch = rest.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || rest.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-pin" size={24} color={theme.colors.primary} />
          <View>
            <Text style={styles.deliveryLabel}>DELIVERING TO</Text>
            <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7} onPress={() => navigation.navigate('MapAddress')}>
              <Text style={styles.locationText}>Home - Ardanuç</Text>
              <MaterialIcons name="expand-more" size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for flavors, restaurants..."
              placeholderTextColor={theme.colors.textSecondary}
              cursorColor={theme.colors.primary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Active Orders Widget */}
        {activeOrders.length > 0 && (
          <View style={styles.activeOrdersContainer}>
            <Text style={styles.activeOrdersTitle}>Aktif Siparişlerim</Text>
            {activeOrders.map(order => (
              <TouchableOpacity 
                key={order.id} 
                style={styles.activeOrderCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
              >
                <View style={styles.activeOrderLeft}>
                  <View style={styles.activeOrderIcon}>
                    <MaterialIcons name="local-shipping" size={20} color={theme.colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.activeOrderRestaurant}>{order.restaurantName}</Text>
                    <Text style={styles.activeOrderStatus}>Sipariş #{order.id} • {order.status}</Text>
                  </View>
                </View>
                <MaterialIcons name="navigate-next" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Featured Header */}
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>Midnight Cravings</Text>
          <Text style={styles.featuredSubtitle}>Top picks for your late-night hunger</Text>
        </View>

        {/* Restaurant Feed */}
        <View style={styles.feedContainer}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((rest) => (
              <RestaurantCard 
                key={rest.id}
                title={rest.title}
                imageUri={rest.imageUri}
                logoUri={rest.logoUri}
                minOrder={rest.minOrder}
                deliveryTime={rest.deliveryTime}
                rating={rest.rating}
                onPress={() => navigation.navigate('RestaurantMenu', { 
                  restaurantId: rest.id,
                  restaurantName: rest.title 
                })}
              />
            ))
          ) : (
            <View style={styles.emptyResults}>
              <MaterialIcons name="search-off" size={64} color="#CBD5E1" />
              <Text style={styles.emptyResultsText}>No restaurants found</Text>
              <TouchableOpacity 
                style={styles.clearFiltersBtn}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Embedded Bottom NavBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="home" size={24} color="#C2410C" />
          <Text style={styles.navTextActive}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Checkout')}>
          <View>
            <MaterialIcons name="shopping-cart" size={24} color={theme.colors.textSecondary} />
            {itemCount > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.navText}>CART</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB', // surface bright
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deliveryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECEEF0',
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 130, // Spacing for Bottom nav and FAB
  },
  searchSection: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F6', // surface-container-low
    borderRadius: 16,
  },
  searchIcon: {
    paddingLeft: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  categoryChipActive: {
    backgroundColor: '#D34000', // primary-container
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  categoryTextActive: {
    color: '#FFF',
    fontWeight: '800',
  },
  featuredHeader: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  feedContainer: {
    paddingHorizontal: 24,
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
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
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
  activeOrdersContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  activeOrdersTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  activeOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED', // very light orange
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(234, 88, 12, 0.1)',
  },
  activeOrderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeOrderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOrderRestaurant: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  activeOrderStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyResultsText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginTop: 16,
  },
  clearFiltersBtn: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F2F4F6',
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
