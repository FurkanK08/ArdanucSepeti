import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourierStandbyScreen } from '../screens/courier/CourierStandbyScreen';
import { ActiveDeliveryScreen } from '../screens/courier/ActiveDeliveryScreen';

const Stack = createNativeStackNavigator();

export function CourierNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CourierStandby" component={CourierStandbyScreen} />
      <Stack.Screen name="ActiveDelivery" component={ActiveDeliveryScreen} />
    </Stack.Navigator>
  );
}
