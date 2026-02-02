import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  RotateCcw,
  MessageCircle,
  Shield,
  IndianRupee,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type RentalStatus = 'active' | 'return-requested' | 'returned' | 'issue-raised';

interface ActiveRental {
  id: string;
  itemName: string;
  itemImage: string;
  vendorName: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  rentalCharge: number;
  deposit: number;
  depositStatus: 'held' | 'refund-initiated' | 'refunded' | 'deducted';
  size: string;
  quantity: number;
}

export const ActiveRentals: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const activeRentals: ActiveRental[] = [
    {
      id: 'rent-001',
      itemName: 'Royal Blue Sherwani with Embroidery',
      itemImage: 'https://images.unsplash.com/photo-1583846112910-c5143e91f6ec?w=400',
      vendorName: 'Elegant Rentals Co.',
      startDate: '2026-06-10',
      endDate: '2026-06-15',
      status: 'active',
      rentalCharge: 5000,
      deposit: 5000,
      depositStatus: 'held',
      size: 'M',
      quantity: 1,
    },
    {
      id: 'rent-002',
      itemName: 'Designer Lehenga - Red & Gold',
      itemImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      vendorName: 'Bridal Dreams Rentals',
      startDate: '2026-06-12',
      endDate: '2026-06-16',
      status: 'return-requested',
      rentalCharge: 7000,
      deposit: 7000,
      depositStatus: 'held',
      size: 'M',
      quantity: 1,
    },
  ];

  const getStatusBadge = (status: RentalStatus) => {
    const styles = {
      active: 'bg-green-50 text-green-700 border-green-200',
      'return-requested': 'bg-blue-50 text-blue-700 border-blue-200',
      returned: 'bg-gray-50 text-gray-700 border-gray-200',
      'issue-raised': 'bg-red-50 text-red-700 border-red-200',
    };

    const icons = {
      active: CheckCircle,
      'return-requested': Clock,
      returned: CheckCircle,
      'issue-raised': AlertTriangle,
    };

    const labels = {
      active: 'Active',
      'return-requested': 'Return Requested',
      returned: 'Returned',
      'issue-raised': 'Issue Raised',
    };

    const Icon = icons[status];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {labels[status]}
      </span>
    );
  };

  const getDepositStatusBadge = (status: string) => {
    const styles = {
      held: 'bg-blue-50 text-blue-700',
      'refund-initiated': 'bg-yellow-50 text-yellow-700',
      refunded: 'bg-green-50 text-green-700',
      deducted: 'bg-red-50 text-red-700',
    };

    const labels = {
      held: 'Held',
      'refund-initiated': 'Refund Initiated',
      refunded: 'Refunded',
      deducted: 'Deducted',
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        <Shield className="h-3 w-3" />
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleRequestReturn = (rentalId: string) => {
    setSelectedRentalId(rentalId);
    setShowReturnModal(true);
  };

  const handleConfirmReturn = () => {
    alert('Return request submitted successfully! Vendor will confirm the return.');
    setShowReturnModal(false);
    setSelectedRentalId(null);
  };

  const handleViewDetails = (rentalId: string) => {
    navigate(`/customer/events/${eventId}/rentals/${rentalId}`);
  };

  const handleRaiseIssue = (rentalId: string) => {
    navigate(`/customer/support?rentalId=${rentalId}`);
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{eventName}</span>
        </div>
        <h1 className="text-2xl font-bold text-[#16232A]">Active Rentals</h1>
        <p className="text-gray-600 mt-1">
          Manage your active rental items for this event
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-bold text-[#16232A]">
                {activeRentals.filter((r) => r.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Return</p>
              <p className="text-xl font-bold text-[#16232A]">
                {activeRentals.filter((r) => r.status === 'return-requested').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Deposit Held</p>
              <p className="text-xl font-bold text-[#16232A]">
                ₹
                {activeRentals
                  .filter((r) => r.depositStatus === 'held')
                  .reduce((sum, r) => sum + r.deposit, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Issues</p>
              <p className="text-xl font-bold text-[#16232A]">
                {activeRentals.filter((r) => r.status === 'issue-raised').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rentals List */}
      {activeRentals.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">
            No active rentals for this event
          </h3>
          <p className="text-gray-600 mb-6">
            Browse rental items to get started
          </p>
          <Button
            onClick={() => navigate(`/customer/events/${eventId}/rentals`)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            Browse Rentals
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeRentals.map((rental, index) => {
            const daysRemaining = getDaysRemaining(rental.endDate);
            return (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  {/* Item Image */}
                  <div className="h-32 w-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={rental.itemImage}
                      alt={rental.itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#16232A] text-lg mb-1">
                          {rental.itemName}
                        </h3>
                        <p className="text-sm text-gray-600">{rental.vendorName}</p>
                      </div>
                      {getStatusBadge(rental.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(rental.startDate).toLocaleDateString()} -{' '}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package className="h-4 w-4" />
                          <span>
                            Size: {rental.size} • Qty: {rental.quantity}
                          </span>
                        </div>
                        {daysRemaining >= 0 && rental.status === 'active' && (
                          <div
                            className={`flex items-center gap-2 font-medium ${
                              daysRemaining <= 2 ? 'text-red-600' : 'text-gray-700'
                            }`}
                          >
                            <Clock className="h-4 w-4" />
                            <span>
                              {daysRemaining === 0
                                ? 'Return today'
                                : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rental Charge:</span>
                          <span className="font-semibold">₹{rental.rentalCharge.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Deposit:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">₹{rental.deposit.toLocaleString()}</span>
                            {getDepositStatusBadge(rental.depositStatus)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleViewDetails(rental.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>

                      {rental.status === 'active' && (
                        <Button
                          onClick={() => handleRequestReturn(rental.id)}
                          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                          size="sm"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Request Return
                        </Button>
                      )}

                      <Button
                        onClick={() => handleRaiseIssue(rental.id)}
                        variant="outline"
                        size="sm"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Raise Issue
                      </Button>
                    </div>

                    {/* Warnings */}
                    {daysRemaining < 0 && rental.status === 'active' && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-900">
                              Overdue Return
                            </p>
                            <p className="text-xs text-red-700">
                              This item is overdue. Late return penalties apply at ₹500/day.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {rental.status === 'return-requested' && (
                      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-900">
                              Return Request Pending
                            </p>
                            <p className="text-xs text-blue-700">
                              Waiting for vendor to confirm return and inspect condition.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Return Confirmation Modal */}
      <AnimatePresence>
        {showReturnModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            >
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#16232A] mb-3">
                Request Return?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you ready to return this item? The vendor will inspect the
                item condition and process your deposit refund accordingly.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800 text-left">
                  <strong>Important:</strong> Ensure the item is in good
                  condition. Any damages will be deducted from your deposit.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowReturnModal(false);
                    setSelectedRentalId(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmReturn}
                  className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  Confirm Return
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};