'use client';

import Image from 'next/image';
import styles from './OrderItems.module.css';

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className={styles.itemsList}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.itemImage}>
            <Image 
              src={item.image} 
              alt={item.name}
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.itemInfo}>
            <h4>{item.name}</h4>
            <p>الكمية: {item.quantity}</p>
          </div>
          <div className={styles.itemPrice}>
            <span className={styles.price}>{item.total} جنيه</span>
            <span className={styles.unitPrice}>
              {item.price} جنيه × {item.quantity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
