// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  birthDate: string;
  gender: 'male' | 'female';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

// Stats Types
export interface Stat {
  id: string;
  icon: string;
  label: string;
  value: string;
  color: string;
}

// Order Types
export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  area: string;
}

export interface TimelineItem {
  status: string;
  date: string;
  completed: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  total: number;
  items: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
  timeline: TimelineItem[];
}

// Address Types
export type AddressType = 'home' | 'work' | 'other';

export interface Address {
  id: string;
  type: AddressType;
  fullName: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  isDefault: boolean;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  discount: number;
  category: string;
}

// Settings Types
export interface NotificationSettings {
  email: boolean;
  orderUpdates: boolean;
  promotions: boolean;
}

export interface Settings {
  notifications: NotificationSettings;
  language: string;
  currency: string;
}

// Main User Data Type
export interface UserData {
  user: User;
  stats: Stat[];
  orders: Order[];
  addresses: Address[];
  wishlist: WishlistItem[];
  settings: Settings;
}
