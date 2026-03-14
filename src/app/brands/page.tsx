"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useToast } from '../components/toast/toast-container';
import styles from './brands.module.css';

interface Brand {
  id: number;
  name: string;
  logo: string;
  image: string;
  discount: string;
  bgColor: string;
  description: string;
  products: number;
  rating: number;
}

const BrandsPage = () => {
  const { showToast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 1,
      name: "Apple",
      logo: "/images/apple-logo.png",
      image: "/images/apple-products.jpg",
      discount: "Up to 20% OFF",
      bgColor: "#000000",
      description: "Premium electronics and innovative technology",
      products: 156,
      rating: 5
    },
    {
      id: 2,
      name: "Samsung",
      logo: "/images/samsung-logo.png",
      image: "/images/samsung-products.jpg",
      discount: "Up to 15% OFF",
      bgColor: "#1428A0",
      description: "Leading electronics and home appliances",
      products: 234,
      rating: 4
    },
    {
      id: 3,
      name: "Sony",
      logo: "/images/sony-logo.png",
      image: "/images/sony-products.jpg",
      discount: "Up to 25% OFF",
      bgColor: "#003087",
      description: "Entertainment and gaming solutions",
      products: 189,
      rating: 4
    },
    {
      id: 4,
      name: "LG",
      logo: "/images/lg-logo.png",
      image: "/images/lg-products.jpg",
      discount: "Up to 18% OFF",
      bgColor: "#A50034",
      description: "Home electronics and appliances",
      products: 167,
      rating: 4
    },
    {
      id: 5,
      name: "Nike",
      logo: "/images/nike-logo.png",
      image: "/images/nike-products.jpg",
      discount: "Up to 30% OFF",
      bgColor: "#111111",
      description: "Sports apparel and footwear",
      products: 298,
      rating: 5
    },
    {
      id: 6,
      name: "Adidas",
      logo: "/images/adidas-logo.png",
      image: "/images/adidas-products.jpg",
      discount: "Up to 22% OFF",
      bgColor: "#000000",
      description: "Sports and casual wear",
      products: 276,
      rating: 4
    }
  ]);

  const [sortBy, setSortBy] = useState('name');
  const [filterRating, setFilterRating] = useState('all');

  const filteredAndSortedBrands = brands
    .filter(brand => {
      const matchesRating = filterRating === 'all' || brand.rating >= Number(filterRating);
      return matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'products-low':
          return a.products - b.products;
        case 'products-high':
          return b.products - a.products;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleViewBrand = (brand: Brand) => {
    showToast(`Viewing ${brand.name} products`, 'info', 1000);
  };

  return (
    <div className={styles.brandsPage}>
      <div className={styles.pageHeader}>
        <h1>All Brands</h1>
        <p className={styles.pageDescription}>
          Discover our trusted brands with exclusive deals
        </p>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label>Sort By</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="name">Name</option>
            <option value="products-low">Products: Low to High</option>
            <option value="products-high">Products: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Minimum Rating</label>
          <select 
            value={filterRating} 
            onChange={(e) => setFilterRating(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Ratings</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars Only</option>
          </select>
        </div>
      </div>

      <div className={styles.brandsGrid}>
        {filteredAndSortedBrands.map(brand => (
          <div key={brand.id} className={styles.brandCard}>
            <div className={styles.brandHeader} style={{ backgroundColor: brand.bgColor }}>
              <div className={styles.brandLogo}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className={styles.logoImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.brandInfo}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.discount}>{brand.discount}</p>
              </div>
            </div>

            <div className={styles.brandContent}>
              <div className={styles.brandImageContainer}>
                <Image
                  src={brand.image}
                  alt={`${brand.name} products`}
                  fill
                  className={styles.brandImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className={styles.brandDetails}>
                <p className={styles.description}>{brand.description}</p>
                
                <div className={styles.brandStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Products</span>
                    <span className={styles.statValue}>{brand.products}</span>
                  </div>
                  
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < brand.rating ? styles.filled : ''}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={styles.ratingText}>({brand.rating}.0)</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleViewBrand(brand)}
                  className={styles.viewBrandBtn}
                >
                  View {brand.name} Products
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedBrands.length === 0 && (
        <div className={styles.noBrands}>
          <h3>No Brands Found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
