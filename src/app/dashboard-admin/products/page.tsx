"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './products.module.css';
import { MdAdd, MdInventory, MdCategory, MdLabel } from 'react-icons/md';

interface Stats {
  totalProducts: number;
  publishedProducts: number;
  unpublishedProducts: number;
  lowStock: number;
  totalCategories: number;
  totalSubCategories: number;
}

export default function ProductsOverviewPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    publishedProducts: 0,
    unpublishedProducts: 0,
    lowStock: 0,
    totalCategories: 0,
    totalSubCategories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      setStats({
        totalProducts: 450,
        publishedProducts: 420,
        unpublishedProducts: 30,
        lowStock: 25,
        totalCategories: 12,
        totalSubCategories: 48,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      icon: <MdCategory size={24} />,
      label: 'إضافة قسم رئيسي',
      path: '/dashboard-admin/categories',
      color: '#f59e0b',
    },
    {
      icon: <MdLabel size={24} />,
      label: 'إضافة قسم فرعي',
      path: '/dashboard-admin/sub-categories',
      color: '#ec4899',
    },
    {
      icon: <MdAdd size={24} />,
      label: 'إضافة منتج جديد',
      path: '/dashboard-admin/products/add',
      color: '#10b981',
    },
  ];

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.overviewPage}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>نظرة عامة - إدارة المنتجات</h2>
          <p className={styles.subtitle}>مركز التحكم في المنتجات والأقسام</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <Link href="/dashboard-admin/categories" className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            <MdCategory size={28} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>الأقسام الرئيسية</p>
            <h3 className={styles.statValue}>{stats.totalCategories}</h3>
          </div>
        </Link>

        <Link href="/dashboard-admin/sub-categories" className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
            <MdLabel size={28} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>الأقسام الفرعية</p>
            <h3 className={styles.statValue}>{stats.totalSubCategories}</h3>
          </div>
        </Link>

        <Link href="/dashboard-admin/products/all" className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <MdInventory size={28} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المنتجات</p>
            <h3 className={styles.statValue}>{stats.totalProducts}</h3>
          </div>
        </Link>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            ✓
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>منتجات منشورة</p>
            <h3 className={styles.statValue}>{stats.publishedProducts}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#f59e0b' }}>
            ⏸
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>منتجات غير منشورة</p>
            <h3 className={styles.statValue}>{stats.unpublishedProducts}</h3>
          </div>
        </div>

        <Link 
          href="/dashboard-admin/products/all?filter=low-stock" 
          className={`${styles.statCard} ${stats.lowStock > 0 ? styles.alertCard : ''}`}
        >
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            ⚠️
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>منخفضة المخزون</p>
            <h3 className={styles.statValue}>{stats.lowStock}</h3>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActionsSection}>
        <h3 className={styles.sectionTitle}>إجراءات سريعة</h3>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.path}
              className={styles.quickActionCard}
            >
              <div 
                className={styles.quickActionIcon} 
                style={{ backgroundColor: `${action.color}15`, color: action.color }}
              >
                {action.icon}
              </div>
              <span className={styles.quickActionLabel}>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Cards */}
      <div className={styles.navigationSection}>
        <h3 className={styles.sectionTitle}>التنقل السريع</h3>
        <div className={styles.navGrid}>
          <Link href="/dashboard-admin/categories" className={styles.navCard}>
            <div className={styles.navCardIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
              <MdCategory size={32} />
            </div>
            <div className={styles.navCardContent}>
              <h4>الأقسام الرئيسية</h4>
              <p>{stats.totalCategories} قسم</p>
            </div>
            <span className={styles.navArrow}>←</span>
          </Link>

          <Link href="/dashboard-admin/sub-categories" className={styles.navCard}>
            <div className={styles.navCardIcon} style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
              <MdLabel size={32} />
            </div>
            <div className={styles.navCardContent}>
              <h4>الأقسام الفرعية</h4>
              <p>{stats.totalSubCategories} قسم</p>
            </div>
            <span className={styles.navArrow}>←</span>
          </Link>

          <Link href="/dashboard-admin/products/all" className={styles.navCard}>
            <div className={styles.navCardIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
              <MdInventory size={32} />
            </div>
            <div className={styles.navCardContent}>
              <h4>جميع المنتجات</h4>
              <p>{stats.totalProducts} منتج</p>
            </div>
            <span className={styles.navArrow}>←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
