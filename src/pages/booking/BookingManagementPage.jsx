import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiFilter, 
  FiSearch, 
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiUser,
  FiClock,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { FaCar, FaTools } from 'react-icons/fa';
import useBookingManagement from '../../hooks/useBookingManagement';
import Notification from '../../components/notifications/Notificat';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingManagementPage = () => {
  const {
    bookings,
    loading,
    error,
    filters,
    setFilters,
    fetchBookings,
    updateBookingStatus,
    deleteBooking,
    assignTechnician
  } = useBookingManagement();

  const [notification, setNotification] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [technicians, setTechnicians] = useState([
    { id: 'tech1', name: 'John Smith' },
    { id: 'tech2', name: 'Sarah Johnson' },
    { id: 'tech3', name: 'Mike Brown' }
  ]);

  useEffect(() => {
    fetchBookings();
  }, [filters]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      showNotification('success', 'Status updated', 'Booking status changed successfully');
    } catch (err) {
      showNotification('error', 'Update failed', err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBooking(selectedBooking.id);
      showNotification('success', 'Booking deleted', 'The booking was removed successfully');
      setShowDeleteConfirm(false);
      setSelectedBooking(null);
    } catch (err) {
      showNotification('error', 'Deletion failed', err.message);
    }
  };

  const handleAssignTechnician = async (bookingId, techId) => {
    try {
      await assignTechnician(bookingId, techId);
      showNotification('success', 'Technician assigned', 'Technician assignment updated');
    } catch (err) {
      showNotification('error', 'Assignment failed', err.message);
    }
  };

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Booking Management
          </h1>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value || null })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <DatePicker
                selected={filters.startDate}
                onChange={(date) => setFilters({ ...filters, startDate: date })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <DatePicker
                selected={filters.endDate}
                onChange={(date) => setFilters({ ...filters, endDate: date })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholderText="Select end date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Customer, vehicle..."
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                />
                <FiSearch className="absolute left-2 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading bookings...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Error loading bookings: {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No bookings found matching your criteria
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technician
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDetailsModal(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiClock className="mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiUser className="mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCar className="mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {booking.vehicleInfo}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaTools className="mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {booking.serviceName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[booking.status]}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.technicianId || ''}
                          onChange={(e) => handleAssignTechnician(booking.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Unassigned</option>
                          {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                              {tech.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                              setShowDeleteConfirm(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Booking Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Appointment Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {new Date(selectedBooking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{selectedBooking.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium capitalize">{selectedBooking.status}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{selectedBooking.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{selectedBooking.customerPhone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Vehicle Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-medium">{selectedBooking.vehicleInfo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">License Plate</p>
                        <p className="font-medium">{selectedBooking.licensePlate || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Service Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">{selectedBooking.serviceName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Price</p>
                        <p className="font-medium">${selectedBooking.servicePrice?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                      disabled={selectedBooking.status === 'confirmed'}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedBooking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 cursor-default'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                      disabled={selectedBooking.status === 'completed'}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedBooking.status === 'completed'
                          ? 'bg-blue-100 text-blue-800 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                      disabled={selectedBooking.status === 'cancelled'}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedBooking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 cursor-default'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Confirm Deletion</h3>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <p className="mb-6">
                  Are you sure you want to delete this booking for{' '}
                  <span className="font-semibold">{selectedBooking.customerName}</span> on{' '}
                  <span className="font-semibold">
                    {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                  </span>?
                </p>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingManagementPage;