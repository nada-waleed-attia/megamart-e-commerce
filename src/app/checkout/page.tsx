"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../components/cart/cart-context';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import styles from './checkout.module.css';

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingSameAsShipping: true
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    customer: {
      email: string;
      firstName: string;
      lastName: string;
      address: string;
      apartment: string;
      city: string;
      postalCode: string;
      phone: string;
    };
    payment: {
      method: string;
      cardDetails: {
        number: string;
        name: string;
        expiry: string;
      } | null;
    };
    shipping: string;
    total: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate payment method
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        alert('Please fill in all card details.');
        return;
      }
    }
    
    try {
      // Simulate order processing
      const orderData = {
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone
        },
        payment: {
          method: paymentMethod,
          cardDetails: paymentMethod === 'card' ? {
            number: formData.cardNumber,
            name: formData.cardName,
            expiry: formData.expiryDate
          } : null
        },
        shipping: shippingMethod,
        total: total
      };
      
      console.log('Order placed:', orderData);
      
      // Set order details and show success message
      setOrderDetails(orderData);
      setShowSuccessMessage(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const subtotal = cartTotal;
  const shipping = shippingMethod === 'express' ? 100 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <div className={styles.checkoutContainer}>
      {/* Success Message Overlay */}
      {showSuccessMessage && orderDetails && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <div className={styles.orderSummary}>
              <div className={styles.summaryItem}>
                <span>Order Total:</span>
                <span className={styles.totalAmount}>${orderDetails.total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Payment Method:</span>
                <span>{orderDetails.payment.method === 'card' ? 'Credit Card' : orderDetails.payment.method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Shipping:</span>
                <span>{orderDetails.shipping === 'express' ? 'Express' : 'Standard'}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Email:</span>
                <span>{orderDetails.customer.email}</span>
              </div>
            </div>
            <p className={styles.confirmationText}>
              You will receive a confirmation email shortly with your order details.
            </p>
            <div className={styles.successActions}>
              <button 
                onClick={() => router.push('/')}
                className={styles.continueBtn}
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => router.push('/account')}
                className={styles.viewOrdersBtn}
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.checkoutHeader}>
        <h1>Checkout</h1>
        <div className={styles.progressSteps}>
          <div className={`${styles.step} ${styles.active}`}>1. Contact</div>
          <div className={`${styles.step} ${styles.active}`}>2. Shipping</div>
          <div className={`${styles.step} ${styles.active}`}>3. Payment</div>
        </div>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.checkoutForm}>
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className={styles.section}>
              <h2>Contact Information</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className={styles.section}>
              <h2>Shipping Address</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className={styles.section}>
              <h2>Shipping Method</h2>
              <div className={styles.shippingOptions}>
                <label className={styles.shippingOption}>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className={styles.shippingDetails}>
                    <span className={styles.shippingName}>Standard Shipping</span>
                    <span className={styles.shippingPrice}>$9.99</span>
                    <span className={styles.shippingTime}>5-7 business days</span>
                  </div>
                </label>
                
                <label className={styles.shippingOption}>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className={styles.shippingDetails}>
                    <span className={styles.shippingName}>Express Shipping</span>
                    <span className={styles.shippingPrice}>$24.99</span>
                    <span className={styles.shippingTime}>2-3 business days</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div className={styles.section}>
              <h2>Payment Information</h2>
              <div className={styles.paymentMethods}>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Credit Card</span>
                </label>
                
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>PayPal</span>
                </label>
                
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <>
                  <div className={styles.formGroup}>
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'cash' && (
                <div className={styles.cashOnDeliveryInfo}>
                  <h3>Cash on Delivery</h3>
                  <p>You'll pay the delivery person when your order arrives.</p>
                  <ul>
                    <li>Have the exact amount ready</li>
                    <li>Delivery time: 5-7 business days</li>
                    <li>You&apos;ll receive a confirmation call before delivery</li>
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className={styles.placeOrderBtn}>
              Place Order • ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill />
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    {item.discount && <p>-{item.discount}% OFF</p>}
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span>{(item.price * item.quantity).toLocaleString()} ج.م</span>
              </div>
            ))}
          </div>
          
          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{Math.round(total).toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
