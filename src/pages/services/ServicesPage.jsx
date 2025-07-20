import React, { useState } from "react";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import ServiceList from "../../components/services/ServiceList";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import useServices  from "../../hooks/useServices";
import Modal from "../../components/common/Modal";
import ServiceForm from "../../components/services/ServiceForm";

/**
 * ServicesPage Component
 *
 * Manages the list of available services with:
 * - Search and filtering capabilities
 * - Service creation and editing
 * - Pricing management
 */
const ServicesPage = () => {
  const { services, loading, error, deleteService } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [filter, setFilter] = useState("all");

  // Filter services based on search term and selected filter
  const filteredServices = services
    .filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((service) => {
      if (filter === "popular") return service.isPopular;
      return true;
    });

  /**
   * Handle service edit
   * @param {Object} service - Service to edit
   */
  const handleEdit = (service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  /**
   * Handle service deletion
   * @param {string} id - Service ID
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };

  /**
   * Close modal and reset current service
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  if (loading)
    return <div className="text-center py-8">Loading services...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Service Catalog</h1>
        <Button
          variant="primary"
          icon={<FiPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Service
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
          <SearchInput
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FiSearch />}
            className="flex-1"
          />

          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Services</option>
              <option value="popular">Popular Services</option>
            </select>
          </div>
        </div>

        <ServiceList
          services={filteredServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add/Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={currentService ? "Edit Service" : "Add New Service"}
        size="lg"
      >
        <ServiceForm
          initialData={currentService || {}}
          onSubmit={handleModalClose}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default ServicesPage;
