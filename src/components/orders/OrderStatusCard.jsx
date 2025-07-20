import React from "react";
import { FiClock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import Button from "../common/Button";

/**
 * OrderStatusCard Component
 *
 * Displays a summary of an order's status with:
 * - Progress indicators
 * - Key information
 * - Action buttons
 */
const OrderStatusCard = ({
  order,
  showDetailsButton = false,
  showVehicle = false,
}) => {
  const progressSteps = [
    { status: "pending", label: "Pending" },
    { status: "in_progress", label: "In Progress" },
    { status: "quality_check", label: "Quality Check" },
    { status: "completed", label: "Completed" },
  ];

  const currentStepIndex = progressSteps.findIndex(
    (step) => step.status === order.status
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Order #{order.id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {showVehicle && (
          <div className="mt-2">
            <p className="text-sm font-medium">
              {order.vehicle.make} {order.vehicle.model} ({order.vehicle.year})
            </p>
            {order.vehicle.licensePlate && (
              <p className="text-xs text-gray-500 mt-1">
                License: {order.vehicle.licensePlate}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="relative pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            {progressSteps.map((step, index) => (
              <span
                key={step.status}
                className={`${index <= currentStepIndex ? "font-medium" : ""}`}
              >
                {step.label}
              </span>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${(currentStepIndex + 1) * 25}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {order.status === "completed" ? (
              <FiCheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <FiClock className="h-5 w-5 text-yellow-500" />
            )}
            <span className="text-sm">
              {order.status === "completed"
                ? `Completed on ${new Date(order.completedAt).toLocaleDateString()}`
                : "In Progress"}
            </span>
          </div>

          {showDetailsButton && (
            <Button variant="outline" size="sm">
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;
