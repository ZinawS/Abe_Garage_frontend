import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiClock, FiDollarSign } from "react-icons/fi";
import { useVehicle } from "../../hooks/useVehicle";
import VehicleStatus from "../../components/vehicles/VehicleStatus";
import ServiceHistory from "../../components/reports/ServiceHistory";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import VehicleForm from "../../components/vehicles/VehicleForm";

/**
 * VehicleDetailPage Component
 *
 * Displays detailed information about a specific vehicle including:
 * - Vehicle specifications
 * - Service history
 * - Maintenance schedule
 */
const VehicleDetailPage = () => {
  const { id } = useParams();
  const { vehicle, loading, error, deleteVehicle } = useVehicle(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  /**
   * Handle vehicle deletion
   */
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteVehicle(id);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading vehicle details...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!vehicle)
    return <div className="text-center py-8">Vehicle not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/customers" className="mr-4">
          <Button variant="outline" icon={<FiArrowLeft />}>
            Back to Vehicles
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          {vehicle.make} {vehicle.model} ({vehicle.year})
        </h1>
        <div className="ml-auto flex space-x-2">
          <Button
            variant="secondary"
            icon={<FiEdit />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle details with tabs */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "details" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  Vehicle Details
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "history" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  Service History
                </button>
                <button
                  onClick={() => setActiveTab("maintenance")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "maintenance" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  Maintenance
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Specifications
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          VIN
                        </dt>
                        <dd className="text-sm">
                          {vehicle.vin || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          License Plate
                        </dt>
                        <dd className="text-sm">
                          {vehicle.licensePlate || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          Color
                        </dt>
                        <dd className="text-sm capitalize">
                          {vehicle.color || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          Mileage
                        </dt>
                        <dd className="text-sm">
                          {vehicle.mileage
                            ? `${vehicle.mileage.toLocaleString()} mi`
                            : "Not specified"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          Engine
                        </dt>
                        <dd className="text-sm">
                          {vehicle.engine || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-1/3 text-sm font-medium text-gray-500">
                          Transmission
                        </dt>
                        <dd className="text-sm capitalize">
                          {vehicle.transmission || "Not specified"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Owner Information
                    </h3>
                    {vehicle.customer ? (
                      <div className="space-y-2">
                        <p className="font-medium">
                          {vehicle.customer.firstName}{" "}
                          {vehicle.customer.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {vehicle.customer.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {vehicle.customer.phone}
                        </p>
                        <Link
                          to={`/customers/${vehicle.customer.id}`}
                          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                        >
                          View customer profile
                        </Link>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No owner information available
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  <ServiceHistory vehicleId={vehicle.id} />
                </div>
              )}

              {activeTab === "maintenance" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Maintenance Schedule
                  </h3>
                  <div className="text-center text-gray-500 py-8">
                    <FiClock className="mx-auto h-12 w-12" />
                    <p className="mt-2">Maintenance schedule coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar with status and quick actions */}
        <div className="space-y-6">
          <VehicleStatus vehicle={vehicle} />

          {/* Quick actions */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                New Service
              </Button>
              <Button variant="outline" size="sm">
                Add Note
              </Button>
              <Button variant="outline" size="sm">
                Print History
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          {/* Service statistics */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Service Statistics
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Services</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Service</span>
                <span className="font-medium">2 weeks ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Spent</span>
                <span className="font-medium flex items-center">
                  <FiDollarSign className="mr-1" />
                  1,845.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Vehicle"
        size="lg"
      >
        <VehicleForm
          initialData={vehicle}
          onSubmit={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default VehicleDetailPage;
