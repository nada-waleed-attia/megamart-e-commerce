import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

export function EmptyState({ 
  icon = '📭', 
  title, 
  description, 
  actionLabel, 
  actionLink 
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      {description && <p className={styles.emptyDescription}>{description}</p>}
      {actionLabel && actionLink && (
        <a href={actionLink} className={styles.emptyAction}>
          {actionLabel}
        </a>
      )}
    </div>
  );
}
