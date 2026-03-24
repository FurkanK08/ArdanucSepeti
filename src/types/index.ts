// === Cart Types ===

export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface OptionGroup {
  id: string;
  name: string;
  type: 'SINGLE' | 'MULTIPLE';
  options: ProductOption[];
  required?: boolean;
}

export interface SelectedOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // This will be composite (originalId + optionsHash)
  originalId: string;
  title: string;
  price: number; // Base price
  quantity: number;
  imageUri: string;
  restaurantId: string;
  restaurantName: string;
  selectedOptions?: SelectedOption[];
}

// === Order Types ===

export type OrderStatus = 'PENDING' | 'PREPARING' | 'ON_WAY' | 'DELIVERED';

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  totalPrice: number;
  restaurantName: string;
  createdAt: string;
}

// === Navigation Types ===

export type CustomerStackParamList = {
  MarketplaceHome: undefined;
  RestaurantMenu: { restaurantId?: string; restaurantName?: string };
  Checkout: undefined;
  MapAddress: undefined;
  OrderTracking: { orderId: string };
  Profile: undefined;
  SavedAddresses: undefined;
  PaymentMethods: undefined;
};
