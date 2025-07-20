import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiX} from 'react-icons/fi';
import Button from '../common/Button';

// List of common vehicle makes
const VEHICLE_MAKES = [
  'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet',
  'Chrysler', 'Dodge', 'Fiat', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti',
  'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda',
  'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Porsche', 'Ram',
  'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
];

/**
 * VehicleForm Component
 * 
 * Handles creating and editing vehicle information with:
 * - Make/model/year selection
 * - VIN validation
 * - Mileage tracking
 */
const VehicleForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData
  });
  
  const selectedMake = watch('make');

  // Sample models based on make (in a real app, this would come from an API)
  const getModelsForMake = (make) => {
    const modelsByMake = {
      'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Sienna'],
      'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Ridgeline'],
      'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Ranger', 'Bronco'],
      'Chevrolet': ['Silverado', 'Equinox', 'Tahoe', 'Camaro', 'Colorado', 'Traverse'],
      'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X7', 'Z4'],
      // Add more makes and models as needed
    };
    return modelsByMake[make] || [];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Make */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
            Make
          </label>
          <select
            id="make"
            {...register('make', { required: 'Make is required' })}
            className={`block w-full pl-3 pr-10 py-2 text-base border ${
              errors.make ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
          >
            <option value="">Select a make</option>
            {VEHICLE_MAKES.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
          {errors.make && (
            <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>
          )}
        </div>

        {/* Vehicle Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <select
            id="model"
            {...register('model', { required: 'Model is required' })}
            className={`block w-full pl-3 pr-10 py-2 text-base border ${
              errors.model ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
            disabled={!selectedMake}
          >
            <option value="">{selectedMake ? 'Select a model' : 'Select make first'}</option>
            {selectedMake && getModelsForMake(selectedMake).map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {errors.model && (
            <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
          )}
        </div>

        {/* Vehicle Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            id="year"
            {...register('year', { 
              required: 'Year is required',
              validate: value => {
                const year = parseInt(value);
                const currentYear = new Date().getFullYear();
                return (year >= 1980 && year <= currentYear + 1) || 'Invalid year';
              }
            })}
            className={`block w-full pl-3 pr-10 py-2 text-base border ${
              errors.year ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
          >
            <option value="">Select a year</option>
            {Array.from({ length: 30 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
          )}
        </div>

        {/* Vehicle Color */}
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            id="color"
            type="text"
            {...register('color')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g. Red, Blue, Black"
          />
        </div>

        {/* License Plate */}
        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
            License Plate
          </label>
          <input
            id="licensePlate"
            type="text"
            {...register('licensePlate')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="ABC1234"
          />
        </div>

        {/* VIN */}
        <div>
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
            VIN (Vehicle Identification Number)
          </label>
          <input
            id="vin"
            type="text"
            {...register('vin', {
              pattern: {
                value: /^[A-HJ-NPR-Z0-9]{17}$/i,
                message: 'Invalid VIN (must be 17 characters)'
              }
            })}
            className={`block w-full px-3 py-2 border ${
              errors.vin ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="1HGBH41JXMN109186"
          />
          {errors.vin && (
            <p className="mt-1 text-sm text-red-600">{errors.vin.message}</p>
          )}
        </div>

        {/* Mileage */}
        <div>
          <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
            Mileage
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="mileage"
              type="number"
              {...register('mileage', {
                min: {
                  value: 0,
                  message: 'Mileage must be positive'
                },
                max: {
                  value: 1000000,
                  message: 'Mileage seems too high'
                }
              })}
              className={`block w-full pl-3 pr-12 py-2 border ${
                errors.mileage ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="12345"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">mi</span>
            </div>
          </div>
          {errors.mileage && (
            <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          {...register('notes')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Any special notes about the vehicle..."
        />
      </div>

      {/* Form actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          icon={<FiX />}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          icon={<FiSave />}
        >
          Save Vehicle
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;