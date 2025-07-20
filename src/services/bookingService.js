import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000/api";

const bookService = {
  // Get daily booking capacity
  getDailyCapacity: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings/capacity`);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily capacity:", error);
      throw error;
    }
  },

  // Check available slots for a date
  getAvailableSlots: async (date) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/bookings/availability`,
        {
          params: { date: formatDateForAPI(date) },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        bookingData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  // Get all bookings for a date
  getBookingsByDate: async (date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`, {
        params: { date: formatDateForAPI(date) },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/bookings/${bookingId}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },
};

// Helper function to format date for API
function formatDateForAPI(date) {
  return new Date(date).toISOString().split("T")[0];
}

export default bookService;
