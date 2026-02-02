export type TicketStatus = 'open' | 'in_progress' | 'waiting_for_vendor' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 
  | 'account_issue'
  | 'payment_issue'
  | 'bid_related'
  | 'event_related'
  | 'invoice_issue'
  | 'attendance_issue'
  | 'technical_issue'
  | 'other';

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: 'vendor' | 'admin' | 'super_admin';
  message: string;
  attachments?: string[];
  createdAt: string;
  isInternal?: boolean; // Admin-only notes
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  
  // Vendor Info
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  
  // Ticket Details
  category: TicketCategory;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  
  // Related References
  relatedType?: 'event' | 'bid' | 'invoice' | 'payment';
  relatedId?: string;
  relatedReference?: string;
  
  // Attachments
  attachments?: string[];
  
  // Messages/Conversation
  messages: TicketMessage[];
  
  // Assignment
  assignedToId?: string;
  assignedToName?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  
  // Metadata
  lastResponseBy?: 'vendor' | 'admin';
  lastResponseAt?: string;
}

export interface CreateTicketData {
  category: TicketCategory;
  subject: string;
  description: string;
  priority: TicketPriority;
  relatedType?: 'event' | 'bid' | 'invoice' | 'payment';
  relatedId?: string;
  relatedReference?: string;
  attachments?: string[];
}
