'use client';

import styles from './OrderTimeline.module.css';

export interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
}

interface OrderTimelineProps {
  timeline: TimelineStep[];
}

export default function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className={styles.timeline}>
      {timeline.map((step, index) => (
        <div
          key={index}
          className={`${styles.timelineItem} ${
            step.completed ? styles.timelineItemCompleted : ''
          }`}
        >
          <div className={styles.timelineDot}></div>
          <div className={styles.timelineContent}>
            <h4>{step.status}</h4>
            <p>{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
