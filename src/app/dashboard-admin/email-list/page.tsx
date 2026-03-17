"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DataTable, Column } from '../components/DataTable/DataTable';
import styles from './email-list.module.css';

interface Subscriber {
  id: number;
  name?: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscriptionDate: string;
  source?: 'footer' | 'popup' | 'checkout';
}

export default function EmailListPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [filterDateRange, setFilterDateRange] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchSubscribers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockSubscribers: Subscriber[] = [
          {
            id: 1,
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            status: 'active',
            subscriptionDate: '2024-01-15',
            source: 'footer',
          },
          {
            id: 2,
            name: 'فاطمة علي',
            email: 'fatima@example.com',
            status: 'active',
            subscriptionDate: '2024-01-20',
            source: 'popup',
          },
          {
            id: 3,
            email: 'user@example.com',
            status: 'unsubscribed',
            subscriptionDate: '2024-01-10',
            source: 'checkout',
          },
          {
            id: 4,
            name: 'محمد حسن',
            email: 'mohamed@example.com',
            status: 'active',
            subscriptionDate: '2024-02-01',
            source: 'footer',
          },
          {
            id: 5,
            name: 'سارة أحمد',
            email: 'sara@example.com',
            status: 'active',
            subscriptionDate: '2024-02-05',
            source: 'popup',
          },
        ];
        
        setSubscribers(mockSubscribers);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const matchesSearch = 
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (subscriber.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus;
      
      // Date filtering
      let matchesDate = true;
      if (filterDateRange !== 'all') {
        const subDate = new Date(subscriber.subscriptionDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filterDateRange === 'today') {
          matchesDate = subDate >= today;
        } else if (filterDateRange === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesDate = subDate >= weekAgo;
        } else if (filterDateRange === 'month') {
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          matchesDate = subDate >= monthAgo;
        } else if (filterDateRange === 'custom' && customStartDate && customEndDate) {
          const startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999);
          matchesDate = subDate >= startDate && subDate <= endDate;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [subscribers, searchQuery, filterStatus, filterDateRange, customStartDate, customEndDate]);

  const activeCount = subscribers.filter(s => s.status === 'active').length;
  const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;

  const handleToggleStatus = (id: number) => {
    setSubscribers(prev => prev.map(sub => 
      sub.id === id 
        ? { ...sub, status: sub.status === 'active' ? 'unsubscribed' : 'active' }
        : sub
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المشترك؟')) {
      setSubscribers(prev => prev.filter(sub => sub.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`هل أنت متأكد من حذف ${selectedIds.length} مشترك؟`)) {
      setSubscribers(prev => prev.filter(sub => !selectedIds.includes(sub.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkToggleStatus = (newStatus: 'active' | 'unsubscribed') => {
    if (selectedIds.length === 0) return;
    setSubscribers(prev => prev.map(sub => 
      selectedIds.includes(sub.id) ? { ...sub, status: newStatus } : sub
    ));
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['ID', 'الاسم', 'البريد الإلكتروني', 'الحالة', 'تاريخ الاشتراك', 'المصدر'],
      ...filteredSubscribers.map(sub => [
        sub.id,
        sub.name || '-',
        sub.email,
        sub.status === 'active' ? 'نشط' : 'غير نشط',
        sub.subscriptionDate,
        sub.source || '-'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleRowClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowModal(true);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubscribers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const columns: Column<Subscriber>[] = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0}
          onChange={handleSelectAll}
          className={styles.checkbox}
        />
      ) as any,
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => handleSelectOne(row.id)}
          onClick={(e) => e.stopPropagation()}
          className={styles.checkbox}
        />
      ),
    },
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      label: 'الاسم',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'email',
      label: 'البريد الإلكتروني',
      sortable: true,
    },
    {
      key: 'status',
      label: 'الحالة',
      sortable: true,
      render: (value) => (
        <span className={`${styles.statusBadge} ${styles[value]}`}>
          {value === 'active' ? '✓ نشط' : '✗ غير نشط'}
        </span>
      ),
    },
    {
      key: 'subscriptionDate',
      label: 'تاريخ الاشتراك',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ar-EG'),
    },
    {
      key: 'source',
      label: 'المصدر',
      render: (value) => {
        if (!value) return '-';
        const sourceLabels = {
          footer: 'التذييل',
          popup: 'نافذة منبثقة',
          checkout: 'صفحة الدفع',
        };
        return (
          <span className={styles.sourceBadge}>
            {sourceLabels[value]}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (_, row) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.actionBtn}
            onClick={() => handleToggleStatus(row.id)}
            title={row.status === 'active' ? 'إلغاء التفعيل' : 'إعادة التفعيل'}
          >
            {row.status === 'active' ? '🔕' : '🔔'}
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleRowClick(row)}
            title="تعديل"
          >
            ✏️
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => handleDelete(row.id)}
            title="حذف"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.emailListPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إدارة القائمة البريدية</h2>
          <p className={styles.subtitle}>عرض وإدارة المشتركين في النشرة الإخبارية</p>
        </div>
        <button className={styles.exportBtn} onClick={handleExportCSV}>
          📥 تصدير CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            📧
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المشتركين</p>
            <h3 className={styles.statValue}>{subscribers.length}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            ✓
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>النشطين</p>
            <h3 className={styles.statValue}>{activeCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            ✗
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>غير النشطين</p>
            <h3 className={styles.statValue}>{unsubscribedCount}</h3>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            الكل ({subscribers.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            النشطين ({activeCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'unsubscribed' ? styles.active : ''}`}
            onClick={() => setFilterStatus('unsubscribed')}
          >
            غير النشطين ({unsubscribedCount})
          </button>
        </div>

        <div className={styles.resultsCount}>
          {filteredSubscribers.length} نتيجة
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.bulkCount}>تم تحديد {selectedIds.length} مشترك</span>
          <div className={styles.bulkButtons}>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus('active')}
            >
              ✓ تفعيل
            </button>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus('unsubscribed')}
            >
              ✗ إلغاء التفعيل
            </button>
            <button
              className={`${styles.bulkBtn} ${styles.danger}`}
              onClick={handleBulkDelete}
            >
              🗑️ حذف
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredSubscribers}
        isLoading={isLoading}
        emptyMessage="لا توجد مشتركين"
        onRowClick={handleRowClick}
      />

      {/* Edit Modal */}
      {showModal && selectedSubscriber && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>تفاصيل المشترك</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>الاسم</label>
                <input
                  type="text"
                  value={selectedSubscriber.name || ''}
                  onChange={(e) => setSelectedSubscriber({ ...selectedSubscriber, name: e.target.value })}
                  placeholder="اختياري"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  value={selectedSubscriber.email}
                  onChange={(e) => setSelectedSubscriber({ ...selectedSubscriber, email: e.target.value })}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الحالة</label>
                <select
                  value={selectedSubscriber.status}
                  onChange={(e) => setSelectedSubscriber({ ...selectedSubscriber, status: e.target.value as any })}
                  className={styles.select}
                >
                  <option value="active">نشط</option>
                  <option value="unsubscribed">غير نشط</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>تاريخ الاشتراك</label>
                <input
                  type="text"
                  value={new Date(selectedSubscriber.subscriptionDate).toLocaleDateString('ar-EG')}
                  disabled
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>المصدر</label>
                <input
                  type="text"
                  value={selectedSubscriber.source || '-'}
                  disabled
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.saveBtn}
                onClick={() => {
                  setSubscribers(prev => prev.map(sub =>
                    sub.id === selectedSubscriber.id ? selectedSubscriber : sub
                  ));
                  setShowModal(false);
                }}
              >
                حفظ التغييرات
              </button>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
