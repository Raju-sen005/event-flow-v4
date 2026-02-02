import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  FileText,
  Lock,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';

interface FinalizeVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vendorName: string;
  finalPrice: number;
  originalPrice: number;
  timeline: string;
  deliverables: string[];
  isProcessing?: boolean;
}

export const FinalizeVendorModal: React.FC<FinalizeVendorModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  vendorName,
  finalPrice,
  originalPrice,
  timeline,
  deliverables,
  isProcessing = false
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const paymentSlabs = [
    { stage: 'Booking Confirmation', percentage: 30, amount: finalPrice * 0.3 },
    { stage: 'Pre-Event (7 days before)', percentage: 40, amount: finalPrice * 0.4 },
    { stage: 'Post-Event Delivery', percentage: 30, amount: finalPrice * 0.3 }
  ];

  const handleConfirm = () => {
    if (confirmed) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/90 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Finalize Vendor</h2>
                <p className="text-white/90 text-sm">
                  Review and confirm your booking with {vendorName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isProcessing}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Warning Banner */}
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Important Notice</p>
                  <p className="text-sm text-yellow-800">
                    This action is <strong>irreversible</strong>. Once you finalize this vendor, the booking will be confirmed 
                    and the vendor will be notified. You cannot select another vendor for this requirement after finalization.
                  </p>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#16232A] mb-3">Vendor Details</h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-bold text-[#16232A] text-lg">{vendorName}</p>
                    <p className="text-sm text-blue-700">Selected vendor for your requirement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Agreement Terms */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#16232A] mb-3">Final Agreement Terms</h3>
              <div className="space-y-3">
                {/* Price */}
                <div className="p-4 bg-white border-2 border-green-500 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Final Price</p>
                        <p className="text-2xl font-bold text-green-600">₹{finalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    {finalPrice < originalPrice && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500 line-through">₹{originalPrice.toLocaleString()}</p>
                        <p className="text-sm font-medium text-green-600">
                          Saved ₹{(originalPrice - finalPrice).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-[#075056]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery Timeline</p>
                      <p className="font-bold text-[#16232A]">{timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#16232A] mb-3">Included Deliverables</h3>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="grid md:grid-cols-2 gap-2">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Slabs */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#16232A] mb-3">Payment Schedule</h3>
              <div className="space-y-3">
                {paymentSlabs.map((slab, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#16232A]">{slab.stage}</p>
                      <p className="text-sm text-gray-600">{slab.percentage}% of total amount</p>
                    </div>
                    <p className="font-bold text-[#075056]">₹{slab.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Payments are secure and protected by our platform. You'll receive payment links after vendor accepts the finalization.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">What happens next?</h4>
              <ol className="space-y-2 text-sm text-purple-800">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Vendor will be notified of your finalization request</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Vendor must accept the finalization to proceed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Once accepted, the agreement will be generated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>You'll receive payment links to complete the booking</span>
                </li>
              </ol>
            </div>

            {/* Confirmation Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 h-5 w-5 text-[#075056] rounded border-gray-300"
                  disabled={isProcessing}
                />
                <div>
                  <p className="font-semibold text-[#16232A]">I understand and agree</p>
                  <p className="text-sm text-gray-600 mt-1">
                    I confirm that I have reviewed all details and understand that this action cannot be undone. 
                    I agree to the payment schedule and vendor terms listed above.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!confirmed || isProcessing}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Finalization
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
