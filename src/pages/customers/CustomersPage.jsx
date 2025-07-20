import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomers  from "../../hooks/useCustomers";
import CustomerTable from "../../components/customers/CustomerTable";
import SearchInput from "../../components/common/SearchInput";
import Modal from "../../components/common/Modal";
import CustomerForm from "../../components/customers/CustomerForm";
import Button from "../../components/common/Button";

/**
 * Customers Page Component
 *
 * Displays and manages the list of customers
 */
const CustomersPage = () => {
  const { customers, loading, error, deleteCustomer } = useCustomers();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer) => {
    navigate(`/customers/${customer.id}`);
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          Add New Customer
        </Button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search customers..."
      />

      {error && <div className="text-red-500">{error}</div>}

      <CustomerTable
        customers={filteredCustomers}
        onRowClick={handleViewCustomer}
        loading={loading}
      />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Customer"
      >
        <CustomerForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
};

export default CustomersPage;
