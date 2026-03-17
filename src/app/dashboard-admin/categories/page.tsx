"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataTable, Column } from '../components/DataTable/DataTable';
import styles from './categories.module.css';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productsCount: number;
  subCategoriesCount: number;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      const mockCategories: Category[] = [
        {
          id: 1,
          name: 'إلكترونيات',
          slug: 'electronics',
          description: 'جميع الأجهزة الإلكترونية والتقنية',
          image: '/images/slide2.webp',
          productsCount: 150,
          subCategoriesCount: 8,
          isActive: true,
          order: 1,
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          name: 'ملابس',
          slug: 'clothing',
          description: 'ملابس رجالية ونسائية وأطفال',
          image: '/images/slide3.webp',
          productsCount: 320,
          subCategoriesCount: 12,
          isActive: true,
          order: 2,
          createdAt: '2024-01-16',
        },
        {
          id: 3,
          name: 'أجهزة منزلية',
          slug: 'home-appliances',
          description: 'أجهزة كهربائية للمنزل',
          image: '/images/slide4.webp',
          productsCount: 85,
          subCategoriesCount: 6,
          isActive: false,
          order: 3,
          createdAt: '2024-01-17',
        },
      ];
      
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const matchesSearch = 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'active' && cat.isActive) ||
        (filterStatus === 'inactive' && !cat.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchQuery, filterStatus]);

  const activeCount = categories.filter(c => c.isActive).length;
  const inactiveCount = categories.filter(c => !c.isActive).length;

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      isActive: true,
      order: categories.length + 1,
    });
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      isActive: category.isActive,
      order: category.order,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
    } else {
      const newCategory: Category = {
        id: Date.now(),
        ...formData,
        productsCount: 0,
        subCategoriesCount: 0,
        createdAt: new Date().toISOString(),
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع الأقسام الفرعية والمنتجات المرتبطة به.')) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setCategories(prev => prev.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const columns: Column<Category>[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'image',
      label: 'الصورة',
      render: (_, row) => (
        <div className={styles.categoryImage}>
          <img src={row.image} alt={row.name} />
        </div>
      ),
    },
    {
      key: 'name',
      label: 'اسم القسم',
      sortable: true,
      render: (_, row) => (
        <div>
          <div className={styles.categoryName}>{row.name}</div>
          <div className={styles.categorySlug}>{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'subCategoriesCount',
      label: 'الأقسام الفرعية',
      sortable: true,
      render: (value) => (
        <span className={styles.countBadge}>
          🔖 {value}
        </span>
      ),
    },
    {
      key: 'productsCount',
      label: 'المنتجات',
      sortable: true,
      render: (value) => (
        <span className={styles.countBadge}>
          📦 {value}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'الحالة',
      sortable: true,
      render: (value) => (
        <span className={`${styles.statusBadge} ${value ? styles.active : styles.inactive}`}>
          {value ? '✓ نشط' : '⏸ غير نشط'}
        </span>
      ),
    },
    {
      key: 'order',
      label: 'الترتيب',
      sortable: true,
    },
    {
      key: 'createdAt',
      label: 'تاريخ الإنشاء',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ar-EG'),
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (_, row) => (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.primary}`}
            onClick={() => router.push(`/dashboard-admin/categories/${row.id}`)}
            title="عرض ما بداخل القسم"
          >
            👁️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleEdit(row)}
            title="تعديل"
          >
            ✏️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleToggleStatus(row.id)}
            title={row.isActive ? 'تعطيل' : 'تفعيل'}
          >
            {row.isActive ? '⏸' : '✓'}
          </button>
          <button
            className={`${styles.actionBtn} ${styles.danger}`}
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
    <div className={styles.categoriesPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إدارة الأقسام الرئيسية</h2>
          <p className={styles.subtitle}>إدارة وتنظيم أقسام المتجر الرئيسية</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          ➕ إضافة قسم جديد
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            🏷️
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي الأقسام</p>
            <h3 className={styles.statValue}>{categories.length}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            ✓
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>الأقسام النشطة</p>
            <h3 className={styles.statValue}>{activeCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            📦
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المنتجات</p>
            <h3 className={styles.statValue}>{categories.reduce((sum, c) => sum + c.productsCount, 0)}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
            🔖
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>الأقسام الفرعية</p>
            <h3 className={styles.statValue}>{categories.reduce((sum, c) => sum + c.subCategoriesCount, 0)}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder="بحث بالاسم أو الوصف..."
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
            الكل ({categories.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            النشطة ({activeCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'inactive' ? styles.active : ''}`}
            onClick={() => setFilterStatus('inactive')}
          >
            غير النشطة ({inactiveCount})
          </button>
        </div>

        <div className={styles.resultsCount}>
          {filteredCategories.length} نتيجة
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        isLoading={isLoading}
        emptyMessage="لا يوجد أقسام"
      />

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>اسم القسم *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                  placeholder="مثال: إلكترونيات"
                />
              </div>

              <div className={styles.formGroup}>
                <label>الرابط (Slug) *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className={styles.input}
                  placeholder="مثال: electronics"
                />
              </div>

              <div className={styles.formGroup}>
                <label>الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={styles.textarea}
                  rows={3}
                  placeholder="وصف مختصر للقسم"
                />
              </div>

              <div className={styles.formGroup}>
                <label>رابط الصورة</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={styles.input}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className={styles.formGroup}>
                <label>الترتيب</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>القسم نشط</span>
                </label>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleSave}>
                {editingCategory ? 'حفظ التعديلات' : 'إضافة القسم'}
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
