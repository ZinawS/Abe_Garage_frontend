import { useState } from "react";
import useInventory from "../../hooks/useInventory";
import InventoryTable from "../../components/inventory/InventoryTable";
import SearchInput from "../../components/common/SearchInput";
import Modal from "../../components/common/Modal";
import InventoryForm from "../../components/inventory/InventoryForm";
import Button from "../../components/common/Button";

/**
 * Inventory Page Component
 *
 * Displays and manages inventory items
 */
const InventoryPage = () => {
  const { inventory, loading, error, deleteItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      await deleteItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <Button onClick={() => setShowCreateModal(true)}>Add New Item</Button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search inventory..."
      />

      {error && <div className="text-red-500">{error}</div>}

      <InventoryTable inventory={filteredInventory} loading={loading} />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Inventory Item"
      >
        <InventoryForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
};

export default InventoryPage;
