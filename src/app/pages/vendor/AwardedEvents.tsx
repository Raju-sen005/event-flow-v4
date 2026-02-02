import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Award,
  Calendar,
  MapPin,
  User,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Filter
} from 'lucide-react';

export const AwardedEvents: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const events = [
    {
      id: '1',
      name: 'Sharma Wedding Reception',
      customer: {
        name: 'Priya Sharma',
        avatar: 'PS'
      },
      date: '2025-01-15',
      location: 'The Grand, Mumbai',
      category: 'Catering',
      amount: 285000,
      status: 'in-progress',
      progress: 65,
      agreementStatus: 'signed',
      paymentStatus: 'partial',
      deliverables: { completed: 4, total: 6 },
      nextMilestone: 'Upload menu confirmation',
      daysUntilEvent: 8
    },
    {
      id: '2',
      name: 'Tech Corp Annual Gala',
      customer: {
        name: 'Rahul Mehta',
        avatar: 'RM'
      },
      date: '2025-01-20',
      location: 'ITC Grand Central, Mumbai',
      category: 'Photography',
      amount: 95000,
      status: 'confirmed',
      progress: 30,
      agreementStatus: 'signed',
      paymentStatus: 'advance',
      deliverables: { completed: 2, total: 8 },
      nextMilestone: 'Review shot list',
      daysUntilEvent: 13
    },
    {
      id: '3',
      name: 'Birthday Celebration',
      customer: {
        name: 'Anjali Verma',
        avatar: 'AV'
      },
      date: '2025-01-22',
      location: 'Private Residence, Bandra',
      category: 'Decoration',
      amount: 42000,
      status: 'planning',
      progress: 45,
      agreementStatus: 'signed',
      paymentStatus: 'advance',
      deliverables: { completed: 3, total: 5 },
      nextMilestone: 'Submit theme mockup',
      daysUntilEvent: 15
    },
    {
      id: '4',
      name: 'Gupta Anniversary Party',
      customer: {
        name: 'Rajesh Gupta',
        avatar: 'RG'
      },
      date: '2025-02-05',
      location: 'Taj Lands End, Mumbai',
      category: 'Catering',
      amount: 165000,
      status: 'upcoming',
      progress: 20,
      agreementStatus: 'signed',
      paymentStatus: 'advance',
      deliverables: { completed: 1, total: 6 },
      nextMilestone: 'Menu finalization meeting',
      daysUntilEvent: 29
    },
    {
      id: '5',
      name: 'Corporate Retreat Photography',
      customer: {
        name: 'Sarah Khan',
        avatar: 'SK'
      },
      date: '2025-01-02',
      location: 'Lonavala Resort',
      category: 'Photography',
      amount: 75000,
      status: 'completed',
      progress: 100,
      agreementStatus: 'signed',
      paymentStatus: 'completed',
      deliverables: { completed: 8, total: 8 },
      nextMilestone: null,
      daysUntilEvent: -5
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'planning':
        return { label: 'Planning', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' };
      case 'confirmed':
        return { label: 'Confirmed', color: 'bg-purple-50 text-purple-700', dot: 'bg-purple-500' };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-500' };
      case 'upcoming':
        return { label: 'Upcoming', color: 'bg-gray-50 text-gray-700', dot: 'bg-gray-500' };
      case 'completed':
        return { label: 'Completed', color: 'bg-green-50 text-green-700', dot: 'bg-green-500' };
      default:
        return { label: status, color: 'bg-gray-50 text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const filteredEvents = filterStatus === 'all' 
    ? events 
    : events.filter(e => e.status === filterStatus);

  const activeEventsCount = events.filter(e => e.status !== 'completed').length;
  const totalEarnings = events.reduce((sum, e) => sum + e.amount, 0);
  const completedCount = events.filter(e => e.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">Awarded Events</h1>
        <p className="text-[#16232A]/70">Manage your confirmed events and deliverables</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-[#075056]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">{activeEventsCount}</p>
              <p className="text-sm text-[#16232A]/70">Active Events</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">{completedCount}</p>
              <p className="text-sm text-[#16232A]/70">Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">₹{(totalEarnings / 1000).toFixed(0)}k</p>
              <p className="text-sm text-[#16232A]/70">Total Value</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="h-5 w-5 text-[#16232A]/50" />
          {['all', 'planning', 'confirmed', 'in-progress', 'upcoming', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-[#075056] text-white'
                  : 'bg-gray-50 text-[#16232A] hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? 'All Events' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Award className="h-12 w-12 text-[#16232A]/20 mx-auto mb-4" />
            <p className="text-[#16232A]/70">No events found</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => {
            const statusConfig = getStatusConfig(event.status);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/vendor/events/${event.id}`}
                  className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-[#075056] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 ${statusConfig.color} text-xs rounded-full font-medium flex items-center gap-1.5`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
                          {statusConfig.label}
                        </span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#16232A] mb-1">{event.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-[#075056] rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{event.customer.avatar}</span>
                        </div>
                        <p className="text-sm text-[#16232A]/70">{event.customer.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#075056]">₹{event.amount.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-[#16232A]/50">Contract Value</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#16232A]/50" />
                      <div>
                        <p className="text-xs text-[#16232A]/50">Event Date</p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#16232A]/50" />
                      <div>
                        <p className="text-xs text-[#16232A]/50">Location</p>
                        <p className="text-sm font-medium text-[#16232A] truncate">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#16232A]/50" />
                      <div>
                        <p className="text-xs text-[#16232A]/50">Deliverables</p>
                        <p className="text-sm font-medium text-[#16232A]">
                          {event.deliverables.completed}/{event.deliverables.total} Complete
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {event.status !== 'completed' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-[#16232A]/70 mb-1">
                        <span>Overall Progress</span>
                        <span>{event.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#075056] rounded-full transition-all"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Next Milestone */}
                  {event.nextMilestone && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-[#16232A]">Next: {event.nextMilestone}</span>
                      </div>
                      {event.daysUntilEvent > 0 && (
                        <span className="text-xs text-[#16232A]/50">
                          {event.daysUntilEvent} days until event
                        </span>
                      )}
                    </div>
                  )}

                  {/* Payment Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`flex items-center gap-1 ${
                        event.agreementStatus === 'signed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        <CheckCircle className="h-3 w-3" />
                        Agreement {event.agreementStatus}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        event.paymentStatus === 'completed' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        <DollarSign className="h-3 w-3" />
                        Payment: {event.paymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#075056] font-medium">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
