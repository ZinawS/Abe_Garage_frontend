import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {  FiCalendar, FiSave, FiX } from "react-icons/fi";
import useCustomers  from "../../hooks/useCustomers";
import  useServices  from "../../hooks/useServices";
import Button from "../common/Button";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * OrderForm Component
 *
 * Handles creating and editing service orders with:
 * - Customer selection
 * - Vehicle selection
 * - Service selection
 * - Scheduling
 */
const OrderForm = ({ initialData = {}, onSuccess, onCancel }) => {
  const { customers, loading: customersLoading } = useCustomers();
  const { services, loading: servicesLoading } = useServices();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: initialData,
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepare customer options for select
  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
    customer,
  }));

  // Prepare vehicle options for select
  const vehicleOptions =
    selectedCustomer?.vehicles?.map((vehicle) => ({
      value: vehicle.id,
      label: `${vehicle.make} ${vehicle.model} (${vehicle.year}) - ${vehicle.licensePlate || "No Plate"}`,
      vehicle,
    })) || [];

  // Prepare service options for select
  const serviceOptions = services
    .filter((service) => service.isActive)
    .map((service) => ({
      value: service.id,
      label: `${service.name} ($${service.price})`,
      service,
    }));

  // Set form values when selections change
  useEffect(() => {
    if (selectedCustomer) {
      setValue("customerId", selectedCustomer.value);
    }
  }, [selectedCustomer, setValue]);

  useEffect(() => {
    if (selectedVehicle) {
      setValue("vehicleId", selectedVehicle.value);
    }
  }, [selectedVehicle, setValue]);

  useEffect(() => {
    setValue(
      "services",
      selectedServices.map((s) => s.value)
    );
  }, [selectedServices, setValue]);

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Process form data and call API
      const orderData = {
        ...data,
        scheduledDate: data.scheduledDate.toISOString(),
        customer: selectedCustomer.customer,
        vehicle: selectedVehicle.vehicle,
        services: selectedServices.map((s) => s.service),
      };

      // Here you would call your API to create/update the order
      console.log("Order data:", orderData);

      onSuccess();
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (customersLoading || servicesLoading) {
    return <div className="text-center py-4">Loading data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer
          </label>
          <Select
            options={customerOptions}
            value={selectedCustomer}
            onChange={setSelectedCustomer}
            placeholder="Select customer..."
            className="basic-select"
            classNamePrefix="select"
            isSearchable
            required
          />
        </div>

        {/* Vehicle Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle
          </label>
          <Select
            options={vehicleOptions}
            value={selectedVehicle}
            onChange={setSelectedVehicle}
            placeholder={
              selectedCustomer ? "Select vehicle..." : "Select customer first"
            }
            isDisabled={!selectedCustomer}
            className="basic-select"
            classNamePrefix="select"
            isSearchable
            required
          />
        </div>

        {/* Services Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          <Select
            options={serviceOptions}
            value={selectedServices}
            onChange={setSelectedServices}
            isMulti
            placeholder="Select services..."
            className="basic-multi-select"
            classNamePrefix="select"
            isSearchable
          />
        </div>

        {/* Scheduled Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scheduled Date
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={watch("scheduledDate")}
              onChange={(date) => setValue("scheduledDate", date)}
              minDate={new Date()}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.scheduledDate ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              required
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            {...register("priority")}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            {...register("notes")}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Any special instructions..."
          />
        </div>
      </div>

      {/* Form actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          icon={<FiX />}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          icon={<FiSave />}
          loading={isSubmitting}
        >
          Save Order
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
