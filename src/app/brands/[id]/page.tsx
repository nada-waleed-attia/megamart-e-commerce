"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/header';
import Header2 from '../../components/header2';
import Header3 from '../../components/header3';
import Footer from '../../components/FOOTER/footer';
import styles from './brand.module.css';
import slidesData from '../../components/DATA/slides.json';

const BrandPage = () => {
  const params = useParams();
  const brandId = Number(params.id);
  const [quantity, setQuantity] = useState(1);

  const brand = slidesData.brands.find(b => b.id === brandId);

  if (!brand) {
    return (
      <div className={styles.notFound}>
        <h1>Brand not found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${brand.name} products to cart!`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link> / <Link href="/">Brands</Link> / <span>{brand.name}</span>
      </div>

      <div className={styles.productContainer}>
        {/* Images Section */}
        <div className={styles.imagesSection}>
          <div className={styles.mainImage} style={{ backgroundColor: brand.bgColor }}>
            <div className={styles.brandLogoWrapper}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={200}
                className={styles.brandLogo}
              />
            </div>
            <div className={styles.productImageWrapper}>
              <Image
                src={brand.image}
                alt={brand.name}
                width={300}
                height={350}
                className={styles.productImage}
              />
            </div>
            <div className={styles.discountBadge}>{brand.discount}</div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{brand.name}</h1>
          
          <div className={styles.priceSection}>
            <span className={styles.discountText}>{brand.discount}</span>
          </div>

          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviews}>(532 reviews)</span>
          </div>

          <div className={styles.description}>
            <h3>Brand Description</h3>
            <p>
              Discover the latest {brand.name} products with amazing discounts. 
              Premium quality electronics from one of the world's leading brands. 
              Get authentic products with official warranty.
            </p>
          </div>

          <div className={styles.features}>
            <h3>Brand Benefits</h3>
            <ul>
              <li>100% Authentic Products</li>
              <li>Official Brand Warranty</li>
              <li>Exclusive Deals & Offers</li>
              <li>Fast & Free Delivery</li>
              <li>Easy Returns within 30 days</li>
            </ul>
          </div>

          <div className={styles.quantitySection}>
            <label>Quantity:</label>
            <div className={styles.quantityControls}>
              <button onClick={decreaseQuantity} className={styles.quantityBtn}>-</button>
              <span className={styles.quantity}>{quantity}</span>
              <button onClick={increaseQuantity} className={styles.quantityBtn}>+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              Add to Cart
            </button>
            <Link href="/checkout" className={styles.buyNowBtn}>
              Buy Now
            </Link>
          </div>

          <div className={styles.availability}>
            <p>✓ In Stock</p>
            <p>✓ Free Delivery on orders above 500 ج.م</p>
            <p>✓ Cash on Delivery available</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrandPage;
