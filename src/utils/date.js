/**
 * Date Utilities
 *
 * Provides helper functions for date manipulation and formatting
 */

/**
 * Format date as MM/DD/YYYY
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatShortDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US");
};

/**
 * Format date as Month Day, Year (e.g. January 1, 2023)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatLongDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format date and time
 * @param {Date} date - Date object
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get time from date
 * @param {Date} date - Date object
 * @returns {string} Time string (HH:MM AM/PM)
 */
export const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Add days to date
 * @param {Date} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get difference in days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const diffTime = Math.abs(new Date(date2) - new Date(date1));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format date as ISO string without time
 * @param {Date} date - Date object
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const toISODateString = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

/**
 * Parse ISO date string to local date
 * @param {string} dateString - ISO date string
 * @returns {Date} Local date object
 */
export const parseISODate = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};
