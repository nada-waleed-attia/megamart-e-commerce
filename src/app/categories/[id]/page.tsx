"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/header';
import Header2 from '../../components/header2';
import Header3 from '../../components/header3';
import Footer from '../../components/FOOTER/footer';
import styles from './category.module.css';
import slidesData from '../../components/DATA/slides.json';

const CategoryPage = () => {
  const params = useParams();
  const categoryId = Number(params.id);
  const [quantity, setQuantity] = useState(1);

  const category = slidesData.categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h1>Category not found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} items from ${category.name} to cart!`);
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
        <Link href="/">Home</Link> / <Link href="/">Categories</Link> / <span>{category.name}</span>
      </div>

      <div className={styles.productContainer}>
        {/* Images Section */}
        <div className={styles.imagesSection}>
          <div className={styles.mainImage}>
            <Image
              src={category.image}
              alt={category.name}
              width={500}
              height={500}
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{category.name}</h1>
          
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★☆</span>
            <span className={styles.reviews}>(189 reviews)</span>
          </div>

          <div className={styles.description}>
            <h3>Category Description</h3>
            <p>
              Explore our wide range of {category.name.toLowerCase()} products. 
              High-quality items carefully selected for you. Get the best deals and 
              premium quality products in this category.
            </p>
          </div>

          <div className={styles.features}>
            <h3>Why Choose This Category</h3>
            <ul>
              <li>Premium Quality Products</li>
              <li>Best Price Guarantee</li>
              <li>Fast & Free Delivery</li>
              <li>Easy Returns & Exchange</li>
              <li>Verified Sellers</li>
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
            <p>✓ Free Delivery on orders above ₹500</p>
            <p>✓ Cash on Delivery available</p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
