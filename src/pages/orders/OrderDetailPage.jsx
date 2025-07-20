import React from "react";
import { FiPackage } from "react-icons/fi";
import useOrder  from "../../hooks/useOrders";
import useSocket  from "../../hooks/useSocket";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import Card from "../../components/common/Card";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { formatDate } from "../../utils/formatters";

// Page to display detailed information about a specific order
function OrderDetailPage() {
  const { order, loading, error } = useOrder();
  const { messages } = useSocket();

  // Handle real-time updates (e.g., status changes)
  React.useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.order_id === order?.order_id) {
      // Update order status if needed (simplified example)
      console.log("Received WebSocket update:", latestMessage);
    }
  }, [messages, order]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <Card title="Error">
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <Card title="Order Not Found">
          <p>No order found with the specified ID.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order #{order.order_id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Order Details">
          <div className="space-y-2">
            <p>
              <strong>Customer ID:</strong> {order.customer_id}
            </p>
            <p>
              <strong>Employee ID:</strong> {order.employee_id}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.order_date)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <OrderStatusBadge status={order.order_status} />
            </p>
            <FiPackage className="text-primary w-6 h-6" />
          </div>
        </Card>
        <Card title="Related Information">
          <p>
            <strong>Notes:</strong> {order.notes || "No notes available"}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetailPage;
