import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { EventPickerModal } from '@/app/components/modals/EventPickerModal';
import {
  Search,
  Filter,
  MapPin,
  Star,
  DollarSign,
  X,
  CheckCircle2,
  ShoppingBag,
  Camera,
  Video,
  Utensils,
  Music,
  Sparkles,
  Eye,
  Plus
} from 'lucide-react';

// Types
type Vendor = {
  id: string;
  name: string;
  service: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  verified: boolean;
  imageUrl?: string;
  portfolio: number;
  experienceYears: number;
};

export const GlobalVendors: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showEventPicker, setShowEventPicker] = useState(false);

  // Mock vendors data
  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Elite Photography Studio',
      service: 'Photography',
      category: 'Photography',
      location: 'New York, NY',
      rating: 4.9,
      reviewCount: 156,
      priceRange: '$$$',
      verified: true,
      portfolio: 250,
      experienceYears: 8
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      service: 'Premium Catering Services',
      category: 'Catering',
      location: 'Boston, MA',
      rating: 4.8,
      reviewCount: 203,
      priceRange: '$$$$',
      verified: true,
      portfolio: 180,
      experienceYears: 12
    },
    {
      id: '3',
      name: 'DJ Beats Entertainment',
      service: 'DJ & Sound Services',
      category: 'Music',
      location: 'Miami, FL',
      rating: 4.7,
      reviewCount: 89,
      priceRange: '$$',
      verified: true,
      portfolio: 120,
      experienceYears: 6
    },
    {
      id: '4',
      name: 'Cinematic Wedding Films',
      service: 'Videography',
      category: 'Videography',
      location: 'Los Angeles, CA',
      rating: 5.0,
      reviewCount: 72,
      priceRange: '$$$',
      verified: true,
      portfolio: 95,
      experienceYears: 10
    },
    {
      id: '5',
      name: 'Elegant Event Decor',
      service: 'Decoration & Design',
      category: 'Decoration',
      location: 'Chicago, IL',
      rating: 4.6,
      reviewCount: 134,
      priceRange: '$$',
      verified: false,
      portfolio: 200,
      experienceYears: 7
    }
  ];

  // Filter vendors
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || vendor.priceRange === priceFilter;
    const matchesRating = ratingFilter === 'all' || vendor.rating >= parseFloat(ratingFilter);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(vendors.map(v => v.category)))];

  // Handle view profile
  const handleViewProfile = (vendorId: string) => {
    navigate(`/customer/vendors/${vendorId}`);
  };

  // Handle add to event
  const handleAddToEvent = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowEventPicker(true);
  };

  // Handle event selection
  const handleEventSelected = (eventId: string) => {
    // Navigate to vendor profile with event context
    navigate(`/customer/events/${eventId}/vendor-profile/${selectedVendor?.id}`);
    setShowEventPicker(false);
    setSelectedVendor(null);
  };

  // Get service icon
  const getServiceIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'photography':
        return Camera;
      case 'videography':
        return Video;
      case 'catering':
        return Utensils;
      case 'music':
        return Music;
      case 'decoration':
        return Sparkles;
      default:
        return ShoppingBag;
    }
  };

  // Active filters count
  const activeFiltersCount = [categoryFilter, priceFilter, ratingFilter].filter(f => f !== 'all').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-[#16232A] mb-2">Browse Vendors</h1>
        <p className="text-[#16232A]/70">
          Discover and connect with top-rated vendors for your events
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
          <input
            type="text"
            placeholder="Search vendors by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Prices</option>
            <option value="$">$ - Budget</option>
            <option value="$$">$$ - Moderate</option>
            <option value="$$$">$$$ - Premium</option>
            <option value="$$$$">$$$$ - Luxury</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setCategoryFilter('all');
                setPriceFilter('all');
                setRatingFilter('all');
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
            Showing <span className="font-semibold text-[#16232A]">{filteredVendors.length}</span> vendor{filteredVendors.length !== 1 ? 's' : ''}
          </p>
          {(searchQuery || activeFiltersCount > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPriceFilter('all');
                setRatingFilter('all');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => {
            const ServiceIcon = getServiceIcon(vendor.category);
            
            return (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Vendor Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#E4EEF0] flex items-center justify-center">
                      <ServiceIcon className="h-6 w-6 text-[#075056]" />
                    </div>
                    {vendor.verified && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#16232A] text-lg mb-1">{vendor.name}</h3>
                  <p className="text-sm text-[#16232A]/70 mb-3">{vendor.service}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-[#16232A]">{vendor.rating}</span>
                      <span className="text-[#16232A]/60">({vendor.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-[#16232A]">{vendor.priceRange}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-[#16232A]/60 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-[#16232A]/60">Portfolio</p>
                      <p className="font-bold text-[#16232A]">{vendor.portfolio}+</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-[#16232A]/60">Experience</p>
                      <p className="font-bold text-[#16232A]">{vendor.experienceYears} yrs</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewProfile(vendor.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View Profile
                    </button>
                    <button
                      onClick={() => handleAddToEvent(vendor)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Add to Event
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {searchQuery || activeFiltersCount > 0
              ? 'Try adjusting your search or filters'
              : 'No vendors available at the moment'}
          </p>
          {(searchQuery || activeFiltersCount > 0) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPriceFilter('all');
                setRatingFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Event Picker Modal */}
      <EventPickerModal
        isOpen={showEventPicker}
        onClose={() => {
          setShowEventPicker(false);
          setSelectedVendor(null);
        }}
        onSelectEvent={handleEventSelected}
        title="Select Event"
        description={`Add ${selectedVendor?.name} to which event?`}
        filterMode="self-managed"
        warningMessage="Only self-managed events are shown. Planner-managed events cannot add vendors directly."
      />
    </div>
  );
};