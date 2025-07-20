import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import customerService  from "../services/customerService";

/**
 * useCustomers Hook
 *
 * Manages customer data and operations
 *
 * @returns {Object} Customers state and methods
 */
const useCustomers = () => {
  const { authToken } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getAllCustomers(authToken);
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getCustomerById(id, authToken);
      setCurrentCustomer(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customerData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.createCustomer(
        customerData,
        authToken
      );
      setCustomers((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, customerData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.updateCustomer(
        id,
        customerData,
        authToken
      );
      setCustomers((prev) => prev.map((c) => (c.id === id ? data : c)));
      if (currentCustomer?.id === id) {
        setCurrentCustomer(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await customerService.deleteCustomer(id, authToken);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      if (currentCustomer?.id === id) {
        setCurrentCustomer(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    currentCustomer,
    loading,
    error,
    fetchCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    setCurrentCustomer,
  };
};

export default useCustomers;
