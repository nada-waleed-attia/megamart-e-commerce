// Product Types
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  savings: number;
  description?: string;
  stock?: number;
  category?: string;
  rating?: number;
  features?: string[];
  specifications?: Record<string, string>;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  image: string;
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  logo: string;
  image: string;
  bgColor: string;
  discount: string;
}

// Daily Essentials Types
export interface DailyEssential {
  id: number;
  name: string;
  image: string;
  discount: string;
}

// Hero Slide Types
export interface HeroSlide {
  id: number;
  p?: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

// Cart Item Types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  discount?: number;
  savings?: number;
}

// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  token?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
