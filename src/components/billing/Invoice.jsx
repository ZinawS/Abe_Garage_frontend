import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPrinter, FiMail, FiDownload, FiArrowLeft } from "react-icons/fi";
import { generatePDF } from "../../utils/pdfGenerator";
import billingService from "../../services/billingService";
import Button from "../common/Button";
import PaymentForm from "../payments/PaymentForm";
import { useNavigate } from "react-router-dom";

/**
 * Invoice Component
 *
 * Displays invoice details with options to:
 * - Print invoice
 * - Download as PDF
 * - Send via email
 * - Make payment (if unpaid)
 */
const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await billingService.getInvoiceById(id);
        setInvoice(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  /**
   * Handle print action
   * Opens browser print dialog
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Handle PDF download
   * Generates and downloads PDF version of invoice
   */
  const handleDownload = async () => {
    try {
      await generatePDF(invoice, `invoice_${invoice.invoiceNumber}`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to generate PDF");
    }
  };

  /**
   * Send invoice via email
   * Triggers backend email service
   */
  const handleSendEmail = async () => {
    try {
      await billingService.sendInvoiceEmail(invoice.id);
      alert("Invoice sent successfully!");
    } catch (err) {
      console.error("Failed to send email:", err);
      alert("Failed to send invoice email");
    }
  };

  // Loading state
  if (loading)
    return <div className="text-center py-8">Loading invoice...</div>;

  // Error state
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  // No invoice found
  if (!invoice)
    return <div className="text-center py-8">Invoice not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      {/* Header with navigation and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Button
          variant="outline"
          icon={<FiArrowLeft />}
          onClick={() => navigate(-1)}
          className="self-start"
        >
          Back
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" icon={<FiPrinter />} onClick={handlePrint}>
            Print
          </Button>
          <Button
            variant="outline"
            icon={<FiDownload />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button variant="primary" icon={<FiMail />} onClick={handleSendEmail}>
            Send Email
          </Button>
        </div>
      </div>

      {/* Invoice header */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            INVOICE #{invoice.invoiceNumber}
          </h2>
          <p className="text-gray-600">
            Date: {new Date(invoice.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              invoice.status === "paid"
                ? "bg-green-100 text-green-800"
                : invoice.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {invoice.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bill to and from sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
          <p className="font-medium">{invoice.customer.name}</p>
          <p className="text-gray-600">{invoice.customer.email}</p>
          <p className="text-gray-600">{invoice.customer.phone}</p>
          <p className="text-gray-600">{invoice.customer.address}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">From:</h3>
          <p className="font-medium">AutoRex Automotive Services</p>
          <p className="text-gray-600">contact@autorex.com</p>
          <p className="text-gray-600">+1 800 456 7890</p>
          <p className="text-gray-600">
            548, Talistol Town 5238 MT, La city, IA 522364
          </p>
        </div>
      </div>

      {/* Invoice items table */}
      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Materials
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.service}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.materials.map((material, i) => (
                    <div key={i} className="text-sm text-gray-500">
                      {material.name} (Qty: {material.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.rate.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice totals */}
      <div className="flex justify-end">
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tax ({invoice.taxRate}%):</span>
            <span>${invoice.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
            <span>Total:</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment section for unpaid invoices */}
      {invoice.status === "pending" && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Make Payment</h3>
          <PaymentForm invoiceId={invoice.id} amount={invoice.total} />
        </div>
      )}

      {/* Invoice footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">
          Please make payments payable to AutoRex Automotive Services
        </p>
        <p className="mt-4">
          Questions? Contact us at contact@autorex.com or call +1 800 456 7890
        </p>
      </div>
    </div>
  );
};

export default Invoice;
