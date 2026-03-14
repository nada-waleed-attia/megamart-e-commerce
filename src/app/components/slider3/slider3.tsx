"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './slider3.module.css';
import slidesData from '../DATA/slides.json';
import { Category } from '../DATA/types';

const CategoriesSection = () => {
  const categories: Category[] = slidesData.categories;

  return (
    <div className={styles.mainContainer}>
      {/* Categories Section */}
      <div className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Shop From <span className={styles.highlight}>Top Categories</span>
          </h2>
          <Link 
          href="/view-all/categories"
          className={styles.viewAll}
        >
          View All <span>→</span>
        </Link>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`/categories/${category.id}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrapper}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={120}
                  height={120}
                  className={styles.categoryImage}
                />
              </div>
              <p className={styles.categoryName}>{category.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
