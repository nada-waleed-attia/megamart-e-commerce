import React from 'react';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: string;
  color?: string;
  variant?: 'solid' | 'outline';
}

export default function StatusBadge({ status, color = '#667eea', variant = 'solid' }: StatusBadgeProps) {
  return (
    <span 
      className={`${styles.badge} ${variant === 'outline' ? styles.outline : styles.solid}`}
      style={
        variant === 'solid' 
          ? { backgroundColor: color, color: 'white' }
          : { borderColor: color, color: color }
      }
    >
      {status}
    </span>
  );
}
