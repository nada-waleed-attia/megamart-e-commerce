import React from 'react';
import { SkeletonActivityCard } from '../Skeleton/Skeleton';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './RecentActivity.module.css';

interface RecentCustomer {
  id: number;
  name: string;
  email: string;
  date: string;
}

interface RecentProduct {
  id: number;
  name: string;
  price: number;
  date: string;
}

interface RecentOrder {
  id: number;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

interface RecentActivityProps {
  isLoading?: boolean;
}

export function RecentActivity({ isLoading = false }: RecentActivityProps) {
  // Mock data - TODO: Replace with actual API calls
  const recentCustomers: RecentCustomer[] = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', date: '2024-03-15' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', date: '2024-03-14' },
    { id: 3, name: 'محمد حسن', email: 'mohamed@example.com', date: '2024-03-14' },
  ];

  const recentProducts: RecentProduct[] = [
    { id: 1, name: 'iPhone 14 Pro Max', price: 45000, date: '2024-03-15' },
    { id: 2, name: 'Samsung Galaxy S23', price: 38000, date: '2024-03-14' },
    { id: 3, name: 'Smart TV 4K', price: 25000, date: '2024-03-13' },
  ];

  const recentOrders: RecentOrder[] = [
    { id: 1001, customerName: 'أحمد محمد', total: 45000, status: 'pending', date: '2024-03-15' },
    { id: 1002, customerName: 'فاطمة علي', total: 38000, status: 'processing', date: '2024-03-15' },
    { id: 1003, customerName: 'محمد حسن', total: 25000, status: 'delivered', date: '2024-03-14' },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#64748b';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className={styles.recentActivity}>
        <SkeletonActivityCard />
        <SkeletonActivityCard />
        <SkeletonActivityCard />
      </div>
    );
  }

  return (
    <div className={styles.recentActivity}>
      {/* Recent Customers */}
      <div className={styles.activityCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>👥 آخر العملاء المسجلين</h3>
          <a href="/dashboard-admin/customers" className={styles.viewAll}>عرض الكل</a>
        </div>
        <div className={styles.cardBody}>
          {recentCustomers.length === 0 ? (
            <EmptyState
              icon="👥"
              title="لا يوجد عملاء"
              description="لم يتم تسجيل أي عملاء بعد"
            />
          ) : (
            recentCustomers.map((customer) => (
              <div key={customer.id} className={styles.activityItem}>
                <div className={styles.itemIcon}>👤</div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>{customer.name}</p>
                  <p className={styles.itemSubtitle}>{customer.email}</p>
                </div>
                <div className={styles.itemDate}>
                  {new Date(customer.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Products */}
      <div className={styles.activityCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>📦 آخر المنتجات المضافة</h3>
          <a href="/dashboard-admin/products" className={styles.viewAll}>عرض الكل</a>
        </div>
        <div className={styles.cardBody}>
          {recentProducts.length === 0 ? (
            <EmptyState
              icon="📦"
              title="لا توجد منتجات"
              description="لم يتم إضافة أي منتجات بعد"
              actionLabel="إضافة منتج"
              actionLink="/dashboard-admin/products"
            />
          ) : (
            recentProducts.map((product) => (
              <div key={product.id} className={styles.activityItem}>
                <div className={styles.itemIcon}>📦</div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>{product.name}</p>
                  <p className={styles.itemSubtitle}>{product.price.toLocaleString()} ج.م</p>
                </div>
                <div className={styles.itemDate}>
                  {new Date(product.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className={styles.activityCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>🛒 آخر الطلبات</h3>
          <a href="/dashboard-admin/orders" className={styles.viewAll}>عرض الكل</a>
        </div>
        <div className={styles.cardBody}>
          {recentOrders.length === 0 ? (
            <EmptyState
              icon="🛒"
              title="لا توجد طلبات"
              description="لم يتم استلام أي طلبات بعد"
            />
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} className={styles.activityItem}>
                <div className={styles.itemIcon}>🛒</div>
                <div className={styles.itemContent}>
                  <p className={styles.itemTitle}>طلب #{order.id}</p>
                  <p className={styles.itemSubtitle}>{order.customerName} • {order.total.toLocaleString()} ج.م</p>
                </div>
                <span 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
