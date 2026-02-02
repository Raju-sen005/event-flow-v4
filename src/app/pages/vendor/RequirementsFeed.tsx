import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ChevronRight,
  Bookmark,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AdvancedFilterModal } from '../../components/AdvancedFilterModal';

export const RequirementsFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'catering', name: 'Catering' },
    { id: 'photography', name: 'Photography' },
    { id: 'decoration', name: 'Decoration' },
    { id: 'venue', name: 'Venue' },
    { id: 'entertainment', name: 'Entertainment' },
  ];

  const filterFields = [
    {
      id: 'eventType',
      label: 'Event Type',
      type: 'select' as const,
      options: [
        { label: 'Wedding', value: 'Wedding' },
        { label: 'Corporate', value: 'Corporate' },
        { label: 'Birthday', value: 'Birthday' },
        { label: 'Engagement', value: 'Engagement' },
      ],
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Enter city or state',
    },
    {
      id: 'eventDate',
      label: 'Event Date',
      type: 'date' as const,
    },
    {
      id: 'budget',
      label: 'Budget Range (₹)',
      type: 'range' as const,
    },
    {
      id: 'guests',
      label: 'Number of Guests',
      type: 'number' as const,
      placeholder: 'Min guests',
    },
  ];

  const requirements = [
    {
      id: '1',
      title: 'Wedding Photography & Videography',
      customer: 'Vikram Singh',
      eventType: 'Wedding',
      eventName: 'Singh Family Wedding',
      date: '2025-02-14',
      location: 'Jaipur, Rajasthan',
      budget: { min: 80000, max: 120000 },
      category: 'photography',
      guests: 500,
      description: 'Looking for professional wedding photographer and videographer for a traditional Rajasthani wedding ceremony.',
      postedAt: '2 hours ago',
      applicants: 8,
      status: 'Open',
      requirements: [
        '2 photographers, 1 videographer',
        'Traditional and candid shots',
        'Drone coverage',
        'Same day highlights video'
      ]
    },
    {
      id: '2',
      title: 'Corporate Event Catering (500 guests)',
      customer: 'Neha Kapoor',
      eventType: 'Corporate',
      eventName: 'Annual Tech Summit 2025',
      date: '2025-02-10',
      location: 'BKC, Mumbai',
      budget: { min: 300000, max: 400000 },
      category: 'catering',
      guests: 500,
      description: 'Premium catering service required for corporate tech summit. Multi-cuisine buffet with live counters.',
      postedAt: '5 hours ago',
      applicants: 12,
      status: 'Open',
      requirements: [
        'Breakfast, Lunch, Dinner',
        'Hi-tea and snacks',
        'Live food counters',
        'Vegetarian and non-vegetarian options'
      ]
    },
    {
      id: '3',
      title: 'Engagement Ceremony Decoration',
      customer: 'Amit Patel',
      eventType: 'Engagement',
      eventName: 'Patel-Shah Engagement',
      date: '2025-02-08',
      location: 'Ahmedabad, Gujarat',
      budget: { min: 60000, max: 90000 },
      category: 'decoration',
      guests: 200,
      description: 'Traditional yet modern engagement ceremony decoration with floral arrangements.',
      postedAt: '1 day ago',
      applicants: 15,
      status: 'Open',
      requirements: [
        'Stage decoration',
        'Entrance and pathway decoration',
        'Table centerpieces',
        'Lighting setup'
      ]
    },
    {
      id: '4',
      title: 'Birthday Party Entertainment & DJ',
      customer: 'Riya Sharma',
      eventType: 'Birthday',
      eventName: '30th Birthday Bash',
      date: '2025-02-05',
      location: 'Pune, Maharashtra',
      budget: { min: 35000, max: 50000 },
      category: 'entertainment',
      guests: 100,
      description: 'Looking for DJ and entertainment services for 30th birthday party. Bollywood and international music.',
      postedAt: '1 day ago',
      applicants: 6,
      status: 'Open',
      requirements: [
        'Professional DJ with equipment',
        'Sound system',
        'Lighting effects',
        '4-5 hours service'
      ]
    },
    {
      id: '5',
      title: 'Wedding Reception Catering',
      customer: 'Priya Gupta',
      eventType: 'Wedding',
      eventName: 'Gupta Wedding Reception',
      date: '2025-02-18',
      location: 'Delhi NCR',
      budget: { min: 500000, max: 700000 },
      category: 'catering',
      guests: 800,
      description: 'Grand wedding reception catering with multiple cuisines and live stations.',
      postedAt: '2 days ago',
      applicants: 18,
      status: 'Open',
      requirements: [
        'Multi-cuisine buffet',
        'Live food counters',
        'Dessert station',
        'Welcome drinks'
      ]
    },
    {
      id: '6',
      title: 'Pre-Wedding Photoshoot Location',
      customer: 'Rohan Malhotra',
      eventType: 'Wedding',
      eventName: 'Malhotra Pre-Wedding',
      date: '2025-02-12',
      location: 'Udaipur, Rajasthan',
      budget: { min: 150000, max: 200000 },
      category: 'photography',
      guests: 10,
      description: 'Destination pre-wedding photoshoot at heritage locations in Udaipur.',
      postedAt: '3 days ago',
      applicants: 10,
      status: 'Open',
      requirements: [
        '2 day shoot',
        'Multiple locations',
        'Drone shots',
        'Edited photos and video'
      ]
    },
  ];

  const filteredRequirements = requirements.filter(req => {
    const matchesCategory = selectedCategory === 'all' || req.category === selectedCategory;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">Event Requirements</h1>
        <p className="text-[#16232A]/70">Browse and bid on new event opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#075056] text-white'
                  : 'bg-gray-50 text-[#16232A] hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#16232A]/70">
          Showing <span className="font-semibold text-[#16232A]">{filteredRequirements.length}</span> requirements
        </p>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option>Newest First</option>
          <option>Budget: High to Low</option>
          <option>Budget: Low to High</option>
          <option>Event Date: Nearest</option>
        </select>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequirements.map((req, index) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/vendor/requirements/${req.id}`}
              className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-[#075056] hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                      {req.eventType}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      req.status === 'Open' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#16232A] mb-1">{req.title}</h3>
                  <p className="text-sm text-[#16232A]/70">{req.eventName}</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bookmark className="h-5 w-5 text-[#16232A]/40" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-[#16232A]/70 mb-4 line-clamp-2">{req.description}</p>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#16232A]/50">Event Date</p>
                    <p className="text-sm font-medium text-[#16232A]">
                      {new Date(req.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#16232A]/50">Guests</p>
                    <p className="text-sm font-medium text-[#16232A]">{req.guests}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#16232A]/50">Location</p>
                    <p className="text-sm font-medium text-[#16232A] truncate">{req.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-[#075056]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#16232A]/50">Budget</p>
                    <p className="text-sm font-medium text-[#075056]">
                      ₹{(req.budget.min / 1000).toFixed(0)}k - ₹{(req.budget.max / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements List */}
              <div className="mb-4">
                <p className="text-xs text-[#16232A]/50 mb-2">Key Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {req.requirements.slice(0, 3).map((requirement, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-50 text-[#16232A] text-xs rounded"
                    >
                      {requirement}
                    </span>
                  ))}
                  {req.requirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-[#16232A]/50 text-xs rounded">
                      +{req.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs text-[#16232A]/50">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {req.postedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {req.applicants} bids
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#075056] font-medium">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        open={showFilters}
        onOpenChange={setShowFilters}
        fields={filterFields}
        onApplyFilters={(appliedFilters) => {
          setFilters(appliedFilters);
          // Here you would typically filter the requirements based on appliedFilters
        }}
        initialValues={filters}
      />
    </div>
  );
};