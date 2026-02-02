import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  Users,
  DollarSign,
  ShoppingBag,
  FileText,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  PartyPopper,
  Gift,
  Bell,
  Activity
} from 'lucide-react';

// Types
type Event = {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  status: 'planning' | 'vendors-finalized' | 'in-progress' | 'completed';
  managementMode: 'self-managed' | 'planner-managed';
  vendorsFinalized: number;
  totalVendors: number;
  guestsResponded: number;
  totalGuests: number;
  pendingPayments: number;
  nextAction: string;
};

export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock customer data
  const customer = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    totalEvents: 3,
    upcomingEvents: 2,
    completedEvents: 1
  };

  // Mock upcoming events
  const upcomingEvents: Event[] = [
    {
      id: '1',
      name: 'Sarah & John Wedding',
      category: 'Wedding',
      date: '2026-06-15',
      location: 'Grand Hotel Ballroom, New York',
      status: 'planning',
      managementMode: 'self-managed',
      vendorsFinalized: 1,
      totalVendors: 6,
      guestsResponded: 45,
      totalGuests: 150,
      pendingPayments: 22500,
      nextAction: 'Finalize remaining vendors'
    },
    {
      id: '2',
      name: 'Corporate Annual Gala',
      category: 'Corporate Event',
      date: '2026-08-20',
      location: 'Convention Center, Boston',
      status: 'vendors-finalized',
      managementMode: 'planner-managed',
      vendorsFinalized: 8,
      totalVendors: 8,
      guestsResponded: 120,
      totalGuests: 200,
      pendingPayments: 15000,
      nextAction: 'Send remaining invitations'
    }
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'bid',
      title: 'New bid received',
      description: 'Elite Photography submitted a bid for Wedding',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment confirmed',
      description: 'Booking advance payment processed successfully',
      time: '5 hours ago',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'guest',
      title: 'Guest responded',
      description: '3 guests accepted your invitation',
      time: '1 day ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'vendor',
      title: 'Vendor finalized',
      description: 'DJ Beats Entertainment confirmed for Wedding',
      time: '2 days ago',
      icon: CheckCircle2,
      color: 'text-green-600'
    }
  ];

  // Quick stats
  const quickStats = [
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      onClick: () => navigate('/customer/events')
    },
    {
      label: 'Total Guests',
      value: upcomingEvents.reduce((sum, e) => sum + e.totalGuests, 0),
      icon: Users,
      color: 'bg-green-100 text-green-600',
      onClick: () => navigate('/customer/guests')
    },
    {
      label: 'Pending Payments',
      value: `$${upcomingEvents.reduce((sum, e) => sum + e.pendingPayments, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-600',
      onClick: () => navigate('/customer/payments')
    },
    {
      label: 'Active Vendors',
      value: upcomingEvents.reduce((sum, e) => sum + e.vendorsFinalized, 0),
      icon: ShoppingBag,
      color: 'bg-purple-100 text-purple-600',
      onClick: () => navigate('/customer/vendors')
    }
  ];

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-700';
      case 'vendors-finalized':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/80 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {customer.name}! 👋</h1>
            <p className="text-white/90 text-lg">
              You have {upcomingEvents.length} upcoming event{upcomingEvents.length !== 1 ? 's' : ''} to manage
            </p>
          </div>
          <button
            onClick={() => navigate('/customer/events/create')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#FF5B04] hover:bg-white/90 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Create New Event
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={stat.onClick}
            className="bg-white rounded-xl p-6 border border-gray-200 text-left hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">{stat.value}</p>
            <p className="text-sm text-[#16232A]/60">{stat.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#16232A]">Upcoming Events</h2>
            <button
              onClick={() => navigate('/customer/events')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#16232A]">{event.name}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(event.status)}`}>
                          {event.status.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                      </div>
                      <p className="text-[#16232A]/70">{event.category}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/customer/events/${event.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
                    >
                      View Event
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-[#16232A]/70">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#16232A]/70">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#16232A]/60 mb-1">Vendors</p>
                      <p className="text-lg font-bold text-[#16232A]">
                        {event.vendorsFinalized}/{event.totalVendors}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#16232A]/60 mb-1">Guests</p>
                      <p className="text-lg font-bold text-[#16232A]">
                        {event.guestsResponded}/{event.totalGuests}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#16232A]/60 mb-1">Pending</p>
                      <p className="text-lg font-bold text-amber-600">
                        ${event.pendingPayments.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Next Action */}
                  {event.nextAction && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">{event.nextAction}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/customer/events/${event.id}`)}
                        className="text-sm font-semibold text-[#FF5B04] hover:text-[#FF5B04]/90"
                      >
                        Resolve →
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <PartyPopper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#16232A] mb-2">No upcoming events</h3>
              <p className="text-[#16232A]/60 mb-6">Create your first event to get started!</p>
              <button
                onClick={() => navigate('/customer/events/create')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                Create Your First Event
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-[#16232A]" />
              <h3 className="font-bold text-[#16232A]">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#16232A]">{activity.title}</p>
                    <p className="text-xs text-[#16232A]/60 truncate">{activity.description}</p>
                    <p className="text-xs text-[#16232A]/40 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => navigate('/customer/activity')}
              className="w-full text-center text-sm font-semibold text-[#FF5B04] hover:text-[#FF5B04]/90 mt-4"
            >
              View All Activity →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-[#16232A] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/customer/vendors')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <ShoppingBag className="h-5 w-5 text-[#075056]" />
                <span className="text-sm font-medium text-[#16232A]">Browse Vendors</span>
              </button>
              <button
                onClick={() => navigate('/customer/event-planners')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <Sparkles className="h-5 w-5 text-[#075056]" />
                <span className="text-sm font-medium text-[#16232A]">Find Event Planners</span>
              </button>
              <button
                onClick={() => navigate('/customer/payments')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <DollarSign className="h-5 w-5 text-[#075056]" />
                <span className="text-sm font-medium text-[#16232A]">View Payments</span>
              </button>
              <button
                onClick={() => navigate('/customer/support')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <Bell className="h-5 w-5 text-[#075056]" />
                <span className="text-sm font-medium text-[#16232A]">Get Support</span>
              </button>
            </div>
          </div>

          {/* Tips & Suggestions */}
          <div className="bg-gradient-to-br from-[#075056] to-[#075056]/80 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold">Pro Tip</h3>
            </div>
            <p className="text-sm text-white/90">
              Finalize your vendors at least 30 days before your event to ensure smooth coordination and avoid last-minute issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};