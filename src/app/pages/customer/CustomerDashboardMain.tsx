import React from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  Calendar,
  MapPin,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Users,
  ShoppingBag,
  Mail,
  Bell,
  TrendingUp,
  PartyPopper
} from 'lucide-react';

type EventStatus = 'planning' | 'vendors-finalized' | 'in-progress' | 'completed';

type Event = {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  status: EventStatus;
  progress: number;
  vendorsFinalized: boolean;
  paymentsPending: number;
  guestsResponded: number;
  guestsTotal: number;
};

type Notification = {
  id: string;
  type: 'payment' | 'vendor' | 'invitation' | 'general';
  message: string;
  eventId: string;
  eventName: string;
  time: string;
  urgent: boolean;
};

export const CustomerDashboardMain: React.FC = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: 'Sarah',
    firstName: 'Sarah'
  };

  // Mock events
  const events: Event[] = [
    {
      id: '1',
      name: 'Sarah & John Wedding',
      type: 'Wedding',
      date: '2026-06-15',
      location: 'New York, NY',
      status: 'vendors-finalized',
      progress: 75,
      vendorsFinalized: true,
      paymentsPending: 11250,
      guestsResponded: 120,
      guestsTotal: 150
    },
    {
      id: '2',
      name: 'Mom\'s 60th Birthday',
      type: 'Birthday',
      date: '2026-08-22',
      location: 'Los Angeles, CA',
      status: 'planning',
      progress: 35,
      vendorsFinalized: false,
      paymentsPending: 5000,
      guestsResponded: 20,
      guestsTotal: 80
    },
    {
      id: '3',
      name: 'Company Annual Gala',
      type: 'Corporate',
      date: '2026-12-10',
      location: 'Chicago, IL',
      status: 'planning',
      progress: 20,
      vendorsFinalized: false,
      paymentsPending: 0,
      guestsResponded: 0,
      guestsTotal: 200
    }
  ];

  // Get upcoming event (nearest date)
  const upcomingEvent = events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0];

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'payment',
      message: 'Payment of $11,250 due in 3 days',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      time: '2 hours ago',
      urgent: true
    },
    {
      id: '2',
      type: 'vendor',
      message: 'Vendor marked Make-In awaiting confirmation',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      time: '5 hours ago',
      urgent: false
    },
    {
      id: '3',
      type: 'invitation',
      message: '30 invitation responses pending',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      time: '1 day ago',
      urgent: false
    }
  ];

  // Calculate quick status summary
  const statusSummary = {
    pendingVendorFinalization: events.filter(e => !e.vendorsFinalized).length,
    pendingPayments: events.reduce((sum, e) => sum + e.paymentsPending, 0),
    invitationsNotSent: events.filter(e => e.guestsResponded === 0).length,
    upcomingEvents: events.filter(
      e => new Date(e.date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'vendors-finalized':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusText = (status: EventStatus) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return 'Past';
    return `${days} days`;
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#16232A] to-[#16232A]/90 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3">
            Hi {user.firstName}, here's what's happening with your events.
          </h1>
          <p className="text-white/80 text-lg">
            You can manage everything from your event pages.
          </p>
        </motion.div>
      </div>

      {/* Upcoming Event Highlight */}
      {upcomingEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#16232A]">Upcoming Event</h2>
          </div>

          <div className="bg-gradient-to-br from-[#FF5B04] to-[#FF5B04]/80 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
                    {getDaysUntil(upcomingEvent.date)} away
                  </span>
                  <h3 className="text-3xl font-bold mb-2">{upcomingEvent.name}</h3>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>
                        {new Date(upcomingEvent.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{upcomingEvent.location}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    upcomingEvent.status === 'vendors-finalized'
                      ? 'bg-green-500'
                      : upcomingEvent.status === 'in-progress'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  } text-white`}
                >
                  {getStatusText(upcomingEvent.status)}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Event Progress</span>
                  <span className="text-lg font-bold">{upcomingEvent.progress}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${upcomingEvent.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {upcomingEvent.vendorsFinalized ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                    <span className="text-sm">Vendors</span>
                  </div>
                  <p className="font-bold">{upcomingEvent.vendorsFinalized ? 'Finalized' : 'In Progress'}</p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-sm">Payments</span>
                  </div>
                  <p className="font-bold">
                    {upcomingEvent.paymentsPending > 0
                      ? `$${upcomingEvent.paymentsPending.toLocaleString()} pending`
                      : 'All Paid'}
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Guests</span>
                  </div>
                  <p className="font-bold">
                    {upcomingEvent.guestsResponded} / {upcomingEvent.guestsTotal} responded
                  </p>
                </div>
              </div>

              <Link to={`/customer/events/${upcomingEvent.id}`}>
                <Button className="bg-white text-[#FF5B04] hover:bg-white/90 w-full md:w-auto">
                  View Event
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Status Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-[#16232A] mb-4">Quick Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/customer/events"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              {statusSummary.pendingVendorFinalization > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {statusSummary.pendingVendorFinalization}
                </span>
              )}
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Vendor Finalization</p>
            <p className="text-lg font-bold text-[#16232A]">
              {statusSummary.pendingVendorFinalization > 0
                ? `${statusSummary.pendingVendorFinalization} pending`
                : 'All set'}
            </p>
          </Link>

          <Link
            to="/customer/events"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              {statusSummary.pendingPayments > 0 && (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Pending Payments</p>
            <p className="text-lg font-bold text-[#16232A]">
              {statusSummary.pendingPayments > 0
                ? `$${statusSummary.pendingPayments.toLocaleString()}`
                : 'All paid'}
            </p>
          </Link>

          <Link
            to="/customer/events"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              {statusSummary.invitationsNotSent > 0 && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  {statusSummary.invitationsNotSent}
                </span>
              )}
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Invitations</p>
            <p className="text-lg font-bold text-[#16232A]">
              {statusSummary.invitationsNotSent > 0
                ? `${statusSummary.invitationsNotSent} not sent`
                : 'All sent'}
            </p>
          </Link>

          <Link
            to="/customer/events"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Upcoming</p>
            <p className="text-lg font-bold text-[#16232A]">
              {statusSummary.upcomingEvents} event{statusSummary.upcomingEvents !== 1 ? 's' : ''}
            </p>
          </Link>
        </div>
      </motion.div>

      {/* My Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#16232A]">My Events</h2>
          <Link to="/customer/events/create">
            <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/customer/events/${event.id}`}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                        <PartyPopper className="h-6 w-6 text-[#075056]" />
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                          event.status
                        )}`}
                      >
                        {getStatusText(event.status)}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#16232A] text-lg mb-1 group-hover:text-[#FF5B04] transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-sm text-[#16232A]/60 mb-3">{event.type}</p>

                    <div className="space-y-2 text-sm text-[#16232A]/70 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#16232A]/60">Progress</span>
                        <span className="font-semibold text-[#16232A]">{event.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF5B04] rounded-full transition-all duration-500"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#16232A]/60">
                      <span>{getDaysUntil(event.date)}</span>
                      <ArrowRight className="h-4 w-4 text-[#FF5B04] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#16232A] mb-2">No Events Yet</h3>
            <p className="text-[#16232A]/60 mb-6">
              You haven't created any events yet. Start planning your special occasion!
            </p>
            <Link to="/customer/events/create">
              <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Notifications & Reminders */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#16232A]">Notifications & Reminders</h2>
            <Link to="/customer/notifications">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/customer/events/${notification.eventId}`}>
                  <div
                    className={`bg-white rounded-xl p-4 border-2 hover:shadow-lg transition-all group ${
                      notification.urgent ? 'border-amber-300' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'payment'
                            ? 'bg-amber-100'
                            : notification.type === 'vendor'
                            ? 'bg-blue-100'
                            : notification.type === 'invitation'
                            ? 'bg-purple-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        {notification.type === 'payment' ? (
                          <DollarSign
                            className={`h-5 w-5 ${notification.urgent ? 'text-amber-600' : 'text-amber-500'}`}
                          />
                        ) : notification.type === 'vendor' ? (
                          <ShoppingBag className="h-5 w-5 text-blue-600" />
                        ) : notification.type === 'invitation' ? (
                          <Mail className="h-5 w-5 text-purple-600" />
                        ) : (
                          <Bell className="h-5 w-5 text-gray-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-[#16232A] mb-1 group-hover:text-[#FF5B04] transition-colors">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#16232A]/60">
                          <span>{notification.eventName}</span>
                          <span>•</span>
                          <span>{notification.time}</span>
                        </div>
                      </div>

                      {notification.urgent && (
                        <div className="flex-shrink-0">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                            Urgent
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
