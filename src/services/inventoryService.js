import { API_ENDPOINTS } from "../config/api";
import api from "./api";

/**
 * Inventory Service
 *
 * Handles all inventory-related API calls
 */

const inventoryService = {
  /**
   * Get all inventory items
   * @param {string} token - Auth token
   * @returns {Promise} Array of inventory items
   */
  getAllInventory: async (token) => {
    return api.get(API_ENDPOINTS.INVENTORY, token);
  },

  /**
   * Get inventory item by ID
   * @param {string} id - Item ID
   * @param {string} token - Auth token
   * @returns {Promise} Inventory item object
   */
  getInventoryItemById: async (id, token) => {
    return api.get(`${API_ENDPOINTS.INVENTORY}/${id}`, token);
  },

  /**
   * Create a new inventory item
   * @param {Object} itemData - Item data
   * @param {string} token - Auth token
   * @returns {Promise} Created item
   */
  createInventoryItem: async (itemData, token) => {
    return api.post(API_ENDPOINTS.INVENTORY, itemData, token);
  },

  /**
   * Update an inventory item
   * @param {string} id - Item ID
   * @param {Object} itemData - Updated item data
   * @param {string} token - Auth token
   * @returns {Promise} Updated item
   */
  updateInventoryItem: async (id, itemData, token) => {
    return api.put(`${API_ENDPOINTS.INVENTORY}/${id}`, itemData, token);
  },

  /**
   * Delete an inventory item
   * @param {string} id - Item ID
   * @param {string} token - Auth token
   * @returns {Promise} Success status
   */
  deleteInventoryItem: async (id, token) => {
    return api.del(`${API_ENDPOINTS.INVENTORY}/${id}`, token);
  },

  /**
   * Restock an inventory item
   * @param {string} id - Item ID
   * @param {number} quantity - Quantity to add
   * @param {string} token - Auth token
   * @returns {Promise} Updated item
   */
  restockInventoryItem: async (id, quantity, token) => {
    return api.patch(
      `${API_ENDPOINTS.INVENTORY}/${id}/restock`,
      { quantity },
      token
    );
  },
};

export default inventoryService;
