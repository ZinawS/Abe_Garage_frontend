import { useState, useEffect, useCallback } from "react";
import useAuth  from "./useAuth";
import socketService  from "../services/socketService";

/**
 * useSocket Hook
 *
 * Manages socket connection and provides socket instance
 *
 * @returns {Object} Socket state and methods
 */
const useSocket = () => {
  const { authToken, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const connectSocket = useCallback(() => {
    if (!authToken || !user || socket) return;

    try {
      const socketInstance = socketService.connect(authToken);
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        setIsConnected(true);
        setError(null);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
      });

      socketInstance.on("connect_error", (err) => {
        setError(err.message);
        setIsConnected(false);
      });
    } catch (err) {
      setError(err.message);
    }
  }, [authToken, user, socket]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socketService.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  // Reconnect when authToken or user changes
  useEffect(() => {
    if (authToken && user) {
      connectSocket();
    }
  }, [authToken, user, connectSocket]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  return {
    socket,
    isConnected,
    error,
    connectSocket,
    disconnectSocket,
  };
};

export default useSocket;
