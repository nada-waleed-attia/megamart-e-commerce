"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/auth/auth-context';
import styles from './signout.module.css';

const SignoutPage = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn, router]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 1500));
      logout();
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.signoutContainer}>
        <div className={styles.redirecting}>
          <div className={styles.spinner}></div>
          <p>Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.signoutContainer}>
      <div className={styles.signoutCard}>
        <div className={styles.signoutHeader}>
          <div className={styles.iconContainer}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1>Sign Out</h1>
          <p>Are you sure you want to sign out?</p>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <span>{user?.email?.charAt(0).toUpperCase()}</span>
          </div>
          <div className={styles.userDetails}>
            <h3>{user?.email}</h3>
            <p>Member since March 2024</p>
          </div>
        </div>

        <div className={styles.signoutActions}>
          <button 
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className={styles.signoutBtn}
          >
            {isLoggingOut ? (
              <>
                <span className={styles.btnSpinner}></span>
                Signing Out...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </>
            )}
          </button>
          
          <button 
            onClick={handleCancel}
            disabled={isLoggingOut}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>

        <div className={styles.signoutInfo}>
          <h4>Before you go...</h4>
          <ul>
            <li>Your shopping cart will be saved</li>
            <li>Your wishlist items remain intact</li>
            <li>You can sign back in anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignoutPage;
