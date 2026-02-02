import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  User,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Award,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { NegotiationPanel, NegotiationData, NegotiationOffer } from '../../components/NegotiationPanel';
import { VendorFinalizationModal } from '../../components/VendorFinalizationModal';

type BidStatus = 'submitted' | 'under_negotiation' | 'negotiation_locked' | 'finalization_requested' | 'finalized' | 'declined';

export const BidDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidStatus, setBidStatus] = useState<BidStatus>('finalization_requested'); // Simulating finalization request
  const [showFinalizationModal, setShowFinalizationModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock bid data
  const bid = {
    id: id || '1',
    requirementTitle: 'Wedding Photography & Videography',
    eventName: 'Singh Family Wedding',
    customer: {
      name: 'Vikram Singh',
      location: 'Delhi, India',
      phone: '+91 98765 12345',
      email: 'vikram@email.com'
    },
    eventDate: '2025-02-14',
    eventLocation: 'The Grand Palace, Delhi',
    myBidAmount: 95000,
    myTimeline: '7 days delivery',
    myDeliverables: [
      '8 hours coverage',
      '500+ edited photos',
      'Online gallery',
      'Print album (30 pages)',
      '2 photographers',
      'Drone shots'
    ],
    submittedAt: '2025-01-15T10:30:00',
    status: 'pending',
    totalBids: 8,
    isFinalized: false,
    requirements: {
      budget: '₹80,000 - ₹1,00,000',
      guestCount: 200,
      venueType: 'Banquet Hall',
      additionalNotes: 'Looking for candid photography style with creative shots'
    }
  };

  // Mock negotiation data
  const [negotiation, setNegotiation] = useState<NegotiationData>({
    bidId: bid.id,
    originalPrice: bid.myBidAmount,
    originalTimeline: bid.myTimeline,
    status: 'awaiting_vendor',
    offers: [
      {
        id: 'offer-1',
        proposedBy: 'customer',
        proposerName: bid.customer.name,
        price: 85000,
        timeline: '7 days delivery',
        notes: 'Can we reduce the price a bit? Our budget is slightly lower.',
        status: 'pending',
        createdAt: '2025-01-20T10:00:00'
      }
    ]
  });

  const handleSubmitOffer = (price: number, timeline: string, notes: string) => {
    const newOffer: NegotiationOffer = {
      id: `offer-${Date.now()}`,
      proposedBy: 'vendor',
      proposerName: 'You',
      price,
      timeline,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setNegotiation(prev => ({
      ...prev,
      status: 'awaiting_customer',
      offers: [...prev.offers.map(o => ({ ...o, status: o.status === 'pending' ? 'countered' as const : o.status })), newOffer]
    }));
  };

  const handleAcceptOffer = (offerId: string) => {
    const offer = negotiation.offers.find(o => o.id === offerId);
    if (offer) {
      setNegotiation(prev => ({
        ...prev,
        status: 'accepted',
        finalizedPrice: offer.price,
        finalizedTimeline: offer.timeline,
        offers: prev.offers.map(o =>
          o.id === offerId ? { ...o, status: 'accepted' as const } : o
        )
      }));
    }
  };

  const handleRejectOffer = (offerId: string) => {
    setNegotiation(prev => ({
      ...prev,
      status: 'rejected',
      offers: prev.offers.map(o =>
        o.id === offerId ? { ...o, status: 'rejected' as const } : o
      )
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awarded':
        return 'bg-green-100 text-green-700';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const handleAcceptFinalization = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update state
    setBidStatus('finalized');
    setNegotiation(prev => ({
      ...prev,
      status: 'locked'
    }));
    
    setIsProcessing(false);
    setShowFinalizationModal(false);
    
    // Show success message
    alert('Finalization accepted! Agreement is being generated.');
  };

  const handleDeclineFinalization = async (reason: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update state
    setBidStatus('declined');
    
    setIsProcessing(false);
    setShowFinalizationModal(false);
    
    // Show decline message
    alert(`Finalization declined. Reason: ${reason}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/vendor/bids')}
        className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Bids
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Bid Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Finalization Request Banner */}
          {bidStatus === 'finalization_requested' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/90 rounded-xl p-6 text-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-8 w-8" />
                    <div>
                      <h2 className="text-xl font-bold">Finalization Request</h2>
                      <p className="text-white/90 text-sm">The customer wants to finalize you for this event</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    {bid.customer.name} has sent a finalization request. Review the terms and decide whether to accept or decline.
                  </p>
                  <Button
                    onClick={() => setShowFinalizationModal(true)}
                    className="bg-white text-[#FF5B04] hover:bg-gray-100"
                  >
                    Review Request
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Finalized Banner */}
          {bidStatus === 'finalized' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">Booking Finalized!</h2>
                  <p className="text-white/90 text-sm">This booking has been confirmed. Agreement is being generated.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Declined Banner */}
          {bidStatus === 'declined' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center gap-3">
                <XCircle className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">Finalization Declined</h2>
                  <p className="text-white/90 text-sm">You have declined this finalization request.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Requirement Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#16232A] mb-2">{bid.requirementTitle}</h1>
                <p className="text-lg text-gray-600">{bid.eventName}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bid.status)}`}>
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-[#075056]" />
                <div>
                  <p className="text-xs text-gray-600">Event Date</p>
                  <p className="font-semibold text-[#16232A]">
                    {new Date(bid.eventDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-[#075056]" />
                <div>
                  <p className="text-xs text-gray-600">Venue</p>
                  <p className="font-semibold text-[#16232A]">{bid.eventLocation}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-[#16232A] mb-3">Customer Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{bid.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{bid.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{bid.customer.email}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-semibold text-[#16232A] mb-3">Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Budget Range</p>
                  <p className="font-medium text-[#16232A]">{bid.requirements.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Guest Count</p>
                  <p className="font-medium text-[#16232A]">{bid.requirements.guestCount} guests</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-600 mb-1">Additional Notes</p>
                  <p className="text-sm text-gray-700">{bid.requirements.additionalNotes}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* My Bid Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <h2 className="font-semibold text-[#16232A] mb-4">Your Bid</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-[#FF5B04]/5 rounded-lg border border-[#FF5B04]/20">
                <div className="h-12 w-12 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#FF5B04]" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Your Bid Amount</p>
                  <p className="text-2xl font-bold text-[#FF5B04]">₹{bid.myBidAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#075056]/5 rounded-lg border border-[#075056]/20">
                <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#075056]" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Timeline</p>
                  <p className="text-xl font-bold text-[#075056]">{bid.myTimeline}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#16232A] mb-3">Your Deliverables</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {bid.myDeliverables.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Negotiation Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NegotiationPanel
              negotiation={negotiation}
              userRole="vendor"
              vendorName="You"
              customerName={bid.customer.name}
              onSubmitOffer={handleSubmitOffer}
              onAcceptOffer={handleAcceptOffer}
              onRejectOffer={handleRejectOffer}
              isLocked={bid.isFinalized || negotiation.status === 'locked'}
            />
          </motion.div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Status Card */}
          {negotiation.status === 'accepted' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
            >
              <CheckCircle className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Agreement Reached!</h3>
              <p className="text-white/90 text-sm">
                The customer has accepted your offer. Wait for them to finalize the booking.
              </p>
            </motion.div>
          )}

          {/* Awaiting Customer */}
          {negotiation.status === 'awaiting_customer' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
            >
              <Clock className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Awaiting Response</h3>
              <p className="text-white/90 text-sm">
                Your offer has been sent. The customer will review and respond soon.
              </p>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-200 space-y-3"
          >
            <h3 className="font-semibold text-[#16232A] mb-3">Quick Actions</h3>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Customer
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View Requirement
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled={negotiation.status === 'locked'}>
              <Award className="h-4 w-4 mr-2" />
              Edit Bid
            </Button>
          </motion.div>

          {/* Bid Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <h3 className="font-semibold text-[#16232A] mb-3">Bid Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Submitted</span>
                <span className="font-medium text-[#16232A]">
                  {new Date(bid.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Bids</span>
                <span className="font-medium text-[#16232A]">{bid.totalBids} vendors</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(bid.status)}`}>
                  {bid.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tip Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Negotiation Tip</h4>
                <p className="text-xs text-blue-700">
                  Be flexible with pricing but maintain the value of your services. Clear communication helps reach agreements faster.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Finalization Modal */}
      <VendorFinalizationModal
        isOpen={showFinalizationModal}
        onClose={() => setShowFinalizationModal(false)}
        onAccept={handleAcceptFinalization}
        onDecline={handleDeclineFinalization}
        customerName={bid.customer.name}
        eventName={bid.eventName}
        finalPrice={negotiation.finalizedPrice || bid.myBidAmount}
        timeline={negotiation.finalizedTimeline || bid.myTimeline}
        deliverables={bid.myDeliverables}
        isProcessing={isProcessing}
      />
    </div>
  );
};