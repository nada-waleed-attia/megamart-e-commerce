"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/header';
import Header2 from '../../components/header2';
import Header3 from '../../components/header3';
import Footer from '../../components/FOOTER/footer';
import styles from './essential.module.css';
import slidesData from '../../components/DATA/slides.json';

const EssentialPage = () => {
  const params = useParams();
  const essentialId = Number(params.id);
  const [quantity, setQuantity] = useState(1);

  const essential = slidesData.dailyEssentials.find(item => item.id === essentialId);

  if (!essential) {
    return (
      <div className={styles.notFound}>
        <h1>Essential not found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} items of ${essential.name} to cart!`);
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
        <Link href="/">Home</Link> / <Link href="/">Daily Essentials</Link> / <span>{essential.name}</span>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imagesSection}>
          <div className={styles.mainImage}>
            <Image
              src={essential.image}
              alt={essential.name}
              width={500}
              height={500}
              className={styles.productImage}
            />
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{essential.name}</h1>
          
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★☆</span>
            <span className={styles.reviews}>(245 reviews)</span>
          </div>

          {essential.discount && (
            <div className={styles.discountBadge}>
              {essential.discount}
            </div>
          )}

          <div className={styles.description}>
            <h3>Product Description</h3>
            <p>
              Fresh and high-quality {essential.name.toLowerCase()} delivered right to your doorstep. 
              We source our daily essentials from trusted suppliers to ensure you get the best quality 
              products for your everyday needs.
            </p>
          </div>

          <div className={styles.features}>
            <h3>Why Choose Our Products</h3>
            <ul>
              <li>100% Fresh & Organic</li>
              <li>Farm to Home Delivery</li>
              <li>Quality Guaranteed</li>
              <li>Same Day Delivery Available</li>
              <li>Best Prices in Market</li>
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
      </div>
      <Footer />
    </>
  );
};

export default EssentialPage;
