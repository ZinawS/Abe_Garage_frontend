import { useState, useEffect } from "react";
import  useAuth  from "./useAuth";
import  vehicleService  from "../services/vehicleService";

/**
 * useVehicles Hook
 *
 * Manages vehicle data and operations
 *
 * @returns {Object} Vehicles state and methods
 */
const useVehicles = () => {
  const { authToken } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  const fetchVehicles = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleService.getAllVehicles(authToken, filters);
      setVehicles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getVehicleById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleService.getVehicleById(id, authToken);
      setCurrentVehicle(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (vehicleData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleService.createVehicle(vehicleData, authToken);
      setVehicles((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleService.updateVehicle(
        id,
        vehicleData,
        authToken
      );
      setVehicles((prev) => prev.map((v) => (v.id === id ? data : v)));
      if (currentVehicle?.id === id) {
        setCurrentVehicle(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleService.deleteVehicle(id, authToken);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      if (currentVehicle?.id === id) {
        setCurrentVehicle(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recordService = async (id, serviceData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleService.recordService(
        id,
        serviceData,
        authToken
      );
      setVehicles((prev) => prev.map((v) => (v.id === id ? data : v)));
      if (currentVehicle?.id === id) {
        setCurrentVehicle(data);
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
    fetchVehicles();
  }, []);

  return {
    vehicles,
    currentVehicle,
    loading,
    error,
    fetchVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    recordService,
    setCurrentVehicle,
  };
};

export default useVehicles;
