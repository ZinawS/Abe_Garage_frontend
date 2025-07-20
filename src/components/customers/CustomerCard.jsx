/**
 * Customer Card Component
 *
 * Displays a summary of customer information in a card format
 *
 * @param {Object} props - Component props
 * @param {Object} props.customer - Customer data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @param {Function} [props.onViewVehicles] - Callback when view vehicles button is clicked
 * @returns {JSX.Element} Customer information card
 */
const CustomerCard = ({ customer, onEdit, onViewVehicles }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {customer.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {customer.name}
            </h3>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-sm text-gray-900">{customer.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-sm text-gray-900">
              {customer.address
                ? `${customer.address.city}, ${customer.address.state}`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Vehicles</p>
            <p className="text-sm text-gray-900">
              {customer.vehicleCount || 0}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Service</p>
            <p className="text-sm text-gray-900">
              {customer.lastServiceDate
                ? new Date(customer.lastServiceDate).toLocaleDateString()
                : "Never"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        {onViewVehicles && (
          <button
            onClick={() => onViewVehicles(customer)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Vehicles
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
