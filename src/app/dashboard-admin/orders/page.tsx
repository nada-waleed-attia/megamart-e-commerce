"use client";

import { useState } from 'react';
import styles from './orders.module.css';
import heroStyles from '../hero.module.css';
import { 
  Order, 
  OrderStatus, 
  MOCK_ORDERS, 
  ORDER_STATUS_LABELS, 
  ORDER_STATUS_COLORS,
  PAYMENT_METHOD_LABELS 
} from '@/app/models/order';
import { MdSearch, MdFilterList, MdVisibility, MdPrint, MdFileDownload } from 'react-icons/md';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const handlePrint = (order: Order) => {
    console.log('Print order:', order.orderNumber);
    // هنا سيتم الطباعة لاحقًا
  };

  const handleExport = () => {
    console.log('Export orders');
    // هنا سيتم التصدير لاحقًا
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={heroStyles.heroSection}>
        <div className={heroStyles.heroContent}>
          <h1>إدارة الطلبات</h1>
          <h2>متابعة جميع الطلبات</h2>
          <p>راجع الطلبات الجديدة، حدث الحالات، وتابع عمليات الشحن</p>
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>إدارة الطلبات</h1>
        <button className={styles.exportButton} onClick={handleExport}>
          <MdFileDownload size={20} />
          تصدير
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <MdSearch size={20} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="ابحث برقم الطلب أو اسم العميل أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <MdFilterList size={20} />
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{orders.length}</div>
          <div className={styles.statLabel}>إجمالي الطلبات</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {orders.filter(o => o.status === 'pending').length}
          </div>
          <div className={styles.statLabel}>قيد الانتظار</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {orders.filter(o => o.status === 'processing').length}
          </div>
          <div className={styles.statLabel}>قيد المعالجة</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {orders.filter(o => o.status === 'delivered').length}
          </div>
          <div className={styles.statLabel}>تم التوصيل</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
              <th>طريقة الدفع</th>
              <th>التاريخ</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  لا توجد طلبات
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderNumber}>{order.orderNumber}</td>
                  <td>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>{order.customerName}</div>
                      <div className={styles.customerPhone}>{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className={styles.total}>{order.total.toLocaleString()} ج.م</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      style={{ 
                        backgroundColor: ORDER_STATUS_COLORS[order.status],
                        color: 'white'
                      }}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    >
                      <option value="pending">{ORDER_STATUS_LABELS.pending}</option>
                      <option value="processing">{ORDER_STATUS_LABELS.processing}</option>
                      <option value="shipped">{ORDER_STATUS_LABELS.shipped}</option>
                      <option value="delivered">{ORDER_STATUS_LABELS.delivered}</option>
                      <option value="cancelled">{ORDER_STATUS_LABELS.cancelled}</option>
                    </select>
                  </td>
                  <td>{PAYMENT_METHOD_LABELS[order.paymentMethod]}</td>
                  <td className={styles.date}>{formatDate(order.createdAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => window.location.href = `/dashboard-admin/orders/${order.id}`}
                        title="عرض التفاصيل"
                      >
                        <MdVisibility size={18} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handlePrint(order)}
                        title="طباعة"
                      >
                        <MdPrint size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className={styles.modal} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>تفاصيل الطلب {selectedOrder.orderNumber}</h2>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Customer Info */}
              <div className={styles.detailSection}>
                <h3>معلومات العميل</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>الاسم:</span>
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>الهاتف:</span>
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>البريد:</span>
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>العنوان:</span>
                    <span>{selectedOrder.shippingAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className={styles.detailSection}>
                <h3>المنتجات</h3>
                <div className={styles.itemsList}>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.productName}</span>
                        <span className={styles.itemQuantity}>الكمية: {item.quantity}</span>
                      </div>
                      <span className={styles.itemTotal}>
                        {item.total.toLocaleString()} ج.م
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className={styles.detailSection}>
                <h3>ملخص الطلب</h3>
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>المجموع الفرعي:</span>
                    <span>{selectedOrder.subtotal.toLocaleString()} ج.م</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>الشحن:</span>
                    <span>{selectedOrder.shipping.toLocaleString()} ج.م</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>الضريبة:</span>
                    <span>{selectedOrder.tax.toLocaleString()} ج.م</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>الإجمالي:</span>
                    <span>{selectedOrder.total.toLocaleString()} ج.م</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.printButton}
                onClick={() => handlePrint(selectedOrder)}
              >
                <MdPrint size={18} />
                طباعة الفاتورة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
