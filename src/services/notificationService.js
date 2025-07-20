import { API_ENDPOINTS } from '../config/api';
import api from './api';

/**
 * Notification Service
 * 
 * Handles all notification-related API calls
 */

const notificationService = {
  /**
   * Get user notifications
   * @param {string} userId - User ID
   * @param {string} token - Auth token
   * @returns {Promise} Object with notifications and unread count
   */
  getUserNotifications: async (userId, token) => {
    return api.get(`${API_ENDPOINTS.NOTIFICATIONS}/user/${userId}`, token);
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @param {string} token - Auth token
   * @returns {Promise} Success status
   */
  markNotificationAsRead: async (notificationId, token) => {
    return api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`, {}, token);
  },

  /**
   * Mark all notifications as read
   * @param {string} userId - User ID
   * @param {string} token - Auth token
   * @returns {Promise} Success status
   */
  markAllNotificationsAsRead: async (userId, token) => {
    return api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/user/${userId}/read-all`, {}, token);
  },

  /**
   * Get user notification preferences
   * @param {string} userId - User ID
   * @param {string} token - Auth token
   * @returns {Promise} Notification preferences
   */
  getNotificationPreferences: async (userId, token) => {
    return api.get(`${API_ENDPOINTS.NOTIFICATIONS}/user/${userId}/preferences`, token);
  },

  /**
   * Update user notification preferences
   * @param {string} userId - User ID
   * @param {Object} preferences - New preferences
   * @param {string} token - Auth token
   * @returns {Promise} Updated preferences
   */
  updateNotificationPreferences: async (userId, preferences, token) => {
    return api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/user/${userId}/preferences`, preferences, token);
  }
};

export default notificationService;
