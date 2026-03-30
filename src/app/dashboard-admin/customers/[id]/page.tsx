"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './customer-details.module.css';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  registrationDate: string;
  lastActivity: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: number;
}

interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  phone: string;
}

interface Note {
  id: number;
  date: string;
  text: string;
  author: string;
}

export default function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'notes' | 'activity' | 'newsletter' | 'favorites'>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Unwrap params
  useEffect(() => {
    params.then(p => setCustomerId(p.id));
  }, [params]);

  useEffect(() => {
    if (!customerId) return;

    // TODO: Replace with actual API call
    const fetchCustomerData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCustomer: Customer = {
          id: parseInt(customerId),
          name: 'أحمد محمد علي',
          email: 'ahmed@example.com',
          phone: '01012345678',
          totalOrders: 15,
          totalSpent: 125000,
          status: 'active',
          registrationDate: '2024-01-15',
          lastActivity: '2024-03-10',
        };

        const mockOrders: Order[] = [
          { id: 1001, date: '2024-03-10', total: 15000, status: 'مكتمل', items: 3 },
          { id: 1002, date: '2024-03-05', total: 8500, status: 'مكتمل', items: 2 },
          { id: 1003, date: '2024-02-28', total: 12000, status: 'قيد التوصيل', items: 4 },
        ];

        const mockAddresses: Address[] = [
          { id: 1, type: 'المنزل', address: '15 شارع الجمهورية', city: 'القاهرة', phone: '01012345678' },
          { id: 2, type: 'العمل', address: '25 شارع التحرير', city: 'الجيزة', phone: '01098765432' },
        ];

        const mockNotes: Note[] = [
          { id: 1, date: '2024-03-01', text: 'عميل مميز، يفضل التواصل عبر الواتساب', author: 'أدمن' },
        ];

        setCustomer(mockCustomer);
        setOrders(mockOrders);
        setAddresses(mockAddresses);
        setNotes(mockNotes);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleStatusChange = (newStatus: 'active' | 'inactive' | 'blocked') => {
    if (customer) {
      setCustomer({ ...customer, status: newStatus });
      // TODO: Call API to update status
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: notes.length + 1,
        date: new Date().toISOString().split('T')[0],
        text: newNote,
        author: 'أدمن',
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setShowNoteModal(false);
      // TODO: Call API to save note
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className={styles.error}>
        <p>❌ لم يتم العثور على العميل</p>
        <button onClick={() => router.push('/dashboard-admin/customers')}>
          العودة للقائمة
        </button>
      </div>
    );
  }

  return (
    <div className={styles.customerDetailsPage}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/dashboard-admin/customers')}>
          ← العودة للقائمة
        </button>
        <div className={styles.headerActions}>
          <button className={styles.editBtn} onClick={() => setShowEditModal(true)}>
            ✏️ تعديل البيانات
          </button>
          <button className={styles.deleteBtn} onClick={() => {
            if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
              router.push('/dashboard-admin/customers');
            }
          }}>
            🗑️ حذف العميل
          </button>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className={styles.infoCard}>
        <div className={styles.customerHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {customer.name.charAt(0)}
            </div>
            <div className={styles.customerBasicInfo}>
              <h2 className={styles.customerName}>{customer.name}</h2>
              <div className={styles.contactInfo}>
                <span className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  {customer.email}
                </span>
                <span className={styles.contactItem}>
                  <span className={styles.contactIcon}>📱</span>
                  {customer.phone}
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.statusSection}>
            <label className={styles.statusLabel}>الحالة</label>
            <span className={`${styles.badge} ${styles[customer.status]}`}>
              {customer.status === 'active' ? '✓ نشط' : customer.status === 'inactive' ? '⏸ غير نشط' : '🚫 محظور'}
            </span>
            <select 
              value={customer.status} 
              onChange={(e) => handleStatusChange(e.target.value as any)}
              className={styles.statusSelect}
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="blocked">محظور</option>
            </select>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>📦</span>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>عدد الطلبات</p>
              <p className={styles.statValue}>{customer.totalOrders}</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>💰</span>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>إجمالي الإنفاق</p>
              <p className={styles.statValue}>{customer.totalSpent.toLocaleString()} ج.م</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>📅</span>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>تاريخ التسجيل</p>
              <p className={styles.statValue}>{new Date(customer.registrationDate).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🕐</span>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>آخر نشاط</p>
              <p className={styles.statValue}>{new Date(customer.lastActivity).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 البيانات الأساسية
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 الطلبات ({orders.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'addresses' ? styles.active : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          📍 العناوين ({addresses.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'activity' ? styles.active : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          🕐 النشاط
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'notes' ? styles.active : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📝 الملاحظات الإدارية ({notes.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'newsletter' ? styles.active : ''}`}
          onClick={() => setActiveTab('newsletter')}
        >
          📧 الاشتراك في القائمة البريدية
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ⭐ المفضلة
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overview}>
            <div className={styles.section}>
              <h3>معلومات الاتصال</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>البريد الإلكتروني:</span>
                  <span className={styles.value}>{customer.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>الهاتف:</span>
                  <span className={styles.value}>{customer.phone}</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>آخر الطلبات</h3>
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className={styles.orderItem}>
                  <div>
                    <p className={styles.orderId}>طلب #{order.id}</p>
                    <p className={styles.orderDate}>{new Date(order.date).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <div>
                    <p className={styles.orderTotal}>{order.total.toLocaleString()} ج.م</p>
                    <p className={styles.orderStatus}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className={styles.orders}>
            {orders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h4>طلب #{order.id}</h4>
                    <p>{new Date(order.date).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <span className={styles.orderStatus}>{order.status}</span>
                </div>
                <div className={styles.orderDetails}>
                  <p>عدد المنتجات: {order.items}</p>
                  <p className={styles.orderTotal}>الإجمالي: {order.total.toLocaleString()} ج.م</p>
                </div>
                <button className={styles.viewOrderBtn}>عرض التفاصيل</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className={styles.addresses}>
            {addresses.map(address => (
              <div key={address.id} className={styles.addressCard}>
                <div className={styles.addressHeader}>
                  <h4>{address.type}</h4>
                  <button className={styles.editAddressBtn}>✏️</button>
                </div>
                <p>{address.address}</p>
                <p>{address.city}</p>
                <p>📞 {address.phone}</p>
              </div>
            ))}
            <button className={styles.addAddressBtn}>+ إضافة عنوان جديد</button>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className={styles.notes}>
            <button className={styles.addNoteBtn} onClick={() => setShowNoteModal(true)}>
              + إضافة ملاحظة جديدة
            </button>
            {notes.map(note => (
              <div key={note.id} className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <span className={styles.noteAuthor}>{note.author}</span>
                  <span className={styles.noteDate}>{new Date(note.date).toLocaleDateString('ar-EG')}</span>
                </div>
                <p className={styles.noteText}>{note.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className={styles.activity}>
            <div className={styles.activityTimeline}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🛒</div>
                <div className={styles.activityContent}>
                  <h4>قام بإتمام طلب جديد</h4>
                  <p>طلب #1001 - بقيمة 15,000 ج.م</p>
                  <span className={styles.activityTime}>منذ 6 أيام</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>👁️</div>
                <div className={styles.activityContent}>
                  <h4>شاهد منتج</h4>
                  <p>لابتوب HP Pavilion</p>
                  <span className={styles.activityTime}>منذ أسبوع</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🔍</div>
                <div className={styles.activityContent}>
                  <h4>بحث عن</h4>
                  <p>&quot;سماعات بلوتوث&quot;</p>
                  <span className={styles.activityTime}>منذ أسبوعين</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>✅</div>
                <div className={styles.activityContent}>
                  <h4>تم تسجيل الحساب</h4>
                  <p>انضم إلى المتجر</p>
                  <span className={styles.activityTime}>{new Date(customer.registrationDate).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className={styles.newsletter}>
            <div className={styles.newsletterCard}>
              <div className={styles.newsletterHeader}>
                <h3>حالة الاشتراك في القائمة البريدية</h3>
                <span className={styles.subscribedBadge}>✓ مشترك</span>
              </div>
              <div className={styles.newsletterInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>البريد الإلكتروني:</span>
                  <span className={styles.infoValue}>{customer.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>تاريخ الاشتراك:</span>
                  <span className={styles.infoValue}>15 يناير 2024</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>المصدر:</span>
                  <span className={styles.infoValue}>التذييل (Footer)</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>عدد الرسائل المستلمة:</span>
                  <span className={styles.infoValue}>12 رسالة</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>آخر رسالة:</span>
                  <span className={styles.infoValue}>5 مارس 2024</span>
                </div>
              </div>
              <div className={styles.newsletterActions}>
                <button className={styles.unsubscribeBtn}>إلغاء الاشتراك</button>
                <button className={styles.sendEmailBtn}>إرسال رسالة مخصصة</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className={styles.favorites}>
            <div className={styles.favoritesGrid}>
              <div className={styles.favoriteCard}>
                <div className={styles.favoriteImageWrapper}>
                  <Image src="/images/samsung-products.jpg" alt="Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.favoriteInfo}>
                  <h4>سماعات سامسونج Galaxy Buds</h4>
                  <p className={styles.favoritePrice}>2,500 ج.م</p>
                  <p className={styles.favoriteDate}>أضيف منذ 3 أيام</p>
                </div>
                <button className={styles.removeFavoriteBtn}>🗑️</button>
              </div>
              <div className={styles.favoriteCard}>
                <div className={styles.favoriteImageWrapper}>
                  <Image src="/images/apple-products.jpg" alt="Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.favoriteInfo}>
                  <h4>ساعة Apple Watch Series 9</h4>
                  <p className={styles.favoritePrice}>18,000 ج.م</p>
                  <p className={styles.favoriteDate}>أضيف منذ أسبوع</p>
                </div>
                <button className={styles.removeFavoriteBtn}>🗑️</button>
              </div>
              <div className={styles.favoriteCard}>
                <div className={styles.favoriteImageWrapper}>
                  <Image src="/images/lg-products.jpg" alt="Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.favoriteInfo}>
                  <h4>تلفزيون LG OLED 55 بوصة</h4>
                  <p className={styles.favoritePrice}>35,000 ج.م</p>
                  <p className={styles.favoriteDate}>أضيف منذ أسبوعين</p>
                </div>
                <button className={styles.removeFavoriteBtn}>🗑️</button>
              </div>
            </div>
            {/* Empty state example */}
            {/* <div className={styles.emptyFavorites}>
              <p>⭐ لا توجد منتجات مفضلة</p>
            </div> */}
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowNoteModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>إضافة ملاحظة جديدة</h3>
              <button className={styles.closeBtn} onClick={() => setShowNoteModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <textarea
                className={styles.textarea}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="اكتب ملاحظتك هنا..."
                rows={5}
              />
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleAddNote}>حفظ</button>
              <button className={styles.cancelBtn} onClick={() => setShowNoteModal(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
