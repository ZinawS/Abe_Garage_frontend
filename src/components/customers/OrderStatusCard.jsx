import PropTypes from "prop-types";
import Card from "../common/Card";

// Card component to display customer-facing order status
function OrderStatusCard({ order }) {
  return (
    <Card title={`Order #${order.order_id}`}>
      <div className="space-y-2">
        <p>
          <strong>Date:</strong> {order.order_date}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {order.order_status.replace("_", " ").toUpperCase()}
        </p>
      </div>
    </Card>
  );
}

OrderStatusCard.propTypes = {
  order: PropTypes.shape({
    order_id: PropTypes.number,
    order_date: PropTypes.string,
    order_status: PropTypes.string,
  }).isRequired,
};

export default OrderStatusCard;
