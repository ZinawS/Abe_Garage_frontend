import React, { useState, useEffect } from "react";
import { FiFilter, FiAlertCircle } from "react-icons/fi";
import { getServiceHistory } from "../../services/reportService";
import Button from "../common/Button";
import DateRangePicker from "../common/DateRangePicker";
import { format } from "date-fns";

/**
 * ServiceHistory Component
 *
 * Displays vehicle service history with:
 * - Date range filtering
 * - Service type breakdown
 * - Technician performance
 */
const ServiceHistory = ({
  vehicleId,
  startDate: initialStartDate,
  endDate: initialEndDate,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start:
      initialStartDate ||
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    end: initialEndDate || new Date(),
  });

  // Fetch service history when date range or vehicleId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const historyData = await getServiceHistory(
          vehicleId,
          dateRange.start.toISOString().split("T")[0],
          dateRange.end.toISOString().split("T")[0]
        );
        setData(historyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchData();
    }
  }, [vehicleId, dateRange]);

  /**
   * Handle date range change
   * @param {Object} range - New date range { start, end }
   */
  const handleDateChange = (range) => {
    setDateRange(range);
  };

  if (loading)
    return <div className="text-center py-8">Loading service history...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!vehicleId)
    return <div className="text-center py-8">No vehicle selected</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-medium text-gray-900">Service History</h2>
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={handleDateChange}
        />
      </div>

      {data.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No service records found for this period.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Service History Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(service.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="font-medium">{service.type}</div>
                      <div className="text-gray-500 text-xs">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.technician}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.duration} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${service.cost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          service.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : service.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Total Services
              </h3>
              <p className="text-2xl font-semibold">{data.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Total Cost
              </h3>
              <p className="text-2xl font-semibold">
                $
                {data
                  .reduce((sum, service) => sum + service.cost, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Avg. Time
              </h3>
              <p className="text-2xl font-semibold">
                {data.length > 0
                  ? (
                      data.reduce((sum, service) => sum + service.duration, 0) /
                      data.length
                    ).toFixed(1)
                  : 0}{" "}
                hours
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceHistory;
