# خطة User Dashboard (لوحة تحكم العميل)

## نظرة عامة
لوحة تحكم للعملاء المسجلين في الموقع لإدارة حساباتهم، طلباتهم، عناوينهم، والمفضلة.

---

## 🎯 الأهداف الرئيسية

1. **تجربة مستخدم سلسة** - واجهة بسيطة وسهلة الاستخدام
2. **إدارة الطلبات** - متابعة الطلبات الحالية والسابقة
3. **إدارة الحساب** - تعديل البيانات الشخصية
4. **إدارة العناوين** - حفظ عناوين التوصيل
5. **المفضلة** - حفظ المنتجات المفضلة
6. **Responsive** - يعمل على جميع الأجهزة

---

## 📁 هيكل الملفات المقترح

```
src/app/
├── dashboard/                          # User Dashboard
│   ├── layout.tsx                      # Layout مع Sidebar
│   ├── dashboard.module.css            # Styles للـ layout
│   ├── page.tsx                        # Redirect to /dashboard/overview
│   │
│   ├── overview/                       # نظرة عامة
│   │   ├── page.tsx
│   │   └── overview.module.css
│   │
│   ├── orders/                         # الطلبات
│   │   ├── page.tsx                    # قائمة الطلبات
│   │   ├── orders.module.css
│   │   └── [id]/                       # تفاصيل طلب
│   │       ├── page.tsx
│   │       └── order-details.module.css
│   │
│   ├── addresses/                      # العناوين
│   │   ├── page.tsx
│   │   └── addresses.module.css
│   │
│   ├── wishlist/                       # المفضلة
│   │   ├── page.tsx
│   │   └── wishlist.module.css
│   │
│   ├── profile/                        # الملف الشخصي
│   │   ├── page.tsx
│   │   └── profile.module.css
│   │
│   ├── settings/                       # الإعدادات
│   │   ├── page.tsx
│   │   └── settings.module.css
│   │
│   └── components/                     # مكونات مشتركة
│       ├── DashboardCard/
│       ├── OrderCard/
│       ├── AddressCard/
│       └── ProductCard/
```

---

## 📄 الصفحات المطلوبة

### 1. Overview (نظرة عامة) `/dashboard/overview`

**المحتوى:**
- رسالة ترحيب بالمستخدم
- إحصائيات سريعة:
  - عدد الطلبات الكلي
  - الطلبات قيد التنفيذ
  - المنتجات في المفضلة
  - العناوين المحفوظة
- آخر 3 طلبات
- روابط سريعة للأقسام

**Components:**
```tsx
- WelcomeCard
- StatsGrid (4 بطاقات)
- RecentOrders (آخر 3 طلبات)
- QuickLinks
```

---

### 2. Orders (الطلبات) `/dashboard/orders`

**المحتوى:**
- قائمة جميع الطلبات
- فلترة حسب الحالة:
  - الكل
  - قيد التنفيذ
  - تم التوصيل
  - ملغي
- بحث برقم الطلب
- عرض:
  - رقم الطلب
  - التاريخ
  - الحالة
  - الإجمالي
  - زر "عرض التفاصيل"

**Components:**
```tsx
- OrdersFilter
- OrdersList
- OrderCard
- EmptyState (لو مفيش طلبات)
```

---

### 3. Order Details (تفاصيل الطلب) `/dashboard/orders/[id]`

**المحتوى:**
- معلومات الطلب:
  - رقم الطلب
  - التاريخ
  - الحالة
  - طريقة الدفع
- المنتجات المطلوبة
- عنوان التوصيل
- ملخص السعر:
  - المجموع الفرعي
  - الشحن
  - الإجمالي
- Timeline للطلب (تتبع الحالة)
- أزرار:
  - إلغاء الطلب (إذا كان قيد التنفيذ)
  - إعادة الطلب
  - طباعة الفاتورة

**Components:**
```tsx
- OrderHeader
- OrderTimeline
- OrderItems
- OrderSummary
- ShippingAddress
- OrderActions
```

---

### 4. Addresses (العناوين) `/dashboard/addresses`

**المحتوى:**
- قائمة العناوين المحفوظة
- كل عنوان يحتوي على:
  - نوع العنوان (منزل، عمل، آخر)
  - الاسم الكامل
  - العنوان التفصيلي
  - رقم الهاتف
  - علامة "افتراضي"
  - أزرار: تعديل، حذف، تعيين كافتراضي
- زر "إضافة عنوان جديد"
- Modal لإضافة/تعديل العنوان

