/**
 * Order Types
 * أنواع بيانات الطلبات
 */

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'wallet';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'قيد الانتظار',
  processing: 'قيد المعالجة',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي'
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'الدفع عند الاستلام',
  card: 'بطاقة ائتمان',
  wallet: 'محفظة إلكترونية'
};

// بيانات تجريبية
export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customerId: 1,
    customerName: 'أحمد محمد',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+20 123 456 7890',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'ساعة ذكية',
        productImage: '/images/product1.jpg',
        quantity: 1,
        price: 2500,
        total: 2500
      }
    ],
    subtotal: 2500,
    shipping: 50,
    tax: 0,
    total: 2550,
    status: 'pending',
    paymentMethod: 'cash',
    shippingAddress: 'القاهرة، مصر الجديدة، شارع الحجاز',
    createdAt: '2024-03-15T10:30:00',
    updatedAt: '2024-03-15T10:30:00'
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customerId: 2,
    customerName: 'فاطمة علي',
    customerEmail: 'fatma@example.com',
    customerPhone: '+20 111 222 3333',
    items: [
      {
        id: 2,
        productId: 2,
        productName: 'سماعات لاسلكية',
        productImage: '/images/product2.jpg',
        quantity: 2,
        price: 800,
        total: 1600
      }
    ],
    subtotal: 1600,
    shipping: 50,
    tax: 0,
    total: 1650,
    status: 'processing',
    paymentMethod: 'card',
    shippingAddress: 'الجيزة، المهندسين، شارع جامعة الدول',
    createdAt: '2024-03-14T14:20:00',
    updatedAt: '2024-03-15T09:00:00'
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customerId: 3,
    customerName: 'محمود حسن',
    customerEmail: 'mahmoud@example.com',
    customerPhone: '+20 100 999 8888',
    items: [
      {
        id: 3,
        productId: 3,
        productName: 'هاتف ذكي',
        productImage: '/images/product3.jpg',
        quantity: 1,
        price: 8000,
        total: 8000
      }
    ],
    subtotal: 8000,
    shipping: 0,
    tax: 0,
    total: 8000,
    status: 'delivered',
    paymentMethod: 'wallet',
    shippingAddress: 'الإسكندرية، سموحة، شارع فوزي معاذ',
    createdAt: '2024-03-10T11:15:00',
    updatedAt: '2024-03-13T16:45:00'
  }
];
