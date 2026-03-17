import React from 'react';
import styles from './Alerts.module.css';

interface Alert {
  id: number;
  type: 'warning' | 'error' | 'info';
  icon: string;
  title: string;
  message: string;
  link: string;
}

export function Alerts() {
  // Mock data - TODO: Replace with actual API calls
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'error',
      icon: '⚠️',
      title: 'منتجات نفذ مخزونها',
      message: '5 منتجات مخزونها صفر',
      link: '/dashboard-admin/products',
    },
    {
      id: 2,
      type: 'warning',
      icon: '🖼️',
      title: 'منتجات بدون صور',
      message: '3 منتجات تحتاج إلى صور',
      link: '/dashboard-admin/products',
    },
    {
      id: 3,
      type: 'info',
      icon: '📂',
      title: 'أقسام فارغة',
      message: '2 أقسام بدون منتجات',
      link: '/dashboard-admin/categories',
    },
    {
      id: 4,
      type: 'warning',
      icon: '🎨',
      title: 'سلايدر فارغ',
      message: 'لا توجد صور في السلايدر الرئيسي',
      link: '/dashboard-admin/store-interface',
    },
  ];

  const getAlertColor = (type: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
      warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
      info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af' },
    };
    return colors[type] || colors.info;
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={styles.alertsSection}>
      <h3 className={styles.sectionTitle}>🔔 تنبيهات سريعة</h3>
      <div className={styles.alertsGrid}>
        {alerts.map((alert) => {
          const colors = getAlertColor(alert.type);
          return (
            <a
              key={alert.id}
              href={alert.link}
              className={styles.alertCard}
              style={{
                backgroundColor: colors.bg,
                borderRightColor: colors.border,
              }}
            >
              <div className={styles.alertIcon}>{alert.icon}</div>
              <div className={styles.alertContent}>
                <h4 className={styles.alertTitle} style={{ color: colors.text }}>
                  {alert.title}
                </h4>
                <p className={styles.alertMessage}>{alert.message}</p>
              </div>
              <div className={styles.alertArrow}>←</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
