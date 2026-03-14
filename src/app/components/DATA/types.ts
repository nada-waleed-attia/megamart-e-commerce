export interface HeroSlide {
  id: number;
  p?: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  savings: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  image: string;
  bgColor: string;
  discount: string;
}

export interface DailyEssential {
  id: number;
  name: string;
  image: string;
  discount: string;
}
