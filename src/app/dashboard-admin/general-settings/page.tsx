"use client";

import { useState } from 'react';
import styles from './general-settings.module.css';
import { 
  GeneralSettings, 
  DEFAULT_GENERAL_SETTINGS,
  AVAILABLE_CURRENCIES,
  AVAILABLE_LANGUAGES
} from '@/app/models/general-settings';
import { MdSave, MdStore, MdLanguage, MdAttachMoney, MdBuild } from 'react-icons/md';

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings>(DEFAULT_GENERAL_SETTINGS);
  const [activeTab, setActiveTab] = useState<'store' | 'system' | 'shipping' | 'status'>('store');
  const [savedMessage, setSavedMessage] = useState('');

  const updateSettings = (section: keyof GeneralSettings, field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    console.log('Saving settings:', settings);
    setSavedMessage('تم حفظ الإعدادات بنجاح');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>الإعدادات العامة</h1>
          <p className={styles.subtitle}>إدارة إعدادات المتجر الأساسية</p>
        </div>
        <button className={styles.saveButton} onClick={handleSave}>
          <MdSave size={20} />
          حفظ التغييرات
        </button>
      </div>

      {savedMessage && (
        <div className={styles.successMessage}>{savedMessage}</div>
      )}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'store' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('store')}
        >
          <MdStore size={18} />
          معلومات المتجر
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'system' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('system')}
        >
          <MdLanguage size={18} />
          إعدادات النظام
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          <MdAttachMoney size={18} />
          الشحن والضرائب
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'status' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <MdBuild size={18} />
          حالة المتجر
        </button>
      </div>

      <div className={styles.content}>
        {/* معلومات المتجر */}
        {activeTab === 'store' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>معلومات المتجر الأساسية</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>اسم المتجر *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.store.name}
                  onChange={(e) => updateSettings('store', 'name', e.target.value)}
                  placeholder="MegaMart"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>البريد الإلكتروني *</label>
                <input
                  type="email"
                  className={styles.input}
                  value={settings.store.email}
                  onChange={(e) => updateSettings('store', 'email', e.target.value)}
                  placeholder="info@megamart.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>رقم الهاتف *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.store.phone}
                  onChange={(e) => updateSettings('store', 'phone', e.target.value)}
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>العنوان *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.store.address}
                  onChange={(e) => updateSettings('store', 'address', e.target.value)}
                  placeholder="القاهرة، مصر"
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>وصف المتجر</label>
                <textarea
                  className={styles.textarea}
                  value={settings.store.description}
                  onChange={(e) => updateSettings('store', 'description', e.target.value)}
                  placeholder="وصف مختصر عن متجرك"
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>اللوجو</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.store.logo}
                  onChange={(e) => updateSettings('store', 'logo', e.target.value)}
                  placeholder="/images/logo.png"
                />
                <small className={styles.hint}>رابط اللوجو أو مسار الملف</small>
              </div>
            </div>

            <div className={styles.socialSection}>
              <h3 className={styles.subsectionTitle}>الروابط الاجتماعية</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Facebook</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.facebook}
                    onChange={(e) => updateSettings('social', 'facebook', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Instagram</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.instagram}
                    onChange={(e) => updateSettings('social', 'instagram', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Twitter</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.twitter}
                    onChange={(e) => updateSettings('social', 'twitter', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>WhatsApp</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={settings.social.whatsapp}
                    onChange={(e) => updateSettings('social', 'whatsapp', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* إعدادات النظام */}
        {activeTab === 'system' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>إعدادات النظام</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>العملة *</label>
                <select
                  className={styles.select}
                  value={settings.system.currency}
                  onChange={(e) => {
                    const currency = AVAILABLE_CURRENCIES.find(c => c.code === e.target.value);
                    updateSettings('system', 'currency', e.target.value);
                    if (currency) {
                      updateSettings('system', 'currencySymbol', currency.symbol);
                    }
                  }}
                >
                  {AVAILABLE_CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>رمز العملة</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.system.currencySymbol}
                  onChange={(e) => updateSettings('system', 'currencySymbol', e.target.value)}
                  placeholder="ج.م"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>اللغة الافتراضية *</label>
                <select
                  className={styles.select}
                  value={settings.system.defaultLanguage}
                  onChange={(e) => updateSettings('system', 'defaultLanguage', e.target.value)}
                >
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>المنطقة الزمنية</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.system.timezone}
                  onChange={(e) => updateSettings('system', 'timezone', e.target.value)}
                  placeholder="Africa/Cairo"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>تنسيق التاريخ</label>
                <select
                  className={styles.select}
                  value={settings.system.dateFormat}
                  onChange={(e) => updateSettings('system', 'dateFormat', e.target.value)}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* الشحن والضرائب */}
        {activeTab === 'shipping' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>إعدادات الشحن</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>تكلفة الشحن الافتراضية</label>
                <input
                  type="number"
                  className={styles.input}
                  value={settings.shipping.defaultShippingCost}
                  onChange={(e) => updateSettings('shipping', 'defaultShippingCost', parseFloat(e.target.value))}
                  placeholder="50"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>حد الشحن المجاني</label>
                <input
                  type="number"
                  className={styles.input}
                  value={settings.shipping.freeShippingThreshold}
                  onChange={(e) => updateSettings('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                  placeholder="500"
                />
                <small className={styles.hint}>الطلبات فوق هذا المبلغ شحن مجاني</small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>مدة التوصيل المتوقعة</label>
                <input
                  type="text"
                  className={styles.input}
                  value={settings.shipping.estimatedDeliveryDays}
                  onChange={(e) => updateSettings('shipping', 'estimatedDeliveryDays', e.target.value)}
                  placeholder="3-5 أيام"
                />
              </div>
            </div>

            <div className={styles.taxSection}>
              <h3 className={styles.subsectionTitle}>إعدادات الضرائب</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={settings.tax.enabled}
                      onChange={(e) => updateSettings('tax', 'enabled', e.target.checked)}
                    />
                    تفعيل الضرائب
                  </label>
                </div>

                {settings.tax.enabled && (
                  <>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>نسبة الضريبة (%)</label>
                      <input
                        type="number"
                        className={styles.input}
                        value={settings.tax.rate}
                        onChange={(e) => updateSettings('tax', 'rate', parseFloat(e.target.value))}
                        placeholder="14"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={settings.tax.includedInPrice}
                          onChange={(e) => updateSettings('tax', 'includedInPrice', e.target.checked)}
                        />
                        الضريبة مضمنة في السعر
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* حالة المتجر */}
        {activeTab === 'status' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>حالة المتجر</h2>
            
            <div className={styles.statusCards}>
              <div className={styles.statusCard}>
                <div className={styles.statusCardHeader}>
                  <h3>حالة المتجر</h3>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.status.isActive}
                      onChange={(e) => updateSettings('status', 'isActive', e.target.checked)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p className={styles.statusDescription}>
                  {settings.status.isActive 
                    ? 'المتجر مفعّل ومتاح للعملاء' 
                    : 'المتجر معطّل وغير متاح للعملاء'}
                </p>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusCardHeader}>
                  <h3>وضع الصيانة</h3>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.status.maintenanceMode}
                      onChange={(e) => updateSettings('status', 'maintenanceMode', e.target.checked)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p className={styles.statusDescription}>
                  {settings.status.maintenanceMode 
                    ? 'المتجر في وضع الصيانة' 
                    : 'المتجر يعمل بشكل طبيعي'}
                </p>
              </div>
            </div>

            {settings.status.maintenanceMode && (
              <div className={styles.formGroup}>
                <label className={styles.label}>رسالة الصيانة</label>
                <textarea
                  className={styles.textarea}
                  value={settings.status.maintenanceMessage}
                  onChange={(e) => updateSettings('status', 'maintenanceMessage', e.target.value)}
                  placeholder="الموقع تحت الصيانة، سنعود قريباً"
                  rows={3}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
