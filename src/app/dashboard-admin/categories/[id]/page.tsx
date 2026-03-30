"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MdArrowBack, MdEdit, MdDelete } from 'react-icons/md';
import styles from './category-details.module.css';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  isActive: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  stock: number;
  subCategoryId: number;
  subCategoryName: string;
  isActive: boolean;
}

export default function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string>('');
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subcategories' | 'products'>('subcategories');
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | 'all'>('all');

  useEffect(() => {
    params.then(resolvedParams => {
      setCategoryId(resolvedParams.id);
      fetchData(resolvedParams.id);
    });
  }, [params]);

  const fetchData = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      const mockCategory: Category = {
        id: parseInt(id),
        name: 'إلكترونيات',
        slug: 'electronics',
        description: 'جميع الأجهزة الإلكترونية والتقنية الحديثة',
        image: '/images/slide1.webp',
        isActive: true,
      };

      const mockSubCategories: SubCategory[] = [
        {
          id: 1,
          name: 'هواتف ذكية',
          slug: 'smartphones',
          image: '/images/samsung-products.jpg',
          productCount: 45,
          isActive: true,
        },
        {
          id: 2,
          name: 'لابتوب',
          slug: 'laptops',
          image: '/images/apple-products.jpg',
          productCount: 32,
          isActive: true,
        },
        {
          id: 3,
          name: 'تابلت',
          slug: 'tablets',
          image: '/images/lg-products.jpg',
          productCount: 18,
          isActive: true,
        },
        {
          id: 4,
          name: 'سماعات',
          slug: 'headphones',
          image: '/images/sony-products.jpg',
          productCount: 25,
          isActive: false,
        },
      ];

      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          slug: 'iphone-15-pro-max',
          image: '/images/apple-products.jpg',
          price: 45000,
          stock: 25,
          subCategoryId: 1,
          subCategoryName: 'هواتف ذكية',
          isActive: true,
        },
        {
          id: 2,
          name: 'Samsung Galaxy S24',
          slug: 'samsung-galaxy-s24',
          image: '/images/samsung-products.jpg',
          price: 38000,
          stock: 30,
          subCategoryId: 1,
          subCategoryName: 'هواتف ذكية',
          isActive: true,
        },
        {
          id: 3,
          name: 'MacBook Pro M3',
          slug: 'macbook-pro-m3',
          image: '/images/apple-products.jpg',
          price: 85000,
          stock: 15,
          subCategoryId: 2,
          subCategoryName: 'لابتوب',
          isActive: true,
        },
        {
          id: 4,
          name: 'Dell XPS 15',
          slug: 'dell-xps-15',
          image: '/images/lg-products.jpg',
          price: 55000,
          stock: 8,
          subCategoryId: 2,
          subCategoryName: 'لابتوب',
          isActive: true,
        },
        {
          id: 5,
          name: 'iPad Pro 12.9',
          slug: 'ipad-pro-129',
          image: '/images/apple-products.jpg',
          price: 42000,
          stock: 20,
          subCategoryId: 3,
          subCategoryName: 'تابلت',
          isActive: true,
        },
      ];
      
      setCategory(mockCategory);
      setSubCategories(mockSubCategories);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedSubCategory === 'all') {
      return products;
    }
    return products.filter(p => p.subCategoryId === selectedSubCategory);
  }, [products, selectedSubCategory]);

  const activeSubCategoriesCount = subCategories.filter(sc => sc.isActive).length;
  const totalProductsCount = products.length;
  const activeProductsCount = products.filter(p => p.isActive).length;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h2>القسم غير موجود</h2>
        <Link href="/dashboard-admin/categories" className={styles.backBtn}>
          العودة للأقسام
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.categoryDetailsPage}>
      {/* Header with Category Info */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <MdArrowBack size={20} />
          <span>رجوع</span>
        </button>
      </div>

      {/* Category Card */}
      <div className={styles.categoryCard}>
        <div className={styles.categoryImage}>
          <Image src={category.image} alt={category.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.categoryInfo}>
          <div className={styles.categoryHeader}>
            <div>
              <h1 className={styles.categoryName}>{category.name}</h1>
              <p className={styles.categorySlug}>/{category.slug}</p>
            </div>
            <div className={styles.categoryActions}>
              <button className={styles.editBtn}>
                <MdEdit size={18} />
                <span>تعديل</span>
              </button>
              <button className={styles.deleteBtn}>
                <MdDelete size={18} />
                <span>حذف</span>
              </button>
            </div>
          </div>
          <p className={styles.categoryDescription}>{category.description}</p>
          <div className={styles.categoryMeta}>
            <span className={`${styles.statusBadge} ${category.isActive ? styles.active : styles.inactive}`}>
              {category.isActive ? '✓ نشط' : '⏸ غير نشط'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
            🔖
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>الأقسام الفرعية</p>
            <h3 className={styles.statValue}>{subCategories.length}</h3>
            <span className={styles.statSubtext}>{activeSubCategoriesCount} نشط</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            📦
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي المنتجات</p>
            <h3 className={styles.statValue}>{totalProductsCount}</h3>
            <span className={styles.statSubtext}>{activeProductsCount} نشط</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            💰
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي القيمة</p>
            <h3 className={styles.statValue}>
              {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()} ج.م
            </h3>
            <span className={styles.statSubtext}>قيمة المخزون</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'subcategories' ? styles.active : ''}`}
          onClick={() => setActiveTab('subcategories')}
        >
          <span>الأقسام الفرعية</span>
          <span className={styles.tabCount}>{subCategories.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <span>المنتجات</span>
          <span className={styles.tabCount}>{totalProductsCount}</span>
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'subcategories' && (
          <div className={styles.subCategoriesSection}>
            <div className={styles.sectionHeader}>
              <h3>الأقسام الفرعية ({subCategories.length})</h3>
              <Link href="/dashboard-admin/sub-categories" className={styles.addBtn}>
                ➕ إضافة قسم فرعي
              </Link>
            </div>

            <div className={styles.subCategoriesGrid}>
              {subCategories.map(subCat => (
                <div key={subCat.id} className={styles.subCategoryCard}>
                  <div className={styles.subCategoryImage}>
                    <Image src={subCat.image} alt={subCat.name} fill style={{ objectFit: 'cover' }} />
                    <span className={`${styles.badge} ${subCat.isActive ? styles.active : styles.inactive}`}>
                      {subCat.isActive ? '✓' : '⏸'}
                    </span>
                  </div>
                  <div className={styles.subCategoryInfo}>
                    <h4>{subCat.name}</h4>
                    <p className={styles.productCount}>
                      📦 {subCat.productCount} منتج
                    </p>
                  </div>
                  <button
                    className={styles.viewBtn}
                    onClick={() => {
                      setActiveTab('products');
                      setSelectedSubCategory(subCat.id);
                    }}
                  >
                    عرض المنتجات ←
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className={styles.productsSection}>
            <div className={styles.sectionHeader}>
              <h3>المنتجات ({filteredProducts.length})</h3>
              <Link href="/dashboard-admin/products/add" className={styles.addBtn}>
                ➕ إضافة منتج
              </Link>
            </div>

            {/* Filter Chips */}
            <div className={styles.filterChips}>
              <button
                className={`${styles.chip} ${selectedSubCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedSubCategory('all')}
              >
                <span>الكل</span>
                <span className={styles.chipCount}>{products.length}</span>
              </button>
              {subCategories.map(subCat => (
                <button
                  key={subCat.id}
                  className={`${styles.chip} ${selectedSubCategory === subCat.id ? styles.active : ''}`}
                  onClick={() => setSelectedSubCategory(subCat.id)}
                >
                  <span>{subCat.name}</span>
                  <span className={styles.chipCount}>{subCat.productCount}</span>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className={styles.productsGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <span className={`${styles.badge} ${product.isActive ? styles.active : styles.inactive}`}>
                      {product.isActive ? '✓' : '⏸'}
                    </span>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.subCategoryTag}>{product.subCategoryName}</span>
                    <h4>{product.name}</h4>
                    <div className={styles.productMeta}>
                      <span className={styles.price}>{product.price.toLocaleString()} ج.م</span>
                      <span className={styles.stock}>
                        المخزون: <strong>{product.stock}</strong>
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard-admin/products/${product.id}`}
                    className={styles.viewProductBtn}
                  >
                    عرض التفاصيل ←
                  </Link>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <p>لا توجد منتجات في هذا القسم</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
