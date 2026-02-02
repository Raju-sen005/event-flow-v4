import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Calendar,
  Users,
  FileText,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      label: 'Active Events',
      value: '12',
      change: '+2 this week',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
      trend: 'up'
    },
    {
      label: 'Vendors Assigned',
      value: '45',
      change: '+8 new',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      trend: 'up'
    },
    {
      label: 'Pending Bids',
      value: '18',
      change: 'Needs review',
      icon: FileText,
      color: 'bg-orange-50 text-orange-600',
      trend: 'neutral'
    },
    {
      label: 'Total Revenue',
      value: '₹12.5L',
      change: '+15% this month',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      trend: 'up'
    }
  ];

  const activeEvents = [
    {
      id: '1',
      name: 'Singh Family Wedding',
      type: 'Wedding',
      date: '2025-02-14',
      location: 'Jaipur, Rajasthan',
      status: 'In Progress',
      vendors: 8,
      completion: 65
    },
    {
      id: '2',
      name: 'Tech Conference 2025',
      type: 'Corporate',
      date: '2025-03-10',
      location: 'Mumbai, Maharashtra',
      status: 'Planning',
      vendors: 12,
      completion: 40
    },
    {
      id: '3',
      name: 'Birthday Celebration',
      type: 'Birthday',
      date: '2025-02-25',
      location: 'Delhi',
      status: 'Vendors Assigned',
      vendors: 5,
      completion: 80
    }
  ];

  const pendingBids = [
    {
      id: '1',
      vendor: 'Elite Photography Studio',
      event: 'Singh Family Wedding',
      service: 'Photography',
      amount: 95000,
      submittedAt: '2 hours ago'
    },
    {
      id: '2',
      vendor: 'Gourmet Catering Co.',
      event: 'Tech Conference 2025',
      service: 'Catering',
      amount: 450000,
      submittedAt: '5 hours ago'
    },
    {
      id: '3',
      vendor: 'Decor Dreams',
      event: 'Birthday Celebration',
      service: 'Decoration',
      amount: 75000,
      submittedAt: '1 day ago'
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'urgent',
      message: 'Final payment pending for Singh Family Wedding',
      time: '30 mins ago'
    },
    {
      id: '2',
      type: 'info',
      message: 'New bid received for Tech Conference 2025',
      time: '2 hours ago'
    },
    {
      id: '3',
      type: 'warning',
      message: 'Vendor confirmation needed for Birthday Celebration',
      time: '4 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">Dashboard</h1>
        <p className="text-[#16232A]/70">Welcome back! Here's what's happening with your events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#075056] mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Events */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#16232A]">Active Events</h2>
              <Link to="/planner/events">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {activeEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/planner/events/${event.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-[#075056] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#16232A]">{event.name}</h3>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.vendors} vendors
                      </span>
                      <span className={`px-2 py-1 ${
                        event.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700' :
                        event.status === 'Planning' ? 'bg-blue-50 text-blue-700' :
                        'bg-green-50 text-green-700'
                      } text-xs rounded`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#075056]"
                          style={{ width: `${event.completion}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{event.completion}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alerts & Pending Bids */}
        <div className="space-y-6">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-[#16232A] mb-4">Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.type === 'urgent' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex gap-2">
                    <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                      alert.type === 'urgent' ? 'text-red-600' :
                      alert.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        alert.type === 'urgent' ? 'text-red-900' :
                        alert.type === 'warning' ? 'text-yellow-900' :
                        'text-blue-900'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pending Bids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#16232A]">Pending Bids</h3>
              <Link to="/planner/bids">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {pendingBids.map((bid) => (
                <Link
                  key={bid.id}
                  to={`/planner/bids/${bid.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-[#075056] transition-colors"
                >
                  <p className="font-semibold text-[#16232A] text-sm mb-1">{bid.vendor}</p>
                  <p className="text-xs text-gray-600 mb-2">{bid.event} • {bid.service}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#075056]">₹{bid.amount.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-500">{bid.submittedAt}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
