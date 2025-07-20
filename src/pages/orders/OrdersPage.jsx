import React, { useState } from "react";
import { FiPlus, FiFilter, FiRefreshCw } from "react-icons/fi";
import OrderList from "../../components/orders/OrderList";
import Button from "../../components/common/Button";
import  useOrders  from "../../hooks/useOrders";
import Modal from "../../components/common/Modal";
import OrderForm from "../../components/orders/OrderForm";
import OrderStatusFilter from "../../components/orders/OrderStatusFilter";

/**
 * OrdersPage Component
 *
 * Manages service orders with:
 * - Status filtering
 * - Search capabilities
 * - Order creation
 * - Bulk actions
 */
const OrdersPage = () => {
  const { orders, loading, error, refreshOrders } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on status and search term
  const filteredOrders = orders
    .filter((order) => statusFilter === "all" || order.status === statusFilter)
    .filter(
      (order) =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vehicle.licensePlate
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
    );

  const handleRefresh = () => {
    refreshOrders();
  };

  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Service Orders</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            icon={<FiRefreshCw />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => setIsModalOpen(true)}
          >
            New Order
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <OrderStatusFilter
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        <OrderList orders={filteredOrders} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Service Order"
        size="xl"
      >
        <OrderForm
          onSuccess={() => {
            setIsModalOpen(false);
            refreshOrders();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default OrdersPage;
