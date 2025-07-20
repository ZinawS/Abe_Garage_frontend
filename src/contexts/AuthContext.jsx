import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService"; // Updated import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password);
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/");
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await authService.register(userData);
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/");
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.message };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await authService.requestPasswordReset(email);
      return { success: true };
    } catch (error) {
      console.error("Password reset request failed:", error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authService.resetPassword(token, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Password reset failed:", error);
      return { success: false, error: error.message };
    }
  };

  const verifyEmail = async (token) => {
    try {
      await authService.verifyEmail(token);
      return { success: true };
    } catch (error) {
      console.error("Email verification failed:", error);
      return { success: false, error: error.message };
    }
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    hasRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
