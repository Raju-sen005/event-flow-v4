import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Banknote,
  Download,
  Shield,
  Lock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PaymentSlab, PaymentStatus, EventPayment } from '../../types/payment';

export const EventPayments: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlab, setSelectedSlab] = useState<PaymentSlab | null>(null);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showOnlinePayment, setShowOnlinePayment] = useState(false);

  // Mock payment data
  const eventPayment: EventPayment = {
    id: 'payment-1',
    eventId: id || '1',
    eventName: 'Singh Family Wedding',
    vendorId: 'vendor-1',
    vendorName: 'Elite Photography Studio',
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
        status: 'paid',
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
        status: 'pending'
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
  };

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return {
          label: status === 'completed' ? 'Completed' : 'Paid',
          color: 'bg-green-100 text-green-700 border-green-300',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      case 'cash_awaiting_vendor':
        return {
          label: 'Cash - Awaiting Vendor',
          color: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
      case 'cash_awaiting_admin':
        return {
          label: 'Cash - Awaiting Admin',
          color: 'bg-purple-100 text-purple-700 border-purple-300',
          icon: Clock,
          iconColor: 'text-purple-600'
        };
      case 'failed':
        return {
          label: 'Failed',
          color: 'bg-red-100 text-red-700 border-red-300',
          icon: AlertCircle,
          iconColor: 'text-red-600'
        };
      case 'disputed':
        return {
          label: 'Disputed',
          color: 'bg-orange-100 text-orange-700 border-orange-300',
          icon: AlertCircle,
          iconColor: 'text-orange-600'
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: AlertCircle,
          iconColor: 'text-gray-600'
        };
    }
  };

  const handlePayOnline = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowOnlinePayment(true);
    // Simulate payment gateway
    setTimeout(() => {
      alert(`Online payment of ₹${slab.amount.toLocaleString()} initiated!`);
      setShowOnlinePayment(false);
    }, 1500);
  };

  const handlePayCash = (slab: PaymentSlab) => {
    setSelectedSlab(slab);
    setShowCashModal(true);
  };

  const paidAmount = eventPayment.slabs
    .filter(s => s.status === 'paid' || s.status === 'completed')
    .reduce((sum, s) => sum + s.amount, 0);

  const pendingAmount = eventPayment.totalAmount - paidAmount;

  if (!eventPayment.isFinalized) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
          <Lock className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-900 mb-2">Payments Locked</h2>
          <p className="text-yellow-800">
            Payments will be unlocked after vendor finalization is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16232A]">Payment Schedule</h1>
            <p className="text-[#16232A]/70 mt-1">{eventPayment.eventName}</p>
            <p className="text-sm text-[#16232A]/60">Vendor: {eventPayment.vendorName}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Payment Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#075056] to-[#075056]/90 rounded-xl p-6 text-white"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Amount</p>
            <p className="text-3xl font-bold">₹{eventPayment.totalAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Paid</p>
            <p className="text-3xl font-bold text-green-300">₹{paidAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-300">₹{pendingAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Shield className="h-4 w-4" />
            <span>All payments are secure and protected by our platform</span>
          </div>
        </div>
      </motion.div>

      {/* Payment Slabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#16232A]">Payment Milestones</h2>
        
        {eventPayment.slabs.map((slab, index) => {
          const config = getStatusConfig(slab.status);
          const StatusIcon = config.icon;
          const isPending = slab.status === 'pending';
          const isPaid = slab.status === 'paid' || slab.status === 'completed';
          const isDueSoon = isPending && new Date(slab.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

          return (
            <motion.div
              key={slab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 border-2 ${
                isPaid ? 'border-green-300' : isDueSoon ? 'border-yellow-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isPaid ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <span className="font-bold text-[#16232A]">{slab.slabNumber}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#16232A]">{slab.name}</h3>
                      <p className="text-sm text-gray-600">{slab.percentage}% of total amount</p>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border-2 ${config.color} flex items-center gap-2`}>
                  <StatusIcon className={`h-4 w-4 ${config.iconColor}`} />
                  <span className="font-medium text-sm">{config.label}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Amount</p>
                  <p className="text-2xl font-bold text-[#075056]">₹{slab.amount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Due Date</p>
                  <p className="font-bold text-[#16232A]">
                    {new Date(slab.dueDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  <p className="font-bold text-[#16232A]">{config.label}</p>
                </div>
              </div>

              {/* Payment Details (if paid) */}
              {isPaid && slab.paymentMethod && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-800 font-medium">Payment Completed</p>
                      <p className="text-xs text-green-600">
                        {slab.paymentMethod === 'online' ? 'Online Payment' : 'Cash Payment'}
                        {slab.transactionId && ` • ${slab.transactionId}`}
                      </p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              )}

              {/* Cash Payment Status */}
              {slab.status === 'cash_awaiting_vendor' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Awaiting Vendor Confirmation</p>
                      <p className="text-xs text-blue-700 mt-1">
                        The vendor needs to confirm receipt of cash payment before it can be processed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slab.status === 'cash_awaiting_admin' && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">Awaiting Admin Approval</p>
                      <p className="text-xs text-purple-700 mt-1">
                        Vendor has confirmed receipt. Admin approval is pending.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Actions */}
              {isPending && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => handlePayOnline(slab)}
                    className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Online
                  </Button>
                  <Button
                    onClick={() => handlePayCash(slab)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    Pay Cash
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Payment Terms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
      >
        <h3 className="font-semibold text-[#16232A] mb-3">Payment Terms & Conditions</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Online payments are processed securely through our payment gateway</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Cash payments require vendor confirmation and admin approval</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Payments must be made before the due date to avoid service disruption</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Refunds are processed as per the cancellation policy in the agreement</span>
          </li>
        </ul>
      </motion.div>

      {/* Cash Payment Modal */}
      {showCashModal && selectedSlab && (
        <CashPaymentModal
          slab={selectedSlab}
          onClose={() => {
            setShowCashModal(false);
            setSelectedSlab(null);
          }}
          onConfirm={() => {
            alert('Cash payment notification sent to vendor!');
            setShowCashModal(false);
            setSelectedSlab(null);
          }}
        />
      )}
    </div>
  );
};

// Cash Payment Modal Component
interface CashPaymentModalProps {
  slab: PaymentSlab;
  onClose: () => void;
  onConfirm: () => void;
}

const CashPaymentModal: React.FC<CashPaymentModalProps> = ({ slab, onClose, onConfirm }) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/90 p-6 text-white rounded-t-xl">
          <h2 className="text-2xl font-bold">Cash Payment</h2>
          <p className="text-white/90 text-sm">Notify vendor of cash payment</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Important</p>
                <p className="text-xs text-yellow-800 mt-1">
                  Cash payments require vendor confirmation and admin approval. Make sure you have handed over the cash to the vendor before proceeding.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Payment Details</p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Milestone:</span>
                <span className="text-sm font-medium">{slab.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-lg font-bold text-[#075056]">₹{slab.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Add any notes about the cash payment..."
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>What happens next:</strong><br />
              1. Vendor will be notified of your cash payment<br />
              2. Vendor must confirm receiving the cash<br />
              3. Admin will review and approve the payment<br />
              4. Payment status will update to "Completed"
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            Confirm Cash Payment
          </Button>
        </div>
      </motion.div>
    </div>
  );
};