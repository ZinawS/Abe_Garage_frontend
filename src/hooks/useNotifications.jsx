import { useState, useEffect, useCallback } from "react";
import  useAuth  from "./useAuth";
import notificationService  from "../services/notificationService";
import useSocket  from "./useSocket";

/**
 * useNotifications Hook
 *
 * Manages notification data and operations with real-time updates
 *
 * @returns {Object} Notifications state and methods
 */
const useNotifications = () => {
  const { authToken, user } = useAuth();
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await notificationService.getUserNotifications(
        user.id,
        authToken
      );
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, authToken]);

  const markAsRead = async (notificationId) => {
    setLoading(true);
    setError(null);

    try {
      await notificationService.markNotificationAsRead(
        notificationId,
        authToken
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await notificationService.markAllNotificationsAsRead(user.id, authToken);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationPreferences = async (preferences) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await notificationService.updateNotificationPreferences(
        user.id,
        preferences,
        authToken
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Set up socket listeners for real-time notifications
  useEffect(() => {
    if (!socket || !user) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket, user]);

  // Fetch notifications on mount and when user changes
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    updateNotificationPreferences,
  };
};

export default useNotifications;
