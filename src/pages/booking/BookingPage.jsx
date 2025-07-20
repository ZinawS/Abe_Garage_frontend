import React, { useState, useEffect } from "react";
import { format, parseISO, addDays, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiX,
  FiUser,
//   FaCar,
  FiTool,
  FiClock,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import useBooking from "../../hooks/useBooking";
import Notification from "../../components/common/Notification";

const BookingPage = () => {
  // Sample data - replace with your actual data sources
  const customers = [
    { id: "1", name: "John Doe", email: "john@example.com", phone: "555-0101" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-0102",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "555-0103",
    },
  ];

  const vehicles = [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: "2020",
      license: "ABC123",
      ownerId: "1",
    },
    {
      id: "2",
      make: "Honda",
      model: "Civic",
      year: "2019",
      license: "XYZ789",
      ownerId: "2",
    },
    {
      id: "3",
      make: "Ford",
      model: "F-150",
      year: "2021",
      license: "DEF456",
      ownerId: "3",
    },
  ];

  const services = [
    { id: "1", name: "Oil Change", duration: 30, price: 49.99 },
    { id: "2", name: "Brake Inspection", duration: 60, price: 89.99 },
    { id: "3", name: "Tire Rotation", duration: 45, price: 39.99 },
    { id: "4", name: "Full Service", duration: 120, price: 199.99 },
  ];

  const {
    dailyCapacity,
    bookings,
    availableSlots,
    isLoading,
    error,
    loadBookings,
    checkAvailability,
    createBooking,
    updateBookingStatus,
    getBookingById,
  } = useBooking();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    customerId: "",
    vehicleId: "",
    serviceId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    notes: "",
  });

  // Calculate remaining slots
  const remainingSlots = dailyCapacity - bookings.length;
  const isFullyBooked = remainingSlots <= 0;

  // Load bookings when date changes
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadBookings(selectedDate);
        await checkAvailability(selectedDate);
      } catch (err) {
        showNotification("error", "Failed to load bookings", err.message);
      }
    };

    loadData();
  }, [selectedDate, loadBookings, checkAvailability]);

  const handleDateChange = (days) => {
    setSelectedDate(addDays(selectedDate, days));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
      // Reset vehicle if customer changes
      ...(name === "customerId" && { vehicleId: "" }),
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const customer = customers.find(
        (c) => c.id === newAppointment.customerId
      );
      const service = services.find((s) => s.id === newAppointment.serviceId);
      const vehicle = vehicles.find((v) => v.id === newAppointment.vehicleId);

      if (!customer || !service || !vehicle) {
        throw new Error("Please complete all required fields");
      }

      const bookingData = {
        ...newAppointment,
        date: format(selectedDate, "yyyy-MM-dd"),
        customerName: customer.name,
        serviceName: service.name,
        vehicleInfo: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        status: "confirmed",
      };

      await createBooking(bookingData);

      showNotification(
        "success",
        "Booking confirmed",
        "Your appointment has been scheduled successfully"
      );
      setShowBookingForm(false);
      resetForm();
    } catch (err) {
      showNotification("error", "Booking failed", err.message);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "cancelled");
      showNotification(
        "success",
        "Booking cancelled",
        "The appointment has been cancelled"
      );
      setShowAppointmentDetails(false);
    } catch (err) {
      showNotification("error", "Cancellation failed", err.message);
    }
  };

  const resetForm = () => {
    setNewAppointment({
      customerId: "",
      vehicleId: "",
      serviceId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      notes: "",
    });
  };

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const getFilteredVehicles = () => {
    return newAppointment.customerId
      ? vehicles.filter((v) => v.ownerId === newAppointment.customerId)
      : vehicles;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Service Booking
        </h1>

        {/* Booking Summary Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h2>
              <p className="text-gray-600">
                {bookings.length} of {dailyCapacity} slots booked
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isFullyBooked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {isFullyBooked
                  ? "Fully Booked"
                  : `${remainingSlots} slots available`}
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleDateChange(-1)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={() => handleDateChange(1)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                disabled={isFullyBooked || isLoading}
                className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                  isFullyBooked || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                }`}
              >
                <FiPlus className="mr-2" />
                New Booking
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar and Appointments Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointments List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiClock className="mr-2" />
                  Today's Appointments
                </h2>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading appointments...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <FiAlertCircle className="mx-auto mb-2" size={24} />
                  {error}
                </div>
              ) : bookings.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No appointments scheduled for this day
                </div>
              ) : (
                <ul className="divide-y">
                  {bookings
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((booking) => (
                      <motion.li
                        key={booking.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setSelectedAppointment(booking);
                          setShowAppointmentDetails(true);
                        }}
                        className={`p-4 cursor-pointer transition-colors ${
                          booking.status === "cancelled"
                            ? "bg-gray-50 text-gray-400"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold">{booking.time}</div>
                            <div className="text-sm text-gray-600">
                              {booking.customerName}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-3">
                              <div className="font-medium">
                                {booking.serviceName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {booking.vehicleInfo}
                              </div>
                            </div>
                            {booking.status === "confirmed" ? (
                              <FaRegCheckCircle className="text-green-500" />
                            ) : (
                              <FaRegClock className="text-blue-500" />
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Add New Customer</span>
                  <FiUser />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Register Vehicle</span>
                  <FaCar />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>View All Appointments</span>
                  <FiCalendar />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
              <div className="space-y-4">
                {customers.slice(0, 3).map((customer) => (
                  <div key={customer.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {
                          vehicles.filter((v) => v.ownerId === customer.id)
                            .length
                        }{" "}
                        vehicles
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBookingForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">New Service Booking</h3>
                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmitBooking}>
                  <div className="space-y-4">
                    {/* Customer Selection */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FiUser className="mr-2" /> Customer *
                      </label>
                      <select
                        name="customerId"
                        value={newAppointment.customerId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select customer</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} ({customer.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vehicle Selection */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaCar className="mr-2" /> Vehicle *
                      </label>
                      <select
                        name="vehicleId"
                        value={newAppointment.vehicleId}
                        onChange={handleInputChange}
                        required
                        disabled={!newAppointment.customerId}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="">Select vehicle</option>
                        {getFilteredVehicles().map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {`${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.license})`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FiTool className="mr-2" /> Service *
                      </label>
                      <select
                        name="serviceId"
                        value={newAppointment.serviceId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (${service.price.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FiClock className="mr-2" /> Time Slot *
                      </label>
                      <select
                        name="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select time</option>
                        {availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {availableSlots.length === 0 && (
                        <p className="text-sm text-red-600 mt-1">
                          No available slots for this date
                        </p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FiCalendar className="mr-2" /> Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={newAppointment.notes}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Special requests or vehicle issues..."
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBookingForm(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || availableSlots.length === 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {showAppointmentDetails && selectedAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAppointmentDetails(false)}
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
                  <h3 className="text-xl font-bold">Appointment Details</h3>
                  <button
                    onClick={() => setShowAppointmentDetails(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAppointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : selectedAppointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedAppointment.status.charAt(0).toUpperCase() +
                      selectedAppointment.status.slice(1)}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {format(parseISO(selectedAppointment.date), "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedAppointment.time}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">
                          {selectedAppointment.customerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">
                          {customers.find(
                            (c) => c.id === selectedAppointment.customerId
                          )?.phone || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Vehicle Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-medium">
                          {selectedAppointment.vehicleInfo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">License Plate</p>
                        <p className="font-medium">
                          {vehicles.find(
                            (v) => v.id === selectedAppointment.vehicleId
                          )?.license || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Service Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">
                          {selectedAppointment.serviceName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Price</p>
                        <p className="font-medium">
                          $
                          {services
                            .find((s) => s.id === selectedAppointment.serviceId)
                            ?.price.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedAppointment.notes && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Notes</h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {selectedAppointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  {selectedAppointment.status !== "cancelled" && (
                    <>
                      <button
                        onClick={() => {
                          // Edit functionality would go here
                          setShowAppointmentDetails(false);
                          setNewAppointment({
                            customerId: selectedAppointment.customerId,
                            vehicleId: selectedAppointment.vehicleId,
                            serviceId: selectedAppointment.serviceId,
                            date: selectedAppointment.date,
                            time: selectedAppointment.time,
                            notes: selectedAppointment.notes || "",
                          });
                          setShowBookingForm(true);
                        }}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleCancelBooking(selectedAppointment.id)
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingPage;
