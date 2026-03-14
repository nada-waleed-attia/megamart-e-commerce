"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '../../components/toast/toast-container';
import { useCart } from '../../components/cart/cart-context';
import Header from '../../components/header';
import Header2 from '../../components/header2';
import Header3 from '../../components/header3';
import Footer from '../../components/FOOTER/footer';
import styles from './page.module.css';

// Import slides data directly
const slidesData = require('../../components/DATA/slides.json');

const ProductDetailPage = () => {
  const params = useParams();
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const productId = Number(params.id);
  
  const productData = slidesData.products.find((p: any) => p.id === productId);

  if (!productData) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1>Product not found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  const product = {
    ...productData,
    category: "Electronics",
    rating: 4,
    description: `Premium quality ${productData.name} with amazing features and specifications. Perfect for your daily needs and professional use. Made with high-quality materials and designed to last.`,
    stock: 50,
    features: [
      "Premium Quality Materials",
      "Advanced Technology",
      "User-Friendly Design",
      "Energy Efficient",
      "Warranty Included"
    ],
    specifications: {
      "Brand": "Premium Brand",
      "Model": productData.name,
      "Weight": "1.5 kg",
      "Dimensions": "30 x 20 x 10 cm",
      "Warranty": "2 Years",
      "Color": "Multiple Options"
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      discount: product.discount,
      savings: product.savings
    }, quantity);
    showToast(`${product.name} added to cart! (${quantity}x)`, 'success', 1000);
  };

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.productDetailPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.discount && (
                <div className={styles.discountBadge}>
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? styles.filled : ''}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.ratingText}>({product.rating}.0) • {Math.floor(Math.random() * 100) + 50} reviews</span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
              </div>
              <div className={styles.savings}>
                Save ₹{product.savings.toLocaleString()}
              </div>
            </div>

            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.features}>
              <h3>Key Features</h3>
              <ul>
                {product.features?.map((feature, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.specifications}>
              <h3>Specifications</h3>
              <div className={styles.specGrid}>
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specLabel}>{key}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.purchaseSection}>
              <div className={styles.stockInfo}>
                {product.stock !== undefined && product.stock > 0 ? (
                  <span className={styles.inStock}>✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className={styles.outOfStock}>✗ Out of Stock</span>
                )}
              </div>

              <div className={styles.quantitySelector}>
                <label>Quantity:</label>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className={styles.quantityInput}
                    min="1"
                    max={product.stock || 1}
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button 
                  onClick={handleAddToCart}
                  className={styles.addToCartBtn}
                  disabled={!product.stock || product.stock === 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Add to Cart
                </button>
                
                <Link 
                  href="/checkout"
                  className={styles.buyNowBtn}
                >
                  Buy Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
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

export default ProductDetailPage;
