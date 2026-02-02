import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';
import {
  ArrowLeft,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  XCircle,
  Lock
} from 'lucide-react';

type BidStatus = 'new' | 'under-negotiation' | 'finalized' | 'closed' | 'declined';

type Bid = {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  service: string;
  offeredPrice: number;
  originalPrice?: number;
  timeline: string;
  packageName: string;
  inclusions: string[];
  submittedAt: string;
  status: BidStatus;
  negotiationCount?: number;
};

export const EventBidsList: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    managementMode: 'self-managed', // or 'planner-managed'
    services: ['Photographer', 'Videographer', 'Catering', 'DJ', 'Decor']
  };

  // If planner-managed, show message
  if (event.managementMode === 'planner-managed') {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <Lock className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#16232A] mb-2">
            Bidding Managed by Event Planner
          </h2>
          <p className="text-[#16232A]/70 mb-2">
            All vendor bidding and negotiation activities are handled by your Event Planner.
          </p>
          <p className="text-sm text-[#16232A]/60 mb-6">
            Your planner will finalize vendors and keep you updated throughout the process.
          </p>
          <Button onClick={() => navigate(`/customer/events/${eventId}`)}>
            Back to Event
          </Button>
        </div>
      </div>
    );
  }

  // Mock bids data
  const bids: Bid[] = [
    {
      id: '1',
      vendorId: '1',
      vendorName: 'Elite Photography Studio',
      vendorRating: 4.9,
      service: 'Photographer',
      offeredPrice: 4500,
      originalPrice: 5000,
      timeline: '10 hours coverage',
      packageName: 'Premium Wedding Package',
      inclusions: [
        '2 Professional Photographers',
        '600+ Edited Photos',
        'Digital Delivery',
        'Photo Album (40 pages)',
        'Pre-Wedding Shoot'
      ],
      submittedAt: '2026-01-20T10:30:00',
      status: 'under-negotiation',
      negotiationCount: 2
    },
    {
      id: '2',
      vendorId: '2',
      vendorName: 'Dream Moments Photography',
      vendorRating: 4.7,
      service: 'Photographer',
      offeredPrice: 3500,
      timeline: '8 hours coverage',
      packageName: 'Classic Package',
      inclusions: [
        '1 Professional Photographer',
        '400+ Edited Photos',
        'Digital Delivery',
        'Online Gallery'
      ],
      submittedAt: '2026-01-22T14:15:00',
      status: 'new'
    },
    {
      id: '3',
      vendorId: '3',
      vendorName: 'Cinematic Wedding Films',
      vendorRating: 4.8,
      service: 'Videographer',
      offeredPrice: 4000,
      timeline: 'Full day coverage',
      packageName: 'Cinematic Package',
      inclusions: [
        '2 Videographers',
        'Cinematic Wedding Film (15-20 min)',
        'Raw Footage',
        'Same Day Edit',
        'Drone Coverage'
      ],
      submittedAt: '2026-01-21T09:00:00',
      status: 'finalized'
    },
    {
      id: '4',
      vendorId: '4',
      vendorName: 'Gourmet Catering Co.',
      vendorRating: 4.9,
      service: 'Catering',
      offeredPrice: 12000,
      timeline: 'Full service catering',
      packageName: 'Premium Buffet Package',
      inclusions: [
        'Food for 150 guests',
        '5-course menu',
        'Professional staff',
        'Table setup',
        'Beverages included'
      ],
      submittedAt: '2026-01-19T16:45:00',
      status: 'new'
    },
    {
      id: '5',
      vendorId: '5',
      vendorName: 'DJ Beats Entertainment',
      vendorRating: 4.7,
      service: 'DJ',
      offeredPrice: 2500,
      originalPrice: 3000,
      timeline: '6 hours performance',
      packageName: 'Wedding DJ Package',
      inclusions: [
        'Professional DJ',
        'Sound System',
        'Wireless Microphones',
        'Dance Floor Lighting',
        'Music Selection Consultation'
      ],
      submittedAt: '2026-01-23T11:20:00',
      status: 'under-negotiation',
      negotiationCount: 1
    },
    {
      id: '6',
      vendorId: '6',
      vendorName: 'Sound Waves DJ',
      vendorRating: 4.5,
      service: 'DJ',
      offeredPrice: 1800,
      timeline: '5 hours performance',
      packageName: 'Essential DJ Package',
      inclusions: [
        'Professional DJ',
        'Sound System',
        'Basic Lighting',
        'Music Library'
      ],
      submittedAt: '2026-01-23T15:30:00',
      status: 'declined'
    }
  ];

  // Group bids by service
  const groupedBids = bids.reduce((acc, bid) => {
    if (!acc[bid.service]) {
      acc[bid.service] = [];
    }
    acc[bid.service].push(bid);
    return acc;
  }, {} as Record<string, Bid[]>);

  // Filter bids
  const filteredGroupedBids = Object.entries(groupedBids).reduce((acc, [service, serviceBids]) => {
    if (selectedService === 'all' || service === selectedService) {
      const filtered = serviceBids.filter(bid => {
        // Search filter
        const matchesSearch = bid.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.packageName.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Status filter
        const matchesStatus = selectedStatus === 'all' || bid.status === selectedStatus;
        
        // Price range filter
        const minPrice = priceMin ? parseFloat(priceMin) : 0;
        const maxPrice = priceMax ? parseFloat(priceMax) : Infinity;
        const matchesPrice = bid.offeredPrice >= minPrice && bid.offeredPrice <= maxPrice;
        
        return matchesSearch && matchesStatus && matchesPrice;
      });
      if (filtered.length > 0) {
        acc[service] = filtered;
      }
    }
    return acc;
  }, {} as Record<string, Bid[]>);

  // Check if any filters are active
  const hasActiveFilters = selectedService !== 'all' || 
    selectedStatus !== 'all' || 
    priceMin !== '' || 
    priceMax !== '' || 
    searchQuery !== '';

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedService('all');
    setSelectedStatus('all');
    setPriceMin('');
    setPriceMax('');
    setSearchQuery('');
  };

  // Check if a vendor is already finalized for a service
  const isServiceFinalized = (service: string) => {
    const serviceBids = groupedBids[service] || [];
    return serviceBids.some(bid => bid.status === 'finalized');
  };

  // Get disabled tooltip message
  const getDisabledTooltip = (bid: Bid, action: 'negotiate' | 'finalize') => {
    if (bid.status === 'finalized') {
      return 'This vendor has been finalized';
    }
    if (bid.status === 'declined') {
      return 'This bid was declined';
    }
    if (bid.status === 'closed') {
      return 'This bid is no longer active';
    }
    if (action === 'finalize' && isServiceFinalized(bid.service)) {
      return 'Another vendor is already finalized for this service';
    }
    if (action === 'negotiate' && bid.status === 'finalized') {
      return 'Negotiation is locked after finalization';
    }
    return '';
  };

  // Get status badge color
  const getStatusBadge = (status: BidStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'under-negotiation':
        return 'bg-amber-100 text-amber-700';
      case 'finalized':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status text
  const getStatusText = (status: BidStatus) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'under-negotiation':
        return 'Under Negotiation';
      case 'finalized':
        return 'Finalized';
      case 'closed':
        return 'Closed';
      case 'declined':
        return 'Declined';
      default:
        return status;
    }
  };

  // Calculate bid stats
  const stats = {
    total: bids.length,
    new: bids.filter(b => b.status === 'new').length,
    negotiating: bids.filter(b => b.status === 'under-negotiation').length,
    finalized: bids.filter(b => b.status === 'finalized').length
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Bids for This Event</h1>
          <p className="text-[#16232A]/70">
            Review, negotiate, and finalize vendors for your event services.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Total Bids</p>
          <p className="text-2xl font-bold text-[#16232A]">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">New</p>
          <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Negotiating</p>
          <p className="text-2xl font-bold text-amber-600">{stats.negotiating}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Finalized</p>
          <p className="text-2xl font-bold text-green-600">{stats.finalized}</p>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="space-y-4">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors or packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-[#FF5B04] text-white text-xs rounded-full">
                  Active
                </span>
              )}
            </Button>

            {/* Reset All Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={resetAllFilters}
                className="whitespace-nowrap border-red-300 text-red-600 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reset All Filters
              </Button>
            )}
          </div>

          {/* Expandable Filter Section */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-gray-200"
            >
              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Filter by Service
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedService('all')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedService === 'all'
                        ? 'bg-[#FF5B04] text-white'
                        : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
                    }`}
                  >
                    All Services
                  </button>
                  {event.services.map(service => (
                    <button
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                        selectedService === service
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Filter by Status
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'all'
                        ? 'bg-[#FF5B04] text-white'
                        : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
                    }`}
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => setSelectedStatus('new')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'new'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => setSelectedStatus('under-negotiation')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'under-negotiation'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    Negotiation
                  </button>
                  <button
                    onClick={() => setSelectedStatus('finalized')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'finalized'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Finalized
                  </button>
                  <button
                    onClick={() => setSelectedStatus('closed')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'closed'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Closed
                  </button>
                  <button
                    onClick={() => setSelectedStatus('declined')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedStatus === 'declined'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Declined
                  </button>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Filter by Price Range
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Min price"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                      />
                    </div>
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex-1">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Max price"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Grouped Bids */}
      {Object.keys(filteredGroupedBids).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(filteredGroupedBids).map(([service, serviceBids]) => {
            const serviceHasFinalized = isServiceFinalized(service);
            
            return (
              <div key={service} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-[#16232A]">{service}</h2>
                      {serviceHasFinalized && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Vendor Finalized
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#16232A]/60 mt-1">
                      {serviceBids.length} bid{serviceBids.length !== 1 ? 's' : ''} received
                    </p>
                  </div>

                  {/* Quick Compare Link */}
                  {serviceBids.length > 1 && (
                    <Link to={`/customer/events/${eventId}/bids/compare?service=${service}`}>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Compare Bids
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Bids for this service */}
                <div className="space-y-4">
                  {serviceBids.map((bid, index) => {
                    const canNegotiate = bid.status === 'new' || bid.status === 'under-negotiation';
                    const canFinalize = (bid.status === 'new' || bid.status === 'under-negotiation') && !serviceHasFinalized;
                    const negotiateTooltip = !canNegotiate ? getDisabledTooltip(bid, 'negotiate') : '';
                    const finalizeTooltip = !canFinalize ? getDisabledTooltip(bid, 'finalize') : '';

                    return (
                      <motion.div
                        key={bid.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          {/* Vendor Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#16232A]">{bid.vendorName}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-[#16232A]">
                                  {bid.vendorRating}
                                </span>
                              </div>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(bid.status)}`}>
                                {getStatusText(bid.status)}
                              </span>
                              {bid.negotiationCount && bid.negotiationCount > 0 && (
                                <span className="text-xs text-[#16232A]/60">
                                  ({bid.negotiationCount} round{bid.negotiationCount !== 1 ? 's' : ''})
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-[#FF5B04] mb-1">{bid.packageName}</p>
                            <p className="text-sm text-[#16232A]/60">{bid.timeline}</p>
                          </div>

                          {/* Price */}
                          <div className="text-right ml-4">
                            {bid.originalPrice && bid.originalPrice !== bid.offeredPrice && (
                              <p className="text-sm text-[#16232A]/50 line-through">
                                ${bid.originalPrice.toLocaleString()}
                              </p>
                            )}
                            <p className="text-2xl font-bold text-[#16232A]">
                              ${bid.offeredPrice.toLocaleString()}
                            </p>
                            {bid.originalPrice && bid.originalPrice !== bid.offeredPrice && (
                              <p className="text-xs text-green-600 font-medium">
                                Save ${(bid.originalPrice - bid.offeredPrice).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Inclusions Preview */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-[#16232A] mb-2">Package Includes:</p>
                          <div className="flex flex-wrap gap-2">
                            {bid.inclusions.slice(0, 3).map((item, i) => (
                              <span key={i} className="px-3 py-1 bg-[#E4EEF0] text-[#16232A] text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                            {bid.inclusions.length > 3 && (
                              <span className="px-3 py-1 bg-[#E4EEF0] text-[#16232A] text-xs rounded-full">
                                +{bid.inclusions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-xs text-[#16232A]/50 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Submitted {new Date(bid.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(bid.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link to={`/customer/events/${eventId}/bids/${bid.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>

                          {bid.status === 'new' && canNegotiate && (
                            <Link to={`/customer/events/${eventId}/bids/${bid.id}`} className="flex-1">
                              <Button className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Negotiate
                              </Button>
                            </Link>
                          )}

                          {bid.status === 'new' && !canNegotiate && negotiateTooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex-1">
                                  <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Negotiate
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#16232A] text-white">
                                {negotiateTooltip}
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {bid.status === 'under-negotiation' && canNegotiate && (
                            <Link to={`/customer/events/${eventId}/bids/${bid.id}`} className="flex-1">
                              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Continue Negotiation
                              </Button>
                            </Link>
                          )}

                          {bid.status === 'under-negotiation' && !canNegotiate && negotiateTooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex-1">
                                  <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Continue Negotiation
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#16232A] text-white">
                                {negotiateTooltip}
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {canFinalize && (
                            <Link to={`/customer/events/${eventId}/bids/${bid.id}?action=finalize`} className="flex-1">
                              <Button className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Finalize Vendor
                              </Button>
                            </Link>
                          )}

                          {!canFinalize && finalizeTooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex-1">
                                  <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Finalize Vendor
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#16232A] text-white">
                                {finalizeTooltip}
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {bid.status === 'finalized' && (
                            <div className="flex-1">
                              <Button disabled className="w-full bg-green-100 text-green-700 cursor-not-allowed">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Finalized
                              </Button>
                            </div>
                          )}

                          {bid.status === 'declined' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex-1">
                                  <Button disabled className="w-full bg-red-100 text-red-700 cursor-not-allowed">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Declined
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#16232A] text-white">
                                Vendor declined finalization request
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {bid.status === 'closed' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex-1">
                                  <Button disabled className="w-full bg-gray-100 text-gray-700 cursor-not-allowed">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Closed
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#16232A] text-white">
                                Another vendor was finalized for this service
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No bids found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {hasActiveFilters
              ? 'No bids match your current filters. Try adjusting your search criteria.'
              : 'Vendors will submit their bids once they are invited to your event'}
          </p>
          {hasActiveFilters && (
            <Button onClick={resetAllFilters}>
              <XCircle className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};