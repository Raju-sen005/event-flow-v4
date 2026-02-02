import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Package,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  Shirt,
  Sparkles,
  Watch,
  Lamp,
  Grid3x3,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  itemCount: number;
  eventTypes: string[];
}

export const EventRentals: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock event data
  const eventName = "Sarah & John's Wedding";
  const eventType = "Wedding";
  const eventDate = "2026-06-15";

  // Categories based on event type
  const categories: Category[] = [
    {
      id: 'wedding-wear',
      name: 'Wedding Wear',
      icon: Shirt,
      description: 'Sherwanis, Lehengas, Bridal outfits',
      itemCount: 245,
      eventTypes: ['Wedding', 'Engagement'],
    },
    {
      id: 'formal-wear',
      name: 'Formal Wear',
      icon: Shirt,
      description: 'Suits, Blazers, Formal dresses',
      itemCount: 180,
      eventTypes: ['Corporate', 'Conference', 'Gala'],
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: Watch,
      description: 'Jewelry, Watches, Bags, Shoes',
      itemCount: 320,
      eventTypes: ['Wedding', 'Birthday', 'Corporate', 'Conference'],
    },
    {
      id: 'decor',
      name: 'Décor Items',
      icon: Lamp,
      description: 'Centerpieces, Backdrops, Lighting',
      itemCount: 150,
      eventTypes: ['Wedding', 'Birthday', 'Corporate'],
    },
    {
      id: 'other',
      name: 'Other Rentals',
      icon: Grid3x3,
      description: 'Miscellaneous rental items',
      itemCount: 95,
      eventTypes: ['Wedding', 'Birthday', 'Corporate', 'Conference'],
    },
  ];

  // Filter categories based on event type
  const relevantCategories = categories.filter((cat) =>
    cat.eventTypes.includes(eventType)
  );

  const filteredCategories = relevantCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/customer/events/${eventId}/rentals/category/${categoryId}`);
  };

  const handleBackToEvents = () => {
    navigate(`/customer/events/${eventId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={handleBackToEvents}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{eventName}</span>
              <span>•</span>
              <span>{new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#16232A]">
              Rental Services for Your Event
            </h1>
            <p className="text-gray-600 mt-1">
              Browse rental categories and find items for your {eventType.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">
              How Rental Services Work
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Select a category to browse available rental items</li>
              <li>• All rentals require a refundable deposit</li>
              <li>• Review rental terms and return policies before booking</li>
              <li>• Items must be returned by the agreed date to avoid penalties</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">
            No categories found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search query
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#FF5B04] hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-14 w-14 bg-[#FF5B04]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FF5B04] transition-colors">
                    <Icon className="h-7 w-7 text-[#FF5B04] group-hover:text-white transition-colors" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF5B04] transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-[#16232A] mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  {category.itemCount} items available
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-xl font-bold text-[#16232A]">
                {filteredCategories.reduce((sum, cat) => sum + cat.itemCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Grid3x3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-xl font-bold text-[#16232A]">
                {filteredCategories.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Event Type</p>
              <p className="text-xl font-bold text-[#16232A]">{eventType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
