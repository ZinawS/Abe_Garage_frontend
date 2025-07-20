import React from "react";

/**
 * OrderStatusBadge Component
 *
 * Displays order status with appropriate color coding
 */
const OrderStatusBadge = ({ status }) => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    quality_check: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    quality_check: "Quality Check",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}
    >
      {statusLabels[status] || status}
    </span>
  );
};

export default OrderStatusBadge;
