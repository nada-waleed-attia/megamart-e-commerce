"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import Link from 'next/link';
import Image from 'next/image';
import styles from './search.module.css';
import slidesData from '../components/DATA/slides.json';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search in products
  const searchResults = slidesData.products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <div className={styles.searchHeader}>
          <h1>Search Results</h1>
          {query && (
            <p className={styles.searchQuery}>
              Showing results for: <span>"{query}"</span>
            </p>
          )}
          <p className={styles.resultCount}>
            {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className={styles.productsGrid}>
            {searchResults.map(product => (
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
                <div className={styles.productInfo}>
                  <span className={styles.category}>{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className={styles.priceSection}>
                    <span className={styles.price}>{product.price.toLocaleString()} ج.م</span>
                    <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()} ج.م</span>
                  </div>
                  <p className={styles.savings}>وفر {product.savings.toLocaleString()} ج.م</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h2>No products found</h2>
            <p>Try searching with different keywords</p>
            <Link href="/shop" className={styles.browseBtn}>
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const SearchPage = () => {
  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
};

export default SearchPage;
