import React from "react";
import { format } from "date-fns";
import { FiPrinter } from "react-icons/fi";
import Button from "../common/Button";

/**
 * InvoicePrintView Component
 *
 * Optimized for printing with:
 * - Clean layout
 * - Print-specific styling
 * - No interactive elements when printed
 */
const InvoicePrintView = ({ invoice }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Print button (hidden when printing) */}
      <div className="print:hidden mb-4">
        <Button variant="primary" icon={<FiPrinter />} onClick={handlePrint}>
          Print Invoice
        </Button>
      </div>

      {/* Invoice header */}
      <div className="flex justify-between items-start mb-8 print:mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">#{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            <span className="font-medium">Date:</span>{" "}
            {format(new Date(invoice.date), "MMM d, yyyy")}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Due:</span>{" "}
            {format(new Date(invoice.dueDate), "MMM d, yyyy")}
          </p>
        </div>
      </div>

      {/* Bill to / From */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:grid-cols-2 print:gap-4 print:mb-4">
        <div className="bg-gray-50 p-4 rounded-lg print:bg-transparent print:p-0">
          <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
          <p className="font-medium">{invoice.customer.name}</p>
          {invoice.customer.address && (
            <p className="text-gray-600">{invoice.customer.address}</p>
          )}
          <p className="text-gray-600">{invoice.customer.email}</p>
          <p className="text-gray-600">{invoice.customer.phone}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg print:bg-transparent print:p-0">
          <h3 className="text-lg font-semibold mb-2">From:</h3>
          <p className="font-medium">AutoRex Automotive Services</p>
          <p className="text-gray-600">123 Garage Lane, Auto City, AC 12345</p>
          <p className="text-gray-600">contact@autorex.com</p>
          <p className="text-gray-600">(555) 123-4567</p>
        </div>
      </div>

      {/* Invoice items */}
      <div className="mb-8 print:mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 print:bg-transparent">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
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
        <div className="w-full md:w-64 space-y-2 print:w-64">
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

      {/* Payment status */}
      <div
        className={`mt-8 p-4 rounded-lg ${
          invoice.status === "paid"
            ? "bg-green-50 text-green-800"
            : "bg-yellow-50 text-yellow-800"
        } print:mt-4`}
      >
        <h3 className="font-medium">
          {invoice.status === "paid"
            ? "Payment Received - Thank You!"
            : "Payment Due Upon Receipt"}
        </h3>
        {invoice.status !== "paid" && (
          <p className="text-sm mt-1">
            Please make checks payable to AutoRex Automotive Services
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 print:mt-6 print:pt-3">
        <p>Thank you for your business!</p>
        <p className="mt-1">
          Questions? Contact us at contact@autorex.com or call (555) 123-4567
        </p>
      </div>
    </div>
  );
};

export default InvoicePrintView;
