/**
 * Vehicle Card Component
 *
 * Displays a summary of vehicle information in a card format
 *
 * @param {Object} props - Component props
 * @param {Object} props.vehicle - Vehicle data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @param {Function} [props.onViewServices] - Callback when view services button is clicked
 * @returns {JSX.Element} Vehicle information card
 */
const VehicleCard = ({ vehicle, onEdit, onViewServices }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 object-contain"
              src={vehicle.image || "/src/assets/images/car-placeholder.jpg"}
              alt={`${vehicle.make} ${vehicle.model}`}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h3>
            <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500">VIN</p>
            <p className="text-sm text-gray-900">{vehicle.vin || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Mileage</p>
            <p className="text-sm text-gray-900">
              {vehicle.mileage
                ? `${vehicle.mileage.toLocaleString()} miles`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Service</p>
            <p className="text-sm text-gray-900">
              {vehicle.lastServiceDate
                ? new Date(vehicle.lastServiceDate).toLocaleDateString()
                : "Never"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-sm text-gray-900">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vehicle.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {vehicle.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        {onViewServices && (
          <button
            onClick={() => onViewServices(vehicle)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Services
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(vehicle)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
