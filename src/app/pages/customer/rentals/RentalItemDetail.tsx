import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  MapPin,
  Package,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  X as XIcon,
  ShoppingCart,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export const RentalItemDetail: React.FC = () => {
  const { eventId, itemId } = useParams<{ eventId: string; itemId: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const item = {
    id: itemId,
    name: 'Royal Blue Sherwani with Embroidery',
    images: [
      'https://images.unsplash.com/photo-1583846112910-c5143e91f6ec?w=800',
      'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800',
      'https://images.unsplash.com/photo-1622548171208-c6c7f8b26f9c?w=800',
    ],
    description:
      'Premium royal blue sherwani featuring intricate gold embroidery work. Perfect for wedding ceremonies and special occasions. Made from high-quality fabric with traditional craftsmanship.',
    rentalPrice: 2500,
    priceUnit: 'per_3_days',
    deposit: 5000,
    availableSizes: ['S', 'M', 'L', 'XL'],
    available: true,
    maxDuration: 7,
    vendor: {
      id: 'v-001',
      name: 'Elegant Rentals Co.',
      location: 'Andheri, Mumbai',
      rating: 4.8,
      reviewCount: 245,
    },
    policies: {
      cancellation: '100% refund if canceled 7+ days before rental start date. 50% refund if canceled 3-6 days before. No refund within 3 days of rental start.',
      lateReturn: '₹500 per day penalty for late returns. Items must be returned by 6 PM on the return date.',
      damage: 'Minor damages will be deducted from deposit. Major damages may require additional payment beyond deposit amount.',
      loss: 'Full item value will be charged in case of loss. Deposit will be forfeited and additional charges may apply.',
    },
    features: [
      'Premium quality fabric',
      'Professional dry cleaning included',
      'Traditional embroidery work',
      'Matching accessories available',
      'Free alterations for fit',
    ],
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleRentItem = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    navigate(`/customer/events/${eventId}/rentals/item/${itemId}/book`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{eventName}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={item.images[currentImageIndex]}
              alt={item.name}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {item.images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
              </>
            )}

            {/* Availability Badge */}
            {item.available ? (
              <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg">
                Available
              </div>
            ) : (
              <div className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg">
                Unavailable
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {item.images.length > 1 && (
            <div className="flex gap-3">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-[#FF5B04] scale-95'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          {/* Title & Vendor */}
          <div>
            <h1 className="text-3xl font-bold text-[#16232A] mb-3">
              {item.name}
            </h1>
            <div className="flex items-center gap-3 text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{item.vendor.name}</span>
              <span>•</span>
              <span>{item.vendor.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{item.vendor.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({item.vendor.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#E4EEF0] rounded-xl p-6">
            <div className="flex items-baseline gap-2 mb-3">
              <IndianRupee className="h-6 w-6 text-[#16232A]" />
              <span className="text-4xl font-bold text-[#16232A]">
                {item.rentalPrice.toLocaleString()}
              </span>
              <span className="text-lg text-gray-600">/3 days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-[#075056]" />
              <span className="text-gray-700">
                Refundable Deposit: ₹{item.deposit.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Clock className="h-4 w-4 text-[#075056]" />
              <span className="text-gray-700">
                Maximum rental duration: {item.maxDuration} days
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block font-semibold text-[#16232A] mb-3">
              Select Size *
            </label>
            <div className="flex gap-3">
              {item.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 w-12 rounded-lg border-2 font-semibold transition-all ${
                    selectedSize === size
                      ? 'border-[#FF5B04] bg-[#FF5B04]/10 text-[#FF5B04] scale-95'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-[#16232A] mb-3">
              What's Included
            </h3>
            <div className="space-y-2">
              {item.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-[#16232A] mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Policies Link */}
          <button
            onClick={() => setShowPoliciesModal(true)}
            className="text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium text-sm underline"
          >
            View Rental Policies & Terms
          </button>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={handleRentItem}
              disabled={!item.available || !selectedSize}
              className={`flex-1 h-12 ${
                item.available && selectedSize
                  ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {!item.available
                ? 'Currently Unavailable'
                : !selectedSize
                ? 'Select Size to Rent'
                : 'Rent This Item'}
            </Button>
          </div>

          {!item.available && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">
                    Item Currently Unavailable
                  </p>
                  <p className="text-sm text-amber-800">
                    This item is currently rented out. Please check back later or browse similar items.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Policies Modal */}
      <AnimatePresence>
        {showPoliciesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#16232A]">
                    Rental Policies & Terms
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Please read these carefully before renting
                  </p>
                </div>
                <button
                  onClick={() => setShowPoliciesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Cancellation Policy
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {item.policies.cancellation}
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Late Return Policy
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {item.policies.lateReturn}
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Damage Policy
                  </h3>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    {item.policies.damage}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <XIcon className="h-5 w-5" />
                    Loss Policy
                  </h3>
                  <p className="text-sm text-red-800 leading-relaxed">
                    {item.policies.loss}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200">
                <Button
                  onClick={() => setShowPoliciesModal(false)}
                  className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  I Understand
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
