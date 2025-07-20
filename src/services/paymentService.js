import { API_ENDPOINTS } from '../config/api';
import api from './api';
/**
 * Payment Service
 * 
 * Handles all payment-related API calls
 */

export const paymentService = {
  /**
   * Get all payments
   * @param {string} token - Auth token
   * @param {Object} filters - Optional filters
   * @returns {Promise} Array of payments
   */
  getAllPayments: async (token, filters = {}) => {
    return api.get(API_ENDPOINTS.PAYMENTS, token, filters);
  },

  /**
   * Get payment by ID
   * @param {string} id - Payment ID
   * @param {string} token - Auth token
   * @returns {Promise} Payment object
   */
  getPaymentById: async (id, token) => {
    return api.get(`${API_ENDPOINTS.PAYMENTS}/${id}`, token);
  },

  /**
   * Record a payment
   * @param {Object} paymentData - Payment data
   * @param {string} token - Auth token
   * @returns {Promise} Recorded payment
   */
  recordPayment: async (paymentData, token) => {
    return api.post(API_ENDPOINTS.PAYMENTS, paymentData, token);
  },

  /**
   * Update a payment
   * @param {string} id - Payment ID
   * @param {Object} paymentData - Updated payment data
   * @param {string} token - Auth token
   * @returns {Promise} Updated payment
   */
  updatePayment: async (id, paymentData, token) => {
    return api.put(`${API_ENDPOINTS.PAYMENTS}/${id}`, paymentData, token);
  },

  /**
   * Delete a payment
   * @param {string} id - Payment ID
   * @param {string} token - Auth token
   * @returns {Promise} Success status
   */
  deletePayment: async (id, token) => {
    return api.del(`${API_ENDPOINTS.PAYMENTS}/${id}`, token);
  },

  /**
   * Process a payment
   * @param {string} id - Payment ID
   * @param {string} token - Auth token
   * @returns {Promise} Processed payment
   */
  processPayment: async (id, token) => {
    return api.post(`${API_ENDPOINTS.PAYMENTS}/${id}/process`, {}, token);
  },

  /**
   * Refund a payment
   * @param {string} id - Payment ID
   * @param {number} amount - Amount to refund
   * @param {string} token - Auth token
   * @returns {Promise} Refund details
   */
  refundPayment: async (id, amount, token) => {
    return api.post(`${API_ENDPOINTS.PAYMENTS}/${id}/refund`, { amount }, token);
  }
};
const paymentService = {
  getAllPayments: paymentService.getAllPayments,
  getPaymentById: paymentService.getPaymentById,
  recordPayment: paymentService.recordPayment,
  updatePayment: paymentService.updatePayment,
  deletePayment: paymentService.deletePayment,
  processPayment: paymentService.processPayment,
  refundPayment: paymentService.refundPayment,
};
export default paymentService;