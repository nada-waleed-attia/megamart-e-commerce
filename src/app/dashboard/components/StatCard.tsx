'use client';

import { IconType } from 'react-icons';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  color: string;
}

export default function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div 
      className={styles.statCard}
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
      }}
    >
      <div className={styles.statIcon}>
        <Icon />
      </div>
      <div className={styles.statInfo}>
        <p className={styles.statLabel}>{label}</p>
        <h3 className={styles.statValue}>{value}</h3>
      </div>
    </div>
  );
}
