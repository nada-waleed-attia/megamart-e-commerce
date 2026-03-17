"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './order-details.module.css';
import { 
  Order, 
  OrderStatus, 
  MOCK_ORDERS, 
  ORDER_STATUS_LABELS, 
  ORDER_STATUS_COLORS,
  PAYMENT_METHOD_LABELS 
} from '@/app/models/order';
import { MdArrowBack, MdPrint, MdEdit, MdSave, MdCancel } from 'react-icons/md';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = parseInt(params.id as string);
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<OrderStatus>('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // جلب بيانات الطلب
    const foundOrder = MOCK_ORDERS.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setEditedStatus(foundOrder.status);
      setNotes(foundOrder.notes || '');
    }
  }, [orderId]);

  const handleSave = () => {
    if (order) {
      setOrder({
        ...order,
        status: editedStatus,
        notes: notes,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
      // هنا سيتم الحفظ في الـ API
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <MdArrowBack size={20} />
            رجوع
          </button>
          <div>
            <h1 className={styles.title}>الطلب {order.orderNumber}</h1>
            <p className={styles.subtitle}>تم الإنشاء في {formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className={styles.headerRight}>
          {!isEditing ? (
            <>
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                <MdEdit size={18} />
                تعديل
              </button>
              <button className={styles.printButton} onClick={handlePrint}>
                <MdPrint size={18} />
                طباعة
              </button>
            </>
          ) : (
            <>
              <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                <MdCancel size={18} />
                إلغاء
              </button>
              <button className={styles.saveButton} onClick={handleSave}>
                <MdSave size={18} />
                حفظ
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {/* Status Card */}
        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <h3>حالة الطلب</h3>
            {isEditing ? (
              <select
                className={styles.statusSelect}
                style={{ 
                  backgroundColor: ORDER_STATUS_COLORS[editedStatus],
                  color: 'white'
                }}
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value as OrderStatus)}
              >
                <option value="pending">{ORDER_STATUS_LABELS.pending}</option>
                <option value="processing">{ORDER_STATUS_LABELS.processing}</option>
                <option value="shipped">{ORDER_STATUS_LABELS.shipped}</option>
                <option value="delivered">{ORDER_STATUS_LABELS.delivered}</option>
                <option value="cancelled">{ORDER_STATUS_LABELS.cancelled}</option>
              </select>
            ) : (
              <span 
                className={styles.statusBadge}
                style={{ backgroundColor: ORDER_STATUS_COLORS[order.status] }}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            )}
          </div>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineTitle}>تم إنشاء الطلب</div>
                <div className={styles.timelineDate}>{formatDate(order.createdAt)}</div>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineTitle}>آخر تحديث</div>
                <div className={styles.timelineDate}>{formatDate(order.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Customer Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>معلومات العميل</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>الاسم:</span>
                <span className={styles.infoValue}>{order.customerName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>الهاتف:</span>
                <span className={styles.infoValue}>{order.customerPhone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>البريد:</span>
                <span className={styles.infoValue}>{order.customerEmail}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>العنوان:</span>
                <span className={styles.infoValue}>{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>معلومات الدفع</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>طريقة الدفع:</span>
                <span className={styles.infoValue}>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>المجموع الفرعي:</span>
                <span className={styles.infoValue}>{order.subtotal.toLocaleString()} ج.م</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>الشحن:</span>
                <span className={styles.infoValue}>{order.shipping.toLocaleString()} ج.م</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>الضريبة:</span>
                <span className={styles.infoValue}>{order.tax.toLocaleString()} ج.م</span>
              </div>
              <div className={`${styles.infoItem} ${styles.totalItem}`}>
                <span className={styles.infoLabel}>الإجمالي:</span>
                <span className={styles.infoValue}>{order.total.toLocaleString()} ج.م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>المنتجات</h3>
          <div className={styles.itemsTable}>
            <table>
              <thead>
                <tr>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productInfo}>
                        <span className={styles.productName}>{item.productName}</span>
                      </div>
                    </td>
                    <td>{item.price.toLocaleString()} ج.م</td>
                    <td>{item.quantity}</td>
                    <td className={styles.itemTotal}>{item.total.toLocaleString()} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>ملاحظات</h3>
          {isEditing ? (
            <textarea
              className={styles.notesTextarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أضف ملاحظات على الطلب..."
              rows={4}
            />
          ) : (
            <p className={styles.notesText}>
              {order.notes || 'لا توجد ملاحظات'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
