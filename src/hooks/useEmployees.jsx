import { useState, useEffect } from "react";
import useAuth  from "./useAuth";
import  employeeService  from "../services/employeeService";

/**
 * useEmployees Hook
 *
 * Manages employee data and operations
 *
 * @returns {Object} Employees state and methods
 */
const useEmployees = () => {
  const { authToken } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.getAllEmployees(authToken);
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.getEmployeeById(id, authToken);
      setCurrentEmployee(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.createEmployee(
        employeeData,
        authToken
      );
      setEmployees((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, employeeData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.updateEmployee(
        id,
        employeeData,
        authToken
      );
      setEmployees((prev) => prev.map((e) => (e.id === id ? data : e)));
      if (currentEmployee?.id === id) {
        setCurrentEmployee(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await employeeService.deleteEmployee(id, authToken);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      if (currentEmployee?.id === id) {
        setCurrentEmployee(null);
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
    fetchEmployees();
  }, []);

  return {
    employees,
    currentEmployee,
    loading,
    error,
    fetchEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    setCurrentEmployee,
  };
};

export default useEmployees;
