import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export function VendorDashboardScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* TopAppBar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-on" size={24} color="#EA580C" />
          <Text style={styles.brandTitle}>The Culinary Curator</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=80' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dashboard Header Status */}
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.statusLabel}>KITCHEN STATUS</Text>
            <Text style={styles.statusTitle}>Live Orders</Text>
          </View>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>ONLINE</Text>
          </View>
        </View>

        {/* Order Feed */}
        <View style={styles.feedContainer}>
          
          {/* Active Incoming Order Card 1 */}
          <View style={styles.orderCard}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderIdText}>Order #A491</Text>
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              </View>
              
              <View style={styles.timeRow}>
                <MaterialIcons name="schedule" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.timeText}>Received 2m ago</Text>
              </View>

              {/* Food Items List */}
              <View style={styles.itemList}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>2×</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>Signature Wagyu Sliders</Text>
                    <Text style={styles.itemDesc}>Medium Rare, Extra Truffle Aioli</Text>
                  </View>
                </View>
                
                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>1×</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>Truffle Parmesan Fries</Text>
                    <Text style={styles.itemDesc}>Large, Side of Spicy Mayo</Text>
                  </View>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>1×</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>Wild Berry Lemonade</Text>
                    <Text style={styles.itemDesc}>Less Ice</Text>
                  </View>
                </View>
              </View>

              {/* Highlighted Customer Note */}
              <View style={styles.noteBox}>
                <MaterialIcons name="warning" size={24} color="#A16207" />
                <View style={styles.noteContent}>
                  <Text style={styles.noteLabel}>CUSTOMER NOTE</Text>
                  <Text style={styles.noteText}>SEVERE ALLERGY: NO ONIONS OR SCALLIONS IN ANY ITEM.</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons Glued to Bottom */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.declineBtn} activeOpacity={0.8}>
                <MaterialIcons name="close" size={20} color="#FFF" />
                <Text style={styles.actionText}>DECLINE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.8}>
                <MaterialIcons name="check-circle" size={20} color="#FFF" />
                <Text style={styles.actionText}>ACCEPT & PREPARE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Active Incoming Order Card 2 */}
          <View style={[styles.orderCard, { opacity: 0.9 }]}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderIdText}>Order #B212</Text>
                <View style={styles.waitingBadge}>
                  <Text style={styles.waitingBadgeText}>WAITING</Text>
                </View>
              </View>
              
              <View style={styles.timeRow}>
                <MaterialIcons name="schedule" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.timeText}>Received 5m ago</Text>
              </View>

              <View style={styles.itemList}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>1×</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>Garden Harvest Bowl</Text>
                    <Text style={styles.itemDesc}>Quinoa Base, Tahini Dressing</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.noteBox, { backgroundColor: '#FEF9C3', borderColor: '#FEF08A' }]}>
                <MaterialIcons name="info" size={24} color="#A16207" />
                <View style={styles.noteContent}>
                  <Text style={styles.noteLabel}>CUSTOMER NOTE</Text>
                  <Text style={styles.noteText}>Please leave at the door and ring the bell.</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.declineBtn, { backgroundColor: 'rgba(211, 47, 47, 0.8)' }]} activeOpacity={0.8}>
                <MaterialIcons name="close" size={20} color="#FFF" />
                <Text style={styles.actionText}>DECLINE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: 'rgba(56, 142, 60, 0.8)' }]} activeOpacity={0.8}>
                <MaterialIcons name="check-circle" size={20} color="#FFF" />
                <Text style={styles.actionText}>ACCEPT & PREPARE</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Embedded Bottom NavBar Dashboard Variant */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="dashboard" size={26} color="#C2410C" />
          <Text style={styles.navTextActive}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('StoreSettings')}>
          <MaterialIcons name="inventory" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>MENU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OrderHistory')}>
          <MaterialIcons name="receipt-long" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('StoreSettings')}>
          <MaterialIcons name="settings" size={26} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>SETTINGS</Text>
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
    color: '#111827',
    letterSpacing: -0.5,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginTop: 4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 142, 60, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.success,
  },
  feedContainer: {
    gap: 24,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    overflow: 'hidden',
    borderColor: 'rgba(230, 190, 178, 0.2)',
    borderWidth: 1,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderIdText: {
    fontSize: 36,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -1.5,
  },
  newBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  waitingBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  waitingBadgeText: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '900',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  itemList: {
    gap: 16,
    marginBottom: 32,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  itemQty: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.primary,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  noteBox: {
    backgroundColor: '#FEF9C3',
    borderWidth: 2,
    borderColor: '#FEF08A',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  noteContent: {
    flex: 1,
  },
  noteLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 1,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#713F12',
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    height: 64,
  },
  declineBtn: {
    flex: 1,
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acceptBtn: {
    flex: 2,
    backgroundColor: theme.colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.1)',
  },
  actionText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
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
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    color: theme.colors.textSecondary,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C2410C',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