**Components:**
```tsx
- AddressList
- AddressCard
- AddAddressButton
- AddressModal (Form)
- EmptyState
```

**Form Fields:**
```
- نوع العنوان (منزل/عمل/آخر)
- الاسم الكامل
- رقم الهاتف
- المدينة
- المنطقة
- الشارع
- رقم المبنى
- الدور/الشقة
- علامات مميزة (اختياري)
- تعيين كعنوان افتراضي (checkbox)
```

---

### 5. Wishlist (المفضلة) `/dashboard/wishlist`

**المحتوى:**
- قائمة المنتجات المفضلة
- كل منتج يحتوي على:
  - صورة المنتج
  - اسم المنتج
  - السعر
  - حالة التوفر
  - زر "إضافة للسلة"
  - زر "إزالة من المفضلة"
- فلترة حسب:
  - الكل
  - متوفر
  - غير متوفر
- زر "إضافة الكل للسلة"

**Components:**
```tsx
- WishlistGrid
- WishlistCard
- FilterButtons
- EmptyState
```

---

### 6. Profile (الملف الشخصي) `/dashboard/profile`

**المحتوى:**
- معلومات الحساب:
  - الصورة الشخصية (اختياري)
  - الاسم الكامل
  - البريد الإلكتروني
  - رقم الهاتف
  - تاريخ الميلاد (اختياري)
  - الجنس (اختياري)
- زر "تعديل الملف الشخصي"
- إحصائيات:
  - تاريخ التسجيل
  - عدد الطلبات
  - إجمالي المشتريات

**Components:**
```tsx
- ProfileHeader
- ProfileForm
- ProfileStats
- AvatarUpload
```

---

### 7. Settings (الإعدادات) `/dashboard/settings`

**المحتوى:**
- تغيير كلمة المرور
- إعدادات الإشعارات:
  - إشعارات البريد الإلكتروني
  - إشعارات الطلبات
  - العروض والخصومات
- تفضيلات اللغة
- حذف الحساب

**Components:**
```tsx
- PasswordChangeForm
- NotificationSettings
- LanguageSelector
- DangerZone (حذف الحساب)
```

---

## 🎨 Layout Design

### Sidebar Menu Items:

```
📊 نظرة عامة (Overview)
📦 طلباتي (Orders)
📍 عناوين التوصيل (Addresses)
❤️ المفضلة (Wishlist)
👤 الملف الشخصي (Profile)
⚙️ الإعدادات (Settings)
🚪 تسجيل الخروج (Logout)
```

### Desktop Layout:
```
┌─────────────────────────────────────┐
│         Header (من الموقع)          │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │    Page Content          │
│ (250px)  │                          │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

### Mobile Layout:
```
┌─────────────────────────────────────┐
│         Header (من الموقع)          │
├─────────────────────────────────────┤
│  [☰ Menu]  User Dashboard           │
├─────────────────────────────────────┤
│                                     │
│         Page Content                │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Design Guidelines

### Colors:
```css
Primary: #0891b2 (Cyan)
Success: #10b981 (Green)
Warning: #f59e0b (Orange)
Danger: #ef4444 (Red)
Gray: #64748b
Background: #f8f9fa
```

### Typography:
```css
Heading: 1.5rem - 2rem (Bold)
Subheading: 1.25rem (Semi-bold)
Body: 0.95rem (Regular)
Small: 0.85rem (Regular)
```

### Spacing:
```css
Container: max-width 1200px
Padding: 2rem (Desktop), 1rem (Mobile)
Gap: 1.5rem (Desktop), 1rem (Mobile)
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
  - Sidebar visible
  - Grid: 3 columns
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) {
  - Sidebar collapsible
  - Grid: 2 columns
}

/* Mobile */
@media (max-width: 767px) {
  - Sidebar hidden (hamburger menu)
  - Grid: 1 column
  - Stack layout
}
```

---

## 🔐 Authentication & Protection

### Protected Routes:
جميع صفحات `/dashboard/*` تحتاج authentication

### Middleware Check:
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}
```

---

## 📊 Data Models

### User Profile:
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  createdAt: string;
}
```

### Order:
```typescript
interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'cash' | 'card' | 'wallet';
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
```

### Address:
```typescript
interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  isDefault: boolean;
}
```

### Wishlist Item:
```typescript
interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}
```

---

## 🔄 API Endpoints (مطلوبة)

### User:
```
GET    /api/user/profile          - Get user profile
PUT    /api/user/profile          - Update profile
POST   /api/user/avatar           - Upload avatar
PUT    /api/user/password         - Change password
DELETE /api/user/account          - Delete account
```

