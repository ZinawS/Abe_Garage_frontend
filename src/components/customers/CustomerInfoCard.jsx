/**
 * Customer Information Card
 *
 * Displays detailed customer information with contact details and statistics
 *
 * @param {Object} props - Component props
 * @param {Object} props.customer - Customer data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @returns {JSX.Element} Detailed customer information card
 */
const CustomerInfoCard = ({ customer, onEdit }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
            {customer.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {customer.name}
            </h2>
            <p className="text-sm text-gray-500">
              Customer since {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">
          Contact Information
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email address</p>
            <p className="mt-1 text-sm text-gray-900">{customer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone number</p>
            <p className="mt-1 text-sm text-gray-900">
              {customer.phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="mt-1 text-sm text-gray-900">
              {customer.address ? (
                <>
                  {customer.address.street}
                  <br />
                  {customer.address.city}, {customer.address.state}{" "}
                  {customer.address.zipCode}
                </>
              ) : (
                "Not provided"
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Preferred Contact
            </p>
            <p className="mt-1 text-sm text-gray-900">
              {customer.preferredContact || "Email"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Service History</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Services</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {customer.totalServices || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Last Service</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {customer.lastServiceDate
                ? new Date(customer.lastServiceDate).toLocaleDateString()
                : "Never"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Spent</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {customer.totalSpent
                ? `$${customer.totalSpent.toFixed(2)}`
                : "$0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
