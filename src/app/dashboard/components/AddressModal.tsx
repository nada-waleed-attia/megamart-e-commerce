'use client';

import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { Address } from './AddressCard';
import styles from './AddressModal.module.css';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, 'id'>) => void;
  address?: Address | null;
}

export default function AddressModal({ isOpen, onClose, onSave, address }: AddressModalProps) {
  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    fullName: '',
    phone: '',
    city: '',
    area: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    landmark: '',
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (address) {
        setFormData({
          type: address.type,
          fullName: address.fullName,
          phone: address.phone,
          city: address.city,
          area: address.area,
          street: address.street,
          building: address.building,
          floor: address.floor || '',
          apartment: address.apartment || '',
          landmark: address.landmark || '',
          isDefault: address.isDefault,
        });
      } else {
        setFormData({
          type: 'home',
          fullName: '',
          phone: '',
          city: '',
          area: '',
          street: '',
          building: '',
          floor: '',
          apartment: '',
          landmark: '',
          isDefault: false,
        });
      }
      setErrors({});
    }, 0);
    return () => clearTimeout(timer);
  }, [address, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) 
      newErrors.phone = 'رقم الهاتف غير صحيح';
    if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة';
    if (!formData.area.trim()) newErrors.area = 'المنطقة مطلوبة';
    if (!formData.street.trim()) newErrors.street = 'الشارع مطلوب';
    if (!formData.building.trim()) newErrors.building = 'رقم المبنى مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{address ? 'تعديل العنوان' : 'إضافة عنوان جديد'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>نوع العنوان *</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              className={styles.select}
            >
              <option value="home">منزل</option>
              <option value="work">عمل</option>
              <option value="other">آخر</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>الاسم الكامل *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="أدخل الاسم الكامل"
                className={errors.fullName ? styles.inputError : ''}
              />
              {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>رقم الهاتف *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>المدينة *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="مثال: القاهرة"
                className={errors.city ? styles.inputError : ''}
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>المنطقة *</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="مثال: مدينة نصر"
                className={errors.area ? styles.inputError : ''}
              />
              {errors.area && <span className={styles.error}>{errors.area}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>الشارع *</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="مثال: شارع مصطفى النحاس"
              className={errors.street ? styles.inputError : ''}
            />
            {errors.street && <span className={styles.error}>{errors.street}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>رقم المبنى *</label>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleChange}
                placeholder="مثال: 15"
                className={errors.building ? styles.inputError : ''}
              />
              {errors.building && <span className={styles.error}>{errors.building}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>الدور</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="مثال: 3"
              />
            </div>

            <div className={styles.formGroup}>
              <label>الشقة</label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="مثال: 5"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>علامات مميزة (اختياري)</label>
            <textarea
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="مثال: بجوار سيتي ستارز"
              rows={3}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              <span>تعيين كعنوان افتراضي</span>
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              إلغاء
            </button>
            <button type="submit" className={styles.saveBtn}>
              {address ? 'حفظ التعديلات' : 'إضافة العنوان'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
