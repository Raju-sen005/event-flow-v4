export type AttendanceStatus = 
  | 'not_started'
  | 'mark_in_submitted'
  | 'mark_in_confirmed'
  | 'mark_out_submitted'
  | 'mark_out_confirmed'
  | 'disputed';

export interface AttendanceRecord {
  id: string;
  eventId: string;
  eventName: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  
  // Scheduled times
  scheduledStartTime: string;
  scheduledEndTime: string;
  
  // Actual times
  markInTime?: string;
  markInLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  markInSubmittedAt?: string;
  markInConfirmedAt?: string;
  markInConfirmedBy?: string;
  
  markOutTime?: string;
  markOutLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  markOutSubmittedAt?: string;
  markOutConfirmedAt?: string;
  markOutConfirmedBy?: string;
  
  // Status and metadata
  status: AttendanceStatus;
  delayInMinutes?: number;
  overtimeInMinutes?: number;
  
  // Dispute handling
  isDisputed: boolean;
  disputeReason?: string;
  disputeRaisedBy?: string;
  disputeRaisedAt?: string;
  
  // Audit trail
  createdAt: string;
  updatedAt: string;
  isFinalized: boolean;
}

export interface AttendanceAction {
  type: 'mark_in' | 'mark_out' | 'confirm_mark_in' | 'confirm_mark_out' | 'raise_dispute';
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  notes?: string;
  performedBy: string;
  performedByRole: 'vendor' | 'customer' | 'admin';
}
