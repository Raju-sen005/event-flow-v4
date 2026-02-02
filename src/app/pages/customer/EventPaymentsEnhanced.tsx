import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  Banknote,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  FileText,
  Wallet,
  QrCode,
  TrendingUp,
  Shield,
  X,
  Check,
  Info,
  Copy,
  Gift,
  Plus,
  RefreshCw,
  Filter,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Building2,
  ChevronRight
} from 'lucide-react';

// Types
type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'cash_awaiting_vendor' 
  | 'cash_awaiting_admin' 
  | 'completed'
  | 'overdue';

type PaymentMethod = 'online' | 'cash' | 'gift';

type PaymentSlab = {
  id: string;
  slabNumber: number;
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidDate?: string;
  method?: PaymentMethod;
  transactionId?: string;
  vendorName: string;
  service: string;
};

type PaymentTransaction = {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  slabId: string;
  transactionId?: string;
  vendorName: string;
};

type GiftTransaction = {
  id: string;
  date: string;
  amount: number;
  sender: string;
  message?: string;
  status: 'received' | 'withdrawn';
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  service: string;
  amount: number;
  issuedDate: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  pdfUrl?: string;
};

type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  ifsc: string;
};

export const EventPaymentsEnhanced: React.FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // State management
  const [activeTab, setActiveTab] = useState<'payments' | 'gifts' | 'invoices'>('payments');
  const [showPayOnlineModal, setShowPayOnlineModal] = useState(false);
  const [showMarkCashModal, setShowMarkCashModal] = useState(false);
  const [showGiftSetupModal, setShowGiftSetupModal] = useState(false);
  const [showWithdrawGiftModal, setShowWithdrawGiftModal] = useState(false);
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [selectedSlab, setSelectedSlab] = useState<PaymentSlab | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Gift collection state
  const [giftCollectionEnabled, setGiftCollectionEnabled] = useState(false);
  const [giftQrCode, setGiftQrCode] = useState<string | null>(null);

  // Filter states
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethod | 'all'>('all');
  const [invoiceVendorFilter, setInvoiceVendorFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    isFinalized: true, // Payments unlock only after vendor finalization
    totalCost: 250000,
    amountPaid: 75000,
    pendingAmount: 175000,
    nextPaymentDue: {
      date: '2026-02-15',
      amount: 100000
    }
  };

  // Mock payment slabs
  const [paymentSlabs, setPaymentSlabs] = useState<PaymentSlab[]>([
    {
      id: 'slab-1',
      slabNumber: 1,
      milestone: 'Booking Advance',
      percentage: 30,
      amount: 75000,
      dueDate: '2026-01-20',
      status: 'paid',
      paidDate: '2026-01-18',
      method: 'online',
      transactionId: 'TXN20260118001',
      vendorName: 'Elite Photography',
      service: 'Photography'
    },
    {
      id: 'slab-2',
      slabNumber: 2,
      milestone: 'Pre-Event Payment',
      percentage: 40,
      amount: 100000,
      dueDate: '2026-02-15',
      status: 'pending',
      vendorName: 'Elite Photography',
      service: 'Photography'
    },
    {
      id: 'slab-3',
      slabNumber: 3,
      milestone: 'Final Payment (Post Event)',
      percentage: 30,
      amount: 75000,
      dueDate: '2026-06-20',
      status: 'pending',
      vendorName: 'Elite Photography',
      service: 'Photography'
    }
  ]);

  // Mock payment history
  const paymentHistory: PaymentTransaction[] = [
    {
      id: 'txn-1',
      date: '2026-01-18T14:30:00',
      amount: 75000,
      method: 'online',
      status: 'paid',
      slabId: 'slab-1',
      transactionId: 'TXN20260118001',
      vendorName: 'Elite Photography'
    }
  ];

  // Mock gift transactions
  const [giftTransactions, setGiftTransactions] = useState<GiftTransaction[]>([
    {
      id: 'gift-1',
      date: '2026-02-01T10:00:00',
      amount: 5000,
      sender: 'John & Mary Doe',
      message: 'Congratulations on your special day!',
      status: 'received'
    },
    {
      id: 'gift-2',
      date: '2026-02-05T15:30:00',
      amount: 10000,
      sender: 'Smith Family',
      status: 'received'
    }
  ]);

  // Mock invoices
  const invoices: Invoice[] = [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-001',
      vendorName: 'Elite Photography',
      service: 'Photography Package',
      amount: 250000,
      issuedDate: '2026-01-15',
      dueDate: '2026-06-15',
      status: 'pending',
      pdfUrl: '/invoices/inv-2026-001.pdf'
    }
  ];

  // Mock bank accounts
  const bankAccounts: BankAccount[] = [
    {
      id: 'bank-1',
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      accountHolder: 'Sarah Williams',
      ifsc: 'HDFC0001234'
    }
  ];

  // Calculate gift wallet balance
  const giftWalletBalance = giftTransactions
    .filter(t => t.status === 'received')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter functions
  const filteredPaymentSlabs = paymentSlabs.filter(slab => {
    const matchesStatus = paymentStatusFilter === 'all' || slab.status === paymentStatusFilter;
    const matchesMethod = paymentMethodFilter === 'all' || slab.method === paymentMethodFilter;
    return matchesStatus && matchesMethod;
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesVendor = invoiceVendorFilter === 'all' || invoice.vendorName === invoiceVendorFilter;
    return matchesVendor;
  });

  // Check if filters are active
  const hasActivePaymentFilters = 
    paymentStatusFilter !== 'all' || 
    paymentMethodFilter !== 'all' ||
    dateRangeFilter.start !== '' ||
    dateRangeFilter.end !== '';

  const hasActiveInvoiceFilters = invoiceVendorFilter !== 'all';

  // Reset filters
  const resetPaymentFilters = () => {
    setPaymentStatusFilter('all');
    setPaymentMethodFilter('all');
    setDateRangeFilter({ start: '', end: '' });
  };

  const resetInvoiceFilters = () => {
    setInvoiceVendorFilter('all');
  };

  // Get status styling
  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: CheckCircle2,
          label: 'Paid'
        };
      case 'pending':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-700',
          icon: Clock,
          label: 'Pending'
        };
      case 'cash_awaiting_vendor':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: Clock,
          label: 'Cash (Awaiting Vendor)'
        };
      case 'cash_awaiting_admin':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-700',
          icon: Shield,
          label: 'Cash (Awaiting Admin)'
        };
      case 'overdue':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: AlertCircle,
          label: 'Overdue'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  // Check if payment is allowed (only if event is finalized)
  const canMakePayment = event.isFinalized;

  // Handle pay online
  const handlePayOnline = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowPayOnlineModal(true);
  };

  const confirmPayOnline = async () => {
    if (!selectedSlab) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update slab status
    setPaymentSlabs(prev => prev.map(s => 
      s.id === selectedSlab.id 
        ? { ...s, status: 'paid', paidDate: new Date().toISOString(), method: 'online', transactionId: `TXN${Date.now()}` }
        : s
    ));
    
    setLoading(false);
    setShowPayOnlineModal(false);
    setSelectedSlab(null);
  };

  // Handle mark cash payment
  const handleMarkCash = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowMarkCashModal(true);
  };

  const confirmMarkCash = async () => {
    if (!selectedSlab) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update slab status to cash_awaiting_vendor
    setPaymentSlabs(prev => prev.map(s => 
      s.id === selectedSlab.id 
        ? { ...s, status: 'cash_awaiting_vendor', method: 'cash' }
        : s
    ));
    
    setLoading(false);
    setShowMarkCashModal(false);
    setSelectedSlab(null);
  };

  // Handle gift collection setup
  const handleEnableGiftCollection = () => {
    if (!giftCollectionEnabled) {
      setShowGiftSetupModal(true);
    }
  };

  const confirmGiftSetup = async (bankAccountId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGiftCollectionEnabled(true);
    setGiftQrCode(`GIFT-QR-${eventId}-${Date.now()}`);
    
    setLoading(false);
    setShowGiftSetupModal(false);
  };

  // Handle withdraw gift
  const handleWithdrawGift = () => {
    setShowWithdrawGiftModal(true);
  };

  const confirmWithdrawGift = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mark all received gifts as withdrawn
    setGiftTransactions(prev => prev.map(t => 
      t.status === 'received' ? { ...t, status: 'withdrawn' } : t
    ));
    
    setLoading(false);
    setShowWithdrawGiftModal(false);
  };

  // Handle invoice view
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetailModal(true);
  };

  // Handle invoice download
  const handleDownloadInvoice = (invoice: Invoice) => {
    // In production, this would trigger actual download
    console.log('Downloading invoice:', invoice.invoiceNumber);
  };

  // Copy QR code
  const copyQRCode = () => {
    if (giftQrCode) {
      navigator.clipboard.writeText(giftQrCode);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">Payments & Invoices</h1>
              <p className="text-[#16232A]/70">
                Manage payments, collect gifts, and view invoices for <span className="font-semibold">{event.name}</span>
              </p>
            </div>
            {!event.isFinalized && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Vendors Not Finalized</p>
                    <p className="text-xs text-amber-700">Finalize vendors to unlock payments</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Event Cost"
          value={`₹${event.totalCost.toLocaleString()}`}
          icon={DollarSign}
          color="blue"
          clickable
        />
        <SummaryCard
          title="Amount Paid"
          value={`₹${event.amountPaid.toLocaleString()}`}
          icon={CheckCircle2}
          color="green"
          clickable
        />
        <SummaryCard
          title="Pending Amount"
          value={`₹${event.pendingAmount.toLocaleString()}`}
          icon={Clock}
          color="amber"
          clickable
        />
        <SummaryCard
          title="Next Payment Due"
          value={`₹${event.nextPaymentDue.amount.toLocaleString()}`}
          subtitle={new Date(event.nextPaymentDue.date).toLocaleDateString()}
          icon={Calendar}
          color="purple"
          clickable
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="payments" className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="gifts" className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white">
            <Gift className="h-4 w-4 mr-2" />
            Gift Collection
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
        </TabsList>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-[#16232A]/70" />
              <p className="text-sm font-semibold text-[#16232A]">Filter Payments</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value as typeof paymentStatusFilter)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cash_awaiting_vendor">Cash (Awaiting Vendor)</option>
                <option value="cash_awaiting_admin">Cash (Awaiting Admin)</option>
                <option value="overdue">Overdue</option>
              </select>

              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value as typeof paymentMethodFilter)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Methods</option>
                <option value="online">Online</option>
                <option value="cash">Cash</option>
              </select>

              {hasActivePaymentFilters && (
                <Button
                  variant="outline"
                  onClick={resetPaymentFilters}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              )}
            </div>
            {hasActivePaymentFilters && (
              <p className="text-xs text-[#16232A]/60 mt-2">
                Showing {filteredPaymentSlabs.length} of {paymentSlabs.length} payment slabs
              </p>
            )}
          </div>

          {/* Payment Slabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-[#16232A]">Milestone Payments</h3>
            </div>
            
            {filteredPaymentSlabs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredPaymentSlabs.map((slab, index) => {
                  const statusConfig = getStatusBadge(slab.status);
                  const StatusIcon = statusConfig.icon;
                  const isPending = slab.status === 'pending';
                  const isOverdue = new Date(slab.dueDate) < new Date() && isPending;

                  return (
                    <motion.div
                      key={slab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-[#16232A]">
                              Slab {slab.slabNumber}: {slab.milestone}
                            </h4>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </span>
                            {isOverdue && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                <AlertCircle className="h-3 w-3" />
                                Overdue
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-[#16232A]/60">Percentage</p>
                              <p className="font-semibold text-[#16232A]">{slab.percentage}%</p>
                            </div>
                            <div>
                              <p className="text-[#16232A]/60">Amount</p>
                              <p className="font-semibold text-[#16232A]">₹{slab.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[#16232A]/60">Due Date</p>
                              <p className="font-semibold text-[#16232A]">
                                {new Date(slab.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            {slab.paidDate && (
                              <div>
                                <p className="text-[#16232A]/60">Paid On</p>
                                <p className="font-semibold text-[#16232A]">
                                  {new Date(slab.paidDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>

                          {slab.transactionId && (
                            <div className="mt-2 text-xs text-[#16232A]/60">
                              Transaction ID: <span className="font-mono">{slab.transactionId}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 ml-4">
                          {isPending && (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button
                                      onClick={() => handlePayOnline(slab)}
                                      disabled={!canMakePayment}
                                      className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <CreditCard className="h-4 w-4 mr-2" />
                                      Pay Online
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                {!canMakePayment && (
                                  <TooltipContent>
                                    Finalize vendors first to unlock payments
                                  </TooltipContent>
                                )}
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleMarkCash(slab)}
                                      disabled={!canMakePayment}
                                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <Banknote className="h-4 w-4 mr-2" />
                                      Mark Cash
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                {!canMakePayment ? (
                                  <TooltipContent>
                                    Finalize vendors first to unlock payments
                                  </TooltipContent>
                                ) : (
                                  <TooltipContent>
                                    Cash payments require vendor and admin approval
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </>
                          )}

                          {!isPending && (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#16232A] mb-2">No payment slabs match your filters</h3>
                <p className="text-[#16232A]/60 mb-6">Try adjusting your filters</p>
                <Button
                  onClick={resetPaymentFilters}
                  variant="outline"
                  className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-[#16232A]">Payment History</h3>
            </div>

            {paymentHistory.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {paymentHistory.map((payment, index) => {
                  const statusConfig = getStatusBadge(payment.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
                            <StatusIcon className={`h-6 w-6 ${statusConfig.text}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#16232A]">₹{payment.amount.toLocaleString()}</p>
                            <p className="text-sm text-[#16232A]/60">
                              {new Date(payment.date).toLocaleDateString()} • {payment.vendorName}
                            </p>
                            {payment.transactionId && (
                              <p className="text-xs text-[#16232A]/50 font-mono">{payment.transactionId}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                            {payment.method === 'online' ? <CreditCard className="h-3 w-3" /> : <Banknote className="h-3 w-3" />}
                            {payment.method === 'online' ? 'Online' : 'Cash'}
                          </span>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#16232A] mb-2">No payments made yet</h3>
                <p className="text-[#16232A]/60 mb-6">Payment history will appear here once you make payments</p>
                {canMakePayment && (
                  <Button
                    onClick={() => setActiveTab('payments')}
                    className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                  >
                    View Pending Payments
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Gift Collection Tab */}
        <TabsContent value="gifts" className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#16232A] mb-2">Gift Collection</h3>
                <p className="text-[#16232A]/70">Collect monetary gifts from your guests via QR code</p>
              </div>
              {!giftCollectionEnabled ? (
                <Button
                  onClick={handleEnableGiftCollection}
                  className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Enable Gift Collection
                </Button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-900">Active</span>
                  </div>
                </div>
              )}
            </div>

            {giftCollectionEnabled && giftQrCode && (
              <>
                {/* Gift Wallet Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Wallet className="h-6 w-6 text-purple-600" />
                      <p className="text-sm text-purple-700">Wallet Balance</p>
                    </div>
                    <p className="text-3xl font-bold text-purple-900">₹{giftWalletBalance.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      <p className="text-sm text-blue-700">Total Received</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-900">
                      ₹{giftTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift className="h-6 w-6 text-green-600" />
                      <p className="text-sm text-green-700">Total Gifts</p>
                    </div>
                    <p className="text-3xl font-bold text-green-900">{giftTransactions.length}</p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#16232A] mb-2">Your Gift QR Code</h4>
                      <p className="text-sm text-[#16232A]/70 mb-4">
                        Share this QR code with your guests to receive monetary gifts
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-gray-300 inline-block">
                        <QrCode className="h-32 w-32 text-[#16232A]" />
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <code className="text-xs bg-white px-3 py-2 rounded border border-gray-300 font-mono">
                          {giftQrCode}
                        </code>
                        <Button variant="outline" size="sm" onClick={copyQRCode}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button
                        onClick={handleWithdrawGift}
                        disabled={giftWalletBalance === 0}
                        className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50"
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Withdraw ₹{giftWalletBalance.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Gift Transactions */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-[#16232A]">Gift Transactions</h4>
                  </div>

                  {giftTransactions.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {giftTransactions.map((gift, index) => (
                        <motion.div
                          key={gift.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <Gift className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#16232A]">{gift.sender}</p>
                                <p className="text-sm text-[#16232A]/60">
                                  {new Date(gift.date).toLocaleDateString()} at {new Date(gift.date).toLocaleTimeString()}
                                </p>
                                {gift.message && (
                                  <p className="text-sm text-[#16232A]/70 mt-2 italic">"{gift.message}"</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-[#16232A] text-lg">₹{gift.amount.toLocaleString()}</p>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full mt-2 ${
                                gift.status === 'received' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {gift.status === 'received' ? <CheckCircle2 className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                {gift.status === 'received' ? 'Received' : 'Withdrawn'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-[#16232A] mb-2">No gifts received yet</h3>
                      <p className="text-[#16232A]/60">Share your QR code with guests to start receiving gifts</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {!giftCollectionEnabled && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#16232A] mb-2">Enable Gift Collection</h3>
                <p className="text-[#16232A]/60 mb-6 max-w-md mx-auto">
                  Set up gift collection to receive monetary gifts from your guests. Gifts will be stored in your event wallet.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-blue-900 mb-1">How it works:</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Connect your bank account</li>
                        <li>• Get a unique QR code</li>
                        <li>• Guests scan and send gifts</li>
                        <li>• Money stays in platform wallet</li>
                        <li>• Withdraw anytime to your bank</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleEnableGiftCollection}
                  className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Enable Gift Collection
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-[#16232A]/70" />
              <p className="text-sm font-semibold text-[#16232A]">Filter Invoices</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={invoiceVendorFilter}
                onChange={(e) => setInvoiceVendorFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Vendors</option>
                {Array.from(new Set(invoices.map(inv => inv.vendorName))).map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>

              {hasActiveInvoiceFilters && (
                <Button
                  variant="outline"
                  onClick={resetInvoiceFilters}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              )}
            </div>
            {hasActiveInvoiceFilters && (
              <p className="text-xs text-[#16232A]/60 mt-2">
                Showing {filteredInvoices.length} of {invoices.length} invoices
              </p>
            )}
          </div>

          {/* Invoices List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-[#16232A]">Vendor Invoices</h3>
            </div>

            {filteredInvoices.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#16232A]">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-[#16232A]/70">{invoice.vendorName}</p>
                          <p className="text-sm text-[#16232A]/60">{invoice.service}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-[#16232A]/60">
                            <span>Issued: {new Date(invoice.issuedDate).toLocaleDateString()}</span>
                            <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#16232A] text-lg mb-2">₹{invoice.amount.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#16232A] mb-2">
                  {hasActiveInvoiceFilters ? 'No invoices match your filters' : 'No invoices yet'}
                </h3>
                <p className="text-[#16232A]/60 mb-6">
                  {hasActiveInvoiceFilters 
                    ? 'Try adjusting your filters'
                    : 'Invoices will appear here once vendors generate them'}
                </p>
                {hasActiveInvoiceFilters && (
                  <Button
                    onClick={resetInvoiceFilters}
                    variant="outline"
                    className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Read-Only Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">About Invoices</p>
                <p className="text-sm text-blue-800">
                  All invoices are generated by vendors and are read-only. You cannot edit or regenerate invoices. 
                  If you notice any errors, please contact the vendor directly.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <PayOnlineModal
        isOpen={showPayOnlineModal}
        onClose={() => {
          setShowPayOnlineModal(false);
          setSelectedSlab(null);
        }}
        slab={selectedSlab}
        onConfirm={confirmPayOnline}
        loading={loading}
      />

      <MarkCashModal
        isOpen={showMarkCashModal}
        onClose={() => {
          setShowMarkCashModal(false);
          setSelectedSlab(null);
        }}
        slab={selectedSlab}
        onConfirm={confirmMarkCash}
        loading={loading}
      />

      <GiftSetupModal
        isOpen={showGiftSetupModal}
        onClose={() => setShowGiftSetupModal(false)}
        onConfirm={confirmGiftSetup}
        bankAccounts={bankAccounts}
        loading={loading}
        onAddBank={() => setShowAddBankModal(true)}
      />

      <WithdrawGiftModal
        isOpen={showWithdrawGiftModal}
        onClose={() => setShowWithdrawGiftModal(false)}
        amount={giftWalletBalance}
        onConfirm={confirmWithdrawGift}
        loading={loading}
        bankAccounts={bankAccounts}
      />

      <InvoiceDetailModal
        isOpen={showInvoiceDetailModal}
        onClose={() => {
          setShowInvoiceDetailModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onDownload={handleDownloadInvoice}
      />
    </div>
  );
};

// Summary Card Component
const SummaryCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  clickable?: boolean;
}> = ({ title, value, subtitle, icon: Icon, color, clickable }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 ${clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-[#16232A]/60">{title}</p>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#16232A]">{value}</p>
      {subtitle && (
        <p className="text-xs text-[#16232A]/50 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

// Pay Online Modal
const PayOnlineModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slab: PaymentSlab | null;
  onConfirm: () => void;
  loading: boolean;
}> = ({ isOpen, onClose, slab, onConfirm, loading }) => {
  if (!isOpen || !slab) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Online Payment</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#16232A]/70">Milestone</span>
            <span className="font-semibold text-[#16232A]">{slab.milestone}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#16232A]/70">Amount</span>
            <span className="font-bold text-[#16232A] text-xl">₹{slab.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#16232A]/70">Due Date</span>
            <span className="font-semibold text-[#16232A]">
              {new Date(slab.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Secure Payment</p>
              <p className="text-sm text-blue-800">
                You will be redirected to a secure payment gateway. Your payment will be processed immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ₹{slab.amount.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Mark Cash Modal
const MarkCashModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slab: PaymentSlab | null;
  onConfirm: () => void;
  loading: boolean;
}> = ({ isOpen, onClose, slab, onConfirm, loading }) => {
  if (!isOpen || !slab) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Mark Cash Payment</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#16232A]/70">Milestone</span>
            <span className="font-semibold text-[#16232A]">{slab.milestone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#16232A]/70">Amount</span>
            <span className="font-bold text-[#16232A] text-xl">₹{slab.amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Approval Required</p>
              <p className="text-sm text-amber-800 mb-3">
                You are marking this payment as cash. This will require:
              </p>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Vendor confirmation</li>
                <li>• Admin approval</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Gift Setup Modal
const GiftSetupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bankAccountId: string) => void;
  bankAccounts: BankAccount[];
  loading: boolean;
  onAddBank: () => void;
}> = ({ isOpen, onClose, onConfirm, bankAccounts, loading, onAddBank }) => {
  const [selectedBankId, setSelectedBankId] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Setup Gift Collection</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-[#16232A]/70 mb-6">
          Choose how you want to receive gifts. Gifts will be stored in your event wallet and can be withdrawn anytime.
        </p>

        <div className="space-y-3 mb-6">
          {bankAccounts.map(bank => (
            <label
              key={bank.id}
              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                selectedBankId === bank.id
                  ? 'border-[#FF5B04] bg-orange-50'
                  : 'border-gray-200 hover:border-[#FF5B04]/50'
              }`}
            >
              <input
                type="radio"
                checked={selectedBankId === bank.id}
                onChange={() => setSelectedBankId(bank.id)}
                className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04]"
              />
              <Building2 className="h-8 w-8 text-[#16232A]/70" />
              <div className="flex-1">
                <p className="font-semibold text-[#16232A]">{bank.bankName}</p>
                <p className="text-sm text-[#16232A]/60">
                  {bank.accountHolder} • ••••{bank.accountNumber.slice(-4)}
                </p>
              </div>
            </label>
          ))}

          <button
            onClick={onAddBank}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FF5B04] hover:bg-orange-50 transition-colors"
          >
            <Plus className="h-5 w-5 text-[#16232A]/70" />
            <span className="font-medium text-[#16232A]/70">Add New Bank Account</span>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Important</p>
              <p className="text-sm text-blue-800">
                Gift money stays in your platform wallet and is NOT transferred directly to your bank. 
                You can withdraw it anytime after the event.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(selectedBankId)}
            disabled={!selectedBankId || loading}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Enable Collection
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Withdraw Gift Modal
const WithdrawGiftModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => void;
  loading: boolean;
  bankAccounts: BankAccount[];
}> = ({ isOpen, onClose, amount, onConfirm, loading, bankAccounts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Withdraw Gift Money</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-purple-700 mb-2">Withdrawal Amount</p>
          <p className="text-4xl font-bold text-purple-900">₹{amount.toLocaleString()}</p>
        </div>

        {bankAccounts.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-[#16232A]/70 mb-3">Transfer to</p>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
              <Building2 className="h-8 w-8 text-[#16232A]/70" />
              <div>
                <p className="font-semibold text-[#16232A]">{bankAccounts[0].bankName}</p>
                <p className="text-sm text-[#16232A]/60">
                  {bankAccounts[0].accountHolder} • ••••{bankAccounts[0].accountNumber.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Confirm Withdrawal</p>
              <p className="text-sm text-amber-800">
                Gift money will be transferred to your account. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                Withdraw ₹{amount.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Invoice Detail Modal
const InvoiceDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onDownload: (invoice: Invoice) => void;
}> = ({ isOpen, onClose, invoice, onDownload }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Invoice Details</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Invoice Number</p>
              <p className="font-semibold text-[#16232A]">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
              <p className="font-semibold text-[#16232A]">{invoice.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Service</p>
              <p className="font-semibold text-[#16232A]">{invoice.service}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Amount</p>
              <p className="font-bold text-[#16232A] text-xl">₹{invoice.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Issued Date</p>
              <p className="font-semibold text-[#16232A]">
                {new Date(invoice.issuedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Due Date</p>
              <p className="font-semibold text-[#16232A]">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Read-Only Invoice</p>
              <p className="text-sm text-blue-800">
                This invoice is generated by the vendor and cannot be edited. If you notice any errors, 
                please contact the vendor directly.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => onDownload(invoice)}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
