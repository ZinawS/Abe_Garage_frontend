/**
 * Formatters
 *
 * Provides helper functions for formatting various data types
 */

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "USD") => {
  if (isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Format phone number
 * @param {string} phone - Phone number string
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if the number looks like a US phone number
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return original if formatting doesn't apply
  return phone;
};

/**
 * Format vehicle make and model
 * @param {string} make - Vehicle make
 * @param {string} model - Vehicle model
 * @param {number} year - Vehicle year
 * @returns {string} Formatted vehicle string
 */
export const formatVehicle = (make, model, year) => {
  return `${year} ${make} ${model}`;
};

/**
 * Format name (first and last)
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Formatted name
 */
export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format mileage
 * @param {number} miles - Mileage number
 * @returns {string} Formatted mileage string
 */
export const formatMileage = (miles) => {
  if (isNaN(miles)) return "0 mi";
  return `${miles.toLocaleString()} mi`;
};

/**
 * Format hours to HH:MM
 * @param {number} hours - Decimal hours (e.g. 1.5)
 * @returns {string} Formatted time string (e.g. "1h 30m")
 */
export const formatHours = (hours) => {
  if (isNaN(hours)) return "0h";
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  let result = "";
  if (wholeHours > 0) result += `${wholeHours}h`;
  if (minutes > 0) result += ` ${minutes}m`;

  return result.trim() || "0h";
};

/**
 * Format percentage
 * @param {number} value - Percentage value (0-100)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (isNaN(value)) return "0%";
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format VIN (Vehicle Identification Number)
 * @param {string} vin - VIN string
 * @returns {string} Formatted VIN
 */
export const formatVIN = (vin) => {
  if (!vin) return "";
  return vin.length > 10 ? `${vin.substring(0, 4)}...${vin.slice(-4)}` : vin;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // or "long" for full month name
    day: "2-digit",
  });
};
