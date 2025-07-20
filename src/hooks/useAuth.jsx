import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * useAuth Hook
 *
 * Provides authentication state and methods from AuthContext
 *
 * @returns {Object} Auth context values
 * @throws {Error} If used outside AuthProvider
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
