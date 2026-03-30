'use client';

import { useState } from 'react';
import { MdLock, MdNotifications, MdLanguage, MdDelete } from 'react-icons/md';
import { getSettings } from '../data';
import styles from './settings.module.css';

export default function SettingsPage() {
  const userSettings = getSettings();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [notifications, setNotifications] = useState({
    email: userSettings.notifications.email,
    orders: userSettings.notifications.orderUpdates,
    offers: userSettings.notifications.promotions,
  });

  const [language, setLanguage] = useState(userSettings.language);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('كلمة المرور الجديدة غير متطابقة');
      return;
    }
    console.log('Change password');
  };

  const handleDeleteAccount = () => {
    if (confirm('هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      console.log('Delete account');
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>الإعدادات</h1>
          <h2>إدارة إعدادات حسابك</h2>
          <p>تحكم في كلمة المرور، الإشعارات، واللغة المفضلة</p>
        </div>
      </div>

      <div className={styles.header}>
      </div>

      {/* Password Change */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdLock size={24} />
          <h2>تغيير كلمة المرور</h2>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>كلمة المرور الحالية</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="أدخل كلمة المرور الحالية"
            />
          </div>

          <div className={styles.formGroup}>
            <label>كلمة المرور الجديدة</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="أدخل كلمة المرور الجديدة"
            />
          </div>

          <div className={styles.formGroup}>
            <label>تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أعد إدخال كلمة المرور الجديدة"
            />
          </div>

          <button className={styles.saveBtn} onClick={handlePasswordChange}>
            حفظ كلمة المرور
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdNotifications size={24} />
          <h2>إعدادات الإشعارات</h2>
        </div>

        <div className={styles.settingsList}>
          <div className={styles.settingItem}>
            <div>
              <h4>إشعارات البريد الإلكتروني</h4>
              <p>استقبال الإشعارات عبر البريد الإلكتروني</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingItem}>
            <div>
              <h4>إشعارات الطلبات</h4>
              <p>تلقي إشعارات عند تغيير حالة الطلب</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.orders}
                onChange={(e) => setNotifications({ ...notifications, orders: e.target.checked })}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingItem}>
            <div>
              <h4>العروض والخصومات</h4>
              <p>استقبال إشعارات بالعروض الخاصة</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.offers}
                onChange={(e) => setNotifications({ ...notifications, offers: e.target.checked })}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdLanguage size={24} />
          <h2>اللغة</h2>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>اختر اللغة</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`${styles.section} ${styles.dangerZone}`}>
        <div className={styles.sectionHeader}>
          <MdDelete size={24} />
          <h2>منطقة الخطر</h2>
        </div>

        <div className={styles.dangerContent}>
          <div>
            <h4>حذف الحساب</h4>
            <p>حذف حسابك بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه.</p>
          </div>
          <button className={styles.deleteBtn} onClick={handleDeleteAccount}>
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
}
