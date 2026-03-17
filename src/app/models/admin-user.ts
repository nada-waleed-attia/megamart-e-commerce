/**
 * Admin User Types
 * أنواع بيانات المستخدمين الإداريين
 */

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'editor' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  permissions: string[];
}

export const USER_ROLES: Record<UserRole, { label: string; description: string; color: string }> = {
  super_admin: {
    label: 'مدير عام',
    description: 'صلاحيات كاملة على النظام',
    color: '#ef4444'
  },
  admin: {
    label: 'مدير',
    description: 'صلاحيات إدارية شاملة',
    color: '#f59e0b'
  },
  manager: {
    label: 'مدير قسم',
    description: 'إدارة الطلبات والمنتجات',
    color: '#3b82f6'
  },
  editor: {
    label: 'محرر',
    description: 'تعديل المحتوى والمنتجات',
    color: '#8b5cf6'
  },
  viewer: {
    label: 'مشاهد',
    description: 'عرض البيانات فقط',
    color: '#6b7280'
  }
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: 'نشط',
  inactive: 'غير نشط',
  suspended: 'موقوف'
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  active: '#10b981',
  inactive: '#6b7280',
  suspended: '#ef4444'
};

export const AVAILABLE_PERMISSIONS = [
  { id: 'view_dashboard', label: 'عرض لوحة التحكم', category: 'عام' },
  { id: 'manage_products', label: 'إدارة المنتجات', category: 'منتجات' },
  { id: 'manage_categories', label: 'إدارة الأقسام', category: 'منتجات' },
  { id: 'manage_orders', label: 'إدارة الطلبات', category: 'طلبات' },
  { id: 'view_orders', label: 'عرض الطلبات', category: 'طلبات' },
  { id: 'manage_customers', label: 'إدارة العملاء', category: 'عملاء' },
  { id: 'view_customers', label: 'عرض العملاء', category: 'عملاء' },
  { id: 'manage_settings', label: 'إدارة الإعدادات', category: 'إعدادات' },
  { id: 'manage_users', label: 'إدارة المستخدمين', category: 'إعدادات' },
  { id: 'view_reports', label: 'عرض التقارير', category: 'تقارير' }
];

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: AVAILABLE_PERMISSIONS.map(p => p.id),
  admin: [
    'view_dashboard',
    'manage_products',
    'manage_categories',
    'manage_orders',
    'view_orders',
    'manage_customers',
    'view_customers',
    'view_reports'
  ],
  manager: [
    'view_dashboard',
    'manage_products',
    'manage_orders',
    'view_orders',
    'view_customers',
    'view_reports'
  ],
  editor: [
    'view_dashboard',
    'manage_products',
    'manage_categories',
    'view_orders',
    'view_customers'
  ],
  viewer: [
    'view_dashboard',
    'view_orders',
    'view_customers'
  ]
};

// بيانات تجريبية
export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@megamart.com',
    phone: '+20 123 456 7890',
    role: 'super_admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00',
    lastLogin: '2024-03-15T14:30:00',
    permissions: ROLE_PERMISSIONS.super_admin
  },
  {
    id: 2,
    name: 'فاطمة علي',
    email: 'fatma@megamart.com',
    phone: '+20 111 222 3333',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-01T09:00:00',
    lastLogin: '2024-03-14T16:20:00',
    permissions: ROLE_PERMISSIONS.admin
  },
  {
    id: 3,
    name: 'محمود حسن',
    email: 'mahmoud@megamart.com',
    phone: '+20 100 999 8888',
    role: 'manager',
    status: 'active',
    createdAt: '2024-02-15T11:00:00',
    lastLogin: '2024-03-13T10:15:00',
    permissions: ROLE_PERMISSIONS.manager
  },
  {
    id: 4,
    name: 'سارة أحمد',
    email: 'sara@megamart.com',
    phone: '+20 122 333 4444',
    role: 'editor',
    status: 'inactive',
    createdAt: '2024-03-01T08:00:00',
    permissions: ROLE_PERMISSIONS.editor
  }
];
