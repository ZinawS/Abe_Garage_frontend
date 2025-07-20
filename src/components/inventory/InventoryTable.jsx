import Table from "../common/Table";

/**
 * Inventory Table Component
 *
 * Displays a table of inventory items with sorting and selection capabilities
 *
 * @param {Object} props - Component props
 * @param {Array} props.inventory - Array of inventory items
 * @param {Function} [props.onSelect] - Callback when items are selected
 * @param {Array} [props.selectedItems] - Array of selected item IDs
 * @param {Function} [props.onRowClick] - Callback when a row is clicked
 * @param {boolean} [props.loading] - Loading state indicator
 * @param {Object} [props.sortConfig] - Current sort configuration
 * @param {Function} [props.onSort] - Callback when sorting changes
 * @returns {JSX.Element} Inventory table
 */
const InventoryTable = ({
  inventory,
  onSelect,
  selectedItems = [],
  onRowClick,
  loading,
  sortConfig,
  onSort,
}) => {
  const columns = [
    {
      key: "name",
      header: "Item Name",
      sortable: true,
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
    },
    {
      key: "quantity",
      header: "Quantity",
      sortable: true,
      render: (item) => (
        <span
          className={`font-medium ${
            item.quantity < item.lowStockThreshold
              ? "text-red-600"
              : "text-gray-900"
          }`}
        >
          {item.quantity} {item.unit}
        </span>
      ),
    },
    {
      key: "price",
      header: "Unit Price",
      sortable: true,
      render: (item) => <span>${item.price.toFixed(2)}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.quantity === 0
              ? "bg-red-100 text-red-800"
              : item.quantity < item.lowStockThreshold
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {item.quantity === 0
            ? "Out of Stock"
            : item.quantity < item.lowStockThreshold
              ? "Low Stock"
              : "In Stock"}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={inventory}
      onRowClick={onRowClick}
      loading={loading}
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={!!onSelect}
      onSelect={onSelect}
      selectedRows={selectedItems}
    />
  );
};

export default InventoryTable;
