import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface WithdrawBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (reason: string) => void;
  bid: any;
}

export const WithdrawBidModal: React.FC<WithdrawBidModalProps> = ({
  isOpen,
  onClose,
  onWithdraw,
  bid,
}) => {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const predefinedReasons = [
    'No longer available on event date',
    'Unable to meet requirements',
    'Pricing concerns',
    'Found better opportunity',
    'Customer not responding',
    'Other',
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    if (finalReason) {
      onWithdraw(finalReason);
      setReason('');
      setSelectedReason('');
    }
  };

  if (!bid) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#16232A]">Withdraw Bid</h2>
                  <p className="text-sm text-[#16232A]/70">This action cannot be undone</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-[#16232A]/70" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Bid Details */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-[#16232A]/70 mb-1">You are withdrawing bid for:</p>
                <p className="font-semibold text-[#16232A] mb-2">{bid.title}</p>
                <p className="text-xl font-bold text-[#075056]">
                  ₹{bid.bidAmount.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900 mb-1">Important Notice</p>
                    <p className="text-sm text-red-700">
                      Withdrawing a bid may affect your vendor rating and future opportunities. 
                      The customer will be notified immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-3">
                  Please select a reason for withdrawal: <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {predefinedReasons.map((reasonOption) => (
                    <label
                      key={reasonOption}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedReason === reasonOption
                          ? 'border-[#075056] bg-[#075056]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reasonOption}
                        checked={selectedReason === reasonOption}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="h-4 w-4 text-[#075056] focus:ring-[#075056]"
                      />
                      <span className="text-sm text-[#16232A]">{reasonOption}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Reason (if "Other" is selected) */}
              {selectedReason === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-[#16232A] mb-2">
                    Please specify reason: <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter your reason for withdrawal..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-xl">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!selectedReason || (selectedReason === 'Other' && !reason.trim())}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Withdraw Bid
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};