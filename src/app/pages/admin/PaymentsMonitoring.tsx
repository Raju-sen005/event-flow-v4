import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Download,
  Search,
  CreditCard,
  Banknote,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { PaymentStatus } from '../../types/payment';

export const PaymentsMonitoring: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | 'all'>('all');
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock payments data
  const payments = [
    {
      id: 'payment-1',
      eventName: 'Singh Family Wedding',
      customerName: 'Vikram Singh',
      vendorName: 'Elite Photography Studio',
      slabName: 'Booking Advance',
      amount: 27000,
      method: 'online',
      status: 'completed' as PaymentStatus,
      paidAt: '2025-01-23T14:30:00',
      transactionId: 'TXN123456789'
    },
    {
      id: 'payment-2',
      eventName: 'Singh Family Wedding',
      customerName: 'Vikram Singh',
      vendorName: 'Elite Photography Studio',
      slabName: 'Pre-Event Payment',
      amount: 36000,
      method: 'cash',
      status: 'cash_awaiting_admin' as PaymentStatus,
      requestedAt: '2025-01-24T10:00:00',
      vendorConfirmedAt: '2025-01-24T11:30:00'
    },
    {
      id: 'payment-3',
      eventName: 'Tech Summit 2025',
      customerName: 'Neha Kapoor',
      vendorName: 'Gourmet Catering Co',
      slabName: 'Booking Advance',
      amount: 105000,
      method: 'online',
      status: 'paid' as PaymentStatus,
      paidAt: '2025-01-22T09:15:00',
      transactionId: 'TXN987654321'
    },
    {
      id: 'payment-4',
      eventName: '30th Birthday Bash',
      customerName: 'Riya Sharma',
      vendorName: 'Decor Dreams',
      slabName: 'Pre-Event Payment',
      amount: 16800,
      method: 'cash',
      status: 'cash_awaiting_vendor' as PaymentStatus,
      requestedAt: '2025-01-24T16:45:00'
    }
  ];

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'paid':
        return {
          label: 'Paid',
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
          label: 'Cash - Awaiting Vendor',
          color: 'bg-orange-100 text-orange-700',
          icon: Clock
        };
      case 'cash_awaiting_admin':
        return {
          label: 'Cash - Action Required',
          color: 'bg-purple-100 text-purple-700',
          icon: AlertCircle
        };
      case 'failed':
        return {
          label: 'Failed',
          color: 'bg-red-100 text-red-700',
          icon: XCircle
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-700',
          icon: AlertCircle
        };
    }
  };

  const cashApprovalQueue = payments.filter(p => p.status === 'cash_awaiting_admin');
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(p => {
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesSearch = 
      p.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Payment Monitoring</h1>
          <p className="text-[#16232A]/70">Monitor and manage all platform payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            onClick={() => setShowApprovalQueue(!showApprovalQueue)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white relative"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Approval Queue
            {cashApprovalQueue.length > 0 && (
              <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cashApprovalQueue.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
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
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">₹{completedAmount.toLocaleString()}</p>
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
            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-purple-600">{cashApprovalQueue.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cash Approval Queue */}
      {showApprovalQueue && cashApprovalQueue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-purple-900 mb-4">Cash Payments Awaiting Approval</h2>
          <div className="space-y-3">
            {cashApprovalQueue.map((payment) => (
              <CashApprovalCard key={payment.id} payment={payment} />
            ))}
          </div>
        </motion.div>
      )}

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
                placeholder="Search by event, customer, or vendor..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('all')}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('completed')}
            >
              Completed
            </Button>
            <Button
              variant={selectedStatus === 'cash_awaiting_admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('cash_awaiting_admin')}
            >
              Needs Approval
            </Button>
            <Button
              variant={selectedStatus === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('pending')}
            >
              Pending
            </Button>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-3">
        {filteredPayments.map((payment, index) => {
          const config = getStatusConfig(payment.status);
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[#16232A]">{payment.eventName}</h3>
                    <span className={`px-3 py-1 rounded-lg ${config.color} flex items-center gap-2 text-xs font-medium`}>
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Customer</p>
                      <p className="font-medium text-[#16232A]">{payment.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Vendor</p>
                      <p className="font-medium text-[#16232A]">{payment.vendorName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Milestone</p>
                      <p className="font-medium text-[#16232A]">{payment.slabName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Method</p>
                      <div className="flex items-center gap-1 font-medium text-[#16232A]">
                        {payment.method === 'online' ? (
                          <><CreditCard className="h-3 w-3" /> Online</>
                        ) : (
                          <><Banknote className="h-3 w-3" /> Cash</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-[#075056]">₹{payment.amount.toLocaleString()}</p>
                  {payment.transactionId && (
                    <p className="text-xs text-gray-500 mt-1">{payment.transactionId}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Cash Approval Card
interface CashApprovalCardProps {
  payment: any;
}

const CashApprovalCard: React.FC<CashApprovalCardProps> = ({ payment }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Cash payment of ₹${payment.amount.toLocaleString()} approved!`);
    setIsProcessing(false);
  };

  const handleReject = () => {
    const reason = prompt('Enter reason for rejection:');
    if (reason) {
      alert(`Cash payment rejected. Reason: ${reason}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-[#16232A]">{payment.eventName}</h4>
          <p className="text-sm text-gray-600">{payment.slabName}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
            <span>Customer: {payment.customerName}</span>
            <span>Vendor: {payment.vendorName}</span>
          </div>
        </div>
        <p className="text-xl font-bold text-[#075056]">₹{payment.amount.toLocaleString()}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-purple-200">
        <div className="text-xs text-gray-600">
          <p>Vendor confirmed: {new Date(payment.vendorConfirmedAt).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleReject}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-600 hover:bg-red-50"
            disabled={isProcessing}
          >
            <XCircle className="h-3 w-3 mr-1" />
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isProcessing}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            {isProcessing ? 'Processing...' : 'Approve'}
          </Button>
        </div>
      </div>
    </div>
  );
};
