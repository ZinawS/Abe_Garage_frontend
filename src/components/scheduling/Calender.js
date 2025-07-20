// src/components/scheduling/Calendar.js
import React, { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import Button from "../common/Button";

const Calendar = ({ appointments, onAddAppointment, onSelectAppointment }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    customerId: "",
    vehicleId: "",
    serviceId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    notes: "",
  });

  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const handleAddAppointment = () => {
    onAddAppointment({
      ...newAppointment,
      date: format(selectedDate, "yyyy-MM-dd"),
    });
    setShowAddForm(false);
    setNewAppointment({
      customerId: "",
      vehicleId: "",
      serviceId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      notes: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")} - Week{" "}
          {Math.ceil(
            (currentDate.getDate() +
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
              ).getDay()) /
              7
          )}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handlePrevWeek}
            icon={<FiChevronLeft />}
          />
          <Button
            variant="outline"
            onClick={handleNextWeek}
            icon={<FiChevronRight />}
          />
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            icon={<FiPlus />}
          >
            Add Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day) => (
          <div
            key={day.toString()}
            onClick={() => handleDateSelect(day)}
            className={`p-2 text-center cursor-pointer rounded-md ${isSameDay(day, selectedDate) ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            <div className="font-medium">{format(day, "EEE")}</div>
            <div>{format(day, "d")}</div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="text-lg font-medium mb-3">New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer
              </label>
              <select
                value={newAppointment.customerId}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    customerId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select customer</option>
                {/* Populate with customers */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle
              </label>
              <select
                value={newAppointment.vehicleId}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    vehicleId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select vehicle</option>
                {/* Populate with vehicles */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                value={newAppointment.serviceId}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    serviceId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select service</option>
                {/* Populate with services */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddAppointment}>
              Save Appointment
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Appointments for {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        {appointments
          .filter((appt) => isSameDay(new Date(appt.date), selectedDate))
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => onSelectAppointment(appointment)}
              className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between">
                <span className="font-medium">{appointment.time}</span>
                <span>{appointment.customerName}</span>
                <span>{appointment.serviceName}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendar;
