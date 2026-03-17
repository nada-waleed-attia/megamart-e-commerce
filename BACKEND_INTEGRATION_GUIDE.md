# دليل الربط مع الـ Backend

## البنية الجديدة للمشروع

تم إنشاء البنية التحتية الكاملة للربط مع الـ Backend:

```
src/app/
├── models/
│   └── types.ts                    # تعريفات أنواع البيانات (TypeScript Interfaces)
├── services/
│   ├── api.ts                      # Axios instance مع interceptors
│   ├── productService.ts           # API calls للمنتجات
│   ├── categoryService.ts          # API calls للفئات
│   ├── brandService.ts             # API calls للعلامات التجارية
│   ├── essentialService.ts         # API calls للمنتجات الأساسية
│   └── authService.ts              # API calls للمصادقة
├── hooks/
│   ├── useProducts.ts              # Custom hook للمنتجات
│   ├── useCategories.ts            # Custom hook للفئات
│   └── useBrands.ts                # Custom hook للعلامات التجارية
└── utils/
    └── dataAdapter.ts              # للتحويل بين JSON والـ API (fallback)
```

## خطوات الربط مع Backend زميلك

### 1. احصلي على المعلومات التالية من Backend Developer:

- **Base URL** للـ API (مثال: `https://api.example.com/api`)
- **Endpoints** المتاحة:
  - `/products` - جلب كل المنتجات
  - `/products/:id` - جلب منتج واحد
  - `/categories` - جلب كل الفئات
  - `/brands` - جلب كل العلامات التجارية
  - إلخ...
- **شكل Response** لكل endpoint (JSON structure)
- **Authentication** - هل يحتاج Token؟ وكيف يتم إرساله؟

### 2. إعداد ملف البيئة (.env.local)

أنشئي ملف `.env.local` في root المشروع:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

غيري الـ URL للـ URL الفعلي من Backend زميلك.

### 3. تعديل الـ Types حسب API Response

افتحي `src/app/models/types.ts` وعدلي الـ interfaces حسب شكل البيانات الفعلي من الـ API.

مثال: لو الـ API بيرجع:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "productName": "iPhone",
    "cost": 50000
  }
}
```

عدلي الـ interface:
```typescript
export interface Product {
  id: number;
  productName: string;  // بدل name
  cost: number;         // بدل price
  // ... باقي الحقول
}
```

### 4. تعديل Services حسب Endpoints

افتحي ملفات الـ services وعدلي الـ endpoints حسب الـ API الفعلي.

مثال في `productService.ts`:
```typescript
// لو الـ endpoint هو /api/v1/products بدل /products
getAllProducts: async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>('/v1/products');
  return response.data.data;
}
```

### 5. استخدام الـ Hooks في الصفحات

#### مثال: تعديل صفحة Products

**قبل (باستخدام slides.json):**
```typescript
import slidesData from '../../components/DATA/slides.json';
const products = slidesData.products;
```

**بعد (باستخدام API):**
```typescript
import { useProducts } from '../../hooks/useProducts';

const { products, loading, error } = useProducts();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

### 6. مثال كامل لتعديل صفحة

```typescript
"use client";

import { useProducts } from '../../hooks/useProducts';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};
```

## الملفات التي تحتاج تعديل

عند الربط مع الـ API، ستحتاجين لتعديل:

1. **src/app/view-all/[type]/page.tsx** - استبدلي `slidesData` بـ hooks
2. **src/app/products/[id]/page.tsx** - استخدمي `useProduct(id)`
3. **src/app/categories/[id]/page.tsx** - استخدمي `useCategory(id)`
4. **src/app/brands/[id]/page.tsx** - استخدمي `useBrand(id)`
5. **كل الـ Sliders** - استخدمي الـ hooks بدل JSON

## Testing بدون Backend (Fallback)

لو الـ Backend مش جاهز بعد، الكود الحالي هيشتغل عادي لأن:
- ملف `slides.json` لسه موجود
- ممكن تستخدمي `dataAdapter.ts` كـ fallback

## Notes مهمة

- **Authentication**: لو الـ API يحتاج token، هيتم إضافته تلقائياً من `api.ts` interceptor
- **Error Handling**: كل الأخطاء بتتعامل معاها في `api.ts`
- **Loading States**: كل hook بيرجع `loading` و `error` states
- **TypeScript**: كل الـ types محددة، فـ IDE هيساعدك بالـ autocomplete

## الخطوة التالية

بعد ما تاخدي معلومات الـ API من زميلك:
1. حدثي `.env.local`
2. عدلي الـ types في `models/types.ts`
3. عدلي الـ endpoints في الـ services
4. ابدأي تستبدلي `slidesData` بالـ hooks في الصفحات
