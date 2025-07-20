import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../../hooks/useEmployees";
import EmployeeTable from "../../components/employees/EmployeeTable";
import SearchInput from "../../components/common/SearchInput";
import Modal from "../../components/common/Modal";
import EmployeeForm from "../../components/employees/EmployeeForm";
import Button from "../../components/common/Button";

/**
 * Employees Page Component
 *
 * Displays and manages the list of employees
 */
const EmployeesPage = () => {
  const { employees, loading, error, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEmployee = (employee) => {
    // In a real app, you might have an employee detail page
    // navigate(`/employees/${employee.id}`);
    console.log("View employee:", employee);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          Add New Employee
        </Button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search employees..."
      />

      {error && <div className="text-red-500">{error}</div>}

      <EmployeeTable
        employees={filteredEmployees}
        onRowClick={handleViewEmployee}
        loading={loading}
      />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Employee"
      >
        <EmployeeForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
};

export default EmployeesPage;
