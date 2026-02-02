import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
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
  Check
} from 'lucide-react';

// Mock vendor type
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
  featured: boolean;
  experience: string;
  availability: boolean;
  services: string[];
};

export const EventVendorSelection: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Mock event data - In production, fetch from backend
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    category: 'Wedding',
    date: '2026-06-15',
    location: 'New York',
    managementMode: 'self-managed', // or 'planner-managed'
    services: ['Photographer', 'Videographer', 'Catering', 'DJ', 'Decor', 'Venue']
  };

  // If planner-managed, redirect or show message
  if (event.managementMode === 'planner-managed') {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#16232A] mb-2">
            Vendor Selection Not Available
          </h2>
          <p className="text-[#16232A]/70 mb-6">
            Vendor selection is handled by your Event Planner.
          </p>
          <Button onClick={() => navigate(`/customer/events/${eventId}`)}>
            Back to Event
          </Button>
        </div>
      </div>
    );
  }

  // Mock vendors - Filtered by event category and services
  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Elite Photography Studio',
      category: 'Photographer',
      rating: 4.9,
      reviews: 127,
      priceRange: '$$$',
      startingPrice: 3500,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      experience: '10+ years',
      availability: true,
      services: ['Photographer']
    },
    {
      id: '2',
      name: 'Dream Moments Photography',
      category: 'Photographer',
      rating: 4.7,
      reviews: 95,
      priceRange: '$$',
      startingPrice: 2500,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
      verified: true,
      featured: false,
      experience: '8+ years',
      availability: true,
      services: ['Photographer']
    },
    {
      id: '3',
      name: 'Cinematic Wedding Films',
      category: 'Videographer',
      rating: 4.8,
      reviews: 112,
      priceRange: '$$$',
      startingPrice: 4000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      experience: '12+ years',
      availability: true,
      services: ['Videographer']
    },
    {
      id: '4',
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      rating: 4.9,
      reviews: 145,
      priceRange: '$$$',
      startingPrice: 8000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      experience: '15+ years',
      availability: true,
      services: ['Catering']
    },
    {
      id: '5',
      name: 'DJ Beats Entertainment',
      category: 'DJ',
      rating: 4.7,
      reviews: 82,
      priceRange: '$$',
      startingPrice: 2000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=300&fit=crop',
      verified: true,
      featured: false,
      experience: '7+ years',
      availability: true,
      services: ['DJ']
    },
    {
      id: '6',
      name: 'Elegant Event Decor',
      category: 'Decor',
      rating: 4.8,
      reviews: 98,
      priceRange: '$$$',
      startingPrice: 5000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
      verified: true,
      featured: false,
      experience: '10+ years',
      availability: true,
      services: ['Decor']
    }
  ];

  // Filter vendors based on event requirements
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = selectedService === 'all' || vendor.category === selectedService;
    const matchesPrice = vendor.startingPrice >= priceRange[0] && vendor.startingPrice <= priceRange[1];
    const matchesRating = vendor.rating >= minRating;
    const matchesEventServices = event.services.includes(vendor.category);
    const matchesLocation = vendor.location.includes(event.location);
    
    return matchesSearch && matchesService && matchesPrice && matchesRating && matchesEventServices && matchesLocation;
  });

  // Handle add to event
  const handleAddToEvent = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowConfirmModal(true);
  };

  const confirmAddVendor = () => {
    // In production, send request to backend
    console.log('Adding vendor to event:', selectedVendor);
    setShowConfirmModal(false);
    // Show success message and navigate
    navigate(`/customer/events/${eventId}?tab=vendors`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}?tab=vendors`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/80 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Select Vendors for Your Event</h1>
          <p className="text-white/90 mb-4">
            Showing vendors based on your event type and selected services.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Event: {event.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Category: {event.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Location: {event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Applied Filters Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Auto-Filtered Results</p>
          <p className="text-sm text-blue-800 mt-1">
            Vendors are automatically filtered by your event category ({event.category}), 
            required services, location ({event.location}), and date availability. 
            These filters cannot be removed.
          </p>
        </div>
      </div>

      {/* Service Filter Tabs */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedService('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
              selectedService === 'all'
                ? 'bg-[#FF5B04] text-white'
                : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
            }`}
          >
            All Services
          </button>
          {event.services.map(service => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedService === service
                  ? 'bg-[#FF5B04] text-white'
                  : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Optional Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#16232A]/70 whitespace-nowrap">Min Rating:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value={0}>All Ratings</option>
              <option value={4.0}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#16232A]/70">
          Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                {vendor.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF5B04] text-white text-xs font-semibold rounded-full">
                    Featured
                  </div>
                )}
                {vendor.verified && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </div>
                )}
                {!vendor.availability && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">
                      Not Available
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-[#16232A] mb-1">{vendor.name}</h3>
                  <p className="text-sm font-medium text-[#FF5B04]">{vendor.category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#16232A]">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-[#16232A]/60">({vendor.reviews} reviews)</span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-[#16232A]/70">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#16232A]/70">
                    <DollarSign className="h-4 w-4 flex-shrink-0" />
                    <span>Starting from ${vendor.startingPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/customer/events/${eventId}/vendors/${vendor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleAddToEvent(vendor)}
                    disabled={!vendor.availability}
                    className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Event
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-[#16232A]/60 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedService('all');
            setMinRating(0);
          }}>
            Clear Filters
          </Button>
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
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">Add Vendor to Event</h3>
            
            <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF5B04] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#16232A]">{selectedVendor.name}</h4>
                  <p className="text-sm text-[#16232A]/70">{selectedVendor.category}</p>
                </div>
              </div>
              
              <div className="text-sm text-[#16232A]/70 space-y-1">
                <p><strong>For Event:</strong> {event.name}</p>
                <p><strong>Starting Price:</strong> ${selectedVendor.startingPrice.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Important</p>
                <p className="text-sm text-amber-800 mt-1">
                  This vendor will be invited to place a bid for your event. 
                  You can review and negotiate their offer before finalizing.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAddVendor}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};