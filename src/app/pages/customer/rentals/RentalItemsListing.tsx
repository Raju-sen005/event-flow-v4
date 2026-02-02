import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Package,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  X,
  MapPin,
  IndianRupee,
  Eye,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface RentalItem {
  id: string;
  name: string;
  image: string;
  rentalPrice: number;
  priceUnit: 'per_day' | 'per_3_days' | 'per_week';
  deposit: number;
  availableSizes: string[];
  available: boolean;
  vendorName: string;
  vendorId: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export const RentalItemsListing: React.FC = () => {
  const { eventId, category } = useParams<{ eventId: string; category: string }>();
  const navigate = useNavigate();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const categoryName = category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Rental Items';

  const rentalItems: RentalItem[] = [
    {
      id: 'item-001',
      name: 'Royal Blue Sherwani with Embroidery',
      image: 'https://images.unsplash.com/photo-1583846112910-c5143e91f6ec?w=400',
      rentalPrice: 2500,
      priceUnit: 'per_3_days',
      deposit: 5000,
      availableSizes: ['S', 'M', 'L', 'XL'],
      available: true,
      vendorName: 'Elegant Rentals Co.',
      vendorId: 'v-001',
      location: 'Mumbai',
      rating: 4.8,
      reviewCount: 245,
    },
    {
      id: 'item-002',
      name: 'Designer Lehenga - Red & Gold',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      rentalPrice: 3500,
      priceUnit: 'per_3_days',
      deposit: 7000,
      availableSizes: ['XS', 'S', 'M', 'L'],
      available: true,
      vendorName: 'Bridal Dreams Rentals',
      vendorId: 'v-002',
      location: 'Mumbai',
      rating: 4.9,
      reviewCount: 312,
    },
    {
      id: 'item-003',
      name: 'Classic Black Tuxedo',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
      rentalPrice: 1800,
      priceUnit: 'per_day',
      deposit: 3000,
      availableSizes: ['M', 'L', 'XL', 'XXL'],
      available: false,
      vendorName: 'Premium Suits Hub',
      vendorId: 'v-003',
      location: 'Delhi',
      rating: 4.7,
      reviewCount: 189,
    },
    {
      id: 'item-004',
      name: 'Traditional Kurta Set - Cream',
      image: 'https://images.unsplash.com/photo-1622548171208-c6c7f8b26f9c?w=400',
      rentalPrice: 800,
      priceUnit: 'per_day',
      deposit: 1500,
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      available: true,
      vendorName: 'Ethnic Wear Rentals',
      vendorId: 'v-004',
      location: 'Mumbai',
      rating: 4.6,
      reviewCount: 156,
    },
    {
      id: 'item-005',
      name: 'Embellished Wedding Sherwani - Gold',
      image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400',
      rentalPrice: 3200,
      priceUnit: 'per_3_days',
      deposit: 6500,
      availableSizes: ['M', 'L', 'XL'],
      available: true,
      vendorName: 'Royal Wedding Attire',
      vendorId: 'v-005',
      location: 'Bangalore',
      rating: 4.9,
      reviewCount: 278,
    },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Pune'];

  // Filter logic
  const filteredItems = rentalItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => item.availableSizes.includes(size));

    const matchesPrice =
      item.rentalPrice >= priceRange[0] && item.rentalPrice <= priceRange[1];

    const matchesLocation =
      selectedLocation === 'all' || item.location === selectedLocation;

    const matchesAvailability = !availableOnly || item.available;

    return matchesSearch && matchesSize && matchesPrice && matchesLocation && matchesAvailability;
  });

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setPriceRange([0, 10000]);
    setSelectedLocation('all');
    setAvailableOnly(false);
    setSearchQuery('');
  };

  const handleViewItem = (itemId: string) => {
    navigate(`/customer/events/${eventId}/rentals/item/${itemId}`);
  };

  const handleRentItem = (itemId: string) => {
    navigate(`/customer/events/${eventId}/rentals/item/${itemId}/book`);
  };

  const getPriceUnit = (unit: string) => {
    switch (unit) {
      case 'per_day':
        return '/day';
      case 'per_3_days':
        return '/3 days';
      case 'per_week':
        return '/week';
      default:
        return '';
    }
  };

  const hasActiveFilters =
    selectedSizes.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 10000 ||
    selectedLocation !== 'all' ||
    availableOnly ||
    searchQuery;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}/rentals`)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{eventName}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#16232A]">{categoryName}</h1>
            <p className="text-gray-600 mt-1">
              {filteredItems.length} items available for rent
            </p>
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="h-5 w-5 bg-[#FF5B04] text-white text-xs rounded-full flex items-center justify-center">
                !
              </span>
            )}
          </Button>
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
            placeholder="Search rental items..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#16232A]">Filters</h3>
                {hasActiveFilters && (
                  <Button onClick={handleResetFilters} variant="ghost" size="sm">
                    Reset All
                  </Button>
                )}
              </div>

              {/* Available Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="h-4 w-4 text-[#FF5B04] border-gray-300 rounded focus:ring-[#FF5B04]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show available items only
                  </span>
                </label>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSizes.includes(size)
                          ? 'border-[#FF5B04] bg-[#FF5B04]/10 text-[#FF5B04] font-medium'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5B04]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {locations.slice(1).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Info */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-600">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          </p>
          <button
            onClick={handleResetFilters}
            className="text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">
            No items match your filters
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to find more items
          </p>
          <Button onClick={handleResetFilters} variant="outline">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Item Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-semibold">Currently Unavailable</p>
                    </div>
                  </div>
                )}
                {item.available && (
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Available
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="p-5">
                <h3 className="font-semibold text-[#16232A] mb-2 line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{item.vendorName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    ⭐ {item.rating}
                  </span>
                  <span>•</span>
                  <span>{item.reviewCount} reviews</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-baseline gap-1 mb-1">
                    <IndianRupee className="h-4 w-4 text-[#16232A]" />
                    <span className="text-2xl font-bold text-[#16232A]">
                      {item.rentalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getPriceUnit(item.priceUnit)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Deposit: ₹{item.deposit.toLocaleString()} (refundable)
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewItem(item.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleRentItem(item.id)}
                    disabled={!item.available}
                    className={`flex-1 ${
                      item.available
                        ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Rent
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
