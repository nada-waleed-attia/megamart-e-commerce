"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DataTable, Column } from '../components/DataTable/DataTable';
import styles from './customers.module.css';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  registrationDate: string;
  lastActivity: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'blocked'>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'orders' | 'addresses' | 'notes'>('view');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchCustomers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCustomers: Customer[] = [
          {
            id: 1,
            name: 'أحمد محمد علي',
            email: 'ahmed@example.com',
            phone: '01012345678',
            totalOrders: 15,
            totalSpent: 125000,
            status: 'active',
            registrationDate: '2024-01-15',
            lastActivity: '2024-03-10',
          },
          {
            id: 2,
            name: 'فاطمة حسن',
            email: 'fatima@example.com',
            phone: '01098765432',
            totalOrders: 8,
            totalSpent: 65000,
            status: 'active',
            registrationDate: '2024-02-01',
            lastActivity: '2024-03-12',
          },
          {
            id: 3,
            name: 'محمد عبدالله',
            email: 'mohamed@example.com',
            phone: '01155667788',
            totalOrders: 3,
            totalSpent: 18000,
            status: 'inactive',
            registrationDate: '2024-01-20',
            lastActivity: '2024-02-15',
          },
          {
            id: 4,
            name: 'سارة أحمد',
            email: 'sara@example.com',
            phone: '01234567890',
            totalOrders: 0,
            totalSpent: 0,
            status: 'blocked',
            registrationDate: '2024-03-01',
            lastActivity: '2024-03-05',
          },
        ];
        
        setCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery);
      
      const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, filterStatus]);

  const activeCount = customers.filter(c => c.status === 'active').length;
  const inactiveCount = customers.filter(c => c.status === 'inactive').length;
  const blockedCount = customers.filter(c => c.status === 'blocked').length;

  const handleToggleStatus = (id: number, newStatus: 'active' | 'inactive' | 'blocked') => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, status: newStatus } : customer
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟ سيتم حذف جميع بياناته وطلباته.')) {
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`هل أنت متأكد من حذف ${selectedIds.length} عميل؟`)) {
      setCustomers(prev => prev.filter(customer => !selectedIds.includes(customer.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkToggleStatus = (newStatus: 'active' | 'inactive' | 'blocked') => {
    if (selectedIds.length === 0) return;
    setCustomers(prev => prev.map(customer => 
      selectedIds.includes(customer.id) ? { ...customer, status: newStatus } : customer
    ));
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['ID', 'الاسم', 'البريد الإلكتروني', 'الهاتف', 'عدد الطلبات', 'إجمالي الإنفاق', 'الحالة', 'تاريخ التسجيل', 'آخر نشاط'],
      ...filteredCustomers.map(customer => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.totalOrders,
        customer.totalSpent,
        customer.status === 'active' ? 'نشط' : customer.status === 'inactive' ? 'غير نشط' : 'محظور',
        customer.registrationDate,
        customer.lastActivity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleRowClick = (customer: Customer, type: 'view' | 'edit' | 'orders' | 'addresses' | 'notes' = 'view') => {
    if (type === 'view') {
      // Navigate to customer details page
      window.location.href = `/dashboard-admin/customers/${customer.id}`;
    } else {
      setSelectedCustomer(customer);
      setModalType(type);
      setShowModal(true);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredCustomers.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleResetPassword = (customer: Customer) => {
    if (confirm(`هل تريد إرسال رابط إعادة تعيين كلمة المرور إلى ${customer.email}؟`)) {
      // TODO: Implement password reset
      alert('تم إرسال رابط إعادة تعيين كلمة المرور بنجاح');
    }
  };

  const toggleDropdown = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      setDropdownPosition(null);
    } else {
      const button = e.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 5,
        left: rect.left - 180, // 180 = width of menu - button width
      });
      setOpenDropdownId(id);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdownId !== null) {
        setOpenDropdownId(null);
        setDropdownPosition(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  const columns: Column<Customer>[] = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0}
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
    },
    {
      key: 'email',
      label: 'البريد الإلكتروني',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'الهاتف',
    },
    {
      key: 'totalOrders',
      label: 'عدد الطلبات',
      sortable: true,
    },
    {
      key: 'totalSpent',
      label: 'إجمالي الإنفاق',
      sortable: true,
      render: (value) => `${value.toLocaleString()} ج.م`,
    },
    {
      key: 'status',
      label: 'الحالة',
      sortable: true,
      render: (value) => (
        <span className={`${styles.statusBadge} ${styles[value]}`}>
          {value === 'active' ? '✓ نشط' : value === 'inactive' ? '⏸ غير نشط' : '🚫 محظور'}
        </span>
      ),
    },
    {
      key: 'registrationDate',
      label: 'تاريخ التسجيل',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ar-EG'),
    },
    {
      key: 'lastActivity',
      label: 'آخر نشاط',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ar-EG'),
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (_, row) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.actionBtn}
            onClick={() => handleRowClick(row, 'view')}
            title="عرض التفاصيل"
          >
            👁️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleRowClick(row, 'edit')}
            title="تعديل"
          >
            ✏️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleRowClick(row, 'orders')}
            title="عرض الطلبات"
          >
            📦
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleToggleStatus(row.id, row.status === 'active' ? 'inactive' : 'active')}
            title={row.status === 'active' ? 'تعطيل' : 'تفعيل'}
          >
            {row.status === 'active' ? '⏸' : '✓'}
          </button>
          <button
            className={styles.actionBtn}
            onClick={(e) => toggleDropdown(row.id, e)}
            title="المزيد"
          >
            ⋮
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.customersPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إدارة العملاء</h2>
          <p className={styles.subtitle}>عرض وإدارة حسابات العملاء</p>
        </div>
        <button className={styles.exportBtn} onClick={handleExportCSV}>
          📥 تصدير CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            👥
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي العملاء</p>
            <h3 className={styles.statValue}>{customers.length}</h3>
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
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#f59e0b' }}>
            ⏸
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>غير النشطين</p>
            <h3 className={styles.statValue}>{inactiveCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            🚫
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>المحظورين</p>
            <h3 className={styles.statValue}>{blockedCount}</h3>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder="بحث بالاسم، البريد الإلكتروني، أو الهاتف..."
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
            الكل ({customers.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            النشطين ({activeCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'inactive' ? styles.active : ''}`}
            onClick={() => setFilterStatus('inactive')}
          >
            غير النشطين ({inactiveCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'blocked' ? styles.active : ''}`}
            onClick={() => setFilterStatus('blocked')}
          >
            المحظورين ({blockedCount})
          </button>
        </div>

        <div className={styles.resultsCount}>
          {filteredCustomers.length} نتيجة
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.bulkCount}>تم تحديد {selectedIds.length} عميل</span>
          <div className={styles.bulkButtons}>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus('active')}
            >
              ✓ تفعيل
            </button>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus('inactive')}
            >
              ⏸ تعطيل
            </button>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus('blocked')}
            >
              🚫 حظر
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
        data={filteredCustomers}
        isLoading={isLoading}
        emptyMessage="لا يوجد عملاء"
        onRowClick={(row) => handleRowClick(row, 'view')}
      />

      {/* Dropdown Menu Portal */}
      {openDropdownId !== null && dropdownPosition && (
        <div 
          className={styles.dropdownMenu}
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(() => {
            const customer = customers.find(c => c.id === openDropdownId);
            if (!customer) return null;
            return (
              <>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStatus(customer.id, 'blocked');
                  setOpenDropdownId(null);
                }}>
                  🚫 حظر
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleResetPassword(customer);
                  setOpenDropdownId(null);
                }}>
                  🔑 إعادة تعيين كلمة المرور
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(customer, 'addresses');
                  setOpenDropdownId(null);
                }}>
                  📍 عرض العناوين
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(customer, 'notes');
                  setOpenDropdownId(null);
                }}>
                  📝 إضافة ملاحظة
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(customer.id);
                  setOpenDropdownId(null);
                }} className={styles.deleteAction}>
                  🗑️ حذف
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCustomer && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>
                {modalType === 'view' && 'تفاصيل العميل'}
                {modalType === 'edit' && 'تعديل بيانات العميل'}
                {modalType === 'orders' && 'طلبات العميل'}
                {modalType === 'addresses' && 'عناوين العميل'}
                {modalType === 'notes' && 'ملاحظات العميل'}
              </h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              {modalType === 'view' && (
                <div className={styles.customerDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>الاسم:</span>
                    <span className={styles.detailValue}>{selectedCustomer.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>البريد الإلكتروني:</span>
                    <span className={styles.detailValue}>{selectedCustomer.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>الهاتف:</span>
                    <span className={styles.detailValue}>{selectedCustomer.phone}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>عدد الطلبات:</span>
                    <span className={styles.detailValue}>{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>إجمالي الإنفاق:</span>
                    <span className={styles.detailValue}>{selectedCustomer.totalSpent.toLocaleString()} ج.م</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>الحالة:</span>
                    <span className={`${styles.statusBadge} ${styles[selectedCustomer.status]}`}>
                      {selectedCustomer.status === 'active' ? '✓ نشط' : selectedCustomer.status === 'inactive' ? '⏸ غير نشط' : '🚫 محظور'}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>تاريخ التسجيل:</span>
                    <span className={styles.detailValue}>{new Date(selectedCustomer.registrationDate).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>آخر نشاط:</span>
                    <span className={styles.detailValue}>{new Date(selectedCustomer.lastActivity).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>
              )}
              
              {modalType === 'edit' && (
                <div className={styles.formGroup}>
                  <label>الاسم</label>
                  <input type="text" defaultValue={selectedCustomer.name} className={styles.input} />
                  <label>البريد الإلكتروني</label>
                  <input type="email" defaultValue={selectedCustomer.email} className={styles.input} />
                  <label>الهاتف</label>
                  <input type="tel" defaultValue={selectedCustomer.phone} className={styles.input} />
                  <label>الحالة</label>
                  <select defaultValue={selectedCustomer.status} className={styles.select}>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="blocked">محظور</option>
                  </select>
                </div>
              )}

              {modalType === 'orders' && (
                <div className={styles.comingSoon}>
                  <p>📦 قائمة الطلبات قريباً</p>
                  <p>عدد الطلبات: {selectedCustomer.totalOrders}</p>
                </div>
              )}

              {modalType === 'addresses' && (
                <div className={styles.comingSoon}>
                  <p>📍 قائمة العناوين قريباً</p>
                </div>
              )}

              {modalType === 'notes' && (
                <div className={styles.formGroup}>
                  <label>إضافة ملاحظة داخلية</label>
                  <textarea className={styles.textarea} rows={5} placeholder="اكتب ملاحظة..."></textarea>
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              {(modalType === 'edit' || modalType === 'notes') && (
                <button className={styles.saveBtn} onClick={() => setShowModal(false)}>
                  حفظ
                </button>
              )}
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                {modalType === 'view' || modalType === 'orders' || modalType === 'addresses' ? 'إغلاق' : 'إلغاء'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
