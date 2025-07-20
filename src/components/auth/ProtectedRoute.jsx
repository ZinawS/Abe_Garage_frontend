import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";

/**
 * ProtectedRoute Component
 *
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Can optionally check for specific roles
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center py-8">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
