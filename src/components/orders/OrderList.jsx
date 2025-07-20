import React from "react";
import { FiEdit, FiTrash2, FiClock, FiDollarSign } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import Button from "../common/Button";
import { format } from "date-fns";

/**
 * OrderList Component
 *
 * Displays a list of orders with:
 * - Status badges
 * - Sortable columns
 * - Action buttons
 */
const OrderList = ({ orders, onEdit, onDelete }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No orders found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Services
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {order.customer.name}
                </div>
                <div className="text-sm text-gray-500">
                  {order.customer.phone}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {order.vehicle.make} {order.vehicle.model}
                </div>
                <div className="text-sm text-gray-500">
                  {order.vehicle.licensePlate || "No plate"}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {order.services.length} service
                  {order.services.length !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FiClock className="mr-1" />
                  <span>
                    {order.services.reduce(
                      (sum, s) => sum + s.estimatedTime,
                      0
                    )}{" "}
                    hrs
                  </span>
                  <FiDollarSign className="ml-2 mr-1" />
                  <span>
                    $
                    {order.services
                      .reduce((sum, s) => sum + s.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(order.createdAt), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<FiEdit />}
                    onClick={() => onEdit && onEdit(order)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<FiTrash2 />}
                    onClick={() => onDelete && onDelete(order.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
