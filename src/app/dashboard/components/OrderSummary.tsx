'use client';

import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
}

export default function OrderSummary({ 
  subtotal, 
  shipping, 
  total, 
  paymentMethod, 
  paymentStatus 
}: OrderSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryRow}>
        <span>المجموع الفرعي</span>
        <span>{subtotal} جنيه</span>
      </div>
      <div className={styles.summaryRow}>
        <span>الشحن</span>
        <span>{shipping} جنيه</span>
      </div>
      <div className={styles.summaryRow}>
        <span>طريقة الدفع</span>
        <span>{paymentMethod}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>حالة الدفع</span>
        <span className={styles.paid}>{paymentStatus}</span>
      </div>
      <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
        <span>الإجمالي</span>
        <span>{total} جنيه</span>
      </div>
    </div>
  );
}
