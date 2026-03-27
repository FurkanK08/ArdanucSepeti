import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VendorDashboardScreen } from '../screens/vendor/VendorDashboardScreen';
import { StoreSettingsScreen } from '../screens/vendor/StoreSettingsScreen';
import { OrderHistoryScreen } from '../screens/vendor/OrderHistoryScreen';
import { MenuEditorScreen } from '../screens/vendor/MenuEditorScreen';
import { StoreProfileScreen } from '../screens/vendor/StoreProfileScreen';

const Stack = createNativeStackNavigator();

export function VendorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
      <Stack.Screen name="StoreSettings" component={StoreSettingsScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="MenuEditor" component={MenuEditorScreen} />
      <Stack.Screen name="StoreProfile" component={StoreProfileScreen} />
    </Stack.Navigator>
  );
}
