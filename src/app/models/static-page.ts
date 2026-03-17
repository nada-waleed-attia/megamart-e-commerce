/**
 * Static Page Types
 * أنواع بيانات الصفحات الثابتة
 */

export interface StaticPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_STATIC_PAGES: StaticPage[] = [
  {
    id: 1,
    title: 'من نحن',
    slug: 'about-us',
    content: '<h2>من نحن</h2><p>نحن متجر إلكتروني متخصص في...</p>',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-03-01T00:00:00'
  },
  {
    id: 2,
    title: 'سياسة الخصوصية',
    slug: 'privacy-policy',
    content: '<h2>سياسة الخصوصية</h2><p>نحن نحترم خصوصيتك...</p>',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-02-15T00:00:00'
  },
  {
    id: 3,
    title: 'سياسة الإرجاع',
    slug: 'return-policy',
    content: '<h2>سياسة الإرجاع</h2><p>يمكنك إرجاع المنتجات خلال...</p>',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-02-20T00:00:00'
  },
  {
    id: 4,
    title: 'الشحن والتوصيل',
    slug: 'shipping-delivery',
    content: '<h2>الشحن والتوصيل</h2><p>نوفر خدمة الشحن إلى جميع المحافظات...</p>',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-03-10T00:00:00'
  }
];
