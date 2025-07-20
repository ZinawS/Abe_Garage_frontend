/**
 * API Configuration
 *
 * Centralized configuration for API endpoints and settings
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Define default headers
export const API_DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  CUSTOMERS: `${API_BASE_URL}/customers`,
  EMPLOYEES: `${API_BASE_URL}/employees`,
  VEHICLES: `${API_BASE_URL}/vehicles`,
  SERVICES: `${API_BASE_URL}/services`,
  INVENTORY: `${API_BASE_URL}/inventory`,
  ORDERS: `${API_BASE_URL}/orders`,
  INVOICES: `${API_BASE_URL}/invoices`,
  PAYMENTS: `${API_BASE_URL}/payments`,
  REPORTS: `${API_BASE_URL}/reports`,
  NOTIFICATIONS: `${API_BASE_URL}/notifications`,
  SOCKET: import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
};

/**
 * Helper function to add authorization header
 * @param {string} token - Auth token
 * @returns {Object} Headers with authorization
 */
export const getAuthHeaders = (token) => ({
  ...API_DEFAULT_HEADERS,
  Authorization: `Bearer ${token}`,
});

/**
 * Helper function to handle API responses
 * @param {Response} response - Fetch response object
 * @returns {Promise} Parsed response data or error
 */
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};
