import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ApiValidator {
  // Validate API response structure
  static validateApiResponse(data: any, expectedFields: string[]): ValidationResult {
    const errors: Record<string, string> = {};

    expectedFields.forEach(field => {
      if (!(field in data)) {
        errors[field] = `Missing required field: ${field}`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate product data
  static validateProductData(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.name || typeof data.name !== 'string') {
      errors.name = 'Product name is required and must be a string';
    }

    if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
      errors.price = 'Product price is required and must be a positive number';
    }

    if (!data.image || typeof data.image !== 'string') {
      errors.image = 'Product image URL is required';
    }

    if (data.discount && (typeof data.discount !== 'number' || data.discount < 0 || data.discount > 100)) {
      errors.discount = 'Discount must be a number between 0 and 100';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate user data
  static validateUserData(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.email || typeof data.email !== 'string') {
      errors.email = 'Email is required and must be a string';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.firstName || typeof data.firstName !== 'string') {
      errors.firstName = 'First name is required and must be a string';
    }

    if (!data.lastName || typeof data.lastName !== 'string') {
      errors.lastName = 'Last name is required and must be a string';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate order data
  static validateOrderData(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      errors.items = 'Order must contain at least one item';
    }

    if (data.items) {
      data.items.forEach((item: any, index: number) => {
        if (!item.id || typeof item.id !== 'number') {
          errors[`items.${index}.id`] = 'Item ID is required and must be a number';
        }
        if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
          errors[`items.${index}.quantity`] = 'Item quantity is required and must be a positive number';
        }
      });
    }

    if (!data.total || typeof data.total !== 'number' || data.total <= 0) {
      errors.total = 'Order total is required and must be a positive number';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export class ErrorHandler {
  // Handle API errors
  static handleApiError(error: any): ApiError {
    if (error instanceof AxiosError) {
      const apiError: ApiError = {
        message: 'An error occurred',
        status: error.response?.status
      };

      // Handle different HTTP status codes
      switch (error.response?.status) {
        case 400:
          apiError.message = 'Invalid request data';
          apiError.code = 'BAD_REQUEST';
          break;
        case 401:
          apiError.message = 'Authentication required';
          apiError.code = 'UNAUTHORIZED';
          break;
        case 403:
          apiError.message = 'Access denied';
          apiError.code = 'FORBIDDEN';
          break;
        case 404:
          apiError.message = 'Resource not found';
          apiError.code = 'NOT_FOUND';
          break;
        case 422:
          apiError.message = 'Validation failed';
          apiError.code = 'VALIDATION_ERROR';
          apiError.details = error.response?.data?.errors || {};
          break;
        case 429:
          apiError.message = 'Too many requests';
          apiError.code = 'RATE_LIMIT';
          break;
        case 500:
          apiError.message = 'Server error';
          apiError.code = 'SERVER_ERROR';
          break;
        default:
          apiError.message = error.response?.data?.message || 'Unknown error occurred';
          apiError.code = 'UNKNOWN_ERROR';
      }

      return apiError;
    }

    // Handle network errors
    if (error.code === 'NETWORK_ERROR') {
      return {
        message: 'Network connection failed',
        code: 'NETWORK_ERROR'
      };
    }

    // Handle timeout errors
    if (error.code === 'TIMEOUT') {
      return {
        message: 'Request timeout',
        code: 'TIMEOUT'
      };
    }

    // Handle other errors
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }

  // Log errors for debugging
  static logError(error: ApiError, context?: string) {
    // In production, this would send to a logging service
    const logData = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        code: error.code,
        status: error.status,
        details: error.details
      },
      context: context || 'Unknown',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: typeof window !== 'undefined' ? window.location.href : 'Server'
    };

    // TODO: Replace with actual logging service
    console.error('API Error:', logData);
  }

  // Get user-friendly error message
  static getUserFriendlyMessage(error: ApiError): string {
    const messages: Record<string, string> = {
      'BAD_REQUEST': 'Please check your input and try again',
      'UNAUTHORIZED': 'Please log in to continue',
      'FORBIDDEN': 'You do not have permission to perform this action',
      'NOT_FOUND': 'The requested resource was not found',
      'VALIDATION_ERROR': 'Please correct the errors and try again',
      'RATE_LIMIT': 'Please wait before trying again',
      'SERVER_ERROR': 'Something went wrong. Please try again later',
      'NETWORK_ERROR': 'Please check your internet connection',
      'TIMEOUT': 'Request took too long. Please try again',
      'UNKNOWN_ERROR': 'An unexpected error occurred'
    };

    return messages[error.code || 'UNKNOWN_ERROR'] || error.message;
  }
}

// Rate limiting utility
export class RateLimiter {
  private static requests = new Map<string, { count: number; resetTime: number }>();

  static checkLimit(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record || now > record.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  static getRemainingRequests(key: string, maxRequests: number): number {
    const record = this.requests.get(key);
    if (!record || Date.now() > record.resetTime) {
      return maxRequests;
    }
    return Math.max(0, maxRequests - record.count);
  }

  static getResetTime(key: string): number {
    const record = this.requests.get(key);
    return record ? record.resetTime : Date.now();
  }
}

// Request validation middleware
export class RequestValidator {
  static validateHeaders(headers: Record<string, string>): ValidationResult {
    const errors: Record<string, string> = {};

    // Check for required headers
    if (!headers['content-type']) {
      errors['content-type'] = 'Content-Type header is required';
    }

    // Validate content type
    if (headers['content-type'] && !['application/json', 'multipart/form-data'].includes(headers['content-type'])) {
      errors['content-type'] = 'Invalid Content-Type';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static validateRequestBody(body: any, schema: any): ValidationResult {
    const errors: Record<string, string> = {};

    // Basic validation
    if (!body || typeof body !== 'object') {
      errors.body = 'Request body is required and must be an object';
      return {
        isValid: false,
        errors
      };
    }

    // Schema validation would go here
    // For now, just check if it's not empty
    if (Object.keys(body).length === 0) {
      errors.body = 'Request body cannot be empty';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}
