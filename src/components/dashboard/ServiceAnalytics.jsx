/**
 * Service Analytics Component
 *
 * Displays service-related analytics and statistics
 *
 * @param {Object} props - Component props
 * @param {Array} props.serviceData - Array of service data points
 * @param {Array} props.topServices - Array of top services
 * @param {Function} [props.onViewDetails] - Callback when "View Details" is clicked
 * @returns {JSX.Element} Service analytics dashboard
 */
const ServiceAnalytics = ({ serviceData, topServices, onViewDetails }) => {
  // This would typically be replaced with a chart library like Chart.js or Recharts
  const renderSimpleChart = () => {
    const maxValue = Math.max(...serviceData.map((item) => item.value));

    return (
      <div className="h-48 mt-4 flex items-end space-x-1">
        {serviceData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-500 rounded-t-sm"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Service Analytics</h3>
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View Details
          </button>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500">
          Services This Month
        </h4>
        {renderSimpleChart()}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Top Services</h4>
        <div className="space-y-3">
          {topServices.map((service, index) => (
            <div key={service.id} className="flex items-center">
              <span className="text-sm font-medium text-gray-900 w-6">
                {index + 1}.
              </span>
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium text-gray-900">
                  {service.name}
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {service.count} services
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAnalytics;
