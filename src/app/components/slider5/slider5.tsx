"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './slider5.module.css';
import slidesData from '../DATA/slides.json';
import { DailyEssential } from '../DATA/types';

const DailyEssentials = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const products: DailyEssential[] = slidesData.dailyEssentials;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Daily <span className={styles.highlight}>Essentials</span>
        </h2>
        <Link 
          href="/view-all/essentials"
          className={styles.viewAll}
        >
          View All <span>→</span>
        </Link>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.slider} ref={sliderRef}>
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/essentials/${product.id}`}
              className={`${styles.productCard} ${index === 0 ? styles.firstCard : ''}`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.discount}>{product.discount}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyEssentials;
