import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  Package,
  Shield,
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  XIcon,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export const RentalSummary: React.FC = () => {
  const { eventId, itemId } = useParams<{ eventId: string; itemId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state || {};

  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const item = {
    id: itemId,
    name: 'Royal Blue Sherwani with Embroidery',
    image: 'https://images.unsplash.com/photo-1583846112910-c5143e91f6ec?w=400',
    vendorName: 'Elegant Rentals Co.',
  };

  const policies = {
    cancellation: '100% refund if canceled 7+ days before rental start date. 50% refund if canceled 3-6 days before. No refund within 3 days of rental start.',
    lateReturn: '₹500 per day penalty for late returns. Items must be returned by 6 PM on the return date.',
    damage: 'Minor damages will be deducted from deposit. Major damages may require additional payment beyond deposit amount.',
    loss: 'Full item value will be charged in case of loss. Deposit will be forfeited and additional charges may apply.',
  };

  const {
    startDate = '2026-06-10',
    endDate = '2026-06-15',
    selectedSize = 'M',
    quantity = 1,
    duration = 6,
    rentalCharge = 5000,
    deposit = 5000,
    total = 10000,
  } = bookingDetails;

  const taxes = Math.round(rentalCharge * 0.18); // 18% GST
  const finalTotal = rentalCharge + deposit + taxes;

  const handleProceedToPayment = () => {
    if (!agreedToTerms) {
      alert('Please agree to the rental terms and policies to proceed');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = () => {
    // Navigate to payment (in real app, this would initiate payment gateway)
    alert('Payment gateway integration would happen here. For demo, marking as paid.');
    navigate(`/customer/events/${eventId}/rentals/active`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Booking
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{eventName}</span>
        </div>
        <h1 className="text-2xl font-bold text-[#16232A]">
          Review & Confirm Rental
        </h1>
        <p className="text-gray-600 mt-1">
          Please review your rental details before proceeding to payment
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-[#075056]" />
          Rental Summary
        </h3>

        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#16232A] mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{item.vendorName}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-2 py-1 bg-gray-100 rounded">
                Size: {selectedSize}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded">
                Qty: {quantity}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1 font-medium">
              Rental Period
            </p>
            <p className="font-semibold text-blue-900">
              {new Date(startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              to{' '}
              {new Date(endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              {duration} day{duration !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1 font-medium">
              Return By
            </p>
            <p className="font-semibold text-green-900">
              {new Date(endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              6:00 PM
            </p>
            <p className="text-xs text-green-700 mt-1">
              Late returns incur ₹500/day penalty
            </p>
          </div>
        </div>

        <div className="bg-[#E4EEF0] rounded-lg p-5">
          <h4 className="font-semibold text-[#16232A] mb-3">
            Payment Breakdown
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">
                Rental Charge ({duration} days)
              </span>
              <span className="font-semibold">₹{rentalCharge.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">GST (18%)</span>
              <span className="font-semibold">₹{taxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Refundable Deposit
              </span>
              <span className="font-semibold">₹{deposit.toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-300 my-3" />
            <div className="flex justify-between text-lg">
              <span className="font-bold text-[#16232A]">Total Payable</span>
              <span className="font-bold text-[#FF5B04] text-2xl">
                ₹{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rental Policies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#075056]" />
          Rental Terms & Policies
        </h3>

        <div className="space-y-3 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-1 text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Cancellation Policy
            </h4>
            <p className="text-xs text-blue-800">{policies.cancellation}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-1 text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Late Return Policy
            </h4>
            <p className="text-xs text-amber-800">{policies.lateReturn}</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-1 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Damage & Loss Policy
            </h4>
            <p className="text-xs text-orange-800">
              {policies.damage} {policies.loss}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPolicyModal(true)}
          className="text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium text-sm underline"
        >
          View Full Terms & Conditions
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-5 w-5 text-[#FF5B04] border-gray-300 rounded focus:ring-[#FF5B04] mt-0.5"
            />
            <span className="text-sm text-gray-700 flex-1">
              I have read and agree to the rental terms, cancellation policy,
              and damage/loss policies stated above. I understand that the
              deposit will be refunded only after successful return of the item
              in good condition.
            </span>
          </label>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-2">
              Before You Proceed
            </p>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Rental starts on {new Date(startDate).toLocaleDateString()}</li>
              <li>• Item must be returned by 6 PM on {new Date(endDate).toLocaleDateString()}</li>
              <li>• Deposit of ₹{deposit.toLocaleString()} will be held and refunded after return</li>
              <li>• Late returns, damages, or loss will incur additional charges</li>
              <li>• You will receive booking confirmation via email & SMS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex-1"
        >
          Go Back
        </Button>
        <Button
          onClick={handleProceedToPayment}
          disabled={!agreedToTerms}
          className={`flex-1 ${
            agreedToTerms
              ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {agreedToTerms ? 'Proceed to Payment' : 'Agree to Terms to Continue'}
        </Button>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {showPolicyModal && (
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#16232A]">
                  Full Terms & Conditions
                </h2>
                <button
                  onClick={() => setShowPolicyModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[#16232A] mb-2">1. Cancellation Policy</h3>
                  <p>{policies.cancellation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#16232A] mb-2">2. Late Return Policy</h3>
                  <p>{policies.lateReturn}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#16232A] mb-2">3. Damage Policy</h3>
                  <p>{policies.damage}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#16232A] mb-2">4. Loss Policy</h3>
                  <p>{policies.loss}</p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <Button
                  onClick={() => setShowPolicyModal(false)}
                  className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirmModal && (
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
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#16232A] mb-3">
                Confirm Payment
              </h3>
              <p className="text-gray-600 mb-6">
                By proceeding, you agree to the rental terms and policies. Total amount of{' '}
                <strong className="text-[#FF5B04]">₹{finalTotal.toLocaleString()}</strong>{' '}
                will be charged.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  Agree & Pay
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
