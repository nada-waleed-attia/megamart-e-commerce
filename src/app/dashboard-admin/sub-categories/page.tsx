"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import styles from './sub-categories.module.css';

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  categoryId: number;
  categoryName: string;
  productCount: number;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}

export default function SubCategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    categoryId: 0,
    image: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
    
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilterCategory(parseInt(categoryParam));
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCategories: Category[] = [
        { id: 1, name: 'إلكترونيات' },
        { id: 2, name: 'ملابس' },
        { id: 3, name: 'أجهزة منزلية' },
        { id: 4, name: 'رياضة' },
      ];

      const mockSubCategories: SubCategory[] = [
        {
          id: 1,
          name: 'هواتف ذكية',
          slug: 'smartphones',
          description: 'أحدث الهواتف الذكية من مختلف العلامات التجارية',
          categoryId: 1,
          categoryName: 'إلكترونيات',
          productCount: 45,
          image: '/images/samsung-products.jpg',
          order: 1,
          isActive: true,
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          name: 'لابتوب',
          slug: 'laptops',
          description: 'أجهزة كمبيوتر محمولة للعمل والألعاب',
          categoryId: 1,
          categoryName: 'إلكترونيات',
          productCount: 32,
          image: '/images/apple-products.jpg',
          order: 2,
          isActive: true,
          createdAt: '2024-01-16',
        },
        {
          id: 3,
          name: 'تابلت',
          slug: 'tablets',
          description: 'أجهزة لوحية للترفيه والعمل',
          categoryId: 1,
          categoryName: 'إلكترونيات',
          productCount: 18,
          image: '/images/lg-products.jpg',
          order: 3,
          isActive: true,
          createdAt: '2024-01-17',
        },
        {
          id: 4,
          name: 'ملابس رجالي',
          slug: 'mens-clothing',
          description: 'ملابس عصرية للرجال',
          categoryId: 2,
          categoryName: 'ملابس',
          productCount: 28,
          image: '/images/nike-products.jpg',
          order: 1,
          isActive: true,
          createdAt: '2024-01-17',
        },
        {
          id: 5,
          name: 'ملابس نسائي',
          slug: 'womens-clothing',
          description: 'أزياء نسائية متنوعة',
          categoryId: 2,
          categoryName: 'ملابس',
          productCount: 35,
          image: '/images/adidas-products.jpg',
          order: 2,
          isActive: false,
          createdAt: '2024-01-18',
        },
        {
          id: 6,
          name: 'أحذية رياضية',
          slug: 'sports-shoes',
          description: 'أحذية رياضية للجري واللياقة',
          categoryId: 4,
          categoryName: 'رياضة',
          productCount: 22,
          image: '/images/sony-products.jpg',
          order: 1,
          isActive: true,
          createdAt: '2024-01-19',
        },
      ];
      
      setCategories(mockCategories);
      setSubCategories(mockSubCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((subCat) => {
      const matchesSearch = 
        subCat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subCat.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subCat.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || subCat.categoryId === filterCategory;
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'active' && subCat.isActive) ||
        (filterStatus === 'inactive' && !subCat.isActive);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [subCategories, searchQuery, filterCategory, filterStatus]);

  const activeCount = subCategories.filter(sc => sc.isActive).length;
  const inactiveCount = subCategories.filter(sc => !sc.isActive).length;
  const totalProducts = subCategories.reduce((sum, sc) => sum + sc.productCount, 0);

  const getCategoryCount = (categoryId: number) => {
    return subCategories.filter(sc => sc.categoryId === categoryId).length;
  };

  const handleAdd = () => {
    setEditingSubCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      categoryId: categories[0]?.id || 0,
      image: '',
      order: subCategories.length + 1,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setFormData({
      name: subCategory.name,
      slug: subCategory.slug,
      description: subCategory.description,
      categoryId: subCategory.categoryId,
      image: subCategory.image,
      order: subCategory.order,
      isActive: subCategory.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم الفرعي؟')) {
      setSubCategories(prev => prev.filter(sc => sc.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setSubCategories(prev => prev.map(sc => 
      sc.id === id ? { ...sc, isActive: !sc.isActive } : sc
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubCategory) {
      setSubCategories(prev => prev.map(sc => 
        sc.id === editingSubCategory.id 
          ? { 
              ...sc, 
              ...formData,
              categoryName: categories.find(c => c.id === formData.categoryId)?.name || ''
            } 
          : sc
      ));
    } else {
      const newSubCategory: SubCategory = {
        id: Math.max(...subCategories.map(sc => sc.id), 0) + 1,
        ...formData,
        categoryName: categories.find(c => c.id === formData.categoryId)?.name || '',
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setSubCategories(prev => [...prev, newSubCategory]);
    }
    
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.subCategoriesPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إدارة الأقسام الفرعية</h2>
          <p className={styles.subtitle}>تنظيم الأقسام الفرعية داخل الأقسام الرئيسية</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          ➕ إضافة قسم فرعي
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            🔖
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي الأقسام الفرعية</p>
            <h3 className={styles.statValue}>{subCategories.length}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            ✓
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>النشطة</p>
            <h3 className={styles.statValue}>{activeCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#f59e0b' }}>
            ⏸
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>غير النشطة</p>
            <h3 className={styles.statValue}>{inactiveCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            📦
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المنتجات</p>
            <h3 className={styles.statValue}>{totalProducts}</h3>
          </div>
        </div>
      </div>

      <div className={styles.searchBox}>
        <input
          type="search"
          placeholder="بحث بالاسم أو القسم الرئيسي..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>فلترة حسب القسم الرئيسي:</h4>
        <div className={styles.filterChips}>
          <button
            className={`${styles.chip} ${filterCategory === 'all' ? styles.active : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            <span>الكل</span>
            <span className={styles.chipCount}>{subCategories.length}</span>
          </button>
          {categories.map(cat => {
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                className={`${styles.chip} ${filterCategory === cat.id ? styles.active : ''}`}
                onClick={() => setFilterCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span className={styles.chipCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.statusFilter}>
        <button
          className={`${styles.statusBtn} ${filterStatus === 'all' ? styles.active : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          الكل ({subCategories.length})
        </button>
        <button
          className={`${styles.statusBtn} ${filterStatus === 'active' ? styles.active : ''}`}
          onClick={() => setFilterStatus('active')}
        >
          النشطة ({activeCount})
        </button>
        <button
          className={`${styles.statusBtn} ${filterStatus === 'inactive' ? styles.active : ''}`}
          onClick={() => setFilterStatus('inactive')}
        >
          غير النشطة ({inactiveCount})
        </button>
      </div>

      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          عرض {filteredSubCategories.length} من {subCategories.length} قسم فرعي
        </span>
      </div>

      <div className={styles.subCategoriesGrid}>
        {filteredSubCategories.map(subCat => (
          <div key={subCat.id} className={styles.subCategoryCard}>
            <div className={styles.cardImage}>
              <Image 
                src={subCat.image} 
                alt={subCat.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className={`${styles.statusBadge} ${subCat.isActive ? styles.active : styles.inactive}`}>
                {subCat.isActive ? '✓ نشط' : '⏸ غير نشط'}
              </span>
              <div className={styles.categoryTag}>{subCat.categoryName}</div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.subCategoryName}>{subCat.name}</h3>
              <p className={styles.subCategoryDesc}>{subCat.description}</p>
              
              <div className={styles.cardMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📦</span>
                  <span className={styles.metaText}>{subCat.productCount} منتج</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🔢</span>
                  <span className={styles.metaText}>ترتيب: {subCat.order}</span>
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button
                className={`${styles.actionBtn} ${styles.primary}`}
                onClick={() => router.push(`/dashboard-admin/products/all?subCategory=${subCat.id}`)}
                title="عرض المنتجات"
              >
                <MdVisibility size={18} />
                <span>عرض المنتجات</span>
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleEdit(subCat)}
                title="تعديل"
              >
                <MdEdit size={18} />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleToggleStatus(subCat.id)}
                title={subCat.isActive ? 'تعطيل' : 'تفعيل'}
              >
                {subCat.isActive ? '⏸' : '✓'}
              </button>
              <button
                className={`${styles.actionBtn} ${styles.danger}`}
                onClick={() => handleDelete(subCat.id)}
                title="حذف"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSubCategories.length === 0 && (
        <div className={styles.emptyState}>
          <p>لا توجد أقسام فرعية تطابق البحث</p>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingSubCategory ? 'تعديل قسم فرعي' : 'إضافة قسم فرعي جديد'}</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>اسم القسم الفرعي *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Slug (الرابط) *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className={styles.input}
                    placeholder="smartphones"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>القسم الرئيسي *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                    className={styles.select}
                    required
                  >
                    <option value={0}>اختر القسم الرئيسي</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={styles.textarea}
                    rows={3}
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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>الترتيب</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className={styles.input}
                      min={0}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <span>نشط</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.saveBtn}>
                  {editingSubCategory ? 'حفظ التعديلات' : 'إضافة'}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
