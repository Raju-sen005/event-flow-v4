import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Mail,
  Calendar,
  MapPin
} from 'lucide-react';

// Types
type Guest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'accepted' | 'declined' | 'maybe' | 'sent' | 'not-invited';
  eventId: string;
  eventName: string;
  eventDate: string;
  category: string;
};

export const GlobalGuests: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock guests data
  const guests: Guest[] = [
    {
      id: '1',
      name: 'Emily Johnson',
      phone: '+1 234 567 8901',
      email: 'emily@example.com',
      status: 'accepted',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      eventDate: '2026-06-15',
      category: 'friend'
    },
    {
      id: '2',
      name: 'Michael Smith',
      phone: '+1 234 567 8902',
      status: 'maybe',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      eventDate: '2026-06-15',
      category: 'family'
    },
    {
      id: '3',
      name: 'David Lee',
      phone: '+1 234 567 8903',
      email: 'david@example.com',
      status: 'sent',
      eventId: '2',
      eventName: 'Corporate Annual Gala',
      eventDate: '2026-08-20',
      category: 'colleague'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      phone: '+1 234 567 8904',
      status: 'declined',
      eventId: '1',
      eventName: 'Sarah & John Wedding',
      eventDate: '2026-06-15',
      category: 'friend'
    },
    {
      id: '5',
      name: 'John Anderson',
      phone: '+1 234 567 8905',
      email: 'john@example.com',
      status: 'accepted',
      eventId: '2',
      eventName: 'Corporate Annual Gala',
      eventDate: '2026-08-20',
      category: 'colleague'
    }
  ];

  // Get unique events
  const events = Array.from(new Set(guests.map(g => g.eventName)));

  // Filter guests
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.phone.includes(searchQuery);
    const matchesEvent = eventFilter === 'all' || guest.eventName === eventFilter;
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  // Group guests by event
  const groupedGuests = filteredGuests.reduce((acc, guest) => {
    if (!acc[guest.eventName]) {
      acc[guest.eventName] = {
        eventId: guest.eventId,
        eventDate: guest.eventDate,
        guests: []
      };
    }
    acc[guest.eventName].guests.push(guest);
    return acc;
  }, {} as Record<string, { eventId: string; eventDate: string; guests: Guest[] }>);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Accepted' };
      case 'declined':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Declined' };
      case 'maybe':
        return { bg: 'bg-amber-100', text: 'text-amber-700', icon: HelpCircle, label: 'Maybe' };
      case 'sent':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: Mail, label: 'Invited' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: 'Not Invited' };
    }
  };

  // Calculate stats
  const totalGuests = guests.length;
  const accepted = guests.filter(g => g.status === 'accepted').length;
  const pending = guests.filter(g => g.status === 'sent' || g.status === 'maybe').length;
  const declined = guests.filter(g => g.status === 'declined').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-[#16232A] mb-2">All Guests</h1>
        <p className="text-[#16232A]/70">
          Manage guests across all your events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Total Guests</p>
          <p className="text-2xl font-bold text-[#16232A]">{totalGuests}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Accepted</p>
          <p className="text-2xl font-bold text-green-900">{accepted}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-sm text-amber-700 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-900">{pending}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-sm text-red-700 mb-1">Declined</p>
          <p className="text-2xl font-bold text-red-900">{declined}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
          <input
            type="text"
            placeholder="Search guests by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Events</option>
            {events.map(event => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="maybe">Maybe</option>
            <option value="sent">Invited</option>
          </select>
        </div>
      </div>

      {/* Grouped Guests by Event */}
      {Object.keys(groupedGuests).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedGuests).map(([eventName, data]) => (
            <div key={eventName} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#16232A] mb-1">{eventName}</h3>
                  <div className="flex items-center gap-3 text-sm text-[#16232A]/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(data.eventDate).toLocaleDateString()}</span>
                    </div>
                    <span>��</span>
                    <span>{data.guests.length} guest{data.guests.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/customer/events/${data.eventId}/guests-enhanced`)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
                >
                  View Event Guests
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {data.guests.map((guest) => {
                    const statusConfig = getStatusBadge(guest.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={guest.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#075056]/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-[#075056]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#16232A]">{guest.name}</p>
                            <p className="text-sm text-[#16232A]/60">{guest.phone}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No guests found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {searchQuery || eventFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add guests to your events to see them here'}
          </p>
          {(searchQuery || eventFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setEventFilter('all');
                setStatusFilter('all');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};