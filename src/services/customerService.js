import api from "./api";

/**
 * Customer Service
 *
 * Handles all customer-related API calls including:
 * - Customer CRUD operations
 * - Vehicle management
 * - Service history
 */

/**
 * Get all customers
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of customers
 */
export const getCustomers = async (filters = {}) => {
  try {
    const response = await api.get("/customers", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
};

/**
 * Get customer by ID
 * @param {string} customerId - Customer ID
 * @returns {Promise<Object>} Customer details
 */
export const getCustomerById = async (customerId) => {
  try {
    const response = await api.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Create a new customer
 * @param {Object} customerData - Customer data
 * @returns {Promise<Object>} Created customer
 */
export const createCustomer = async (customerData) => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    console.error("Failed to create customer:", error);
    throw error;
  }
};

/**
 * Update customer
 * @param {string} customerId - Customer ID
 * @param {Object} customerData - Updated customer data
 * @returns {Promise<Object>} Updated customer
 */
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await api.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Delete customer
 * @param {string} customerId - Customer ID
 * @returns {Promise} Resolves when customer is deleted
 */
export const deleteCustomer = async (customerId) => {
  try {
    await api.delete(`/customers/${customerId}`);
  } catch (error) {
    console.error(`Failed to delete customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Get vehicles for a customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} Array of vehicles
 */
export const getCustomerVehicles = async (customerId) => {
  try {
    const response = await api.get(`/customers/${customerId}/vehicles`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch vehicles for customer ${customerId}:`,
      error
    );
    throw error;
  }
};

/**
 * Add vehicle to customer
 * @param {string} customerId - Customer ID
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created vehicle
 */
export const addCustomerVehicle = async (customerId, vehicleData) => {
  try {
    const response = await api.post(
      `/customers/${customerId}/vehicles`,
      vehicleData
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to add vehicle to customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Get service history for a customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} Array of service records
 */
export const getCustomerServiceHistory = async (customerId) => {
  try {
    const response = await api.get(`/customers/${customerId}/services`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch service history for customer ${customerId}:`,
      error
    );
    throw error;
  }
};

/**
 * Search customers by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching customers
 */
export const searchCustomers = async (query) => {
  try {
    const response = await api.get("/customers/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to search customers:", error);
    throw error;
  }
};

const customerService= {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerVehicles,
  addCustomerVehicle,
  getCustomerServiceHistory,
  searchCustomers,
};

export default customerService;