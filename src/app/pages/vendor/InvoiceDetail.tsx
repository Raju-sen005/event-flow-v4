import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Download,
  Printer,
  CheckCircle,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Invoice } from '../../types/invoice';

export const InvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock invoice data
  const invoice: Invoice = {
    id: id || 'inv-1',
    invoiceNumber: 'INV-2025-001',
    invoiceDate: '2025-01-23',
    dueDate: '2025-01-25',
    status: 'paid',
    eventId: 'event-1',
    eventName: 'Singh Family Wedding',
    eventDate: '2025-02-14',
    paymentSlabId: 'slab-1',
    paymentSlabName: 'Booking Advance',
    vendorId: 'vendor-1',
    vendorName: 'Elite Photography Studio',
    vendorEmail: 'contact@elitephoto.com',
    vendorPhone: '+91 98765 43210',
    vendorAddress: 'Shop 12, Photography Plaza, Andheri West\nMumbai, Maharashtra - 400001\nIndia',
    vendorGSTIN: '27AABCU9603R1ZM',
    vendorPAN: 'AABCU9603R',
    customerId: 'customer-1',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram@email.com',
    customerPhone: '+91 98765 12345',
    customerAddress: 'A-123, Green Park Extension\nNew Delhi - 110016\nIndia',
    lineItems: [
      {
        id: 'item-1',
        description: 'Wedding Photography Services - Booking Advance (30%)',
        quantity: 1,
        unitPrice: 27000,
        amount: 27000
      }
    ],
    subtotal: 27000,
    platformFeePercentage: 10,
    platformFee: 2700,
    cgstPercentage: 9,
    cgst: 2187,
    sgstPercentage: 9,
    sgst: 2187,
    totalTax: 4374,
    totalAmount: 27000,
    paidAmount: 27000,
    balanceAmount: 0,
    paymentMethod: 'online',
    transactionId: 'TXN123456789',
    paymentDate: '2025-01-23',
    notes: 'Thank you for your business! We appreciate your prompt payment.',
    termsAndConditions: 'Payment terms: Net 30 days. Late payments subject to 2% monthly interest. All services are non-refundable after completion.',
    createdAt: '2025-01-23T14:30:00',
    updatedAt: '2025-01-23T14:30:00',
    generatedBy: 'system'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Actions Bar - Hidden in print */}
      <div className="print:hidden flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Invoices
        </button>
        <div className="flex gap-3">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-8 print:border-0 print:rounded-none print:shadow-none"
      >
        {/* Invoice Header */}
        <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-bold text-[#075056] mb-2">INVOICE</h1>
            <p className="text-2xl font-bold text-[#16232A]">{invoice.invoiceNumber}</p>
          </div>
          {invoice.status === 'paid' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg print:border print:border-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">PAID</span>
            </div>
          )}
        </div>

        {/* Vendor and Customer Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* From */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">From:</h3>
            <div className="space-y-1">
              <p className="font-bold text-[#16232A] text-lg">{invoice.vendorName}</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{invoice.vendorAddress}</p>
              <p className="text-sm text-gray-700">Phone: {invoice.vendorPhone}</p>
              <p className="text-sm text-gray-700">Email: {invoice.vendorEmail}</p>
              {invoice.vendorGSTIN && (
                <p className="text-sm text-gray-700">GSTIN: {invoice.vendorGSTIN}</p>
              )}
              {invoice.vendorPAN && (
                <p className="text-sm text-gray-700">PAN: {invoice.vendorPAN}</p>
              )}
            </div>
          </div>

          {/* To */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">To:</h3>
            <div className="space-y-1">
              <p className="font-bold text-[#16232A] text-lg">{invoice.customerName}</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{invoice.customerAddress}</p>
              <p className="text-sm text-gray-700">Phone: {invoice.customerPhone}</p>
              <p className="text-sm text-gray-700">Email: {invoice.customerEmail}</p>
              {invoice.customerGSTIN && (
                <p className="text-sm text-gray-700">GSTIN: {invoice.customerGSTIN}</p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-600 mb-1">Invoice Date</p>
            <p className="font-semibold text-[#16232A]">
              {new Date(invoice.invoiceDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Due Date</p>
            <p className="font-semibold text-[#16232A]">
              {new Date(invoice.dueDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Event</p>
            <p className="font-semibold text-[#16232A]">{invoice.eventName}</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead className="bg-[#075056] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Qty</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Unit Price</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoice.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 text-sm text-gray-700">{item.description}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 text-center">{item.quantity}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 text-right">
                    ₹{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#16232A] text-right">
                    ₹{item.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="flex justify-end mb-8">
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-700">Subtotal:</span>
              <span className="font-semibold text-[#16232A]">₹{invoice.subtotal.toLocaleString()}</span>
            </div>
            
            {invoice.cgst && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-700">CGST ({invoice.cgstPercentage}%):</span>
                <span className="text-sm text-gray-700">₹{invoice.cgst.toLocaleString()}</span>
              </div>
            )}
            
            {invoice.sgst && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-700">SGST ({invoice.sgstPercentage}%):</span>
                <span className="text-sm text-gray-700">₹{invoice.sgst.toLocaleString()}</span>
              </div>
            )}
            
            {invoice.igst && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-700">IGST ({invoice.igstPercentage}%):</span>
                <span className="text-sm text-gray-700">₹{invoice.igst.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Total Tax:</span>
              <span className="font-semibold text-[#16232A]">₹{invoice.totalTax.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between py-3 bg-[#075056] text-white px-4 rounded-lg">
              <span className="font-bold text-lg">Total Amount:</span>
              <span className="font-bold text-2xl">₹{invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {invoice.status === 'paid' && invoice.paymentDate && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">Payment Information</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-green-700">Payment Date:</p>
                <p className="font-semibold text-green-900">
                  {new Date(invoice.paymentDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-green-700">Payment Method:</p>
                <p className="font-semibold text-green-900 capitalize">{invoice.paymentMethod}</p>
              </div>
              {invoice.transactionId && (
                <div>
                  <p className="text-green-700">Transaction ID:</p>
                  <p className="font-semibold text-green-900">{invoice.transactionId}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-8">
            <h3 className="font-semibold text-[#16232A] mb-2">Notes:</h3>
            <p className="text-sm text-gray-700">{invoice.notes}</p>
          </div>
        )}

        {/* Terms and Conditions */}
        {invoice.termsAndConditions && (
          <div className="mb-8">
            <h3 className="font-semibold text-[#16232A] mb-2">Terms and Conditions:</h3>
            <p className="text-xs text-gray-600">{invoice.termsAndConditions}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            This is a system-generated invoice and does not require a signature.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Generated on {new Date(invoice.createdAt).toLocaleString('en-IN')}
          </p>
        </div>
      </motion.div>

      {/* Print-only page break */}
      <div className="hidden print:block page-break-after" />
    </div>
  );
};
