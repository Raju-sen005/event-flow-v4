import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Lock,
  LogIn,
  LogOut,
  Timer
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AttendanceRecord, AttendanceStatus } from '../../types/attendance';

export const VendorAttendance: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    status: 'not_started',
    isDisputed: false,
    createdAt: '2025-01-23T10:00:00',
    updatedAt: '2025-01-23T10:00:00',
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
          label: 'Mark In - Awaiting Confirmation',
          color: 'bg-blue-100 text-blue-700',
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
          label: 'Mark Out - Awaiting Confirmation',
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
          icon: AlertCircle
        };
    }
  };

  const handleMarkIn = async () => {
    setIsSubmitting(true);
    
    // Get location
    const location = await getLocation();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Mark In submitted successfully! Awaiting customer confirmation.');
    setIsSubmitting(false);
  };

  const handleMarkOut = async () => {
    setIsSubmitting(true);
    
    // Get location
    const location = await getLocation();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Mark Out submitted successfully! Awaiting customer confirmation.');
    setIsSubmitting(false);
  };

  const getLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          () => resolve(null)
        );
      } else {
        resolve(null);
      }
    });
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
  const canMarkIn = attendance.status === 'not_started' && attendance.isFinalized;
  const canMarkOut = attendance.status === 'mark_in_confirmed' && attendance.isFinalized;

  if (!attendance.isFinalized) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
          <Lock className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-900 mb-2">Attendance Locked</h2>
          <p className="text-yellow-800">
            Attendance tracking will be available after event finalization is complete.
          </p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-[#16232A]">Attendance & Time Tracking</h1>
            <p className="text-[#16232A]/70 mt-1">{attendance.eventName}</p>
            <p className="text-sm text-[#16232A]/60">Customer: {attendance.customerName}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${config.color} flex items-center gap-2`}>
            <StatusIcon className="h-5 w-5" />
            <span className="font-medium">{config.label}</span>
          </div>
        </div>
      </div>

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

      {/* Mark In Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`bg-white rounded-xl p-6 border-2 ${
          attendance.status === 'mark_in_submitted' || attendance.status === 'mark_in_confirmed'
            ? 'border-green-300'
            : 'border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
              attendance.markInTime ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <LogIn className={`h-6 w-6 ${attendance.markInTime ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#16232A]">Mark In</h3>
              <p className="text-sm text-gray-600">Record your arrival time</p>
            </div>
          </div>
          {attendance.markInTime && (
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {new Date(attendance.markInTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
              <p className="text-xs text-gray-600">
                {new Date(attendance.markInSubmittedAt!).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          )}
        </div>

        {attendance.markInTime && attendance.markInLocation && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              {attendance.markInLocation.address || 
                `${attendance.markInLocation.latitude.toFixed(4)}, ${attendance.markInLocation.longitude.toFixed(4)}`}
            </span>
          </div>
        )}

        {attendance.status === 'mark_in_submitted' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Awaiting customer confirmation</p>
            </div>
          </div>
        )}

        {attendance.status === 'mark_in_confirmed' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Confirmed by customer</p>
            </div>
          </div>
        )}

        {canMarkIn && (
          <Button
            onClick={handleMarkIn}
            disabled={isSubmitting}
            className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Mark In Now'}
          </Button>
        )}
      </motion.div>

      {/* Mark Out Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`bg-white rounded-xl p-6 border-2 ${
          attendance.status === 'mark_out_submitted' || attendance.status === 'mark_out_confirmed'
            ? 'border-green-300'
            : 'border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
              attendance.markOutTime ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <LogOut className={`h-6 w-6 ${attendance.markOutTime ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#16232A]">Mark Out</h3>
              <p className="text-sm text-gray-600">Record your departure time</p>
            </div>
          </div>
          {attendance.markOutTime && (
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {new Date(attendance.markOutTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
              <p className="text-xs text-gray-600">
                {new Date(attendance.markOutSubmittedAt!).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          )}
        </div>

        {attendance.markOutTime && attendance.markOutLocation && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              {attendance.markOutLocation.address || 
                `${attendance.markOutLocation.latitude.toFixed(4)}, ${attendance.markOutLocation.longitude.toFixed(4)}`}
            </span>
          </div>
        )}

        {attendance.status === 'mark_out_submitted' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Awaiting customer confirmation</p>
            </div>
          </div>
        )}

        {attendance.status === 'mark_out_confirmed' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Confirmed by customer - Service completed</p>
            </div>
          </div>
        )}

        {canMarkOut && (
          <Button
            onClick={handleMarkOut}
            disabled={isSubmitting}
            className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Mark Out Now'}
          </Button>
        )}

        {!canMarkOut && attendance.status !== 'mark_out_submitted' && attendance.status !== 'mark_out_confirmed' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Complete Mark In first to enable Mark Out</p>
          </div>
        )}
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <h3 className="font-semibold text-blue-900 mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Your location will be recorded for accountability purposes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Customer confirmation is required for each attendance entry</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Once confirmed, times cannot be edited or modified</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>All attendance records are maintained for audit purposes</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
