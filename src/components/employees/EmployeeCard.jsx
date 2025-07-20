/**
 * Employee Card Component
 *
 * Displays a summary of employee information in a card format
 *
 * @param {Object} props - Component props
 * @param {Object} props.employee - Employee data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @param {Function} [props.onViewSchedule] - Callback when view schedule button is clicked
 * @returns {JSX.Element} Employee information card
 */
const EmployeeCard = ({ employee, onEdit, onViewSchedule }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {employee.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-sm text-gray-900">{employee.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Hire Date</p>
            <p className="text-sm text-gray-900">
              {new Date(employee.hireDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-sm text-gray-900">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  employee.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {employee.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        {onViewSchedule && (
          <button
            onClick={() => onViewSchedule(employee)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Schedule
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(employee)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
