import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ShoppingBag,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Plus,
  Camera,
  Music,
  Utensils,
  Flower,
  Car,
  Palette,
  Mic,
  Cake
} from 'lucide-react';
import { motion } from 'motion/react';

export const VendorMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Vendors', icon: ShoppingBag, count: 125 },
    { id: 'photography', name: 'Photography', icon: Camera, count: 24 },
    { id: 'catering', name: 'Catering', icon: Utensils, count: 18 },
    { id: 'music', name: 'Music & DJ', icon: Music, count: 15 },
    { id: 'decoration', name: 'Decoration', icon: Flower, count: 22 },
    { id: 'transportation', name: 'Transportation', icon: Car, count: 12 },
    { id: 'makeup', name: 'Makeup & Hair', icon: Palette, count: 16 },
    { id: 'entertainment', name: 'Entertainment', icon: Mic, count: 10 },
    { id: 'bakery', name: 'Bakery & Cakes', icon: Cake, count: 8 },
  ];

  const vendors = [
    {
      id: 1,
      name: 'Elite Photography Studio',
      category: 'photography',
      rating: 4.9,
      reviews: 127,
      priceRange: '$$$',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      description: 'Award-winning wedding photography with 10+ years experience'
    },
    {
      id: 2,
      name: 'Gourmet Catering Co.',
      category: 'catering',
      rating: 4.8,
      reviews: 95,
      priceRange: '$$',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      verified: true,
      featured: false,
      description: 'Premium catering services for all occasions'
    },
    {
      id: 3,
      name: 'DJ Beats Entertainment',
      category: 'music',
      rating: 4.7,
      reviews: 82,
      priceRange: '$$',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      description: 'Professional DJ services with extensive music library'
    },
    {
      id: 4,
      name: 'Floral Dreams Design',
      category: 'decoration',
      rating: 4.9,
      reviews: 114,
      priceRange: '$$$',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
      verified: true,
      featured: false,
      description: 'Stunning floral arrangements and event decoration'
    },
    {
      id: 5,
      name: 'Luxury Transport Services',
      category: 'transportation',
      rating: 4.6,
      reviews: 68,
      priceRange: '$$$',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      verified: false,
      featured: false,
      description: 'Premium transportation for special occasions'
    },
    {
      id: 6,
      name: 'Glamour Beauty Studio',
      category: 'makeup',
      rating: 4.8,
      reviews: 91,
      priceRange: '$$',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
      verified: true,
      featured: true,
      description: 'Professional makeup and hair styling services'
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || vendor.priceRange === priceFilter;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#16232A]">Vendor Marketplace</h1>
          <p className="text-[#16232A]/70 mt-1">Find and connect with top-rated vendors</p>
        </div>
        <Link to="/customer/vendors/post-requirement">
          <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Post Requirement
          </Button>
        </Link>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#FF5B04] text-white'
                  : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="font-medium">{category.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id ? 'bg-white/20' : 'bg-white'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Prices</option>
              <option value="$">$ - Budget</option>
              <option value="$$">$$ - Moderate</option>
              <option value="$$$">$$$ - Premium</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#16232A]/70">
          Showing {filteredVendors.length} vendors
        </p>
      </div>

      {/* Vendors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {vendor.featured && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF5B04] text-white text-xs font-semibold rounded-full">
                  Featured
                </div>
              )}
              {vendor.verified && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  Verified
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#16232A] mb-1">{vendor.name}</h3>
              <p className="text-sm text-[#16232A]/60 mb-3 line-clamp-2">{vendor.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-[#16232A]">{vendor.rating}</span>
                </div>
                <span className="text-sm text-[#16232A]/60">({vendor.reviews} reviews)</span>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-sm text-[#16232A]/70 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {vendor.priceRange}
                </div>
              </div>

              {/* Actions */}
              <Link to={`/customer/vendors/${vendor.id}`}>
                <Button className="w-full bg-[#16232A] hover:bg-[#16232A]/90 text-white">
                  View Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-[#16232A]/60 mb-6">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};
