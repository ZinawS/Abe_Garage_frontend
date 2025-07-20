import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import { useNotifications } from "../../contexts/NotificationContext";

/**
 * NotificationList Component
 *
 * Displays notifications with:
 * - Type indicators
 * - Timestamps
 * - Mark as read functionality
 */
const NotificationList = ({ compact = false, maxItems = 5 }) => {
  const { notifications, markNotificationAsRead } = useNotifications();

  const displayedNotifications = compact
    ? notifications.slice(0, maxItems)
    : notifications;

  if (displayedNotifications.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-gray-500">
        No notifications
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {displayedNotifications.map((notification) => {
        let icon;
        let iconColor;

        switch (notification.type) {
          case "alert":
            icon = <FiAlertCircle className={`h-5 w-5 text-yellow-500`} />;
            iconColor = "bg-yellow-100";
            break;
          case "success":
            icon = <FiCheckCircle className={`h-5 w-5 text-green-500`} />;
            iconColor = "bg-green-100";
            break;
          default:
            icon = <FiInfo className={`h-5 w-5 text-blue-500`} />;
            iconColor = "bg-blue-100";
        }

        return (
          <div
            key={notification.id}
            className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 p-1 rounded-full ${iconColor}`}>
                {icon}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => markNotificationAsRead(notification.id)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
