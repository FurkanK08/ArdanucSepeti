import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { DeliveryIssueModal } from '../../components/courier/DeliveryIssueModal';

const { width } = Dimensions.get('window');

export function ActiveDeliveryScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [status, setStatus] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Map Simulation */}
      <View style={styles.mapContainer}>
        <View style={styles.mapMock}>
          <MaterialIcons name="navigation" size={40} color={theme.colors.primary} style={{ transform: [{ rotate: '45deg' }] }} />
        </View>
      </View>

      {/* Header Info */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.orderId}>Sipariş #A491</Text>
          <Text style={styles.timeLabel}>Teslimata Kalan: 12 dk</Text>
        </View>
        <TouchableOpacity style={styles.issueBtn} onPress={() => setIssueModalVisible(true)}>
          <MaterialIcons name="report-problem" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>

      {/* Draggable-like Content Card */}
      <View style={[styles.contentCard, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.handle} />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Status Progress */}
          <View style={styles.progressRow}>
            <View style={[styles.progressStep, styles.stepActive]}>
              <MaterialIcons name="restaurant" size={20} color="#FFF" />
            </View>
            <View style={[styles.progressLine, status === 'DELIVERY' && styles.lineActive]} />
            <View style={[styles.progressStep, status === 'DELIVERY' && styles.stepActive]}>
              <MaterialIcons name="person-pin-circle" size={20} color={status === 'DELIVERY' ? "#FFF" : "#94A3B8"} />
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.addressBlock}>
              <Text style={styles.label}>{status === 'PICKUP' ? 'ALINACAK RESTORAN' : 'TESLİMAT ADRESİ'}</Text>
              <Text style={styles.title}>{status === 'PICKUP' ? 'The Culinary Curator' : 'Zühtüpaşa Mah. Şükrü S.'}</Text>
              <Text style={styles.subtitle}>Kadıköy, İstanbul</Text>
            </View>

            <View style={styles.itemSummary}>
              <Text style={styles.label}>PAKET İÇERİĞİ</Text>
              <Text style={styles.summaryText}>2x Wagyu Sliders, 1x Fries, 1x Lemonade</Text>
            </View>

            {status === 'DELIVERY' && (
              <View style={styles.customerAction}>
                <TouchableOpacity style={styles.contactBtn}>
                  <MaterialIcons name="phone" size={20} color={theme.colors.primary} />
                  <Text style={styles.contactText}>Müşteriyi Ara</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactBtn}>
                  <MaterialIcons name="chat" size={20} color={theme.colors.primary} />
                  <Text style={styles.contactText}>Mesaj Gönder</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={styles.mainActionBtn}
            onPress={() => {
              if (status === 'PICKUP') setStatus('DELIVERY');
              else navigation.goBack();
            }}
          >
            <Text style={styles.mainActionText}>
              {status === 'PICKUP' ? 'PAKETİ ALDIM' : 'TESLİM EDİLDİ OLARAK İŞARETLE'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <DeliveryIssueModal 
        visible={issueModalVisible} 
        onClose={() => setIssueModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#E2E8F0',
  },
  mapMock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  issueBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -40,
    flex: 1,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  progressStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: theme.colors.primary,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#F1F5F9',
    marginHorizontal: -5,
    zIndex: -1,
  },
  lineActive: {
    backgroundColor: theme.colors.primary,
  },
  detailsContainer: {
    gap: 24,
    marginBottom: 32,
  },
  addressBlock: {
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  itemSummary: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    gap: 4,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  customerAction: {
    flexDirection: 'row',
    gap: 12,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF7ED',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  contactText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  mainActionBtn: {
    backgroundColor: theme.colors.primary,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  mainActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
