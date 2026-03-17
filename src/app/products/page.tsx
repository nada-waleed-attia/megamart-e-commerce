"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '../components/toast/toast-container';
import slidesData from '../components/DATA/slides.json';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import styles from './products.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice: number;
  discount: number;
  savings: number;
}

const ProductsPage = () => {
  const { showToast } = useToast();
  const products: Product[] = slidesData.products;

  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return b.discount - a.discount;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product: Product) => {
    showToast(`${product.name} added to cart!`, 'success', 1000);
  };

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.productsPage}>
      <div className={styles.pageHeader}>
        <h1>All Products</h1>
        <p className={styles.pageDescription}>
          Browse our complete collection of premium products
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
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Discount</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className={styles.priceInput}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className={styles.priceInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredAndSortedProducts.map(product => (
          <Link key={product.id} href={`/products/${product.id}`} className={styles.productCard}>
            <div className={styles.productImage}>
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {product.discount > 0 && (
                <div className={styles.discountBadge}>
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>

              <div className={styles.priceSection}>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    {product.price.toLocaleString()} ج.م
                  </span>
                  <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className={styles.savings}>
                وفر {product.savings.toLocaleString()} ج.م
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className={styles.addToCartBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className={styles.noProducts}>
          <h3>No Products Found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
