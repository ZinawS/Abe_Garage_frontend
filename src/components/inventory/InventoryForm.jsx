import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPackage, FiDollarSign, FiSave, FiX } from "react-icons/fi";
import Button from "../common/Button";

// Categories for inventory items
const INVENTORY_CATEGORIES = [
  "Parts",
  "Fluids",
  "Tools",
  "Accessories",
  "Cleaning Supplies",
  "Office Supplies",
];

/**
 * InventoryForm Component
 *
 * Handles creating and editing inventory items with:
 * - Quantity tracking
 * - Low stock alerts
 * - Pricing information
 */
const InventoryForm = ({ initialData = {}, onSubmit, onCancel }) => {
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
        quantity: Number(data.quantity),
        price: Number(data.price),
        cost: Number(data.cost),
        lowStockThreshold: Number(data.lowStockThreshold),
      };

      await onSubmit(processedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Item Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Item name is required" })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="e.g. Oil Filter, Brake Pads"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            SKU (Stock Keeping Unit)
          </label>
          <input
            id="sku"
            type="text"
            {...register("sku")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Optional"
          />
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
            {...register("category")}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select a category</option>
            {INVENTORY_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="0"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: 0,
                message: "Quantity cannot be negative",
              },
            })}
            className={`block w-full px-3 py-2 border ${
              errors.quantity ? "border-red-300" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Low Stock Threshold */}
        <div>
          <label
            htmlFor="lowStockThreshold"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Low Stock Threshold
          </label>
          <input
            id="lowStockThreshold"
            type="number"
            min="0"
            {...register("lowStockThreshold", {
              required: "Threshold is required",
              min: {
                value: 0,
                message: "Threshold cannot be negative",
              },
            })}
            className={`block w-full px-3 py-2 border ${
              errors.lowStockThreshold ? "border-red-300" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.lowStockThreshold && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lowStockThreshold.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Selling Price
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

        {/* Cost */}
        <div>
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cost Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="cost"
              type="number"
              min="0"
              step="0.01"
              {...register("cost", {
                required: "Cost is required",
                min: {
                  value: 0,
                  message: "Cost cannot be negative",
                },
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.cost ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.cost && (
            <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p>
          )}
        </div>

        {/* Supplier */}
        <div className="md:col-span-2">
          <label
            htmlFor="supplier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Supplier
          </label>
          <input
            id="supplier"
            type="text"
            {...register("supplier")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Optional"
          />
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
            {...register("description")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Item description, specifications, etc."
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
          Save Item
        </Button>
      </div>
    </form>
  );
};

export default InventoryForm;
