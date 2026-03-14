"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { MdShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaTractor } from "react-icons/fa6";
import React from "react";
import UserMenu from './auth/user-menu';
import { useCart } from './cart/cart-context';


const Header2 = () => {
  const { cartCount } = useCart();
  return (
    <>
    

    <header className="w-full bg-white shadow-md">
        <div className={`${styles.headertop2} flex justify-between items-center relative`}>
            {/* left section - categories */}
            <div className="flex-shrink-0">
                <span className={styles.welcometext2}>MegaMart</span>
            </div>
            <div className={`${styles.menubox} absolute left-4 top-1/2 transform -translate-y-1/2`}>
      <span className={styles.line1}></span>
      <span className={styles.line2}></span>
      <span className={styles.line3}></span>
    </div>
            {/* center section - search */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search essentials , groceries and more ..." 
                        className={`${styles.searchinput} pr-10`}
                    />
                    <CiSearch className={`${styles.headericon2} absolute left-25 top-1/2 transform -translate-y-1/2`} />
                </div>
                <button className="bg-foreground text-background px-8 py-11 rounded">
                </button>
                <div className={`${styles.menubox2} absolute left-1 top-1/2 transform -translate-y-1/2`}>
                   <span className={styles.line}></span>
                   <span className={styles.line}></span>
                   <span className={styles.line}></span>
                </div>
            </div>

            {/* right section - account & cart */}
            <div className={styles.deliverybar2}>
                <nav className={`${styles.navlinks2} flex justify-between items-center`}>                    <CiUser className={styles.headericon2} />                    <Link href="/signin" className="text-gray-600 hover:text-gray-800 text-sm">
                        Sign Up / Sign In
                        {/*<span className={styles.sapratore2}>|</span>*/}
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
                    <Link href="/cart" className="text-gray-600 hover:text-gray-200 text-sm">
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
