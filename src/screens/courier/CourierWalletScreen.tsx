import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

const MOCK_TRIPS = [
  { id: '1', date: 'Bugün, 14:20', from: 'Burger King', to: 'Barbaros Blv.', dist: '3.2 km', earn: '54.00 TL' },
  { id: '2', date: 'Bugün, 12:45', from: 'Citrus Market', to: 'Yıldız Mah.', dist: '1.5 km', earn: '32.50 TL' },
  { id: '3', date: 'Dün, 20:15', from: 'KFC', to: 'Cihannüma', dist: '4.8 km', earn: '68.00 TL' },
  { id: '4', date: 'Dün, 19:40', from: 'Pizza Hut', to: 'Dikilitaş', dist: '2.1 km', earn: '42.00 TL' },
];

export function CourierWalletScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cüzdanım</Text>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="help-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>GÜNCEL BAKİYE</Text>
          <Text style={styles.balanceValue}>2.450,75 TL</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>Bakiye Çek</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Chart Mock */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Haftalık Kazanç</Text>
            <Text style={styles.weeklyTotal}>+1.120 TL</Text>
          </View>
          <View style={styles.chartMock}>
            {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
              <View key={i} style={styles.chartColumn}>
                <View style={[styles.chartBar, { height: h }]} />
                <Text style={styles.chartDay}>{['P', 'S', 'Ç', 'P', 'C', 'Ct', 'Pz'][i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.tripsSection}>
          <Text style={styles.sectionTitle}>Teslimat Geçmişi</Text>
          {MOCK_TRIPS.map(trip => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripEarn}>{trip.earn}</Text>
              </View>
              <View style={styles.tripRoute}>
                <View style={styles.routeIcon}>
                  <View style={styles.dot} />
                  <View style={styles.line} />
                  <MaterialIcons name="location-on" size={14} color={theme.colors.primary} />
                </View>
                <View style={styles.routeDetails}>
                  <Text style={styles.tripLocation}>{trip.from}</Text>
                  <Text style={styles.tripLocation}>{trip.to}</Text>
                </View>
                <View style={styles.distBadge}>
                  <Text style={styles.distText}>{trip.dist}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  helpButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
  },
  balanceCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 32,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  withdrawText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  chartSection: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  weeklyTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.success,
  },
  chartMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  chartColumn: {
    alignItems: 'center',
    gap: 8,
  },
  chartBar: {
    width: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    opacity: 0.8,
  },
  chartDay: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  tripsSection: {
    gap: 16,
  },
  tripCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tripDate: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  tripEarn: {
    fontSize: 15,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIcon: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  line: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  routeDetails: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  tripLocation: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  distBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  distText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
});
