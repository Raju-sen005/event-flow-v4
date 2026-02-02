import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Check,
  AlertTriangle,
  Calendar,
  User,
  Building2,
  MapPin,
  Info,
  Loader2,
  Flag,
  PlayCircle,
  StopCircle,
  Timer,
  ClipboardList,
  Shield,
  Eye
} from 'lucide-react';

// Types
type AttendanceStatus = 
  | 'not_started' 
  | 'make_in_submitted' 
  | 'make_in_confirmed' 
  | 'mark_out_submitted' 
  | 'mark_out_confirmed'
  | 'issue_raised';

type VendorAttendance = {
  id: string;
  vendorId: string;
  vendorName: string;
  service: string;
  contactPerson: string;
  phone: string;
  
  // Expected times
  expectedStartTime: string;
  expectedEndTime: string;
  
  // Actual times (submitted by vendor)
  makeInSubmittedAt?: string;
  makeInConfirmedAt?: string;
  makeInConfirmedBy?: string;
  makeInGPSLocation?: string;
  
  markOutSubmittedAt?: string;
  markOutConfirmedAt?: string;
  markOutConfirmedBy?: string;
  markOutGPSLocation?: string;
  
  // Status
  status: AttendanceStatus;
  
  // Issues
  issueRaised?: boolean;
  issueDescription?: string;
  issueRaisedAt?: string;
  
  // Delays
  arrivalDelay?: number; // in minutes, negative = early
  completionDelay?: number; // in minutes
};

type AttendanceLogEntry = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
};

