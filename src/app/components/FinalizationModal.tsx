import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  FileText,
  Shield,
  X,
  Lock
} from 'lucide-react';
import { Button } from './ui/button';

interface PaymentSlab {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

interface FinalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  finalPrice: number;
  timeline: string;
  paymentSlabs: PaymentSlab[];
  onConfirm: () => void;
  isLoading?: boolean;
}

export const FinalizationModal: React.FC<FinalizationModalProps> = ({
  isOpen,
  onClose,
  vendorName,
  finalPrice,
  timeline,
  paymentSlabs,
  onConfirm,
  isLoading = false
}) => {
  const [confirmationStep, setConfirmationStep] = useState<'review' | 'confirm' | 'success'>('review');
  const [agreed, setAgreed] = useState(false);

  const handleConfirm = () => {
    if (confirmationStep === 'review') {
      setConfirmationStep('confirm');
    } else if (confirmationStep === 'confirm' && agreed) {
      onConfirm();
      setConfirmationStep('success');
    }
  };

  const handleClose = () => {
    setConfirmationStep('review');
    setAgreed(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          {confirmationStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Finalize Vendor</h2>
                  <button 
                    onClick={handleClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-white/80">Review the final terms before confirming</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Vendor Info */}
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Selected Vendor</p>
                  <p className="text-xl font-bold text-[#16232A]">{vendorName}</p>
                </div>

                {/* Final Terms */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Final Price</p>
                        <p className="text-2xl font-bold text-green-700">
                          ₹{finalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Timeline</p>
                        <p className="text-xl font-bold text-blue-700">{timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Slabs */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-[#075056]" />
                    <h3 className="font-semibold text-[#16232A]">Payment Schedule</h3>
                  </div>
                  <div className="space-y-2">
                    {paymentSlabs.map((slab, index) => (
                      <div
                        key={slab.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-[#075056] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-[#16232A]">{slab.name}</p>
                            <p className="text-xs text-gray-600">Due: {slab.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#075056]">
                            ₹{slab.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">{slab.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning Box */}
                <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Vendor will receive a finalization request and must accept it</li>
                        <li>• Once vendor accepts, this decision is <strong>irreversible</strong></li>
                        <li>• All bid details will be locked after finalization</li>
                        <li>• Payment schedule will be activated</li>
                        <li>• Agreement will be generated for signing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {confirmationStep === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Final Confirmation</h2>
                  <button 
                    onClick={() => setConfirmationStep('review')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-white/80">This action cannot be undone</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-3">
                        You are about to finalize <span className="text-[#075056]">{vendorName}</span>
                      </h3>
                      <p className="text-sm text-red-800 mb-4">
                        By confirming, you agree that:
                      </p>
                      <ul className="text-sm text-red-800 space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>You cannot finalize another vendor for this requirement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>You cannot edit the bid after vendor accepts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>You are committed to the payment schedule shown</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>This decision cannot be reversed once vendor accepts</span>
                        </li>
                      </ul>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-gray-300 text-[#075056] focus:ring-[#075056]"
                        />
                        <span className="text-sm font-medium text-red-900">
                          I understand and agree to these terms. I want to proceed with finalizing this vendor.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setConfirmationStep('review')}
                  disabled={isLoading}
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!agreed || isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isLoading ? (
                    'Sending Request...'
                  ) : (
                    'Confirm Finalization'
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {confirmationStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>

                <h2 className="text-2xl font-bold text-[#16232A] mb-3">
                  Finalization Request Sent!
                </h2>
                <p className="text-gray-600 mb-2">
                  The vendor has been notified and will review your request.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  You'll be notified once the vendor accepts or declines.
                </p>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Next Steps:</strong> The vendor will review the finalization request. 
                    Once accepted, the agreement will be generated and payment schedule will be activated.
                  </p>
                </div>

                <Button
                  onClick={handleClose}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
