import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Award,
  Search,
  FileText,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
  CheckCircle,
  Package
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      label: 'Active Events',
      value: '8',
      change: '+2 this month',
      icon: Award,
      color: 'bg-[#075056]',
      trend: 'up'
    },
    {
      label: 'Pending Bids',
      value: '12',
      change: '3 shortlisted',
      icon: FileText,
      color: 'bg-[#FF5B04]',
      trend: 'up'
    },
    {
      label: 'This Month Earnings',
      value: '₹2,45,000',
      change: '+18% vs last month',
      icon: DollarSign,
      color: 'bg-[#075056]',
      trend: 'up'
    },
    {
      label: 'Rating',
      value: '4.8',
      change: 'From 156 reviews',
      icon: Star,
      color: 'bg-[#FF5B04]',
      trend: 'neutral'
    }
  ];

  const recentBids = [
    {
      id: 'REQ-1234',
      eventType: 'Wedding',
      customer: 'Sneha & Arjun',
      location: 'Mumbai, Maharashtra',
      eventDate: '2025-03-15',
      budget: '₹5,00,000',
      status: 'Shortlisted',
      submittedDate: '2025-01-05'
    },
    {
      id: 'REQ-1256',
      eventType: 'Corporate Event',
      customer: 'Tech Solutions Ltd',
      location: 'Bangalore, Karnataka',
      eventDate: '2025-02-28',
      budget: '₹3,50,000',
      status: 'Under Review',
      submittedDate: '2025-01-07'
    },
    {
      id: 'REQ-1289',
      eventType: 'Birthday Party',
      customer: 'Ravi Sharma',
      location: 'Delhi, NCR',
      eventDate: '2025-02-10',
      budget: '₹1,50,000',
      status: 'Pending',
      submittedDate: '2025-01-06'
    }
  ];

  const upcomingEvents = [
    {
      id: 'EVT-5678',
      eventType: 'Wedding',
      customer: 'Priya & Karan',
      location: 'Goa',
      eventDate: '2025-01-20',
      amount: '₹4,50,000',
      status: 'Confirmed'
    },
    {
      id: 'EVT-5701',
      eventType: 'Engagement',
      customer: 'Anjali & Vikram',
      location: 'Pune, Maharashtra',
      eventDate: '2025-01-25',
      amount: '₹2,00,000',
      status: 'Confirmed'
    }
  ];

  const newRequirements = [
    {
      id: 'REQ-1301',
      eventType: 'Wedding',
      location: 'Jaipur, Rajasthan',
      eventDate: '2025-04-15',
      budget: '₹8,00,000',
      guestCount: 500,
      postedTime: '2 hours ago'
    },
    {
      id: 'REQ-1302',
      eventType: 'Corporate Event',
      location: 'Mumbai, Maharashtra',
      eventDate: '2025-03-10',
      budget: '₹5,00,000',
      guestCount: 300,
      postedTime: '5 hours ago'
    },
    {
      id: 'REQ-1303',
      eventType: 'Anniversary',
      location: 'Bangalore, Karnataka',
      eventDate: '2025-02-20',
      budget: '₹2,50,000',
      guestCount: 150,
      postedTime: '1 day ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#16232A] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              {stat.trend === 'up' && (
                <span className="flex items-center text-xs font-medium text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </span>
              )}
            </div>
            <div>
              <p className="text-3xl font-bold text-[#16232A] mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bids */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#16232A]">Recent Bids</h2>
            <Link
              to="/vendor/bids"
              className="text-sm text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBids.map((bid) => (
              <div key={bid.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-[#16232A] mb-1">{bid.eventType}</p>
                    <p className="text-sm text-gray-600">{bid.customer}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      bid.status === 'Shortlisted'
                        ? 'bg-green-100 text-green-700'
                        : bid.status === 'Under Review'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {bid.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {bid.eventDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {bid.budget}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#16232A]">Upcoming Events</h2>
            <Link
              to="/vendor/events"
              className="text-sm text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-[#16232A] mb-1">{event.eventType}</p>
                    <p className="text-sm text-gray-600">{event.customer}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.eventDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {event.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* New Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#16232A]">New Requirements</h2>
            <p className="text-sm text-gray-600 mt-1">Fresh opportunities matching your services</p>
          </div>
          <Link
            to="/vendor/requirements"
            className="text-sm text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium flex items-center gap-1"
          >
            Browse All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {newRequirements.map((req) => (
            <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#16232A]">{req.eventType}</h3>
                    <span className="px-2 py-1 bg-[#FF5B04]/10 text-[#FF5B04] text-xs font-medium rounded">
                      {req.id}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{req.location}</p>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {req.postedTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {req.eventDate}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#16232A]">
                    <DollarSign className="h-4 w-4" />
                    {req.budget}
                  </span>
                  <span className="text-gray-600">{req.guestCount} guests</span>
                </div>
                <Link
                  to={`/vendor/requirements/${req.id}`}
                  className="px-4 py-2 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Link
          to="/vendor/requirements"
          className="bg-gradient-to-br from-[#075056] to-[#075056]/80 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group"
        >
          <Search className="h-10 w-10 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold mb-2">Browse Requirements</h3>
          <p className="text-sm opacity-90">Find new opportunities and submit bids</p>
          <div className="mt-4 flex items-center text-sm font-medium">
            Explore Now
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/vendor/profile"
          className="bg-gradient-to-br from-[#FF5B04] to-[#FF5B04]/80 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group"
        >
          <Package className="h-10 w-10 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold mb-2">Manage Profile</h3>
          <p className="text-sm opacity-90">Update portfolio and packages</p>
          <div className="mt-4 flex items-center text-sm font-medium">
            Update Now
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/vendor/earnings"
          className="bg-gradient-to-br from-[#16232A] to-[#16232A]/80 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group"
        >
          <DollarSign className="h-10 w-10 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold mb-2">View Earnings</h3>
          <p className="text-sm opacity-90">Track payments and financial reports</p>
          <div className="mt-4 flex items-center text-sm font-medium">
            View Details
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};
