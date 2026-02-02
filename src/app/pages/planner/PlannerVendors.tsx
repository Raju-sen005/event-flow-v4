import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Plus,
  Search,
  Filter,
  Users,
  Star,
  MapPin,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerVendors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const vendors = [
    {
      id: '1',
      name: 'Elite Photography Studio',
      category: 'Photography',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      projects: 45,
      verified: true,
      phone: '+91 98765 43210',
      email: 'contact@elitephoto.com',
      assignedEvents: 3
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      location: 'Delhi',
      rating: 4.9,
      projects: 120,
      verified: true,
      phone: '+91 98765 43211',
      email: 'info@gourmetcatering.com',
      assignedEvents: 5
    },
    {
      id: '3',
      name: 'Decor Dreams',
      category: 'Decoration',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      projects: 78,
      verified: true,
      phone: '+91 98765 43212',
      email: 'contact@decordreams.com',
      assignedEvents: 2
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || vendor.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Vendors</h1>
          <p className="text-[#16232A]/70">Manage your vendor network</p>
        </div>
        <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            >
              <option value="all">All Categories</option>
              <option value="photography">Photography</option>
              <option value="catering">Catering</option>
              <option value="decoration">Decoration</option>
              <option value="venue">Venue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-[#16232A]">{vendor.name}</h3>
                  {vendor.verified && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                  {vendor.category}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{vendor.rating}</span>
                <span className="text-gray-600">({vendor.projects} projects)</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg mb-4">
              <p className="text-xs text-gray-600 mb-1">Assigned Events</p>
              <p className="text-lg font-bold text-[#075056]">{vendor.assignedEvents}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
