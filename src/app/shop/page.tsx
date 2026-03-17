"use client";

import { useState } from 'react';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import Link from 'next/link';
import Image from 'next/image';
import styles from './shop.module.css';
import slidesData from '../components/DATA/slides.json';

const ShopPage = () => {
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories from products
  const categories = Array.from(new Set(slidesData.categories.map(cat => cat.name)));

  // Filter products
  const filteredProducts = slidesData.products
    .filter(product => {
      const priceMatch = product.price <= maxPrice;
      const discountMatch = product.discount >= minDiscount;
      
      // Category filter - if no categories selected, show all
      const categoryMatch = selectedCategories.length === 0 || 
                           (product.category && selectedCategories.includes(product.category));
      
      return priceMatch && discountMatch && categoryMatch;
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

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      
      <div className={styles.shopPage}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Shop by Category</h1>
          <p className={styles.pageDescription}>
            Browse through our wide range of products and categories
          </p>

          <div className={styles.mainContent}>
            {/* Filter Sidebar */}
            <aside className={styles.filterSidebar}>
              <div className={styles.filterSection}>
                <h3>Filters</h3>
                
                {/* Price Range Filter */}
                <div className={styles.filterGroup}>
                  <h4>Maximum Price</h4>
                  <div className={styles.discountSlider}>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className={styles.slider}
                    />
                    <div className={styles.discountLabel}>
                      {maxPrice.toLocaleString()} ج.م أو أقل
                    </div>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className={styles.filterGroup}>
                  <h4>Categories</h4>
                  <div className={styles.checkboxList}>
                    {categories.map(category => (
                      <label key={category} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Discount Filter */}
                <div className={styles.filterGroup}>
                  <h4>Minimum Discount</h4>
                  <div className={styles.discountSlider}>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      step="5"
                      value={minDiscount}
                      onChange={(e) => setMinDiscount(Number(e.target.value))}
                      className={styles.slider}
                    />
                    <div className={styles.discountLabel}>
                      {minDiscount}% or more
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div className={styles.filterGroup}>
                  <h4>Sort By</h4>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button 
                  className={styles.resetBtn}
                  onClick={() => {
                    setMaxPrice(200000);
                    setSelectedCategories([]);
                    setMinDiscount(0);
                    setSortBy('name');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className={styles.contentArea}>
              <div className={styles.categoriesGrid}>
                <Link href="/view-all/products" className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>📱</div>
                  <h3>All Products</h3>
                  <p>{slidesData.products.length} items</p>
                </Link>

                <Link href="/view-all/categories" className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>🏷️</div>
                  <h3>Categories</h3>
                  <p>{slidesData.categories.length} categories</p>
                </Link>

                <Link href="/view-all/brands" className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>⭐</div>
                  <h3>Brands</h3>
                  <p>{slidesData.brands.length} brands</p>
                </Link>

                <Link href="/view-all/essentials" className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>🛒</div>
                  <h3>Daily Essentials</h3>
                  <p>{slidesData.dailyEssentials.length} items</p>
                </Link>
              </div>

              <div className={styles.featuredSection}>
                <h2>Featured Products ({filteredProducts.length})</h2>
                <div className={styles.productsGrid}>
                  {filteredProducts.slice(0, 12).map(product => (
                    <Link key={product.id} href={`/products/${product.id}`} className={styles.productCard}>
                      <div className={styles.productImage}>
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className={styles.image}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {product.discount && (
                          <div className={styles.discountBadge}>-{product.discount}%</div>
                        )}
                      </div>
                      <h3>{product.name}</h3>
                      <p className={styles.price}>{product.price.toLocaleString()} ج.م</p>
                      <p className={styles.originalPrice}>{product.originalPrice.toLocaleString()} ج.م</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopPage;
