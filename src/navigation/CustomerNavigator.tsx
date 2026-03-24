import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketplaceHomeScreen } from '../screens/customer/MarketplaceHomeScreen';
import { RestaurantMenuScreen } from '../screens/customer/RestaurantMenuScreen';
import { CheckoutScreen } from '../screens/customer/CheckoutScreen';
import { MapAddressScreen } from '../screens/customer/MapAddressScreen';
import { OrderTrackingScreen } from '../screens/customer/OrderTrackingScreen';
import { ProfileScreen } from '../screens/customer/ProfileScreen';
import { SavedAddressesScreen } from '../screens/customer/SavedAddressesScreen';
import { PaymentMethodsScreen } from '../screens/customer/PaymentMethodsScreen';

const Stack = createNativeStackNavigator();

export function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarketplaceHome" component={MarketplaceHomeScreen} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="MapAddress" component={MapAddressScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    </Stack.Navigator>
  );
}
