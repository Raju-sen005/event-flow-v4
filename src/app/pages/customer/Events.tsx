import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  Calendar,
  Users,
  ShoppingBag,
  Plus,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

export const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const events = [
    {
      id: 1,
      name: 'Sarah & John Wedding',
      type: 'Wedding',
      date: '2025-02-15',
      location: 'Grand Hotel Ballroom, New York',
      budget: 50000,
      guests: 150,
      rsvpConfirmed: 120,
      vendors: 5,
      status: 'planning',
      progress: 65
    },
    {
      id: 2,
      name: 'Annual Corporate Gala',
      type: 'Corporate',
      date: '2025-03-10',
      location: 'Convention Center, Los Angeles',
      budget: 100000,
      guests: 300,
      rsvpConfirmed: 180,
      vendors: 8,
      status: 'planning',
      progress: 45
    },
    {
      id: 3,
      name: 'Birthday Celebration',
      type: 'Birthday',
      date: '2025-01-25',
      location: 'Sunset Garden Venue',
      budget: 15000,
      guests: 50,
      rsvpConfirmed: 45,
      vendors: 3,
      status: 'ready',
      progress: 95
    },
    {
      id: 4,
      name: 'Product Launch Event',
      type: 'Corporate',
      date: '2025-04-20',
      location: 'Tech Hub Auditorium',
      budget: 75000,
      guests: 200,
      rsvpConfirmed: 50,
      vendors: 6,
      status: 'planning',
      progress: 30
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'planning':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#16232A]">My Events</h1>
          <p className="text-[#16232A]/70 mt-1">Create and manage all your events</p>
        </div>
        <Link to="/customer/events/create">
          <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            {/* Event Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-[#16232A]">{event.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-[#16232A]/60">{event.type}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-5 w-5 text-[#16232A]/60" />
              </button>
            </div>

            {/* Event Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                <DollarSign className="h-4 w-4" />
                <span>Budget: ${event.budget.toLocaleString()}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#16232A]/60 mb-1">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold text-[#16232A]">{event.rsvpConfirmed}/{event.guests}</p>
                <p className="text-xs text-[#16232A]/60">Guests</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#16232A]/60 mb-1">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold text-[#16232A]">{event.vendors}</p>
                <p className="text-xs text-[#16232A]/60">Vendors</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#16232A]/60 mb-1">
                  <Calendar className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold text-[#16232A]">{event.progress}%</p>
                <p className="text-xs text-[#16232A]/60">Complete</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#16232A]/60 mb-2">
                <span>Event Progress</span>
                <span>{event.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#FF5B04] h-2 rounded-full transition-all"
                  style={{ width: `${event.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <Link to={`/customer/events/${event.id}`}>
              <Button className="w-full bg-[#16232A] hover:bg-[#16232A]/90 text-white">
                View Details
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No events found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first event to get started'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Link to="/customer/events/create">
              <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
