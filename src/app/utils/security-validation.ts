import { Validator } from './validation';

export class SecurityValidator {
  // XSS Prevention
  static sanitizeForXSS(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, '') // Remove vbscript: protocol
      .replace(/file:/gi, '') // Remove file: protocol
      .replace(/ftp:/gi, '') // Remove ftp: protocol
      .trim();
  }

  // SQL Injection Prevention
  static sanitizeForSQL(input: string): string {
    return input
      .replace(/['"\\]/g, '') // Remove quotes and backslashes
      .replace(/--/g, '') // Remove SQL comments
      .replace(/;/g, '') // Remove semicolons
      .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/gi, '') // Remove SQL keywords
      .trim();
  }

  // CSRF Token Validation
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return !!(token && sessionToken && token === sessionToken);
  }

  // Rate Limiting Validation
  static validateRateLimit(identifier: string, maxAttempts: number, windowMs: number): boolean {
    const attempts = this.getRateLimitAttempts(identifier);
    const now = Date.now();
    
    // Clear old attempts
    const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.setRateLimitAttempts(identifier, validAttempts);
    
    return true;
  }

  private static getRateLimitAttempts(identifier: string): number[] {
    const key = `rate_limit_${identifier}`;
    const attempts = localStorage.getItem(key);
    return attempts ? JSON.parse(attempts) : [];
  }

  private static setRateLimitAttempts(identifier: string, attempts: number[]): void {
    const key = `rate_limit_${identifier}`;
    localStorage.setItem(key, JSON.stringify(attempts));
  }

  // Input Length Validation
  static validateInputLength(input: string, minLength: number, maxLength: number): boolean {
    const length = input.trim().length;
    return length >= minLength && length <= maxLength;
  }

  // File Upload Validation
  static validateFileUpload(file: File, allowedTypes: string[], maxSize: number): { isValid: boolean; error?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file type'
      };
    }

    // Check file size
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size too large'
      };
    }

    // Check file name for suspicious patterns
    const suspiciousPatterns = [
      /\.(exe|bat|cmd|scr|pif|com)$/i,
      /\.(php|asp|jsp|cgi|pl|py|rb|sh)$/i,
      /\.(htaccess|htpasswd|webconfig)$/i
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(file.name)) {
        return {
          isValid: false,
          error: 'Suspicious file name'
        };
      }
    }

    return { isValid: true };
  }

  // Password Strength Validation
  static validatePasswordStrength(password: string): { isValid: boolean; score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password should be at least 8 characters');
    }

    // Uppercase letter
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    // Lowercase letter
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    // Numbers
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    // Special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    // Common patterns check
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /letmein/i
    ];

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        score -= 1;
        feedback.push('Avoid common patterns');
        break;
      }
    }

    return {
      isValid: score >= 4,
      score: Math.max(0, Math.min(5, score)),
      feedback
    };
  }

  // Email Security Validation
  static validateEmailSecurity(email: string): { isValid: boolean; error?: string } {
    const sanitizedEmail = this.sanitizeForXSS(email.trim().toLowerCase());

    // Basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return {
        isValid: false,
        error: 'Invalid email format'
      };
    }

    // Check for suspicious domains
    const suspiciousDomains = [
      'tempmail.com',
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com'
    ];

    const domain = sanitizedEmail.split('@')[1];
    if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
      return {
        isValid: false,
        error: 'Temporary email addresses are not allowed'
      };
    }

    // Check for disposable email patterns
    const disposablePatterns = [
      /\b(temp|disposable|throwaway|temporary)\b/i,
      /\b(10min|guerrilla|mailinator)\b/i
    ];

    for (const pattern of disposablePatterns) {
      if (pattern.test(sanitizedEmail)) {
        return {
          isValid: false,
          error: 'Disposable email addresses are not allowed'
        };
      }
    }

    return { isValid: true };
  }

  // Phone Number Security Validation
  static validatePhoneSecurity(phone: string): { isValid: boolean; error?: string } {
    const sanitizedPhone = this.sanitizeForXSS(phone.trim());

    // Remove all non-digit characters
    const digitsOnly = sanitizedPhone.replace(/\D/g, '');

    // Check length (Saudi numbers: 9 digits)
    if (digitsOnly.length !== 9) {
      return {
        isValid: false,
        error: 'Invalid phone number length'
      };
    }

    // Check if it starts with 5 (Saudi mobile numbers)
    if (!digitsOnly.startsWith('5')) {
      return {
        isValid: false,
        error: 'Invalid Saudi mobile number'
      };
    }

    return { isValid: true };
  }

  // URL Security Validation
  static validateURLSecurity(url: string): { isValid: boolean; error?: string } {
    const sanitizedURL = this.sanitizeForXSS(url.trim());

    try {
      const parsedURL = new URL(sanitizedURL);

      // Only allow HTTP and HTTPS protocols
      if (!['http:', 'https:'].includes(parsedURL.protocol)) {
        return {
          isValid: false,
          error: 'Invalid URL protocol'
        };
      }

      // Check for suspicious domains
      const suspiciousDomains = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '::1'
      ];

      if (suspiciousDomains.includes(parsedURL.hostname)) {
        return {
          isValid: false,
          error: 'Invalid URL hostname'
        };
      }

      return { isValid: true };
    } catch {
      return {
        isValid: false,
        error: 'Invalid URL format'
      };
    }
  }

  // Content Security Policy Validation
  static validateCSP(input: string): boolean {
    const cspViolations = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<link/i,
      /<meta/i
    ];

    return !cspViolations.some(pattern => pattern.test(input));
  }

  // Input Sanitizer (comprehensive)
  static sanitizeInput(input: string, type: 'text' | 'email' | 'phone' | 'url' | 'html' = 'text'): string {
    let sanitized = input.trim();

    switch (type) {
      case 'email':
        sanitized = sanitized.toLowerCase();
        break;
      case 'phone':
        sanitized = sanitized.replace(/\D/g, '');
        break;
      case 'url':
        try {
          const url = new URL(sanitized);
          sanitized = url.toString();
        } catch {
          sanitized = '';
        }
        break;
      case 'html':
        sanitized = this.sanitizeForXSS(sanitized);
        break;
      default:
        sanitized = this.sanitizeForXSS(sanitized);
    }

    return sanitized;
  }

  // Session Validation
  static validateSession(session: any): boolean {
    if (!session || typeof session !== 'object') {
      return false;
    }

    // Check required session fields
    const requiredFields = ['userId', 'token', 'expiresAt'];
    for (const field of requiredFields) {
      if (!session[field]) {
        return false;
      }
    }

    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      return false;
    }

    return true;
  }

  // Permission Validation
  static validatePermission(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      'admin': 3,
      'manager': 2,
      'user': 1,
      'guest': 0
    };

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  }
}

// Security Headers Utility
export class SecurityHeaders {
  static getHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'",
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };
  }
}
