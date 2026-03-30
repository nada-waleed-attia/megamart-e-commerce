'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MdDashboard, 
  MdShoppingBag, 
  MdLocationOn, 
  MdFavorite, 
  MdPerson, 
  MdSettings, 
  MdLogout,
  MdMenu,
  MdClose
} from 'react-icons/md';
import styles from './dashboard.module.css';

const menuItems = [
  { icon: MdDashboard, label: 'نظرة عامة', href: '/dashboard/overview' },
  { icon: MdShoppingBag, label: 'طلباتي', href: '/dashboard/orders' },
  { icon: MdLocationOn, label: 'عناوين التوصيل', href: '/dashboard/addresses' },
  { icon: MdFavorite, label: 'المفضلة', href: '/dashboard/wishlist' },
  { icon: MdPerson, label: 'الملف الشخصي', href: '/dashboard/profile' },
  { icon: MdSettings, label: 'الإعدادات', href: '/dashboard/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Hide/show sidebar on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply hide/show behavior on mobile
      if (window.innerWidth <= 767) {
        // Close sidebar if open
        if (sidebarOpen) {
          setSidebarOpen(false);
        }
        
        // Hide/show sidebar based on scroll direction
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down - hide sidebar
          setSidebarVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - show sidebar
          setSidebarVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Menu Button */}
      <button 
        className={`${styles.mobileMenuBtn} ${!sidebarVisible ? styles.sidebarHidden : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>لوحة التحكم</h2>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button 
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            <MdLogout size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
