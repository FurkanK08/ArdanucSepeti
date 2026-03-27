import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export function CourierProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [vehicleType, setVehicleType] = useState('Motorcycle');
  const [name, setName] = useState('Ahmet Kurye');
  const [plate, setPlate] = useState('34 ABC 123');

  const VEHICLES = [
    { id: 'Motorcycle', icon: 'ebike', label: 'Motosiklet' },
    { id: 'Bicycle', icon: 'directions-bike', label: 'Bisiklet' },
    { id: 'Car', icon: 'directions-car', label: 'Araba' },
  ];

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
        <Text style={styles.headerTitle}>Profil Ayarları</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80' }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <MaterialIcons name="camera-alt" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userStatus}>Aktif Kurye</Text>
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>KİŞİSEL BİLGİLER</Text>
          <View style={styles.inputGroup}>
            <MaterialIcons name="person-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ad Soyad"
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialIcons name="phone-iphone" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.input}
              value="0532 000 00 00"
              keyboardType="phone-pad"
              placeholder="Telefon Numarası"
            />
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ARAÇ BİLGİLERİ</Text>
          <View style={styles.vehicleSelector}>
            {VEHICLES.map(v => (
              <TouchableOpacity 
                key={v.id}
                style={[styles.vehicleCard, vehicleType === v.id && styles.vehicleCardActive]}
                onPress={() => setVehicleType(v.id)}
              >
                <MaterialIcons 
                  name={v.icon as any} 
                  size={24} 
                  color={vehicleType === v.id ? theme.colors.primary : theme.colors.textSecondary} 
                />
                <Text style={[styles.vehicleLabel, vehicleType === v.id && styles.vehicleLabelActive]}>
                  {v.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.inputGroup, { marginTop: 16 }]}>
            <MaterialIcons name="badge" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.input}
              value={plate}
              onChangeText={setPlate}
              placeholder="Plaka No"
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Güncelle</Text>
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
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E2E8F0',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  userStatus: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.success,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  vehicleSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  vehicleCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#FFF7ED',
  },
  vehicleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  vehicleLabelActive: {
    color: theme.colors.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.error,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
