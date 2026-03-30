"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './product-details.module.css';

interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice: number | null;
  stock: number;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'inventory' | 'shipping'>('details');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = await params.id;
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // TODO: Replace with actual API call
        const mockProduct: Product = {
          id: Number(id),
          name: 'iPhone 15 Pro Max',
          sku: 'IP15PM-256-BLK',
          description: 'أحدث هاتف من Apple مع شاشة Super Retina XDR مقاس 6.7 بوصة، معالج A17 Pro، كاميرا ثلاثية 48MP، وبطارية تدوم طوال اليوم.',
          shortDescription: 'هاتف iPhone 15 Pro Max بسعة 256 جيجا',
          price: 45000,
          salePrice: 42000,
          stock: 25,
          categoryId: 1,
          categoryName: 'إلكترونيات',
          subCategoryId: 1,
          subCategoryName: 'هواتف ذكية',
          images: [
            '/images/iphone1.jpg',
            '/images/iphone2.jpg',
            '/images/iphone3.jpg',
          ],
          isActive: true,
          isFeatured: true,
          weight: 0.221,
          dimensions: {
            length: 16.0,
            width: 7.7,
            height: 0.83,
          },
          createdAt: '2024-01-15',
          updatedAt: '2024-03-10',
        };
        
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>المنتج غير موجود</h2>
        <Link href="/dashboard-admin/products/all">العودة للمنتجات</Link>
      </div>
    );
  }

  const discount = product.salePrice 
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  return (
    <div className={styles.productDetailsPage}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.subtitle}>SKU: {product.sku}</p>
        </div>
        <div className={styles.headerActions}>
          <Link 
            href={`/dashboard-admin/products/edit/${product.id}`} 
            className={styles.editBtn}
          >
            ✏️ تعديل
          </Link>
          <Link href="/dashboard-admin/products/all" className={styles.backBtn}>
            ← رجوع
          </Link>
        </div>
      </div>

      {/* Status Badges */}
      <div className={styles.badges}>
        <span className={`${styles.badge} ${product.isActive ? styles.active : styles.inactive}`}>
          {product.isActive ? '✓ نشط' : '⏸ غير نشط'}
        </span>
        {product.isFeatured && (
          <span className={`${styles.badge} ${styles.featured}`}>
            ⭐ مميز
          </span>
        )}
        {product.stock === 0 && (
          <span className={`${styles.badge} ${styles.outOfStock}`}>
            🚫 نفذ من المخزون
          </span>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <span className={`${styles.badge} ${styles.lowStock}`}>
            ⚠️ مخزون منخفض
          </span>
        )}
      </div>

      <div className={styles.content}>
        {/* Left Column - Images & Info */}
        <div className={styles.leftColumn}>
          {/* Images */}
          <div className={styles.imagesSection}>
            <div className={styles.mainImage}>
              {product.images.length > 0 ? (
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                  <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'contain' }} />
                </div>
              ) : (
                <div className={styles.noImage}>📦</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '80px' }}>
                      <Image src={img} alt={`${product.name} ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>السعر</h3>
            <div className={styles.priceInfo}>
              {product.salePrice ? (
                <>
                  <div className={styles.currentPrice}>
                    {product.salePrice.toLocaleString()} ج.م
                  </div>
                  <div className={styles.oldPrice}>
                    {product.price.toLocaleString()} ج.م
                  </div>
                  <div className={styles.discountBadge}>
                    خصم {discount}%
                  </div>
                </>
              ) : (
                <div className={styles.currentPrice}>
                  {product.price.toLocaleString()} ج.م
                </div>
              )}
            </div>
          </div>

          {/* Category Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>التصنيف</h3>
            <div className={styles.categoryInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>القسم الرئيسي:</span>
                <Link 
                  href={`/dashboard-admin/categories`}
                  className={styles.infoLink}
                >
                  {product.categoryName}
                </Link>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>القسم الفرعي:</span>
                <Link 
                  href={`/dashboard-admin/sub-categories`}
                  className={styles.infoLink}
                >
                  {product.subCategoryName}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className={styles.rightColumn}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'details' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('details')}
            >
              التفاصيل
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'inventory' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              المخزون
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              الشحن
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'details' && (
              <div className={styles.detailsTab}>
                <div className={styles.section}>
                  <h4>الوصف المختصر</h4>
                  <p>{product.shortDescription || 'لا يوجد وصف مختصر'}</p>
                </div>
                <div className={styles.section}>
                  <h4>الوصف الكامل</h4>
                  <p>{product.description || 'لا يوجد وصف'}</p>
                </div>
                <div className={styles.section}>
                  <h4>معلومات إضافية</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>تاريخ الإضافة:</span>
                      <span>{new Date(product.createdAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>آخر تحديث:</span>
                      <span>{new Date(product.updatedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className={styles.inventoryTab}>
                <div className={styles.stockCard}>
                  <div className={styles.stockNumber}>{product.stock}</div>
                  <div className={styles.stockLabel}>وحدة متوفرة</div>
                </div>
                <div className={styles.section}>
                  <h4>حالة المخزون</h4>
                  {product.stock === 0 && (
                    <div className={styles.alertDanger}>
                      🚫 المنتج نفذ من المخزون
                    </div>
                  )}
                  {product.stock > 0 && product.stock <= 10 && (
                    <div className={styles.alertWarning}>
                      ⚠️ المخزون منخفض - يحتاج إعادة تخزين
                    </div>
                  )}
                  {product.stock > 10 && (
                    <div className={styles.alertSuccess}>
                      ✓ المخزون جيد
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className={styles.shippingTab}>
                <div className={styles.section}>
                  <h4>الوزن</h4>
                  <p>{product.weight > 0 ? `${product.weight} كجم` : 'غير محدد'}</p>
                </div>
                <div className={styles.section}>
                  <h4>الأبعاد</h4>
                  {product.dimensions.length > 0 || product.dimensions.width > 0 || product.dimensions.height > 0 ? (
                    <p>
                      {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} سم
                    </p>
                  ) : (
                    <p>غير محددة</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
