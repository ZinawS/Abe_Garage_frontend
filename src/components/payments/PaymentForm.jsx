import { useState } from 'react';

/**
 * Payment Form Component
 * 
 * Handles payment submission with validation and error handling
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} [props.onCancel] - Callback when form is cancelled
 * @param {Object} [props.initialData] - Initial form data for editing
 * @param {Array} props.invoices - Array of unpaid invoices for selection
 * @param {boolean} [props.loading] - Loading state indicator
 * @returns {JSX.Element} Payment form
 */
const PaymentForm = ({ onSubmit, onCancel, initialData, invoices, loading }) => {
  const [formData, setFormData] = useState({
    invoiceId: initialData?.invoiceId || '',
    amount: initialData?.amount || '',
    paymentMethod: initialData?.paymentMethod || 'credit_card',
    paymentDate: initialData?.paymentDate || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.invoiceId) newErrors.invoiceId = 'Invoice is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="invoiceId" className="block text-sm font-medium text-gray-700">
          Invoice
        </label>
        <select
          id="invoiceId"
          name="invoiceId"
          value={formData.invoiceId}
          onChange={handleChange}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
            errors.invoiceId ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
          disabled={!!initialData}
        >
          <option value="">Select an invoice</option>
          {invoices.map((invoice) => (
            <option key={invoice.id} value={invoice.id}>
              #{invoice.invoiceNumber} - {invoice.customerName} (${invoice.balanceDue.toFixed(2)} due)
            </option>
          ))}
        </select>
        {errors.invoiceId && <p className="mt-2 text-sm text-red-600">{errors.invoiceId}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`block w-full pl-7 pr-12 py-2 border ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
            placeholder="0.00"
          />
        </div>
        {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
            errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
        >
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="other">Other</option>
        </select>
        {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>}
      </div>

      <div>
        <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
          Payment Date
        </label>
        <input
          type="date"
          name="paymentDate"
          id="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.paymentDate ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
        />
        {errors.paymentDate && <p className="mt-2 text-sm text-red-600">{errors.paymentDate}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : initialData ? 'Update Payment' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;