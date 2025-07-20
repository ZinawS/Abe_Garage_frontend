import { io } from 'socket.io-client';
import { API_ENDPOINTS } from '../config/api';

/**
 * Socket Service
 * 
 * Manages WebSocket connections for real-time updates
 */

let socketInstance = null;

const socketService = {
  /**
   * Connect to the socket server
   * @param {string} token - Auth token
   * @returns {Socket} Socket instance
   */
  connect: (token) => {
    if (!socketInstance) {
      socketInstance = io(API_ENDPOINTS.SOCKET, {
        auth: { token },
        transports: ['websocket']
      });
    }
    return socketInstance;
  },

  /**
   * Disconnect from the socket server
   */
  disconnect: () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
  },

  /**
   * Get the socket instance
   * @returns {Socket|null} Socket instance or null if not connected
   */
  getSocket: () => {
    return socketInstance;
  }
};

export default socketService;

