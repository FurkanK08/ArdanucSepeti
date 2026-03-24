import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <OrderProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </OrderProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}
