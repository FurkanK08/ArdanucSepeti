import React, { createContext, useContext, useReducer } from 'react';
import { CartItem, Order, OrderStatus } from '../types';

// === State ===

interface OrderState {
  activeOrders: Order[];
  orderHistory: Order[];
}

const initialState: OrderState = {
  activeOrders: [],
  orderHistory: [],
};

// === Actions ===

type OrderAction =
  | { type: 'PLACE_ORDER'; payload: { items: CartItem[]; totalPrice: number; restaurantName: string } }
  | { type: 'UPDATE_STATUS'; payload: { orderId: string; status: OrderStatus } }
  | { type: 'COMPLETE_ORDER'; payload: { orderId: string } };

// === Reducer ===

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'PLACE_ORDER': {
      const newOrder: Order = {
        id: `CUR-${Math.floor(1000 + Math.random() * 9000)}`,
        items: action.payload.items,
        status: 'PENDING',
        totalPrice: action.payload.totalPrice,
        restaurantName: action.payload.restaurantName,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        activeOrders: [newOrder, ...state.activeOrders],
      };
    }

    case 'UPDATE_STATUS': {
      return {
        ...state,
        activeOrders: state.activeOrders.map(order => 
          order.id === action.payload.orderId 
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    }

    case 'COMPLETE_ORDER': {
      const orderToComplete = state.activeOrders.find(o => o.id === action.payload.orderId);
      if (!orderToComplete) return state;

      const completed: Order = {
        ...orderToComplete,
        status: 'DELIVERED',
      };

      return {
        ...state,
        activeOrders: state.activeOrders.filter(o => o.id !== action.payload.orderId),
        orderHistory: [completed, ...state.orderHistory],
      };
    }

    default:
      return state;
  }
}

// === Context ===

interface OrderContextValue {
  activeOrders: Order[];
  orderHistory: Order[];
  placeOrder: (items: CartItem[], totalPrice: number, restaurantName: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  completeOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

// === Provider ===

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const placeOrder = (items: CartItem[], totalPrice: number, restaurantName: string) => {
    dispatch({ type: 'PLACE_ORDER', payload: { items, totalPrice, restaurantName } });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    dispatch({ type: 'UPDATE_STATUS', payload: { orderId, status } });
  };

  const completeOrder = (orderId: string) => {
    dispatch({ type: 'COMPLETE_ORDER', payload: { orderId } });
  };

  const value: OrderContextValue = {
    activeOrders: state.activeOrders,
    orderHistory: state.orderHistory,
    placeOrder,
    updateOrderStatus,
    completeOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

// === Hook ===

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
