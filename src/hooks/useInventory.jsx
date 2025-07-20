import { useState, useEffect } from "react";
import useAuth  from "./useAuth";
import inventoryService  from "../services/inventoryService";

/**
 * useInventory Hook
 *
 * Manages inventory data and operations
 *
 * @returns {Object} Inventory state and methods
 */
const useInventory = () => {
  const { authToken } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await inventoryService.getAllInventory(authToken);
      setInventory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getItemById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await inventoryService.getInventoryItemById(id, authToken);
      setCurrentItem(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await inventoryService.createInventoryItem(
        itemData,
        authToken
      );
      setInventory((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await inventoryService.updateInventoryItem(
        id,
        itemData,
        authToken
      );
      setInventory((prev) => prev.map((i) => (i.id === id ? data : i)));
      if (currentItem?.id === id) {
        setCurrentItem(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await inventoryService.deleteInventoryItem(id, authToken);
      setInventory((prev) => prev.filter((i) => i.id !== id));
      if (currentItem?.id === id) {
        setCurrentItem(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const restockItem = async (id, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const data = await inventoryService.restockInventoryItem(
        id,
        quantity,
        authToken
      );
      setInventory((prev) => prev.map((i) => (i.id === id ? data : i)));
      if (currentItem?.id === id) {
        setCurrentItem(data);
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
    fetchInventory();
  }, []);

  return {
    inventory,
    currentItem,
    loading,
    error,
    fetchInventory,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    restockItem,
    setCurrentItem,
  };
};

export default useInventory;
