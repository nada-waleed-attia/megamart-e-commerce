"use client";

import React from 'react';
import { useAuth } from '../components/auth/auth-context';
import styles from './account.module.css';

const AccountPage = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className={styles.accountContainer}>
        <div className={styles.notLoggedIn}>
          <h1>Please Sign In</h1>
          <p>You need to be logged in to view your account.</p>
          <a href="/signin" className={styles.signInBtn}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accountContainer}>
      <div className={styles.accountHeader}>
        <h1>My Account</h1>
        <p>Welcome back, {user?.email?.split('@')[0]}!</p>
      </div>

      <div className={styles.accountContent}>
        <div className={styles.accountSidebar}>
          <nav className={styles.accountNav}>
            <a href="/profile" className={styles.navItem}>
              Profile Information
            </a>
            <a href="/orders" className={styles.navItem}>
              Order History
            </a>
            <a href="/wishlist" className={styles.navItem}>
              Wishlist
            </a>
            <a href="/addresses" className={styles.navItem}>
              Addresses
            </a>
            <a href="/settings" className={styles.navItem}>
              Settings
            </a>
          </nav>
        </div>

        <div className={styles.accountMain}>
          <div className={styles.section}>
            <h2>Profile Information</h2>
            <div className={styles.profileCard}>
              <div className={styles.profileItem}>
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className={styles.profileItem}>
                <label>Member Since</label>
                <p>March 2024</p>
              </div>
              <div className={styles.profileItem}>
                <label>Account Status</label>
                <p className={styles.activeStatus}>Active</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Quick Actions</h2>
            <div className={styles.quickActions}>
              <a href="/cart" className={styles.actionBtn}>
                View Cart
              </a>
              <a href="/checkout" className={styles.actionBtn}>
                Checkout
              </a>
              <a href="/orders" className={styles.actionBtn}>
                Recent Orders
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