### Orders:
```
GET    /api/orders                - Get all orders
GET    /api/orders/:id            - Get order details
POST   /api/orders/:id/cancel     - Cancel order
POST   /api/orders/:id/reorder    - Reorder
```

### Addresses:
```
GET    /api/addresses             - Get all addresses
POST   /api/addresses             - Create address
PUT    /api/addresses/:id         - Update address
DELETE /api/addresses/:id         - Delete address
PUT    /api/addresses/:id/default - Set as default
```

### Wishlist:
```
GET    /api/wishlist              - Get wishlist
POST   /api/wishlist              - Add to wishlist
DELETE /api/wishlist/:id          - Remove from wishlist
POST   /api/wishlist/add-to-cart  - Add all to cart
```

---

## ✨ Features المميزة

### 1. Order Tracking Timeline
```
📦 تم الطلب → 🔄 قيد التجهيز → 🚚 تم الشحن → ✅ تم التوصيل
```

### 2. Quick Actions
- إعادة طلب سريع
- إضافة للسلة من المفضلة
- تعيين عنوان افتراضي

### 3. Notifications
- إشعار عند تغيير حالة الطلب
- إشعار عند توفر منتج من المفضلة
- إشعار بالعروض الخاصة

### 4. Search & Filter
- بحث في الطلبات
- فلترة حسب الحالة
- فلترة حسب التاريخ

---

## 🎯 User Experience (UX)

### Loading States:
- Skeleton loaders للبطاقات
- Spinner للأزرار
- Progress bar للتحميل

### Empty States:
- رسالة ودية عند عدم وجود بيانات
- أيقونة توضيحية
- زر CTA للإجراء المطلوب

### Error States:
- رسائل خطأ واضحة
- اقتراحات للحل
- زر "حاول مرة أخرى"

### Success States:
- Toast notifications
- رسائل تأكيد
- Animations بسيطة

---

## 📝 Implementation Phases

### Phase 1: Foundation (أساسيات)
- [ ] Layout مع Sidebar
- [ ] Overview page
- [ ] Authentication protection
- [ ] Responsive design

### Phase 2: Orders (الطلبات)
- [ ] Orders list page
- [ ] Order details page
- [ ] Order tracking timeline
- [ ] Cancel/Reorder functionality

### Phase 3: Profile & Addresses (الملف الشخصي والعناوين)
- [ ] Profile page
- [ ] Edit profile
- [ ] Addresses management
- [ ] Add/Edit/Delete addresses

### Phase 4: Wishlist (المفضلة)
- [ ] Wishlist page
- [ ] Add/Remove from wishlist
- [ ] Add to cart from wishlist
- [ ] Stock notifications

### Phase 5: Settings (الإعدادات)
- [ ] Change password
- [ ] Notification preferences
- [ ] Language settings
- [ ] Delete account

### Phase 6: Polish & Optimization (تحسينات)
- [ ] Loading states
- [ ] Error handling
- [ ] Animations
- [ ] Performance optimization
- [ ] SEO optimization

---

## 🚀 Next Steps

1. **مراجعة الخطة** - التأكد من اكتمال المتطلبات
2. **تصميم Mockups** - عمل تصاميم للصفحات
3. **إعداد API** - تجهيز الـ endpoints المطلوبة
4. **البدء في التنفيذ** - Phase by Phase
5. **Testing** - اختبار كل feature
6. **Deployment** - نشر النسخة النهائية

---

## 📚 Resources Needed

### Icons:
- React Icons (MdDashboard, MdShoppingBag, etc.)

### UI Components:
- Modal/Dialog
- Toast Notifications
- Dropdown Menu
- Tabs
- Timeline

### Libraries:
- React Hook Form (للفورمات)
- Zod (للـ validation)
- Date-fns (للتواريخ)
- React Query (للـ data fetching)

---

## ✅ Success Criteria

- [ ] جميع الصفحات responsive
- [ ] Loading states واضحة
- [ ] Error handling محكم
- [ ] UX سلس وسهل
- [ ] Performance جيد (< 3s load time)
- [ ] Accessibility compliant
- [ ] Cross-browser compatible
- [ ] Mobile-friendly

---

## 📞 Support & Maintenance

### Post-Launch:
- مراقبة الأخطاء
- جمع feedback من المستخدمين
- تحسينات مستمرة
- إضافة features جديدة

---

**تاريخ الإنشاء:** 2024
**آخر تحديث:** 2024
**الحالة:** خطة جاهزة للتنفيذ ✅
