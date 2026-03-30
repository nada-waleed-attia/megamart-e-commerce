'use client';

import Link from 'next/link';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  onAction 
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && (
        actionHref ? (
          <Link href={actionHref} className={styles.actionBtn}>
            {actionLabel}
          </Link>
        ) : (
          <button className={styles.actionBtn} onClick={onAction}>
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
