import { PaymentSlab } from './payment';

export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'cancelled';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  
  // Event & Payment Reference
  eventId: string;
  eventName: string;
  eventDate: string;
  paymentSlabId: string;
  paymentSlabName: string;
  
  // Vendor Details
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  vendorAddress: string;
  vendorGSTIN?: string;
  vendorPAN?: string;
  
  // Customer Details
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerGSTIN?: string;
  
  // Line Items
  lineItems: InvoiceLineItem[];
  
  // Calculations
  subtotal: number;
  platformFeePercentage: number;
  platformFee: number;
  cgstPercentage?: number;
  cgst?: number;
  sgstPercentage?: number;
  sgst?: number;
  igstPercentage?: number;
  igst?: number;
  totalTax: number;
  totalAmount: number;
  
  // Payment Info
  paidAmount: number;
  balanceAmount: number;
  paymentMethod?: string;
  transactionId?: string;
  paymentDate?: string;
  
  // Metadata
  notes?: string;
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
  generatedBy: 'system' | 'admin';
}

export interface EarningsSummary {
  totalEarnings: number;
  completedEarnings: number;
  pendingEarnings: number;
  platformFees: number;
  taxes: number;
  withdrawableAmount: number;
  totalWithdrawn: number;
  lastWithdrawalDate?: string;
}

export interface WithdrawalRequest {
  id: string;
  vendorId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  processedDate?: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    bankName: string;
  };
  notes?: string;
  rejectionReason?: string;
}
