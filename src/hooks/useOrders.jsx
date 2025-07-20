import { useState, useEffect } from "react";
import  useAuth  from "./useAuth";
import orderService  from "../services/orderService";

/**
 * useOrders Hook
 *
 * Manages order data and operations
 *
 * @returns {Object} Orders state and methods
 */
const useOrders = () => {
  const { authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrders = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.getAllOrders(authToken, filters);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.getOrderById(id, authToken);
      setCurrentOrder(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.createOrder(orderData, authToken);
      setOrders((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, orderData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.updateOrder(id, orderData, authToken);
      setOrders((prev) => prev.map((o) => (o.id === id ? data : o)));
      if (currentOrder?.id === id) {
        setCurrentOrder(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await orderService.deleteOrder(id, authToken);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (currentOrder?.id === id) {
        setCurrentOrder(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.updateOrderStatus(id, status, authToken);
      setOrders((prev) => prev.map((o) => (o.id === id ? data : o)));
      if (currentOrder?.id === id) {
        setCurrentOrder(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    setCurrentOrder,
  };
};

export default useOrders;
