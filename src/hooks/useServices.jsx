import { useState, useEffect } from "react";
import useAuth  from "./useAuth";
import serviceService  from "../services/serviceService";

/**
 * useServices Hook
 *
 * Manages service data and operations
 *
 * @returns {Object} Services state and methods
 */
const useServices = () => {
  const { authToken } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentService, setCurrentService] = useState(null);

  const fetchServices = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.getAllServices(authToken, filters);
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.getServiceById(id, authToken);
      setCurrentService(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.createService(serviceData, authToken);
      setServices((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id, serviceData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.updateService(
        id,
        serviceData,
        authToken
      );
      setServices((prev) => prev.map((s) => (s.id === id ? data : s)));
      if (currentService?.id === id) {
        setCurrentService(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await serviceService.deleteService(id, authToken);
      setServices((prev) => prev.filter((s) => s.id !== id));
      if (currentService?.id === id) {
        setCurrentService(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateServiceStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.updateServiceStatus(
        id,
        status,
        authToken
      );
      setServices((prev) => prev.map((s) => (s.id === id ? data : s)));
      if (currentService?.id === id) {
        setCurrentService(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addServiceMaterials = async (id, materials) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.addServiceMaterials(
        id,
        materials,
        authToken
      );
      setServices((prev) => prev.map((s) => (s.id === id ? data : s)));
      if (currentService?.id === id) {
        setCurrentService(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const startServiceTimer = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.startServiceTimer(id, authToken);
      setServices((prev) => prev.map((s) => (s.id === id ? data : s)));
      if (currentService?.id === id) {
        setCurrentService(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const stopServiceTimer = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.stopServiceTimer(id, authToken);
      setServices((prev) => prev.map((s) => (s.id === id ? data : s)));
      if (currentService?.id === id) {
        setCurrentService(data);
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
    fetchServices();
  }, []);

  return {
    services,
    currentService,
    loading,
    error,
    fetchServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    updateServiceStatus,
    addServiceMaterials,
    startServiceTimer,
    stopServiceTimer,
    setCurrentService,
  };
};

export default useServices;
