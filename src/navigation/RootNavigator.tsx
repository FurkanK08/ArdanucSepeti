import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnifiedAuthScreen } from '../screens/shared/UnifiedAuthScreen';
import { CustomerNavigator } from './CustomerNavigator';
import { VendorNavigator } from './VendorNavigator';
import { CourierNavigator } from './CourierNavigator';
import { useAuth } from '../hooks/useAuth';
import { theme } from '../constants/theme';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FB' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="Auth" component={UnifiedAuthScreen} />
      ) : profile?.role === 'vendor' ? (
        <Stack.Screen name="VendorFlow" component={VendorNavigator} />
      ) : profile?.role === 'courier' ? (
        <Stack.Screen name="CourierFlow" component={CourierNavigator} />
      ) : (
        <Stack.Screen name="CustomerFlow" component={CustomerNavigator} />
      )}
    </Stack.Navigator>
  );
}
