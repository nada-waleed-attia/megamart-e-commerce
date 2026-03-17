"use client";

import { useState } from 'react';
import styles from './settings.module.css';
import { SiteSettings, DEFAULT_SITE_SETTINGS } from '@/app/models/site-settings';
import { MdUpload, MdSave } from 'react-icons/md';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [activeTab, setActiveTab] = useState<'branding' | 'contact' | 'social' | 'home' | 'seo'>('branding');
  const [savedMessage, setSavedMessage] = useState('');

  const updateSettings = (section: keyof SiteSettings, field: string, value: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    // هنا سيتم الحفظ في الـ API لاحقًا
    console.log('Saving settings:', settings);
    setSavedMessage('تم حفظ الإعدادات بنجاح');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleImageUpload = (section: keyof SiteSettings, field: string) => {
    // هنا سيتم رفع الصورة لاحقًا
    console.log('Upload image for:', section, field);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>إعدادات الواجهة العامة</h1>
        <button className={styles.saveButton} onClick={handleSave}>
          <MdSave size={20} />
          حفظ جميع التغييرات
        </button>
      </div>

      {savedMessage && (
        <div className={styles.successMessage}>{savedMessage}</div>
      )}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'branding' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('branding')}
        >
          الهوية البصرية
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contact' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          بيانات التواصل
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'social' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('social')}
        >
          السوشيال ميديا
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'home' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('home')}
        >
          نصوص الصفحة الرئيسية
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'seo' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO
        </button>
      </div>

      <div className={styles.content}>
        {/* الهوية البصرية */}
        {activeTab === 'branding' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>الهوية البصرية</h2>
            
            {/* اسم الموقع والشعار */}
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <h3>اسم الموقع والشعار</h3>
              </div>
              <div className={styles.visualContent}>
                <div className={styles.previewBox}>
                  <div className={styles.siteNamePreview}>{settings.branding.siteName}</div>
                  <div className={styles.taglinePreview}>{settings.branding.tagline}</div>
                </div>
                <div className={styles.editFields}>
                  <input
                    type="text"
                    className={styles.input}
                    value={settings.branding.siteName}
                    onChange={(e) => updateSettings('branding', 'siteName', e.target.value)}
                    placeholder="اسم الموقع"
                  />
                  <input
                    type="text"
                    className={styles.input}
                    value={settings.branding.tagline}
                    onChange={(e) => updateSettings('branding', 'tagline', e.target.value)}
                    placeholder="الشعار"
                  />
                </div>
              </div>
            </div>

            {/* اللوجو */}
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <h3>اللوجو</h3>
              </div>
              <div className={styles.visualContent}>
                <div className={styles.logoPreview}>
                  {settings.branding.logo ? (
                    <img src={settings.branding.logo} alt="Logo" className={styles.logoImage} />
                  ) : (
                    <div className={styles.logoPlaceholder}>لا يوجد لوجو</div>
                  )}
                </div>
                <div className={styles.editFields}>
                  <input
                    type="text"
                    className={styles.input}
                    value={settings.branding.logo}
                    onChange={(e) => updateSettings('branding', 'logo', e.target.value)}
                    placeholder="/images/logo.png"
                  />
                  <button className={styles.uploadButton} onClick={() => handleImageUpload('branding', 'logo')}>
                    <MdUpload size={18} />
                    رفع صورة
                  </button>
                  <small className={styles.hint}>الحجم الموصى به: 200x60 بكسل</small>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <h3>Favicon</h3>
              </div>
              <div className={styles.visualContent}>
                <div className={styles.faviconPreview}>
                  {settings.branding.favicon ? (
                    <img src={settings.branding.favicon} alt="Favicon" className={styles.faviconImage} />
                  ) : (
                    <div className={styles.faviconPlaceholder}>؟</div>
                  )}
                </div>
                <div className={styles.editFields}>
                  <input
                    type="text"
                    className={styles.input}
                    value={settings.branding.favicon}
                    onChange={(e) => updateSettings('branding', 'favicon', e.target.value)}
                    placeholder="/favicon.ico"
                  />
                  <button className={styles.uploadButton} onClick={() => handleImageUpload('branding', 'favicon')}>
                    <MdUpload size={18} />
                    رفع صورة
                  </button>
                  <small className={styles.hint}>الحجم الموصى به: 32x32 بكسل</small>
                </div>
              </div>
            </div>

            {/* ألوان الهوية */}
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <h3>ألوان الهوية</h3>
              </div>
              <div className={styles.colorsGrid}>
                <div className={styles.colorCard}>
                  <div 
                    className={styles.colorPreview} 
                    style={{ backgroundColor: settings.colors.primary }}
                  ></div>
                  <label className={styles.colorLabel}>اللون الأساسي</label>
                  <div className={styles.colorInputGroup}>
                    <input
                      type="color"
                      value={settings.colors.primary}
                      onChange={(e) => updateSettings('colors', 'primary', e.target.value)}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      className={styles.colorText}
                      value={settings.colors.primary}
                      onChange={(e) => updateSettings('colors', 'primary', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.colorCard}>
                  <div 
                    className={styles.colorPreview} 
                    style={{ backgroundColor: settings.colors.secondary }}
                  ></div>
                  <label className={styles.colorLabel}>اللون الثانوي</label>
                  <div className={styles.colorInputGroup}>
                    <input
                      type="color"
                      value={settings.colors.secondary}
                      onChange={(e) => updateSettings('colors', 'secondary', e.target.value)}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      className={styles.colorText}
                      value={settings.colors.secondary}
                      onChange={(e) => updateSettings('colors', 'secondary', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.colorCard}>
                  <div 
                    className={styles.colorPreview} 
                    style={{ backgroundColor: settings.colors.accent }}
                  ></div>
                  <label className={styles.colorLabel}>لون التمييز</label>
                  <div className={styles.colorInputGroup}>
                    <input
                      type="color"
                      value={settings.colors.accent}
                      onChange={(e) => updateSettings('colors', 'accent', e.target.value)}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      className={styles.colorText}
                      value={settings.colors.accent}
                      onChange={(e) => updateSettings('colors', 'accent', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* بيانات التواصل */}
        {activeTab === 'contact' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>بيانات التواصل</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>رقم الهاتف</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.contact.phone}
                  onChange={(e) => updateSettings('contact', 'phone', e.target.value)}
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>البريد الإلكتروني</label>
                <input
                  type="email"
                  className={styles.input}
                  value={settings.contact.email}
                  onChange={(e) => updateSettings('contact', 'email', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>العنوان</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.contact.address}
                  onChange={(e) => updateSettings('contact', 'address', e.target.value)}
                  placeholder="القاهرة، مصر"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ساعات العمل</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.contact.workingHours}
                  onChange={(e) => updateSettings('contact', 'workingHours', e.target.value)}
                  placeholder="السبت - الخميس: 9 صباحاً - 10 مساءً"
                />
              </div>
            </div>
          </div>
        )}

        {/* السوشيال ميديا */}
        {activeTab === 'social' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>روابط السوشيال ميديا</h2>
            
            <div className={styles.socialGrid}>
              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#1877f2' }}>
                  <span>f</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>Facebook</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.facebook}
                    onChange={(e) => updateSettings('social', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
              </div>

              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#e4405f' }}>
                  <span>📷</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>Instagram</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.instagram}
                    onChange={(e) => updateSettings('social', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
              </div>

              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#1da1f2' }}>
                  <span>🐦</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>Twitter</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.twitter}
                    onChange={(e) => updateSettings('social', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
              </div>

              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#ff0000' }}>
                  <span>▶</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>YouTube</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.youtube}
                    onChange={(e) => updateSettings('social', 'youtube', e.target.value)}
                    placeholder="https://youtube.com/yourchannel"
                  />
                </div>
              </div>

              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#000000' }}>
                  <span>🎵</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>TikTok</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.tiktok}
                    onChange={(e) => updateSettings('social', 'tiktok', e.target.value)}
                    placeholder="https://tiktok.com/@yourpage"
                  />
                </div>
              </div>

              <div className={styles.socialCard}>
                <div className={styles.socialIcon} style={{ backgroundColor: '#25d366' }}>
                  <span>💬</span>
                </div>
                <div className={styles.socialInfo}>
                  <label className={styles.socialLabel}>WhatsApp</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.whatsapp}
                    onChange={(e) => updateSettings('social', 'whatsapp', e.target.value)}
                    placeholder="https://wa.me/201234567890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* نصوص الصفحة الرئيسية */}
        {activeTab === 'home' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>نصوص الصفحة الرئيسية</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>عنوان Hero Section</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.homeTexts.heroTitle}
                  onChange={(e) => updateSettings('homeTexts', 'heroTitle', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>نص فرعي Hero Section</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.homeTexts.heroSubtitle}
                  onChange={(e) => updateSettings('homeTexts', 'heroSubtitle', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>نص الزر</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.homeTexts.heroButtonText}
                  onChange={(e) => updateSettings('homeTexts', 'heroButtonText', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>نص قسم "من نحن"</label>
                <textarea
                  className={styles.textarea}
                  value={settings.homeTexts.aboutSection}
                  onChange={(e) => updateSettings('homeTexts', 'aboutSection', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* SEO */}
        {activeTab === 'seo' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>إعدادات SEO</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>عنوان الصفحة (Meta Title)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.seo.metaTitle}
                  onChange={(e) => updateSettings('seo', 'metaTitle', e.target.value)}
                />
                <small className={styles.hint}>الحد الأقصى: 60 حرف</small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>وصف الصفحة (Meta Description)</label>
                <textarea
                  className={styles.textarea}
                  value={settings.seo.metaDescription}
                  onChange={(e) => updateSettings('seo', 'metaDescription', e.target.value)}
                  rows={3}
                />
                <small className={styles.hint}>الحد الأقصى: 160 حرف</small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>الكلمات المفتاحية (Keywords)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.seo.metaKeywords}
                  onChange={(e) => updateSettings('seo', 'metaKeywords', e.target.value)}
                  placeholder="كلمة1, كلمة2, كلمة3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
