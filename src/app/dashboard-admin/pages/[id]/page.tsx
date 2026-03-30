"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page-editor.module.css';
import { StaticPage, MOCK_STATIC_PAGES } from '@/app/models/static-page';
import { PageHeader } from '../../components/shared';
import { MdSave, MdArrowBack } from 'react-icons/md';

export default function PageEditorPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id === 'new' ? null : parseInt(params.id as string);

  const [formData, setFormData] = useState<Partial<StaticPage>>({
    title: '',
    slug: '',
    content: '',
    isPublished: false
  });

  useEffect(() => {
    if (pageId) {
      const timer = setTimeout(() => {
        const page = MOCK_STATIC_PAGES.find(p => p.id === pageId);
        if (page) {
          setFormData(page);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pageId]);

  const handleSave = () => {
    console.log('Saving page:', formData);
    alert('تم الحفظ بنجاح');
    router.push('/dashboard-admin/pages');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title={pageId ? 'تعديل صفحة' : 'إضافة صفحة جديدة'}
        action={
          <div className={styles.actions}>
            <button
              className={styles.backButton}
              onClick={() => router.back()}
            >
              <MdArrowBack size={20} />
              رجوع
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              <MdSave size={20} />
              حفظ
            </button>
          </div>
        }
      />

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label className={styles.label}>عنوان الصفحة *</label>
              <input
                type="text"
                className={styles.input}
                value={formData.title}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  });
                }}
                placeholder="مثال: من نحن"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>الرابط (Slug) *</label>
              <div className={styles.slugInput}>
                <span className={styles.slugPrefix}>/</span>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="about-us"
                />
              </div>
              <small className={styles.hint}>
                سيكون الرابط: {window.location.origin}/{formData.slug || 'slug'}
              </small>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>المحتوى *</label>
              <textarea
                className={styles.editor}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="اكتب محتوى الصفحة هنا..."
                rows={15}
              />
              <small className={styles.hint}>
                يمكنك استخدام HTML للتنسيق
              </small>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>النشر</h3>
            
            <div className={styles.publishSection}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
                نشر الصفحة
              </label>
              <p className={styles.publishHint}>
                {formData.isPublished 
                  ? 'الصفحة منشورة ومتاحة للزوار' 
                  : 'الصفحة مسودة وغير متاحة للزوار'}
              </p>
            </div>

            <button className={styles.saveButtonFull} onClick={handleSave}>
              <MdSave size={20} />
              حفظ التغييرات
            </button>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>معاينة</h3>
            <div className={styles.preview}>
              <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>لا يوجد محتوى</p>' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
