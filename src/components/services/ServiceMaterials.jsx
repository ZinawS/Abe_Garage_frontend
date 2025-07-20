import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Button from "../common/Button";

const MaterialTracking = ({ serviceId, onMaterialsUpdate }) => {
  const [materials, setMaterials] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMaterial, setNewMaterial] = useState({
    itemId: "",
    quantity: 1,
    cost: 0,
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory");
        const data = await response.json();
        setInventoryItems(data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceMaterials = async () => {
      try {
        const response = await fetch(`/api/services/${serviceId}/materials`);
        const data = await response.json();
        setMaterials(data);
      } catch (err) {
        console.error("Error fetching service materials:", err);
      }
    };

    fetchInventory();
    fetchServiceMaterials();
  }, [serviceId]);

  const handleAddMaterial = async () => {
    try {
      const selectedItem = inventoryItems.find(
        (item) => item.id === newMaterial.itemId
      );

      const materialToAdd = {
        ...newMaterial,
        name: selectedItem.name,
        unitCost: selectedItem.cost,
      };

      const response = await fetch(`/api/services/${serviceId}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialToAdd),
      });

      const addedMaterial = await response.json();
      setMaterials([...materials, addedMaterial]);
      setNewMaterial({ itemId: "", quantity: 1, cost: 0 });

      if (onMaterialsUpdate) {
        onMaterialsUpdate([...materials, addedMaterial]);
      }
    } catch (err) {
      console.error("Error adding material:", err);
    }
  };

  const handleRemoveMaterial = async (materialId) => {
    try {
      await fetch(`/api/services/${serviceId}/materials/${materialId}`, {
        method: "DELETE",
      });

      const updatedMaterials = materials.filter((m) => m.id !== materialId);
      setMaterials(updatedMaterials);

      if (onMaterialsUpdate) {
        onMaterialsUpdate(updatedMaterials);
      }
    } catch (err) {
      console.error("Error removing material:", err);
    }
  };

  if (loading) return <div>Loading materials...</div>;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Materials Used</h3>

      <div className="mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Unit Cost
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.map((material) => (
              <tr key={material.id}>
                <td className="px-4 py-2 whitespace-nowrap">{material.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {material.quantity}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  ${material.unitCost.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  ${(material.quantity * material.unitCost).toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleRemoveMaterial(material.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item
          </label>
          <select
            value={newMaterial.itemId}
            onChange={(e) => {
              const selectedItem = inventoryItems.find(
                (item) => item.id === e.target.value
              );
              setNewMaterial({
                ...newMaterial,
                itemId: e.target.value,
                cost: selectedItem ? selectedItem.cost : 0,
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select item</option>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (${item.cost.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={newMaterial.quantity}
            onChange={(e) =>
              setNewMaterial({
                ...newMaterial,
                quantity: parseInt(e.target.value) || 1,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Cost
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={newMaterial.cost}
            onChange={(e) =>
              setNewMaterial({
                ...newMaterial,
                cost: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <Button
          onClick={handleAddMaterial}
          disabled={!newMaterial.itemId}
          variant="primary"
          size="sm"
          icon={<FiPlus />}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default MaterialTracking;
