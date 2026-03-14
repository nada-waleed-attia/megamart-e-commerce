"use client";

import React, { useEffect, useState } from 'react';
import styles from './toast.module.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 1000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(`Toast mounted with duration: ${duration}ms`);
    
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      console.log('Timer triggered - hiding toast');
      setIsVisible(false);
      // Wait for exit animation before calling onClose
      setTimeout(() => {
        console.log('Calling onClose');
        onClose();
      }, 300);
    }, duration);

    return () => {
      console.log('Toast unmounted or effect cleaned up');
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.toastContent}>
        <div className={styles.toastIcon}>
          {getIcon()}
        </div>
        <span className={styles.toastMessage}>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
