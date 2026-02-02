import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { EventPickerModal } from '@/app/components/modals/EventPickerModal';
import {
  Search,
  X,
  Star,
  MapPin,
  Sparkles,
  CheckCircle2,
  Eye,
  Plus,
  AlertTriangle,
  Users,
  Award,
  Calendar
} from 'lucide-react';

// Types
type EventPlanner = {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  eventsManaged: number;
  experienceYears: number;
  specialties: string[];
  priceRange: string;
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planner: EventPlanner | null;
  hasVendors: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  planner,
  hasVendors
}) => {
  if (!isOpen || !planner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Selection</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {hasVendors && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Important Warning</p>
                <p className="text-sm text-amber-800">
                  Selecting an Event Planner will disable direct vendor management for this event. 
                  Your planner will handle all vendor coordination.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Selected Planner</p>
          <p className="font-semibold text-[#16232A]">{planner.name}</p>
          <p className="text-sm text-[#16232A]/70">{planner.company}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
          >
            Confirm Selection
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const EventPlanners: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [selectedPlanner, setSelectedPlanner] = useState<EventPlanner | null>(null);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Mock planners data
  const planners: EventPlanner[] = [
    {
      id: '1',
      name: 'Emma Richardson',
      company: 'Elite Events Co.',
      location: 'New York, NY',
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      eventsManaged: 250,
      experienceYears: 12,
      specialties: ['Wedding', 'Corporate', 'Social'],
      priceRange: '$$$'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Dream Makers Events',
      location: 'Los Angeles, CA',
      rating: 4.8,
      reviewCount: 98,
      verified: true,
      eventsManaged: 180,
      experienceYears: 9,
      specialties: ['Wedding', 'Birthday', 'Anniversary'],
      priceRange: '$$'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      company: 'Luxe Event Planning',
      location: 'Miami, FL',
      rating: 5.0,
      reviewCount: 156,
      verified: true,
      eventsManaged: 320,
      experienceYears: 15,
      specialties: ['Wedding', 'Luxury', 'Destination'],
      priceRange: '$$$$'
    },
    {
      id: '4',
      name: 'David Martinez',
      company: 'Corporate Events Pro',
      location: 'Chicago, IL',
      rating: 4.7,
      reviewCount: 89,
      verified: true,
      eventsManaged: 210,
      experienceYears: 10,
      specialties: ['Corporate', 'Conference', 'Product Launch'],
      priceRange: '$$$'
    }
  ];

  // Get unique locations and specialties
  const locations = ['all', ...Array.from(new Set(planners.map(p => p.location)))];
  const allSpecialties = Array.from(new Set(planners.flatMap(p => p.specialties)));
  const specialties = ['all', ...allSpecialties];

  // Filter planners
  const filteredPlanners = planners.filter(planner => {
    const matchesSearch = planner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || planner.location === locationFilter;
    const matchesSpecialty = specialtyFilter === 'all' || planner.specialties.includes(specialtyFilter);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const activeFiltersCount = [locationFilter, specialtyFilter].filter(f => f !== 'all').length;

  // Handle view profile
  const handleViewProfile = (plannerId: string) => {
    navigate(`/customer/event-planners/${plannerId}`);
  };

  // Handle select for event
  const handleSelectForEvent = (planner: EventPlanner) => {
    setSelectedPlanner(planner);
    setShowEventPicker(true);
  };

  // Handle event selected
  const handleEventSelected = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowEventPicker(false);
    
    // Check if event has vendors (mock check)
    const hasVendors = Math.random() > 0.5; // In production, check actual event data
    
    if (hasVendors) {
      setShowConfirmation(true);
    } else {
      confirmSelection();
    }
  };

  // Confirm selection
  const confirmSelection = () => {
    if (selectedEventId && selectedPlanner) {
      // Navigate to event with planner assigned
      navigate(`/customer/events/${selectedEventId}?planner=${selectedPlanner.id}`);
      setShowConfirmation(false);
      setSelectedPlanner(null);
      setSelectedEventId(null);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16232A] mb-2">Event Planners</h1>
            <p className="text-[#16232A]/70">
              Connect with professional event planners to manage your event from start to finish
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">How Event Planners Work</p>
            <p className="text-sm text-blue-800">
              Event Planners handle all vendor coordination, negotiations, and event management. 
              Once assigned, you won't manage vendors directly - your planner takes full control.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
          <input
            type="text"
            placeholder="Search planners by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc === 'all' ? 'All Locations' : loc}
              </option>
            ))}
          </select>

          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>
                {spec === 'all' ? 'All Specialties' : spec}
              </option>
            ))}
          </select>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setLocationFilter('all');
                setSpecialtyFilter('all');
              }}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
            >
              <X className="h-4 w-4" />
              Reset ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-[#16232A]/70">
            Showing <span className="font-semibold text-[#16232A]">{filteredPlanners.length}</span> planner{filteredPlanners.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Planners Grid */}
      {filteredPlanners.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlanners.map((planner, index) => (
            <motion.div
              key={planner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {planner.name.charAt(0)}
                  </div>
                  {planner.verified && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-bold text-[#16232A] text-lg mb-1">{planner.name}</h3>
                <p className="text-sm text-[#16232A]/70 mb-3">{planner.company}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-[#16232A]">{planner.rating}</span>
                    <span className="text-[#16232A]/60">({planner.reviewCount})</span>
                  </div>
                  <div className="text-[#16232A]/60">{planner.priceRange}</div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-[#16232A]/60 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{planner.location}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-purple-700">Events</p>
                    <p className="font-bold text-purple-900">{planner.eventsManaged}+</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-purple-700">Experience</p>
                    <p className="font-bold text-purple-900">{planner.experienceYears} yrs</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-xs text-[#16232A]/60 mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {planner.specialties.slice(0, 3).map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-[#16232A] text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(planner.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View Profile
                  </button>
                  <button
                    onClick={() => handleSelectForEvent(planner)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Select
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No planners found</h3>
          <p className="text-[#16232A]/60 mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setLocationFilter('all');
              setSpecialtyFilter('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Event Picker Modal */}
      <EventPickerModal
        isOpen={showEventPicker}
        onClose={() => {
          setShowEventPicker(false);
          setSelectedPlanner(null);
        }}
        onSelectEvent={handleEventSelected}
        title="Select Event"
        description={`Assign ${selectedPlanner?.name} to which event?`}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setSelectedPlanner(null);
          setSelectedEventId(null);
        }}
        onConfirm={confirmSelection}
        planner={selectedPlanner}
        hasVendors={true}
      />
    </div>
  );
};