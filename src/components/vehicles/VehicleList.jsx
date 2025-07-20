import Table from "../common/Table";

/**
 * Vehicle List Component
 *
 * Displays a table of vehicles with sorting and selection capabilities
 *
 * @param {Object} props - Component props
 * @param {Array} props.vehicles - Array of vehicle objects
 * @param {Function} [props.onSelect] - Callback when vehicles are selected
 * @param {Array} [props.selectedVehicles] - Array of selected vehicle IDs
 * @param {Function} [props.onRowClick] - Callback when a row is clicked
 * @param {boolean} [props.loading] - Loading state indicator
 * @param {Object} [props.sortConfig] - Current sort configuration
 * @param {Function} [props.onSort] - Callback when sorting changes
 * @returns {JSX.Element} Vehicles table
 */
const VehicleList = ({
  vehicles,
  onSelect,
  selectedVehicles = [],
  onRowClick,
  loading,
  sortConfig,
  onSort,
}) => {
  const columns = [
    {
      key: "make",
      header: "Vehicle",
      sortable: true,
      render: (vehicle) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 object-contain"
              src={vehicle.image || "/src/assets/images/car-placeholder.jpg"}
              alt={`${vehicle.make} ${vehicle.model}`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </div>
            <div className="text-sm text-gray-500">{vehicle.licensePlate}</div>
          </div>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Owner",
      sortable: true,
    },
    {
      key: "mileage",
      header: "Mileage",
      sortable: true,
      render: (vehicle) => (
        <span>
          {vehicle.mileage
            ? `${vehicle.mileage.toLocaleString()} miles`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "lastServiceDate",
      header: "Last Service",
      sortable: true,
      render: (vehicle) => (
        <span>
          {vehicle.lastServiceDate
            ? new Date(vehicle.lastServiceDate).toLocaleDateString()
            : "Never"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (vehicle) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            vehicle.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {vehicle.status}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={vehicles}
      onRowClick={onRowClick}
      loading={loading}
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={!!onSelect}
      onSelect={onSelect}
      selectedRows={selectedVehicles}
    />
  );
};

export default VehicleList;
