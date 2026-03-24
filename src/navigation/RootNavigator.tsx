import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnifiedAuthScreen } from '../screens/shared/UnifiedAuthScreen';
import { CustomerNavigator } from './CustomerNavigator';
import { VendorNavigator } from './VendorNavigator';
import { CourierNavigator } from './CourierNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={UnifiedAuthScreen} />
      <Stack.Screen name="CustomerFlow" component={CustomerNavigator} />
      <Stack.Screen name="VendorFlow" component={VendorNavigator} />
      <Stack.Screen name="CourierFlow" component={CourierNavigator} />
    </Stack.Navigator>
  );
}
