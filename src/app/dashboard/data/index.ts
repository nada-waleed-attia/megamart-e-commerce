import userData from './userData.json';
import type { UserData, Order, Address, WishlistItem, Stat } from './types';

// Export the full data
export const getUserData = (): UserData => userData as UserData;

// Export individual data getters
export const getUser = () => userData.user;

export const getStats = (): Stat[] => userData.stats as Stat[];

export const getOrders = (): Order[] => userData.orders as Order[];

export const getOrderById = (id: string): Order | undefined => {
  return userData.orders.find(order => order.id === id) as Order | undefined;
};

export const getAddresses = (): Address[] => userData.addresses as Address[];

export const getDefaultAddress = (): Address | undefined => {
  return userData.addresses.find(addr => addr.isDefault) as Address | undefined;
};

export const getWishlist = (): WishlistItem[] => userData.wishlist as WishlistItem[];

export const getSettings = () => userData.settings;

// Export types
export * from './types';
