/**
 * Vehicle Status Component
 *
 * Displays vehicle status and maintenance information
 *
 * @param {Object} props - Component props
 * @param {Object} props.vehicle - Vehicle data object
 * @param {Function} [props.onServiceClick] - Callback when service button is clicked
 * @returns {JSX.Element} Vehicle status card
 */
const VehicleStatus = ({ vehicle, onServiceClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "fair":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMaintenanceItems = () => {
    const items = [];

    if (vehicle.maintenance?.oilChangeDue) {
      items.push({
        name: "Oil Change",
        due: `Due in ${vehicle.maintenance.oilChangeDue} miles`,
        urgency: vehicle.maintenance.oilChangeDue < 500 ? "high" : "medium",
      });
    }

    if (vehicle.maintenance?.tireRotationDue) {
      items.push({
        name: "Tire Rotation",
        due: `Due in ${vehicle.maintenance.tireRotationDue} miles`,
        urgency: vehicle.maintenance.tireRotationDue < 500 ? "high" : "medium",
      });
    }

    if (vehicle.maintenance?.brakeServiceDue) {
      items.push({
        name: "Brake Service",
        due: `Due in ${vehicle.maintenance.brakeServiceDue} miles`,
        urgency: vehicle.maintenance.brakeServiceDue < 500 ? "high" : "medium",
      });
    }

    if (items.length === 0) {
      items.push({
        name: "No upcoming maintenance",
        due: "All systems normal",
        urgency: "none",
      });
    }

    return items;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Vehicle Status</h3>
        {onServiceClick && (
          <button
            onClick={() => onServiceClick(vehicle)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Record Service
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Overall Condition</p>
          <div className="mt-2 flex items-center">
            <div
              className={`h-3 w-3 rounded-full ${getStatusColor(vehicle.condition)}`}
            ></div>
            <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
              {vehicle.condition}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Current Mileage</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {vehicle.mileage ? vehicle.mileage.toLocaleString() : "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Last Service</p>
          <p className="mt-2 text-sm text-gray-900">
            {vehicle.lastServiceDate ? (
              <>
                {new Date(vehicle.lastServiceDate).toLocaleDateString()}
                <br />
                <span className="text-gray-500">
                  {vehicle.lastServiceMileage
                    ? `at ${vehicle.lastServiceMileage.toLocaleString()} miles`
                    : ""}
                </span>
              </>
            ) : (
              "Never"
            )}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Upcoming Maintenance
        </h4>
        <div className="space-y-2">
          {getMaintenanceItems().map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.due}</p>
              </div>
              {item.urgency !== "none" && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.urgency === "high"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.urgency === "high" ? "Urgent" : "Upcoming"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
