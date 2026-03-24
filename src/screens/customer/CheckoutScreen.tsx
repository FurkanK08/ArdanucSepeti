import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export function CheckoutScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* TopAppBar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-on" size={24} color="#EA580C" />
          <Text style={styles.brandTitle}>Citrus Market</Text>
        </View>
        <View style={styles.avatar}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      {/* Main Content Canvas */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 120) }]} showsVerticalScrollIndicator={false} bounces={true}>
        
        <View style={styles.mainWrapper}>
          {/* Empty State Illustration Shell */}
          <View style={styles.illustrationContainer}>
            {/* Background Glow */}
            <View style={styles.glowBg} />
            
            <View style={styles.boxShell}>
              {/* Geometric elements inside box */}
              <View style={styles.geoCircle} />
              <View style={styles.geoSquare} />
              
              <MaterialCommunityIcons 
                name="shopping-outline" 
                size={110} 
                color="#CBD5E1" 
                style={styles.mainIcon}
              />

              <MaterialIcons name="bakery-dining" size={28} color="#E2E8F0" style={styles.floatIconTopRight} />
              <MaterialIcons name="restaurant" size={36} color="#E2E8F0" style={styles.floatIconBotLeft} />
            </View>
          </View>

          {/* Typography Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Sepetiniz biraz hafif görünüyor</Text>
            <Text style={styles.subtitle}>
              Hemen restoranlardan lezzetli yemekler eklemeye başlayın! Aradığınız lezzetler sadece bir tık uzağınızda.
            </Text>
          </View>

          {/* Action Area */}
          <View style={styles.actionArea}>
            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9} onPress={() => navigation.navigate('MarketplaceHome')}>
              <MaterialIcons name="explore" size={24} color="#FFF" />
              <Text style={styles.primaryBtnText}>Restoranlara Göz At</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
              <MaterialIcons name="history" size={20} color={theme.colors.textPrimary} />
              <Text style={styles.secondaryBtnText}>Önceki Siparişlerim</Text>
            </TouchableOpacity>
          </View>

          {/* Suggestion Chips */}
          <View style={styles.chipsWrapper}>
            <View style={styles.chipRow}>
              <View style={styles.chip}><MaterialIcons name="local-pizza" size={18} color={theme.colors.textSecondary} /><Text style={styles.chipText}>Pizza</Text></View>
              <View style={styles.chip}><MaterialIcons name="lunch-dining" size={18} color={theme.colors.textSecondary} /><Text style={styles.chipText}>Burger</Text></View>
              <View style={styles.chip}><MaterialIcons name="icecream" size={18} color={theme.colors.textSecondary} /><Text style={styles.chipText}>Tatlı</Text></View>
              <View style={styles.chip}><MaterialIcons name="ramen-dining" size={18} color={theme.colors.textSecondary} /><Text style={styles.chipText}>Uzak Doğu</Text></View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Embedded Bottom NavBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MarketplaceHome')}>
          <MaterialIcons name="home" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="shopping-bag" size={24} color="#C2410C" />
          <Text style={styles.navTextActive}>ORDERS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.navText}>PROFILE</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#EA580C', 
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F4F6',
    borderWidth: 2,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  illustrationContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBg: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 237, 213, 0.6)', // orange-100 equivalent with opacity
  },
  boxShell: {
    width: 256,
    height: 256,
    backgroundColor: '#F2F4F6', // surface-container-low
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  geoCircle: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(224, 227, 229, 0.4)', // surface-container-highest
    borderRadius: 64,
  },
  geoSquare: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderWidth: 4,
    borderColor: 'rgba(224, 227, 229, 0.3)',
    borderRadius: 12,
    transform: [{ rotate: '12deg' }],
  },
  mainIcon: {
    transform: [{ rotate: '-12deg' }],
  },
  floatIconTopRight: {
    position: 'absolute',
    top: 48,
    right: 48,
  },
  floatIconBotLeft: {
    position: 'absolute',
    bottom: 64,
    left: 48,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 340,
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionArea: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 64,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
  },
  secondaryBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  chipsWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 12,
    borderTopColor: '#F2F4F6',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED', 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
    color: '#C2410C',
    letterSpacing: 1,
  },
});
