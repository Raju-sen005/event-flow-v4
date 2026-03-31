import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  FileText,
  Bookmark,
  Share2,
  MessageCircle,
  CheckCircle,
  Phone,
  Edit,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { ShareModal } from "../../components/ShareModal";
import { AskQuestionModal } from "../../components/AskQuestionModal";

export const RequirementDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false);
  const [showCallConfirmation, setShowCallConfirmation] = useState(false);
  const [totalBids, setTotalBids] = useState(0);
  // Mock bid status - this would come from API
  const myBidStatus = null; // null | 'submitted' | 'negotiating' | 'finalized' | 'awarded'
  const isShortlisted = false; // This would be determined by customer
  const callAccessEnabled = true; // Customer enabled call access for this requirement

  // Determine if call button should be visible
  const canCall = isShortlisted || callAccessEnabled;

  // Mock data
  const [requirement, setRequirement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleCall = () => {
    setShowCallConfirmation(true);
  };

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://gogatherhub.com:5000/api/events/vendor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setRequirement(res.data.data);
      } catch (error) {
        console.error("Fetch requirement error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirement();
  }, [id]);

  useEffect(() => {
    const fetchTotalBids = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://gogatherhub.com:5000/api/bids/event/${id}/total-bids`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTotalBids(res.data.totalBids);
      } catch (error) {
        console.error("Total bids error:", error);
      }
    };

    if (id) {
      fetchTotalBids();
    }
  }, [id]);

  const initiateCall = () => {
    // Here you would:
    // 1. Make API call to initiate masked call
    // 2. Log call metadata (timestamp, requirement ID, vendor ID)
    // 3. Connect the call through telephony service
    alert("Initiating masked call... Call metadata logged.");
    setShowCallConfirmation(false);
  };

  // Determine CTA based on bid status
  const getBidCTA = () => {
    if (myBidStatus === "finalized" || myBidStatus === "awarded") {
      return (
        <Button
          disabled
          className="w-full bg-gray-400 cursor-not-allowed text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Bid Finalized
        </Button>
      );
    }

    if (myBidStatus === "negotiating") {
      return (
        <Button
          onClick={() => navigate(`/vendor/bids/${id}/detail`)}
          className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          Continue Negotiation
        </Button>
      );
    }

    if (myBidStatus === "submitted") {
      return (
        <Button
          onClick={() => navigate(`/vendor/bids/${id}/edit`)}
          className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Bid
        </Button>
      );
    }

    // No bid submitted yet
    return (
      <Button
        onClick={() => navigate(`/vendor/requirements/${id}/place-bid`)}
        className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
      >
        Place Bid
      </Button>
    );
  };

  if (loading) {
    return <div className="text-center py-20">Loading requirement...</div>;
  }

  if (!requirement) {
    return <div className="text-center py-20">Requirement not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/vendor/requirements"
        className="inline-flex items-center gap-2 text-[#075056] hover:text-[#075056]/80 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requirements
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                    {requirement.eventType}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">
                    {requirement.status}
                  </span>
                  <span className="text-xs text-[#16232A]/50">
                    Posted {requirement.postedAt}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#16232A] mb-2">
                  {requirement.name}
                </h1>
                <p className="text-lg text-[#16232A]/70">
                  {requirement.eventName}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved
                      ? "bg-[#075056] text-white"
                      : "bg-gray-50 text-[#16232A] hover:bg-gray-100"
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2 bg-gray-50 text-[#16232A] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-[#16232A]/50">Event Date</p>
                  <p className="font-semibold text-[#16232A]">
                    {new Date(requirement.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-[#16232A]/50">Guests</p>
                  <p className="font-semibold text-[#16232A]">
                    {requirement.guest}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-[#075056]" />
                </div>
                <div>
                  <p className="text-xs text-[#16232A]/50">Budget Range</p>
                  <p className="text-2xl font-bold text-[#075056]">
                    ₹{requirement.budget?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-[#16232A]/50">Expires On</p>
                  <p className="font-semibold text-[#16232A]">
                    {new Date(requirement.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div> */}
            </div>

            {/* Location */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#16232A]/50 mb-1">
                    Event Location
                  </p>
                  <p className="font-medium text-[#16232A]">
                    {requirement.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-[#16232A] mb-4">Event Description</h2>
            <p className="text-[#16232A]/70 whitespace-pre-line leading-relaxed">
              {requirement.notes}
            </p>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-[#16232A] mb-4">Detailed Requirements</h2>
            <div className="space-y-2">
              {requirement.services?.map((service: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
                  <p className="text-[#16232A]/70">{service.service_name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Event Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-[#16232A] mb-4">Event Schedule</h2>
            <div className="space-y-3">
              {/* {requirement.schedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#16232A]">{item.event}</p>
                    <p className="text-sm text-[#16232A]/70">{item.day} • {item.time}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </motion.div>

          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-[#16232A] mb-4">Expected Deliverables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* {requirement.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <FileText className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#16232A]/70">{deliverable}</p>
                </div>
              ))} */}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-[#16232A] mb-4">Vendor Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {/* {requirement.preferences.map((pref, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                >
                  {pref}
                </span>
              ))} */}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6"
          >
            <div className="mb-6">
              <p className="text-sm text-[#16232A]/50 mb-1">Budget Range</p>
              <p className="text-2xl font-bold text-[#075056]">
                ₹{requirement.budget?.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {getBidCTA()}

              {/* Call Button - Only visible if shortlisted or call access enabled */}
              {canCall && (
                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="w-full gap-2 border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call Customer
                </Button>
              )}

              <Button
                onClick={() => setShowAskQuestionModal(true)}
                variant="outline"
                className="w-full gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Ask Question
              </Button>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Total Bids</span>
                <span className="font-semibold text-[#16232A]">
                  {totalBids}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Posted</span>
                <span className="font-semibold text-[#16232A]">
                  {/* {new Date(requirement.Event?.date).toLocaleDateString("en-IN")} */}
                  {requirement.createdAt
                    ? new Date(requirement.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "-"}
                </span>
              </div>
              {/* <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Expires</span>
                <span className="font-semibold text-red-600">
                  {new Date(requirement.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div> */}
            </div>
          </motion.div>

          {/* Customer Info - Removed Rating */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h3 className="font-semibold text-[#16232A] mb-4">
              About Customer
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-[#075056] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {/* {requirement.customer?.avatar || "CU"} */}
                  {requirement?.CustomerProfile?.firstName
                    ? requirement.CustomerProfile.firstName
                        .charAt(0)
                        .toUpperCase()
                    : "CU"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#16232A]">
                  {requirement?.CustomerProfile?.firstName || "Customer"}
                </p>
                <p className="text-sm text-[#16232A]/50">
                  {/* {requirement.customer?.joined ||
                    "Member since " + new Date().getFullYear()} */}
                  Member since{" "}
                  {requirement?.CustomerProfile?.createdAt
                    ? new Date(
                        requirement.CustomerProfile.createdAt,
                      ).getFullYear()
                    : new Date().getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Event Type</span>
                <span className="font-semibold text-[#16232A]">
                  {requirement.eventType}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Events Hosted</span>
                <span className="font-semibold text-[#16232A]">
                  {requirement.customer?.eventsHosted || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#16232A]/70">Event Date</span>
                <span className="font-semibold text-[#16232A]">
                  {new Date(requirement.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={requirement.name}
        shareUrl={`${window.location.origin}/vendor/requirements/${id}`}
        description="Share this requirement with your network"
      />

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={showAskQuestionModal}
        onClose={() => setShowAskQuestionModal(false)}
        requirementId={id || ""}
        requirementTitle={requirement.name}
      />

      {/* Call Confirmation Modal */}
      {showCallConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-[#075056]/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#075056]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#16232A]">
                    Initiate Call
                  </h3>
                  <p className="text-sm text-[#16232A]/70">
                    Connect with customer
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  This is a <strong>masked call</strong> for privacy protection.
                  Your actual number will not be revealed to the customer.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#16232A]/70">Customer</span>
                  <span className="font-semibold text-[#16232A]">
                    {requirement.customer.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#16232A]/70">Requirement</span>
                  <span className="font-semibold text-[#16232A]">
                    {requirement.name}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCallConfirmation(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={initiateCall}
                  className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
