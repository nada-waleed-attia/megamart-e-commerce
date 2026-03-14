"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../components/cart/cart-context';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import styles from './cart.module.css';

const CartPage = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button 
                onClick={() => router.push('/')}
                className={styles.continueShoppingBtn}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className={styles.productImage}
                  />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  {item.discount && (
                    <p className={styles.discount}>-{item.discount}% OFF</p>
                  )}
                  <p className={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                  {item.originalPrice && (
                    <p className={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</p>
                  )}
                </div>

                <div className={styles.itemQuantity}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Tax (18%)</span>
              <span>₹{Math.round(tax).toLocaleString()}</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>₹{Math.round(total).toLocaleString()}</span>
            </div>

            <input 
              type="text" 
              placeholder="Promo code"
              className={styles.promoInput}
            />
            
            <button 
              onClick={() => router.push('/checkout')}
              className={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => router.push('/')}
              className={styles.continueShoppingBtn}
            >
              Continue Shopping
            </button>

            {shipping === 0 && (
              <p className={styles.freeShippingMsg}>
                🎉 You qualify for free shipping!
              </p>
            )}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
