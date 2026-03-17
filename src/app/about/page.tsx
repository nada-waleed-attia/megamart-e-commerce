"use client";

import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import styles from './about.module.css';

const AboutPage = () => {
  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      
      <div className={styles.aboutPage}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>About MegaMart</h1>
            <p className={styles.subtitle}>Your trusted online shopping destination</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Who We Are</h2>
              <p>
                MegaMart is your one-stop destination for all your shopping needs. We offer a wide range of products 
                from electronics to daily essentials, all at competitive prices with the convenience of online shopping.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide customers with a seamless shopping experience, offering quality products, 
                competitive prices, and exceptional customer service. We strive to make online shopping easy, 
                convenient, and enjoyable for everyone.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Why Choose Us</h2>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🚚</div>
                  <h3>Fast Delivery</h3>
                  <p>Quick and reliable delivery to your doorstep</p>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>💳</div>
                  <h3>Secure Payment</h3>
                  <p>Safe and secure payment options</p>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🎁</div>
                  <h3>Best Prices</h3>
                  <p>Competitive prices and great deals</p>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>⭐</div>
                  <h3>Quality Products</h3>
                  <p>Authentic products from trusted brands</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Our Values</h2>
              <ul className={styles.valuesList}>
                <li>Customer satisfaction is our top priority</li>
                <li>Quality and authenticity in every product</li>
                <li>Transparent and honest business practices</li>
                <li>Continuous improvement and innovation</li>
                <li>Building long-term relationships with our customers</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
