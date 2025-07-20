import {
  API_ENDPOINTS,
  API_DEFAULT_HEADERS,
  getAuthHeaders,
  handleResponse,
} from "../config/api";

/**
 * Generic API Service
 *
 * Provides reusable functions for making API requests
 */

/**
 * Makes a GET request to the specified endpoint
 * @param {string} endpoint - API endpoint
 * @param {string} token - Auth token
 * @param {Object} params - Query parameters
 * @returns {Promise} Resolves with response data
 */
export const get = async (endpoint, token, params = {}) => {
  const url = new URL(endpoint);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url, {
    method: "GET",
    headers: token ? getAuthHeaders(token) : API_DEFAULT_HEADERS,
  });

  return handleResponse(response);
};

/**
 * Makes a POST request to the specified endpoint
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @param {string} token - Auth token
 * @returns {Promise} Resolves with response data
 */
export const post = async (endpoint, data, token) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: token ? getAuthHeaders(token) : API_DEFAULT_HEADERS,
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

/**
 * Makes a PUT request to the specified endpoint
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @param {string} token - Auth token
 * @returns {Promise} Resolves with response data
 */
export const put = async (endpoint, data, token) => {
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: token ? getAuthHeaders(token) : API_DEFAULT_HEADERS,
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

/**
 * Makes a PATCH request to the specified endpoint
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @param {string} token - Auth token
 * @returns {Promise} Resolves with response data
 */
export const patch = async (endpoint, data, token) => {
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: token ? getAuthHeaders(token) : API_DEFAULT_HEADERS,
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

/**
 * Makes a DELETE request to the specified endpoint
 * @param {string} endpoint - API endpoint
 * @param {string} token - Auth token
 * @returns {Promise} Resolves with response data
 */
export const del = async (endpoint, token) => {
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: token ? getAuthHeaders(token) : API_DEFAULT_HEADERS,
  });

  return handleResponse(response);
};

/**
 * Optionally, group all API functions in an object for default export
 */
const api = {
  get,
  post,
  put,
  patch,
  del,
};

export default api;
