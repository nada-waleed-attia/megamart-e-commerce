# دليل صفحات لوحة التحكم

## نظرة عامة
هذا الدليل يشرح جميع صفحات لوحة التحكم الأساسية والضرورية لأي متجر إلكتروني.

---

## 1. صفحة إعدادات الواجهة العامة
**المسار:** `/dashboard-admin/settings`

### الأقسام الرئيسية

#### 1.1 الهوية البصرية
- اسم الموقع
- الشعار (Tagline)
- اللوجو (مع رفع الصورة)
- Favicon (مع رفع الصورة)
- ألوان الهوية:
  - اللون الأساسي
  - اللون الثانوي
  - لون التمييز

#### 1.2 بيانات التواصل
- رقم الهاتف
- البريد الإلكتروني
- العنوان
- ساعات العمل

#### 1.3 روابط السوشيال ميديا
- Facebook
- Instagram
- Twitter
- YouTube
- TikTok
- WhatsApp

#### 1.4 نصوص الصفحة الرئيسية
- عنوان Hero Section
- نص فرعي Hero Section
- نص الزر
- نص قسم "من نحن"

#### 1.5 إعدادات SEO
- عنوان الصفحة (Meta Title)
- وصف الصفحة (Meta Description)
- الكلمات المفتاحية (Keywords)

### المميزات
✅ تنظيم بالـ Tabs لسهولة التنقل
✅ Color Picker لاختيار الألوان
✅ رفع الصور (جاهز للتكامل)
✅ حفظ جميع التغييرات دفعة واحدة
✅ رسالة نجاح عند الحفظ

### التكامل مع الـ API
```typescript
const handleSave = async () => {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  
  if (response.ok) {
    // نجح الحفظ
  }
};
```

---

## 2. صفحة إدارة الطلبات
**المسار:** `/dashboard-admin/orders`

### المميزات الأساسية

#### 2.1 عرض الطلبات
- جدول شامل بجميع الطلبات
- الأعمدة:
  - رقم الطلب
  - العميل (الاسم + الهاتف)
  - الإجمالي
  - الحالة
  - طريقة الدفع
  - التاريخ
  - الإجراءات

#### 2.2 البحث والفلترة
- البحث برقم الطلب
- البحث باسم العميل
- البحث برقم الهاتف
- فلترة بالحالة:
  - قيد الانتظار
  - قيد المعالجة
  - تم الشحن
  - تم التوصيل
  - ملغي

#### 2.3 إحصائيات سريعة
- إجمالي الطلبات
- الطلبات قيد الانتظار
- الطلبات قيد المعالجة
- الطلبات المكتملة

#### 2.4 تفاصيل الطلب (Modal)
- معلومات العميل الكاملة
- قائمة المنتجات
- ملخص الطلب (المجموع الفرعي، الشحن، الضريبة، الإجمالي)
- زر طباعة الفاتورة

#### 2.5 إدارة الحالات
- تغيير حالة الطلب مباشرة من الجدول
- ألوان مميزة لكل حالة
- تحديث تلقائي لتاريخ التعديل

#### 2.6 الإجراءات
- عرض التفاصيل
- طباعة الفاتورة
- تصدير الطلبات (Excel/PDF)

### حالات الطلب
```typescript
type OrderStatus = 
  | 'pending'      // قيد الانتظار - برتقالي
  | 'processing'   // قيد المعالجة - أزرق
  | 'shipped'      // تم الشحن - بنفسجي
  | 'delivered'    // تم التوصيل - أخضر
  | 'cancelled';   // ملغي - أحمر
```

### طرق الدفع
```typescript
type PaymentMethod = 
  | 'cash'    // الدفع عند الاستلام
  | 'card'    // بطاقة ائتمان
  | 'wallet'; // محفظة إلكترونية
```

### التكامل مع الـ API

#### جلب الطلبات
```typescript
const fetchOrders = async () => {
  const response = await fetch('/api/orders');
  const data = await response.json();
  setOrders(data);
};
```

