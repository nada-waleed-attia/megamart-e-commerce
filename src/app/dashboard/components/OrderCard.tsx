'use client';

import Link from 'next/link';
import styles from './OrderCard.module.css';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  statusLabel: string;
  total: number;
  items: number;
}

interface OrderCardProps {
  order: Order;
  compact?: boolean;
}

export default function OrderCard({ order, compact = false }: OrderCardProps) {
  return (
    <div className={`${styles.orderCard} ${compact ? styles.compact : ''}`}>
      <div className={styles.orderHeader}>
        <span className={styles.orderNumber}>{order.orderNumber}</span>
        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
          {order.statusLabel}
        </span>
      </div>
      
      <div className={styles.orderDetails}>
        <div className={styles.orderInfo}>
          <span className={styles.orderLabel}>التاريخ:</span>
          <span>{order.date}</span>
        </div>
        <div className={styles.orderInfo}>
          <span className={styles.orderLabel}>المنتجات:</span>
          <span>{order.items} منتج</span>
        </div>
        <div className={styles.orderInfo}>
          <span className={styles.orderLabel}>الإجمالي:</span>
          <span className={styles.orderTotal}>{order.total} جنيه</span>
        </div>
      </div>

      <Link 
        href={`/dashboard/orders/${order.id}`}
        className={styles.viewDetailsBtn}
      >
        عرض التفاصيل
      </Link>
    </div>
  );
}
