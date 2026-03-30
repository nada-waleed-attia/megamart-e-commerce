'use client';

import { MdPrint, MdRefresh, MdCancel } from 'react-icons/md';
import styles from './OrderActions.module.css';

interface OrderActionsProps {
  orderStatus: string;
  onPrint?: () => void;
  onReorder?: () => void;
  onCancel?: () => void;
}

export default function OrderActions({ 
  orderStatus, 
  onPrint, 
  onReorder, 
  onCancel 
}: OrderActionsProps) {
  const canCancel = orderStatus === 'pending' || orderStatus === 'processing';

  return (
    <div className={styles.actions}>
      {onPrint && (
        <button className={styles.actionBtn} onClick={onPrint}>
          <MdPrint size={20} />
          <span>طباعة الفاتورة</span>
        </button>
      )}
      
      {onReorder && (
        <button className={styles.actionBtn} onClick={onReorder}>
          <MdRefresh size={20} />
          <span>إعادة الطلب</span>
        </button>
      )}
      
      {canCancel && onCancel && (
        <button className={`${styles.actionBtn} ${styles.cancelBtn}`} onClick={onCancel}>
          <MdCancel size={20} />
          <span>إلغاء الطلب</span>
        </button>
      )}
    </div>
  );
}
