import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000/api";

const bookingManagementService = {
  async getBookings(filters = {}) {
    try {
      const params = {
        status: filters.status,
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString(),
        search: filters.search,
      };

      const response = await axios.get(`${API_BASE_URL}/bookings/manage`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error.response?.data?.message || "Failed to fetch bookings";
    }
  },

  async updateBookingStatus(bookingId, status) {
    try {
      await axios.patch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
        status,
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error.response?.data?.message || "Failed to update booking status";
    }
  },

  async deleteBooking(bookingId) {
    try {
      await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error.response?.data?.message || "Failed to delete booking";
    }
  },

  async assignTechnician(bookingId, technicianId) {
    try {
      await axios.patch(`${API_BASE_URL}/bookings/${bookingId}/technician`, {
        technicianId,
      });
    } catch (error) {
      console.error("Error assigning technician:", error);
      throw error.response?.data?.message || "Failed to assign technician";
    }
  },
};

export default bookingManagementService;
