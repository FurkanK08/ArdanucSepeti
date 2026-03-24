import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const DUMMY_ADDRESSES = [
  { id: '1', title: 'Ev', address: 'Bağcılar Mah. 1234. Sokak, No:5, Daire:10, Ankara', icon: 'home' },
  { id: '2', title: 'İş', address: 'Levent-4, Sabancı Towers, K:12, İstanbul', icon: 'business' },
];

export function SavedAddressesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adreslerim</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {DUMMY_ADDRESSES.map((item) => (
          <TouchableOpacity key={item.id} style={styles.addressCard}>
            <View style={styles.iconBg}>
              <MaterialIcons name={item.icon as any} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>{item.title}</Text>
              <Text style={styles.addressDetail}>{item.address}</Text>
            </View>
            <MaterialIcons name="edit" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('MapAddress')}
        >
          <MaterialIcons name="add-location-alt" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Yeni Adres Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.textPrimary },
  backButton: { padding: 8, marginLeft: -8 },
  scrollContent: { padding: theme.spacing.lg },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addressInfo: { flex: 1 },
  addressTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 4 },
  addressDetail: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
