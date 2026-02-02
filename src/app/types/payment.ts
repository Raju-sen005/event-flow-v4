export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'cash_awaiting_vendor'
  | 'cash_awaiting_admin'
  | 'completed'
  | 'failed'
  | 'disputed';

export type PaymentMethod = 'online' | 'cash';

export interface PaymentSlab {
  id: string;
  slabNumber: number;
  name: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paidAt?: string;
  transactionId?: string;
  cashConfirmedByVendor?: boolean;
  cashApprovedByAdmin?: boolean;
  vendorConfirmationDate?: string;
  adminApprovalDate?: string;
  notes?: string;
}

export interface EventPayment {
  id: string;
  eventId: string;
  eventName: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  slabs: PaymentSlab[];
  agreementId: string;
  agreementDate: string;
  isFinalized: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CashPaymentRequest {
  slabId: string;
  amount: number;
  notes: string;
  receiptImage?: string;
}

export interface VendorKYC {
  isVerified: boolean;
  documents: {
    panCard: boolean;
    aadhaar: boolean;
    bankDetails: boolean;
    gst?: boolean;
  };
  verificationDate?: string;
  status: 'pending' | 'verified' | 'rejected';
}
