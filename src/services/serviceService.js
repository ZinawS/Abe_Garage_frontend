import api from './api';

/**
 * Service Service
 * 
 * Handles all service-related API calls including:
 * - Service catalog management
 * - Pricing updates
 * - Technician assignments
 */

/**
 * Get all services
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of services
 */
export const getServices = async (filters = {}) => {
  try {
    const response = await api.get('/services', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    throw error;
  }
};

/**
 * Get service by ID
 * @param {string} serviceId - Service ID
 * @returns {Promise<Object>} Service details
 */
export const getServiceById = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Create a new service
 * @param {Object} serviceData - Service data
 * @returns {Promise<Object>} Created service
 */
export const createService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    console.error('Failed to create service:', error);
    throw error;
  }
};

/**
 * Update service
 * @param {string} serviceId - Service ID
 * @param {Object} serviceData - Updated service data
 * @returns {Promise<Object>} Updated service
 */
export const updateService = async (serviceId, serviceData) => {
  try {
    const response = await api.put(`/services/${serviceId}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Delete service
 * @param {string} serviceId - Service ID
 * @returns {Promise} Resolves when service is deleted
 */
export const deleteService = async (serviceId) => {
  try {
    await api.delete(`/services/${serviceId}`);
  } catch (error) {
    console.error(`Failed to delete service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Get popular services
 * @returns {Promise<Array>} Array of popular services
 */
export const getPopularServices = async () => {
  try {
    const response = await api.get('/services/popular');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch popular services:', error);
    throw error;
  }
};

/**
 * Get services by category
 * @param {string} category - Service category
 * @returns {Promise<Array>} Array of services in category
 */
export const getServicesByCategory = async (category) => {
  try {
    const response = await api.get(`/services/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch services for category ${category}:`, error);
    throw error;
  }
};

/**
 * Get required materials for service
 * @param {string} serviceId - Service ID
 * @returns {Promise<Array>} Array of required materials
 */
export const getServiceMaterials = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}/materials`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch materials for service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Update service materials
 * @param {string} serviceId - Service ID
 * @param {Array} materials - Array of materials
 * @returns {Promise<Object>} Updated service
 */
export const updateServiceMaterials = async (serviceId, materials) => {
  try {
    const response = await api.put(`/services/${serviceId}/materials`, { materials });
    return response.data;
  } catch (error) {
    console.error(`Failed to update materials for service ${serviceId}:`, error);
    throw error;
  }
};
const serviceService = {
  getServices,
  getServiceById,           
    createService,
    updateService,
    deleteService,
    getPopularServices,
    getServicesByCategory,          
    getServiceMaterials,
    updateServiceMaterials,
};
export default serviceService;