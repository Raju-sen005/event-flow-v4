import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/app/components/ui/tooltip";
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
  Loader2,
} from "lucide-react";

type BidStatus =
  | "new"
  | "under-negotiation"
  | "finalization-requested"
  | "finalized"
  | "declined"
  | "closed";

type NegotiationOffer = {
  id: string;
  from: "customer" | "vendor";
  price: number;
  notes: string;
  createdAt: string;
  status: "pending" | "accepted" | "rejected" | "countered";
};

export const EventBidDetail: React.FC = () => {
  const { id: eventId, bidId } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const [showNegotiationPanel, setShowNegotiationPanel] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(
    action === "finalize",
  );
  const [showAcceptOfferModal, setShowAcceptOfferModal] = useState(false);
  const [proposedPrice, setProposedPrice] = useState("");
  const [negotiationNotes, setNegotiationNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock bid data
  const [bid, setBid] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock negotiation history
  const [negotiationHistory, setNegotiationHistory] = useState<
    NegotiationOffer[]
  >([]);

  useEffect(() => {
    fetchNegotiation();
  }, [bidId]);

  const fetchNegotiation = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/negotiation/${bidId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const offers = res.data?.data?.offers || [];
      console.log("NEGOTIATION API FULL:", res.data);

      // 🔥 IMPORTANT MAPPING
      const mapped = offers.map((o: any) => ({
        id: o.id,
        from: o.proposed_by, // ✅ backend → frontend fix
        price: o.price,
        notes: o.notes,
        createdAt: o.createdAt,
        status: o.status || "pending",
      }));

      setNegotiationHistory(mapped);
    } catch (err) {
      console.error("Error fetching negotiation", err);
    }
  };

  const activeOffer =
    negotiationHistory?.length > 0
      ? negotiationHistory[negotiationHistory.length - 1]
      : null;

  console.log("activeOffer:", activeOffer);
  console.log("negotiationHistory:", negotiationHistory);
  const showAccept =
    activeOffer?.from === "vendor" && activeOffer?.status === "pending";

  const showNegotiation =
    bid?.status !== "finalized" && bid?.status !== "closed";

  const showFinalize = bid?.status !== "closed" && bid?.status !== "declined";

  const canCustomerRespond =
    !activeOffer || // ✅ first time allow
    (activeOffer?.from === "vendor" && activeOffer?.status === "pending");

  // Handle submit negotiation
  const handleSubmitNegotiation = async () => {
    if (!proposedPrice || !negotiationNotes) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/negotiation/counter`,
        {
          bidId,
          price: Number(proposedPrice),
          timeline: "custom",
          notes: negotiationNotes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchNegotiation(); // 🔥 refresh

      setProposedPrice("");
      setNegotiationNotes("");
      setShowNegotiationPanel(false);
    } catch (err) {
      console.error("Error sending counter offer", err);
    }
  };

  // Handle accept vendor offer
  const handleAcceptOffer = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/negotiation/accept/${activeOffer?.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setShowAcceptOfferModal(false);
      fetchNegotiation(); // 🔥 refresh
      setShowFinalizeModal(true);
    } catch (err) {
      console.error("Error accepting offer", err);
    }
  };

  
  useEffect(() => {
    fetchBid();
  }, [bidId]);

  const fetchBid = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/bids/${bidId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBid(res.data.data);
    } catch (err) {
      console.error("Error fetching bid", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle finalize vendor
  const handleFinalizeVendor = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/negotiation/finalize`,
        { bidId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setShowFinalizeModal(false);

      navigate(`/customer/events/${eventId}/bids?finalized=${bidId}`);
    } catch (err) {
      console.error("Finalize error", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status info
  const getStatusInfo = () => {
    if (!bid)
      return {
        color: "gray",
        icon: <AlertCircle className="h-5 w-5 text-gray-600" />,
        title: "Loading...",
        message: "",
      };
    switch (bid?.status) {
      case "new":
        return {
          color: "blue",
          icon: (
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          ),
          title: "New Bid",
          message:
            "This is a new bid. You can review, negotiate, or accept the offer directly.",
        };
      case "under-negotiation":
        return {
          color: "amber",
          icon: (
            <MessageSquare className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          ),
          title: "Negotiation in Progress",
          message:
            "Review the latest offer below and continue negotiation or accept the current terms.",
        };
      case "finalization-requested":
        return {
          color: "purple",
          icon: (
            <Loader2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5 animate-spin" />
          ),
          title: "Finalization Requested",
          message:
            "Waiting for vendor to accept the finalization request. This may take 24-48 hours.",
        };
      case "finalized":
        return {
          color: "green",
          icon: (
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          ),
          title: "Vendor Finalized",
          message:
            "This vendor has been successfully finalized for your event. Proceed to agreements and payments.",
        };
      case "declined":
        return {
          color: "red",
          icon: (
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          ),
          title: "Finalization Declined",
          message:
            bid.declineReason ||
            "Vendor declined the finalization request. You can view other bids for this service.",
        };
      case "closed":
        return {
          color: "gray",
          icon: (
            <XCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
          ),
          title: "Bid Closed",
          message:
            "Another vendor was finalized for this service. This bid is no longer active.",
        };
      default:
        return {
          color: "gray",
          icon: (
            <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
          ),
          title: "Unknown Status",
          message: "",
        };
    }
  };

  // const canTakeAction =
  //   bid?.status === "new" || bid?.status === "under-negotiation";

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!bid) {
    return <div>No bid found</div>;
  }
  // const canTakeAction =
  //   bid?.status === "new" || bid?.status === "under-negotiation";

  const statusInfo = getStatusInfo();

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
                  src={`${BASE_URL}${bid.vendor?.VendorProfile?.profileImage}`}
                  alt={bid.vendor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#16232A] mb-1">
                  {bid.vendor?.name}
                </h1>
                <p className="text-[#FF5B04] font-medium mb-2">
                  {bid.vendor?.VendorProfile?.category}
                </p>
                <div className="flex items-center gap-4 text-sm text-[#16232A]/70">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#16232A]">
                      {bid.vendorRating}
                    </span>
                    <span>({bid.vendorReviews} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{bid.vendor?.VendorProfile?.experience}</span>
                  <span>•</span>
                  <span>{bid.vendor?.VendorProfile?.location}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigate(
                    `/customer/events/${eventId}/vendors/${bid.vendorId}`,
                  )
                }
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>

            {/* Current Status */}
            <div
              className={`rounded-xl p-4 bg-${statusInfo.color}-50 border border-${statusInfo.color}-200`}
            >
              <div className="flex items-start gap-3">
                {statusInfo.icon}
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#16232A]">
                    {statusInfo.title}
                  </p>
                  <p className="text-sm text-[#16232A]/70 mt-1">
                    {statusInfo.message}
                  </p>

                  {/* Post-finalization actions */}
                  {bid?.status === "finalized" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/customer/events/${eventId}/agreements`)
                        }
                        className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                      >
                        View Agreement
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/customer/events/${eventId}/payments`)
                        }
                      >
                        Manage Payments
                      </Button>
                    </div>
                  )}

                  {bid?.status === "declined" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/customer/events/${eventId}/bids?service=${bid.service}`,
                          )
                        }
                        className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                      >
                        View Other Bids
                      </Button>
                    </div>
                  )}

                  {bid?.status === "closed" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/customer/events/${eventId}/bids`)
                        }
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
                ${(bid.price || 0)?.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Package</span>
                <span className="font-semibold text-[#16232A]">
                  {bid.package_name}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Service</span>
                <span className="font-semibold text-[#16232A]">
                  {bid.vendor?.VendorProfile?.category}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Coverage</span>
                <span className="font-semibold text-[#16232A]">
                  {bid.timeline}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Delivery Time</span>
                <span className="font-semibold text-[#16232A]">
                  {bid.deliveryTime}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-[#16232A]/70">Event Date</span>
                <span className="font-semibold text-[#16232A]">
                  {new Date(bid.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {bid.originalPrice && bid.originalPrice !== bid.offeredPrice && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">
                  Special Discount Applied
                </p>
                <p className="text-sm text-green-800 mt-1">
                  Save $
                  {(bid.originalPrice - bid.offeredPrice)?.toLocaleString()}{" "}
                  from the original price
                </p>
              </div>
            )}
          </div>

          {/* Package Inclusions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-4">
              Package Includes
            </h3>
            <div className="space-y-2">
              {bid.inclusions?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#16232A]/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-4">
              Terms & Conditions
            </h3>
            <p className="text-sm text-[#16232A]/70">
              {bid.termsAndConditions}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-6">
            <h3 className="font-bold text-[#16232A] mb-4">Actions</h3>
            <div className="space-y-3">
              {/* ✅ Accept Offer */}
              {showAccept && (
                <Button
                  onClick={() => setShowAcceptOfferModal(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accept Offer
                </Button>
              )}

              {/* ✅ Negotiation */}
              {showNegotiation && (
                <Button
                  onClick={() => setShowNegotiationPanel(!showNegotiationPanel)}
                  className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {showNegotiationPanel ? "Hide" : "Start"} Negotiation
                </Button>
              )}

              {/* ✅ Finalize */}
              {showFinalize && (
                <Button
                  onClick={() => setShowFinalizeModal(true)}
                  className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Finalize Vendor
                </Button>
              )}

              {/* ❌ Closed / Declined State */}
              {(bid?.status === "closed" || bid?.status === "declined") && (
                <Button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  Actions Not Available
                </Button>
              )}

              {/* ✅ Always visible */}
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/customer/vendors/${bid.vendor?.VendorProfile?.id}`)
                }
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Full Profile
              </Button>

              <Button
                variant="outline"
                className="w-full"
                disabled={bid?.status === "closed"}
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
                  Submitted {new Date(bid.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#16232A]/50" />
                <span className="text-[#16232A]/70">
                  {new Date(bid.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
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
            <h3 className="text-xl font-bold text-[#16232A] mb-4">
              Negotiation History
            </h3>

            {/* Negotiation Timeline */}
            <div className="space-y-4 mb-6">
              {negotiationHistory?.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`p-4 rounded-xl ${
                    offer.from === "vendor"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          offer.from === "vendor"
                            ? "bg-blue-200"
                            : "bg-green-200"
                        }`}
                      >
                        {offer.from === "vendor" ? (
                          <ShoppingBag className="h-4 w-4 text-blue-700" />
                        ) : (
                          <User className="h-4 w-4 text-green-700" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A] text-sm">
                          {offer.from === "vendor" ? bid.vendorName : "You"}
                        </p>
                        <p className="text-xs text-[#16232A]/60">
                          {new Date(offer.createdAt)?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#16232A]">
                        ${offer.price?.toLocaleString()}
                      </p>
                      {offer.status === "pending" &&
                        index === negotiationHistory.length - 1 && (
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                            Active
                          </span>
                        )}
                    </div>
                  </div>
                  <p className="text-sm text-[#16232A]/70 mt-2">
                    {offer.notes}
                  </p>
                </div>
              ))}
            </div>

            {/* New Counter Offer Form */}
            {canCustomerRespond && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-[#16232A] mb-4">
                  Submit Counter Offer
                </h4>
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
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">
              Accept Vendor Offer
            </h3>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-900">
                You're about to accept the vendor's offer of{" "}
                <strong>
                  $
                  {activeOffer?.price
                    ? `₹${activeOffer.price.toLocaleString()}`
                    : "No active offer"}
                </strong>
                . This will move to finalization.
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
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">
              Finalize Vendor
            </h3>

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
                  <span className="font-medium text-[#16232A]">
                    {bid.packageName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Final Price:</span>
                  <span className="text-xl font-bold text-[#FF5B04]">
                    ${bid.price?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Coverage:</span>
                  <span className="font-medium text-[#16232A]">
                    {bid.timeline}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Important - This Action is Irreversible
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  Once finalized, this vendor cannot be changed for this
                  service. The vendor will receive a finalization request and
                  must accept before it's confirmed.
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
