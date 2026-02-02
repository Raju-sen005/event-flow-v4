import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  FileText,
  Calendar,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerBids: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bids = [
    {
      id: '1',
      vendor: 'Elite Photography Studio',
      vendorCategory: 'Photography',
      event: 'Singh Family Wedding',
      eventDate: '2025-02-14',
      service: 'Photography & Videography',
      amount: 95000,
      status: 'pending',
      submittedAt: '2 hours ago',
      deadline: '2025-01-26'
    },
    {
      id: '2',
      vendor: 'Gourmet Catering Co.',
      vendorCategory: 'Catering',
      event: 'Tech Conference 2025',
      eventDate: '2025-03-10',
      service: 'Full Day Catering',
      amount: 450000,
      status: 'negotiating',
      submittedAt: '5 hours ago',
      deadline: '2025-01-28'
    },
    {
      id: '3',
      vendor: 'Decor Dreams',
      vendorCategory: 'Decoration',
      event: 'Birthday Celebration',
      eventDate: '2025-02-25',
      service: 'Theme Decoration',
      amount: 75000,
      status: 'approved',
      submittedAt: '1 day ago',
      deadline: '2025-01-25'
    },
    {
      id: '4',
      vendor: 'Sound & Lights Pro',
      vendorCategory: 'Entertainment',
      event: 'Product Launch Event',
      eventDate: '2025-04-05',
      service: 'Audio & Lighting',
      amount: 120000,
      status: 'pending',
      submittedAt: '3 hours ago',
      deadline: '2025-01-30'
    }
  ];

  const filteredBids = bids.filter(bid => {
    const matchesSearch = searchQuery === '' || 
      bid.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bid.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending Review' };
      case 'negotiating':
        return { color: 'bg-blue-100 text-blue-700', icon: AlertCircle, label: 'Negotiating' };
      case 'approved':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Approved' };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: Clock, label: status };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">Bids Management</h1>
        <p className="text-[#16232A]/70">Review and manage vendor bids for your events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bids.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Negotiating</p>
          <p className="text-2xl font-bold text-blue-600">
            {bids.filter(b => b.status === 'negotiating').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {bids.filter(b => b.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-[#075056]">
            ₹{(bids.reduce((sum, bid) => sum + bid.amount, 0) / 100000).toFixed(1)}L
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bids by vendor or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="negotiating">Negotiating</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bids List */}
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
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#16232A]">{bid.vendor}</h3>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {bid.vendorCategory}
                    </span>
                    <span className={`px-2 py-1 ${statusConfig.color} text-xs rounded flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{bid.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Bid Amount</p>
                  <p className="text-2xl font-bold text-[#075056]">₹{bid.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-gray-500">Event</p>
                    <p className="font-medium text-gray-900">{bid.event}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(bid.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">{bid.submittedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4" />
                  <div>
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="font-medium text-gray-900">
                      {new Date(bid.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link to={`/planner/bids/${bid.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                {bid.status === 'pending' && (
                  <>
                    <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
                      Negotiate
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  </>
                )}
                {bid.status === 'negotiating' && (
                  <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                    Continue Negotiation
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
