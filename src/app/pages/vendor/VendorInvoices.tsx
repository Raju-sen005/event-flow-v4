import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Filter,
  Search,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Invoice, InvoiceStatus } from '../../types/invoice';

export const VendorInvoices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  // Mock invoices data
  const invoices: Invoice[] = [
    {
      id: 'inv-1',
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
      vendorAddress: 'Shop 12, Photography Plaza, Mumbai - 400001',
      vendorGSTIN: '27AABCU9603R1ZM',
      vendorPAN: 'AABCU9603R',
      customerId: 'customer-1',
      customerName: 'Vikram Singh',
      customerEmail: 'vikram@email.com',
      customerPhone: '+91 98765 12345',
      customerAddress: 'A-123, Green Park, Delhi - 110016',
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
      notes: 'Thank you for your business!',
      termsAndConditions: 'Payment terms: Net 30 days. Late payments subject to 2% monthly interest.',
      createdAt: '2025-01-23T14:30:00',
      updatedAt: '2025-01-23T14:30:00',
      generatedBy: 'system'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2025-002',
      invoiceDate: '2025-01-24',
      dueDate: '2025-02-07',
      status: 'issued',
      eventId: 'event-1',
      eventName: 'Singh Family Wedding',
      eventDate: '2025-02-14',
      paymentSlabId: 'slab-2',
      paymentSlabName: 'Pre-Event Payment',
      vendorId: 'vendor-1',
      vendorName: 'Elite Photography Studio',
      vendorEmail: 'contact@elitephoto.com',
      vendorPhone: '+91 98765 43210',
      vendorAddress: 'Shop 12, Photography Plaza, Mumbai - 400001',
      vendorGSTIN: '27AABCU9603R1ZM',
      vendorPAN: 'AABCU9603R',
      customerId: 'customer-1',
      customerName: 'Vikram Singh',
      customerEmail: 'vikram@email.com',
      customerPhone: '+91 98765 12345',
      customerAddress: 'A-123, Green Park, Delhi - 110016',
      lineItems: [
        {
          id: 'item-1',
          description: 'Wedding Photography Services - Pre-Event Payment (40%)',
          quantity: 1,
          unitPrice: 36000,
          amount: 36000
        }
      ],
      subtotal: 36000,
      platformFeePercentage: 10,
      platformFee: 3600,
      cgstPercentage: 9,
      cgst: 2916,
      sgstPercentage: 9,
      sgst: 2916,
      totalTax: 5832,
      totalAmount: 36000,
      paidAmount: 0,
      balanceAmount: 36000,
      createdAt: '2025-01-24T10:00:00',
      updatedAt: '2025-01-24T10:00:00',
      generatedBy: 'system'
    }
  ];

  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Paid',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'issued':
        return {
          label: 'Issued',
          color: 'bg-blue-100 text-blue-700',
          icon: Clock
        };
      case 'draft':
        return {
          label: 'Draft',
          color: 'bg-gray-100 text-gray-700',
          icon: FileText
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-red-100 text-red-700',
          icon: XCircle
        };
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.paidAmount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'issued').reduce((sum, inv) => sum + inv.balanceAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Invoices</h1>
          <p className="text-[#16232A]/70">Manage and download your invoices</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Invoiced</p>
              <p className="text-2xl font-bold text-[#075056]">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by invoice number, event, or customer..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'paid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('paid')}
            >
              Paid
            </Button>
            <Button
              variant={statusFilter === 'issued' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('issued')}
            >
              Issued
            </Button>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice, index) => {
                const config = getStatusConfig(invoice.status);
                const StatusIcon = config.icon;

                return (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#16232A]">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-gray-500">{invoice.paymentSlabName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#16232A]">{invoice.eventName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(invoice.eventDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#16232A]">{invoice.customerName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#16232A]">
                        {new Date(invoice.invoiceDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#075056]">₹{invoice.totalAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${config.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/vendor/invoices/${invoice.id}`}>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="h-3 w-3" />
                          PDF
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
};
