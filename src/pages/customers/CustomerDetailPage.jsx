import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  useCustomers  from '../../hooks/useCustomers';
import CustomerInfoCard from '../../components/customers/CustomerInfoCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import VehicleList from '../../components/vehicles/VehicleList';
import Modal from '../../components/common/Modal';
import VehicleForm from '../../components/vehicles/VehicleForm';

/**
 * Customer Detail Page Component
 * 
 * Displays detailed information about a customer and their vehicles
 */
const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentCustomer, getCustomerById, loading, error } = useCustomers();
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  useEffect(() => {
    if (id) {
      getCustomerById(id);
    }
  }, [id, getCustomerById]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!currentCustomer) return <div>Customer not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Customers
        </button>
      </div>

      <CustomerInfoCard customer={currentCustomer} />

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Vehicles</h2>
          <button
            onClick={() => setShowVehicleForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Vehicle
          </button>
        </div>

        {currentCustomer.vehicles?.length > 0 ? (
          <VehicleList 
            vehicles={currentCustomer.vehicles} 
            onRowClick={(vehicle) => navigate(`/vehicles/${vehicle.id}`)}
          />
        ) : (
          <p className="text-sm text-gray-500">No vehicles found for this customer.</p>
        )}
      </div>

      <Modal
        isOpen={showVehicleForm}
        onClose={() => setShowVehicleForm(false)}
        title="Add New Vehicle"
      >
        <VehicleForm 
          customerId={currentCustomer.id}
          onSuccess={() => {
            setShowVehicleForm(false);
            getCustomerById(id); // Refresh customer data
          }}
        />
      </Modal>
    </div>
  );
};

export default CustomerDetailPage;