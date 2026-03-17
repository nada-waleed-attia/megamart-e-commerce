/**
 * General Settings Types
 * الإعدادات العامة للمتجر
 */

export interface GeneralSettings {
  // معلومات المتجر الأساسية
  store: {
    name: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    description: string;
  };
  
  // الروابط الاجتماعية
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    whatsapp: string;
  };
  
  // إعدادات النظام
  system: {
    currency: string;
    currencySymbol: string;
    defaultLanguage: 'ar' | 'en';
    timezone: string;
    dateFormat: string;
  };
  
  // حالة المتجر
  status: {
    isActive: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string;
  };
  
  // إعدادات الشحن
  shipping: {
    freeShippingThreshold: number;
    defaultShippingCost: number;
    estimatedDeliveryDays: string;
  };
  
  // إعدادات الضرائب
  tax: {
    enabled: boolean;
    rate: number;
    includedInPrice: boolean;
  };
}

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  store: {
    name: 'MegaMart',
    logo: '/images/logo.png',
    email: 'info@megamart.com',
    phone: '+20 123 456 7890',
    address: 'القاهرة، مصر',
    description: 'متجرك الإلكتروني المتكامل'
  },
  social: {
    facebook: 'https://facebook.com/megamart',
    instagram: 'https://instagram.com/megamart',
    twitter: 'https://twitter.com/megamart',
    youtube: 'https://youtube.com/megamart',
    tiktok: 'https://tiktok.com/@megamart',
    whatsapp: 'https://wa.me/201234567890'
  },
  system: {
    currency: 'EGP',
    currencySymbol: 'ج.م',
    defaultLanguage: 'ar',
    timezone: 'Africa/Cairo',
    dateFormat: 'DD/MM/YYYY'
  },
  status: {
    isActive: true,
    maintenanceMode: false,
    maintenanceMessage: 'الموقع تحت الصيانة، سنعود قريباً'
  },
  shipping: {
    freeShippingThreshold: 500,
    defaultShippingCost: 50,
    estimatedDeliveryDays: '3-5 أيام'
  },
  tax: {
    enabled: false,
    rate: 14,
    includedInPrice: false
  }
};

export const AVAILABLE_CURRENCIES = [
  { code: 'EGP', symbol: 'ج.م', name: 'جنيه مصري' },
  { code: 'SAR', symbol: 'ر.س', name: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'درهم إماراتي' },
  { code: 'USD', symbol: '$', name: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'يورو' }
];

export const AVAILABLE_LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' }
];
