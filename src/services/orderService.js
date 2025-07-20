import api from "./api";

/**
 * Order Service
 *
 * Handles all order-related API calls including:
 * - Order creation and management
 * - Service tracking
 * - Time and materials recording
 */

/**
 * Get all orders
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of orders
 */
export const getOrders = async (filters = {}) => {
  try {
    const response = await api.get("/orders", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Failed to update order ${orderId} status:`, error);
    throw error;
  }
};

/**
 * Add service to order
 * @param {string} orderId - Order ID
 * @param {Object} serviceData - Service data
 * @returns {Promise<Object>} Updated order
 */
export const addServiceToOrder = async (orderId, serviceData) => {
  try {
    const response = await api.post(`/orders/${orderId}/services`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Failed to add service to order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Record time for a service
 * @param {string} orderId - Order ID
 * @param {string} serviceId - Service ID
 * @param {Object} timeData - Time tracking data
 * @returns {Promise<Object>} Updated service
 */
export const recordServiceTime = async (orderId, serviceId, timeData) => {
  try {
    const response = await api.post(
      `/orders/${orderId}/services/${serviceId}/time`,
      timeData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to record time for service ${serviceId} in order ${orderId}:`,
      error
    );
    throw error;
  }
};

/**
 * Add materials to a service
 * @param {string} orderId - Order ID
 * @param {string} serviceId - Service ID
 * @param {Array} materials - Array of materials
 * @returns {Promise<Object>} Updated service
 */
export const addMaterialsToService = async (orderId, serviceId, materials) => {
  try {
    const response = await api.post(
      `/orders/${orderId}/services/${serviceId}/materials`,
      { materials }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to add materials to service ${serviceId} in order ${orderId}:`,
      error
    );
    throw error;
  }
};

/**
 * Generate invoice for order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Generated invoice
 */
export const generateInvoiceForOrder = async (orderId) => {
  try {
    const response = await api.post(`/orders/${orderId}/invoice`);
    return response.data;
  } catch (error) {
    console.error(`Failed to generate invoice for order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Get orders for a specific customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} Array of orders
 */
export const getCustomerOrders = async (customerId) => {
  try {
    const response = await api.get(`/orders/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch orders for customer ${customerId}:`, error);
    throw error;
  }
};

const orderService = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  addServiceToOrder,
  recordServiceTime,
  addMaterialsToService,
  generateInvoiceForOrder,      
    getCustomerOrders,      
};
export default orderService;
