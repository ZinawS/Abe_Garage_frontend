/**
 * Validators
 *
 * Provides validation functions for form inputs and data
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(phone);
};

/**
 * Validate VIN (Vehicle Identification Number)
 * @param {string} vin - VIN to validate
 * @returns {boolean} True if VIN is valid
 */
export const validateVIN = (vin) => {
  if (!vin || vin.length !== 17) return false;
  const re = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return re.test(vin);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and messages
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    messages: [],
  };

  if (!password || password.length < 8) {
    result.isValid = false;
    result.messages.push("Password must be at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    result.isValid = false;
    result.messages.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    result.isValid = false;
    result.messages.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    result.isValid = false;
    result.messages.push("Password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    result.isValid = false;
    result.messages.push(
      "Password must contain at least one special character"
    );
  }

  return result;
};

/**
 * Validate date is in the future
 * @param {Date} date - Date to validate
 * @returns {boolean} True if date is in the future
 */
export const validateFutureDate = (date) => {
  if (!date) return false;
  return new Date(date) > new Date();
};

/**
 * Validate date is in the past
 * @param {Date} date - Date to validate
 * @returns {boolean} True if date is in the past
 */
export const validatePastDate = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Validate number is positive
 * @param {number} value - Number to validate
 * @returns {boolean} True if number is positive
 */
export const validatePositiveNumber = (value) => {
  return !isNaN(value) && value >= 0;
};

/**
 * Validate number is within range
 * @param {number} value - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if number is within range
 */
export const validateNumberRange = (value, min, max) => {
  return !isNaN(value) && value >= min && value <= max;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} True if value is not empty
 */
export const validateRequired = (value) => {
  return !!value && value.toString().trim().length > 0;
};

/**
 * Validate credit card number
 * @param {string} cardNumber - Credit card number
 * @returns {boolean} True if credit card number is valid
 */
export const validateCreditCard = (cardNumber) => {
  // Remove all non-digit characters
  const cleaned = cardNumber.replace(/\D/g, "");

  // Check if the number looks like a credit card number
  const match = cleaned.match(
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/
  );
  return !!match;
};

/**
 * Validate CVV code
 * @param {string} cvv - CVV code
 * @returns {boolean} True if CVV is valid
 */
export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

/**
 * Validate expiration date (MM/YY or MM/YYYY)
 * @param {string} expDate - Expiration date
 * @returns {boolean} True if expiration date is valid and in the future
 */
export const validateExpirationDate = (expDate) => {
  if (!expDate) return false;

  // Check format
  const match = expDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
  if (!match) return false;

  // Get current date
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Parse expiration date
  let expMonth = parseInt(match[1], 10);
  let expYear = parseInt(match[2], 10);

  // Convert 2-digit year to 4-digit
  if (expYear < 100) {
    expYear += 2000;
  }

  // Check if expiration date is in the future
  if (expYear > currentYear) {
    return true;
  } else if (expYear === currentYear && expMonth >= currentMonth) {
    return true;
  }

  return false;
};
