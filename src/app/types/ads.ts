export type AdType = 'banner' | 'featured_listing';
export type AdStatus = 'active' | 'paused' | 'expired' | 'pending_payment' | 'disabled';
export type AdPlacement = 'home_hero' | 'home_sidebar' | 'category_top' | 'search_results';

export interface VendorKYC {
  isVerified: boolean;
  documents: {
    panCard: boolean;
    aadhaar: boolean;
    bankDetails: boolean;
    gst: boolean;
  };
  status: 'verified' | 'pending' | 'rejected';
}

export interface AdPricing {
  banner_7days: number;
  banner_14days: number;
  banner_30days: number;
  featured_7days: number;
  featured_14days: number;
  featured_30days: number;
}

export interface VendorAd {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  
  // Ad Configuration
  type: AdType;
  placement: AdPlacement;
  title: string;
  description: string;
  mediaUrl?: string;
  category: string;
  targetUrl: string;
  
  // Duration & Status
  duration: number; // days
  status: AdStatus;
  startDate: string;
  endDate: string;
  
  // Payment
  amount: number;
  isPaid: boolean;
  paymentId?: string;
  paymentDate?: string;
  
  // Performance
  impressions: number;
  clicks: number;
  
  // KYC & Approval
  isKYCVerified: boolean;
  isApprovedByAdmin: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  pausedAt?: string;
  disabledBy?: string;
  disabledReason?: string;
}

export interface AdCreationData {
  type: AdType;
  placement: AdPlacement;
  title: string;
  description: string;
  mediaUrl?: string;
  category: string;
  duration: number;
}