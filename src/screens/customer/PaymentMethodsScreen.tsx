import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const DUMMY_CARDS = [
  { id: '1', title: 'Visa **** 4242', brand: 'Visa', last4: '4242' },
  { id: '2', title: 'Mastercard **** 8080', brand: 'Mastercard', last4: '8080' },
];

export function PaymentMethodsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödeme Yöntemlerim</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {DUMMY_CARDS.map((card) => (
          <TouchableOpacity key={card.id} style={styles.cardItem}>
            <View style={styles.iconBg}>
              <MaterialIcons name="credit-card" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardStatus}>Aktif</Text>
            </View>
            <MaterialIcons name="delete-outline" size={22} color={theme.colors.error} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => alert('Kart Ekleme Fonksiyonu')}
        >
          <MaterialIcons name="add-card" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Yeni Kart Ekle</Text>
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
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 2 },
  cardStatus: { fontSize: 12, color: theme.colors.success, fontWeight: '600' },
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
