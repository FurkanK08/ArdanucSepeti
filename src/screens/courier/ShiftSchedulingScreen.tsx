import React, { useState } from 'react';
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

const DATES = [
  { id: '1', day: 'Pzt', date: '27', full: '27 Mart Pazartesi' },
  { id: '2', day: 'Sal', date: '28', full: '28 Mart Salı' },
  { id: '3', day: 'Çar', date: '29', full: '29 Mart Çarşamba' },
  { id: '4', day: 'Per', date: '30', full: '30 Mart Perşembe' },
  { id: '5', day: 'Cum', date: '31', full: '31 Mart Cuma' },
];

const SHIFTS = [
  { id: 's1', time: '12:00 - 14:00', demand: 'Yüksek', color: '#EA580C', booked: false },
  { id: 's2', time: '14:00 - 16:00', demand: 'Normal', color: '#94A3B8', booked: true },
  { id: 's3', time: '18:00 - 20:00', demand: 'Yüksek', color: '#EA580C', booked: false },
  { id: 's4', time: '20:00 - 22:00', demand: 'Normal', color: '#94A3B8', booked: false },
];

export function ShiftSchedulingScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState('1');
  const [selectedZone, setSelectedZone] = useState('Beşiktaş');

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
        <Text style={styles.headerTitle}>Vardiya ve Bölge</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Zone Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ÇALIŞMA BÖLGESİ</Text>
          <TouchableOpacity style={styles.zoneSelector}>
            <MaterialIcons name="map" size={20} color={theme.colors.primary} />
            <Text style={styles.zoneName}>{selectedZone}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesList}>
            {DATES.map(d => (
              <TouchableOpacity 
                key={d.id}
                style={[styles.dateCard, selectedDate === d.id && styles.dateCardActive]}
                onPress={() => setSelectedDate(d.id)}
              >
                <Text style={[styles.dayText, selectedDate === d.id && styles.dateTextActive]}>{d.day}</Text>
                <Text style={[styles.dateText, selectedDate === d.id && styles.dateTextActive]}>{d.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Shift List */}
        <View style={styles.shiftsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{DATES.find(d => d.id === selectedDate)?.full}</Text>
          </View>
          
          <View style={styles.shiftsList}>
            {SHIFTS.map(shift => (
              <View key={shift.id} style={styles.shiftCard}>
                <View style={styles.shiftInfo}>
                  <Text style={styles.shiftTime}>{shift.time}</Text>
                  <View style={[styles.demandBadge, { backgroundColor: shift.color + '15' }]}>
                    <View style={[styles.demandDot, { backgroundColor: shift.color }]} />
                    <Text style={[styles.demandText, { color: shift.color }]}>{shift.demand} Talep</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.bookBtn, shift.booked && styles.bookBtnDisabled]}
                  disabled={shift.booked}
                >
                  <Text style={[styles.bookBtnText, shift.booked && styles.bookBtnTextDisabled]}>
                    {shift.booked ? 'Dolu' : 'Vardiya Al'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  zoneSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  zoneName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  dateSection: {
    marginBottom: 24,
  },
  datesList: {
    gap: 12,
  },
  dateCard: {
    backgroundColor: '#FFF',
    width: 64,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateCardActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  dateTextActive: {
    color: '#FFF',
  },
  shiftsSection: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  shiftsList: {
    gap: 16,
  },
  shiftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  shiftInfo: {
    gap: 6,
  },
  shiftTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  demandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
    alignSelf: 'flex-start',
  },
  demandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  demandText: {
    fontSize: 10,
    fontWeight: '800',
  },
  bookBtn: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  bookBtnDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  bookBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  bookBtnTextDisabled: {
    color: '#94A3B8',
  },
});
