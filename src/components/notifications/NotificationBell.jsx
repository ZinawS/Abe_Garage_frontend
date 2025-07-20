import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "../../contexts/NotificationContext";
import NotificationList from "./NotificationList";

/**
 * NotificationBell Component
 *
 * Displays notification count and dropdown with:
 * - Unread count indicator
 * - Mark as read functionality
 * - Quick access to notifications
 */
const NotificationBell = () => {
  const { unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-3">
      <button
        type="button"
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          <NotificationList compact />
          <div className="px-4 py-2 border-t border-gray-200 text-center">
            <a
              href="/notifications"
              className="text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
