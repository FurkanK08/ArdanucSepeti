import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

const MOCK_ORDERS = [
  { id: '1', orderId: '#A490', date: '27 Mart, 14:20', amount: '420.00 TL', status: 'Delivered' },
  { id: '2', orderId: '#A489', date: '27 Mart, 12:45', amount: '185.50 TL', status: 'Delivered' },
  { id: '3', orderId: '#A488', date: '27 Mart, 11:30', amount: '210.00 TL', status: 'Canceled' },
  { id: '4', orderId: '#A487', date: '26 Mart, 20:15', amount: '540.00 TL', status: 'Delivered' },
  { id: '5', orderId: '#A486', date: '26 Mart, 19:40', amount: '120.00 TL', status: 'Delivered' },
  { id: '6', orderId: '#A485', date: '26 Mart, 18:20', amount: '315.00 TL', status: 'Delivered' },
  { id: '7', orderId: '#A484', date: '26 Mart, 17:10', amount: '225.00 TL', status: 'Canceled' },
];

export function OrderHistoryScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const renderOrderItem = ({ item }: { item: typeof MOCK_ORDERS[0] }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{item.orderId}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          item.status === 'Canceled' ? styles.statusBadgeCanceled : styles.statusBadgeDelivered
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'Canceled' ? styles.statusTextCanceled : styles.statusTextDelivered
          ]}>
            {item.status === 'Delivered' ? 'Teslim Edildi' : 'İptal Edildi'}
          </Text>
        </View>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.amountLabel}>Toplam Tutar</Text>
        <Text style={styles.amountValue}>{item.amount}</Text>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Sipariş Geçmişi ve Kazanç</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Bugünün Özeti</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Kazanç</Text>
              <Text style={styles.statValue}>1.245 TL</Text>
              <View style={styles.trendRow}>
                <MaterialIcons name="trending-up" size={14} color={theme.colors.success} />
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Sipariş</Text>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statSubText}>Tamamlanan</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>İptal</Text>
              <Text style={styles.statValue}>2</Text>
              <Text style={[styles.statSubText, { color: theme.colors.error }]}>%4.2 Oran</Text>
            </View>
          </View>
        </View>

        {/* History List */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Geçmiş Siparişler</Text>
          {MOCK_ORDERS.map(item => (
            <View key={item.id}>
              {renderOrderItem({ item })}
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  scrollContent: {
    padding: 16,
  },
  summaryContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  statSubText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.success,
  },
  historySection: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeDelivered: {
    backgroundColor: '#F0FDF4',
  },
  statusBadgeCanceled: {
    backgroundColor: '#FEF2F2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextDelivered: {
    color: theme.colors.success,
  },
  statusTextCanceled: {
    color: theme.colors.error,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  amountLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.primary,
  },
});
