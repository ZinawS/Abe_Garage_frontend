import React from "react";

/**
 * OrderStatusFilter Component
 *
 * Provides filtering options for order statuses with:
 * - Consistent styling
 * - Clear visual indicators
 */
const OrderStatusFilter = ({ value, onChange }) => {
  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "quality_check", label: "Quality Check" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default OrderStatusFilter;
