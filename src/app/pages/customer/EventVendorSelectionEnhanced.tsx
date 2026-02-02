import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  X,
  Eye,
  Plus,
  Shield,
  Sparkles,
  Camera,
  Video,
  Utensils,
  Music,
  PartyPopper,
  Users,
  Loader2
} from 'lucide-react';

// Types
type Vendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceRange: string;
  startingPrice: number;
  location: string;
  image: string;
  verified: boolean;
  experience: string;
  availability: boolean;
  services: string[];
  eventTypes: string[];
};

export const EventVendorSelectionEnhanced: React.FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addingVendorId, setAddingVendorId] = useState<string | null>(null);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    category: 'Wedding',
    date: '2026-06-15',
    location: 'New York',
    managementMode: 'self-managed' as 'self-managed' | 'planner-managed',
    services: ['Photography', 'Videography', 'Catering', 'DJ Services', 'Decoration', 'Venue']
  };

  // Mock vendors (pre-filtered by system)
  const allVendors: Vendor[] = [
    {
      id: '1',
      name: 'Elite Photography Studio',
      category: 'Photography',
      rating: 4.9,
      reviews: 127,
      priceRange: '$$$',
      startingPrice: 3500,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
      verified: true,
      experience: '10+ years',
      availability: true,
      services: ['Photography', 'Photo Editing', 'Albums'],
      eventTypes: ['Wedding', 'Corporate', 'Birthday']
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      rating: 4.8,
      reviews: 89,
      priceRange: '$$$$',
      startingPrice: 8000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      verified: true,
      experience: '15+ years',
      availability: true,
      services: ['Catering', 'Buffet', 'Plated Meals', 'Bar Service'],
      eventTypes: ['Wedding', 'Corporate', 'Anniversary']
    },
    {
      id: '3',
      name: 'DJ Beats Entertainment',
      category: 'DJ Services',
      rating: 4.7,
      reviews: 56,
      priceRange: '$$',
      startingPrice: 1500,
      location: 'Brooklyn, NY',
      image: 'https://images.unsplash.com/photo-1571266028243-d220c6e2e4e4?w=400&h=300&fit=crop',
      verified: false,
      experience: '5+ years',
      availability: true,
      services: ['DJ Services', 'Sound System', 'Lighting'],
      eventTypes: ['Wedding', 'Birthday', 'Corporate']
    },
    {
      id: '4',
      name: 'Cinematic Moments',
      category: 'Videography',
      rating: 4.9,
      reviews: 93,
      priceRange: '$$$',
      startingPrice: 4500,
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
      verified: true,
      experience: '8+ years',
      availability: true,
      services: ['Videography', 'Drone Coverage', 'Same-day Edit'],
      eventTypes: ['Wedding', 'Corporate']
    },
    {
      id: '5',
      name: 'Elegant Event Decor',
      category: 'Decoration',
      rating: 4.6,
      reviews: 71,
      priceRange: '$$$',
      startingPrice: 3000,
      location: 'Queens, NY',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8e843?w=400&h=300&fit=crop',
      verified: true,
      experience: '12+ years',
      availability: true,
      services: ['Decoration', 'Floral Design', 'Lighting'],
      eventTypes: ['Wedding', 'Anniversary', 'Birthday']
    },
    {
      id: '6',
      name: 'Perfect Pixels Photography',
      category: 'Photography',
      rating: 4.5,
      reviews: 42,
      priceRange: '$$',
      startingPrice: 2000,
      location: 'Bronx, NY',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
      verified: false,
      experience: '3+ years',
      availability: true,
      services: ['Photography', 'Photo Booth'],
      eventTypes: ['Wedding', 'Birthday']
    }
  ];

  // Apply customer filters
  const filteredVendors = allVendors.filter((vendor) => {
    // Search query
    if (searchQuery && !vendor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Service filter
    if (selectedServiceFilter !== 'all' && vendor.category !== selectedServiceFilter) {
      return false;
    }

    // Price range filter
    if (priceRangeFilter !== 'all') {
      if (priceRangeFilter === 'budget' && vendor.startingPrice > 2500) return false;
      if (priceRangeFilter === 'mid' && (vendor.startingPrice < 2500 || vendor.startingPrice > 5000)) return false;
      if (priceRangeFilter === 'premium' && vendor.startingPrice < 5000) return false;
    }

    // Rating filter
    if (ratingFilter > 0 && vendor.rating < ratingFilter) {
      return false;
    }

    // Location filter
    if (locationFilter !== 'all' && !vendor.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }

    // Experience filter
    if (experienceFilter !== 'all') {
      if (experienceFilter === 'entry' && !vendor.experience.includes('3+')) return false;
      if (experienceFilter === 'mid' && !vendor.experience.match(/5\+|8\+|10\+|12\+|15\+/)) return false;
      if (experienceFilter === 'expert' && !vendor.experience.match(/10\+|12\+|15\+/)) return false;
    }

    return true;
  });

  // Check if any filter is active
  const hasActiveFilters = 
    selectedServiceFilter !== 'all' ||
    priceRangeFilter !== 'all' ||
    ratingFilter > 0 ||
    locationFilter !== 'all' ||
    experienceFilter !== 'all' ||
    searchQuery !== '';

  // Reset all filters
  const resetFilters = () => {
    setSelectedServiceFilter('all');
    setPriceRangeFilter('all');
    setRatingFilter(0);
    setLocationFilter('all');
    setExperienceFilter('all');
    setSearchQuery('');
  };

  // Handle add vendor
  const handleAddVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowConfirmModal(true);
  };

  // Confirm add vendor
  const confirmAddVendor = async () => {
    if (!selectedVendor) return;

    setAddingVendorId(selectedVendor.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setAddingVendorId(null);
    setShowConfirmModal(false);
    setSelectedVendor(null);

    // Navigate back to event vendors tab
    navigate(`/customer/events/${eventId}?tab=vendors`);
  };

  // If planner-managed
  if (event.managementMode === 'planner-managed') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#16232A] mb-2">
            Vendor Selection Not Available
          </h2>
          <p className="text-lg text-[#16232A]/70 mb-6">
            Your Event Planner manages vendor selection for this event.
          </p>
          <Button onClick={() => navigate(`/customer/events/${eventId}`)} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/80 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Select Vendors for Your Event</h1>
          <p className="text-white/90">
            Vendors shown are based on your event type and selected services
          </p>
        </div>
      </div>

      {/* Event Context Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Pre-filtered for: {event.name}</p>
            <p className="text-sm text-blue-800">
              Showing vendors available for <strong>{event.category}</strong> events on <strong>{new Date(event.date).toLocaleDateString()}</strong> in <strong>{event.location}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#16232A] flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h3>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                Reset All Filters
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">Service</label>
              <select
                value={selectedServiceFilter}
                onChange={(e) => setSelectedServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Services</option>
                {event.services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">Price Range</label>
              <select
                value={priceRangeFilter}
                onChange={(e) => setPriceRangeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; $2,500)</option>
                <option value="mid">Mid-Range ($2,500 - $5,000)</option>
                <option value="premium">Premium ($5,000+)</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">Min Rating</label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="0">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.7">4.7+ Stars</option>
                <option value="4.9">4.9+ Stars</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Locations</option>
                <option value="manhattan">Manhattan</option>
                <option value="brooklyn">Brooklyn</option>
                <option value="queens">Queens</option>
                <option value="bronx">Bronx</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">Experience</label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="all">All Levels</option>
                <option value="entry">Entry (3-5 years)</option>
                <option value="mid">Mid-Level (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#16232A]/70">
          Showing <strong>{filteredVendors.length}</strong> vendor{filteredVendors.length !== 1 ? 's' : ''}
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Vendor Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredVendors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Vendor Image */}
                <div className="relative h-48 rounded-t-xl overflow-hidden">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Vendor Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#16232A] mb-1">{vendor.name}</h3>
                  <p className="text-sm text-[#16232A]/60 mb-3">{vendor.category}</p>

                  <div className="space-y-2 mb-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-[#16232A]">{vendor.rating}</span>
                      </div>
                      <span className="text-sm text-[#16232A]/60">({vendor.reviews} reviews)</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-[#16232A]/60">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.location}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-[#16232A]/60">Starting at</span>
                      <span className="font-bold text-[#FF5B04]">${vendor.startingPrice.toLocaleString()}</span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-sm text-[#16232A]/60">
                      <Sparkles className="h-4 w-4" />
                      <span>{vendor.experience} experience</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/customer/events/${eventId}/vendor-profile/${vendor.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                      onClick={() => handleAddVendor(vendor)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Event
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-lg text-[#16232A]/60 mb-6">
            {hasActiveFilters
              ? 'No vendors match your current filters. Try adjusting your criteria.'
              : 'No vendors are available for your event requirements.'}
          </p>
          {hasActiveFilters && (
            <Button onClick={resetFilters} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <X className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#16232A]">Add Vendor to Event</h3>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedVendor(null);
                }}
                className="text-[#16232A]/50 hover:text-[#16232A]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-2">
                    {selectedVendor.name} will be invited to place a bid for your event
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• The vendor will submit a customized proposal</li>
                    <li>• You can review and negotiate the bid</li>
                    <li>• Finalize only when you're satisfied</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedVendor(null);
                }}
                className="flex-1"
                disabled={addingVendorId === selectedVendor.id}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAddVendor}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                disabled={addingVendorId === selectedVendor.id}
              >
                {addingVendorId === selectedVendor.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirm & Invite
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};