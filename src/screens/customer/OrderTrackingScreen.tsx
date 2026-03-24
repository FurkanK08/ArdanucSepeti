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

const RECENT_HISTORY = [
  {
    id: '1',
    name: 'Napoli Pizzeria',
    date: 'OCT 12, 2023',
    price: '$32.40',
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    date: 'OCT 08, 2023',
    price: '$45.12',
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Urban Grill',
    date: 'OCT 03, 2023',
    price: '$19.95',
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
  },
];

export function OrderTrackingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-on" size={24} color={theme.colors.primary} />
          <Text style={styles.brandTitle}>The Culinary Curator</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="settings" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Order Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>ACTIVE ORDER</Text>
          <Text style={styles.sectionTitle}>Track Status</Text>
        </View>

        {/* Active Order Card */}
        <View style={styles.activeCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.restaurantName}>L'Artisan Brasserie</Text>
              <Text style={styles.orderNumber}>Order #CUR-8829</Text>
            </View>
            <View style={styles.statusBadge}>
              <MaterialIcons name="restaurant" size={14} color={theme.colors.success} />
              <Text style={styles.statusBadgeText}>PREPARING</Text>
            </View>
          </View>

          {/* Vertical Stepper */}
          <View style={styles.stepper}>
            <View style={styles.stepperLine} />
            <View style={[styles.stepperLine, styles.stepperLineActive]} />

            {/* Step 1 */}
            <View style={styles.step}>
              <View style={[styles.stepIcon, styles.stepIconActive]}>
                <MaterialIcons name="check" size={14} color="#FFF" />
              </View>
              <View style={styles.stepText}>
                <Text style={styles.stepTitle}>Waiting Approval</Text>
                <Text style={styles.stepSubtitle}>Confirmed at 12:45 PM</Text>
              </View>
            </View>

            {/* Step 2 */}
            <View style={styles.step}>
              <View style={[styles.stepIcon, styles.stepIconActive, styles.stepIconHighlight]}>
                <MaterialIcons name="restaurant-menu" size={14} color="#FFF" />
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, { color: theme.colors.success }]}>Preparing</Text>
                <Text style={[styles.stepSubtitle, { fontWeight: '500' }]}>The chef is crafting your meal</Text>
              </View>
            </View>

            {/* Step 3 */}
            <View style={styles.step}>
              <View style={styles.stepIcon}>
                <MaterialIcons name="delivery-dining" size={14} color="#999" />
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, styles.stepTitleInactive]}>Courier On Way</Text>
                <Text style={styles.stepSubtitleInactive}>Awaiting pick-up</Text>
              </View>
            </View>

            {/* Step 4 */}
            <View style={styles.step}>
              <View style={styles.stepIcon}>
                <MaterialIcons name="home" size={14} color="#999" />
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, styles.stepTitleInactive]}>Delivered</Text>
                <Text style={styles.stepSubtitleInactive}>Est. 1:20 PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent History Section */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <h3 style={styles.historyTitle}>Recent History</h3>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyList}>
            {RECENT_HISTORY.map((item) => (
              <TouchableOpacity key={item.id} style={styles.historyItem} activeOpacity={0.7}>
                <View style={styles.historyItemLeft}>
                  <Image source={{ uri: item.image }} style={styles.historyImage} />
                  <View>
                    <Text style={styles.historyName}>{item.name}</Text>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.historyItemRight}>
                  <Text style={styles.historyPrice}>{item.price}</Text>
                  <Text style={styles.historyStatus}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MarketplaceHome')}>
          <MaterialIcons name="home" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="receipt-long" size={24} color={theme.colors.primary} />
          <Text style={styles.navTextActive}>ORDERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEE',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100,
  },
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
  stepper: {
    paddingLeft: 4,
  },
  stepperLine: {
    position: 'absolute',
    left: 15,
    top: 10,
    bottom: 10,
    width: 2,
    backgroundColor: '#F0F0F0',
  },
  stepperLineActive: {
    height: '33.3%',
    backgroundColor: theme.colors.success,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 40,
    gap: 16,
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
  historySection: {
    marginBottom: 32,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    backgroundColor: '#F2F4F6',
    borderRadius: theme.radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  historyName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  historyDate: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  historyItemRight: {
    alignItems: 'flex-end',
  },
  historyPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  historyStatus: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.success,
    marginTop: 2,
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
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 79, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
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
