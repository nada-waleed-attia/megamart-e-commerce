"use client";

import React from 'react';
import Image from 'next/image';
import { useToast } from './toast/toast-container';
import styles from './product-card.module.css';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  discount
}) => {
  const { showToast } = useToast();

  const handleAddToCart = () => {
    // Simulate adding to cart
    console.log(`Added ${name} to cart`);
    
    // Show success toast
    showToast(`${name} added to cart successfully!`, 'success', 1000);
    
    // You can also add actual cart logic here
    // const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    // cartItems.push({ id, name, price, image, quantity: 1 });
    // localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <Image 
          src={image} 
          alt={name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {discount && (
          <div className={styles.discountBadge}>
            -{discount}%
          </div>
        )}
        
        {category && (
          <div className={styles.categoryBadge}>
            {category}
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        
        {rating && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? styles.filled : ''}>
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingText}>({rating}.0)</span>
          </div>
        )}

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
            {discount && (
              <span className={styles.originalPrice}>${price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
