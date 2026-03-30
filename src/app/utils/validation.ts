// Validation utilities for the application

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  password?: boolean;
  confirmPassword?: string;
  custom?: (value: string) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class Validator {
  static validate(value: string, rules: ValidationRule, fieldName: string = ''): string | null {
    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return `${fieldName || 'This field'} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return null;
    }

    const trimmedValue = value.trim();

    // Length validations
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return `${fieldName || 'This field'} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return `${fieldName || 'This field'} must not exceed ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      return `${fieldName || 'This field'} format is invalid`;
    }

    // Email validation
    if (rules.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmedValue)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation (Saudi Arabia)
    if (rules.phone) {
      const phonePattern = /^(\+966|0)?5[0-9]{8}$/;
      if (!phonePattern.test(trimmedValue.replace(/\s/g, ''))) {
        return 'Please enter a valid Saudi phone number';
      }
    }

    // URL validation
    if (rules.url) {
      try {
        new URL(trimmedValue);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    // Password validation
    if (rules.password) {
      if (trimmedValue.length < 8) {
        return 'Password must be at least 8 characters';
      }
      if (!/(?=.*[a-z])/.test(trimmedValue)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(trimmedValue)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(trimmedValue)) {
        return 'Password must contain at least one number';
      }
      if (!/(?=.*[!@#$%^&*])/.test(trimmedValue)) {
        return 'Password must contain at least one special character';
      }
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(trimmedValue);
    }

    return null;
  }

  static validateForm(data: Record<string, string>, rules: Record<string, ValidationRule>): ValidationResult {
    const errors: Record<string, string> = {};

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = data[fieldName] || '';
      const error = this.validate(value, fieldRules, fieldName);
      if (error) {
        errors[fieldName] = error;
      }
    }

    // Confirm password validation
    if (rules.confirmPassword && data.password && data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Sanitize input to prevent XSS
  static sanitize(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  }

  // Validate Saudi ID
  static validateSaudiId(id: string): string | null {
    const sanitizedId = this.sanitize(id);
    
    if (!sanitizedId) {
      return 'Saudi ID is required';
    }

    // Check if it's exactly 10 digits
    if (!/^\d{10}$/.test(sanitizedId)) {
      return 'Saudi ID must be exactly 10 digits';
    }

    // Check if it doesn't start with 0
    if (sanitizedId.startsWith('0')) {
      return 'Saudi ID cannot start with 0';
    }

    return null;
  }

  // Validate credit card number
  static validateCreditCard(cardNumber: string): string | null {
    const sanitizedCard = this.sanitize(cardNumber).replace(/\s/g, '');
    
    if (!sanitizedCard) {
      return 'Card number is required';
    }

    // Check if it's all digits and between 13-19 digits
    if (!/^\d{13,19}$/.test(sanitizedCard)) {
      return 'Invalid card number';
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = sanitizedCard.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedCard[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      return 'Invalid card number';
    }

    return null;
  }

  // Validate CVV
  static validateCVV(cvv: string): string | null {
    const sanitizedCvv = this.sanitize(cvv);
    
    if (!sanitizedCvv) {
      return 'CVV is required';
    }

    if (!/^\d{3,4}$/.test(sanitizedCvv)) {
      return 'CVV must be 3 or 4 digits';
    }

    return null;
  }

  // Validate expiry date
  static validateExpiryDate(expiry: string): string | null {
    const sanitizedExpiry = this.sanitize(expiry);
    
    if (!sanitizedExpiry) {
      return 'Expiry date is required';
    }

    // Check format MM/YY
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(sanitizedExpiry)) {
      return 'Expiry date must be in MM/YY format';
    }

    const [month, year] = sanitizedExpiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
    
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return 'Card has expired';
    }

    return null;
  }
}

// Predefined validation rules
export const ValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 255
  } as ValidationRule,

  password: {
    required: true,
    password: true,
    minLength: 8,
    maxLength: 128
  } as ValidationRule,

  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/
  } as ValidationRule,

  phone: {
    required: true,
    phone: true
  } as ValidationRule,

  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  } as ValidationRule,

  subject: {
    required: true,
    minLength: 3,
    maxLength: 100
  } as ValidationRule,

  saudiId: {
    required: true,
    pattern: /^\d{10}$/,
    custom: (value: string) => {
      if (value.startsWith('0')) {
        return 'Saudi ID cannot start with 0';
      }
      return null;
    }
  } as ValidationRule,

  creditCard: {
    required: true,
    custom: (value: string) => Validator.validateCreditCard(value)
  } as ValidationRule,

  cvv: {
    required: true,
    custom: (value: string) => Validator.validateCVV(value)
  } as ValidationRule,

  expiryDate: {
    required: true,
    custom: (value: string) => Validator.validateExpiryDate(value)
  } as ValidationRule
};
