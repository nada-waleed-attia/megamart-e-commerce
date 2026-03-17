import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonHeader}>
        <Skeleton width="60px" height="60px" borderRadius="12px" />
        <div className={styles.skeletonContent}>
          <Skeleton width="120px" height="16px" />
          <Skeleton width="80px" height="24px" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonActivityCard() {
  return (
    <div className={styles.skeletonActivityCard}>
      <div className={styles.skeletonActivityHeader}>
        <Skeleton width="150px" height="20px" />
        <Skeleton width="60px" height="16px" />
      </div>
      <div className={styles.skeletonActivityBody}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.skeletonActivityItem}>
            <Skeleton width="40px" height="40px" borderRadius="8px" />
            <div className={styles.skeletonActivityContent}>
              <Skeleton width="150px" height="16px" />
              <Skeleton width="100px" height="14px" />
            </div>
            <Skeleton width="50px" height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
}
