import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  LogIn,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AttendanceRecord, AttendanceStatus } from '../../types/attendance';

export const AttendanceConfirmation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeType, setDisputeType] = useState<'mark_in' | 'mark_out' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock attendance data
  const attendance: AttendanceRecord = {
    id: 'att-1',
    eventId: id || 'event-1',
    eventName: 'Singh Family Wedding',
    vendorId: 'vendor-1',
    vendorName: 'Elite Photography Studio',
    customerId: 'customer-1',
    customerName: 'Vikram Singh',
    scheduledStartTime: '2025-02-14T10:00:00',
    scheduledEndTime: '2025-02-14T22:00:00',
    markInTime: '2025-02-14T10:15:00',
    markInLocation: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Venue Location, New Delhi'
    },
    markInSubmittedAt: '2025-02-14T10:15:30',
    status: 'mark_in_submitted',
    delayInMinutes: 15,
    isDisputed: false,
    createdAt: '2025-01-23T10:00:00',
    updatedAt: '2025-02-14T10:15:30',
    isFinalized: true
  };

  const getStatusConfig = (status: AttendanceStatus) => {
    switch (status) {
      case 'not_started':
        return {
          label: 'Not Started',
          color: 'bg-gray-100 text-gray-700',
          icon: Clock
        };
      case 'mark_in_submitted':
        return {
          label: 'Mark In - Awaiting Your Confirmation',
          color: 'bg-orange-100 text-orange-700',
          icon: AlertCircle
        };
      case 'mark_in_confirmed':
        return {
          label: 'Mark In - Confirmed',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'mark_out_submitted':
        return {
          label: 'Mark Out - Awaiting Your Confirmation',
          color: 'bg-orange-100 text-orange-700',
          icon: AlertCircle
        };
      case 'mark_out_confirmed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'disputed':
        return {
          label: 'Disputed',
          color: 'bg-red-100 text-red-700',
          icon: AlertTriangle
        };
    }
  };

  const handleConfirmMarkIn = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Mark In confirmed successfully!');
    setIsProcessing(false);
  };

  const handleConfirmMarkOut = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Mark Out confirmed successfully! Service completed.');
    setIsProcessing(false);
  };

  const handleRaiseDispute = (type: 'mark_in' | 'mark_out') => {
    setDisputeType(type);
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = async (reason: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Dispute raised successfully. Reason: ${reason}`);
    setShowDisputeModal(false);
    setIsProcessing(false);
  };

  const calculateDelay = () => {
    if (!attendance.markInTime) return 0;
    const scheduled = new Date(attendance.scheduledStartTime);
    const actual = new Date(attendance.markInTime);
    const diffMs = actual.getTime() - scheduled.getTime();
    return Math.floor(diffMs / (1000 * 60)); // minutes
  };

  const config = getStatusConfig(attendance.status);
  const StatusIcon = config.icon;
  const needsMarkInConfirmation = attendance.status === 'mark_in_submitted';
  const needsMarkOutConfirmation = attendance.status === 'mark_out_submitted';
  const delay = calculateDelay();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
            <h1 className="text-3xl font-bold text-[#16232A]">Vendor Attendance</h1>
            <p className="text-[#16232A]/70 mt-1">{attendance.eventName}</p>
            <p className="text-sm text-[#16232A]/60">Vendor: {attendance.vendorName}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${config.color} flex items-center gap-2`}>
            <StatusIcon className="h-5 w-5" />
            <span className="font-medium">{config.label}</span>
          </div>
        </div>
      </div>

      {/* Action Required Alert */}
      {(needsMarkInConfirmation || needsMarkOutConfirmation) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-orange-900">Action Required</p>
              <p className="text-sm text-orange-800 mt-1">
                Please review and confirm the vendor's {needsMarkInConfirmation ? 'arrival' : 'departure'} time below.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scheduled Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-lg font-bold text-[#16232A] mb-4">Scheduled Time</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Start Time</span>
            </div>
            <p className="text-2xl font-bold text-[#075056]">
              {new Date(attendance.scheduledStartTime).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(attendance.scheduledStartTime).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">End Time</span>
            </div>
            <p className="text-2xl font-bold text-[#075056]">
              {new Date(attendance.scheduledEndTime).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(attendance.scheduledEndTime).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mark In Details */}
      {attendance.markInTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl p-6 border-2 ${
            needsMarkInConfirmation ? 'border-orange-300' : 
            attendance.status === 'mark_in_confirmed' || attendance.status === 'mark_out_submitted' || attendance.status === 'mark_out_confirmed'
              ? 'border-green-300' : 'border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                attendance.markInConfirmedAt ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                <LogIn className={`h-6 w-6 ${attendance.markInConfirmedAt ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#16232A]">Vendor Arrival (Mark In)</h3>
                <p className="text-sm text-gray-600">
                  Submitted {new Date(attendance.markInSubmittedAt!).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#075056]">
                {new Date(attendance.markInTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
              {delay > 0 && (
                <p className="text-sm text-red-600 font-medium mt-1">
                  {delay} min {delay > 1 ? 'late' : 'late'}
                </p>
              )}
              {delay <= 0 && (
                <p className="text-sm text-green-600 font-medium mt-1">On time</p>
              )}
            </div>
          </div>

          {attendance.markInLocation && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {attendance.markInLocation.address || 
                  `${attendance.markInLocation.latitude.toFixed(4)}, ${attendance.markInLocation.longitude.toFixed(4)}`}
              </span>
            </div>
          )}

          {needsMarkInConfirmation && (
            <div className="flex gap-3">
              <Button
                onClick={handleConfirmMarkIn}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Confirming...' : 'Confirm Arrival'}
              </Button>
              <Button
                onClick={() => handleRaiseDispute('mark_in')}
                variant="outline"
                className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Raise Issue
              </Button>
            </div>
          )}

          {attendance.markInConfirmedAt && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">Confirmed by you</p>
                </div>
                <p className="text-xs text-green-600">
                  {new Date(attendance.markInConfirmedAt).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Mark Out Details */}
      {attendance.markOutTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white rounded-xl p-6 border-2 ${
            needsMarkOutConfirmation ? 'border-orange-300' : 
            attendance.status === 'mark_out_confirmed' ? 'border-green-300' : 'border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                attendance.markOutConfirmedAt ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                <LogOut className={`h-6 w-6 ${attendance.markOutConfirmedAt ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#16232A]">Vendor Departure (Mark Out)</h3>
                <p className="text-sm text-gray-600">
                  Submitted {new Date(attendance.markOutSubmittedAt!).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#075056]">
                {new Date(attendance.markOutTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>

          {attendance.markOutLocation && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {attendance.markOutLocation.address || 
                  `${attendance.markOutLocation.latitude.toFixed(4)}, ${attendance.markOutLocation.longitude.toFixed(4)}`}
              </span>
            </div>
          )}

          {needsMarkOutConfirmation && (
            <div className="flex gap-3">
              <Button
                onClick={handleConfirmMarkOut}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Confirming...' : 'Confirm Departure'}
              </Button>
              <Button
                onClick={() => handleRaiseDispute('mark_out')}
                variant="outline"
                className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Raise Issue
              </Button>
            </div>
          )}

          {attendance.markOutConfirmedAt && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">Confirmed - Service completed</p>
                </div>
                <p className="text-xs text-green-600">
                  {new Date(attendance.markOutConfirmedAt).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <h3 className="font-semibold text-blue-900 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Confirming attendance times makes them permanent and cannot be changed</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>If times don't match your expectations, use "Raise Issue" to dispute</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Location data is captured for accountability and audit purposes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>All attendance records are maintained permanently</span>
          </li>
        </ul>
      </motion.div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <DisputeModal
          type={disputeType!}
          onClose={() => setShowDisputeModal(false)}
          onSubmit={handleSubmitDispute}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

// Dispute Modal Component
interface DisputeModalProps {
  type: 'mark_in' | 'mark_out';
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isProcessing: boolean;
}

const DisputeModal: React.FC<DisputeModalProps> = ({ type, onClose, onSubmit, isProcessing }) => {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white rounded-t-xl">
          <h2 className="text-2xl font-bold">Raise Issue</h2>
          <p className="text-white/90 text-sm">
            {type === 'mark_in' ? 'Vendor Arrival Time' : 'Vendor Departure Time'}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Important</p>
                <p className="text-xs text-yellow-800 mt-1">
                  Raising a dispute will notify the vendor and admin. Please provide a clear reason for the dispute.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Reason for Dispute *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Please describe the issue with the recorded time..."
              required
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(reason)}
            disabled={!reason.trim() || isProcessing}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isProcessing ? 'Submitting...' : 'Submit Dispute'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
