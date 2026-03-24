import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { Alert } from 'react-native';
import { CartItem } from '../types';

// === State ===

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// === Actions ===

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// === Reducer ===

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i,
        ),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// === Context ===

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// === Provider ===

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => {
      const optionsPrice = item.selectedOptions?.reduce((acc, opt) => acc + opt.price, 0) || 0;
      return sum + (item.price + optionsPrice) * item.quantity;
    }, 0),
    [state.items],
  );

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    // Farklı restorandan ekleme kontrolü
    if (state.items.length > 0 && state.items[0].restaurantId !== item.restaurantId) {
      Alert.alert(
        'Sepeti Temizle',
        `Sepetinizde "${state.items[0].restaurantName}" restoranından ürünler var. Yeni restorandan ürün eklemek için sepeti temizlemek ister misiniz?`,
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Temizle ve Ekle',
            style: 'destructive',
            onPress: () => {
              dispatch({ type: 'CLEAR_CART' });
              dispatch({ type: 'ADD_ITEM', payload: item });
            },
          },
        ],
      );
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// === Hook ===

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
