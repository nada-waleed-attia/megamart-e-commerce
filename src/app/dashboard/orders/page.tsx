'use client';

import { useState } from 'react';
import { getOrders } from '../data';
import OrdersFilter from '../components/OrdersFilter';
import OrdersList from '../components/OrdersList';
import EmptyState from '../components/EmptyState';
import styles from './orders.module.css';

export default function OrdersPage() {
  const allOrders = getOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>طلباتي</h1>
          <h2>تتبع جميع طلباتك</h2>
          <p>راجع حالة طلباتك، تفاصيل الشحن، وتاريخ التوصيل المتوقع</p>
        </div>
      </div>

      <OrdersFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredOrders.length > 0 ? (
        <OrdersList orders={filteredOrders} />
      ) : (
        <EmptyState
          icon="📦"
          title="لا توجد طلبات"
          description="لم تقم بأي طلبات بعد"
          actionLabel="ابدأ التسوق"
          actionHref="/"
        />
      )}
    </div>
  );
}
