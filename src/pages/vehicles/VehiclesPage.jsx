import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
import { useVehicles } from "../../hooks/useVehicles";
import Button from "../../components/common/Button";
import VehicleList from "../../components/vehicles/VehicleList";
import Modal from "../../components/common/Modal";
import VehicleForm from "../../components/vehicles/VehicleForm";
import Pagination from "../../components/common/Pagination";
import StatusFilter from "../../components/common/StatusFilter";
import SearchInput from "../../components/common/SearchInput";

/**
 * VehiclesPage Component
 *
 * Displays a comprehensive list of vehicles with advanced filtering,
 * sorting, and pagination capabilities.
 */
const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    make: "all",
    year: "all"
  });
  const [sortConfig, setSortConfig] = useState({
    key: "make",
    direction: "asc"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const itemsPerPage = 10;

  const { vehicles, loading, error, deleteVehicle, refreshVehicles } = useVehicles();

  // Apply sorting to vehicles
  const sortedVehicles = React.useMemo(() => {
    let sortableVehicles = [...vehicles];
    if (sortConfig.key) {
      sortableVehicles.sort((a, b) => {
        // Handle nested properties
        const aValue = sortConfig.key.includes('.') ? 
          sortConfig.key.split('.').reduce((o, i) => o[i], a) : a[sortConfig.key];
        const bValue = sortConfig.key.includes('.') ? 
          sortConfig.key.split('.').reduce((o, i) => o[i], b) : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableVehicles;
  }, [vehicles, sortConfig]);

  // Filter vehicles based on search term and filters
  const filteredVehicles = sortedVehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.customer && 
        `${vehicle.customer.firstName} ${vehicle.customer.lastName}`.toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      filters.status === "all" || vehicle.status === filters.status;
    
    const matchesMake = 
      filters.make === "all" || vehicle.make === filters.make;
    
    const matchesYear = 
      filters.year === "all" || vehicle.year.toString() === filters.year;

    return matchesSearch && matchesStatus && matchesMake && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const currentItems = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique values for filters
  const uniqueMakes = [...new Set(vehicles.map(vehicle => vehicle.make))];
  const uniqueYears = [...new Set(vehicles.map(vehicle => vehicle.year).sort((a, b) => b - a))];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteVehicle(id);
      setSelectedVehicles(selectedVehicles.filter(vehicleId => vehicleId !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedVehicles.length} vehicles?`)) {
      await Promise.all(selectedVehicles.map(id => deleteVehicle(id)));
      setSelectedVehicles([]);
    }
  };

  const handleRowClick = (vehicle) => {
    // Navigate to vehicle detail page
    window.location.href = `/vehicles/${vehicle.id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Vehicle Inventory ({filteredVehicles.length})
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            icon={<FiRefreshCw />}
            onClick={refreshVehicles}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      {selectedVehicles.length > 0 && (
        <div className="bg-blue-50 rounded-lg shadow p-4 mb-6 flex justify-between items-center">
          <div className="text-blue-800">
            {selectedVehicles.length} vehicle(s) selected
          </div>
          <Button
            variant="danger"
            onClick={handleBulkDelete}
            disabled={loading}
          >
            Delete Selected
          </Button>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchInput
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <StatusFilter
            value={filters.status}
            onChange={(status) => setFilters({...filters, status})}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "in-service", label: "In Service" },
              { value: "sold", label: "Sold" },
            ]}
          />

          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.make}
            onChange={(e) => setFilters({...filters, make: e.target.value})}
          >
            <option value="all">All Makes</option>
            {uniqueMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>

          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
          >
            <option value="all">All Years</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <VehicleList
          vehicles={currentItems}
          loading={loading}
          onRowClick={handleRowClick}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedVehicles={selectedVehicles}
          onSelect={setSelectedVehicles}
        />
      </div>

      {/* Pagination */}
      {filteredVehicles.length > itemsPerPage && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of{' '}
            {filteredVehicles.length} vehicles
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Vehicle"
        size="lg"
      >
        <VehicleForm
          onSubmit={() => {
            setIsModalOpen(false);
            setCurrentPage(1); // Reset to first page to see new addition
            refreshVehicles();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default VehiclesPage;