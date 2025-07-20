import api from "./api";

/**
 * Auth Service - Exported Functions
 *
 * Handles all authentication-related API calls
 */

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: Object, token: string}>}
 */
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (!response.data?.token || !response.data?.user) {
      throw new Error("Login incomplete - missing token or user data");
    }

    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    let errorMessage = "Login failed. Please try again.";

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = "Invalid email or password";
          break;
        case 403:
          errorMessage = "Account not verified. Please check your email.";
          break;
      }
    }

    throw new Error(errorMessage);
  }
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);

    if (error.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    }

    throw new Error("Failed to load user profile");
  }
};

/**
 * Register new user
 * @param {Object} userData - {email, password, name, etc.}
 * @returns {Promise<{user: Object, token: string}>}
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    if (!response.data?.token || !response.data?.user) {
      throw new Error("Registration incomplete - missing token or user data");
    }

    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    let errorMessage = "Registration failed. Please try again.";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage =
            error.response.data?.message || "Invalid registration data";
          break;
        case 409:
          errorMessage = "Email already registered";
          break;
      }
    }

    throw new Error(errorMessage);
  }
};

/**
 * Request password reset email
 * @param {string} email
 * @returns {Promise<void>}
 */
export const requestPasswordReset = async (email) => {
  try {
    await api.post("/auth/request-password-reset", { email });
  } catch (error) {
    let errorMessage = "Failed to send reset email";

    if (error.response?.status === 404) {
      errorMessage = "No account found with this email";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Reset password with token
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (token, newPassword) => {
  try {
    await api.post("/auth/reset-password", { token, newPassword });
  } catch (error) {
    let errorMessage = "Password reset failed";

    if (error.response?.status === 400) {
      errorMessage = "Invalid or expired reset token";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Verify email with token
 * @param {string} token
 * @returns {Promise<void>}
 */
export const verifyEmail = async (token) => {
  try {
    await api.post("/auth/verify-email", { token });
  } catch (error) {
    let errorMessage = "Email verification failed";

    if (error.response?.status === 400) {
      errorMessage = "Invalid or expired verification token";
    }

    throw new Error(errorMessage);
  }
};

// Optionally you can also export as default object
const authService = {
  login,
  logout,
  getCurrentUser,
  register,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
};

export default authService;
