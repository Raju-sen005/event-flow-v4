import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  Package,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export const RentalBooking: React.FC = () => {
  const { eventId, itemId } = useParams<{ eventId: string; itemId: string }>();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const eventDate = "2026-06-15";
  const item = {
    id: itemId,
    name: 'Royal Blue Sherwani with Embroidery',
    image: 'https://images.unsplash.com/photo-1583846112910-c5143e91f6ec?w=400',
    rentalPrice: 2500,
    pricePerDay: 850,
    deposit: 5000,
    maxDuration: 7,
    availableSizes: ['S', 'M', 'L', 'XL'],
    vendorName: 'Elegant Rentals Co.',
  };

  // Calculate rental duration
  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  const duration = calculateDuration();
  const rentalCharge = duration * item.rentalPrice / 3; // Approximate per-day calculation
  const totalDeposit = item.deposit * quantity;
  const totalRental = rentalCharge * quantity;
  const totalPayable = totalRental + totalDeposit;

  // Validation
  const isStartDateValid = startDate !== '';
  const isEndDateValid = endDate !== '' && new Date(endDate) >= new Date(startDate);
  const isDurationValid = duration > 0 && duration <= item.maxDuration;
  const canProceed = isStartDateValid && isEndDateValid && isDurationValid;

  // Get min date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get max end date based on start date
  const getMaxEndDate = () => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const maxEnd = new Date(start);
    maxEnd.setDate(start.getDate() + item.maxDuration - 1);
    return maxEnd.toISOString().split('T')[0];
  };

  const handleProceed = () => {
    if (!canProceed) return;
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = () => {
    navigate(`/customer/events/${eventId}/rentals/item/${itemId}/summary`, {
      state: {
        startDate,
        endDate,
        selectedSize,
        quantity,
        duration,
        rentalCharge: totalRental,
        deposit: totalDeposit,
        total: totalPayable,
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Item Details
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{eventName}</span>
        </div>
        <h1 className="text-2xl font-bold text-[#16232A]">
          Book Rental Item
        </h1>
        <p className="text-gray-600 mt-1">
          Select rental dates and confirm your booking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Item Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Item Summary</h3>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold text-[#16232A] mb-2">
              {item.name}
            </h4>
            <p className="text-sm text-gray-600 mb-4">{item.vendorName}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rental Rate:</span>
                <span className="font-semibold">₹{item.rentalPrice}/3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deposit:</span>
                <span className="font-semibold">₹{item.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Duration:</span>
                <span className="font-semibold">{item.maxDuration} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rental Period */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#075056]" />
              Rental Period
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    // Reset end date if it becomes invalid
                    if (endDate && new Date(endDate) < new Date(e.target.value)) {
                      setEndDate('');
                    }
                  }}
                  min={getMinDate()}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || getMinDate()}
                  max={getMaxEndDate()}
                  disabled={!startDate}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {duration > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">
                      Rental Duration: {duration} day{duration !== 1 ? 's' : ''}
                    </p>
                    {duration > item.maxDuration && (
                      <p className="text-sm text-red-700">
                        ⚠️ Duration exceeds maximum allowed ({item.maxDuration} days). Please adjust your dates.
                      </p>
                    )}
                    {duration <= item.maxDuration && (
                      <p className="text-sm text-blue-800">
                        Your rental period is valid
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Size & Quantity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-[#075056]" />
              Size & Quantity
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Size *
                </label>
                <div className="flex gap-3">
                  {item.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-[#FF5B04] bg-[#FF5B04]/10 text-[#FF5B04]'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    disabled={quantity >= 5}
                    className="h-10 w-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-2">
                    (Max 5 items)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          {duration > 0 && isDurationValid && (
            <div className="bg-[#E4EEF0] rounded-xl p-6">
              <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-[#075056]" />
                Price Breakdown
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Rental Charge ({duration} days × {quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span className="font-semibold">₹{totalRental.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Refundable Deposit ({quantity} item{quantity > 1 ? 's' : ''})
                  </span>
                  <span className="font-semibold">₹{totalDeposit.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-300 my-3" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-[#16232A]">
                    Total Payable Now
                  </span>
                  <span className="font-bold text-[#FF5B04] text-2xl">
                    ₹{totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>₹{totalDeposit.toLocaleString()}</strong> will be refunded after successful return in good condition
                </p>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-2">
                  Important Rental Information
                </p>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Items must be returned by 6 PM on the return date</li>
                  <li>• Late returns incur a penalty of ₹500 per day</li>
                  <li>• Deposit will be refunded within 3-5 business days after return</li>
                  <li>• Damages will be deducted from the deposit amount</li>
                  <li>• Cancellation policy applies as per rental terms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProceed}
              disabled={!canProceed}
              className={`flex-1 ${
                canProceed
                  ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {!canProceed
                ? 'Fill Required Fields'
                : 'Continue to Summary'}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
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
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            >
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#16232A] mb-3">
                Confirm Rental Details
              </h3>
              <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-[#FF5B04]">
                    ₹{totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  Proceed
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
