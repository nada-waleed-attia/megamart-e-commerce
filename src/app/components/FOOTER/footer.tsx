"use client";

import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.container}>
          <div className={styles.column}>
            <h3 className={styles.brandName}>MegaMart</h3>
            <div className={styles.contactInfo}>
              <h4>Contact Us</h4>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📱</span>
                <span>Whats App<br />+1 202-918-2132</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                <span>Call Us<br />+1 202-918-2132</span>
              </div>
            </div>
            <div className={styles.downloadApp}>
              <h4>Download App</h4>
              <div className={styles.appButtons}>
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.appButton}
                >
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <rect width="120" height="40" rx="8" fill="#000000"/>
                    <path d="M24.769 20.301c-.047-3.225 2.633-4.782 2.752-4.854-1.497-2.19-3.829-2.49-4.662-2.523-1.986-.201-3.876 1.17-4.883 1.17-1.007 0-2.565-1.139-4.217-1.109-2.17.031-4.17 1.261-5.288 3.206-2.254 3.914-.576 9.713 1.62 12.89 1.074 1.555 2.355 3.301 4.036 3.239 1.62-.062 2.232-1.047 4.19-1.047 1.958 0 2.508 1.047 4.217 1.016 1.744-.031 2.87-1.561 3.944-3.116 1.243-1.8 1.755-3.539 1.786-3.632-.039-.016-3.426-1.315-3.495-5.24z" fill="white"/>
                    <path d="M22.037 12.211c.893-1.084 1.495-2.589 1.331-4.089-1.287.052-2.846.857-3.77 1.94-.828.958-1.553 2.489-1.358 3.958 1.436.112 2.904-.729 3.797-1.809z" fill="white"/>
                    <text x="40" y="15" fill="white" fontSize="10" fontFamily="Arial">Download on the</text>
                    <text x="40" y="28" fill="white" fontSize="14" fontFamily="Arial" fontWeight="bold">App Store</text>
                  </svg>
                </a>
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.appButton}
                >
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <rect width="120" height="40" rx="8" fill="#000000"/>
                    <path d="M13.5 7.5c-.3 0-.5.2-.5.5v24c0 .3.2.5.5.5.1 0 .2 0 .3-.1l13.5-12c.2-.2.2-.5 0-.7l-13.5-12c-.1-.1-.2-.2-.3-.2z" fill="url(#paint0_linear)"/>
                    <path d="M27.3 19.3l-3.6-3.6-10.2 9.1 13.5-5.2c.2-.1.3-.2.3-.3z" fill="url(#paint1_linear)"/>
                    <path d="M13.5 7.7l10.2 9.1 3.6-3.6-13.5-5.2c-.2-.1-.3 0-.3-.3z" fill="url(#paint2_linear)"/>
                    <path d="M13.5 32.3c.1 0 .2-.1.3-.2l13.5-12-3.6-3.6-10.2 9.1v6.7z" fill="url(#paint3_linear)"/>
                    <text x="40" y="15" fill="white" fontSize="9" fontFamily="Arial">GET IT ON</text>
                    <text x="40" y="28" fill="white" fontSize="14" fontFamily="Arial" fontWeight="bold">Google Play</text>
                    <defs>
                      <linearGradient id="paint0_linear" x1="13" y1="7.5" x2="27.5" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00D7FE"/>
                        <stop offset="1" stopColor="#0084FF"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="13.5" y1="24.8" x2="27.3" y2="19.3" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD800"/>
                        <stop offset="1" stopColor="#FF8A00"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear" x1="13.5" y1="7.7" x2="27.3" y2="13.2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3A44"/>
                        <stop offset="1" stopColor="#B11162"/>
                      </linearGradient>
                      <linearGradient id="paint3_linear" x1="13.5" y1="32.3" x2="27.3" y2="20.1" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00E676"/>
                        <stop offset="1" stopColor="#00C853"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Most Popular Categories</h4>
            <ul className={styles.linkList}>
              <li><a href="#">Staples</a></li>
              <li><a href="#">Beverages</a></li>
              <li><a href="#">Personal Care</a></li>
              <li><a href="#">Home Care</a></li>
              <li><a href="#">Baby Care</a></li>
              <li><a href="#">Vegetables & Fruits</a></li>
              <li><a href="#">Snacks & Foods</a></li>
              <li><a href="#">Dairy & Bakery</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Customer Services</h4>
            <ul className={styles.linkList}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">E-waste Policy</a></li>
              <li><a href="#">Cancellation & Return Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <p className={styles.copyright}>© 2022 All rights reserved. Reliance Retail Ltd.</p>
        </div>
      </div>

      <div className={styles.brandSection}>
        <div className={styles.brandLogo}>
          <span className={styles.megamartText}>MEGAMART</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
