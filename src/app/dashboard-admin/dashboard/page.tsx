"use client";

import React, { useEffect, useState } from 'react';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { QuickActions } from '../components/QuickActions/QuickActions';
import { Alerts } from '../components/Alerts/Alerts';
import { RecentActivity } from '../components/RecentActivity/RecentActivity';
import { SkeletonCard } from '../components/Skeleton/Skeleton';
import styles from './dashboard.module.css';
import heroStyles from '../hero.module.css';

interface DashboardMetrics {
  totalCustomers: number;
  totalProducts: number;
  totalMainCategories: number;
  totalSubCategories: number;
  totalNewsletterSubscribers: number;
  newOrders: number;
  lowStockProducts: number;
  unpublishedProducts: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalCustomers: 0,
    totalProducts: 0,
    totalMainCategories: 0,
    totalSubCategories: 0,
    totalNewsletterSubscribers: 0,
    newOrders: 0,
    lowStockProducts: 0,
    unpublishedProducts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMetrics = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalCustomers: 856,
          totalProducts: 342,
          totalMainCategories: 12,
          totalSubCategories: 45,
          totalNewsletterSubscribers: 1250,
          newOrders: 28,
          lowStockProducts: 15,
          unpublishedProducts: 8,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const metricCards = [
    {
      icon: '👥',
      label: 'إجمالي العملاء',
      value: metrics.totalCustomers,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      link: '/dashboard-admin/customers',
    },
    {
      icon: '📦',
      label: 'إجمالي المنتجات',
      value: metrics.totalProducts,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      link: '/dashboard-admin/products',
    },
    {
      icon: '🏷️',
      label: 'عدد الأقسام الرئيسية',
      value: metrics.totalMainCategories,
      color: '#10b981',
      bgColor: '#ecfdf5',
      link: '/dashboard-admin/categories',
    },
    {
      icon: '🔖',
      label: 'عدد الأقسام الفرعية',
      value: metrics.totalSubCategories,
      color: '#06b6d4',
      bgColor: '#ecfeff',
      link: '/dashboard-admin/sub-categories',
    },
    {
      icon: '📧',
      label: 'المشتركين في القائمة البريدية',
      value: metrics.totalNewsletterSubscribers,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      link: '/dashboard-admin/email-list',
    },
    {
      icon: '🛒',
      label: 'الطلبات الجديدة',
      value: metrics.newOrders,
      color: '#ec4899',
      bgColor: '#fdf2f8',
      link: '/dashboard-admin/orders',
      badge: metrics.newOrders > 0 ? 'جديد' : null,
    },
    {
      icon: '⚠️',
      label: 'منتجات منخفضة المخزون',
      value: metrics.lowStockProducts,
      color: '#ef4444',
      bgColor: '#fef2f2',
      link: '/dashboard-admin/products',
      badge: metrics.lowStockProducts > 0 ? 'تحذير' : null,
    },
    {
      icon: '📝',
      label: 'منتجات غير منشورة',
      value: metrics.unpublishedProducts,
      color: '#64748b',
      bgColor: '#f8fafc',
      link: '/dashboard-admin/products',
    },
  ];

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h2 className={styles.title}>نظرة عامة</h2>
          <p className={styles.subtitle}>جاري تحميل البيانات...</p>
        </div>

        <div className={styles.metricsGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Hero Section */}
      <div className={heroStyles.heroSection}>
        <div className={heroStyles.heroContent}>
          <h1>لوحة التحكم الإدارية</h1>
          <h2>نظرة شاملة على المتجر</h2>
          <p>تابع المبيعات، الطلبات، المنتجات، والعملاء من مكان واحد</p>
        </div>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>نظرة عامة</h2>
        <p className={styles.subtitle}>مرحباً بك في لوحة التحكم - إليك ملخص سريع لحالة المتجر</p>
      </div>

      <div className={styles.metricsGrid}>
        {metricCards.map((card, index) => (
          <MetricCard key={index} {...card} />
        ))}
      </div>

      <Alerts />

      <QuickActions />

      <RecentActivity isLoading={false} />

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>الطلبات الأخيرة</h3>
          <div className={styles.comingSoon}>
            <p>📊 الرسوم البيانية قريباً</p>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>أفضل المنتجات مبيعاً</h3>
          <div className={styles.comingSoon}>
            <p>📈 الرسوم البيانية قريباً</p>
          </div>
        </div>
      </div>
    </div>
  );
}
