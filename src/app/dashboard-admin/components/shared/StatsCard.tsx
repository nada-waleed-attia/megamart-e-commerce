import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ value, label, icon, color = '#667eea', trend }: StatsCardProps) {
  return (
    <div className={styles.card}>
      {icon && (
        <div className={styles.icon} style={{ backgroundColor: color }}>
          {icon}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.value} style={{ color }}>{value}</div>
        <div className={styles.label}>{label}</div>
        {trend && (
          <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}
