/**
 * Reusable Table Component
 *
 * Displays tabular data with sorting, pagination, and customizable columns
 *
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {Function} [props.onRowClick] - Callback when a row is clicked
 * @param {boolean} [props.loading=false] - Loading state indicator
 * @param {Object} [props.sortConfig] - Current sort configuration
 * @param {Function} [props.onSort] - Callback when sorting changes
 * @param {boolean} [props.selectable=false] - Whether rows are selectable
 * @param {Function} [props.onSelect] - Callback when selection changes
 * @param {Array} [props.selectedRows=[]] - Array of selected row IDs
 * @returns {JSX.Element} Data table component
 */
const Table = ({
  columns,
  data,
  onRowClick,
  loading = false,
  sortConfig,
  onSort,
  selectable = false,
  onSelect,
  selectedRows = [],
}) => {
  const handleSort = (key) => {
    if (!onSort) return;

    let direction = "ascending";
    if (sortConfig && sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }

    onSort({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (!onSelect) return;
    const allIds = data.map((item) => item.id);
    onSelect(e.target.checked ? allIds : []);
  };

  const handleSelectRow = (e, id) => {
    if (!onSelect) return;
    e.stopPropagation();

    if (e.target.checked) {
      onSelect([...selectedRows, id]);
    } else {
      onSelect(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length > 0 &&
                    selectedRows.length === data.length
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? "cursor-pointer hover:bg-gray-100" : ""}`}
                onClick={
                  column.sortable ? () => handleSort(column.key) : undefined
                }
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && sortConfig?.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-4 text-center"
              >
                <LoadingSpinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {selectable && (
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => handleSelectRow(e, item.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
