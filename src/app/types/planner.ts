export type PlannerType = 'event_planner' | 'freelance_planner';

export interface Planner {
  id: string;
  name: string;
  email: string;
  phone: string;
  plannerType: PlannerType;
  companyName?: string; // For event planners
  
  // Profile
  businessName: string;
  serviceAreas: string[];
  specializations: string[];
  yearsOfExperience: number;
  
  // Stats
  activeEvents: number;
  completedEvents: number;
  totalVendors: number;
  
  // Verification
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  
  createdAt: string;
  updatedAt: string;
}

export interface PlannerEvent {
  id: string;
  plannerId: string;
  
  // Event Details
  eventName: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: number;
  
  // Client Info
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  
  // Budget & Status
  budget: number;
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
  
  // Vendors
  assignedVendors: string[];
  pendingBids: number;
  confirmedVendors: number;
  
  // Invitations
  totalInvitations: number;
  confirmedGuests: number;
  
  createdAt: string;
  updatedAt: string;
}
