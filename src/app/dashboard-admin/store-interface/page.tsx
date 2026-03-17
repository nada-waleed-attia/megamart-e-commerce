"use client";

import { useState } from 'react';
import styles from './store-interface.module.css';
import { 
  SectionConfig, 
  DEFAULT_SECTIONS, 
  AVAILABLE_CATEGORIES, 
  SORT_OPTIONS 
} from '@/app/models/section-config';

export default function StoreInterfacePage() {
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_SECTIONS);
  const [savedMessage, setSavedMessage] = useState<string>('');

  const updateSection = (id: number, field: keyof SectionConfig, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const saveSection = (id: number) => {
    // هنا سيتم الحفظ في الـ API لاحقًا
    console.log('Saving section:', sections.find(s => s.id === id));
    setSavedMessage(`تم حفظ السيكشن ${id} بنجاح`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>التحكم في سيكشنات الصفحة الرئيسية</h1>
        <p className={styles.pageDescription}>
          قم بتخصيص السيكشنات الثلاثة التي تظهر في الصفحة الرئيسية
        </p>
      </div>

      {savedMessage && (
        <div className={styles.successMessage}>
          {savedMessage}
        </div>
      )}

      <div className={styles.sectionsGrid}>
        {sections.map((section) => (
          <div key={section.id} className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>السيكشن {section.id}</h3>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={section.isActive}
                  onChange={(e) => updateSection(section.id, 'isActive', e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.cardBody}>
              {/* عنوان السيكشن */}
              <div className={styles.formGroup}>
                <label className={styles.label}>عنوان السيكشن</label>
                <input
                  type="text"
                  className={styles.input}
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  placeholder="مثال: أحدث المنتجات"
                />
              </div>

              {/* القسم */}
              <div className={styles.formGroup}>
                <label className={styles.label}>القسم</label>
                <select
                  className={styles.select}
                  value={section.category}
                  onChange={(e) => updateSection(section.id, 'category', e.target.value)}
                >
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* عدد المنتجات */}
              <div className={styles.formGroup}>
                <label className={styles.label}>عدد المنتجات المعروضة</label>
                <input
                  type="number"
                  className={styles.input}
                  value={section.itemCount}
                  onChange={(e) => updateSection(section.id, 'itemCount', parseInt(e.target.value) || 0)}
                  min="4"
                  max="20"
                />
              </div>

              {/* ترتيب العرض */}
              <div className={styles.formGroup}>
                <label className={styles.label}>ترتيب العرض</label>
                <select
                  className={styles.select}
                  value={section.sortOrder}
                  onChange={(e) => updateSection(section.id, 'sortOrder', e.target.value as any)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* زر الحفظ */}
              <button
                className={styles.saveButton}
                onClick={() => saveSection(section.id)}
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* معلومات إضافية */}
      <div className={styles.infoBox}>
        <h4 className={styles.infoTitle}>ملاحظات:</h4>
        <ul className={styles.infoList}>
          <li>يمكنك تفعيل أو إلغاء تفعيل أي سيكشن باستخدام المفتاح في الأعلى</li>
          <li>عدد المنتجات المعروضة يتراوح بين 4 و 20 منتج</li>
          <li>التغييرات تظهر مباشرة في الصفحة الرئيسية بعد الحفظ</li>
          <li>يمكن إضافة المزيد من السيكشنات لاحقًا حسب الحاجة</li>
        </ul>
      </div>
    </div>
  );
}
