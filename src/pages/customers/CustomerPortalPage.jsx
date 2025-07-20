import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";
import CustomerInfoCard from "../../components/customers/CustomerInfoCard";
import VehicleList from "../../components/vehicles/VehicleList";

/**
 * Customer Portal Page Component
 *
 * Displays customer information and vehicles for logged-in customers
 */
const CustomerPortalPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Account</h1>

      <CustomerInfoCard customer={user} />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">My Vehicles</h2>

        {user.vehicles?.length > 0 ? (
          <VehicleList
            vehicles={user.vehicles}
            onRowClick={(vehicle) => navigate(`/vehicles/${vehicle.id}`)}
          />
        ) : (
          <p className="text-sm text-gray-500">No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPortalPage;
