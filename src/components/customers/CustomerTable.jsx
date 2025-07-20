import Table from "../common/Table";

/**
 * Customer Table Component
 *
 * Displays a table of customers with sorting and selection capabilities
 *
 * @param {Object} props - Component props
 * @param {Array} props.customers - Array of customer objects
 * @param {Function} [props.onSelect] - Callback when customers are selected
 * @param {Array} [props.selectedCustomers] - Array of selected customer IDs
 * @param {Function} [props.onRowClick] - Callback when a row is clicked
 * @param {boolean} [props.loading] - Loading state indicator
 * @param {Object} [props.sortConfig] - Current sort configuration
 * @param {Function} [props.onSort] - Callback when sorting changes
 * @returns {JSX.Element} Customers table
 */
const CustomerTable = ({
  customers,
  onSelect,
  selectedCustomers = [],
  onRowClick,
  loading,
  sortConfig,
  onSort,
}) => {
  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (customer) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {customer.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {customer.name}
            </div>
            <div className="text-sm text-gray-500">{customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      sortable: true,
    },
    {
      key: "address",
      header: "Location",
      sortable: true,
      render: (customer) => (
        <span>
          {customer.address
            ? `${customer.address.city}, ${customer.address.state}`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "vehicleCount",
      header: "Vehicles",
      sortable: true,
    },
    {
      key: "lastServiceDate",
      header: "Last Service",
      sortable: true,
      render: (customer) => (
        <span>
          {customer.lastServiceDate
            ? new Date(customer.lastServiceDate).toLocaleDateString()
            : "Never"}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={customers}
      onRowClick={onRowClick}
      loading={loading}
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={!!onSelect}
      onSelect={onSelect}
      selectedRows={selectedCustomers}
    />
  );
};

export default CustomerTable;
