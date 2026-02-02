import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { EventPickerModal } from '@/app/components/modals/EventPickerModal';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Share2,
  Heart,
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  X,
  Play,
  Image as ImageIcon
} from 'lucide-react';

// Types
type EventPlanner = {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  eventsManaged: number;
  experienceYears: number;
  specialties: string[];
  priceRange: string;
  bio: string;
  email: string;
  phone: string;
  availability: string;
  responseTime: string;
  portfolio: {
    id: string;
    title: string;
    eventType: string;
    date: string;
    image: string;
  }[];
  reviews: {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    eventType: string;
    date: string;
  }[];
  services: string[];
  certifications: string[];
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planner: EventPlanner;
  hasVendors: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  planner,
  hasVendors
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Selection</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {hasVendors && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Important Warning</p>
                <p className="text-sm text-amber-800">
                  Selecting an Event Planner will disable direct vendor management for this event. 
                  Your planner will handle all vendor coordination.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-[#16232A]/60 mb-1">Selected Planner</p>
          <p className="font-semibold text-[#16232A]">{planner.name}</p>
          <p className="text-sm text-[#16232A]/70">{planner.company}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors font-medium"
          >
            Confirm Selection
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const EventPlannerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data - In real app, fetch based on id
  const planner: EventPlanner = {
    id: id || '1',
    name: 'Priya Sharma',
    company: 'Elite Events & Celebrations',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    eventsManaged: 250,
    experienceYears: 8,
    specialties: ['Weddings', 'Corporate Events', 'Social Gatherings'],
    priceRange: '₹50,000 - ₹2,00,000',
    bio: 'Award-winning event planner with 8+ years of experience in creating unforgettable celebrations. Specializing in weddings and corporate events with a focus on personalized experiences and flawless execution.',
    email: 'priya@eliteevents.com',
    phone: '+91 98765 43210',
    availability: 'Available',
    responseTime: '< 2 hours',
    portfolio: [
      {
        id: '1',
        title: 'Royal Palace Wedding',
        eventType: 'Wedding',
        date: '2025-12-15',
        image: '#FF5B04'
      },
      {
        id: '2',
        title: 'Tech Summit 2025',
        eventType: 'Corporate',
        date: '2025-11-20',
        image: '#075056'
      },
      {
        id: '3',
        title: 'Garden Reception',
        eventType: 'Social',
        date: '2025-10-10',
        image: '#16232A'
      },
      {
        id: '4',
        title: 'Destination Wedding - Goa',
        eventType: 'Wedding',
        date: '2025-09-05',
        image: '#FF5B04'
      },
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Rahul & Anjali',
        rating: 5,
        comment: 'Priya made our wedding absolutely perfect! Every detail was handled with care and professionalism. Highly recommended!',
        eventType: 'Wedding',
        date: '2025-12-20'
      },
      {
        id: '2',
        customerName: 'TechCorp India',
        rating: 5,
        comment: 'Outstanding coordination for our annual tech summit. Managed 500+ attendees flawlessly. Will definitely work with Elite Events again.',
        eventType: 'Corporate Event',
        date: '2025-11-25'
      },
      {
        id: '3',
        customerName: 'Meera Kapoor',
        rating: 4,
        comment: 'Great experience overall. Priya was very responsive and creative. Minor delays but nothing major. Would recommend.',
        eventType: 'Birthday Party',
        date: '2025-10-15'
      },
    ],
    services: [
      'Full Event Planning & Coordination',
      'Vendor Management & Negotiation',
      'Budget Planning & Management',
      'Venue Selection & Setup',
      'Guest List & RSVP Management',
      'Day-of Coordination',
      'Post-Event Cleanup'
    ],
    certifications: [
      'Certified Wedding Planner (CWP)',
      'Event Management Professional',
      'Hospitality Excellence Award 2024'
    ]
  };

  const handleSelectForEvent = () => {
    setShowEventPicker(true);
  };

  const handleEventSelect = (eventId: string) => {
    setShowEventPicker(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSelection = () => {
    setShowConfirmModal(false);
    navigate('/customer/event-planners', { 
      state: { message: 'Event planner successfully assigned to your event!' }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/customer/event-planners')}
          className="inline-flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Event Planners
        </motion.button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 border border-gray-200"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 bg-gradient-to-br from-[#FF5B04] to-[#075056] rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {planner.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-[#16232A]">{planner.name}</h1>
                    {planner.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-xl text-[#16232A]/70 mb-3">{planner.company}</p>
                  <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {planner.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {planner.experienceYears} years experience
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-3 rounded-lg border transition-colors ${
                      isFavorited
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-300 text-[#16232A]/60 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-lg border border-gray-300 bg-white text-[#16232A]/60 hover:border-[#FF5B04] hover:text-[#FF5B04] transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(planner.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#16232A]">{planner.rating}</span>
                  <span className="text-sm text-[#16232A]/60">({planner.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#16232A]/40" />
                  <span className="text-sm text-[#16232A]/70">{planner.eventsManaged} events managed</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[#16232A]/70 mb-4">{planner.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-6">
                {planner.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#075056]/10 text-[#075056] rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-[#16232A]/50 mb-1">Price Range</p>
                  <p className="font-semibold text-[#16232A]">{planner.priceRange}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-[#16232A]/50 mb-1">Availability</p>
                  <p className="font-semibold text-green-600">{planner.availability}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-[#16232A]/50 mb-1">Response Time</p>
                  <p className="font-semibold text-[#16232A]">{planner.responseTime}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-[#16232A]/50 mb-1">Success Rate</p>
                  <p className="font-semibold text-[#16232A]">98%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSelectForEvent}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg transition-colors font-medium"
                >
                  <Sparkles className="h-5 w-5" />
                  Select for Event
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium">
                  <Mail className="h-5 w-5" />
                  Contact
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg bg-white text-[#16232A] hover:bg-gray-50 transition-colors font-medium">
                  <Phone className="h-5 w-5" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-[#16232A]/60 hover:text-[#16232A]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-[#16232A]/60 hover:text-[#16232A]'
                }`}
              >
                Portfolio ({planner.portfolio.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-[#16232A]/60 hover:text-[#16232A]'
                }`}
              >
                Reviews ({planner.reviewCount})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Services */}
                <div>
                  <h3 className="text-xl font-bold text-[#16232A] mb-4">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {planner.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-[#16232A]">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-bold text-[#16232A] mb-4">Certifications & Awards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {planner.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="h-10 w-10 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <span className="text-sm font-medium text-[#16232A]">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#16232A] mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-[#16232A]/40" />
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Email</p>
                        <p className="font-medium text-[#16232A]">{planner.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-[#16232A]/40" />
                      <div>
                        <p className="text-xs text-[#16232A]/50 mb-1">Phone</p>
                        <p className="font-medium text-[#16232A]">{planner.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planner.portfolio.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div 
                      className="h-48 flex items-center justify-center"
                      style={{ backgroundColor: item.image }}
                    >
                      <ImageIcon className="h-16 w-16 text-white/30" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-[#16232A] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#16232A]/70 mb-2">{item.eventType}</p>
                      <p className="text-xs text-[#16232A]/50">{formatDate(item.date)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {planner.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-[#16232A] mb-1">{review.customerName}</h4>
                        <p className="text-sm text-[#16232A]/60">{review.eventType}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-[#16232A]/50">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    <p className="text-[#16232A]/70">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Event Picker Modal */}
      <EventPickerModal
        isOpen={showEventPicker}
        onClose={() => setShowEventPicker(false)}
        onSelectEvent={handleEventSelect}
        title="Select Event for This Planner"
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSelection}
        planner={planner}
        hasVendors={false}
      />
    </div>
  );
};
