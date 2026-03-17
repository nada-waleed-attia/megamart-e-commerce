import React from 'react';
import styles from './QuickActions.module.css';

const actions = [
  {
    icon: '➕',
    label: 'إضافة منتج جديد',
    link: '/dashboard-admin/products',
  },
  {
    icon: '🏷️',
    label: 'إضافة قسم رئيسي',
    link: '/dashboard-admin/categories',
  },
  {
    icon: '🔖',
    label: 'إضافة قسم فرعي',
    link: '/dashboard-admin/sub-categories',
  },
  {
    icon: '🖼️',
    label: 'إضافة صورة سلايدر',
    link: '/dashboard-admin/store-interface',
  },
  {
    icon: '🏠',
    label: 'إدارة الصفحة الرئيسية',
    link: '/dashboard-admin/store-interface',
  },
  {
    icon: '📧',
    label: 'إرسال رسالة للقائمة البريدية',
    link: '/dashboard-admin/email-list',
  },
  {
    icon: '👥',
    label: 'عرض العملاء',
    link: '/dashboard-admin/customers',
  },
  {
    icon: '📋',
    label: 'عرض الطلبات',
    link: '/dashboard-admin/orders',
  },
];

export function QuickActions() {
  return (
    <div className={styles.quickActions}>
      <h3 className={styles.sectionTitle}>إجراءات سريعة</h3>
      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <a key={index} href={action.link} className={styles.actionCard}>
            <span className={styles.actionIcon}>{action.icon}</span>
            <span className={styles.actionLabel}>{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
