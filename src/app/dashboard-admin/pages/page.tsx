"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './pages.module.css';
import { StaticPage, MOCK_STATIC_PAGES } from '@/app/models/static-page';
import { PageHeader, EmptyState, StatusBadge } from '../components/shared';
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';

export default function StaticPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>(MOCK_STATIC_PAGES);

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      setPages(pages.filter(p => p.id !== id));
    }
  };

  const togglePublish = (id: number) => {
    setPages(pages.map(p => 
      p.id === id ? { ...p, isPublished: !p.isPublished } : p
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title="إدارة المحتوى الثابت"
        subtitle="إدارة الصفحات الثابتة مثل من نحن، سياسة الخصوصية، وغيرها"
        action={
          <Link href="/dashboard-admin/pages/new" className={styles.addButton}>
            <MdAdd size={20} />
            إضافة صفحة جديدة
          </Link>
        }
      />

      {pages.length === 0 ? (
        <EmptyState
          icon="📄"
          title="لا توجد صفحات"
          description="ابدأ بإضافة صفحة ثابتة جديدة"
          action={
            <Link href="/dashboard-admin/pages/new" className={styles.addButton}>
              <MdAdd size={20} />
              إضافة صفحة
            </Link>
          }
        />
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>العنوان</th>
                <th>الرابط</th>
                <th>الحالة</th>
                <th>آخر تحديث</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className={styles.title}>{page.title}</td>
                  <td className={styles.slug}>/{page.slug}</td>
                  <td>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={page.isPublished}
                        onChange={() => togglePublish(page.id)}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                    <StatusBadge
                      status={page.isPublished ? 'منشور' : 'مسودة'}
                      color={page.isPublished ? '#10b981' : '#6b7280'}
                    />
                  </td>
                  <td className={styles.date}>{formatDate(page.updatedAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/dashboard-admin/pages/${page.id}`}
                        className={styles.actionButton}
                        title="تعديل"
                      >
                        <MdEdit size={18} />
                      </Link>
                      <button
                        className={styles.actionButton}
                        onClick={() => window.open(`/${page.slug}`, '_blank')}
                        title="معاينة"
                      >
                        <MdVisibility size={18} />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(page.id)}
                        title="حذف"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
