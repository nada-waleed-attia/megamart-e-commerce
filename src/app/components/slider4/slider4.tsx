"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './slider4.module.css';
import slidesData from '../DATA/slides.json';
import { Brand } from '../DATA/types';

const BrandsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const brands: Brand[] = slidesData.brands;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 400;
      const scrollAmount = cardWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const cardWidth = 400;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Top <span className={styles.highlight}>Electronics Brands</span>
        </h2>
        <Link 
          href="/view-all/brands"
          className={styles.viewAll}
        >
          View All <span>→</span>
        </Link>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.slider} ref={sliderRef}>
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={`/brands/${brand.id}`}
              className={styles.brandCard}
              style={{ backgroundColor: brand.bgColor }}
            >
              <div className={styles.brandTag}>{brand.name}</div>
              
              <div className={styles.brandContent}>
                <div className={styles.leftSection}>
                  <div className={styles.logoWrapper}>
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className={styles.brandLogo}
                    />
                  </div>
                  <p className={styles.discount}>{brand.discount}</p>
                </div>

                <div className={styles.rightSection}>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={180}
                    height={220}
                    className={styles.productImage}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {brands.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandsSlider;
