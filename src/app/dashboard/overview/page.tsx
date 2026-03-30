'use client';

import Link from 'next/link';
import { MdShoppingBag, MdLocalShipping, MdFavorite, MdLocationOn } from 'react-icons/md';
import WelcomeCard from '../components/WelcomeCard';
import StatCard from '../components/StatCard';
import OrderCard from '../components/OrderCard';
import { getUser, getStats, getOrders } from '../data';
import styles from './overview.module.css';

export default function OverviewPage() {
  const user = getUser();
  const stats = getStats();
  const orders = getOrders();
  const recentOrders = orders.slice(0, 3);

  const quickLinks = [
    { label: 'تصفح المنتجات', href: '/', icon: '🛍️' },
    { label: 'إضافة عنوان جديد', href: '/dashboard/addresses', icon: '📍' },
    { label: 'تعديل الملف الشخصي', href: '/dashboard/profile', icon: '👤' },
    { label: 'تغيير كلمة المرور', href: '/dashboard/settings', icon: '🔒' },
  ];

  // Map icon names to actual components
  const iconMap: Record<string, any> = {
    MdShoppingBag,
    MdLocalShipping,
    MdFavorite,
    MdLocationOn,
  };

  return (
    <div className={styles.container}>
      {/* Welcome Card */}
      <WelcomeCard userName={user.name} />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>مرحباً بك في لوحة التحكم</h1>
          <h2>إدارة حسابك بسهولة</h2>
          <p>تابع طلباتك، عناوينك، قائمة المفضلة، وإعدادات حسابك من مكان واحد</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={iconMap[stat.icon]}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>آخر الطلبات</h2>
          <Link href="/dashboard/orders" className={styles.viewAll}>
            عرض الكل
          </Link>
        </div>

        <div className={styles.ordersGrid}>
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} compact />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className={styles.section}>
        <h2>روابط سريعة</h2>
        <div className={styles.quickLinksGrid}>
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href} className={styles.quickLink}>
              <span className={styles.quickLinkIcon}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
