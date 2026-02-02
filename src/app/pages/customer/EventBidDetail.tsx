import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Clock,
  Calendar,
  MessageSquare,
  Send,
  User,
  Check,
  X,
  ShoppingBag,
  Eye,
  Package,
  XCircle,
  Loader2
} from 'lucide-react';

type BidStatus = 'new' | 'under-negotiation' | 'finalization-requested' | 'finalized' | 'declined' | 'closed';

type NegotiationOffer = {
  id: string;
  from: 'customer' | 'vendor';
  price: number;
  notes: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
};

export const EventBidDetail: React.FC = () => {
  const { eventId, bidId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');

  const [showNegotiationPanel, setShowNegotiationPanel] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(action === 'finalize');
  const [showAcceptOfferModal, setShowAcceptOfferModal] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [negotiationNotes, setNegotiationNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock bid data
  const bid = {
    id: bidId || '1',
    vendorId: '1',
    vendorName: 'Elite Photography Studio',
    vendorRating: 4.9,
    vendorReviews: 127,
    vendorExperience: '10+ years',
    vendorLocation: 'New York, NY',
    vendorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    service: 'Photographer',
    offeredPrice: 4500,
    originalPrice: 5000,
    timeline: '10 hours coverage',
    eventDate: '2026-06-15',
    packageName: 'Premium Wedding Package',
    packageDescription: 'Complete wedding photography coverage with premium editing and delivery',
    inclusions: [
      '2 Professional Photographers',
      '600+ Edited Photos',
      'Digital Delivery via Online Gallery',
      'Photo Album (40 pages, premium quality)',
      'Pre-Wedding Shoot (4 hours)',
      'All raw files included',
      'Premium retouching on 50 photos',
      'Engagement session photos',
      'Copyright release for all images'
    ],
    deliveryTime: '4-6 weeks after event',
    termsAndConditions: '50% advance payment required, remaining due on event day. Cancellation policy applies.',
    submittedAt: '2026-01-20T10:30:00',
    status: 'under-negotiation' as BidStatus,
    eligibleForFinalization: true,
    finalizationRequestedAt: null as string | null,
    finalizedAt: null as string | null,
    declinedAt: null as string | null,
    declineReason: null as string | null,
  };

  // Mock negotiation history
  const [negotiationHistory, setNegotiationHistory] = useState<NegotiationOffer[]>([
    {
      id: '1',
      from: 'vendor',
      price: 5000,
      notes: 'Initial offer - Premium package with all inclusions',
      createdAt: '2026-01-20T10:30:00',
      status: 'countered'
    },
    {
      id: '2',
      from: 'customer',
      price: 4000,
      notes: 'Can we work within our budget? Would love to work with you!',
      createdAt: '2026-01-20T14:15:00',
      status: 'countered'
    },
    {
      id: '3',
      from: 'vendor',
      price: 4500,
      notes: 'I can offer $4,500 which includes all premium features. This is my best offer.',
      createdAt: '2026-01-21T09:20:00',
      status: 'pending'
    }
  ]);

  const activeOffer = negotiationHistory[negotiationHistory.length - 1];
  const canCustomerRespond = activeOffer.from === 'vendor' && activeOffer.status === 'pending';

  // Handle submit negotiation
  const handleSubmitNegotiation = () => {
    if (!proposedPrice || !negotiationNotes) return;

    const newOffer: NegotiationOffer = {
      id: String(negotiationHistory.length + 1),
      from: 'customer',
      price: Number(proposedPrice),
      notes: negotiationNotes,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setNegotiationHistory([...negotiationHistory, newOffer]);
    setProposedPrice('');
    setNegotiationNotes('');
    setShowNegotiationPanel(false);
  };

  // Handle accept vendor offer
  const handleAcceptOffer = () => {
    // In production, send to backend
    console.log('Accepting vendor offer');
    setShowAcceptOfferModal(false);
    setShowFinalizeModal(true);
  };

  // Handle finalize vendor
  const handleFinalizeVendor = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowFinalizeModal(false);
      // In production, navigate after success
      navigate(`/customer/events/${eventId}/bids?finalized=${bidId}`);
    }, 1500);
  };

  // Get status info
  const getStatusInfo = () => {
    switch (bid.status) {
      case 'new':
        return {
          color: 'blue',
          icon: <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />,
          title: 'New Bid',
          message: 'This is a new bid. You can review, negotiate, or accept the offer directly.'
        };
      case 'under-negotiation':
        return {
          color: 'amber',
          icon: <MessageSquare className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />,
          title: 'Negotiation in Progress',
          message: 'Review the latest offer below and continue negotiation or accept the current terms.'
        };
      case 'finalization-requested':
        return {
          color: 'purple',
          icon: <Loader2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5 animate-spin" />,
          title: 'Finalization Requested',
          message: 'Waiting for vendor to accept the finalization request. This may take 24-48 hours.'
        };
      case 'finalized':
        return {
          color: 'green',
          icon: <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />,
          title: 'Vendor Finalized',
          message: 'This vendor has been successfully finalized for your event. Proceed to agreements and payments.'
        };
      case 'declined':
        return {
          color: 'red',
          icon: <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />,
          title: 'Finalization Declined',
          message: bid.declineReason || 'Vendor declined the finalization request. You can view other bids for this service.'
        };
      case 'closed':
        return {
          color: 'gray',
          icon: <XCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />,
          title: 'Bid Closed',
          message: 'Another vendor was finalized for this service. This bid is no longer active.'
        };
      default:
        return {
          color: 'gray',
          icon: <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />,
          title: 'Unknown Status',
          message: ''
        };
    }
  };

  const statusInfo = getStatusInfo();
  const canTakeAction = bid.status === 'new' || bid.status === 'under-negotiation';

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}/bids`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bids
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vendor Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={bid.vendorImage}
                  alt={bid.vendorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#16232A] mb-1">{bid.vendorName}</h1>
                <p className="text-[#FF5B04] font-medium mb-2">{bid.service}</p>
                <div className="flex items-center gap-4 text-sm text-[#16232A]/70">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#16232A]">{bid.vendorRating}</span>
                    <span>({bid.vendorReviews} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{bid.vendorExperience}</span>
                  <span>•</span>
                  <span>{bid.vendorLocation}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/customer/events/${eventId}/vendors/${bid.vendorId}`)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>

            {/* Current Status */}
            <div className={`rounded-xl p-4 bg-${statusInfo.color}-50 border border-${statusInfo.color}-200`}>
              <div className="flex items-start gap-3">
                {statusInfo.icon}
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#16232A]">{statusInfo.title}</p>
                  <p className="text-sm text-[#16232A]/70 mt-1">{statusInfo.message}</p>
                  
                  {/* Post-finalization actions */}
                  {bid.status === 'finalized' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/customer/events/${eventId}/agreements`)}
                        className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                      >
                        View Agreement
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/customer/events/${eventId}/payments`)}
                      >
                        Manage Payments
                      </Button>
                    </div>
                  )}

                  {bid.status === 'declined' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/customer/events/${eventId}/bids?service=${bid.service}`)}
                        className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                      >
                        View Other Bids
                      </Button>
                    </div>
                  )}

                  {bid.status === 'closed' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/customer/events/${eventId}/bids`)}
                      >
                        Back to All Bids
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bid Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#16232A]">Bid Details</h2>
              <span className="text-3xl font-bold text-[#FF5B04]">
                ${bid.offeredPrice.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Package</span>
                <span className="font-semibold text-[#16232A]">{bid.packageName}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Service</span>
                <span className="font-semibold text-[#16232A]">{bid.service}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Coverage</span>
                <span className="font-semibold text-[#16232A]">{bid.timeline}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Delivery Time</span>
                <span className="font-semibold text-[#16232A]">{bid.deliveryTime}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Event Date</span>
                <span className="font-semibold text-[#16232A]">
                  {new Date(bid.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {bid.originalPrice && bid.originalPrice !== bid.offeredPrice && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">Special Discount Applied</p>
                <p className="text-sm text-green-800 mt-1">
                  Save ${(bid.originalPrice - bid.offeredPrice).toLocaleString()} from the original price
                </p>
              </div>
            )}
          </div>

          {/* Package Inclusions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-4">Package Includes</h3>
            <div className="space-y-2">
              {bid.inclusions.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#16232A]/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-4">Terms & Conditions</h3>
            <p className="text-sm text-[#16232A]/70">{bid.termsAndConditions}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-6">
            <h3 className="font-bold text-[#16232A] mb-4">Actions</h3>
            <div className="space-y-3">
              {canTakeAction ? (
                <>
                  {canCustomerRespond && (
                    <Button
                      onClick={() => setShowAcceptOfferModal(true)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept Offer
                    </Button>
                  )}

                  <Button
                    onClick={() => setShowNegotiationPanel(!showNegotiationPanel)}
                    className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {showNegotiationPanel ? 'Hide' : 'Start'} Negotiation
                  </Button>

                  {bid.eligibleForFinalization && (
                    <Button
                      onClick={() => setShowFinalizeModal(true)}
                      className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Finalize Vendor
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {bid.status === 'finalization-requested' && (
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                      <Loader2 className="h-8 w-8 text-purple-600 mx-auto mb-2 animate-spin" />
                      <p className="text-sm font-medium text-purple-900">Pending Vendor Acceptance</p>
                      <p className="text-xs text-purple-700 mt-1">Usually takes 24-48 hours</p>
                    </div>
                  )}

                  {bid.status === 'finalized' && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-900">Vendor Confirmed</p>
                    </div>
                  )}

                  {(bid.status === 'declined' || bid.status === 'closed') && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                            Actions Not Available
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#16232A] text-white">
                        {bid.status === 'declined' ? 'Vendor declined finalization' : 'Bid is closed'}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}

              <Button
                variant="outline"
                onClick={() => navigate(`/customer/events/${eventId}/vendors/${bid.vendorId}`)}
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Full Profile
              </Button>

              <Button
                variant="outline"
                className="w-full"
                disabled={bid.status === 'closed'}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Bid Information */}
          <div className="bg-[#E4EEF0] rounded-xl p-6">
            <h3 className="font-bold text-[#16232A] mb-3">Bid Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#16232A]/50" />
                <span className="text-[#16232A]/70">
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#16232A]/50" />
                <span className="text-[#16232A]/70">
                  {new Date(bid.submittedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {bid.finalizedAt && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#16232A]/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-[#16232A]/70">
                    Finalized {new Date(bid.finalizedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {bid.declinedAt && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#16232A]/10">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-[#16232A]/70">
                    Declined {new Date(bid.declinedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Panel */}
      <AnimatePresence>
        {showNegotiationPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl p-6 border-2 border-[#075056]"
          >
            <h3 className="text-xl font-bold text-[#16232A] mb-4">Negotiation History</h3>

            {/* Negotiation Timeline */}
            <div className="space-y-4 mb-6">
              {negotiationHistory.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`p-4 rounded-xl ${
                    offer.from === 'vendor'
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          offer.from === 'vendor' ? 'bg-blue-200' : 'bg-green-200'
                        }`}
                      >
                        {offer.from === 'vendor' ? (
                          <ShoppingBag className="h-4 w-4 text-blue-700" />
                        ) : (
                          <User className="h-4 w-4 text-green-700" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A] text-sm">
                          {offer.from === 'vendor' ? bid.vendorName : 'You'}
                        </p>
                        <p className="text-xs text-[#16232A]/60">
                          {new Date(offer.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#16232A]">
                        ${offer.price.toLocaleString()}
                      </p>
                      {offer.status === 'pending' && index === negotiationHistory.length - 1 && (
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#16232A]/70 mt-2">{offer.notes}</p>
                </div>
              ))}
            </div>

            {/* New Counter Offer Form */}
            {canCustomerRespond && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-[#16232A] mb-4">Submit Counter Offer</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Proposed Price <span className="text-[#FF5B04]">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(e.target.value)}
                        placeholder="Enter your price"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">
                      Notes <span className="text-[#FF5B04]">*</span>
                    </label>
                    <textarea
                      value={negotiationNotes}
                      onChange={(e) => setNegotiationNotes(e.target.value)}
                      placeholder="Explain your counter offer..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNegotiationPanel(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitNegotiation}
                      disabled={!proposedPrice || !negotiationNotes}
                      className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Counter Offer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accept Offer Modal */}
      {showAcceptOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full"
          >
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">Accept Vendor Offer</h3>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-900">
                You're about to accept the vendor's offer of <strong>${activeOffer.price.toLocaleString()}</strong>. 
                This will move to finalization.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAcceptOfferModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAcceptOffer}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept & Continue
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Finalize Vendor Modal */}
      {showFinalizeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">Finalize Vendor</h3>

            {/* Vendor Summary */}
            <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF5B04] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#16232A]">{bid.vendorName}</h4>
                  <p className="text-sm text-[#16232A]/70">{bid.service}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Package:</span>
                  <span className="font-medium text-[#16232A]">{bid.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Final Price:</span>
                  <span className="text-xl font-bold text-[#FF5B04]">
                    ${bid.offeredPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Coverage:</span>
                  <span className="font-medium text-[#16232A]">{bid.timeline}</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Important - This Action is Irreversible</p>
                <p className="text-sm text-amber-800 mt-1">
                  Once finalized, this vendor cannot be changed for this service. The vendor
                  will receive a finalization request and must accept before it's confirmed.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFinalizeModal(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFinalizeVendor}
                disabled={isLoading}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirm Finalization
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};