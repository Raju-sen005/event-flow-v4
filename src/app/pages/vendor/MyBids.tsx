import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FileText,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award,
  MessageCircle,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { WithdrawBidModal } from "../../components/WithdrawBidModal";
import { MessageModal } from "../../components/MessageModal";

type BidStatus = "pending" | "shortlisted" | "rejected" | "awarded";

export const MyBids: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BidStatus>("pending");
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);

  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      id: "pending",
      label: "Pending",
      count: bids.filter((b) => b.status === "pending").length,
    },
    {
      id: "shortlisted",
      label: "Shortlisted",
      count: bids.filter((b) => b.status === "shortlisted").length,
    },
    {
      id: "awarded",
      label: "Awarded",
      count: bids.filter((b) => b.status === "accepted").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: bids.filter((b) => b.status === "rejected").length,
    },
  ];

  const filteredBids = bids.filter((bid) => {
    if (activeTab === "awarded") return bid.status === "accepted";
    return bid.status === activeTab;
  });

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://gogatherhub.com:5000/api/bids/my-bids", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("My Bids API Response:", res.data.data);
        setBids(res.data.data);
      } catch (error) {
        console.error("Fetch bids error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  const getStatusConfig = (status: BidStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          label: "Under Review",
        };
      case "shortlisted":
        return {
          icon: CheckCircle,
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          label: "Shortlisted",
        };
      case "awarded":
        return {
          icon: Award,
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          label: "Awarded",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          label: "Not Selected",
        };
    }
  };

  const getTimeSince = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000,
    );
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds / 3600);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const handleWithdrawBid = async (reason: string) => {
    const token = localStorage.getItem("token");

    await axios.delete(`https://gogatherhub.com:5000/api/bids/${selectedBid.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBids((prev) => prev.filter((b) => b.id !== selectedBid.id));

    setWithdrawModalOpen(false);
  };

  const handleSendMessage = async (message: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://gogatherhub.com:5000/api/messages",
        {
          bidId: selectedBid.id,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Message sent successfully");

      setMessageModalOpen(false);
      setSelectedBid(null);
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">My Bids</h1>
        <p className="text-[#16232A]/70">
          Track and manage all your bid submissions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {tabs[0].count}
              </p>
              <p className="text-sm text-[#16232A]/70">Pending</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {tabs[1].count}
              </p>
              <p className="text-sm text-[#16232A]/70">Shortlisted</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {tabs[2].count}
              </p>
              <p className="text-sm text-[#16232A]/70">Awarded</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {tabs[3].count}
              </p>
              <p className="text-sm text-[#16232A]/70">Rejected</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as BidStatus)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#075056] text-[#075056]"
                    : "border-transparent text-[#16232A]/70 hover:text-[#16232A]"
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-[#16232A] rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bids List */}
        <div className="p-6">
          {filteredBids.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-[#16232A]/20 mx-auto mb-4" />
              <p className="text-[#16232A]/70 mb-2">No {activeTab} bids</p>
              <Link to="/vendor/requirements">
                <Button variant="outline" className="gap-2">
                  Browse Requirements
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBids.map((bid, index) => {
                const statusConfig = getStatusConfig(bid.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:border-[#075056] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 ${statusConfig.bg} ${statusConfig.color} text-xs rounded-full font-medium flex items-center gap-1`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </span>
                          {bid.customerViewed && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Viewed by customer
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/vendor/requirements/${bid.event_id}`}
                          className="text-lg font-semibold text-[#16232A] hover:text-[#075056]"
                        >
                          {bid.title}
                        </Link>
                        <p className="text-sm text-[#16232A]/70">
                          {bid.eventName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#075056]">
                          ₹{bid.price?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-[#16232A]/50">
                          Your bid amount
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">
                          Customer
                        </p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {bid.Event?.CustomerProfile?.firstName || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">
                          Event Date
                        </p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {bid.Event?.date
                            ? new Date(bid.Event.date).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                },
                              )
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">
                          Package
                        </p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {bid.package_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">
                          Submitted
                        </p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {getTimeSince(bid.createdAt)}
                        </p>
                      </div>
                    </div>

                    {bid.status === "shortlisted" && bid.rank && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                          🎯 You're ranked #{bid.rank} out of {bid.totalBids}{" "}
                          bids
                        </p>
                      </div>
                    )}

                    {bid.notes && (
                      <div
                        className={`mb-4 p-3 rounded-lg border ${statusConfig.border} ${statusConfig.bg}`}
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle
                            className={`h-4 w-4 ${statusConfig.color} flex-shrink-0 mt-0.5`}
                          />
                          <p className="text-sm text-[#16232A]">{bid.notes}</p>
                        </div>
                      </div>
                    )}

                    {bid.status === "awarded" &&
                      bid.agreementStatus === "pending" && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#16232A] mb-1">
                                Action Required
                              </p>
                              <p className="text-sm text-[#16232A]/70">
                                Agreement is ready for your signature
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    <div className="flex gap-2">
                      {bid.status === "awarded" && (
                        <>
                          <Link
                            to={`/vendor/events/${bid.id}`}
                            className="flex-1"
                          >
                            <Button className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white">
                              View Event Details
                            </Button>
                          </Link>
                          {bid.agreementStatus === "pending" && (
                            <Link to={`/vendor/agreements/${bid.id}`}>
                              <Button variant="outline">Sign Agreement</Button>
                            </Link>
                          )}
                        </>
                      )}

                      {bid.status === "pending" && (
                        <>
                          <Link
                            to={`/vendor/bids/${bid.id}/detail`}
                            className="flex-1"
                          >
                            <Button variant="outline" className="w-full gap-2">
                              <ChevronRight className="h-4 w-4" />
                              View & Negotiate
                            </Button>
                          </Link>
                          <Link to={`/vendor/bids/${bid.id}/edit`}>
                            <Button variant="outline" className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                              setSelectedBid(bid);
                              setMessageModalOpen(true);
                            }}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Message
                          </Button>
                          <Button
                            variant="outline"
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedBid(bid);
                              setWithdrawModalOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Withdraw
                          </Button>
                        </>
                      )}

                      {bid.status === "shortlisted" && (
                        <>
                          <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                              setSelectedBid(bid);
                              setMessageModalOpen(true);
                            }}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Chat with Customer
                          </Button>
                          <Link to={`/vendor/requirements/${bid.event_id}`}>
                            <Button variant="outline" className="gap-2">
                              View Requirement
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </>
                      )}

                      {bid.status === "rejected" && (
                        <Link
                          to={`/vendor/requirements/${bid.event_id}`}
                          className="flex-1"
                        >
                          <Button variant="outline" className="w-full gap-2">
                            View Requirement
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Withdraw Bid Modal */}
      <WithdrawBidModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        bid={selectedBid}
        onWithdraw={handleWithdrawBid}
      />

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        bid={selectedBid}
        onSend={handleSendMessage}
      />
    </div>
  );
};
