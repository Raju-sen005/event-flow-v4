import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const events = [
    {
      id: '1',
      name: 'Singh Family Wedding',
      type: 'Wedding',
      date: '2025-02-14',
      location: 'The Grand Palace, Jaipur, Rajasthan',
      guests: 500,
      budget: 2500000,
      status: 'In Progress',
      vendors: 8,
      completion: 65,
      createdAt: '2025-01-10'
    },
    {
      id: '2',
      name: 'Tech Conference 2025',
      type: 'Corporate',
      date: '2025-03-10',
      location: 'Taj Hotel, Mumbai, Maharashtra',
      guests: 300,
      budget: 1800000,
      status: 'Planning',
      vendors: 12,
      completion: 40,
      createdAt: '2025-01-15'
    },
    {
      id: '3',
      name: 'Birthday Celebration',
      type: 'Birthday',
      date: '2025-02-25',
      location: 'Private Villa, Delhi',
      guests: 150,
      budget: 450000,
      status: 'Vendors Assigned',
      vendors: 5,
      completion: 80,
      createdAt: '2025-01-18'
    },
    {
      id: '4',
      name: 'Product Launch Event',
      type: 'Corporate',
      date: '2025-04-05',
      location: 'Convention Center, Bangalore',
      guests: 500,
      budget: 3000000,
      status: 'Planning',
      vendors: 10,
      completion: 25,
      createdAt: '2025-01-20'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Planning':
        return { color: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'In Progress':
        return { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle };
      case 'Vendors Assigned':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Events</h1>
          <p className="text-[#16232A]/70">Manage all your events in one place</p>
        </div>
        <Link to="/planner/events/create">
          <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events by name or type..."
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
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="vendors-assigned">Vendors Assigned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => {
          const statusConfig = getStatusConfig(event.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/planner/events/${event.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {event.type}
                      </span>
                      <span className={`px-2 py-1 ${statusConfig.color} text-xs rounded flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {event.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#16232A] mb-1">{event.name}</h3>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{event.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>₹{(event.budget / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{event.vendors} vendors assigned</span>
                    <span className="font-medium text-[#075056]">{event.completion}% complete</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#075056]"
                      style={{ width: `${event.completion}%` }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Create your first event to get started'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Link to="/planner/events/create">
              <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
