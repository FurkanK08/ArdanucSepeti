import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export function MapAddressScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [addressTitle, setAddressTitle] = useState('');
  const [buildingInfo, setBuildingInfo] = useState('');

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Background Map View */}
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 41.0082,  // Istanbul
          longitude: 28.9784,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      {/* Center Floating Pin Overlay */}
      <View style={styles.centerPinContainer} pointerEvents="none">
        <View style={styles.pinWrapper}>
          <View style={styles.pinBody}>
            <View style={styles.pinDot} />
          </View>
          <View style={styles.pinShadow} />
        </View>
      </View>

      {/* Map UI Controls */}
      <View style={[styles.mapControls, { top: Math.max(insets.top, 24) + 64 }]}>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialIcons name="my-location" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialIcons name="layers" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Top App Bar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>Citrus Market</Text>
        </View>
        <View style={styles.avatar}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      {/* Bottom Sheet Card */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.bottomSheetWrapper}
        pointerEvents="box-none"
      >
        <View style={styles.bottomSheet}>
          <View style={styles.handleBar} />
          
          <View style={styles.locationHeader}>
            <View style={styles.locationIconBg}>
              <MaterialIcons name="location-on" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.locationTextStack}>
              <Text style={styles.locationTitle}>Teslimat Adresi</Text>
              <Text style={styles.locationSubtitle}>Gülbahar, Profilo AVM, 34394 Şişli/İstanbul</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ADRES BAŞLIĞI</Text>
              <TextInput 
                style={styles.input}
                placeholder="Örn: Ev, İş, Sahil..."
                placeholderTextColor={theme.colors.textSecondary}
                value={addressTitle}
                onChangeText={setAddressTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>BİNA NO / KAPI NO</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Daire, Kat, Zil Notu vb."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={2}
                value={buildingInfo}
                onChangeText={setBuildingInfo}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Konumu Kaydet</Text>
              <MaterialIcons name="check-circle" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={{ height: Math.max(insets.bottom, 16) }} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centerPinContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinWrapper: {
    alignItems: 'center',
    transform: [{ translateY: -24 }], // half of pin size
  },
  pinBody: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 4,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  pinDot: {
    width: 16,
    height: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    transform: [{ rotate: '-45deg' }], // reverse rotation
  },
  pinShadow: {
    width: 12,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    marginTop: 8,
  },
  mapControls: {
    position: 'absolute',
    right: 24,
    gap: 16,
  },
  controlBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    padding: 4,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#D34000', // primary-container
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F4F6',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  bottomSheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 20,
  },
  handleBar: {
    width: 48,
    height: 6,
    backgroundColor: '#E0E3E5',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 32,
  },
  locationIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationTextStack: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#F2F4F6',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
