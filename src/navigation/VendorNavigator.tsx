import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VendorDashboardScreen } from '../screens/vendor/VendorDashboardScreen';
import { StoreSettingsScreen } from '../screens/vendor/StoreSettingsScreen';

const Stack = createNativeStackNavigator();

export function VendorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
      <Stack.Screen name="StoreSettings" component={StoreSettingsScreen} />
    </Stack.Navigator>
  );
}
