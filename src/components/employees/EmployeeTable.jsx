import Table from "../common/Table";

/**
 * Employee Table Component
 *
 * Displays a table of employees with sorting and selection capabilities
 *
 * @param {Object} props - Component props
 * @param {Array} props.employees - Array of employee objects
 * @param {Function} [props.onSelect] - Callback when employees are selected
 * @param {Array} [props.selectedEmployees] - Array of selected employee IDs
 * @param {Function} [props.onRowClick] - Callback when a row is clicked
 * @param {boolean} [props.loading] - Loading state indicator
 * @param {Object} [props.sortConfig] - Current sort configuration
 * @param {Function} [props.onSort] - Callback when sorting changes
 * @returns {JSX.Element} Employees table
 */
const EmployeeTable = ({
  employees,
  onSelect,
  selectedEmployees = [],
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
      render: (employee) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {employee.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {employee.name}
            </div>
            <div className="text-sm text-gray-500">{employee.position}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      sortable: true,
    },
    {
      key: "hireDate",
      header: "Hire Date",
      sortable: true,
      render: (employee) => (
        <span>{new Date(employee.hireDate).toLocaleDateString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (employee) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            employee.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {employee.status}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={employees}
      onRowClick={onRowClick}
      loading={loading}
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={!!onSelect}
      onSelect={onSelect}
      selectedRows={selectedEmployees}
    />
  );
};

export default EmployeeTable;
