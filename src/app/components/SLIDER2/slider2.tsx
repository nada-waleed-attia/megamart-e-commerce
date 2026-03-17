"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './slider2.module.css';
import slidesData from '../DATA/slides.json';
import { Product } from '../DATA/types';

const ProductSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const products: Product[] = slidesData.products;

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
          Grab the best deal on <span className={styles.highlight}>Smartwatches</span>
        </h2>
        <Link href="/view-all/products" className={styles.viewAll}>
          View All <span>→</span>
        </Link>
      </div>

      <div className={styles.sliderWrapper}>
        <Link 
          href="#" 
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={(e) => {
            e.preventDefault();
            scroll('left');
          }}
        >
          ‹
        </Link>

        <div className={styles.slider} ref={sliderRef}>
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className={styles.productCard}>
              <div className={styles.discountBadge}>
                {product.discount}%<br />OFF
              </div>
              
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{product.price.toLocaleString()} ج.م</span>
                  <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()} ج.م</span>
                </div>
                <p className={styles.savings}>وفر {product.savings.toLocaleString()} ج.م</p>
              </div>
            </Link>
          ))}
        </div>

        <Link 
          href="#" 
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={(e) => {
            e.preventDefault();
            scroll('right');
          }}
        >
          ›
        </Link>
      </div>
    </div>
  );
};

export default ProductSlider;
