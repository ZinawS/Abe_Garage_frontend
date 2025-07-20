import api from "./api";

/**
 * Employee Service
 *
 * Handles all employee-related API calls including:
 * - Employee CRUD operations
 * - Role management
 * - Schedule management
 */

/**
 * Get all employees
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of employees
 */
export const getEmployees = async (filters = {}) => {
  try {
    const response = await api.get("/employees", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};

/**
 * Get employee by ID
 * @param {string} employeeId - Employee ID
 * @returns {Promise<Object>} Employee details
 */
export const getEmployeeById = async (employeeId) => {
  try {
    const response = await api.get(`/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch employee ${employeeId}:`, error);
    throw error;
  }
};

/**
 * Create a new employee
 * @param {Object} employeeData - Employee data
 * @returns {Promise<Object>} Created employee
 */
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.error("Failed to create employee:", error);
    throw error;
  }
};

/**
 * Update employee
 * @param {string} employeeId - Employee ID
 * @param {Object} employeeData - Updated employee data
 * @returns {Promise<Object>} Updated employee
 */
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await api.put(`/employees/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update employee ${employeeId}:`, error);
    throw error;
  }
};

/**
 * Delete employee
 * @param {string} employeeId - Employee ID
 * @returns {Promise} Resolves when employee is deleted
 */
export const deleteEmployee = async (employeeId) => {
  try {
    await api.delete(`/employees/${employeeId}`);
  } catch (error) {
    console.error(`Failed to delete employee ${employeeId}:`, error);
    throw error;
  }
};

/**
 * Update employee role
 * @param {string} employeeId - Employee ID
 * @param {string} role - New role
 * @returns {Promise<Object>} Updated employee
 */
export const updateEmployeeRole = async (employeeId, role) => {
  try {
    const response = await api.patch(`/employees/${employeeId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error(`Failed to update role for employee ${employeeId}:`, error);
    throw error;
  }
};

/**
 * Get employee schedule
 * @param {string} employeeId - Employee ID
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of schedule items
 */
export const getEmployeeSchedule = async (employeeId, startDate, endDate) => {
  try {
    const response = await api.get(`/employees/${employeeId}/schedule`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch schedule for employee ${employeeId}:`,
      error
    );
    throw error;
  }
};

/**
 * Update employee schedule
 * @param {string} employeeId - Employee ID
 * @param {Array} schedule - Array of schedule items
 * @returns {Promise<Object>} Updated schedule
 */
export const updateEmployeeSchedule = async (employeeId, schedule) => {
  try {
    const response = await api.put(`/employees/${employeeId}/schedule`, {
      schedule,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Failed to update schedule for employee ${employeeId}:`,
      error
    );
    throw error;
  }
};

const employeeService = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateEmployeeRole,
  getEmployeeSchedule,
  updateEmployeeSchedule,
};
export default employeeService;
