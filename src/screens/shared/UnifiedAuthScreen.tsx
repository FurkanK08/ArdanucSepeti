import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

export function UnifiedAuthScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const { signInWithOtp, loading } = useAuth();

  const handleSendOtp = async () => {
    if (phone.length > 5) {
      await signInWithOtp(`+90${phone}`);
      // Supabase'den kod bekleniyor simülasyonu
      alert('Kod gönderildi (Simülasyon)');
      navigation.replace('CustomerFlow');
    }
  };

  const handleGuest = () => {
    navigation.replace('CustomerFlow');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Background Decoration */}
        <View style={styles.bgGlowTopRight} />
        <View style={styles.bgGlowBottomLeft} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="restaurant" size={48} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>The Culinary Curator</Text>
            <Text style={styles.subtitle}>Welcome back to the kitchen</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.countryCodeSelector} activeOpacity={0.8}>
                <Text style={styles.countryCodeText}>+90</Text>
                <MaterialIcons name="expand-more" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              
              <TextInput
                style={styles.input}
                placeholder="555 555 5555"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={theme.colors.border}
              />
            </View>
            
            <Text style={styles.termsText}>
              Devam ederek Kullanım Koşulları ve Gizlilik Politikasını kabul etmiş olursunuz. Doğrulama için size bir kod göndereceğiz.
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.8}
              onPress={handleSendOtp}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>OTP Kodu Gönder</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR EXPLORE AS</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={styles.guestButton}
              activeOpacity={0.7}
              onPress={handleGuest}
            >
              <Text style={styles.guestButtonText}>Misafir Olarak Devam Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  container: {
    flex: 1,
  },
  bgGlowTopRight: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 384,
    height: 384,
    backgroundColor: 'rgba(169, 49, 0, 0.05)',
    borderRadius: 192,
  },
  bgGlowBottomLeft: {
    position: 'absolute',
    bottom: '25%',
    left: -100,
    width: 256,
    height: 256,
    backgroundColor: 'rgba(0, 105, 71, 0.05)',
    borderRadius: 128,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    width: '100%',
  },
  iconContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginTop: 8,
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
    maxWidth: 384,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F6',
    borderWidth: 1,
    borderColor: 'rgba(230, 190, 178, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 100,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F4F6',
    borderWidth: 1,
    borderColor: 'rgba(230, 190, 178, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginTop: 24,
    paddingHorizontal: 16,
    opacity: 0.6,
  },
  footer: {
    width: '100%',
    maxWidth: 384,
    marginTop: 48,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
    gap: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(230, 190, 178, 0.2)',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 2,
  },
  guestButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
