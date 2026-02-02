import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Star,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  Award,
  User,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Lock,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { NegotiationPanel, NegotiationData, NegotiationOffer } from '../../components/NegotiationPanel';
import { FinalizeVendorModal } from '../../components/FinalizeVendorModal';

type BidStatus = 'submitted' | 'under_negotiation' | 'negotiation_locked' | 'finalization_requested' | 'finalized' | 'declined';

export const BidDetail: React.FC = () => {
  const { id, bidId } = useParams();
  const navigate = useNavigate();
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bidStatus, setBidStatus] = useState<BidStatus>('under_negotiation');

  // Mock bid data
  const bid = {
    id: bidId || '1',
    vendor: {
      name: 'Elite Photography Studio',
      rating: 4.9,
      reviews: 127,
      verified: true,
      location: 'Mumbai, Maharashtra',
      phone: '+91 98765 43210',
      email: 'contact@elitephoto.com',
      experience: '8 years'
    },
    amount: 95000,
    timeline: '7 days delivery',
    deliverables: [
      '8 hours coverage',
      '500+ edited photos',
      'Online gallery',
      'Print album (30 pages)',
      '2 photographers',
      'Drone shots'
    ],
    description: 'We specialize in candid wedding photography with a creative touch. Our team ensures every moment is captured beautifully.',
    proposedDate: '2 days ago',
    status: 'pending',
    isFinalized: false
  };

  // Mock negotiation data
  const [negotiation, setNegotiation] = useState<NegotiationData>({
    bidId: bid.id,
    originalPrice: bid.amount,
    originalTimeline: bid.timeline,
    status: 'awaiting_vendor',
    offers: [
      {
        id: 'offer-1',
        proposedBy: 'customer',
        proposerName: 'You',
        price: 85000,
        timeline: '7 days delivery',
        notes: 'Can we reduce the price a bit? Our budget is slightly lower.',
        status: 'countered',
        createdAt: '2025-01-20T10:00:00'
      },
      {
        id: 'offer-2',
        proposedBy: 'vendor',
        proposerName: bid.vendor.name,
        price: 90000,
        timeline: '7 days delivery',
        notes: 'I can offer a discount of ₹5000. This includes all deliverables.',
        status: 'pending',
        createdAt: '2025-01-20T15:30:00'
      }
    ]
  });

  const paymentSlabs = [
    {
      id: '1',
      name: 'Booking Advance',
      percentage: 30,
      amount: (negotiation.finalizedPrice || bid.amount) * 0.3,
      dueDate: 'On Agreement Signing',
      status: 'pending' as const
    },
    {
      id: '2',
      name: 'Pre-Event Payment',
      percentage: 40,
      amount: (negotiation.finalizedPrice || bid.amount) * 0.4,
      dueDate: '7 days before event',
      status: 'pending' as const
    },
    {
      id: '3',
      name: 'Final Payment',
      percentage: 30,
      amount: (negotiation.finalizedPrice || bid.amount) * 0.3,
      dueDate: 'On Delivery',
      status: 'pending' as const
    }
  ];

  const handleSubmitOffer = (price: number, timeline: string, notes: string) => {
    const newOffer: NegotiationOffer = {
      id: `offer-${Date.now()}`,
      proposedBy: 'customer',
      proposerName: 'You',
      price,
      timeline,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setNegotiation(prev => ({
      ...prev,
      status: 'awaiting_vendor',
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

  const handleFinalizeVendor = () => {
    setShowFinalizeModal(true);
  };

  const handleConfirmFinalization = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update states
    setBidStatus('finalization_requested');
    setNegotiation(prev => ({
      ...prev,
      status: 'locked'
    }));
    
    setIsProcessing(false);
    setShowFinalizeModal(false);
    
    // Show success message
    alert('Finalization request sent to vendor! You will be notified once they respond.');
  };

  const canFinalize = negotiation.status === 'accepted' && bidStatus !== 'finalization_requested' && bidStatus !== 'finalized' && bidStatus !== 'declined';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bids
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Bid Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vendor Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-[#16232A]">{bid.vendor.name}</h1>
                  {bid.vendor.verified && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{bid.vendor.rating}</span>
                    <span>({bid.vendor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>{bid.vendor.experience} experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {bid.vendor.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {bid.vendor.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {bid.vendor.email}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">{bid.description}</p>
            </div>
          </motion.div>

          {/* Bid Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <h2 className="font-semibold text-[#16232A] mb-4">Bid Details</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-[#FF5B04]/5 rounded-lg border border-[#FF5B04]/20">
                <div className="h-12 w-12 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#FF5B04]" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Bid Amount</p>
                  <p className="text-2xl font-bold text-[#FF5B04]">₹{bid.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#075056]/5 rounded-lg border border-[#075056]/20">
                <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-[#075056]" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Timeline</p>
                  <p className="text-xl font-bold text-[#075056]">{bid.timeline}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#16232A] mb-3">Deliverables</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {bid.deliverables.map((item, index) => (
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
              userRole="customer"
              vendorName={bid.vendor.name}
              customerName="You"
              onSubmitOffer={handleSubmitOffer}
              onAcceptOffer={handleAcceptOffer}
              onRejectOffer={handleRejectOffer}
              isLocked={bid.isFinalized || negotiation.status === 'locked'}
            />
          </motion.div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Finalize Vendor Card */}
          {canFinalize && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
            >
              <CheckCircle className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready to Proceed?</h3>
              <p className="text-white/90 text-sm mb-4">
                You've reached an agreement! Finalize this vendor to proceed with the booking.
              </p>
              <Button
                onClick={handleFinalizeVendor}
                className="w-full bg-white text-green-600 hover:bg-gray-100"
              >
                Finalize Vendor
              </Button>
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
              Message Vendor
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View Portfolio
            </Button>
          </motion.div>

          {/* Status Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <h3 className="font-semibold text-[#16232A] mb-3">Bid Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Submitted</span>
                <span className="font-medium text-[#16232A]">{bid.proposedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                  {bid.status}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Finalize Vendor Modal */}
      <FinalizeVendorModal
        isOpen={showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        onConfirm={handleConfirmFinalization}
        isProcessing={isProcessing}
        vendorName={bid.vendor.name}
        finalPrice={negotiation.finalizedPrice || bid.amount}
        originalPrice={bid.amount}
        timeline={negotiation.finalizedTimeline || bid.timeline}
        deliverables={bid.deliverables}
      />
    </div>
  );
};