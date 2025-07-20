/**
 * Time Utilities
 *
 * Provides helper functions for time calculations and formatting
 */

/**
 * Format seconds as HH:MM:SS
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds)) return "00:00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

/**
 * Format milliseconds as MM:SS
 * @param {number} milliseconds - Total milliseconds
 * @returns {string} Formatted time string
 */
export const formatMinutesSeconds = (milliseconds) => {
  if (isNaN(milliseconds)) return "00:00";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Calculate time difference in hours
 * @param {Date} start - Start time
 * @param {Date} end - End time
 * @returns {number} Difference in hours
 */
export const getHoursDifference = (start, end) => {
  if (!start || !end) return 0;
  const diffMs = new Date(end) - new Date(start);
  return diffMs / (1000 * 60 * 60);
};

/**
 * Calculate time difference in minutes
 * @param {Date} start - Start time
 * @param {Date} end - End time
 * @returns {number} Difference in minutes
 */
export const getMinutesDifference = (start, end) => {
  if (!start || !end) return 0;
  const diffMs = new Date(end) - new Date(start);
  return diffMs / (1000 * 60);
};

/**
 * Add hours to a date
 * @param {Date} date - Base date
 * @param {number} hours - Hours to add
 * @returns {Date} New date
 */
export const addHours = (date, hours) => {
  const result = new Date(date);
  result.setTime(result.getTime() + hours * 60 * 60 * 1000);
  return result;
};

/**
 * Check if time is between two times (ignoring date)
 * @param {Date} time - Time to check
 * @param {Date} start - Start time
 * @param {Date} end - End time
 * @returns {boolean} True if time is between start and end
 */
export const isTimeBetween = (time, start, end) => {
  if (!time || !start || !end) return false;

  const timeMs =
    time.getHours() * 3600000 +
    time.getMinutes() * 60000 +
    time.getSeconds() * 1000;
  const startMs =
    start.getHours() * 3600000 +
    start.getMinutes() * 60000 +
    start.getSeconds() * 1000;
  const endMs =
    end.getHours() * 3600000 +
    end.getMinutes() * 60000 +
    end.getSeconds() * 1000;

  if (startMs < endMs) {
    return timeMs >= startMs && timeMs <= endMs;
  } else {
    return timeMs >= startMs || timeMs <= endMs;
  }
};

/**
 * Get current time in seconds since midnight
 * @returns {number} Seconds since midnight
 */
export const getCurrentTimeInSeconds = () => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};

/**
 * Format time duration (e.g. "2 hours 30 minutes")
 * @param {number} minutes - Total minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (isNaN(minutes)) return "0 minutes";

  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  let result = [];
  if (hours > 0) result.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (mins > 0) result.push(`${mins} minute${mins !== 1 ? "s" : ""}`);

  return result.join(" ") || "0 minutes";
};

/**
 * Convert seconds to hours with decimal
 * @param {number} seconds - Total seconds
 * @param {number} decimals - Number of decimal places
 * @returns {number} Hours with decimal
 */
export const secondsToHours = (seconds, decimals = 2) => {
  if (isNaN(seconds)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((seconds / 3600) * factor) / factor;
};