export const EventExecutionEnhanced: React.FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // State management
  const [showConfirmMakeInModal, setShowConfirmMakeInModal] = useState(false);
  const [showConfirmMarkOutModal, setShowConfirmMarkOutModal] = useState(false);
  const [showRaiseIssueModal, setShowRaiseIssueModal] = useState(false);
  const [showAttendanceLogModal, setShowAttendanceLogModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorAttendance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueType, setIssueType] = useState<'make-in' | 'mark-out' | null>(null);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    location: 'Grand Hotel Ballroom',
    startTime: '2026-06-15T14:00:00',
    endTime: '2026-06-15T23:00:00',
    isFinalized: true // Attendance only available after finalization
  };

  // Mock vendor attendance data
  const [vendorAttendance, setVendorAttendance] = useState<VendorAttendance[]>([
    {
      id: 'att-1',
      vendorId: 'vendor-1',
      vendorName: 'Elite Photography',
      service: 'Photography',
      contactPerson: 'John Smith',
      phone: '+1 234 567 8901',
      expectedStartTime: '2026-06-15T13:00:00', // 1 hour before event
      expectedEndTime: '2026-06-15T22:00:00', // 1 hour before event end
      makeInSubmittedAt: '2026-06-15T13:15:00', // 15 min late
      makeInConfirmedAt: '2026-06-15T13:20:00',
      makeInConfirmedBy: 'Customer',
      makeInGPSLocation: 'Grand Hotel Ballroom',
      markOutSubmittedAt: '2026-06-15T22:30:00', // 30 min late
      markOutConfirmedAt: '2026-06-15T22:35:00',
      markOutConfirmedBy: 'Customer',
      markOutGPSLocation: 'Grand Hotel Ballroom',
      status: 'mark_out_confirmed',
      arrivalDelay: 15,
      completionDelay: 30
    },
    {
      id: 'att-2',
      vendorId: 'vendor-2',
      vendorName: 'Gourmet Catering',
      service: 'Catering',
      contactPerson: 'Mary Johnson',
      phone: '+1 234 567 8902',
      expectedStartTime: '2026-06-15T12:00:00',
      expectedEndTime: '2026-06-15T23:30:00',
      makeInSubmittedAt: '2026-06-15T11:45:00', // 15 min early
      status: 'make_in_submitted',
      arrivalDelay: -15 // negative = early
    },
    {
      id: 'att-3',
      vendorId: 'vendor-3',
      vendorName: 'Sound & Lighting Pro',
      service: 'Audio/Visual',
      contactPerson: 'David Lee',
      phone: '+1 234 567 8903',
      expectedStartTime: '2026-06-15T10:00:00',
      expectedEndTime: '2026-06-15T23:30:00',
      status: 'not_started'
    }
  ]);

  // Mock attendance log
  const attendanceLog: AttendanceLogEntry[] = [
    {
      id: 'log-1',
      timestamp: '2026-06-15T13:15:00',
      action: 'Make-In Submitted',
      actor: 'Elite Photography',
      details: 'Vendor submitted arrival at 1:15 PM (15 min late)'
    },
    {
      id: 'log-2',
      timestamp: '2026-06-15T13:20:00',
      action: 'Make-In Confirmed',
      actor: 'Customer',
      details: 'Customer confirmed vendor arrival'
    },
    {
      id: 'log-3',
      timestamp: '2026-06-15T22:30:00',
      action: 'Mark-Out Submitted',
      actor: 'Elite Photography',
      details: 'Vendor submitted completion at 10:30 PM (30 min late)'
    },
    {
      id: 'log-4',
      timestamp: '2026-06-15T22:35:00',
      action: 'Mark-Out Confirmed',
      actor: 'Customer',
      details: 'Customer confirmed service completion'
    }
  ];

  // Get status styling
  const getStatusConfig = (status: AttendanceStatus) => {
    switch (status) {
      case 'not_started':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: Clock,
          label: 'Not Started'
        };
      case 'make_in_submitted':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: PlayCircle,
          label: 'Make-In Submitted'
        };
      case 'make_in_confirmed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: CheckCircle2,
          label: 'Make-In Confirmed'
        };
      case 'mark_out_submitted':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-700',
          icon: StopCircle,
          label: 'Mark-Out Submitted'
        };
      case 'mark_out_confirmed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: CheckCircle2,
          label: 'Completed'
        };
      case 'issue_raised':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: Flag,
          label: 'Issue Raised'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  // Calculate duration
  const calculateDuration = (vendor: VendorAttendance): string | null => {
    if (!vendor.makeInConfirmedAt || !vendor.markOutConfirmedAt) return null;
    
    const start = new Date(vendor.makeInConfirmedAt);
    const end = new Date(vendor.markOutConfirmedAt);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Handle confirm make-in
  const handleConfirmMakeIn = (vendor: VendorAttendance) => {
    setSelectedVendor(vendor);
    setShowConfirmMakeInModal(true);
  };

  const confirmMakeIn = async () => {
    if (!selectedVendor) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVendorAttendance(prev => prev.map(v => 
      v.id === selectedVendor.id
        ? {
            ...v,
            status: 'make_in_confirmed',
            makeInConfirmedAt: new Date().toISOString(),
            makeInConfirmedBy: 'Customer'
          }
        : v
    ));
    
    setLoading(false);
    setShowConfirmMakeInModal(false);
    setSelectedVendor(null);
  };

  // Handle confirm mark-out
  const handleConfirmMarkOut = (vendor: VendorAttendance) => {
    setSelectedVendor(vendor);
    setShowConfirmMarkOutModal(true);
  };

  const confirmMarkOut = async () => {
    if (!selectedVendor) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVendorAttendance(prev => prev.map(v => 
      v.id === selectedVendor.id
        ? {
            ...v,
            status: 'mark_out_confirmed',
            markOutConfirmedAt: new Date().toISOString(),
            markOutConfirmedBy: 'Customer'
          }
        : v
    ));
    
    setLoading(false);
    setShowConfirmMarkOutModal(false);
    setSelectedVendor(null);
  };

  // Handle raise issue
  const handleRaiseIssue = (vendor: VendorAttendance, type: 'make-in' | 'mark-out') => {
    setSelectedVendor(vendor);
    setIssueType(type);
    setShowRaiseIssueModal(true);
  };

  const submitIssue = async () => {
    if (!selectedVendor || !issueDescription.trim()) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVendorAttendance(prev => prev.map(v => 
      v.id === selectedVendor.id
        ? {
            ...v,
            status: 'issue_raised',
            issueRaised: true,
            issueDescription,
            issueRaisedAt: new Date().toISOString()
          }
        : v
    ));
    
    setLoading(false);
    setShowRaiseIssueModal(false);
    setSelectedVendor(null);
    setIssueDescription('');
    setIssueType(null);
  };

  // Format delay
  const formatDelay = (delayMinutes: number): string => {
    if (delayMinutes === 0) return 'On time';
    const absDelay = Math.abs(delayMinutes);
    const hours = Math.floor(absDelay / 60);
    const minutes = absDelay % 60;
    const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return delayMinutes > 0 ? `${timeStr} late` : `${timeStr} early`;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">Event Execution & Attendance</h1>
              <p className="text-[#16232A]/70 mb-4">
                Track vendor arrival and completion for <span className="font-semibold">{event.name}</span>
              </p>
              <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            {!event.isFinalized && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Not Available</p>
                    <p className="text-xs text-amber-700">Finalize vendors first</p>
                  </div>
                </div>
              </div>
            )}
            {event.isFinalized && (
              <Button
                onClick={() => setShowAttendanceLogModal(true)}
                variant="outline"
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                View Attendance Log
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">How Make-In / Mark-Out Works</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Vendors submit their arrival (Make-In) and completion (Mark-Out) times</li>
              <li>• You must confirm each submission to lock the record</li>
              <li>• Confirmed times cannot be edited and serve as an audit trail</li>
              <li>• If there's a discrepancy, you can raise an issue instead of confirming</li>
            </ul>
          </div>
        </div>
      </div>

      {event.isFinalized ? (
        <>
          {/* Vendor Attendance Cards */}
          <div className="space-y-4">
            {vendorAttendance.length > 0 ? (
              vendorAttendance.map((vendor, index) => {
                const statusConfig = getStatusConfig(vendor.status);
                const StatusIcon = statusConfig.icon;
                const duration = calculateDuration(vendor);

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
                            <StatusIcon className={`h-6 w-6 ${statusConfig.text}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#16232A] text-lg mb-1">{vendor.vendorName}</h3>
                            <p className="text-[#16232A]/70">{vendor.service}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-[#16232A]/60">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{vendor.contactPerson}</span>
                              </div>
                              <span>•</span>
                              <span>{vendor.phone}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </span>
                      </div>

                      {/* Expected Times */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-[#16232A]/60 mb-1">Expected Start</p>
                          <p className="font-semibold text-[#16232A]">
                            {new Date(vendor.expectedStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-[#16232A]/60 mb-1">Expected End</p>
                          <p className="font-semibold text-[#16232A]">
                            {new Date(vendor.expectedEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {vendor.makeInSubmittedAt && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-700 mb-1">Actual Arrival</p>
                            <p className="font-semibold text-blue-900">
                              {new Date(vendor.makeInSubmittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        )}
                        {vendor.markOutSubmittedAt && (
                          <div className="bg-amber-50 rounded-lg p-3">
                            <p className="text-xs text-amber-700 mb-1">Actual Completion</p>
                            <p className="font-semibold text-amber-900">
                              {new Date(vendor.markOutSubmittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Delay Warning */}
                      {vendor.arrivalDelay !== undefined && vendor.arrivalDelay !== 0 && vendor.status !== 'not_started' && (
                        <div className={`rounded-lg p-3 mb-4 ${
                          vendor.arrivalDelay > 0 
                            ? 'bg-red-50 border border-red-200' 
                            : 'bg-green-50 border border-green-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${
                              vendor.arrivalDelay > 0 ? 'text-red-600' : 'text-green-600'
                            }`} />
                            <p className={`text-sm font-semibold ${
                              vendor.arrivalDelay > 0 ? 'text-red-900' : 'text-green-900'
                            }`}>
                              Arrived {formatDelay(vendor.arrivalDelay)}
                            </p>
                          </div>
                        </div>
                      )}

                      {vendor.completionDelay !== undefined && vendor.completionDelay !== 0 && vendor.status === 'mark_out_confirmed' && (
                        <div className={`rounded-lg p-3 mb-4 ${
                          vendor.completionDelay > 0 
                            ? 'bg-red-50 border border-red-200' 
                            : 'bg-green-50 border border-green-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${
                              vendor.completionDelay > 0 ? 'text-red-600' : 'text-green-600'
                            }`} />
                            <p className={`text-sm font-semibold ${
                              vendor.completionDelay > 0 ? 'text-red-900' : 'text-green-900'
                            }`}>
                              Completed {formatDelay(vendor.completionDelay)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Duration */}
                      {duration && (
                        <div className="bg-purple-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-purple-600" />
                            <p className="text-sm font-semibold text-purple-900">
                              Total Duration: {duration}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Issue Display */}
                      {vendor.issueRaised && vendor.issueDescription && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <Flag className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-red-900 mb-1">Issue Raised</p>
                              <p className="text-sm text-red-800 italic">"{vendor.issueDescription}"</p>
                              {vendor.issueRaisedAt && (
                                <p className="text-xs text-red-700 mt-2">
                                  Raised on {new Date(vendor.issueRaisedAt).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {vendor.status === 'make_in_submitted' && (
                          <>
                            <Button
                              onClick={() => handleConfirmMakeIn(vendor)}
                              className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Confirm Make-In
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleRaiseIssue(vendor, 'make-in')}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Flag className="h-4 w-4 mr-2" />
                              Raise Issue
                            </Button>
                          </>
                        )}

                        {vendor.status === 'mark_out_submitted' && (
                          <>
                            <Button
                              onClick={() => handleConfirmMarkOut(vendor)}
                              className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Confirm Mark-Out
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleRaiseIssue(vendor, 'mark-out')}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Flag className="h-4 w-4 mr-2" />
                              Raise Issue
                            </Button>
                          </>
                        )}

                        {(vendor.status === 'make_in_confirmed' || vendor.status === 'mark_out_confirmed') && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Shield className="h-4 w-4" />
                            <span>Confirmed and locked</span>
                          </div>
                        )}

                        {vendor.status === 'not_started' && (
                          <p className="text-sm text-[#16232A]/60">Waiting for vendor to submit Make-In</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ClipboardList className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors finalized yet</h3>
                <p className="text-[#16232A]/60">Vendor attendance tracking will appear once vendors are finalized</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">Attendance Tracking Not Available</h3>
          <p className="text-[#16232A]/60 mb-6">
            Please finalize your vendors before event execution tracking becomes available
          </p>
          <Button
            onClick={() => navigate(`/customer/events/${eventId}/bids`)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            Go to Vendor Bids
          </Button>
        </div>
      )}

      {/* Modals */}
      <ConfirmMakeInModal
        isOpen={showConfirmMakeInModal}
        onClose={() => {
          setShowConfirmMakeInModal(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
        onConfirm={confirmMakeIn}
        loading={loading}
      />

      <ConfirmMarkOutModal
        isOpen={showConfirmMarkOutModal}
        onClose={() => {
          setShowConfirmMarkOutModal(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
        onConfirm={confirmMarkOut}
        loading={loading}
      />

      <RaiseIssueModal
        isOpen={showRaiseIssueModal}
        onClose={() => {
          setShowRaiseIssueModal(false);
          setSelectedVendor(null);
          setIssueDescription('');
          setIssueType(null);
        }}
        vendor={selectedVendor}
        issueType={issueType}
        issueDescription={issueDescription}
        onIssueDescriptionChange={setIssueDescription}
        onSubmit={submitIssue}
        loading={loading}
      />

      <AttendanceLogModal
        isOpen={showAttendanceLogModal}
        onClose={() => setShowAttendanceLogModal(false)}
        log={attendanceLog}
        eventName={event.name}
      />
    </div>
  );
};

// Confirm Make-In Modal
const ConfirmMakeInModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorAttendance | null;
  onConfirm: () => void;
  loading: boolean;
}> = ({ isOpen, onClose, vendor, onConfirm, loading }) => {
  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Make-In</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
              <p className="font-semibold text-[#16232A]">{vendor.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Arrival Time</p>
              <p className="font-semibold text-[#16232A]">
                {vendor.makeInSubmittedAt && new Date(vendor.makeInSubmittedAt).toLocaleString()}
              </p>
            </div>
            {vendor.arrivalDelay !== undefined && vendor.arrivalDelay !== 0 && (
              <div className={`p-3 rounded-lg ${
                vendor.arrivalDelay > 0 
                  ? 'bg-red-100' 
                  : 'bg-green-100'
              }`}>
                <p className={`text-sm font-semibold ${
                  vendor.arrivalDelay > 0 ? 'text-red-900' : 'text-green-900'
                }`}>
                  {vendor.arrivalDelay > 0 ? '⚠️ ' : '✓ '}
                  Arrived {vendor.arrivalDelay > 0 ? `${vendor.arrivalDelay} minutes late` : `${Math.abs(vendor.arrivalDelay)} minutes early`}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Confirm that the vendor has arrived at the event location. This action will lock the arrival time and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Arrival
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Confirm Mark-Out Modal
const ConfirmMarkOutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorAttendance | null;
  onConfirm: () => void;
  loading: boolean;
}> = ({ isOpen, onClose, vendor, onConfirm, loading }) => {
  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Mark-Out</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
              <p className="font-semibold text-[#16232A]">{vendor.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Completion Time</p>
              <p className="font-semibold text-[#16232A]">
                {vendor.markOutSubmittedAt && new Date(vendor.markOutSubmittedAt).toLocaleString()}
              </p>
            </div>
            {vendor.completionDelay !== undefined && vendor.completionDelay !== 0 && (
              <div className={`p-3 rounded-lg ${
                vendor.completionDelay > 0 
                  ? 'bg-red-100' 
                  : 'bg-green-100'
              }`}>
                <p className={`text-sm font-semibold ${
                  vendor.completionDelay > 0 ? 'text-red-900' : 'text-green-900'
                }`}>
                  {vendor.completionDelay > 0 ? '⚠️ ' : '✓ '}
                  Completed {vendor.completionDelay > 0 ? `${vendor.completionDelay} minutes late` : `${Math.abs(vendor.completionDelay)} minutes early`}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Confirm that the vendor has completed their service. This action will lock the completion time and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Completion
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Raise Issue Modal
const RaiseIssueModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorAttendance | null;
  issueType: 'make-in' | 'mark-out' | null;
  issueDescription: string;
  onIssueDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}> = ({ isOpen, onClose, vendor, issueType, issueDescription, onIssueDescriptionChange, onSubmit, loading }) => {
  if (!isOpen || !vendor || !issueType) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Raise Issue</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-[#16232A]/60">Vendor</p>
              <p className="font-semibold text-[#16232A]">{vendor.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60">Issue Type</p>
              <p className="font-semibold text-[#16232A] capitalize">{issueType === 'make-in' ? 'Arrival' : 'Completion'}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Describe the issue <span className="text-[#FF5B04]">*</span>
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => onIssueDescriptionChange(e.target.value)}
            rows={4}
            placeholder="Explain what went wrong..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Raising an issue will flag this record for admin review and may initiate a dispute resolution process.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!issueDescription.trim() || loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Flag className="h-4 w-4 mr-2" />
                Raise Issue
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Attendance Log Modal
const AttendanceLogModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  log: AttendanceLogEntry[];
  eventName: string;
}> = ({ isOpen, onClose, log, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Attendance Log</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-[#16232A]/70 mb-6">Complete attendance history for {eventName}</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              This log is read-only and serves as an immutable audit trail for all attendance records.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {log.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-[#16232A]">{entry.action}</p>
                <p className="text-xs text-[#16232A]/60">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-[#16232A]/70 mb-1">by {entry.actor}</p>
              <p className="text-sm text-[#16232A]/60">{entry.details}</p>
            </motion.div>
          ))}
        </div>

        {log.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-[#16232A]/60">No attendance records yet</p>
          </div>
        )}

        <div className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
