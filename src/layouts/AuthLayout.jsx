import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            AutoCare Pro
          </Link>
          <nav>
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Back to Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
