import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export function CourierStandbyScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [online, setOnline] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={online ? "light-content" : "dark-content"} />
      
      {/* Background Map Simulation */}
      <View style={styles.mapContainer}>
        <View style={styles.mapOverlay} />
        <View style={[styles.statusIcon, online && styles.statusIconOnline]}>
          <MaterialIcons name="navigation" size={32} color="#FFF" />
        </View>
      </View>

      {/* Top Floating Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('CourierProfile')}>
          <MaterialIcons name="person" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerStats}>
          <Text style={styles.headerLabel}>HAFTALIK KAZANÇ</Text>
          <Text style={styles.headerValue}>1.450 TL</Text>
        </View>
        <TouchableOpacity style={styles.walletBtn} onPress={() => navigation.navigate('CourierWallet')}>
          <MaterialIcons name="account_balance_wallet" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Bottom Floating Card */}
      <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.sheetHandle} />
        
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>
            {online ? 'Yeni Sipariş Bekleniyor...' : 'Şu an Çevrimdışısınız'}
          </Text>
          <Text style={styles.sheetSubtitle}>
            {online ? 'Fırsatları kaçırmamak için bölge merkezinde kalın.' : 'Sipariş almaya başlamak için çevrimiçi olun.'}
          </Text>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ShiftScheduling')}>
              <MaterialIcons name="event" size={24} color={theme.colors.textSecondary} />
              <Text style={styles.actionLabel}>Vardiyalar</Text>
            </TouchableOpacity>
            <View style={styles.actionVLine} />
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ActiveDelivery')}>
              <MaterialIcons name="local-shipping" size={24} color={theme.colors.textSecondary} />
              <Text style={styles.actionLabel}>Test Aktif</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.onlineBtn, online && styles.onlineBtnActive]}
            onPress={() => setOnline(!online)}
            activeOpacity={0.9}
          >
            <MaterialIcons 
              name={online ? "power-settings-new" : "flashlight-on"} 
              size={24} 
              color="#FFF" 
            />
            <Text style={styles.onlineBtnText}>
              {online ? 'ÇEVRİMDIŞI OL' : 'ÇEVRİMİÇİ OL'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  statusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  statusIconOnline: {
    backgroundColor: theme.colors.primary,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStats: {
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  headerValue: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  walletBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  sheetContent: {
    paddingHorizontal: 24,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 32,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  actionVLine: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  onlineBtn: {
    backgroundColor: '#475569',
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  onlineBtnActive: {
    backgroundColor: theme.colors.error,
  },
  onlineBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
