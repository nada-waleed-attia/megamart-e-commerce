# صفحة التحكم في سيكشنات الصفحة الرئيسية

## نظرة عامة
هذه الصفحة تتيح للأدمن التحكم الكامل في السيكشنات الثلاثة التي تظهر في الصفحة الرئيسية للمتجر.

## المميزات
- ✅ 3 سيكشنات قابلة للتخصيص بالكامل
- ✅ تفعيل/إلغاء تفعيل كل سيكشن
- ✅ اختيار القسم المعروض
- ✅ التحكم في عدد المنتجات (4-20)
- ✅ اختيار ترتيب العرض
- ✅ واجهة مستخدم واضحة وسهلة

## البنية

### الملفات الأساسية
```
src/app/dashboard-admin/store-interface/
├── page.tsx                        # الصفحة الرئيسية
├── store-interface.module.css      # التنسيقات
└── README.md                       # التوثيق

src/app/models/
└── section-config.ts               # Types والإعدادات المشتركة
```

### Types المستخدمة

```typescript
interface SectionConfig {
  id: number;                       // معرف السيكشن
  title: string;                    // عنوان السيكشن
  category: string;                 // القسم المعروض
  itemCount: number;                // عدد المنتجات (4-20)
  sortOrder: 'newest' | 'popular' | 'price-low' | 'price-high';
  isActive: boolean;                // حالة التفعيل
}
```

## كيفية الاستخدام

### 1. الوصول للصفحة
```
/dashboard-admin/store-interface
```

### 2. تخصيص سيكشن
1. اختر عنوان مناسب للسيكشن
2. اختر القسم الذي تريد عرض منتجاته
3. حدد عدد المنتجات المعروضة
4. اختر ترتيب العرض
5. فعّل أو ألغِ تفعيل السيكشن
6. اضغط "حفظ التغييرات"

### 3. خيارات الترتيب
- **الأحدث**: المنتجات الأحدث أولاً
- **الأكثر طلبًا**: المنتجات الأكثر مبيعاً
- **السعر: من الأقل للأعلى**: الأرخص أولاً
- **السعر: من الأعلى للأقل**: الأغلى أولاً

## التكامل مع الـ API

### حفظ الإعدادات
```typescript
const saveSection = async (id: number) => {
  const section = sections.find(s => s.id === id);
  
  const response = await fetch('/api/sections', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(section)
  });
  
  if (response.ok) {
    // نجح الحفظ
  }
};
```

### جلب الإعدادات
```typescript
useEffect(() => {
  const fetchSections = async () => {
    const response = await fetch('/api/sections');
    const data = await response.json();
    setSections(data);
  };
  
  fetchSections();
}, []);
```

## إعادة الاستخدام في مشاريع أخرى

### الخطوات
1. انسخ المجلد `store-interface` كاملاً
2. انسخ ملف `section-config.ts`
3. عدّل `AVAILABLE_CATEGORIES` حسب مشروعك
4. أضف الصفحة في قائمة الـ sidebar
5. ربط الصفحة بالـ API الخاص بك

### تخصيص الأقسام
```typescript
// في section-config.ts
export const AVAILABLE_CATEGORIES = [
  'قسم 1',
  'قسم 2',
  'قسم 3',
  // أضف أقسامك هنا
];
```

### إضافة المزيد من السيكشنات
```typescript
// في page.tsx
const [sections, setSections] = useState<SectionConfig[]>([
  ...DEFAULT_SECTIONS,
  {
    id: 4,
    title: 'سيكشن جديد',
    category: 'قسم جديد',
    itemCount: 8,
    sortOrder: 'newest',
    isActive: true
  }
]);
```

## التطوير المستقبلي

### مقترحات للتحسين
- [ ] إضافة Drag & Drop لترتيب السيكشنات
- [ ] معاينة مباشرة للتغييرات
- [ ] إضافة سيكشنات ديناميكية (غير محدودة)
- [ ] تحميل صور مخصصة للسيكشنات
- [ ] جدولة ظهور السيكشنات (تاريخ بداية/نهاية)
- [ ] A/B Testing للسيكشنات

### Block Builder (مستقبلاً)
إذا احتجت لمرونة أكبر، يمكن تحويل النظام إلى Block Builder:
- إضافة/حذف سيكشنات ديناميكياً
- أنواع مختلفة من السيكشنات (منتجات، بانرات، فيديوهات)
- ترتيب السيكشنات بالسحب والإفلات

## الدعم
للأسئلة أو المشاكل، راجع التوثيق الرئيسي أو افتح issue في المشروع.
