"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { MdShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from './auth/user-menu';
import { useCart } from './cart/cart-context';


const Header2 = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <>
    

    <header className="w-full bg-white shadow-md">
        <div className={`${styles.headertop2} flex justify-between items-center`}>
            {/* Menu Button */}
            <div 
              className={styles.menubox}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={styles.line1}></span>
              <span className={styles.line2}></span>
              <span className={styles.line3}></span>
            </div>

            {/* Brand Name - Desktop Only */}
            <div className="flex-shrink-0 hidden md:block">
                <span className={styles.welcometext2}>MegaMart</span>
            </div>

            {/* Slide Menu Overlay */}
            {isMenuOpen && (
              <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)} />
            )}

            {/* Slide Menu */}
            <div className={`${styles.slideMenu} ${isMenuOpen ? styles.slideMenuOpen : ''}`}>
              <div className={styles.slideMenuHeader}>
                <h2>Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} className={styles.closeBtn}>
                  ✕
                </button>
              </div>

              <div className={styles.slideMenuContent}>
                <div className={styles.menuGroup}>
                  <h3>Pages</h3>
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
                  <Link href="/shop" onClick={() => setIsMenuOpen(false)}>🛍️ Shop</Link>
                  <Link href="/about" onClick={() => setIsMenuOpen(false)}>ℹ️ About Us</Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>📧 Contact Us</Link>
                </div>

                <div className={styles.menuGroup}>
                  <h3>Categories</h3>
                  <Link href="/view-all/categories" onClick={() => setIsMenuOpen(false)}>📱 Mobile</Link>
                  <Link href="/view-all/categories" onClick={() => setIsMenuOpen(false)}>💄 Cosmetics</Link>
                  <Link href="/view-all/categories" onClick={() => setIsMenuOpen(false)}>⚡ Electronics</Link>
                </div>

                <div className={styles.menuGroup}>
                  <h3>Shop</h3>
                  <Link href="/view-all/products" onClick={() => setIsMenuOpen(false)}>🛒 All Products</Link>
                  <Link href="/view-all/brands" onClick={() => setIsMenuOpen(false)}>⭐ Brands</Link>
                  <Link href="/view-all/essentials" onClick={() => setIsMenuOpen(false)}>🥗 Daily Essentials</Link>
                </div>

                <div className={styles.menuGroup}>
                  <h3>Account</h3>
                  <Link href="/account" onClick={() => setIsMenuOpen(false)}>👤 My Account</Link>
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>🛒 Cart</Link>
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>🔐 Sign In</Link>
                </div>
              </div>
            </div>

            {/* Search - Center */}
            <div className="flex-1 flex items-center justify-center px-2 md:px-4">
                <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
                    <input 
                        type="text"
                        placeholder="Search essentials, groceries and more..." 
                        className={styles.searchinput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <CiSearch className={styles.headericon2} />
                    </button>
                </form>
            </div>

            {/* Account & Cart - Right */}
            <div className={styles.deliverybar2}>
                <nav className={`${styles.navlinks2} flex items-center`}>
                    <CiUser className={styles.headericon2} />
                    <Link href="/signin" className="text-gray-600 hover:text-gray-800 text-sm hidden md:inline">
                        Sign Up / Sign In
                    </Link>
                    <UserMenu />
                    <div className={styles.cartIconWrapper}>
                      <MdShoppingCart className={styles.headericon2}/>
                      {cartCount > 0 && (
                        <span className={styles.cartBadge}>
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <Link href="/cart" className="text-gray-600 hover:text-gray-800 text-sm hidden md:inline">
                        Cart
                    </Link>
                </nav>
            </div>
        </div>
    </header>
    <div className="w-full h-0.25 bg-black"></div>
</>
  );
};

export default Header2;
