import api from "./api";

/**
 * Report Service
 *
 * Handles all reporting-related API calls including:
 * - Dashboard statistics
 * - Service history
 * - Financial reports
 * - Export functionality
 */

/**
 * Get dashboard statistics
 * @param {string} timeRange - Time range for stats (day, week, month, year)
 * @returns {Promise<Object>} Dashboard statistics
 */
export const getDashboardStats = async (timeRange = "week") => {
  try {
    const response = await api.get("/reports/dashboard", {
      params: { range: timeRange },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};

/**
 * Get recent activity
 * @param {number} limit - Number of activities to return
 * @returns {Promise<Array>} Array of recent activities
 */
export const getRecentActivity = async (limit = 10) => {
  try {
    const response = await api.get("/reports/activity", { params: { limit } });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recent activity:", error);
    throw error;
  }
};

/**
 * Get service history for a vehicle
 * @param {string} vehicleId - Vehicle ID
 * @param {string} timeRange - Time range (1m, 3m, 6m, 1y, all)
 * @returns {Promise<Array>} Array of service records
 */
export const getServiceHistory = async (vehicleId, timeRange = "1y") => {
  try {
    const response = await api.get(`/reports/service-history/${vehicleId}`, {
      params: { range: timeRange },
    });
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
 * Get financial report
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @param {string} groupBy - Grouping (day, week, month)
 * @returns {Promise<Object>} Financial report data
 */
export const getFinancialReport = async (
  startDate,
  endDate,
  groupBy = "month"
) => {
  try {
    const response = await api.get("/reports/financial", {
      params: { startDate, endDate, groupBy },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch financial report:", error);
    throw error;
  }
};

/**
 * Export report data
 * @param {string} reportType - Report type (services, financial, inventory)
 * @param {Object} filters - Report filters
 * @param {string} format - Export format (csv, pdf, xlsx)
 * @returns {Promise<Blob>} Exported file data
 */
export const exportReport = async (reportType, filters, format = "pdf") => {
  try {
    const response = await api.get(`/reports/export/${reportType}`, {
      params: { ...filters, format },
      responseType: "blob",
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${reportType}_report.${format}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    return true;
  } catch (error) {
    console.error("Failed to export report:", error);
    throw error;
  }
};
const reportService =    {
  getDashboardStats,
  getRecentActivity,
  getServiceHistory,
  getFinancialReport,
  exportReport,
};
export default reportService;

