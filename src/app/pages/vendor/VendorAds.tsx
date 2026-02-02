import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  Plus,
  TrendingUp,
  Eye,
  MousePointer,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  RotateCw,
  Calendar,
  DollarSign,
  AlertCircle,
  Lock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { VendorAd, AdStatus, VendorKYC } from '../../types/ads';
import { CreateAdWizard } from '../../components/vendor/CreateAdWizard';

export const VendorAds: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock KYC status
  const kycStatus: VendorKYC = {
    isVerified: true, // Changed to true to enable ad creation
    documents: {
      panCard: true,
      aadhaar: true,
      bankDetails: false,
      gst: false
    },
    status: 'verified' // Changed to 'verified'
  };

  // Mock ads data
  const ads: VendorAd[] = [
    {
      id: 'ad-1',
      vendorId: 'vendor-1',
      vendorName: 'Elite Photography Studio',
      vendorEmail: 'contact@elitephoto.com',
      type: 'banner',
      placement: 'home_hero',
      title: 'Professional Wedding Photography',
      description: 'Capture your special moments with our award-winning team',
      mediaUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
      category: 'Photography',
      targetUrl: '/vendor/profile',
      duration: 30,
      status: 'active',
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
    }
  ];

  const activeAds = ads.filter(ad => ad.status === 'active');
  const pastAds = ads.filter(ad => ad.status === 'expired' || ad.status === 'disabled');

  const getStatusConfig = (status: AdStatus) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'paused':
        return {
          label: 'Paused',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Pause
        };
      case 'expired':
        return {
          label: 'Expired',
          color: 'bg-gray-100 text-gray-700',
          icon: Clock
        };
      case 'pending_payment':
        return {
          label: 'Pending Payment',
          color: 'bg-orange-100 text-orange-700',
          icon: AlertCircle
        };
      case 'disabled':
        return {
          label: 'Disabled',
          color: 'bg-red-100 text-red-700',
          icon: XCircle
        };
    }
  };

  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Ads & Promotions</h1>
          <p className="text-[#16232A]/70">Promote your services and reach more customers</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          disabled={!kycStatus.isVerified}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Ad
        </Button>
      </div>

      {/* KYC Warning */}
      {!kycStatus.isVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Lock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900">KYC Verification Required</p>
              <p className="text-sm text-yellow-800 mt-1">
                Complete your KYC verification to create and run advertisements. Visit Profile → KYC to complete verification.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Impressions</p>
              <p className="text-2xl font-bold text-[#075056]">{totalImpressions.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <MousePointer className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-green-600">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Click-Through Rate</p>
              <p className="text-2xl font-bold text-blue-600">{ctr}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Ads */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#16232A]">Active Ads ({activeAds.length})</h2>
        
        {activeAds.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Ads</h3>
            <p className="text-gray-600 mb-4">
              Start promoting your services to reach more customers
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              disabled={!kycStatus.isVerified}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Ad
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>

      {/* Past Ads */}
      {pastAds.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#16232A]">Past Ads ({pastAds.length})</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pastAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      )}

      {/* Create Ad Modal */}
      {showCreateModal && (
        <CreateAdWizard onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

// Ad Card Component
interface AdCardProps {
  ad: VendorAd;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const config = getStatusConfig(ad.status);
  const StatusIcon = config.icon;
  const daysRemaining = Math.ceil((new Date(ad.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {ad.mediaUrl && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={ad.mediaUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-1 bg-[#075056]/10 text-[#075056] text-xs font-medium rounded">
                {ad.type === 'banner' ? 'Banner Ad' : 'Featured Listing'}
              </span>
              <span className={`px-2 py-1 ${config.color} text-xs font-medium rounded flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {config.label}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#16232A]">{ad.title}</h3>
            <p className="text-sm text-gray-600">{ad.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <Eye className="h-3 w-3" />
              <span>Impressions</span>
            </div>
            <p className="text-lg font-bold text-[#075056]">{ad.impressions.toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <MousePointer className="h-3 w-3" />
              <span>Clicks</span>
            </div>
            <p className="text-lg font-bold text-green-600">{ad.clicks.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}</span>
          </div>
          {ad.status === 'active' && daysRemaining > 0 && (
            <span className="text-[#FF5B04] font-medium">{daysRemaining} days left</span>
          )}
        </div>

        <div className="flex gap-2">
          <Link to={`/vendor/ads/${ad.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {ad.status === 'active' && (
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4" />
            </Button>
          )}
          {ad.status === 'expired' && (
            <Button size="sm" className="bg-[#075056] hover:bg-[#075056]/90 text-white">
              <RotateCw className="h-4 w-4 mr-1" />
              Renew
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function getStatusConfig(status: AdStatus) {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        color: 'bg-green-100 text-green-700',
        icon: CheckCircle
      };
    case 'paused':
      return {
        label: 'Paused',
        color: 'bg-yellow-100 text-yellow-700',
        icon: Pause
      };
    case 'expired':
      return {
        label: 'Expired',
        color: 'bg-gray-100 text-gray-700',
        icon: Clock
      };
    case 'pending_payment':
      return {
        label: 'Pending Payment',
        color: 'bg-orange-100 text-orange-700',
        icon: AlertCircle
      };
    case 'disabled':
      return {
        label: 'Disabled',
        color: 'bg-red-100 text-red-700',
        icon: XCircle
      };
  }
}