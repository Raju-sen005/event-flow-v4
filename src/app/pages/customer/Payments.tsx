import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { EventPickerModal } from '@/app/components/modals/EventPickerModal';
import {
  DollarSign,
  Download,
  Eye,
  Filter,
  Search,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar
} from 'lucide-react';

// Types
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'refunded';

type Payment = {
  id: string;
  eventId: string;
  eventName: string;
  vendorName: string;
  amount: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
  invoiceNumber: string;
  description: string;
  milestone?: string;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  eventName: string;
  vendorName: string;
  amount: number;
  status: PaymentStatus;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    amount: number;
  }[];
};

export const Payments: React.FC = () => {
  const navigate = useNavigate();
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');

  // Mock data
  const payments: Payment[] = [
    {
      id: '1',
      eventId: 'evt-001',
      eventName: 'Meera & Raj Wedding',
      vendorName: 'Royal Palace Caterers',
      amount: 50000,
      status: 'paid',
      dueDate: '2026-01-15',
      paidDate: '2026-01-14',
      invoiceNumber: 'INV-2026-001',
      description: 'First milestone payment - Menu finalization',
      milestone: 'Milestone 1'
    },
    {
      id: '2',
      eventId: 'evt-001',
      eventName: 'Meera & Raj Wedding',
      vendorName: 'Elegant Decor Studio',
      amount: 75000,
      status: 'pending',
      dueDate: '2026-02-10',
      invoiceNumber: 'INV-2026-002',
      description: 'Stage decoration advance payment',
      milestone: 'Milestone 1'
    },
    {
      id: '3',
      eventId: 'evt-002',
      eventName: 'Priya Birthday Bash',
      vendorName: 'Sound & Light Pro',
      amount: 25000,
      status: 'overdue',
      dueDate: '2026-01-20',
      invoiceNumber: 'INV-2026-003',
      description: 'Audio system setup',
    },
    {
      id: '4',
      eventId: 'evt-001',
      eventName: 'Meera & Raj Wedding',
      vendorName: 'Dream Photography',
      amount: 40000,
      status: 'paid',
      dueDate: '2026-01-10',
      paidDate: '2026-01-09',
      invoiceNumber: 'INV-2026-004',
      description: 'Pre-wedding shoot payment',
    },
  ];

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2026-001',
      eventName: 'Meera & Raj Wedding',
      vendorName: 'Royal Palace Caterers',
      amount: 50000,
      status: 'paid',
      issueDate: '2026-01-05',
      dueDate: '2026-01-15',
      items: [
        { description: 'Menu consultation', amount: 10000 },
        { description: 'Advance booking', amount: 40000 }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-002',
      eventName: 'Meera & Raj Wedding',
      vendorName: 'Elegant Decor Studio',
      amount: 75000,
      status: 'pending',
      issueDate: '2026-01-25',
      dueDate: '2026-02-10',
      items: [
        { description: 'Stage decoration', amount: 50000 },
        { description: 'Floral arrangements', amount: 25000 }
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-003',
      eventName: 'Priya Birthday Bash',
      vendorName: 'Sound & Light Pro',
      amount: 25000,
      status: 'overdue',
      issueDate: '2026-01-10',
      dueDate: '2026-01-20',
      items: [
        { description: 'Audio system', amount: 15000 },
        { description: 'Lighting setup', amount: 10000 }
      ]
    },
  ];

  // Filter data
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesEvent = !selectedEventId || payment.eventId === selectedEventId;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    totalPaid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalOverdue: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    totalPayments: payments.length,
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'refunded':
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'refunded':
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowEventPicker(false);
    // Navigate to event-specific payments
    navigate(`/customer/events/${eventId}/payments-enhanced`);
  };

  const handleViewPayment = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      navigate(`/customer/events/${payment.eventId}/payments-enhanced`);
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      // For demo, navigate to agreements which could show invoices
      navigate(`/customer/agreements/${invoiceId}`);
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
    // In real app, this would trigger a download
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#16232A] mb-2">Payments & Invoices</h1>
            <p className="text-[#16232A]/70">Track all your event payments and invoices in one place</p>
          </div>
          <button
            onClick={() => setShowEventPicker(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg transition-colors font-medium"
          >
            <Calendar className="h-5 w-5" />
            View by Event
          </button>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-[#16232A]">{formatCurrency(stats.totalPaid)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Pending</p>
            <p className="text-2xl font-bold text-[#16232A]">{formatCurrency(stats.totalPending)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-[#16232A]">{formatCurrency(stats.totalOverdue)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Total Payments</p>
            <p className="text-2xl font-bold text-[#16232A]">{stats.totalPayments}</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6">
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-[#16232A]/60 hover:text-[#16232A]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payments
                </div>
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'invoices'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-[#16232A]/60 hover:text-[#16232A]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoices
                </div>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by event, vendor, or invoice number..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'payments' ? (
              <div className="space-y-3">
                {filteredPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 text-[#16232A]/20 mx-auto mb-4" />
                    <p className="text-lg font-medium text-[#16232A]/60">No payments found</p>
                    <p className="text-sm text-[#16232A]/40 mt-1">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your filters'
                        : 'Your payment records will appear here'}
                    </p>
                  </div>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#FF5B04]/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[#16232A]">{payment.vendorName}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                              {getStatusIcon(payment.status)}
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-[#16232A]/70 mb-1">{payment.eventName}</p>
                          <p className="text-sm text-[#16232A]/60">{payment.description}</p>
                          {payment.milestone && (
                            <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                              {payment.milestone}
                            </span>
                          )}
                          <div className="flex items-center gap-4 mt-3 text-xs text-[#16232A]/50">
                            <span>Invoice: {payment.invoiceNumber}</span>
                            <span>Due: {formatDate(payment.dueDate)}</span>
                            {payment.paidDate && <span>Paid: {formatDate(payment.paidDate)}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#16232A]">{formatCurrency(payment.amount)}</p>
                          </div>
                          <button
                            onClick={() => handleViewPayment(payment.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInvoices.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-[#16232A]/20 mx-auto mb-4" />
                    <p className="text-lg font-medium text-[#16232A]/60">No invoices found</p>
                    <p className="text-sm text-[#16232A]/40 mt-1">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your filters'
                        : 'Your invoices will appear here'}
                    </p>
                  </div>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#FF5B04]/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[#16232A]">{invoice.invoiceNumber}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                              {getStatusIcon(invoice.status)}
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-[#16232A]/70 mb-1">{invoice.eventName}</p>
                          <p className="text-sm text-[#16232A]/60 mb-2">{invoice.vendorName}</p>
                          <div className="space-y-1 mb-3">
                            {invoice.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-[#16232A]/60">{item.description}</span>
                                <span className="text-[#16232A]/80 font-medium">{formatCurrency(item.amount)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#16232A]/50">
                            <span>Issued: {formatDate(invoice.issueDate)}</span>
                            <span>Due: {formatDate(invoice.dueDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                          <div className="text-right">
                            <p className="text-sm text-[#16232A]/60 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-[#16232A]">{formatCurrency(invoice.amount)}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleViewInvoice(invoice.id)}
                              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium text-sm"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownloadInvoice(invoice.id)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#075056] hover:bg-[#075056]/90 text-white transition-colors font-medium text-sm"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Event Picker Modal */}
      <EventPickerModal
        isOpen={showEventPicker}
        onClose={() => setShowEventPicker(false)}
        onSelectEvent={handleEventSelect}
        title="Select Event to View Payments"
      />
    </div>
  );
};
