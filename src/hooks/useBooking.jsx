import { useState, useEffect, useCallback } from 'react';
import bookService from '../services/bookingService';
import { format, parseISO } from 'date-fns';

const useBooking = () => {
  const [dailyCapacity, setDailyCapacity] = useState(10); // Default capacity
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Load daily capacity
  const loadDailyCapacity = useCallback(async () => {
    try {
      setIsLoading(true);
      const capacity = await bookService.getDailyCapacity();
      setDailyCapacity(capacity.maxDailyBookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load bookings for a specific date
  const loadBookings = useCallback(async (date) => {
    try {
      setIsLoading(true);
      const bookingsData = await bookService.getBookingsByDate(date);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check available slots for a date considering capacity
  const checkAvailability = useCallback(async (date) => {
    try {
      setIsLoading(true);
      const [slotsData, bookingsData] = await Promise.all([
        bookService.getAvailableSlots(date),
        bookService.getBookingsByDate(date)
      ]);

      // Filter slots based on remaining capacity
      const remainingCapacity = dailyCapacity - bookingsData.length;
      const filteredSlots = slotsData.filter((_, index) => index < remainingCapacity);
      
      setAvailableSlots(filteredSlots);
      return filteredSlots;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [dailyCapacity]);

  // Create a new booking
  const createBooking = useCallback(async (bookingData) => {
    try {
      setIsLoading(true);
      
      // First check availability
      const available = await checkAvailability(bookingData.date);
      if (available.length === 0) {
        throw new Error('No available slots for this date');
      }

      // Proceed with booking creation
      const newBooking = await bookService.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkAvailability]);

  // Update booking status
  const updateBookingStatus = useCallback(async (bookingId, status) => {
    try {
      setIsLoading(true);
      const updatedBooking = await bookService.updateBookingStatus(bookingId, status);
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? updatedBooking : booking
        )
      );
      return updatedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get booking by ID
  const getBookingById = useCallback((bookingId) => {
    return bookings.find(booking => booking.id === bookingId);
  }, [bookings]);

  // Initialize
  useEffect(() => {
    loadDailyCapacity();
  }, [loadDailyCapacity]);

  return {
    dailyCapacity,
    bookings,
    availableSlots,
    isLoading,
    error,
    loadBookings,
    checkAvailability,
    createBooking,
    updateBookingStatus,
    getBookingById
  };
};

export default useBooking;