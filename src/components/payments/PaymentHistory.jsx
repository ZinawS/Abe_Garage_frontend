import Table from "../common/Table";

/**
 * Payment History Component
 *
 * Displays a table of payment history with filtering capabilities
 *
 * @param {Object} props - Component props
 * @param {Array} props.payments - Array of payment objects
 * @param {Function} [props.onPaymentClick] - Callback when a payment is clicked
 * @param {Function} [props.onFilter] - Callback when filters are applied
 * @param {boolean} [props.loading] - Loading state indicator
 * @returns {JSX.Element} Payment history table
 */
const PaymentHistory = ({ payments, onPaymentClick, onFilter, loading }) => {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    method: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    if (onFilter) onFilter(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      dateFrom: "",
      dateTo: "",
      method: "",
    };
    setFilters(clearedFilters);
    if (onFilter) onFilter(clearedFilters);
  };

  const columns = [
    {
      key: "paymentDate",
      header: "Date",
      sortable: true,
      render: (payment) => (
        <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
      ),
    },
    {
      key: "invoiceNumber",
      header: "Invoice #",
      sortable: true,
      render: (payment) => (
        <span className="font-medium">#{payment.invoiceNumber}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (payment) => (
        <span className="font-medium">${payment.amount.toFixed(2)}</span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Method",
      sortable: true,
      render: (payment) => (
        <span className="capitalize">
          {payment.paymentMethod.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (payment) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            payment.status === "completed"
              ? "bg-green-100 text-green-800"
              : payment.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {payment.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Filter Payments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="dateFrom"
              className="block text-sm font-medium text-gray-700"
            >
              From Date
            </label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="dateTo"
              className="block text-sm font-medium text-gray-700"
            >
              To Date
            </label>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="method"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <select
              name="method"
              id="method"
              value={filters.method}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Methods</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={applyFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Payment table */}
      <Table
        columns={columns}
        data={payments}
        onRowClick={onPaymentClick}
        loading={loading}
      />
    </div>
  );
};

export default PaymentHistory;
