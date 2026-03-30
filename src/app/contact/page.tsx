"use client";

import { useState } from 'react';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Footer from '../components/FOOTER/footer';
import { useToast } from '../components/toast/toast-container';
import { Validator, ValidationRules, type ValidationRule } from '../utils/validation';
import styles from './contact.module.css';

const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = Validator.sanitize(value);
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const rules: Record<string, ValidationRule> = {
      name: ValidationRules.name,
      email: ValidationRules.email,
      subject: ValidationRules.subject,
      message: ValidationRules.message
    };

    const result = Validator.validateForm(formData, rules);
    setErrors(result.errors);
    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Message sent successfully! We will get back to you soon.', 'success', 3000);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      // TODO: Add proper error logging service
      showToast('Failed to send message. Please try again.', 'error', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      
      <div className={styles.contactPage}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Contact Us</h1>
            <p className={styles.subtitle}>We&apos;d love to hear from you</p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <p>Have questions? We&apos;re here to help!</p>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📧</div>
                <div>
                  <h3>Email</h3>
                  <p>support@megamart.com</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 1800-123-4567</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Shopping Street, Mumbai, India</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🕐</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.error : ''}
                    required
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className={styles.errorMsg}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                    required
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className={styles.errorMsg}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? styles.error : ''}
                    required
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <span className={styles.errorMsg}>{errors.subject}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? styles.error : ''}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <span className={styles.errorMsg}>{errors.message}</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
