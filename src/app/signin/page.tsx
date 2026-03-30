"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/auth/auth-context';
import { Validator, ValidationRules, type ValidationRule } from '../utils/validation';
import Image from 'next/image';
import styles from './signin.module.css';

const LoginPage = () => {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = Validator.sanitize(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
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
      email: ValidationRules.email,
      password: ValidationRules.password
    };

    if (!isLogin) {
      rules.firstName = ValidationRules.name;
      rules.lastName = ValidationRules.name;
      rules.confirmPassword = {
        required: true,
        minLength: 8,
        maxLength: 128
      } as ValidationRule;
    }

    const result = Validator.validateForm(formData, rules);
    
    // Additional check for confirm password
    if (!isLogin && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        result.errors.confirmPassword = 'Passwords do not match';
      }
    }

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
      if (isLogin) {
        await login(formData.email, formData.password);
        alert('Login successful!');
        router.push('/');
      } else {
        await register(formData);
        alert('Registration successful!');
        router.push('/account');
      }
    } catch (error) {
      // TODO: Add proper error logging service
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "
            }
            <button 
              type="button" 
              onClick={toggleMode}
              className={styles.toggleBtn}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {!isLogin && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? styles.error : ''}
                  required
                />
                {errors.firstName && (
                  <span className={styles.errorMsg}>{errors.firstName}</span>
                )}
              </div>
              
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? styles.error : ''}
                  required
                />
                {errors.lastName && (
                  <span className={styles.errorMsg}>{errors.lastName}</span>
                )}
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? styles.error : ''}
              placeholder="you@example.com"
              required
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? styles.error : ''}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <span className={styles.errorMsg}>{errors.password}</span>
            )}
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? styles.error : ''}
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <span className={styles.errorMsg}>{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