#### تحديث حالة الطلب
```typescript
const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  
  if (response.ok) {
    // تم التحديث بنجاح
  }
};
```

---

## 3. صفحة التحكم في السيكشنات
**المسار:** `/dashboard-admin/store-interface`

### المميزات
- 3 سيكشنات قابلة للتخصيص
- اختيار عنوان السيكشن
- اختيار القسم المعروض
- التحكم في عدد المنتجات
- اختيار ترتيب العرض
- تفعيل/إلغاء تفعيل

راجع: `store-interface/README.md` للتفاصيل الكاملة

---

## البنية العامة

```
src/app/dashboard-admin/
├── layout.tsx                    # Layout الرئيسي مع Sidebar
├── settings/                     # إعدادات الواجهة
│   ├── page.tsx
│   └── settings.module.css
├── orders/                       # إدارة الطلبات
│   ├── page.tsx
│   └── orders.module.css
├── store-interface/              # التحكم في السيكشنات
│   ├── page.tsx
│   ├── store-interface.module.css
│   └── README.md
└── ADMIN_PAGES_GUIDE.md         # هذا الملف

src/app/models/
├── site-settings.ts              # Types إعدادات الموقع
├── order.ts                      # Types الطلبات
└── section-config.ts             # Types السيكشنات
```

---

## الصفحات الإضافية الموصى بها

### صفحات أساسية (موجودة)
✅ Dashboard (الرئيسية)
✅ إدارة العملاء
✅ القائمة البريدية
✅ إدارة المنتجات
✅ الأقسام الرئيسية
✅ الأقسام الفرعية
✅ الطلبات
✅ التحكم في الواجهة
✅ الإعدادات

### صفحات مقترحة للمستقبل
- [ ] التقارير والإحصائيات
- [ ] إدارة الكوبونات والخصومات
- [ ] إدارة المراجعات والتقييمات
- [ ] إدارة الشحن
- [ ] إدارة الإشعارات
- [ ] سجل النشاطات (Activity Log)
- [ ] إدارة الصلاحيات

---

## نصائح للتطوير

### 1. التكامل مع الـ API
- استخدم `fetch` أو `axios` للتواصل مع الـ Backend
- أضف Loading States
- أضف Error Handling
- استخدم React Query أو SWR للـ Caching

### 2. رفع الصور
```typescript
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.url;
};
```

### 3. الطباعة
```typescript
const handlePrint = (order: Order) => {
  const printWindow = window.open('', '_blank');
  printWindow?.document.write(generateInvoiceHTML(order));
  printWindow?.print();
};
```

### 4. التصدير
```typescript
// Excel
import * as XLSX from 'xlsx';

const exportToExcel = (orders: Order[]) => {
  const ws = XLSX.utils.json_to_sheet(orders);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Orders');
  XLSX.writeFile(wb, 'orders.xlsx');
};

// PDF
import jsPDF from 'jspdf';

const exportToPDF = (orders: Order[]) => {
  const doc = new jsPDF();
  // أضف المحتوى
  doc.save('orders.pdf');
};
```

---

## الأمان

### حماية الصفحات
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard-admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### التحقق من الصلاحيات
```typescript
const checkPermission = (user: User, action: string) => {
  return user.permissions.includes(action);
};
```

---

## الدعم والمساعدة

للأسئلة أو المشاكل:
1. راجع التوثيق في كل مجلد
2. تحقق من الـ Types في `src/app/models/`
3. راجع الأمثلة في الكود

---

## الخلاصة

هذه الصفحات تشكل الأساس القوي لأي لوحة تحكم متجر إلكتروني:

1. **الإعدادات**: تحكم كامل في الهوية والمظهر
2. **الطلبات**: إدارة احترافية للطلبات
3. **السيكشنات**: تخصيص الصفحة الرئيسية

كل صفحة مصممة لتكون:
- واضحة وسهلة الاستخدام
- قابلة لإعادة الاستخدام
- جاهزة للتكامل مع الـ API
- Responsive ومتجاوبة
- موثقة بشكل كامل
