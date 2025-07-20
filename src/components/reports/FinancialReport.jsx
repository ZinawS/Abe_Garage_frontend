import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDownload } from 'react-icons/fi';
import { getFinancialReport } from '../../services/reportService';
import Button from '../common/Button';
import DateRangePicker from '../common/DateRangePicker';

/**
 * FinancialReport Component
 * 
 * Displays financial data with:
 * - Revenue and profit charts
 * - Date range filtering
 * - Data export functionality
 */
const FinancialReport = ({ startDate: initialStartDate, endDate: initialEndDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: initialStartDate || new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: initialEndDate || new Date()
  });

  // Fetch financial data when date range changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reportData = await getFinancialReport(
          dateRange.start.toISOString().split('T')[0],
          dateRange.end.toISOString().split('T')[0],
          'week'
        );
        setData(reportData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dateRange]);

  /**
   * Handle date range change
   * @param {Object} range - New date range { start, end }
   */
  const handleDateChange = (range) => {
    setDateRange(range);
  };

  /**
   * Handle data export
   * @param {string} format - Export format (pdf, csv, xlsx)
   */
  const handleExport = async (format) => {
    try {
      await exportReport('financial', {
        startDate: dateRange.start.toISOString().split('T')[0],
        endDate: dateRange.end.toISOString().split('T')[0]
      }, format);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading financial data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-medium text-gray-900">Financial Overview</h2>
        <div className="flex space-x-2">
          <DateRangePicker 
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={handleDateChange}
          />
          <Button 
            variant="outline" 
            icon={<FiDownload />}
            onClick={() => handleExport('pdf')}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-md font-medium mb-4">Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-md font-medium mb-4">Profit</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#10B981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-2xl font-semibold">
            ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Profit</h3>
          <p className="text-2xl font-semibold">
            ${data.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Profit Margin</h3>
          <p className="text-2xl font-semibold">
            {data.length > 0
              ? Math.round(
                  (data.reduce((sum, item) => sum + (item.profit / item.revenue), 0) / 
                  data.length) * 100
                ) : 0}%
          </p>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${row.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${row.cost.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${row.profit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Math.round((row.profit / row.revenue) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialReport;