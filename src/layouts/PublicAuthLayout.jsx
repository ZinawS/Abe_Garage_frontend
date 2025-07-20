import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const PublicAuthLayout = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  const handleToggle = () => {
    // Handle toggle logic if needed

    setShowLogin((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            AutoCare Pro
          </Link>
          <nav className="flex space-x-4">
            {showLogin ? (
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                onClick={handleToggle}
              >
                Sign In
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleToggle}
              >
                Register
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AutoCare Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicAuthLayout;
