import React from "react";
import { useForm } from "react-hook-form";
import { FiTool, FiDollarSign, FiClock, FiSave, FiX } from "react-icons/fi";
import Button from "../common/Button";

// Categories for services
const SERVICE_CATEGORIES = [
  "Maintenance",
  "Repair",
  "Diagnostics",
  "Body Work",
  "Electrical",
  "Tires",
  "Brakes",
  "Engine",
  "Transmission",
];

/**
 * ServiceForm Component
 *
 * Handles creating and editing service information with:
 * - Pricing and duration
 * - Category assignment
 * - Required materials
 */
const ServiceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Convert numeric fields to numbers
      const processedData = {
        ...data,
        duration: Number(data.duration),
        price: Number(data.price),
        isPopular: data.isPopular === "true",
      };

      await onSubmit(processedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiTool className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Service name is required" })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="e.g. Oil Change, Brake Inspection"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`block w-full pl-3 pr-10 py-2 text-base border ${
              errors.category ? "border-red-300" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
          >
            <option value="">Select a category</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Duration (hours)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiClock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="duration"
              type="number"
              min="0.5"
              step="0.5"
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 0.5,
                  message: "Minimum duration is 0.5 hours",
                },
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.duration ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.price ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Popular Service */}
        <div>
          <label
            htmlFor="isPopular"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Popular Service
          </label>
          <select
            id="isPopular"
            {...register("isPopular")}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            className={`block w-full px-3 py-2 border ${
              errors.description ? "border-red-300" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="Detailed description of the service..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Technician Notes
          </label>
          <textarea
            id="notes"
            rows={2}
            {...register("notes")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Internal notes for technicians..."
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
          Save Service
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
