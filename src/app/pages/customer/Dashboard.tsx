import React from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  Calendar,
  Users,
  ShoppingBag,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  // Mock data
  const stats = [
    { label: 'Active Events', value: '3', icon: Calendar, color: 'bg-[#FF5B04]' },
    { label: 'Total Guests', value: '247', icon: Users, color: 'bg-[#075056]' },
    { label: 'Pending RSVPs', value: '42', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Active Vendors', value: '8', icon: ShoppingBag, color: 'bg-[#16232A]' },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Sarah & John Wedding',
      date: '2025-02-15',
      type: 'Wedding',
      guests: 150,
      rsvpConfirmed: 120,
      vendors: 5,
      status: 'planning'
    },
    {
      id: 2,
      name: 'Annual Corporate Gala',
      date: '2025-03-10',
      type: 'Corporate',
      guests: 300,
      rsvpConfirmed: 180,
      vendors: 8,
      status: 'planning'
    },
    {
      id: 3,
      name: 'Birthday Celebration',
      date: '2025-01-25',
      type: 'Birthday',
      guests: 50,
      rsvpConfirmed: 45,
      vendors: 3,
      status: 'ready'
    },
  ];

  const recentActivity = [
    { id: 1, type: 'rsvp', message: 'John Doe accepted invitation to Sarah & John Wedding', time: '2 hours ago' },
    { id: 2, type: 'vendor', message: 'New bid received from Elite Catering', time: '4 hours ago' },
    { id: 3, type: 'message', message: 'Message from Dream Photography', time: '5 hours ago' },
    { id: 4, type: 'rsvp', message: '5 new RSVPs for Corporate Gala', time: '1 day ago' },
  ];

  const quickActions = [
    { label: 'Create Event', href: '/customer/events/create', icon: Calendar, color: 'bg-[#FF5B04]' },
    { label: 'Add Guests', href: '/customer/guests/add', icon: Users, color: 'bg-[#075056]' },
    { label: 'Find Vendors', href: '/customer/vendors', icon: ShoppingBag, color: 'bg-[#16232A]' },
    { label: 'Post Requirement', href: '/customer/vendors/post-requirement', icon: Plus, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#16232A]">Dashboard</h1>
        <p className="text-[#16232A]/70 mt-1">Welcome back! Here's what's happening with your events.</p>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#16232A]/60 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#16232A]">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-[#16232A] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.href}>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className={`h-10 w-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#16232A]">Upcoming Events</h2>
            <Link to="/customer/events">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                to={`/customer/events/${event.id}`}
                className="block p-4 rounded-lg border border-gray-200 hover:border-[#FF5B04] hover:bg-gray-50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#16232A]">{event.name}</h3>
                    <p className="text-sm text-[#16232A]/60">{event.type}</p>
                  </div>
                  {event.status === 'ready' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Ready
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Planning
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.rsvpConfirmed}/{event.guests}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" />
                    {event.vendors} vendors
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'rsvp' ? 'bg-green-100' :
                  activity.type === 'vendor' ? 'bg-[#FF5B04]/10' :
                  'bg-blue-100'
                }`}>
                  {activity.type === 'rsvp' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : activity.type === 'vendor' ? (
                    <ShoppingBag className="h-4 w-4 text-[#FF5B04]" />
                  ) : (
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#16232A]">{activity.message}</p>
                  <p className="text-xs text-[#16232A]/50 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-[#16232A] mb-4">RSVP Summary</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-[#16232A] mb-3">{event.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#16232A]/60">Confirmed</span>
                  <span className="font-medium text-green-600">{event.rsvpConfirmed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#16232A]/60">Pending</span>
                  <span className="font-medium text-yellow-600">{event.guests - event.rsvpConfirmed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#16232A]/60">Total Invited</span>
                  <span className="font-medium text-[#16232A]">{event.guests}</span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FF5B04] h-2 rounded-full"
                    style={{ width: `${(event.rsvpConfirmed / event.guests) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
