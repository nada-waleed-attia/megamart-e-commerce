'use client';

import styles from './WelcomeCard.module.css';

interface WelcomeCardProps {
  userName: string;
  message?: string;
}

export default function WelcomeCard({ userName, message = 'نتمنى لك تجربة تسوق ممتعة' }: WelcomeCardProps) {
  return (
    <div className={styles.welcomeCard}>
      <h1>مرحباً، {userName}! 👋</h1>
      <p>{message}</p>
    </div>
  );
}
