import { useState, useCallback } from 'react';
import bookingManagementService from '../services/bookingManagementService';

const useBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    startDate: null,
    endDate: null,
    search: null
  });

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingManagementService.getBookings(filters);
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateBookingStatus = useCallback(async (bookingId, status) => {
    try {
      setLoading(true);
      await bookingManagementService.updateBookingStatus(bookingId, status);
      await fetchBookings();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  const deleteBooking = useCallback(async (bookingId) => {
    try {
      setLoading(true);
      await bookingManagementService.deleteBooking(bookingId);
      await fetchBookings();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  const assignTechnician = useCallback(async (bookingId, technicianId) => {
    try {
      setLoading(true);
      await bookingManagementService.assignTechnician(bookingId, technicianId);
      await fetchBookings();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    filters,
    setFilters,
    fetchBookings,
    updateBookingStatus,
    deleteBooking,
    assignTechnician
  };
};

export default useBookingManagement;