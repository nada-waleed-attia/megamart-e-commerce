/**
 * Site Settings Types
 * إعدادات الموقع العامة
 */

export interface SiteSettings {
  // الهوية البصرية
  branding: {
    siteName: string;
    logo: string;
    favicon: string;
    tagline: string;
  };
  
  // ألوان الهوية
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  
  // بيانات التواصل
  contact: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
  };
  
  // روابط السوشيال ميديا
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    whatsapp: string;
  };
  
  // نصوص عامة في الهوم
  homeTexts: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    aboutSection: string;
  };
  
  // إعدادات SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  branding: {
    siteName: 'MegaMart',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
    tagline: 'تسوق بذكاء، وفر أكثر'
  },
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1a1a1a'
  },
  contact: {
    phone: '+20 123 456 7890',
    email: 'info@megamart.com',
    address: 'القاهرة، مصر',
    workingHours: 'السبت - الخميس: 9 صباحاً - 10 مساءً'
  },
  social: {
    facebook: 'https://facebook.com/megamart',
    instagram: 'https://instagram.com/megamart',
    twitter: 'https://twitter.com/megamart',
    youtube: 'https://youtube.com/megamart',
    tiktok: 'https://tiktok.com/@megamart',
    whatsapp: 'https://wa.me/201234567890'
  },
  homeTexts: {
    heroTitle: 'اكتشف أفضل العروض',
    heroSubtitle: 'تسوق من أكبر تشكيلة منتجات بأفضل الأسعار',
    heroButtonText: 'تسوق الآن',
    aboutSection: 'نحن نقدم لك أفضل المنتجات بأسعار تنافسية'
  },
  seo: {
    metaTitle: 'MegaMart - تسوق بذكاء، وفر أكثر',
    metaDescription: 'اكتشف أفضل العروض والمنتجات في MegaMart',
    metaKeywords: 'تسوق، عروض، منتجات، أسعار'
  }
};
