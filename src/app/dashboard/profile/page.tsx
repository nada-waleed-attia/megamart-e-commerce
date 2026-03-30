'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdPerson, MdEmail, MdPhone, MdCake, MdEdit } from 'react-icons/md';
import { getUser } from '../data';
import styles from './profile.module.css';

export default function ProfilePage() {
  const userData = getUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    dateOfBirth: userData.birthDate,
    gender: userData.gender,
    avatar: userData.avatar,
    joinDate: userData.joinDate,
    totalOrders: userData.totalOrders,
    totalSpent: userData.totalSpent,
  });

  const handleSave = () => {
    console.log('Save profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>الملف الشخصي</h1>
          <h2>معلوماتك الشخصية</h2>
          <p>عرض وتعديل بياناتك الشخصية ومعلومات حسابك</p>
        </div>
      </div>

      <div className={styles.header}>
        {!isEditing && (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            <MdEdit size={20} />
            <span>تعديل الملف الشخصي</span>
          </button>
        )}
      </div>

      <div className={styles.content}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {profile.avatar ? (
                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src={profile.avatar} alt={profile.name} fill style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <MdPerson size={60} />
              )}
            </div>
            {isEditing && (
              <button className={styles.uploadBtn}>تغيير الصورة</button>
            )}
          </div>

          <div className={styles.profileInfo}>
            {isEditing ? (
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label>الاسم الكامل</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>رقم الهاتف</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>تاريخ الميلاد</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الجنس</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.saveBtn} onClick={handleSave}>
                    حفظ التغييرات
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MdPerson size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>الاسم</span>
                    <span className={styles.infoValue}>{profile.name}</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MdEmail size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>البريد الإلكتروني</span>
                    <span className={styles.infoValue}>{profile.email}</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MdPhone size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>رقم الهاتف</span>
                    <span className={styles.infoValue}>{profile.phone}</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MdCake size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>تاريخ الميلاد</span>
                    <span className={styles.infoValue}>{profile.dateOfBirth}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className={styles.statsCard}>
          <h2>الإحصائيات</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>تاريخ التسجيل</span>
              <span className={styles.statValue}>{profile.joinDate}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>عدد الطلبات</span>
              <span className={styles.statValue}>{profile.totalOrders} طلب</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>إجمالي المشتريات</span>
              <span className={styles.statValue}>{profile.totalSpent} جنيه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
