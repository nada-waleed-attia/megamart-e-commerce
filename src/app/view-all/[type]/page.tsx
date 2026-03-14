"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '../../components/toast/toast-container';
import { useCart } from '../../components/cart/cart-context';
import Header from '../../components/header';
import Header2 from '../../components/header2';
import Header3 from '../../components/header3';
import Footer from '../../components/FOOTER/footer';
import styles from './view-all.module.css';
import slidesData from '../../components/DATA/slides.json';

const ViewAllPage = () => {
  const params = useParams();
  const type = params.type as string;
  const { showToast } = useToast();
  const { addToCart } = useCart();

  let items: any[] = [];
  let title = '';
  let description = '';
  let linkPrefix = '';

  switch (type) {
    case 'products':
      items = slidesData.products;
      title = 'All Products';
      description = 'Browse our complete collection of premium products';
      linkPrefix = '/products';
      break;
    case 'categories':
      items = slidesData.categories;
      title = 'All Categories';
      description = 'Browse through our wide range of product categories';
      linkPrefix = '/categories';
      break;
    case 'brands':
      items = slidesData.brands;
      title = 'All Brands';
      description = 'Shop from your favorite electronics brands';
      linkPrefix = '/brands';
      break;
    case 'essentials':
      items = slidesData.dailyEssentials;
      title = 'Daily Essentials';
      description = 'Fresh products for your everyday needs';
      linkPrefix = '/essentials';
      break;
    default:
      return (
        <div className={styles.notFound}>
          <h1>Page not found</h1>
          <Link href="/">Go back to home</Link>
        </div>
      );
  }

  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });

  const filteredAndSortedItems = items
    .filter(item => {
      if (!item.price) return true;
      return item.price >= priceRange.min && item.price <= priceRange.max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (item: any) => {
    if (item.price) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        discount: item.discount,
        savings: item.savings
      }, 1);
    }
    showToast(`${item.name} added to cart!`, 'success', 1000);
  };

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.productsPage}>
      <div className={styles.pageHeader}>
        <h1>{title}</h1>
        <p className={styles.pageDescription}>{description}</p>
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

        {type === 'products' && (
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
        )}
      </div>

      <div className={styles.productsGrid}>
        {filteredAndSortedItems.map(item => (
          <Link key={item.id} href={`${linkPrefix}/${item.id}`} className={styles.productCard}>
            <div className={styles.productImage}>
              <Image 
                src={item.image || item.logo} 
                alt={item.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {item.discount && (
                <div className={styles.discountBadge}>
                  -{typeof item.discount === 'number' ? item.discount : '50'}%
                </div>
              )}
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{item.name}</h3>

              {item.price && (
                <>
                  <div className={styles.priceSection}>
                    <div className={styles.priceContainer}>
                      <span className={styles.currentPrice}>
                        ₹{item.price.toLocaleString()}
                      </span>
                      <span className={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className={styles.savings}>
                    Save ₹{item.savings.toLocaleString()}
                  </div>
                </>
              )}

              {item.discount && !item.price && (
                <div className={styles.discountText}>
                  {item.discount}
                </div>
              )}

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(item);
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

      {filteredAndSortedItems.length === 0 && (
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

export default ViewAllPage;
