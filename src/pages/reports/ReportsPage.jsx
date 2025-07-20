import React, { useState } from "react";
import { FiDownload, FiPrinter, FiCalendar } from "react-icons/fi";
import FinancialReport from "../../components/reports/FinancialReport";
import ServiceHistoryReport from "../../components/reports/ServiceHistory";
import Button from "../../components/common/Button";
import { exportReport } from "../../services/reportService";

/**
 * ReportsPage Component
 *
 * Provides access to various business reports including:
 * - Financial reports
 * - Service history
 * - Inventory reports
 * - Export functionality
 */
const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState("financial");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });

  /**
   * Handle report export
   * @param {string} format - Export format (pdf, csv, xlsx)
   */
  const handleExport = async (format) => {
    try {
      await exportReport(
        activeReport,
        {
          startDate: dateRange.start.toISOString().split("T")[0],
          endDate: dateRange.end.toISOString().split("T")[0],
        },
        format
      );
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            icon={<FiDownload />}
            onClick={() => handleExport("pdf")}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            icon={<FiDownload />}
            onClick={() => handleExport("csv")}
          >
            CSV
          </Button>
          <Button
            variant="outline"
            icon={<FiDownload />}
            onClick={() => handleExport("xlsx")}
          >
            Excel
          </Button>
        </div>
      </div>

      {/* Date range selector */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Date Range:
            </span>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div>
              <label htmlFor="startDate" className="sr-only">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={dateRange.start.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange({
                    ...dateRange,
                    start: new Date(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mx-1">to</span>
              <label htmlFor="endDate" className="sr-only">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={dateRange.end.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: new Date(e.target.value) })
                }
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report selection */}
      <div className="mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveReport("financial")}
            className={`px-3 py-2 font-medium text-sm rounded-md ${
              activeReport === "financial"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Financial
          </button>
          <button
            onClick={() => setActiveReport("services")}
            className={`px-3 py-2 font-medium text-sm rounded-md ${
              activeReport === "services"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Service History
          </button>
          <button
            onClick={() => setActiveReport("inventory")}
            className={`px-3 py-2 font-medium text-sm rounded-md ${
              activeReport === "inventory"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Inventory
          </button>
        </nav>
      </div>

      {/* Report content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activeReport === "financial" && (
          <FinancialReport
            startDate={dateRange.start}
            endDate={dateRange.end}
          />
        )}
        {activeReport === "services" && (
          <ServiceHistoryReport
            startDate={dateRange.start}
            endDate={dateRange.end}
          />
        )}
        {activeReport === "inventory" && (
          <div className="p-6 text-center text-gray-500">
            Inventory report coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
