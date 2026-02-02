import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Send,
  Lock,
  ArrowRight,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface NegotiationOffer {
  id: string;
  proposedBy: 'customer' | 'vendor';
  proposerName: string;
  price: number;
  timeline: string;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: string;
}

export interface NegotiationData {
  bidId: string;
  originalPrice: number;
  originalTimeline: string;
  status: 'awaiting_vendor' | 'awaiting_customer' | 'accepted' | 'rejected' | 'locked';
  offers: NegotiationOffer[];
  finalizedPrice?: number;
  finalizedTimeline?: string;
}

interface NegotiationPanelProps {
  negotiation: NegotiationData;
  userRole: 'customer' | 'vendor';
  vendorName: string;
  customerName: string;
  onSubmitOffer: (price: number, timeline: string, notes: string) => void;
  onAcceptOffer: (offerId: string) => void;
  onRejectOffer: (offerId: string) => void;
  isLocked: boolean;
}

export const NegotiationPanel: React.FC<NegotiationPanelProps> = ({
  negotiation,
  userRole,
  vendorName,
  customerName,
  onSubmitOffer,
  onAcceptOffer,
  onRejectOffer,
  isLocked
}) => {
  const [price, setPrice] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const activeOffer = negotiation.offers.find(o => o.status === 'pending');
  const canTakeAction = !isLocked && (
    (userRole === 'customer' && negotiation.status === 'awaiting_customer') ||
    (userRole === 'vendor' && negotiation.status === 'awaiting_vendor')
  );

  const handleSubmit = () => {
    if (!price || !timeline) return;
    onSubmitOffer(parseFloat(price), timeline, notes);
    setPrice('');
    setTimeline('');
    setNotes('');
    setShowForm(false);
  };

  const getStatusBadge = () => {
    if (isLocked || negotiation.status === 'locked') {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
          <Lock className="h-4 w-4" />
          <span className="font-medium">Negotiation Locked</span>
        </div>
      );
    }

    if (negotiation.status === 'accepted') {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Agreement Reached</span>
        </div>
      );
    }

    if (negotiation.status === 'rejected') {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
          <XCircle className="h-4 w-4" />
          <span className="font-medium">Negotiation Ended</span>
        </div>
      );
    }

    if (negotiation.status === 'awaiting_customer') {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Awaiting Customer Response</span>
        </div>
      );
    }

    if (negotiation.status === 'awaiting_vendor') {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Awaiting Vendor Response</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Negotiation</h2>
          {getStatusBadge()}
        </div>
        <p className="text-white/80">
          {isLocked || negotiation.status === 'locked'
            ? 'This negotiation has been finalized'
            : 'Discuss and agree on final terms'}
        </p>
      </div>

      {/* Original Bid Summary */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-[#16232A] mb-3">Original Bid</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="h-10 w-10 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Original Price</p>
              <p className="font-bold text-[#16232A]">₹{negotiation.originalPrice.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#075056]" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Original Timeline</p>
              <p className="font-bold text-[#16232A]">{negotiation.originalTimeline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation History */}
      {negotiation.offers.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-[#16232A] mb-4">Negotiation History</h3>
          <div className="space-y-4">
            {negotiation.offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  offer.status === 'pending'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : offer.status === 'accepted'
                    ? 'border-green-500 bg-green-50'
                    : offer.status === 'rejected'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      offer.proposedBy === 'customer' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      <User className={`h-5 w-5 ${
                        offer.proposedBy === 'customer' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#16232A]">{offer.proposerName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(offer.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {offer.status === 'pending' && (
                    <span className="px-3 py-1 bg-[#FF5B04] text-white text-xs font-medium rounded-full">
                      Active Offer
                    </span>
                  )}
                  {offer.status === 'accepted' && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Accepted
                    </span>
                  )}
                  {offer.status === 'rejected' && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Rejected
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold text-[#16232A]">₹{offer.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Timeline:</span>
                    <span className="font-semibold text-[#16232A]">{offer.timeline}</span>
                  </div>
                </div>

                {offer.notes && (
                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200">
                    <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">{offer.notes}</p>
                  </div>
                )}

                {/* Action Buttons for Active Offer */}
                {offer.status === 'pending' && canTakeAction && (
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={() => onAcceptOffer(offer.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Offer
                    </Button>
                    <Button
                      onClick={() => onRejectOffer(offer.id)}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* New Offer Form */}
      {!isLocked && negotiation.status !== 'locked' && negotiation.status !== 'accepted' && negotiation.status !== 'rejected' && (
        <div className="p-6">
          {!showForm && canTakeAction ? (
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {activeOffer ? 'Submit Counter Offer' : 'Start Negotiation'}
            </Button>
          ) : showForm ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-[#16232A] mb-4">
                {activeOffer ? 'Your Counter Offer' : 'Your Offer'}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Proposed Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Timeline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g., 7 days"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional details or explanations..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!price || !timeline}
                  className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Offer
                </Button>
                <Button
                  onClick={() => {
                    setShowForm(false);
                    setPrice('');
                    setTimeline('');
                    setNotes('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            !canTakeAction && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <p className="text-sm text-gray-600">
                  {userRole === 'customer'
                    ? 'Waiting for vendor response...'
                    : 'Waiting for customer response...'}
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Final Agreement Summary */}
      {(negotiation.status === 'accepted' || negotiation.status === 'locked') && negotiation.finalizedPrice && (
        <div className="p-6 bg-green-50 border-t border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-green-900">Final Agreement</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border-2 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Final Price</p>
              <p className="text-2xl font-bold text-green-700">₹{negotiation.finalizedPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {negotiation.finalizedPrice < negotiation.originalPrice
                  ? `Saved ₹${(negotiation.originalPrice - negotiation.finalizedPrice).toLocaleString()}`
                  : negotiation.finalizedPrice > negotiation.originalPrice
                  ? `+₹${(negotiation.finalizedPrice - negotiation.originalPrice).toLocaleString()}`
                  : 'Original price maintained'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Final Timeline</p>
              <p className="text-xl font-bold text-green-700">{negotiation.finalizedTimeline}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
