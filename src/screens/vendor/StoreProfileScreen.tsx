import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

const DAYS = [
  { id: '1', name: 'Pazartesi', hours: '10:00 - 22:00', active: true },
  { id: '2', name: 'Salı', hours: '10:00 - 22:00', active: true },
  { id: '3', name: 'Çarşamba', hours: '10:00 - 22:00', active: true },
  { id: '4', name: 'Perşembe', hours: '10:00 - 22:00', active: true },
  { id: '5', name: 'Cuma', hours: '10:00 - 23:00', active: true },
  { id: '6', name: 'Cumartesi', hours: '10:00 - 00:00', active: true },
  { id: '7', name: 'Pazar', hours: '12:00 - 22:00', active: false },
];

export function StoreProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [days, setDays] = useState(DAYS);
  const [storeName, setStoreName] = useState('Citrus Market');
  const [minOrder, setMinOrder] = useState('150.00');

  const toggleDay = (id: string) => {
    setDays(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

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
        <Text style={styles.headerTitle}>Mağaza Profili ve Saatler</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mağaza Bilgileri</Text>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>MAĞAZA ADI</Text>
              <TextInput
                style={styles.input}
                value={storeName}
                onChangeText={setStoreName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>MİNİMUM PAKET TUTARI (TL)</Text>
              <TextInput
                style={styles.input}
                value={minOrder}
                onChangeText={setMinOrder}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Çalışma Saatleri</Text>
          <View style={styles.daysList}>
            {days.map(day => (
              <View key={day.id} style={styles.dayRow}>
                <View style={styles.dayInfo}>
                  <Text style={[styles.dayName, !day.active && styles.textMuted]}>{day.name}</Text>
                  <TouchableOpacity style={styles.hourPicker}>
                    <Text style={[styles.hours, !day.active && styles.textMuted]}>{day.hours}</Text>
                    <MaterialIcons name="edit" size={14} color={day.active ? theme.colors.primary : '#CBD5E1'} />
                  </TouchableOpacity>
                </View>
                <Switch
                  value={day.active}
                  onValueChange={() => toggleDay(day.id)}
                  trackColor={{ false: '#E2E8F0', true: theme.colors.primary }}
                  thumbColor="#FFF"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    backgroundColor: '#F8FAFC',
  },
  daysList: {
    gap: 16,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  hourPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hours: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  textMuted: {
    color: '#CBD5E1',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
