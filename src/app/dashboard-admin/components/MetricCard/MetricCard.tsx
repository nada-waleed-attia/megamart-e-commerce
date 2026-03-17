import React from 'react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
  bgColor: string;
  link: string;
  badge?: string | null;
}

export function MetricCard({ icon, label, value, color, bgColor, link, badge }: MetricCardProps) {
  return (
    <a
      href={link}
      className={styles.metricCard}
      style={{ borderRightColor: color }}
    >
      {badge && (
        <span className={styles.badge} style={{ backgroundColor: color }}>
          {badge}
        </span>
      )}
      <div
        className={styles.metricIcon}
        style={{ backgroundColor: bgColor, color: color }}
      >
        {icon}
      </div>
      <div className={styles.metricContent}>
        <p className={styles.metricLabel}>{label}</p>
        <h3 className={styles.metricValue}>{value}</h3>
      </div>
    </a>
  );
}
