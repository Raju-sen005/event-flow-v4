import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
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
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { WithdrawBidModal } from '../../components/WithdrawBidModal';
import { MessageModal } from '../../components/MessageModal';

type BidStatus = 'pending' | 'shortlisted' | 'rejected' | 'awarded';

export const MyBids: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BidStatus>('pending');
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);

  const bids = [
    {
      id: '1',
      requirementId: 'req-1',
      title: 'Wedding Photography & Videography',
      eventName: 'Singh Family Wedding',
      customer: 'Vikram Singh',
      eventDate: '2025-02-14',
      bidAmount: 95000,
      packageName: 'Premium Wedding Package',
      submittedAt: '2025-01-15T10:30:00',
      status: 'shortlisted' as BidStatus,
      totalBids: 8,
      rank: 2,
      customerViewed: true,
      notes: 'Customer requested portfolio samples'
    },
    {
      id: '2',
      requirementId: 'req-2',
      title: 'Corporate Event Catering',
      eventName: 'Tech Summit 2025',
      customer: 'Neha Kapoor',
      eventDate: '2025-02-10',
      bidAmount: 350000,
      packageName: 'Premium Corporate Package',
      submittedAt: '2025-01-14T15:20:00',
      status: 'pending' as BidStatus,
      totalBids: 12,
      customerViewed: false,
      notes: null
    },
    {
      id: '3',
      requirementId: 'req-3',
      title: 'Birthday Party Decoration',
      eventName: '30th Birthday Bash',
      customer: 'Riya Sharma',
      eventDate: '2025-02-05',
      bidAmount: 42000,
      packageName: 'Deluxe Decoration Package',
      submittedAt: '2025-01-13T09:15:00',
      status: 'awarded' as BidStatus,
      totalBids: 6,
      rank: 1,
      customerViewed: true,
      notes: 'Congratulations! Customer selected your bid',
      agreementStatus: 'pending'
    },
    {
      id: '4',
      requirementId: 'req-4',
      title: 'Engagement Ceremony Photography',
      eventName: 'Patel-Shah Engagement',
      customer: 'Amit Patel',
      eventDate: '2025-02-08',
      bidAmount: 55000,
      packageName: 'Standard Photography Package',
      submittedAt: '2025-01-12T14:45:00',
      status: 'rejected' as BidStatus,
      totalBids: 15,
      customerViewed: true,
      notes: 'Customer selected another vendor'
    },
    {
      id: '5',
      requirementId: 'req-5',
      title: 'Wedding Reception Catering',
      eventName: 'Gupta Wedding Reception',
      customer: 'Priya Gupta',
      eventDate: '2025-02-18',
      bidAmount: 625000,
      packageName: 'Grand Reception Package',
      submittedAt: '2025-01-14T11:00:00',
      status: 'pending' as BidStatus,
      totalBids: 18,
      customerViewed: true,
      notes: null
    },
  ];

  const tabs = [
    { id: 'pending' as BidStatus, label: 'Pending', count: bids.filter(b => b.status === 'pending').length },
    { id: 'shortlisted' as BidStatus, label: 'Shortlisted', count: bids.filter(b => b.status === 'shortlisted').length },
    { id: 'awarded' as BidStatus, label: 'Awarded', count: bids.filter(b => b.status === 'awarded').length },
    { id: 'rejected' as BidStatus, label: 'Rejected', count: bids.filter(b => b.status === 'rejected').length },
  ];

  const filteredBids = bids.filter(bid => bid.status === activeTab);

  const getStatusConfig = (status: BidStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          label: 'Under Review'
        };
      case 'shortlisted':
        return {
          icon: CheckCircle,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Shortlisted'
        };
      case 'awarded':
        return {
          icon: Award,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Awarded'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Not Selected'
        };
    }
  };

  const getTimeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds / 3600);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const handleWithdrawBid = (reason: string) => {
    console.log(`Bid withdrawn for reason: ${reason}`);
    // In a real app, this would call an API
    setWithdrawModalOpen(false);
    setSelectedBid(null);
  };

  const handleSendMessage = (message: string, attachments?: File[]) => {
    console.log(`Message sent: ${message}`, attachments);
    // In a real app, this would call an API
    setMessageModalOpen(false);
    setSelectedBid(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">My Bids</h1>
        <p className="text-[#16232A]/70">Track and manage all your bid submissions</p>
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
              <p className="text-2xl font-bold text-[#16232A]">{tabs[0].count}</p>
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
              <p className="text-2xl font-bold text-[#16232A]">{tabs[1].count}</p>
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
              <p className="text-2xl font-bold text-[#16232A]">{tabs[2].count}</p>
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
              <p className="text-2xl font-bold text-[#16232A]">{tabs[3].count}</p>
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#075056] text-[#075056]'
                    : 'border-transparent text-[#16232A]/70 hover:text-[#16232A]'
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
                          <span className={`px-3 py-1 ${statusConfig.bg} ${statusConfig.color} text-xs rounded-full font-medium flex items-center gap-1`}>
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
                          to={`/vendor/requirements/${bid.requirementId}`}
                          className="text-lg font-semibold text-[#16232A] hover:text-[#075056]"
                        >
                          {bid.title}
                        </Link>
                        <p className="text-sm text-[#16232A]/70">{bid.eventName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#075056]">
                          ₹{bid.bidAmount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-[#16232A]/50">Your bid amount</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Customer</p>
                        <p className="text-sm font-medium text-[#16232A]">{bid.customer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Event Date</p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {new Date(bid.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Package</p>
                        <p className="text-sm font-medium text-[#16232A]">{bid.packageName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Submitted</p>
                        <p className="text-sm font-medium text-[#16232A]">{getTimeSince(bid.submittedAt)}</p>
                      </div>
                    </div>

                    {bid.status === 'shortlisted' && bid.rank && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                          🎯 You're ranked #{bid.rank} out of {bid.totalBids} bids
                        </p>
                      </div>
                    )}

                    {bid.notes && (
                      <div className={`mb-4 p-3 rounded-lg border ${statusConfig.border} ${statusConfig.bg}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`h-4 w-4 ${statusConfig.color} flex-shrink-0 mt-0.5`} />
                          <p className="text-sm text-[#16232A]">{bid.notes}</p>
                        </div>
                      </div>
                    )}

                    {bid.status === 'awarded' && bid.agreementStatus === 'pending' && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[#16232A] mb-1">Action Required</p>
                            <p className="text-sm text-[#16232A]/70">Agreement is ready for your signature</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {bid.status === 'awarded' && (
                        <>
                          <Link to={`/vendor/events/${bid.id}`} className="flex-1">
                            <Button className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white">
                              View Event Details
                            </Button>
                          </Link>
                          {bid.agreementStatus === 'pending' && (
                            <Link to={`/vendor/agreements/${bid.id}`}>
                              <Button variant="outline">
                                Sign Agreement
                              </Button>
                            </Link>
                          )}
                        </>
                      )}
                      
                      {bid.status === 'pending' && (
                        <>
                          <Link to={`/vendor/bids/${bid.id}/detail`} className="flex-1">
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

                      {bid.status === 'shortlisted' && (
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
                          <Link to={`/vendor/requirements/${bid.requirementId}`}>
                            <Button variant="outline" className="gap-2">
                              View Requirement
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </>
                      )}

                      {bid.status === 'rejected' && (
                        <Link to={`/vendor/requirements/${bid.requirementId}`} className="flex-1">
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