"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';
import { 
  MdDashboard, 
  MdPeople, 
  MdEmail, 
  MdInventory, 
  MdShoppingCart, 
  MdPalette, 
  MdSettings,
  MdNotifications,
  MdMenu,
  MdClose
} from 'react-icons/md';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  subItems?: { label: string; path: string }[];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('الإعدادات'); // فتح قائمة الإعدادات افتراضياً

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const menuItems: MenuItem[] = [
    { icon: <MdDashboard size={20} />, label: 'الرئيسية', path: '/dashboard-admin/dashboard' },
    { 
      icon: <MdPeople size={20} />, 
      label: 'العملاء',
      subItems: [
        { label: 'إدارة العملاء', path: '/dashboard-admin/customers' },
        { label: 'تفاصيل العميل', path: '/dashboard-admin/customers/1' },
      ]
    },
    { icon: <MdEmail size={20} />, label: 'القائمة البريدية', path: '/dashboard-admin/email-list' },
    { 
      icon: <MdInventory size={20} />, 
      label: 'إدارة المنتجات',
      subItems: [
        { label: 'نظرة عامة', path: '/dashboard-admin/products' },
        { label: 'الأقسام الرئيسية', path: '/dashboard-admin/categories' },
        { label: 'الأقسام الفرعية', path: '/dashboard-admin/sub-categories' },
        { label: 'المنتجات', path: '/dashboard-admin/products/all' },
      ]
    },
    { icon: <MdShoppingCart size={20} />, label: 'الطلبات', path: '/dashboard-admin/orders' },
    { icon: <MdPalette size={20} />, label: 'التحكم في الواجهة', path: '/dashboard-admin/store-interface' },
    { icon: <MdInventory size={20} />, label: 'المحتوى الثابت', path: '/dashboard-admin/pages' },
    { 
      icon: <MdSettings size={20} />, 
      label: 'الإعدادات',
      subItems: [
        { label: 'الإعدادات العامة', path: '/dashboard-admin/general-settings' },
        { label: 'إعدادات الواجهة', path: '/dashboard-admin/settings' },
        { label: 'المستخدمون', path: '/dashboard-admin/users' },
      ]
    },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isActive = (item: MenuItem) => {
    if (item.path) {
      return pathname === item.path;
    }
    if (item.subItems) {
      return item.subItems.some(sub => pathname.startsWith(sub.path.split('/').slice(0, -1).join('/')));
    }
    return false;
  };

  return (
    <div className={styles.adminLayout}>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileSidebarOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>
            {isSidebarCollapsed ? 'MM' : 'MegaMart Admin'}
          </h2>
          <button
            className={`${styles.collapseBtn} ${styles.desktopOnly}`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
          <button
            className={`${styles.collapseBtn} ${styles.mobileOnly}`}
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <MdClose size={24} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.path ? (
                // عنصر عادي بدون قائمة فرعية
                <Link
                  href={item.path}
                  className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {!isSidebarCollapsed && <span className={styles.navLabel}>{item.label}</span>}
                </Link>
              ) : (
                // عنصر مع قائمة فرعية
                <>
                  <button
                    className={`${styles.navItem} ${isActive(item) ? styles.active : ''}`}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    {!isSidebarCollapsed && (
                      <>
                        <span className={styles.navLabel}>{item.label}</span>
                        <span className={styles.submenuArrow}>
                          {openSubmenu === item.label ? '▼' : '◀'}
                        </span>
                      </>
                    )}
                  </button>
                  {!isSidebarCollapsed && openSubmenu === item.label && item.subItems && (
                    <div className={styles.submenu}>
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`${styles.submenuItem} ${pathname === subItem.path ? styles.active : ''}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MdMenu size={24} />
            </button>
            <h1 className={styles.pageTitle}>
              {menuItems.find(item => item.path === pathname)?.label || 'لوحة التحكم'}
            </h1>
          </div>

          <div className={styles.topbarRight}>
            <button className={styles.notificationBtn} aria-label="Notifications">
              <MdNotifications size={20} />
              <span className={styles.badge}>3</span>
            </button>

            <div className={styles.userMenu}>
              <div className={styles.userAvatar}>A</div>
              <span className={`${styles.userName} ${styles.desktopOnly}`}>Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
