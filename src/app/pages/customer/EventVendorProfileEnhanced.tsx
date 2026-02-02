import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  ArrowLeft,
  Star,
  MapPin,
  DollarSign,
  CheckCircle2,
  X,
  Plus,
  Shield,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Calendar,
  Image as ImageIcon,
  Video,
  Play,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles
} from 'lucide-react';

// Types
type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  inclusions: string[];
};

type Review = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  eventType: string;
};

type PortfolioItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  category: string;
};

export const EventVendorProfileEnhanced: React.FC = () => {
  const { id: eventId, vendorId } = useParams();
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addingVendor, setAddingVendor] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    category: 'Wedding',
    managementMode: 'self-managed' as 'self-managed' | 'planner-managed'
  };

  // Mock vendor data
  const vendor = {
    id: vendorId || '1',
    name: 'Elite Photography Studio',
    tagline: 'Capturing Your Perfect Moments',
    category: 'Photography',
    rating: 4.9,
    reviewCount: 127,
    description: 'We are a team of passionate photographers dedicated to capturing the most precious moments of your special day. With over 10 years of experience in wedding photography, we specialize in creating timeless, artistic images that tell your unique love story.',
    location: 'New York, NY',
    experience: '10+ years',
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=200&fit=crop',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@elitephotography.com',
      website: 'www.elitephotography.com'
    },
    stats: {
      eventsCompleted: 250,
      yearsExperience: 10,
      repeatClients: 45
    },
    services: [
      { category: 'Photography', items: ['Wedding Photography', 'Engagement Shoots', 'Pre-wedding Sessions'] },
      { category: 'Editing', items: ['Professional Retouching', 'Color Grading', 'Photo Albums'] },
      { category: 'Delivery', items: ['Digital Gallery', 'High-Resolution Files', 'Printed Albums'] }
    ],
    packages: [
      {
        id: '1',
        name: 'Basic Package',
        description: 'Perfect for intimate ceremonies',
        price: 2500,
        inclusions: [
          '6 hours coverage',
          '1 photographer',
          '300+ edited photos',
          'Online gallery',
          'Print rights'
        ]
      },
      {
        id: '2',
        name: 'Premium Package',
        description: 'Our most popular choice',
        price: 3500,
        inclusions: [
          '8 hours coverage',
          '2 photographers',
          '500+ edited photos',
          'Online gallery',
          'Engagement shoot',
          'Print rights',
          '20-page album'
        ]
      },
      {
        id: '3',
        name: 'Luxury Package',
        description: 'Complete coverage for your big day',
        price: 5000,
        inclusions: [
          'Full day coverage',
          '2 photographers + assistant',
          '800+ edited photos',
          'Online gallery',
          'Engagement + pre-wedding shoot',
          'Print rights',
          '40-page luxury album',
          'Parent albums (2)'
        ]
      }
    ],
    portfolio: [
      {
        id: '1',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
        title: 'Garden Wedding Ceremony',
        category: 'Wedding'
      },
      {
        id: '2',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop',
        title: 'Romantic Couple Portrait',
        category: 'Wedding'
      },
      {
        id: '3',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
        title: 'Reception Details',
        category: 'Wedding'
      },
      {
        id: '4',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1606800052052-f3b8f0c67d42?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1606800052052-f3b8f0c67d42?w=400&h=300&fit=crop',
        title: 'Engagement Session',
        category: 'Engagement'
      },
      {
        id: '5',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
        title: 'Candid Moments',
        category: 'Wedding'
      },
      {
        id: '6',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=400&h=300&fit=crop',
        title: 'Pre-wedding Shoot',
        category: 'Pre-wedding'
      }
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Jessica M.',
        rating: 5,
        comment: 'Absolutely amazing! The team was professional, creative, and captured every special moment. Our photos are breathtaking!',
        date: '2026-01-15',
        eventType: 'Wedding'
      },
      {
        id: '2',
        customerName: 'David & Sarah K.',
        rating: 5,
        comment: 'We couldn\'t be happier with our wedding photos. The photographers were so easy to work with and the results exceeded our expectations.',
        date: '2025-12-20',
        eventType: 'Wedding'
      },
      {
        id: '3',
        customerName: 'Michael R.',
        rating: 4.8,
        comment: 'Great experience from start to finish. Very professional and the engagement shoot was a lot of fun. Highly recommend!',
        date: '2025-11-10',
        eventType: 'Engagement'
      }
    ]
  };

  // Filter portfolio
  const filteredPortfolio = selectedCategory === 'all' 
    ? vendor.portfolio 
    : vendor.portfolio.filter(item => item.category === selectedCategory);

  const portfolioCategories = ['all', ...Array.from(new Set(vendor.portfolio.map(item => item.category)))];

  // Handle lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredPortfolio.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length);
  };

  // Handle add vendor
  const handleAddVendor = () => {
    if (event.managementMode === 'planner-managed') return;
    setShowConfirmModal(true);
  };

  const confirmAddVendor = async () => {
    setAddingVendor(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setAddingVendor(false);
    setShowConfirmModal(false);

    // Navigate back to event vendors tab
    navigate(`/customer/events/${eventId}?tab=vendors`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}/vendor-selection`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vendor List
        </button>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <ImageWithFallback
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {vendor.verified && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Verified Vendor
          </div>
        )}
      </div>

      {/* Vendor Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-6">
          <ImageWithFallback
            src={vendor.profileImage}
            alt={vendor.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#16232A] mb-1">{vendor.name}</h1>
            <p className="text-lg text-[#16232A]/70 mb-3">{vendor.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold text-[#16232A]">{vendor.rating}</span>
                </div>
                <span className="text-[#16232A]/60">({vendor.reviewCount} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-[#16232A]/60">
                <MapPin className="h-5 w-5" />
                <span>{vendor.location}</span>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2 text-[#16232A]/60">
                <Award className="h-5 w-5" />
                <span>{vendor.experience} experience</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{vendor.stats.eventsCompleted}</p>
                <p className="text-sm text-blue-900">Events Completed</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{vendor.stats.yearsExperience}</p>
                <p className="text-sm text-green-900">Years Experience</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{vendor.stats.repeatClients}%</p>
                <p className="text-sm text-purple-900">Repeat Clients</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-4 text-sm text-[#16232A]/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{vendor.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{vendor.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{vendor.contact.website}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <Tooltip
              text="Your Event Planner manages vendor selection for this event"
              show={event.managementMode === 'planner-managed'}
            >
              <Button
                onClick={handleAddVendor}
                disabled={event.managementMode === 'planner-managed'}
                className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Event
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#16232A] mb-4">About</h2>
        <p className="text-[#16232A]/70 leading-relaxed">{vendor.description}</p>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#16232A] mb-4">Services Offered</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {vendor.services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-[#16232A] mb-3">{service.category}</h3>
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-[#16232A]/70">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#16232A] mb-4">Packages & Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {vendor.packages.map((pkg) => (
            <div key={pkg.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF5B04] transition-colors">
              <h3 className="text-xl font-bold text-[#16232A] mb-2">{pkg.name}</h3>
              <p className="text-sm text-[#16232A]/60 mb-4">{pkg.description}</p>
              <div className="mb-4">
                <span className="text-sm text-[#16232A]/60">Starting at</span>
                <p className="text-3xl font-bold text-[#FF5B04]">${pkg.price.toLocaleString()}</p>
              </div>
              <div className="space-y-2 mb-6">
                {pkg.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-[#16232A]/70">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#16232A]">Portfolio</h2>
          
          {/* Category Filter */}
          <div className="flex gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FF5B04] text-white'
                    : 'bg-gray-100 text-[#16232A] hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <ImageWithFallback
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#16232A] mb-4">Reviews & Ratings</h2>
        <div className="space-y-4">
          {vendor.reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-[#16232A]">{review.customerName}</p>
                  <p className="text-sm text-[#16232A]/60">
                    {review.eventType} • {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(review.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[#16232A]/70">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <ImageWithFallback
            src={filteredPortfolio[currentImageIndex].url}
            alt={filteredPortfolio[currentImageIndex].title}
            className="max-w-full max-h-full object-contain"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="font-semibold mb-1">{filteredPortfolio[currentImageIndex].title}</p>
            <p className="text-sm text-gray-300">
              {currentImageIndex + 1} / {filteredPortfolio.length}
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#16232A]">Add Vendor to Event</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-[#16232A]/50 hover:text-[#16232A]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-2">
                    {vendor.name} will be invited to place a bid for your event
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• The vendor will submit a customized proposal</li>
                    <li>• You can review and negotiate the bid</li>
                    <li>• Finalize only when you're satisfied</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
                disabled={addingVendor}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAddVendor}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                disabled={addingVendor}
              >
                {addingVendor ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirm & Invite
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Tooltip Component
const Tooltip: React.FC<{
  children: React.ReactNode;
  text: string;
  show: boolean;
}> = ({ children, text, show }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {show && isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#16232A] text-white text-xs rounded-lg whitespace-nowrap z-50">
          {text}
          <div className="absolute top-full right-4 -mt-1">
            <div className="border-4 border-transparent border-t-[#16232A]" />
          </div>
        </div>
      )}
    </div>
  );
};