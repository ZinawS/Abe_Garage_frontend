import { useState, useEffect } from "react";
import  useAuth  from "./useAuth";
import  billingService  from "../services/billingService";

/**
 * useInvoices Hook
 *
 * Manages invoice data and operations
 *
 * @returns {Object} Invoices state and methods
 */
const useInvoices = () => {
  const { authToken } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const fetchInvoices = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await billingService.getAllInvoices(authToken, filters);
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await billingService.getInvoiceById(id, authToken);
      setCurrentInvoice(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (invoiceData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await billingService.createInvoice(invoiceData, authToken);
      setInvoices((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateInvoice = async (id, invoiceData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await billingService.updateInvoice(
        id,
        invoiceData,
        authToken
      );
      setInvoices((prev) => prev.map((i) => (i.id === id ? data : i)));
      if (currentInvoice?.id === id) {
        setCurrentInvoice(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await billingService.deleteInvoice(id, authToken);
      setInvoices((prev) => prev.filter((i) => i.id !== id));
      if (currentInvoice?.id === id) {
        setCurrentInvoice(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendInvoice = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await billingService.sendInvoice(id, authToken);
      setInvoices((prev) => prev.map((i) => (i.id === id ? data : i)));
      if (currentInvoice?.id === id) {
        setCurrentInvoice(data);
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
    fetchInvoices();
  }, []);

  return {
    invoices,
    currentInvoice,
    loading,
    error,
    fetchInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    sendInvoice,
    setCurrentInvoice,
  };
};

export default useInvoices;
