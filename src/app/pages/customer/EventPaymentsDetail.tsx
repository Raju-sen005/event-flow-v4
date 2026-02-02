import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
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
  Gift
} from 'lucide-react';

type PaymentStatus = 'pending' | 'paid' | 'cash-under-review' | 'overdue';
type PaymentMethod = 'online' | 'cash';

type PaymentSlab = {
  id: string;
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidDate?: string;
  method?: PaymentMethod;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  service: string;
  amount: number;
  issuedDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
};

type GiftTransaction = {
  id: string;
  guestName: string;
  amount: number;
  receivedAt: string;
  message?: string;
};

export const EventPaymentsDetail: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('payments');
  const [showPayOnlineModal, setShowPayOnlineModal] = useState(false);
  const [showCashPaymentModal, setShowCashPaymentModal] = useState(false);
  const [showGiftSetupModal, setShowGiftSetupModal] = useState(false);
  const [selectedSlab, setSelectedSlab] = useState<PaymentSlab | null>(null);
  const [giftEnabled, setGiftEnabled] = useState(false);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    totalCost: 45000,
    paid: 22500,
    pending: 22500
  };

  // Mock payment slabs
  const paymentSlabs: PaymentSlab[] = [
    {
      id: '1',
      milestone: 'Booking Advance',
      percentage: 25,
      amount: 11250,
      dueDate: '2026-02-01',
      status: 'paid',
      paidDate: '2026-01-28',
      method: 'online'
    },
    {
      id: '2',
      milestone: 'First Milestone',
      percentage: 25,
      amount: 11250,
      dueDate: '2026-04-01',
      status: 'paid',
      paidDate: '2026-03-30',
      method: 'online'
    },
    {
      id: '3',
      milestone: 'Second Milestone',
      percentage: 25,
      amount: 11250,
      dueDate: '2026-05-15',
      status: 'pending'
    },
    {
      id: '4',
      milestone: 'Final Payment',
      percentage: 25,
      amount: 11250,
      dueDate: '2026-06-10',
      status: 'pending'
    }
  ];

  // Mock invoices
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2026-001',
      vendorName: 'Elite Photography Studio',
      service: 'Photography',
      amount: 5000,
      issuedDate: '2026-01-20',
      dueDate: '2026-02-20',
      status: 'paid'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-002',
      vendorName: 'Gourmet Catering Co.',
      service: 'Catering',
      amount: 15000,
      issuedDate: '2026-01-22',
      dueDate: '2026-03-22',
      status: 'paid'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-003',
      vendorName: 'DJ Beats Entertainment',
      service: 'DJ Services',
      amount: 2500,
      issuedDate: '2026-01-25',
      dueDate: '2026-04-25',
      status: 'pending'
    }
  ];

  // Mock gift transactions
  const giftTransactions: GiftTransaction[] = [
    {
      id: '1',
      guestName: 'Emily Johnson',
      amount: 500,
      receivedAt: '2026-01-20T10:30:00',
      message: 'Congratulations! Wishing you a lifetime of happiness!'
    },
    {
      id: '2',
      guestName: 'Michael Smith',
      amount: 1000,
      receivedAt: '2026-01-22T15:45:00'
    },
    {
      id: '3',
      guestName: 'Sarah Williams',
      amount: 250,
      receivedAt: '2026-01-25T09:15:00',
      message: 'Best wishes for your special day!'
    }
  ];

  const totalGifts = giftTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Calculate stats
  const stats = {
    totalCost: event.totalCost,
    paid: paymentSlabs.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0),
    pending: paymentSlabs.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0),
    nextDue: paymentSlabs.find(s => s.status === 'pending')
  };

  // Get status badge
  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cash-under-review':
        return 'bg-blue-100 text-blue-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePayOnline = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowPayOnlineModal(true);
  };

  const handleCashPayment = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowCashPaymentModal(true);
  };

  return (
    <div className="space-y-6 pb-8">
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
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Payments for This Event</h1>
          <p className="text-[#16232A]/70">
            Manage payments, track invoices, and handle gifts for {event.name}.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#16232A] to-[#16232A]/80 rounded-xl p-6 text-white">
          <p className="text-white/80 mb-2">Total Event Cost</p>
          <p className="text-3xl font-bold">${stats.totalCost.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-white/80 mb-2">Paid Amount</p>
          <p className="text-3xl font-bold">${stats.paid.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
          <p className="text-white/80 mb-2">Pending Amount</p>
          <p className="text-3xl font-bold">${stats.pending.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-[#FF5B04] to-[#FF5B04]/80 rounded-xl p-6 text-white">
          <p className="text-white/80 mb-2">Next Payment Due</p>
          {stats.nextDue ? (
            <>
              <p className="text-3xl font-bold">${stats.nextDue.amount.toLocaleString()}</p>
              <p className="text-sm text-white/80 mt-1">
                Due: {new Date(stats.nextDue.dueDate).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-xl font-bold">All Paid</p>
          )}
        </div>
      </div>

      {/* Reassurance Message */}
      {stats.pending === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">Payments Complete</p>
            <p className="text-sm text-green-800 mt-1">
              All payments for your event are complete. You're all set!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Your payments are on track</p>
            <p className="text-sm text-blue-800 mt-1">
              {stats.pending > 0 && `You have $${stats.pending.toLocaleString()} pending across ${paymentSlabs.filter(s => s.status === 'pending').length} milestone${paymentSlabs.filter(s => s.status === 'pending').length !== 1 ? 's' : ''}.`}
            </p>
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="payments">Milestone Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="gifts">
            <Gift className="h-4 w-4 mr-2" />
            Gift Collection
          </TabsTrigger>
        </TabsList>

        {/* Milestone Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          {paymentSlabs.map((slab, index) => (
            <motion.div
              key={slab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#16232A]">{slab.milestone}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(slab.status)}`}>
                      {slab.status === 'cash-under-review' ? 'Cash (Under Review)' : slab.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-[#16232A]/60">
                    {slab.percentage}% of total event cost
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#16232A]">
                    ${slab.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-[#16232A]/50" />
                  <span className="text-[#16232A]/70">
                    Due: {new Date(slab.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {slab.paidDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">
                      Paid on {new Date(slab.paidDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {slab.method && (
                  <div className="flex items-center gap-2 text-sm">
                    {slab.method === 'online' ? (
                      <CreditCard className="h-4 w-4 text-[#16232A]/50" />
                    ) : (
                      <Banknote className="h-4 w-4 text-[#16232A]/50" />
                    )}
                    <span className="text-[#16232A]/70 capitalize">{slab.method} Payment</span>
                  </div>
                )}
              </div>

              {slab.status === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => handlePayOnline(slab)}
                    className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Online
                  </Button>
                  <Button
                    onClick={() => handleCashPayment(slab)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    Mark as Cash Payment
                  </Button>
                </div>
              )}

              {slab.status === 'cash-under-review' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Awaiting Confirmation</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Vendor needs to confirm receipt, then admin will approve the payment.
                    </p>
                  </div>
                </div>
              )}

              {slab.status === 'paid' && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#16232A]">Payment History</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {paymentSlabs
                .filter(s => s.status === 'paid' || s.status === 'cash-under-review')
                .map((slab) => (
                  <div key={slab.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#16232A] mb-1">{slab.milestone}</p>
                        <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                          <span>
                            {slab.paidDate
                              ? new Date(slab.paidDate).toLocaleDateString()
                              : 'Processing'}
                          </span>
                          <span className="capitalize">{slab.method} Payment</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(slab.status)}`}>
                            {slab.status === 'paid' ? 'Completed' : 'Under Review'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-[#16232A]">
                          ${slab.amount.toLocaleString()}
                        </p>
                        {slab.status === 'paid' && (
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#16232A]">Event Invoices</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
                  <p className="text-xs text-blue-900">Read-Only • Generated by Vendors</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#075056]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A] mb-1">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-sm text-[#16232A]/60">{invoice.vendorName}</p>
                        <p className="text-sm text-[#16232A]/60">{invoice.service}</p>
                        <div className="flex items-center gap-3 text-xs text-[#16232A]/50 mt-1">
                          <span>Issued: {new Date(invoice.issuedDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#16232A] mb-2">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                          invoice.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : invoice.status === 'overdue'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {invoice.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Gift Collection Tab */}
        <TabsContent value="gifts" className="space-y-6">
          {!giftEnabled ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#16232A] mb-3">Enable Gift Collection</h3>
                <p className="text-[#16232A]/70 mb-8">
                  Allow your guests to send monetary gifts securely through our platform. 
                  All gift money will be held in your platform wallet and can be withdrawn later.
                </p>
                <Button
                  onClick={() => setShowGiftSetupModal(true)}
                  className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Enable Gift Collection
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Gift Summary */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <p className="text-white/80 mb-2">Total Gifts Received</p>
                  <p className="text-3xl font-bold">${totalGifts.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <p className="text-white/80 mb-2">Number of Gifts</p>
                  <p className="text-3xl font-bold">{giftTransactions.length}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <p className="text-white/80 mb-2">Available to Withdraw</p>
                  <p className="text-3xl font-bold">${totalGifts.toLocaleString()}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#16232A] mb-4">Gift QR Code</h3>
                <div className="flex items-center gap-6">
                  <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#16232A]/70 mb-4">
                      Share this QR code with your guests. They can scan it to send monetary gifts
                      directly to your platform wallet.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download QR
                      </Button>
                      <Button variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gift Transactions */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#16232A]">Gift Transactions</h3>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <Wallet className="h-4 w-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </div>

                <div className="divide-y divide-gray-200">
                  {giftTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-[#16232A] mb-1">
                            {transaction.guestName}
                          </p>
                          {transaction.message && (
                            <p className="text-sm text-[#16232A]/60 italic mb-2">
                              "{transaction.message}"
                            </p>
                          )}
                          <p className="text-xs text-[#16232A]/50">
                            {new Date(transaction.receivedAt).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          +${transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pay Online Modal */}
      {showPayOnlineModal && selectedSlab && (
        <PayOnlineModal
          slab={selectedSlab}
          onClose={() => {
            setShowPayOnlineModal(false);
            setSelectedSlab(null);
          }}
        />
      )}

      {/* Cash Payment Modal */}
      {showCashPaymentModal && selectedSlab && (
        <CashPaymentModal
          slab={selectedSlab}
          onClose={() => {
            setShowCashPaymentModal(false);
            setSelectedSlab(null);
          }}
        />
      )}

      {/* Gift Setup Modal */}
      {showGiftSetupModal && (
        <GiftSetupModal
          onClose={() => setShowGiftSetupModal(false)}
          onEnable={() => {
            setGiftEnabled(true);
            setShowGiftSetupModal(false);
          }}
        />
      )}
    </div>
  );
};

// Pay Online Modal
const PayOnlineModal: React.FC<{
  slab: PaymentSlab;
  onClose: () => void;
}> = ({ slab, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Pay Online</h3>
          <button onClick={onClose} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Payment for</p>
          <p className="font-bold text-[#16232A] text-lg mb-3">{slab.milestone}</p>
          <p className="text-3xl font-bold text-[#FF5B04]">${slab.amount.toLocaleString()}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Secure Payment</p>
            <p className="text-sm text-blue-800 mt-1">
              Your payment is processed securely through our payment gateway.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Pay
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Cash Payment Modal
const CashPaymentModal: React.FC<{
  slab: PaymentSlab;
  onClose: () => void;
}> = ({ slab, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Mark as Cash Payment</h3>
          <button onClick={onClose} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Payment for</p>
          <p className="font-bold text-[#16232A] text-lg mb-3">{slab.milestone}</p>
          <p className="text-3xl font-bold text-[#16232A]">${slab.amount.toLocaleString()}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Cash Payment Process</p>
            <p className="text-sm text-amber-800 mt-1">
              Cash payments require vendor confirmation and admin approval. Here's how it works:
            </p>
            <ol className="text-sm text-amber-800 mt-2 ml-4 list-decimal space-y-1">
              <li>You mark payment as cash</li>
              <li>Vendor confirms receipt</li>
              <li>Admin approves the transaction</li>
              <li>Payment status becomes Completed</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Mark as cash payment
              console.log('Marking as cash payment');
              onClose();
            }}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            <Banknote className="h-4 w-4 mr-2" />
            Confirm Cash Payment
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Gift Setup Modal
const GiftSetupModal: React.FC<{
  onClose: () => void;
  onEnable: () => void;
}> = ({ onClose, onEnable }) => {
  const [paymentMethod, setPaymentMethod] = useState<'new' | 'existing'>('new');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Setup Gift Collection</h3>
          <button onClick={onClose} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-[#16232A]/70 mb-6">
          How would you like to receive gifts?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setPaymentMethod('new')}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'new'
                ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                : 'border-gray-200 hover:border-[#FF5B04]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#16232A]">Add New Bank Account</p>
                <p className="text-sm text-[#16232A]/60">Link a new bank account for withdrawals</p>
              </div>
              {paymentMethod === 'new' && <Check className="h-5 w-5 text-[#FF5B04]" />}
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('existing')}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'existing'
                ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                : 'border-gray-200 hover:border-[#FF5B04]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#16232A]">Use Existing Payment Method</p>
                <p className="text-sm text-[#16232A]/60">Use your saved payment method</p>
              </div>
              {paymentMethod === 'existing' && <Check className="h-5 w-5 text-[#FF5B04]" />}
            </div>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Important</p>
            <p className="text-sm text-blue-800 mt-1">
              All gift money will be held in your platform wallet. You can withdraw it anytime.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onEnable}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Gift className="h-4 w-4 mr-2" />
            Enable Gift Collection
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
