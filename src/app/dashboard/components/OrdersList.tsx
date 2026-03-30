'use client';

import Link from 'next/link';
import { Order } from './OrderCard';
import styles from './OrdersList.module.css';

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className={styles.ordersList}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span className={styles.orderNumber}>{order.orderNumber}</span>
            <span className={`${styles.orderStatus} ${styles[order.status]}`}>
              {order.statusLabel}
            </span>
          </div>

          <div className={styles.orderBody}>
            <div className={styles.orderInfo}>
              <span className={styles.orderLabel}>التاريخ</span>
              <span className={styles.orderValue}>{order.date}</span>
            </div>

            <div className={styles.orderInfo}>
              <span className={styles.orderLabel}>المنتجات</span>
              <span className={styles.orderValue}>{order.items} منتج</span>
            </div>

            <div className={styles.orderInfo}>
              <span className={styles.orderLabel}>الإجمالي</span>
              <span className={styles.orderTotal}>{order.total} جنيه</span>
            </div>

            <div className={styles.orderActions}>
              <Link href={`/dashboard/orders/${order.id}`} className={styles.viewBtn}>
                عرض التفاصيل
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
