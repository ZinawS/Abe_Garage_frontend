import api from "./api";

/**
 * Vehicle Service
 *
 * Handles all vehicle-related API calls including:
 * - Vehicle CRUD operations
 * - Service history
 * - Maintenance tracking
 */

/**
 * Get all vehicles
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of vehicles
 */
export const getVehicles = async (filters = {}) => {
  try {
    const response = await api.get("/vehicles", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    throw error;
  }
};

/**
 * Get vehicle by ID
 * @param {string} vehicleId - Vehicle ID
 * @returns {Promise<Object>} Vehicle details
 */
export const getVehicleById = async (vehicleId) => {
  try {
    const response = await api.get(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch vehicle ${vehicleId}:`, error);
    throw error;
  }
};

/**
 * Create a new vehicle
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise<Object>} Created vehicle
 */
export const createVehicle = async (vehicleData) => {
  try {
    const response = await api.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    throw error;
  }
};

/**
 * Update vehicle
 * @param {string} vehicleId - Vehicle ID
 * @param {Object} vehicleData - Updated vehicle data
 * @returns {Promise<Object>} Updated vehicle
 */
export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const response = await api.put(`/vehicles/${vehicleId}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update vehicle ${vehicleId}:`, error);
    throw error;
  }
};

/**
 * Delete vehicle
 * @param {string} vehicleId - Vehicle ID
 * @returns {Promise} Resolves when vehicle is deleted
 */
export const deleteVehicle = async (vehicleId) => {
  try {
    await api.delete(`/vehicles/${vehicleId}`);
  } catch (error) {
    console.error(`Failed to delete vehicle ${vehicleId}:`, error);
    throw error;
  }
};

/**
 * Get service history for a vehicle
 * @param {string} vehicleId - Vehicle ID
 * @returns {Promise<Array>} Array of service records
 */
export const getVehicleServiceHistory = async (vehicleId) => {
  try {
    const response = await api.get(`/vehicles/${vehicleId}/services`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch service history for vehicle ${vehicleId}:`,
      error
    );
    throw error;
  }
};

/**
 * Add service record to vehicle
 * @param {string} vehicleId - Vehicle ID
 * @param {Object} serviceData - Service data
 * @returns {Promise<Object>} Created service record
 */
export const addVehicleService = async (vehicleId, serviceData) => {
  try {
    const response = await api.post(
      `/vehicles/${vehicleId}/services`,
      serviceData
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to add service to vehicle ${vehicleId}:`, error);
    throw error;
  }
};

/**
 * Get maintenance schedule for a vehicle
 * @param {string} vehicleId - Vehicle ID
 * @returns {Promise<Array>} Array of maintenance items
 */
export const getMaintenanceSchedule = async (vehicleId) => {
  try {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch maintenance schedule for vehicle ${vehicleId}:`,
      error
    );
    throw error;
  }
};

/**
 * Get vehicles for a specific customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} Array of vehicles
 */
export const getCustomerVehicles = async (customerId) => {
  try {
    const response = await api.get(`/vehicles/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch vehicles for customer ${customerId}:`,
      error
    );
    throw error;
  }
};
const vehicleService = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,            
    deleteVehicle,
    getVehicleServiceHistory,
    addVehicleService,
    getMaintenanceSchedule,
    getCustomerVehicles,
};
export default vehicleService;