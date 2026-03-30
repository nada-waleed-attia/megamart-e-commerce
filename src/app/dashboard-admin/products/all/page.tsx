"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DataTable, Column } from '../../components/DataTable/DataTable';
import styles from './all-products.module.css';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  salePrice: number | null;
  stock: number;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

function AllProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [filterSubCategory, setFilterSubCategory] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'low-stock' | 'out-of-stock'>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
    
    // Handle URL filters
    const filter = searchParams.get('filter');
    if (filter) {
      setFilterStatus(filter as any);
    }
    
    const subCategoryParam = searchParams.get('subCategory');
    if (subCategoryParam) {
      setFilterSubCategory(Number(subCategoryParam));
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call
      const mockCategories: Category[] = [
        { id: 1, name: 'إلكترونيات' },
        { id: 2, name: 'ملابس' },
        { id: 3, name: 'أجهزة منزلية' },
      ];

      const mockSubCategories: SubCategory[] = [
        { id: 1, name: 'هواتف ذكية', categoryId: 1 },
        { id: 2, name: 'لابتوب', categoryId: 1 },
        { id: 3, name: 'ملابس رجالي', categoryId: 2 },
        { id: 4, name: 'ملابس نسائي', categoryId: 2 },
      ];

      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Apple iPhone 15 Pro',
          sku: 'APPLE-IP15-PRO',
          price: 45000,
          salePrice: 42000,
          stock: 25,
          categoryId: 1,
          categoryName: 'إلكترونيات',
          subCategoryId: 1,
          subCategoryName: 'هواتف ذكية',
          image: '/images/apple-products.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          name: 'Samsung Galaxy S24',
          sku: 'SAMSUNG-S24-ULTRA',
          price: 38000,
          salePrice: null,
          stock: 8,
          categoryId: 1,
          categoryName: 'إلكترونيات',
          subCategoryId: 1,
          subCategoryName: 'هواتف ذكية',
          image: '/images/samsung-products.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-16',
        },
        {
          id: 3,
          name: 'LG Smart TV 55"',
          sku: 'LG-TV55-OLED',
          price: 25000,
          salePrice: 22000,
          stock: 12,
          categoryId: 1,
          categoryName: 'إلكترونيات',
          subCategoryId: 2,
          subCategoryName: 'أجهزة منزلية',
          image: '/images/lg-products.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-17',
        },
        {
          id: 4,
          name: 'Sony Headphones WH-1000XM5',
          sku: 'SONY-WH1000XM5',
          price: 12000,
          salePrice: 10500,
          stock: 15,
          categoryId: 1,
          categoryName: 'إلكترونيات',
          subCategoryId: 1,
          subCategoryName: 'إكسسوارات',
          image: '/images/sony-products.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-18',
        },
        {
          id: 5,
          name: 'Nike Air Max 270',
          sku: 'NIKE-AM270-BLK',
          price: 3500,
          salePrice: null,
          stock: 30,
          categoryId: 2,
          categoryName: 'ملابس',
          subCategoryId: 3,
          subCategoryName: 'أحذية رياضية',
          image: '/images/nike-products.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-19',
        },
        {
          id: 6,
          name: 'Adidas Ultraboost 22',
          sku: 'ADIDAS-UB22-WHT',
          price: 4200,
          salePrice: 3800,
          stock: 5,
          categoryId: 2,
          categoryName: 'ملابس',
          subCategoryId: 4,
          subCategoryName: 'أحذية رياضية',
          image: '/images/adidas-products.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-20',
        },
        {
          id: 7,
          name: 'Nike Sportswear Jacket',
          sku: 'NIKE-JKT-BLK-L',
          price: 2500,
          salePrice: null,
          stock: 20,
          categoryId: 2,
          categoryName: 'ملابس',
          subCategoryId: 3,
          subCategoryName: 'ملابس رياضية',
          image: '/images/nike-products.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-21',
        },
        {
          id: 8,
          name: 'Adidas Training Set',
          sku: 'ADIDAS-TS-GRY-M',
          price: 1800,
          salePrice: 1500,
          stock: 0,
          categoryId: 2,
          categoryName: 'ملابس',
          subCategoryId: 4,
          subCategoryName: 'ملابس رياضية',
          image: '/images/adidas-products.jpg',
          isActive: false,
          isFeatured: false,
          createdAt: '2024-01-22',
        },
      ];
      
      setCategories(mockCategories);
      setSubCategories(mockSubCategories);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
      const matchesSubCategory = filterSubCategory === 'all' || product.subCategoryId === filterSubCategory;
      
      let matchesStatus = true;
      if (filterStatus === 'active') matchesStatus = product.isActive;
      else if (filterStatus === 'inactive') matchesStatus = !product.isActive;
      else if (filterStatus === 'low-stock') matchesStatus = product.stock > 0 && product.stock <= 10;
      else if (filterStatus === 'out-of-stock') matchesStatus = product.stock === 0;
      
      return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    });
  }, [products, searchQuery, filterCategory, filterSubCategory, filterStatus]);

  const activeCount = products.filter(p => p.isActive).length;
  const inactiveCount = products.filter(p => !p.isActive).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const filteredSubCategoriesByCategory = useMemo(() => {
    if (filterCategory === 'all') return subCategories;
    return subCategories.filter(sc => sc.categoryId === filterCategory);
  }, [subCategories, filterCategory]);

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleToggleFeatured = (id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`هل أنت متأكد من حذف ${selectedIds.length} منتج؟`)) {
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkToggleStatus = (status: boolean) => {
    if (selectedIds.length === 0) return;
    setProducts(prev => prev.map(p => 
      selectedIds.includes(p.id) ? { ...p, isActive: status } : p
    ));
    setSelectedIds([]);
  };

  const columns: Column<Product>[] = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
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
      label: 'المنتج',
      sortable: true,
      render: (_, row) => (
        <div className={styles.productInfo}>
          <div className={styles.productImage}>
            {row.image ? (
              <Image 
                src={row.image} 
                alt={row.name}
                width={50}
                height={50}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <span>📦</span>
            )}
          </div>
          <div>
            <div className={styles.productName}>{row.name}</div>
            <div className={styles.productSku}>SKU: {row.sku}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'categoryName',
      label: 'القسم الرئيسي',
      sortable: true,
    },
    {
      key: 'subCategoryName',
      label: 'القسم الفرعي',
      sortable: true,
    },
    {
      key: 'price',
      label: 'السعر',
      sortable: true,
      render: (_, row) => (
        <div>
          {row.salePrice ? (
            <>
              <div className={styles.salePrice}>{row.salePrice.toLocaleString()} ج.م</div>
              <div className={styles.originalPrice}>{row.price.toLocaleString()} ج.م</div>
            </>
          ) : (
            <div className={styles.price}>{row.price.toLocaleString()} ج.م</div>
          )}
        </div>
      ),
    },
    {
      key: 'stock',
      label: 'المخزون',
      sortable: true,
      render: (value) => (
        <span className={`${styles.stockBadge} ${
          value === 0 ? styles.outOfStock : value <= 10 ? styles.lowStock : styles.inStock
        }`}>
          {value === 0 ? '🚫 نفذ' : value <= 10 ? `⚠️ ${value}` : `✓ ${value}`}
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
      key: 'isFeatured',
      label: 'مميز',
      render: (value) => value ? '⭐' : '',
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (_, row) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.actionBtn}
            onClick={() => router.push(`/dashboard-admin/products/${row.id}`)}
            title="عرض التفاصيل"
          >
            👁️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => router.push(`/dashboard-admin/products/edit/${row.id}`)}
            title="تعديل"
          >
            ✏️
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleToggleFeatured(row.id)}
            title={row.isFeatured ? 'إلغاء التمييز' : 'تمييز'}
          >
            {row.isFeatured ? '⭐' : '☆'}
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
    <div className={styles.allProductsPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>جميع المنتجات</h2>
          <p className={styles.subtitle}>عرض وإدارة جميع المنتجات في المتجر</p>
        </div>
        <Link href="/dashboard-admin/products/add" className={styles.addBtn}>
          ➕ إضافة منتج جديد
        </Link>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            📦
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المنتجات</p>
            <h3 className={styles.statValue}>{products.length}</h3>
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
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            ⚠️
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>منخفضة المخزون</p>
            <h3 className={styles.statValue}>{lowStockCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
            🚫
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>نفذت من المخزون</p>
            <h3 className={styles.statValue}>{outOfStockCount}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder="بحث بالاسم أو SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => {
            const value = e.target.value === 'all' ? 'all' : Number(e.target.value);
            setFilterCategory(value);
            setFilterSubCategory('all');
          }}
          className={styles.filterSelect}
        >
          <option value="all">كل الأقسام الرئيسية</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={filterSubCategory}
          onChange={(e) => setFilterSubCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className={styles.filterSelect}
          disabled={filterCategory === 'all'}
        >
          <option value="all">كل الأقسام الفرعية</option>
          {filteredSubCategoriesByCategory.map(subCat => (
            <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
          ))}
        </select>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            الكل ({products.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            النشطة ({activeCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'low-stock' ? styles.active : ''}`}
            onClick={() => setFilterStatus('low-stock')}
          >
            منخفضة المخزون ({lowStockCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'out-of-stock' ? styles.active : ''}`}
            onClick={() => setFilterStatus('out-of-stock')}
          >
            نفذت ({outOfStockCount})
          </button>
        </div>

        <div className={styles.resultsCount}>
          {filteredProducts.length} نتيجة
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.bulkCount}>تم تحديد {selectedIds.length} منتج</span>
          <div className={styles.bulkButtons}>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus(true)}
            >
              ✓ تفعيل
            </button>
            <button
              className={styles.bulkBtn}
              onClick={() => handleBulkToggleStatus(false)}
            >
              ⏸ تعطيل
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
        data={filteredProducts}
        isLoading={isLoading}
        emptyMessage="لا يوجد منتجات"
        onRowClick={(row) => router.push(`/dashboard-admin/products/${row.id}`)}
      />
    </div>
  );
}


export default function AllProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid #e2e8f0', 
            borderTopColor: '#3b82f6', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    }>
      <AllProductsContent />
    </Suspense>
  );
}
