import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourierStandbyScreen } from '../screens/courier/CourierStandbyScreen';
import { ActiveDeliveryScreen } from '../screens/courier/ActiveDeliveryScreen';
import { CourierWalletScreen } from '../screens/courier/CourierWalletScreen';
import { CourierProfileScreen } from '../screens/courier/CourierProfileScreen';
import { ShiftSchedulingScreen } from '../screens/courier/ShiftSchedulingScreen';

const Stack = createNativeStackNavigator();

export function CourierNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourierStandby" component={CourierStandbyScreen} />
      <Stack.Screen name="ActiveDelivery" component={ActiveDeliveryScreen} />
      <Stack.Screen name="CourierWallet" component={CourierWalletScreen} />
      <Stack.Screen name="CourierProfile" component={CourierProfileScreen} />
      <Stack.Screen name="ShiftScheduling" component={ShiftSchedulingScreen} />
    </Stack.Navigator>
  );
}
