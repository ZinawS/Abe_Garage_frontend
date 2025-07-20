import React, { useState } from "react";
import { FiClock, FiDollarSign, FiEdit2, FiTrash2 } from "react-icons/fi";
import ServiceTimer from "./ServiceTimer";
import ServiceMaterials from "./ServiceMaterials";
import Button from "../common/Button";

/**
 * ServiceList Component
 *
 * Displays a list of services with:
 * - Time tracking for each service
 * - Materials used
 * - Cost calculation
 * - Edit/delete functionality
 */
const ServiceList = ({ services, onTimeUpdate, onMaterialsUpdate }) => {
  const [expandedService, setExpandedService] = useState(null);

  /**
   * Toggle expanded view for a service
   * @param {string} serviceId - ID of the service to expand/collapse
   */
  const toggleExpand = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  /**
   * Handle time update for a service
   * @param {string} serviceId - ID of the service
   * @param {Array} timeData - Array of time entries
   */
  const handleTimeUpdate = (serviceId, timeData) => {
    if (onTimeUpdate) onTimeUpdate(serviceId, timeData);
  };

  /**
   * Handle materials update for a service
   * @param {string} serviceId - ID of the service
   * @param {Array} materials - Array of materials
   */
  const handleMaterialsUpdate = (serviceId, materials) => {
    if (onMaterialsUpdate) onMaterialsUpdate(serviceId, materials);
  };

  // Calculate total cost for a service
  const calculateServiceCost = (service) => {
    const laborCost = service.hours * (service.rate || 85);
    const materialsCost =
      service.materials?.reduce(
        (sum, material) => sum + material.quantity * (material.unitPrice || 0),
        0
      ) || 0;
    return laborCost + materialsCost;
  };

  return (
    <div className="space-y-4">
      {services.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No services added yet
        </div>
      ) : (
        services.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Service header */}
            <div
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(service.id)}
            >
              <div>
                <h3 className="font-medium text-gray-900">{service.name}</h3>
                {service.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1" />
                  <span>{service.hours || 0} hrs</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <FiDollarSign className="mr-1" />
                  <span>{calculateServiceCost(service).toFixed(2)}</span>
                </div>
                <div className="w-5">
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      expandedService === service.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expanded service details */}
            {expandedService === service.id && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                {/* Time tracking */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Time Tracking
                  </h4>
                  <ServiceTimer
                    initialTimes={service.timeEntries || []}
                    onTimeUpdate={(timeData) =>
                      handleTimeUpdate(service.id, timeData)
                    }
                  />
                </div>

                {/* Materials used */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Materials Used
                  </h4>
                  <ServiceMaterials
                    initialMaterials={service.materials || []}
                    onMaterialsChange={(materials) =>
                      handleMaterialsUpdate(service.id, materials)
                    }
                  />
                </div>

                {/* Service actions */}
                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                  <Button variant="outline" size="sm" icon={<FiEdit2 />}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" icon={<FiTrash2 />}>
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceList;
