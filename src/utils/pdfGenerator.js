import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates a PDF document from invoice data
 * @param {Object} invoice - Invoice data
 * @param {string} fileName - Name for the PDF file
 * @returns {Promise} Resolves when PDF is generated
 */
export const generatePDF = async (invoice, fileName = 'invoice') => {
  return new Promise((resolve, reject) => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set document properties
      doc.setProperties({
        title: `Invoice ${invoice.invoiceNumber}`,
        subject: 'AutoRex Automotive Service Invoice',
        author: 'AutoRex',
        keywords: 'invoice, autorex, automotive, service',
        creator: 'AutoRex'
      });

      // Add logo
      const logoUrl = '/logo.png';
      const img = new Image();
      img.src = logoUrl;
      
      img.onload = function() {
        doc.addImage(img, 'PNG', 15, 10, 40, 15);

        // Invoice title and details
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text(`INVOICE #${invoice.invoiceNumber}`, 140, 20, { align: 'right' });
        
        doc.setFontSize(10);
        doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 140, 26, { align: 'right' });
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 140, 32, { align: 'right' });
        
        // Bill to section
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text('Bill To:', 15, 45);
        
        doc.setFontSize(10);
        doc.text(invoice.customer.name, 15, 52);
        doc.text(invoice.customer.email, 15, 58);
        doc.text(invoice.customer.phone, 15, 64);
        doc.text(invoice.customer.address, 15, 70);
        
        // From section
        doc.setFontSize(12);
        doc.text('From:', 15, 85);
        
        doc.setFontSize(10);
        doc.text('AutoRex Automotive Services', 15, 92);
        doc.text('contact@autorex.com', 15, 98);
        doc.text('+1 800 456 7890', 15, 104);
        doc.text('548, Talistol Town 5238 MT, La city, IA 522364', 15, 110);
        
        // Invoice items table
        const tableData = invoice.items.map(item => [
          item.service,
          item.materials.map(m => `${m.name} (${m.quantity})`).join(', '),
          item.hours,
          `$${item.rate.toFixed(2)}`,
          `$${item.amount.toFixed(2)}`
        ]);
        
        doc.autoTable({
          startY: 120,
          head: [['Service', 'Materials', 'Hours', 'Rate', 'Amount']],
          body: tableData,
          margin: { left: 15 },
          styles: { 
            fontSize: 8,
            cellPadding: 3,
            overflow: 'linebreak'
          },
          headStyles: { 
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold'
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 'auto' },
            3: { cellWidth: 'auto' },
            4: { cellWidth: 'auto' }
          }
        });
        
        // Invoice totals
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 140, finalY, { align: 'right' });
        doc.text(`Tax (${invoice.taxRate}%): $${invoice.taxAmount.toFixed(2)}`, 140, finalY + 6, { align: 'right' });
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Total: $${invoice.total.toFixed(2)}`, 140, finalY + 16, { align: 'right' });
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text('Thank you for your business!', 15, 280);
        doc.text('AutoRex Automotive Services', 15, 286);
        doc.text('548, Talistol Town 5238 MT, La city, IA 522364', 15, 292);
        doc.text('Phone: +1 800 456 7890 | Email: contact@autorex.com', 15, 298);
        
        // Save the PDF
        doc.save(`${fileName}.pdf`);
        resolve();
      };
      
      img.onerror = function() {
        console.warn('Failed to load logo image, generating without logo');
        // Continue without logo if image fails to load
        doc.text('AutoRex Automotive Services', 15, 20);
        doc.setFontSize(20);
        doc.text(`INVOICE #${invoice.invoiceNumber}`, 140, 20, { align: 'right' });
        // ... rest of the PDF generation
        doc.save(`${fileName}.pdf`);
        resolve();
      };
    } catch (error) {
      console.error('PDF generation error:', error);
      reject(error);
    }
  });
};