'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { getOrderById } from '../../data';
import OrderTimeline from '../../components/OrderTimeline';
import OrderItems from '../../components/OrderItems';
import OrderSummary from '../../components/OrderSummary';
import ShippingAddress from '../../components/ShippingAddress';
import OrderActions from '../../components/OrderActions';
import styles from './order-details.module.css';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  // Get order from JSON data
  const order = getOrderById(orderId);

  // If order not found
  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>الطلب غير موجود</h1>
          <Link href="/dashboard/orders" className={styles.backBtn}>
            <MdArrowBack size={20} />
            <span>العودة للطلبات</span>
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleReorder = () => {
    console.log('Reorder clicked');
    alert('سيتم إضافة المنتجات إلى السلة');
  };

  const handleCancel = () => {
    if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
      console.log('Cancel order clicked');
      alert('تم إلغاء الطلب بنجاح');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/dashboard/orders" className={styles.backBtn}>
          <MdArrowBack size={20} />
          <span>العودة للطلبات</span>
        </Link>

        <OrderActions
          orderStatus={order.status}
          onPrint={handlePrint}
          onReorder={handleReorder}
          onCancel={handleCancel}
        />
      </div>

      <div className={styles.headerInfo}>
        <div>
          <h1>طلب رقم {order.orderNumber}</h1>
          <p>تاريخ الطلب: {order.date}</p>
        </div>
        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
          {order.statusLabel}
        </span>
      </div>

      <div className={styles.content}>
        {/* Timeline */}
        <div className={styles.section}>
          <h2>تتبع الطلب</h2>
          <OrderTimeline timeline={order.timeline} />
        </div>

        {/* Order Items */}
        <div className={styles.section}>
          <h2>المنتجات</h2>
          <OrderItems items={order.products.map(product => ({
            ...product,
            total: product.price * product.quantity
          }))} />
        </div>

        {/* Shipping Address */}
        <div className={styles.section}>
          <h2>عنوان التوصيل</h2>
          <ShippingAddress address={{
            fullName: order.shippingAddress.name,
            phone: order.shippingAddress.phone,
            city: order.shippingAddress.city,
            area: order.shippingAddress.area,
            street: order.shippingAddress.address.split('،')[0] || order.shippingAddress.address,
            building: '',
            floor: '',
            apartment: ''
          }} />
        </div>

        {/* Order Summary */}
        <div className={styles.section}>
          <h2>ملخص الطلب</h2>
          <OrderSummary
            subtotal={order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            shipping={50}
            total={order.total}
            paymentMethod={order.paymentMethod}
            paymentStatus="مدفوع"
          />
        </div>
      </div>
    </div>
  );
}
