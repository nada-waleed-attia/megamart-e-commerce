"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../add/add-product.module.css';

interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  categoryId: number;
  subCategoryId: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [productId, setProductId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    salePrice: 0,
    stock: 0,
    categoryId: 0,
    subCategoryId: 0,
    images: [] as string[],
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    params.then(resolvedParams => {
      setProductId(resolvedParams.id);
      fetchProduct(resolvedParams.id);
    });
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Replace with actual API call
      const mockProduct = {
        id: parseInt(id),
        name: 'Nike Air Max 270',
        sku: 'NIKE-AM270-BLK',
        description: 'حذاء رياضي مريح للجري والتدريب',
        price: 3500,
        salePrice: null,
        stock: 30,
        categoryId: 2,
        subCategoryId: 3,
        images: ['/images/nike-products.jpg'],
        isActive: true,
        isFeatured: true,
      };
      
      setFormData({
        ...mockProduct,
        salePrice: mockProduct.salePrice || 0,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with actual API call
      console.log('Updating product:', formData);
      
      alert('تم تحديث المنتج بنجاح!');
      router.push('/dashboard-admin/products/all');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('حدث خطأ أثناء تحديث المنتج');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.addProductPage}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.addProductPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>تعديل المنتج</h2>
          <p className={styles.subtitle}>تحديث بيانات المنتج #{productId}</p>
        </div>
        <Link href="/dashboard-admin/products/all" className={styles.backBtn}>
          ← رجوع للمنتجات
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formLayout}>
          <div className={styles.mainContent}>
            {/* Basic Info */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>المعلومات الأساسية</h3>
              
              <div className={styles.formGroup}>
                <label>اسم المنتج *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>SKU (رمز المنتج) *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>التسعير</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>السعر الأساسي (ج.م) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className={styles.input}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>سعر التخفيض (ج.م)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className={styles.input}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {formData.salePrice > 0 && formData.salePrice < formData.price && (
                <div className={styles.discountInfo}>
                  💰 نسبة الخصم: {Math.round(((formData.price - formData.salePrice) / formData.price) * 100)}%
                </div>
              )}
            </div>

            {/* Inventory */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>المخزون</h3>
              
              <div className={styles.formGroup}>
                <label>الكمية المتاحة *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className={styles.input}
                  min="0"
                  required
                />
                <span className={styles.hint}>
                  {formData.stock === 0 ? '⚠️ المنتج نفذ من المخزون' : 
                   formData.stock <= 10 ? '⚠️ المخزون منخفض' : 
                   '✓ المخزون متوفر'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            {/* Status */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>الحالة</h3>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>المنتج نشط</span>
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>منتج مميز ⭐</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>الإجراءات</h3>
              
              <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>
                  💾 حفظ التعديلات
                </button>
                <Link href="/dashboard-admin/products/all" className={styles.cancelBtn}>
                  إلغاء
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
