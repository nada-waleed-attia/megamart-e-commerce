"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdEdit, MdDelete, MdAdd, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import styles from './sliders.module.css';
import heroStyles from '../hero.module.css';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  bgColor?: string;
}

export default function SlidersPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
    bgColor: '#3b82f6',
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      const mockSlides: Slide[] = [
        {
          id: 1,
          title: 'SMART WEARABLE',
          subtitle: 'UP TO 50% OFF',
          description: 'Best Deal Online on smart watches',
          image: '/images/slide1.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/electronics',
          isActive: true,
          order: 1,
          bgColor: '#3b82f6',
        },
        {
          id: 2,
          title: 'Premium Fruits Fresh from Farm',
          subtitle: 'ORGANIC & FRESH',
          description: 'منتجات طازجة من المزرعة مباشرة',
          image: '/images/slide2.webp',
          buttonText: 'اكتشف المزيد',
          buttonLink: '/categories/food',
          isActive: true,
          order: 2,
          bgColor: '#10b981',
        },
        {
          id: 3,
          title: 'Fashion Trends 2024',
          subtitle: 'NEW COLLECTION',
          description: 'أحدث صيحات الموضة',
          image: '/images/slide3.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/fashion',
          isActive: true,
          order: 3,
          bgColor: '#8b5cf6',
        },
        {
          id: 4,
          title: 'Electronics Mega Sale',
          subtitle: 'UP TO 50% OFF',
          description: 'خصومات هائلة على الإلكترونيات',
          image: '/images/slide4.webp',
          buttonText: 'تسوق الآن',
          buttonLink: '/categories/electronics',
          isActive: false,
          order: 4,
          bgColor: '#ef4444',
        },
        {
          id: 5,
          title: 'Home & Kitchen Essentials',
          subtitle: 'QUALITY PRODUCTS',
          description: 'منتجات عالية الجودة للمنزل',
          image: '/images/slide5.jpg',
          buttonText: 'اكتشف المزيد',
          buttonLink: '/categories/home',
          isActive: true,
          order: 5,
          bgColor: '#f59e0b',
        },
      ];
      
      setSlides(mockSlides.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeCount = slides.filter(s => s.isActive).length;
  const inactiveCount = slides.filter(s => !s.isActive).length;

  const handleAdd = () => {
    setEditingSlide(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: 'تسوق الآن',
      buttonLink: '',
      isActive: true,
      bgColor: '#3b82f6',
    });
    setShowModal(true);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description || '',
      image: slide.image,
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
      isActive: slide.isActive,
      bgColor: slide.bgColor || '#3b82f6',
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا السلايد؟')) {
      setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setSlides(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleMoveUp = (id: number) => {
    const index = slides.findIndex(s => s.id === id);
    if (index > 0) {
      const newSlides = [...slides];
      [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
      setSlides(newSlides);
    }
  };

  const handleMoveDown = (id: number) => {
    const index = slides.findIndex(s => s.id === id);
    if (index < slides.length - 1) {
      const newSlides = [...slides];
      [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
      setSlides(newSlides);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSlide) {
      setSlides(prev => prev.map(s => 
        s.id === editingSlide.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      const newSlide: Slide = {
        id: Math.max(...slides.map(s => s.id), 0) + 1,
        ...formData,
        order: slides.length + 1,
      };
      setSlides(prev => [...prev, newSlide]);
    }
    
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.slidersPage}>
      {/* Hero Section */}
      <div className={heroStyles.heroSection}>
        <div className={heroStyles.heroContent}>
          <h1>إدارة السلايدر</h1>
          <h2>التحكم في عرض الشرائح</h2>
          <p>إضافة وتعديل وترتيب شرائح العرض الرئيسية</p>
        </div>
      </div>

      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>إدارة السلايدر</h2>
          <p className={styles.subtitle}>التحكم في شرائح العرض الرئيسية</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <MdAdd size={20} />
          <span>إضافة سلايد جديد</span>
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            📊
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>إجمالي السلايدات</p>
            <h3 className={styles.statValue}>{slides.length}</h3>
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
          <div className={styles.statIcon} style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            ✗
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>غير النشطة</p>
            <h3 className={styles.statValue}>{inactiveCount}</h3>
          </div>
        </div>
      </div>

      {/* Slides List */}
      <div className={styles.slidesList}>
        {slides.map((slide, index) => (
          <div key={slide.id} className={styles.slideCard}>
            <div className={styles.slidePreview}>
              <Image
                src={slide.image}
                alt={slide.title}
                width={200}
                height={120}
                className={styles.slideImage}
              />
            </div>
            
            <div className={styles.slideInfo}>
              <h3 className={styles.slideTitle}>{slide.title}</h3>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
              {slide.description && (
                <p className={styles.slideDescription}>{slide.description}</p>
              )}
              <div className={styles.slideMeta}>
                <span className={`${styles.statusBadge} ${slide.isActive ? styles.active : styles.inactive}`}>
                  {slide.isActive ? '✓ نشط' : '✗ غير نشط'}
                </span>
                <span className={styles.orderBadge}>الترتيب: {index + 1}</span>
              </div>
            </div>

            <div className={styles.slideActions}>
              <button
                className={styles.actionBtn}
                onClick={() => handleMoveUp(slide.id)}
                disabled={index === 0}
                title="تحريك لأعلى"
              >
                <MdArrowUpward size={18} />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleMoveDown(slide.id)}
                disabled={index === slides.length - 1}
                title="تحريك لأسفل"
              >
                <MdArrowDownward size={18} />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleToggleStatus(slide.id)}
                title={slide.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
              >
                {slide.isActive ? '🔕' : '🔔'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleEdit(slide)}
                title="تعديل"
              >
                <MdEdit size={18} />
              </button>
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => handleDelete(slide.id)}
                title="حذف"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingSlide ? 'تعديل السلايد' : 'إضافة سلايد جديد'}</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>العنوان الرئيسي</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>العنوان الفرعي</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الوصف (اختياري)</label>
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
                  required
                  className={styles.input}
                  placeholder="/images/slide.webp"
                />
              </div>
              <div className={styles.formGroup}>
                <label>نص الزر (اختياري)</label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>رابط الزر (اختياري)</label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  className={styles.input}
                  placeholder="/categories/electronics"
                />
              </div>
              <div className={styles.formGroup}>
                <label>لون الخلفية</label>
                <input
                  type="color"
                  value={formData.bgColor}
                  onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                  className={styles.colorInput}
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
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.saveBtn}>
                  {editingSlide ? 'حفظ التغييرات' : 'إضافة'}
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
