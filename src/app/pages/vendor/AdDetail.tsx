import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  Eye,
  MousePointer,
  TrendingUp,
  Edit,
  Pause,
  Play,
  RotateCw,
  Zap,
  CheckCircle,
  Clock,
  MapPin,
  Tag,
  ExternalLink,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { VendorAd } from '../../types/ads';

export const AdDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mock ad data
  const ad: VendorAd = {
    id: 'ad-1',
    vendorId: 'vendor-1',
    vendorName: 'Elite Photography Studio',
    vendorEmail: 'contact@elitephoto.com',
    type: 'banner',
    placement: 'home_hero',
    title: 'Professional Wedding Photography',
    description: 'Capture your special moments with our award-winning team. Over 500 weddings captured with excellence.',
    mediaUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
    category: 'Photography',
    targetUrl: '/vendor/profile',
    duration: 30,
    status: isPaused ? 'paused' : 'active',
    startDate: '2025-01-15',
    endDate: '2025-02-14',
    amount: 15000,
    isPaid: true,
    paymentId: 'PAY123456',
    paymentDate: '2025-01-15',
    impressions: 12500,
    clicks: 385,
    isKYCVerified: true,
    isApprovedByAdmin: true,
    createdAt: '2025-01-15T10:00:00',
    updatedAt: '2025-01-15T10:00:00'
  };

  const ctr = ((ad.clicks / ad.impressions) * 100).toFixed(2);
  const daysRemaining = Math.ceil((new Date(ad.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleBoost = () => {
    setShowBoostModal(true);
  };

  const placementLabels = {
    home_hero: 'Home Page Hero Banner',
    home_sidebar: 'Home Page Sidebar',
    category_top: 'Category Top Banner',
    search_results: 'Search Results Featured'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/vendor/ads')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Ads
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleBoost}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            Boost Ad
          </Button>
          <Button
            onClick={handlePauseResume}
            variant={isPaused ? 'default' : 'outline'}
            className={isPaused ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Ad Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        {ad.mediaUrl && (
          <div className="h-96 overflow-hidden bg-gray-100">
            <img
              src={ad.mediaUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#075056]/10 text-[#075056] text-sm font-medium rounded">
                  {ad.type === 'banner' ? 'Banner Ad' : 'Featured Listing'}
                </span>
                <span className={`px-3 py-1 ${
                  ad.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                } text-sm font-medium rounded flex items-center gap-1`}>
                  {ad.status === 'active' ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Active
                    </>
                  ) : (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      Paused
                    </>
                  )}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#16232A] mb-2">{ad.title}</h1>
              <p className="text-gray-700">{ad.description}</p>
            </div>
          </div>

          {/* Ad Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Placement</p>
                <p className="text-sm font-semibold text-[#16232A]">{placementLabels[ad.placement]}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tag className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Category</p>
                <p className="text-sm font-semibold text-[#16232A]">{ad.category}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-sm font-semibold text-[#16232A]">{ad.duration} days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-[#FF5B04] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Remaining</p>
                <p className="text-sm font-semibold text-[#FF5B04]">{daysRemaining} days</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(ad.startDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })} - {new Date(ad.endDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <Link 
              to={ad.targetUrl}
              className="flex items-center gap-1 text-[#075056] hover:underline"
            >
              <span>View Landing Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-[#075056]" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Impressions</p>
          <p className="text-3xl font-bold text-[#075056]">{ad.impressions.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12.5% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <MousePointer className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
          <p className="text-3xl font-bold text-green-600">{ad.clicks.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-2">↑ 8.3% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Click-Through Rate</p>
          <p className="text-3xl font-bold text-blue-600">{ctr}%</p>
          <p className="text-xs text-gray-500 mt-2">Industry avg: 2.5%</p>
        </motion.div>
      </div>

      {/* Payment Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-[#16232A] mb-4">Payment Information</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
            <p className="text-2xl font-bold text-[#075056]">₹{ad.amount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Payment ID</p>
            <p className="text-lg font-semibold text-[#16232A]">{ad.paymentId}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Payment Date</p>
            <p className="text-lg font-semibold text-[#16232A]">
              {ad.paymentDate && new Date(ad.paymentDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Boost Modal */}
      {showBoostModal && (
        <BoostAdModal
          ad={ad}
          onClose={() => setShowBoostModal(false)}
        />
      )}
    </div>
  );
};

// Boost Ad Modal
interface BoostAdModalProps {
  ad: VendorAd;
  onClose: () => void;
}

const BoostAdModal: React.FC<BoostAdModalProps> = ({ ad, onClose }) => {
  const [selectedBoost, setSelectedBoost] = useState<string>('');

  const boostOptions = [
    {
      id: 'boost_3days',
      duration: '3 Days',
      price: 3000,
      impressionBoost: '+50%',
      description: 'Increase visibility by 50% for 3 days'
    },
    {
      id: 'boost_7days',
      duration: '7 Days',
      price: 6000,
      impressionBoost: '+75%',
      description: 'Increase visibility by 75% for 7 days',
      popular: true
    },
    {
      id: 'boost_14days',
      duration: '14 Days',
      price: 10000,
      impressionBoost: '+100%',
      description: 'Double your visibility for 14 days'
    }
  ];

  const handleBoost = () => {
    // Here you would handle the boost payment
    alert('Boost activated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/90 p-4 md:p-6 text-white flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Boost Your Ad</h2>
              <p className="text-white/90 text-xs md:text-sm">Increase visibility and reach more customers</p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-[#16232A] mb-2">Boosting: {ad.title}</h3>
            <p className="text-sm text-gray-600">Select a boost package to increase your ad's visibility</p>
          </div>

          <div className="space-y-3 mb-4 md:mb-6">
            {boostOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedBoost(option.id)}
                className={`relative p-3 md:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedBoost === option.id
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.popular && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 bg-[#FF5B04] text-white text-xs font-semibold rounded">
                    POPULAR
                  </span>
                )}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#16232A]">{option.duration}</h4>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        {option.impressionBoost}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-[#075056]">₹{option.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1 text-sm md:text-base">How Boosting Works</h4>
                <ul className="text-xs md:text-sm text-blue-800 space-y-1">
                  <li>• Your ad will appear more frequently to potential customers</li>
                  <li>• Priority placement in search results and category pages</li>
                  <li>• Increased visibility leads to more clicks and inquiries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 flex gap-3 flex-shrink-0 rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleBoost}
            disabled={!selectedBoost}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            Activate Boost
          </Button>
        </div>
      </motion.div>
    </div>
  );
};