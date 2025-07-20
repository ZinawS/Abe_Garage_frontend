/**
 * Auth Utilities
 *
 * Provides helper functions for authentication and authorization
 */

/**
 * Parse JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token payload or null
 */
export const parseJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = (token) => {
  const decoded = parseJWT(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} Expiration date or null
 */
export const getTokenExpiration = (token) => {
  const decoded = parseJWT(token);
  if (!decoded || !decoded.exp) return null;
  return new Date(decoded.exp * 1000);
};

/**
 * Get time remaining until token expiration
 * @param {string} token - JWT token
 * @returns {number|null} Milliseconds remaining or null
 */
export const getTokenTimeRemaining = (token) => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return null;
  return expiration - Date.now();
};

/**
 * Check if user has role
 * @param {string[]} userRoles - User's roles
 * @param {string|string[]} requiredRoles - Required role(s)
 * @returns {boolean} True if user has required role
 */
export const hasRole = (userRoles = [], requiredRoles = []) => {
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }

  if (requiredRoles.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;

  return requiredRoles.some((role) => userRoles.includes(role));
};

/**
 * Get auth headers for API requests
 * @param {string} token - JWT token
 * @returns {Object} Headers object
 */
export const getAuthHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Store auth tokens in localStorage
 * @param {string} token - Access token
 * @param {string} refreshToken - Refresh token
 */
export const storeTokens = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

/**
 * Clear auth tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

/**
 * Get stored auth tokens
 * @returns {Object} Tokens object
 */
export const getStoredTokens = () => {
  return {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

/**
 * Check if user is authenticated
 * @param {string} token - JWT token
 * @returns {boolean} True if token exists and is not expired
 */
export const isAuthenticated = (token) => {
  return !!token && !isTokenExpired(token);
};
