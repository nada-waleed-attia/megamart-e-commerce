"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './add-product.module.css';

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

interface FormData {
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  subCategoryId: number;
  price: number;
  salePrice: number | null;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  metaTitle: string;
  metaDescription: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveType, setSaveType] = useState<'draft' | 'publish'>('publish');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    sku: '',
    description: '',
    shortDescription: '',
    categoryId: 0,
    subCategoryId: 0,
    price: 0,
    salePrice: null,
    stock: 0,
    lowStockThreshold: 10,
    images: [],
    isActive: true,
    isFeatured: false,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
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
      
      setCategories(mockCategories);
      setSubCategories(mockSubCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredSubCategories = subCategories.filter(
    sc => sc.categoryId === formData.categoryId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'اسم المنتج مطلوب';
    if (!formData.sku.trim()) newErrors.sku = 'SKU مطلوب';
    if (formData.price <= 0) newErrors.price = 'السعر يجب أن يكون أكبر من صفر';
    if (!formData.categoryId) newErrors.categoryId = 'القسم الرئيسي مطلوب';
    if (!formData.subCategoryId) newErrors.subCategoryId = 'القسم الفرعي مطلوب';
    if (formData.salePrice && formData.salePrice >= formData.price) {
      newErrors.salePrice = 'سعر التخفيض يجب أن يكون أقل من السعر الأساسي';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('⚠️ يرجى تصحيح الأخطاء في النموذج');
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const productData = {
        ...formData,
        isActive: saveType === 'publish' ? formData.isActive : false,
      };
      
      console.log('Product data:', productData);
      alert(saveType === 'publish' ? '✓ تم نشر المنتج بنجاح!' : '✓ تم حفظ المنتج كمسودة!');
      router.push('/dashboard-admin/products/all');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('❌ حدث خطأ أثناء حفظ المنتج');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className={styles.addProductPage}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إضافة منتج جديد</h2>
          <p className={styles.subtitle}>أضف منتج جديد إلى المتجر</p>
        </div>
        <Link href="/dashboard-admin/products/all" className={styles.backBtn}>
          ← رجوع
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formLayout}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Basic Information */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>المعلومات الأساسية</h3>
              
              <div className={styles.formGroup}>
                <label>اسم المنتج *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      name,
                      slug: generateSlug(name)
                    }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  required
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Slug (الرابط) *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className={styles.input}
                  placeholder="product-name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>SKU (رمز المنتج) *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, sku: e.target.value }));
                    if (errors.sku) setErrors(prev => ({ ...prev, sku: '' }));
                  }}
                  className={`${styles.input} ${errors.sku ? styles.inputError : ''}`}
                  placeholder="PROD-001"
                  required
                />
                {errors.sku && <span className={styles.errorText}>{errors.sku}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>وصف مختصر</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className={styles.textarea}
                  rows={2}
                  placeholder="وصف قصير يظهر في قوائم المنتجات"
                />
              </div>

              <div className={styles.formGroup}>
                <label>الوصف الكامل</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={styles.textarea}
                  rows={6}
                  placeholder="وصف تفصيلي للمنتج"
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
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className={styles.input}
                    min={0}
                    step={0.01}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>سعر التخفيض (ج.م)</label>
                  <input
                    type="number"
                    value={formData.salePrice || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      salePrice: e.target.value ? Number(e.target.value) : null 
                    }))}
                    className={styles.input}
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>

              {formData.salePrice && formData.salePrice < formData.price && (
                <div className={styles.discountInfo}>
                  💰 نسبة الخصم: {Math.round((1 - formData.salePrice / formData.price) * 100)}%
                </div>
              )}
            </div>

            {/* Inventory */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>المخزون</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>الكمية المتوفرة *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    className={styles.input}
                    min={0}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>حد التنبيه للمخزون المنخفض</label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData(prev => ({ ...prev, lowStockThreshold: Number(e.target.value) }))}
                    className={styles.input}
                    min={0}
                  />
                </div>
              </div>

              {formData.stock <= formData.lowStockThreshold && formData.stock > 0 && (
                <div className={styles.warningInfo}>
                  ⚠️ المخزون منخفض
                </div>
              )}
              {formData.stock === 0 && (
                <div className={styles.errorInfo}>
                  🚫 المنتج نفذ من المخزون
                </div>
              )}
            </div>

            {/* Shipping */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>معلومات الشحن</h3>
              
              <div className={styles.formGroup}>
                <label>الوزن (كجم)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  className={styles.input}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>الطول (سم)</label>
                  <input
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, length: Number(e.target.value) }
                    }))}
                    className={styles.input}
                    min={0}
                    step={0.01}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>العرض (سم)</label>
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, width: Number(e.target.value) }
                    }))}
                    className={styles.input}
                    min={0}
                    step={0.01}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الارتفاع (سم)</label>
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, height: Number(e.target.value) }
                    }))}
                    className={styles.input}
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>تحسين محركات البحث (SEO)</h3>
              
              <div className={styles.formGroup}>
                <label>عنوان الصفحة (Meta Title)</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className={styles.input}
                  maxLength={60}
                />
                <small className={styles.hint}>{formData.metaTitle.length}/60 حرف</small>
              </div>

              <div className={styles.formGroup}>
                <label>وصف الصفحة (Meta Description)</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className={styles.textarea}
                  rows={3}
                  maxLength={160}
                />
                <small className={styles.hint}>{formData.metaDescription.length}/160 حرف</small>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Status */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>الحالة</h3>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  />
                  <span>نشط</span>
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  />
                  <span>منتج مميز</span>
                </label>
              </div>
            </div>

            {/* Categories */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>التصنيف</h3>
              
              <div className={styles.formGroup}>
                <label>القسم الرئيسي *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    categoryId: Number(e.target.value),
                    subCategoryId: 0
                  }))}
                  className={styles.select}
                  required
                >
                  <option value={0}>اختر القسم</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>القسم الفرعي *</label>
                <select
                  value={formData.subCategoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, subCategoryId: Number(e.target.value) }))}
                  className={styles.select}
                  disabled={!formData.categoryId}
                  required
                >
                  <option value={0}>اختر القسم الفرعي</option>
                  {filteredSubCategories.map(subCat => (
                    <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Images */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>الصور</h3>
              
              <div className={styles.formGroup}>
                <label>رابط الصورة</label>
                <div className={styles.imageInputGroup}>
                  <input
                    type="text"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className={styles.input}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className={styles.addImageBtn}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className={styles.imagesList}>
                  {formData.images.map((img, index) => (
                    <div key={index} className={styles.imageItem}>
                      <img src={img} alt={`صورة ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className={styles.removeImageBtn}
                      >
                        ✕
                      </button>
                      {index === 0 && <span className={styles.primaryBadge}>رئيسية</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                type="button"
                onClick={(e) => {
                  setSaveType('publish');
                  handleSubmit(e as any);
                }}
                className={styles.submitBtn}
                disabled={isLoading}
              >
                {isLoading && saveType === 'publish' ? 'جاري النشر...' : '✓ حفظ ونشر'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setSaveType('draft');
                  handleSubmit(e as any);
                }}
                className={styles.draftBtn}
                disabled={isLoading}
              >
                {isLoading && saveType === 'draft' ? 'جاري الحفظ...' : '📝 حفظ كمسودة'}
              </button>
              <Link href="/dashboard-admin/products/all" className={styles.cancelBtn}>
                إلغاء
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className={styles.stickyActionBar}>
          <div className={styles.stickyContent}>
            <div className={styles.stickyInfo}>
              <span className={styles.stickyTitle}>إضافة منتج جديد</span>
              {Object.keys(errors).length > 0 && (
                <span className={styles.stickyError}>
                  ⚠️ {Object.keys(errors).length} خطأ في النموذج
                </span>
              )}
            </div>
            <div className={styles.stickyActions}>
              <button
                type="button"
                onClick={(e) => {
                  setSaveType('publish');
                  handleSubmit(e as any);
                }}
                className={styles.stickySubmitBtn}
                disabled={isLoading}
              >
                {isLoading && saveType === 'publish' ? 'جاري النشر...' : '✓ حفظ ونشر'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setSaveType('draft');
                  handleSubmit(e as any);
                }}
                className={styles.stickyDraftBtn}
                disabled={isLoading}
              >
                {isLoading && saveType === 'draft' ? 'جاري الحفظ...' : '📝 مسودة'}
              </button>
              <Link href="/dashboard-admin/products/all" className={styles.stickyCancelBtn}>
                إلغاء
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
