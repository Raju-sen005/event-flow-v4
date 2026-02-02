import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Check,
  Shield,
  Info,
  AlertTriangle,
  LogIn,
  LogOut,
  Eye
} from 'lucide-react';

type ExecutionStatus =
  | 'not-started'
  | 'make-in-submitted'
  | 'make-in-confirmed'
  | 'mark-out-submitted'
  | 'mark-out-confirmed'
  | 'issue-raised';

type VendorExecution = {
  id: string;
  vendorName: string;
  service: string;
  expectedStartTime: string;
  expectedEndTime: string;
  actualMakeInTime?: string;
  makeInConfirmedAt?: string;
  actualMarkOutTime?: string;
  markOutConfirmedAt?: string;
  status: ExecutionStatus;
  delay?: number; // in minutes
  issueDescription?: string;
  totalDuration?: number; // in minutes
};

export const EventExecution: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState<VendorExecution | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [actionType, setActionType] = useState<'make-in' | 'mark-out'>('make-in');

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    time: '18:00'
  };

  // Mock vendor execution data
  const vendorExecutions: VendorExecution[] = [
    {
      id: '1',
      vendorName: 'Elite Photography Studio',
      service: 'Photography',
      expectedStartTime: '2026-06-15T14:00:00',
      expectedEndTime: '2026-06-15T22:00:00',
      actualMakeInTime: '2026-06-15T14:15:00',
      makeInConfirmedAt: '2026-06-15T14:20:00',
      actualMarkOutTime: '2026-06-15T22:30:00',
      markOutConfirmedAt: '2026-06-15T22:35:00',
      status: 'mark-out-confirmed',
      delay: 15,
      totalDuration: 495
    },
    {
      id: '2',
      vendorName: 'Gourmet Catering Co.',
      service: 'Catering',
      expectedStartTime: '2026-06-15T16:00:00',
      expectedEndTime: '2026-06-15T21:00:00',
      actualMakeInTime: '2026-06-15T15:50:00',
      makeInConfirmedAt: '2026-06-15T15:55:00',
      actualMarkOutTime: '2026-06-15T21:15:00',
      status: 'mark-out-submitted',
      delay: -10
    },
    {
      id: '3',
      vendorName: 'DJ Beats Entertainment',
      service: 'DJ Services',
      expectedStartTime: '2026-06-15T18:00:00',
      expectedEndTime: '2026-06-15T23:00:00',
      actualMakeInTime: '2026-06-15T18:00:00',
      makeInConfirmedAt: '2026-06-15T18:05:00',
      status: 'make-in-confirmed'
    },
    {
      id: '4',
      vendorName: 'Elegant Event Decor',
      service: 'Decoration',
      expectedStartTime: '2026-06-15T12:00:00',
      expectedEndTime: '2026-06-15T16:00:00',
      actualMakeInTime: '2026-06-15T12:30:00',
      status: 'make-in-submitted',
      delay: 30
    }
  ];

  const getStatusBadge = (status: ExecutionStatus) => {
    switch (status) {
      case 'mark-out-confirmed':
        return 'bg-green-100 text-green-700';
      case 'make-in-confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'mark-out-submitted':
      case 'make-in-submitted':
        return 'bg-amber-100 text-amber-700';
      case 'issue-raised':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: ExecutionStatus) => {
    switch (status) {
      case 'not-started':
        return 'Not Started';
      case 'make-in-submitted':
        return 'Make-In Submitted';
      case 'make-in-confirmed':
        return 'Make-In Confirmed';
      case 'mark-out-submitted':
        return 'Mark-Out Submitted';
      case 'mark-out-confirmed':
        return 'Completed';
      case 'issue-raised':
        return 'Issue Raised';
      default:
        return status;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleConfirmMakeIn = (vendor: VendorExecution) => {
    setSelectedVendor(vendor);
    setActionType('make-in');
    setShowConfirmModal(true);
  };

  const handleConfirmMarkOut = (vendor: VendorExecution) => {
    setSelectedVendor(vendor);
    setActionType('mark-out');
    setShowConfirmModal(true);
  };

  const handleRaiseIssue = (vendor: VendorExecution, type: 'make-in' | 'mark-out') => {
    setSelectedVendor(vendor);
    setActionType(type);
    setShowIssueModal(true);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Event Execution & Attendance</h1>
          <p className="text-[#16232A]/70">
            Track vendor arrival, departure, and execution for {event.name}.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">How It Works</p>
          <p className="text-sm text-blue-800 mt-1">
            Vendors will mark their arrival (Make-In) and departure (Mark-Out) on the event day. 
            You must confirm each timestamp to finalize the record. Confirmed times cannot be edited 
            and are used for accountability and dispute resolution.
          </p>
        </div>
      </div>

      {/* Vendor Execution Cards */}
      <div className="space-y-4">
        {vendorExecutions.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#16232A] mb-1">{vendor.vendorName}</h3>
                <p className="text-[#16232A]/70 mb-3">{vendor.service}</p>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(
                    vendor.status
                  )}`}
                >
                  <Clock className="h-4 w-4" />
                  {getStatusText(vendor.status)}
                </span>
              </div>

              {vendor.delay !== undefined && vendor.delay !== 0 && (
                <div
                  className={`px-4 py-2 rounded-lg ${
                    vendor.delay > 0 ? 'bg-amber-100' : 'bg-green-100'
                  }`}
                >
                  <p className="text-xs font-medium text-[#16232A]/60 mb-1">
                    {vendor.delay > 0 ? 'Delay' : 'Early'}
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      vendor.delay > 0 ? 'text-amber-700' : 'text-green-700'
                    }`}
                  >
                    {Math.abs(vendor.delay)} min
                  </p>
                </div>
              )}
            </div>

            {/* Expected Times */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-xs font-medium text-[#16232A]/60 mb-1">Expected Start</p>
                <p className="font-semibold text-[#16232A]">
                  {new Date(vendor.expectedStartTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#16232A]/60 mb-1">Expected End</p>
                <p className="font-semibold text-[#16232A]">
                  {new Date(vendor.expectedEndTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Make-In Section */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      vendor.makeInConfirmedAt
                        ? 'bg-green-100'
                        : vendor.actualMakeInTime
                        ? 'bg-amber-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <LogIn
                      className={`h-5 w-5 ${
                        vendor.makeInConfirmedAt
                          ? 'text-green-600'
                          : vendor.actualMakeInTime
                          ? 'text-amber-600'
                          : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#16232A]">Make-In (Arrival)</p>
                    {vendor.actualMakeInTime && (
                      <p className="text-sm text-[#16232A]/70">
                        {new Date(vendor.actualMakeInTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                    {vendor.makeInConfirmedAt && (
                      <p className="text-xs text-green-600">
                        Confirmed at{' '}
                        {new Date(vendor.makeInConfirmedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {vendor.status === 'make-in-submitted' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRaiseIssue(vendor, 'make-in')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Raise Issue
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleConfirmMakeIn(vendor)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirm Make-In
                    </Button>
                  </div>
                )}

                {vendor.makeInConfirmedAt && (
                  <div className="text-green-600 font-medium text-sm">✓ Confirmed</div>
                )}
              </div>
            </div>

            {/* Mark-Out Section */}
            {vendor.actualMakeInTime && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        vendor.markOutConfirmedAt
                          ? 'bg-green-100'
                          : vendor.actualMarkOutTime
                          ? 'bg-amber-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <LogOut
                        className={`h-5 w-5 ${
                          vendor.markOutConfirmedAt
                            ? 'text-green-600'
                            : vendor.actualMarkOutTime
                            ? 'text-amber-600'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#16232A]">Mark-Out (Departure)</p>
                      {vendor.actualMarkOutTime && (
                        <p className="text-sm text-[#16232A]/70">
                          {new Date(vendor.actualMarkOutTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                      {vendor.markOutConfirmedAt && (
                        <p className="text-xs text-green-600">
                          Confirmed at{' '}
                          {new Date(vendor.markOutConfirmedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                      {vendor.totalDuration && (
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          Total Duration: {formatDuration(vendor.totalDuration)}
                        </p>
                      )}
                    </div>
                  </div>

                  {vendor.status === 'mark-out-submitted' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRaiseIssue(vendor, 'mark-out')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Raise Issue
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleConfirmMarkOut(vendor)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirm Mark-Out
                      </Button>
                    </div>
                  )}

                  {vendor.markOutConfirmedAt && (
                    <div className="text-green-600 font-medium text-sm">✓ Confirmed</div>
                  )}
                </div>
              </div>
            )}

            {/* View Full Log */}
            {vendor.makeInConfirmedAt && (
              <div className="border-t border-gray-200 mt-4 pt-4">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Complete Attendance Log
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedVendor && (
        <ConfirmationModal
          vendor={selectedVendor}
          actionType={actionType}
          onClose={() => {
            setShowConfirmModal(false);
            setSelectedVendor(null);
          }}
          onConfirm={() => {
            console.log('Confirming', actionType);
            setShowConfirmModal(false);
            setSelectedVendor(null);
          }}
        />
      )}

      {/* Issue Modal */}
      {showIssueModal && selectedVendor && (
        <IssueModal
          vendor={selectedVendor}
          actionType={actionType}
          onClose={() => {
            setShowIssueModal(false);
            setSelectedVendor(null);
          }}
        />
      )}
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal: React.FC<{
  vendor: VendorExecution;
  actionType: 'make-in' | 'mark-out';
  onClose: () => void;
  onConfirm: () => void;
}> = ({ vendor, actionType, onClose, onConfirm }) => {
  const time = actionType === 'make-in' ? vendor.actualMakeInTime : vendor.actualMarkOutTime;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">
          Confirm {actionType === 'make-in' ? 'Make-In' : 'Mark-Out'}
        </h3>

        <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
          <p className="font-bold text-[#16232A] text-lg mb-3">{vendor.vendorName}</p>

          <p className="text-sm text-[#16232A]/60 mb-1">
            {actionType === 'make-in' ? 'Arrival' : 'Departure'} Time
          </p>
          <p className="text-2xl font-bold text-[#FF5B04]">
            {time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
          </p>

          {vendor.delay !== undefined && vendor.delay !== 0 && (
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className={`text-sm font-medium ${vendor.delay > 0 ? 'text-amber-700' : 'text-green-700'}`}>
                {vendor.delay > 0 ? `${vendor.delay} minutes late` : `${Math.abs(vendor.delay)} minutes early`}
              </p>
            </div>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Important</p>
            <p className="text-sm text-amber-800 mt-1">
              Once confirmed, this timestamp cannot be edited. It will be permanently logged for 
              accountability and dispute resolution. Please verify before confirming.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Issue Modal
const IssueModal: React.FC<{
  vendor: VendorExecution;
  actionType: 'make-in' | 'mark-out';
  onClose: () => void;
}> = ({ vendor, actionType, onClose }) => {
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = () => {
    console.log('Raising issue:', issueDescription);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">Raise Issue</h3>

        <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
          <p className="font-bold text-[#16232A]">{vendor.vendorName}</p>
          <p className="text-sm text-[#16232A]/70 mt-1">{vendor.service}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Describe the Issue <span className="text-[#FF5B04]">*</span>
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            rows={5}
            placeholder="Please describe the issue (e.g., late arrival, early departure, service quality concerns)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] resize-none"
          />
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Dispute Process</p>
            <p className="text-sm text-red-800 mt-1">
              Raising an issue will notify the admin team for review. This may delay the 
              confirmation process. All timestamps and details will be logged for resolution.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!issueDescription.trim()}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Submit Issue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
