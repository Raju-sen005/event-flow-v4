import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { LoginGatingModal } from '../components/LoginGatingModal';
import { 
  Calendar, 
  Search, 
  MapPin, 
  Star, 
  BadgeCheck, 
  ArrowLeft,
  Camera,
  Utensils,
  Music,
  Sparkles,
  Home as HomeIcon,
  Palette,
  Heart,
  MessageCircle,
  Filter,
  SlidersHorizontal,
  Briefcase,
  Award,
  DollarSign,
  CheckCircle,
  Clock,
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requirements = location.state?.requirements || {};
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // All vendors data
  const allVendors = [
    {
      id: 1,
      name: 'Elite Catering Co.',
      category: 'Catering',
      rating: 4.9,
      reviews: 234,
      location: 'New York, NY',
      price: '$$$',
      priceValue: 3,
      experience: '12+ years',
      experienceValue: 12,
      image: 'https://images.unsplash.com/photo-1732259495388-af40b972c311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc2NjEzODkyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Weddings', 'Corporate', 'Fine Dining'],
      jobsCompleted: 450,
      responseTime: '2 hours',
      portfolio: ['Event Planning', 'Gourmet Cuisine', 'Custom Menus']
    },
    {
      id: 2,
      name: 'Moments Photography Studio',
      category: 'Photography',
      rating: 5.0,
      reviews: 189,
      location: 'Los Angeles, CA',
      price: '$$',
      priceValue: 2,
      experience: '8+ years',
      experienceValue: 8,
      image: 'https://images.unsplash.com/photo-1643968612613-fd411aecd1fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmF8ZW58MXx8fHwxNzY2MTU4NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Weddings', 'Portraits', 'Events'],
      jobsCompleted: 320,
      responseTime: '1 hour',
      portfolio: ['Wedding Photography', 'Portrait Sessions', 'Event Coverage']
    },
    {
      id: 3,
      name: 'Bloom & Design',
      category: 'Decoration',
      rating: 4.8,
      reviews: 156,
      location: 'Chicago, IL',
      price: '$$',
      priceValue: 2,
      experience: '10+ years',
      experienceValue: 10,
      image: 'https://images.unsplash.com/photo-1600965876572-9958c342bf52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRlY29yYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc2NjI0NzQzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Floral', 'Luxury', 'Custom'],
      jobsCompleted: 278,
      responseTime: '3 hours',
      portfolio: ['Floral Arrangements', 'Event Styling', 'Custom Decor']
    },
    {
      id: 4,
      name: 'DJ MixMaster Pro',
      category: 'DJ & Sound',
      rating: 4.9,
      reviews: 312,
      location: 'Miami, FL',
      price: '$$',
      priceValue: 2,
      experience: '15+ years',
      experienceValue: 15,
      image: 'https://images.unsplash.com/photo-1620704075906-27bfa0d54f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG11c2ljJTIwZXZlbnR8ZW58MXx8fHwxNzY2MjEyODIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Weddings', 'Corporate', 'Parties'],
      jobsCompleted: 520,
      responseTime: '2 hours',
      portfolio: ['DJ Services', 'Sound Systems', 'Event Entertainment']
    },
    {
      id: 5,
      name: 'Grand Hall Venues',
      category: 'Venue',
      rating: 4.7,
      reviews: 98,
      location: 'San Francisco, CA',
      price: '$$$',
      priceValue: 3,
      experience: '20+ years',
      experienceValue: 20,
      image: 'https://images.unsplash.com/photo-1759954644796-0ed43f06715b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBsYW5uaW5nJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2NjI0NzQzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Weddings', 'Corporate', '500+ capacity'],
      jobsCompleted: 185,
      responseTime: '4 hours',
      portfolio: ['Event Spaces', 'Banquet Halls', 'Conference Rooms']
    },
    {
      id: 6,
      name: 'Glamour Beauty Studio',
      category: 'Makeup & Hair',
      rating: 5.0,
      reviews: 267,
      location: 'New York, NY',
      price: '$$',
      priceValue: 2,
      experience: '6+ years',
      experienceValue: 6,
      image: 'https://images.unsplash.com/photo-1698181842119-a5283dea1440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzY2MjQ3NDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Bridal', 'Airbrush', 'On-site'],
      jobsCompleted: 402,
      responseTime: '1 hour',
      portfolio: ['Bridal Makeup', 'Hair Styling', 'Special Effects']
    },
    {
      id: 7,
      name: 'Perfect Day Planners',
      category: 'Event Planner',
      rating: 4.9,
      reviews: 145,
      location: 'Austin, TX',
      price: '$$$',
      priceValue: 3,
      experience: '11+ years',
      experienceValue: 11,
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjE4MjYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Full Service', 'Destination', 'Luxury'],
      jobsCompleted: 267,
      responseTime: '2 hours',
      portfolio: ['Full Planning', 'Day-of Coordination', 'Destination Events']
    },
    {
      id: 8,
      name: 'Cinema Moments Video',
      category: 'Videography',
      rating: 4.8,
      reviews: 178,
      location: 'Seattle, WA',
      price: '$$',
      priceValue: 2,
      experience: '9+ years',
      experienceValue: 9,
      image: 'https://images.unsplash.com/photo-1643968612613-fd411aecd1fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmF8ZW58MXx8fHwxNzY2MTU4NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Cinematic', '4K', 'Drone'],
      jobsCompleted: 298,
      responseTime: '3 hours',
      portfolio: ['Cinematic Videos', '4K Production', 'Drone Footage']
    },
    {
      id: 9,
      name: 'Gourmet Delights Catering',
      category: 'Catering',
      rating: 4.7,
      reviews: 143,
      location: 'Boston, MA',
      price: '$$',
      priceValue: 2,
      experience: '14+ years',
      experienceValue: 14,
      image: 'https://images.unsplash.com/photo-1732259495388-af40b972c311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc2NjEzODkyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Organic', 'International', 'Buffet'],
      jobsCompleted: 356,
      responseTime: '2 hours',
      portfolio: ['Organic Cuisine', 'International Menu', 'Buffet Service']
    },
    {
      id: 10,
      name: 'Luxe Event Spaces',
      category: 'Venue',
      rating: 4.9,
      reviews: 87,
      location: 'Los Angeles, CA',
      price: '$$$',
      priceValue: 3,
      experience: '18+ years',
      experienceValue: 18,
      image: 'https://images.unsplash.com/photo-1759954644796-0ed43f06715b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBsYW5uaW5nJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2NjI0NzQzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Modern', 'Rooftop', '300+ capacity'],
      jobsCompleted: 156,
      responseTime: '5 hours',
      portfolio: ['Modern Venues', 'Rooftop Spaces', 'Premium Locations']
    },
    {
      id: 11,
      name: 'Artistic Lens Photography',
      category: 'Photography',
      rating: 4.8,
      reviews: 201,
      location: 'Denver, CO',
      price: '$',
      priceValue: 1,
      experience: '5+ years',
      experienceValue: 5,
      image: 'https://images.unsplash.com/photo-1643968612613-fd411aecd1fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmF8ZW58MXx8fHwxNzY2MTU4NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Affordable', 'Creative', 'Quick Turnaround'],
      jobsCompleted: 289,
      responseTime: '1 hour',
      portfolio: ['Creative Photography', 'Affordable Packages', 'Fast Delivery']
    },
    {
      id: 12,
      name: 'Royal Décor Designs',
      category: 'Decoration',
      rating: 5.0,
      reviews: 92,
      location: 'Nashville, TN',
      price: '$$$',
      priceValue: 3,
      experience: '16+ years',
      experienceValue: 16,
      image: 'https://images.unsplash.com/photo-1600965876572-9958c342bf52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRlY29yYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc2NjI0NzQzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
      tags: ['Premium', 'Bespoke', 'Themed Events'],
      jobsCompleted: 167,
      responseTime: '4 hours',
      portfolio: ['Premium Decor', 'Bespoke Design', 'Themed Events']
    }
  ];

  const categoryMap: { [key: string]: string } = {
    'catering': 'Catering',
    'photography': 'Photography',
    'decoration': 'Decoration',
    'dj-sound': 'DJ & Sound',
    'venue': 'Venue',
    'makeup': 'Makeup & Hair',
    'planner': 'Event Planner',
    'videography': 'Videography'
  };

  const handleVendorAction = () => {
    setShowLoginModal(true);
  };

  const clearFilters = () => {
    setPriceFilter('');
    setRatingFilter('');
    setExperienceFilter('');
  };

  // Filter vendors based on requirements and filters
  const filteredVendors = allVendors.filter(vendor => {
    // Category filter from requirements
    if (requirements.serviceCategory) {
      const selectedCategory = categoryMap[requirements.serviceCategory];
      if (vendor.category !== selectedCategory) {
        return false;
      }
    }

    // Price filter
    if (priceFilter) {
      if (priceFilter === '$' && vendor.priceValue !== 1) return false;
      if (priceFilter === '$$' && vendor.priceValue !== 2) return false;
      if (priceFilter === '$$$' && vendor.priceValue !== 3) return false;
    }

    // Rating filter
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      if (vendor.rating < minRating) return false;
    }

    // Experience filter
    if (experienceFilter) {
      if (experienceFilter === '5+' && vendor.experienceValue < 5) return false;
      if (experienceFilter === '10+' && vendor.experienceValue < 10) return false;
      if (experienceFilter === '15+' && vendor.experienceValue < 15) return false;
    }

    return true;
  });

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'experience':
        return b.experienceValue - a.experienceValue;
      case 'price-low':
        return a.priceValue - b.priceValue;
      case 'price-high':
        return b.priceValue - a.priceValue;
      default:
        return 0; // relevance
    }
  });

  return (
    <div className="min-h-screen bg-[#E4EEF0]/30">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 bg-[#FF5B04] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#16232A]">EventFlow</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-[#16232A] font-medium hover:bg-gray-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        {/* Back Button & Summary */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-[#16232A] hover:bg-white mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>

          {requirements.serviceCategory && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-[#16232A] mb-4">Your Search Criteria</h2>
              <div className="flex flex-wrap gap-3">
                {requirements.eventType && (
                  <div className="px-4 py-2 bg-[#E4EEF0] rounded-lg">
                    <span className="text-sm font-semibold text-[#16232A]">
                      Event: {requirements.eventType}
                    </span>
                  </div>
                )}
                {requirements.serviceCategory && (
                  <div className="px-4 py-2 bg-[#FF5B04]/10 rounded-lg">
                    <span className="text-sm font-semibold text-[#FF5B04]">
                      Service: {categoryMap[requirements.serviceCategory]}
                    </span>
                  </div>
                )}
                {requirements.location && (
                  <div className="px-4 py-2 bg-[#E4EEF0] rounded-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#16232A]" />
                    <span className="text-sm font-semibold text-[#16232A]">
                      {requirements.location}
                    </span>
                  </div>
                )}
                {requirements.budget && (
                  <div className="px-4 py-2 bg-[#E4EEF0] rounded-lg flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#16232A]" />
                    <span className="text-sm font-semibold text-[#16232A]">
                      Budget: {requirements.budget}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Header & Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">
                {requirements.serviceCategory 
                  ? `${categoryMap[requirements.serviceCategory]} Vendors` 
                  : 'All Vendors'}
              </h1>
              <p className="text-lg text-gray-600">
                {sortedVendors.length} professional{sortedVendors.length !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-2 border-gray-300 text-[#16232A] hover:border-[#FF5B04] hover:bg-[#FF5B04]/5 font-semibold h-11"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 pl-4 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent text-[#16232A] font-semibold appearance-none cursor-pointer"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="experience">Most Experience</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm"
            >
              <div className="grid md:grid-cols-4 gap-5">
                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#16232A] mb-2.5 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#FF5B04]" />
                    Price Range
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full h-11 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
                  >
                    <option value="">All prices</option>
                    <option value="$">$ - Budget friendly</option>
                    <option value="$$">$$ - Mid-range</option>
                    <option value="$$$">$$$ - Premium</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#16232A] mb-2.5 flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#FF5B04]" />
                    Minimum Rating
                  </label>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full h-11 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
                  >
                    <option value="">All ratings</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.7">4.7+ stars</option>
                    <option value="4.9">4.9+ stars</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#16232A] mb-2.5 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#FF5B04]" />
                    Experience
                  </label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full h-11 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
                  >
                    <option value="">All experience</option>
                    <option value="5+">5+ years</option>
                    <option value="10+">10+ years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full h-11 border-2 border-gray-300 text-[#16232A] hover:bg-gray-50 font-medium"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Vendor Cards Grid */}
        {sortedVendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#FF5B04] hover:shadow-2xl transition-all duration-300"
              >
                {/* Vendor Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                      <BadgeCheck className="h-4 w-4 text-[#075056]" />
                      <span className="text-xs font-bold text-[#075056]">Verified</span>
                    </div>
                  )}
                  <button
                    onClick={handleVendorAction}
                    className="absolute top-3 left-3 h-9 w-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4 text-[#16232A]" />
                  </button>
                </div>

                {/* Vendor Info */}
                <div className="p-5">
                  {/* Name & Category */}
                  <div className="mb-3">
                    <h3 className="font-bold text-[#16232A] mb-1 line-clamp-1 text-lg">{vendor.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{vendor.category}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-[#FF5B04] fill-[#FF5B04]" />
                      <span className="font-bold text-[#16232A]">{vendor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{vendor.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{vendor.experience}</span>
                      </div>
                      <span className="font-bold text-[#075056] text-base">{vendor.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>{vendor.jobsCompleted} jobs</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">{vendor.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#E4EEF0] text-xs font-semibold text-[#16232A] rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleVendorAction}
                      className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold h-10 shadow-md hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={handleVendorAction}
                      variant="outline"
                      className="h-10 w-10 p-0 border-2 border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // No Results
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-gray-100 rounded-full mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#16232A] mb-3">No vendors found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any vendors matching your criteria. Try adjusting your filters or search again.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-2 border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white font-semibold"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold"
              >
                New Search
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Login Gating Modal */}
      <LoginGatingModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
};