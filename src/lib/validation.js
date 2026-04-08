/**
 * Validation utilities for forms and inputs
 */

// Email validation
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Password validation - at least 8 chars, 1 uppercase, 1 number
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

// Phone number validation - Pakistan format
export const isValidPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Support: +923001234567 or 03001234567 or 923001234567
  return /^(?:\+92|0)3\d{2}(?:\d{7}|\d{8})$|^92333\d{7}$/.test(phone.replace(/\s/g, ''));
};

// Postal code validation
export const isValidPostalCode = (code) => {
  if (!code) return true; // Optional field
  return /^[0-9]{5}$/.test(code.trim());
};

// Name validation
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  return /^[a-zA-Z\s'-]{2,}$/.test(name.trim());
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Address validation
export const isValidAddress = (address) => {
  if (!address || typeof address !== 'string') return false;
  return address.trim().length >= 5;
};

// Validate all field validations
export const validateCheckoutForm = (formData) => {
  const errors = {};

  if (!formData.firstName || !isValidName(formData.firstName)) {
    errors.firstName = 'Valid first name required';
  }

  if (!formData.lastName || !isValidName(formData.lastName)) {
    errors.lastName = 'Valid last name required';
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Valid email required';
  }

  if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
    errors.phone = 'Valid phone number required (Pakistan format)';
  }

  if (!formData.address || !isValidAddress(formData.address)) {
    errors.address = 'Valid address required (minimum 5 characters)';
  }

  if (!formData.city || formData.city.trim().length < 2) {
    errors.city = 'Valid city name required';
  }

  if (formData.postalCode && !isValidPostalCode(formData.postalCode)) {
    errors.postalCode = 'Valid 5-digit postal code required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize HTML input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove dangerous characters
    .slice(0, 200); // Limit length
};

// Format currency
export const formatCurrency = (amount, currency = 'PKR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+92 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  if (digits.length === 11) return `0${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  return phone;
};

// Debounce utility for form validation
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
