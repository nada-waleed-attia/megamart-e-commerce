/**
 * Section Configuration Types
 * يستخدم للتحكم في سيكشنات الصفحة الرئيسية
 */

export interface SectionConfig {
  id: number;
  title: string;
  category: string;
  itemCount: number;
  sortOrder: 'newest' | 'popular' | 'price-low' | 'price-high';
  isActive: boolean;
}

export const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    id: 1,
    title: 'أحدث المنتجات',
    category: 'العناية بالبشرة',
    itemCount: 8,
    sortOrder: 'newest',
    isActive: true
  },
  {
    id: 2,
    title: 'منتجات مختارة',
    category: 'المكياج',
    itemCount: 8,
    sortOrder: 'popular',
    isActive: true
  },
  {
    id: 3,
    title: 'الأكثر طلبًا',
    category: 'العطور',
    itemCount: 8,
    sortOrder: 'popular',
    isActive: true
  }
];

export const AVAILABLE_CATEGORIES = [
  'العناية بالبشرة',
  'المكياج',
  'العطور',
  'العناية بالشعر',
  'الساعات الذكية',
  'الإلكترونيات',
  'الملابس',
  'الأحذية'
];

export const SORT_OPTIONS = [
  { value: 'newest' as const, label: 'الأحدث' },
  { value: 'popular' as const, label: 'الأكثر طلبًا' },
  { value: 'price-low' as const, label: 'السعر: من الأقل للأعلى' },
  { value: 'price-high' as const, label: 'السعر: من الأعلى للأقل' }
];
