import { API_ENDPOINTS} from '../config/api';
import api from "./api";
/**
 * Billing Service
 * 
 * Handles all billing-related API calls (invoices, payments, etc.)
 */

const billingService = {
  /**
   * Get all invoices
   * @param {string} token - Auth token
   * @param {Object} filters - Optional filters
   * @returns {Promise} Array of invoices
   */
  getAllInvoices: async (token, filters = {}) => {
    return api.get(API_ENDPOINTS.INVOICES, token, filters);
  },

  /**
   * Get invoice by ID
   * @param {string} id - Invoice ID
   * @param {string} token - Auth token
   * @returns {Promise} Invoice object
   */
  getInvoiceById: async (id, token) => {
    return api.get(`${API_ENDPOINTS.INVOICES}/${id}`, token);
  },

  /**
   * Create a new invoice
   * @param {Object} invoiceData - Invoice data
   * @param {string} token - Auth token
   * @returns {Promise} Created invoice
   */
  createInvoice: async (invoiceData, token) => {
    return api.post(API_ENDPOINTS.INVOICES, invoiceData, token);
  },

  /**
   * Update an invoice
   * @param {string} id - Invoice ID
   * @param {Object} invoiceData - Updated invoice data
   * @param {string} token - Auth token
   * @returns {Promise} Updated invoice
   */
  updateInvoice: async (id, invoiceData, token) => {
    return api.put(`${API_ENDPOINTS.INVOICES}/${id}`, invoiceData, token);
  },

  /**
   * Delete an invoice
   * @param {string} id - Invoice ID
   * @param {string} token - Auth token
   * @returns {Promise} Success status
   */
  deleteInvoice: async (id, token) => {
    return api.del(`${API_ENDPOINTS.INVOICES}/${id}`, token);
  },

  /**
   * Send an invoice to customer
   * @param {string} id - Invoice ID
   * @param {string} token - Auth token
   * @returns {Promise} Updated invoice
   */
  sendInvoice: async (id, token) => {
    return api.post(`${API_ENDPOINTS.INVOICES}/${id}/send`, {}, token);
  },

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
  }
};

export default billingService;