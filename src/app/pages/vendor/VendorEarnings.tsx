import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Banknote,
  CreditCard,
  Shield,
  Lock,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { EventPayment, PaymentSlab, PaymentStatus, VendorKYC } from '../../types/payment';

export const VendorEarnings: React.FC = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedSlab, setSelectedSlab] = useState<PaymentSlab | null>(null);
  const [showCashConfirmModal, setShowCashConfirmModal] = useState(false);

  // Mock KYC status
  const kycStatus: VendorKYC = {
    isVerified: false,
    documents: {
      panCard: true,
      aadhaar: true,
      bankDetails: false,
      gst: false
    },
    status: 'pending'
  };

  // Mock earnings data
  const events: EventPayment[] = [
    {
      id: 'payment-1',
      eventId: 'event-1',
      eventName: 'Singh Family Wedding',
      vendorId: 'vendor-1',
      vendorName: 'You',
      customerId: 'customer-1',
      customerName: 'Vikram Singh',
      totalAmount: 90000,
      agreementId: 'agreement-1',
      agreementDate: '2025-01-23',
      isFinalized: true,
      createdAt: '2025-01-23T10:00:00',
      updatedAt: '2025-01-23T10:00:00',
      slabs: [
        {
          id: 'slab-1',
          slabNumber: 1,
          name: 'Booking Advance',
          percentage: 30,
          amount: 27000,
          dueDate: '2025-01-25',
          status: 'completed',
          paymentMethod: 'online',
          paidAt: '2025-01-23T14:30:00',
          transactionId: 'TXN123456789'
        },
        {
          id: 'slab-2',
          slabNumber: 2,
          name: 'Pre-Event Payment',
          percentage: 40,
          amount: 36000,
          dueDate: '2025-02-07',
          status: 'cash_awaiting_vendor',
          paymentMethod: 'cash',
          cashConfirmedByVendor: false
        },
        {
          id: 'slab-3',
          slabNumber: 3,
          name: 'Final Payment',
          percentage: 30,
          amount: 27000,
          dueDate: '2025-02-21',
          status: 'pending'
        }
      ]
    }
  ];

  const totalEarnings = events.reduce((sum, event) => sum + event.totalAmount, 0);
  const receivedAmount = events.reduce((sum, event) => 
    sum + event.slabs
      .filter(s => s.status === 'completed')
      .reduce((slabSum, s) => slabSum + s.amount, 0),
    0
  );
  const pendingAmount = totalEarnings - receivedAmount;

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Received',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'paid':
        return {
          label: 'Paid by Customer',
          color: 'bg-blue-100 text-blue-700',
          icon: CheckCircle
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock
        };
      case 'cash_awaiting_vendor':
        return {
          label: 'Cash - Action Required',
          color: 'bg-orange-100 text-orange-700',
          icon: AlertCircle
        };
      case 'cash_awaiting_admin':
        return {
          label: 'Cash - Pending Approval',
          color: 'bg-purple-100 text-purple-700',
          icon: Clock
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-700',
          icon: XCircle
        };
    }
  };

  const handleConfirmCash = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowCashConfirmModal(true);
  };

  const handleCashConfirmation = () => {
    alert('Cash payment confirmed! Sent to admin for approval.');
    setShowCashConfirmModal(false);
    setSelectedSlab(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Earnings & Payments</h1>
          <p className="text-[#16232A]/70">Track your earnings and manage payments</p>
        </div>
        <Button
          onClick={() => setShowWithdrawModal(true)}
          disabled={!kycStatus.isVerified || receivedAmount === 0}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Withdraw Funds
        </Button>
      </div>

      {/* KYC Warning */}
      {!kycStatus.isVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900">KYC Verification Required</p>
              <p className="text-sm text-yellow-800 mt-1">
                Complete your KYC verification to enable fund withdrawals. Visit Profile → KYC to complete verification.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-[#075056]">₹{totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Received</p>
              <p className="text-2xl font-bold text-green-600">₹{receivedAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
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

      {/* Event Payments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#16232A]">Event Payments</h2>

        {events.map((event, eventIndex) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: eventIndex * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#16232A]">{event.eventName}</h3>
                <p className="text-sm text-gray-600">Customer: {event.customerName}</p>
                <p className="text-xs text-gray-500">Agreement Date: {new Date(event.agreementDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-[#075056]">₹{event.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Payment Slabs */}
            <div className="space-y-3">
              {event.slabs.map((slab, slabIndex) => {
                const config = getStatusConfig(slab.status);
                const StatusIcon = config.icon;
                const needsConfirmation = slab.status === 'cash_awaiting_vendor';

                return (
                  <div
                    key={slab.id}
                    className={`p-4 rounded-lg border-2 ${
                      slab.status === 'completed' ? 'bg-green-50 border-green-200' :
                      needsConfirmation ? 'bg-orange-50 border-orange-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          slab.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <span className="font-bold text-sm">{slab.slabNumber}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#16232A]">{slab.name}</p>
                          <p className="text-xs text-gray-600">{slab.percentage}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-[#075056]">₹{slab.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">
                            Due: {new Date(slab.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg ${config.color} flex items-center gap-2`}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="text-xs font-medium">{config.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Badge */}
                    {slab.paymentMethod && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        {slab.paymentMethod === 'online' ? (
                          <><CreditCard className="h-3 w-3" /> Online Payment</>
                        ) : (
                          <><Banknote className="h-3 w-3" /> Cash Payment</>
                        )}
                        {slab.transactionId && ` • ${slab.transactionId}`}
                      </div>
                    )}

                    {/* Cash Confirmation CTA */}
                    {needsConfirmation && (
                      <div className="mt-3 pt-3 border-t border-orange-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-orange-800">
                            Customer has notified cash payment. Confirm receipt to proceed.
                          </p>
                          <Button
                            onClick={() => handleConfirmCash(slab)}
                            size="sm"
                            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                          >
                            Confirm Cash Received
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Admin Approval Status */}
                    {slab.status === 'cash_awaiting_admin' && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <div className="flex items-center gap-2 text-sm text-purple-800">
                          <Clock className="h-4 w-4" />
                          <span>Awaiting admin approval for cash payment</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Invoice Link */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <WithdrawModal
          availableAmount={receivedAmount}
          isKYCVerified={kycStatus.isVerified}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}

      {/* Cash Confirmation Modal */}
      {showCashConfirmModal && selectedSlab && (
        <CashConfirmationModal
          slab={selectedSlab}
          onClose={() => {
            setShowCashConfirmModal(false);
            setSelectedSlab(null);
          }}
          onConfirm={handleCashConfirmation}
        />
      )}
    </div>
  );
};

// Withdraw Modal
interface WithdrawModalProps {
  availableAmount: number;
  isKYCVerified: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ availableAmount, isKYCVerified, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            {isKYCVerified ? (
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            ) : (
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-center text-[#16232A] mb-2">
            {isKYCVerified ? 'Withdraw Funds' : 'KYC Required'}
          </h2>

          {isKYCVerified ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                Available balance for withdrawal
              </p>
              <div className="p-6 bg-green-50 rounded-lg text-center">
                <p className="text-4xl font-bold text-green-600">₹{availableAmount.toLocaleString()}</p>
              </div>
              <p className="text-xs text-center text-gray-500">
                Funds will be transferred to your registered bank account within 2-3 business days
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                Complete KYC verification to withdraw funds
              </p>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 text-center">
                  Withdrawals are disabled until KYC verification is complete
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          {isKYCVerified && (
            <Button className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white">
              Request Withdrawal
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Cash Confirmation Modal
interface CashConfirmationModalProps {
  slab: PaymentSlab;
  onClose: () => void;
  onConfirm: () => void;
}

const CashConfirmationModal: React.FC<CashConfirmationModalProps> = ({ slab, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-6 text-white rounded-t-xl">
          <h2 className="text-2xl font-bold">Confirm Cash Receipt</h2>
          <p className="text-white/90 text-sm">Verify you received cash from customer</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Important</p>
                <p className="text-xs text-yellow-800 mt-1">
                  Only confirm if you have received the exact cash amount from the customer. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Milestone:</span>
              <span className="text-sm font-medium">{slab.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="text-2xl font-bold text-[#075056]">₹{slab.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>After confirmation:</strong><br />
              • Payment will be sent to admin for final approval<br />
              • Admin will verify and mark as completed<br />
              • Amount will be added to your available balance
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white">
            Confirm Cash Received
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
