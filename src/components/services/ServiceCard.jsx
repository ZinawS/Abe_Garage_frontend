/**
 * Service Card Component
 *
 * Displays a summary of service information in a card format
 *
 * @param {Object} props - Component props
 * @param {Object} props.service - Service data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @param {Function} [props.onViewDetails] - Callback when view details button is clicked
 * @returns {JSX.Element} Service information card
 */
const ServiceCard = ({ service, onEdit, onViewDetails }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(service.status)}`}
          >
            {formatStatus(service.status)}
          </span>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Customer</p>
            <p className="text-sm text-gray-900">{service.customerName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Vehicle</p>
            <p className="text-sm text-gray-900">{service.vehicleDetails}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-sm text-gray-900">
              {new Date(service.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Estimated Cost</p>
            <p className="text-sm text-gray-900">
              ${service.estimatedCost.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(service)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(service)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
