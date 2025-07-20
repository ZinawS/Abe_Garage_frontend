import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * DateRangePicker Component
 *
 * Provides a user-friendly interface for selecting date ranges with:
 * - Custom date formatting
 * - Preset date ranges
 * - Responsive design
 */
const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const [showPresets, setShowPresets] = useState(false);

  /**
   * Handle preset selection
   * @param {string} preset - Preset name (today, week, month, year)
   */
  const handlePreset = (preset) => {
    const today = new Date();
    let newStartDate,
      newEndDate = today;

    switch (preset) {
      case "today":
        newStartDate = new Date(today);
        newEndDate = new Date(today);
        break;
      case "week":
        newStartDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case "month":
        newStartDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case "year":
        newStartDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
      default:
        return;
    }

    onChange({ start: newStartDate, end: newEndDate });
    setShowPresets(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => onChange({ start: date, end: endDate })}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiCalendar className="absolute right-3 top-2 text-gray-400" />
        </div>
        <span className="text-gray-500">to</span>
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => onChange({ start: startDate, end: date })}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiCalendar className="absolute right-3 top-2 text-gray-400" />
        </div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiCalendar className="h-5 w-5" />
        </button>
      </div>

      {/* Preset dropdown */}
      {showPresets && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => handlePreset("today")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Today
            </button>
            <button
              onClick={() => handlePreset("week")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handlePreset("month")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => handlePreset("year")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Last 12 Months
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
