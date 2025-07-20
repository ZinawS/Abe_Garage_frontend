import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useInvoices  from '../../hooks/useInvoices';
import Invoice from '../../components/billing/Invoice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/**
 * Invoice Page Component
 * 
 * Displays a single invoice with details
 */
const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentInvoice, getInvoiceById, loading, error } = useInvoices();

  useEffect(() => {
    if (id) {
      getInvoiceById(id);
    }
  }, [id, getInvoiceById]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!currentInvoice) return <div>Invoice not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoice #{currentInvoice.invoiceNumber}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Invoices
        </button>
      </div>
      
      <Invoice invoice={currentInvoice} />
    </div>
  );
};

export default InvoicePage;