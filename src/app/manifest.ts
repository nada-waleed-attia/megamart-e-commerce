import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'متجر إلكتروني الأفضل',
    short_name: 'متجر إلكتروني',
    description: 'المتجر الإلكتروني الأفضل في الشرق الأوسط. تسوق أونلاين هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['shopping', 'ecommerce', 'retail'],
    lang: 'ar',
    dir: 'rtl',
  };
}
