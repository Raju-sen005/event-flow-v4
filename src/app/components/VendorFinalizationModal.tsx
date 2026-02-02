import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  AlertTriangle,
  User,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';

interface VendorFinalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: (reason: string) => void;
  customerName: string;
  eventName: string;
  finalPrice: number;
  timeline: string;
  deliverables: string[];
  isProcessing?: boolean;
}

export const VendorFinalizationModal: React.FC<VendorFinalizationModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  customerName,
  eventName,
  finalPrice,
  timeline,
  deliverables,
  isProcessing = false
}) => {
  const [action, setAction] = useState<'none' | 'accept' | 'decline'>('none');
  const [declineReason, setDeclineReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleAccept = () => {
    if (confirmed && action === 'accept') {
      onAccept();
    }
  };

  const handleDecline = () => {
    if (declineReason.trim() && action === 'decline') {
      onDecline(declineReason);
    }
  };

  const resetModal = () => {
    setAction('none');
    setDeclineReason('');
    setConfirmed(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
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
          onClick={handleClose}
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
          <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Finalization Request</h2>
                <p className="text-white/90 text-sm">
                  {customerName} wants to finalize you for their event
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isProcessing}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {action === 'none' && (
              <>
                {/* Customer Info */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-bold text-[#16232A] text-lg">{customerName}</p>
                      <p className="text-sm text-blue-700">{eventName}</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-800 mt-3">
                    This customer has reviewed your bid and wants to proceed with booking your services.
                  </p>
                </div>

                {/* Final Terms */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#16232A] mb-3">Final Agreed Terms</h3>
                  <div className="space-y-3">
                    {/* Price */}
                    <div className="p-4 bg-white border-2 border-green-500 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Final Price</p>
                          <p className="text-2xl font-bold text-green-600">₹{finalPrice.toLocaleString()}</p>
                        </div>
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
                  <h3 className="font-semibold text-[#16232A] mb-3">Your Deliverables</h3>
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

                {/* What Happens Next */}
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">If you accept:</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Booking will be confirmed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Agreement will be generated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Customer will make advance payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Event will be added to your calendar</span>
                    </li>
                  </ul>
                </div>

                {/* Warning */}
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 mb-1">Important</p>
                      <p className="text-sm text-yellow-800">
                        Once you accept, you are committing to deliver the services as agreed. 
                        Make sure you can fulfill all requirements before accepting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setAction('decline')}
                    variant="outline"
                    className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                    disabled={isProcessing}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline Request
                  </Button>
                  <Button
                    onClick={() => setAction('accept')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={isProcessing}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept & Proceed
                  </Button>
                </div>
              </>
            )}

            {/* Accept Confirmation */}
            {action === 'accept' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">Accepting Finalization</p>
                      <p className="text-sm text-green-800">
                        You're about to confirm this booking. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-[#16232A] mb-3">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event:</span>
                      <span className="font-medium">{eventName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">₹{finalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">{timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="mt-1 h-5 w-5 text-green-600 rounded border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-[#16232A]">I confirm acceptance</p>
                      <p className="text-sm text-gray-600 mt-1">
                        I commit to delivering all services as agreed and understand this cannot be reversed.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setAction('none');
                      setConfirmed(false);
                    }}
                    variant="outline"
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleAccept}
                    disabled={!confirmed || isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Acceptance'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Decline Form */}
            {action === 'decline' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Declining Finalization</p>
                      <p className="text-sm text-red-800">
                        Please provide a reason for declining. This will be shared with the customer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for declining *
                  </label>
                  <textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="e.g., Date conflict with another booking, unable to meet specific requirements, etc."
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 10 characters required
                  </p>
                </div>

                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    The customer will be able to finalize another vendor after you decline.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setAction('none');
                      setDeclineReason('');
                    }}
                    variant="outline"
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleDecline}
                    disabled={declineReason.trim().length < 10 || isProcessing}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Decline'}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
