import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Users,
  Camera,
  Utensils,
  Music,
  Flower2,
  Cake,
  Video,
  Palette,
  Car
} from 'lucide-react';
import { motion } from 'motion/react';

export const Vendors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { name: 'All', value: 'all', icon: ShoppingBag, count: 156 },
    { name: 'Catering', value: 'catering', icon: Utensils, count: 32 },
    { name: 'Photography', value: 'photography', icon: Camera, count: 28 },
    { name: 'Videography', value: 'videography', icon: Video, count: 24 },
    { name: 'Music/DJ', value: 'music', icon: Music, count: 18 },
    { name: 'Decoration', value: 'decoration', icon: Flower2, count: 22 },
    { name: 'Cake/Desserts', value: 'cake', icon: Cake, count: 15 },
    { name: 'Makeup/Hair', value: 'makeup', icon: Palette, count: 12 },
    { name: 'Transportation', value: 'transportation', icon: Car, count: 5 },
  ];

  const vendors = [
    {
      id: 1,
      name: 'Elite Catering Services',
      category: 'catering',
      rating: 4.9,
      reviews: 256,
      location: 'New York, NY',
      priceRange: '$$$',
      image: 'EC',
      verified: true,
      responseTime: '< 2 hours',
      completedEvents: 500
    },
    {
      id: 2,
      name: 'Dream Photography Studio',
      category: 'photography',
      rating: 4.8,
      reviews: 189,
      location: 'Los Angeles, CA',
      priceRange: '$$',
      image: 'DP',
      verified: true,
      responseTime: '< 4 hours',
      completedEvents: 350
    },
    {
      id: 3,
      name: 'Sound & Lights Pro',
      category: 'music',
      rating: 4.7,
      reviews: 145,
      location: 'Chicago, IL',
      priceRange: '$$',
      image: 'SL',
      verified: true,
      responseTime: '< 3 hours',
      completedEvents: 280
    },
    {
      id: 4,
      name: 'Floral Designs Co',
      category: 'decoration',
      rating: 4.9,
      reviews: 203,
      location: 'Miami, FL',
      priceRange: '$$$',
      image: 'FD',
      verified: true,
      responseTime: '< 2 hours',
      completedEvents: 420
    },
    {
      id: 5,
      name: 'Sweet Moments Bakery',
      category: 'cake',
      rating: 4.8,
      reviews: 178,
      location: 'San Francisco, CA',
      priceRange: '$$',
      image: 'SM',
      verified: false,
      responseTime: '< 5 hours',
      completedEvents: 190
    },
    {
      id: 6,
      name: 'Cinematic Weddings',
      category: 'videography',
      rating: 5.0,
      reviews: 98,
      location: 'Austin, TX',
      priceRange: '$$$',
      image: 'CW',
      verified: true,
      responseTime: '< 1 hour',
      completedEvents: 150
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#16232A]">Vendor Marketplace</h1>
          <p className="text-[#16232A]/70 mt-1">Find and hire the best vendors for your event</p>
        </div>
        <Link to="/customer/vendors/post-requirement">
          <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Post Requirement
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors by name, service, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="font-semibold text-[#16232A] mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === category.value
                  ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <category.icon className={`h-6 w-6 mb-2 ${
                selectedCategory === category.value ? 'text-[#FF5B04]' : 'text-gray-400'
              }`} />
              <p className="font-medium text-[#16232A] text-sm">{category.name}</p>
              <p className="text-xs text-[#16232A]/60 mt-1">{category.count} vendors</p>
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            {/* Vendor Avatar */}
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 bg-[#FF5B04] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">{vendor.image}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#16232A]">{vendor.name}</h3>
                    <p className="text-sm text-[#16232A]/60 capitalize">{vendor.category}</p>
                  </div>
                  {vendor.verified && (
                    <div className="bg-blue-100 rounded-full p-1">
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rating & Location */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-[#16232A]">{vendor.rating}</span>
                <span className="text-sm text-[#16232A]/60">({vendor.reviews})</span>
              </div>
              <span className="text-sm text-[#16232A]/60">{vendor.priceRange}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                <MapPin className="h-4 w-4" />
                {vendor.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                <Users className="h-4 w-4" />
                {vendor.completedEvents} events completed
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-green-700 font-medium">
                Avg. Response: {vendor.responseTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link to={`/customer/vendors/${vendor.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Button className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                Contact
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-[#16232A]/60 mb-6">
            Try adjusting your search or browse all categories
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};