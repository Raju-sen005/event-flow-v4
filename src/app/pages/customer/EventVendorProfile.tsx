import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  ArrowLeft,
  Star,
  MapPin,
  DollarSign,
  CheckCircle2,
  Calendar,
  Award,
  Users,
  ShoppingBag,
  Play,
  AlertCircle,
  Check,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

export const EventVendorProfile: React.FC = () => {
  const { eventId, vendorId } = useParams();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Mock vendor data - In production, fetch from backend
  const vendor = {
    id: vendorId || '1',
    name: 'Elite Photography Studio',
    category: 'Photographer',
    tagline: 'Award-winning wedding photography with 10+ years experience',
    rating: 4.9,
    reviews: 127,
    location: 'New York, NY',
    experience: '10+ years',
    eventsCompleted: 250,
    verified: true,
    responseTime: '2 hours',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    description: `Elite Photography Studio specializes in capturing timeless moments for weddings and special events. 
    With over a decade of experience and a passion for storytelling through images, we create stunning visual narratives 
    that you'll cherish forever. Our team uses state-of-the-art equipment and innovative techniques to deliver exceptional results.`,
    services: [
      'Wedding Photography',
      'Pre-Wedding Shoots',
      'Engagement Photography',
      'Event Coverage',
      'Photo Albums',
      'Digital Delivery'
    ],
    contact: {
      phone: '+1 234 567 8900',
      email: 'contact@elitephoto.com'
    }
  };

  // Mock portfolio items
  const portfolioCategories = [
    {
      id: 'weddings',
      name: 'Weddings',
      count: 45,
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1525258117394-b3c3e9f86d23?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 'pre-wedding',
      name: 'Pre-Wedding',
      count: 30,
      images: [
        'https://images.unsplash.com/photo-1537633576985-5358e974b0e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop'
      ]
    }
  ];

  // Mock packages
  const packages = [
    {
      id: '1',
      name: 'Essential Package',
      price: 2500,
      duration: '6 hours',
      inclusions: [
        '1 Professional Photographer',
        '300+ Edited Photos',
        'Digital Delivery',
        'Online Gallery',
        'Basic Retouching'
      ],
      popular: false
    },
    {
      id: '2',
      name: 'Premium Package',
      price: 4500,
      duration: '10 hours',
      inclusions: [
        '2 Professional Photographers',
        '600+ Edited Photos',
        'Digital Delivery',
        'Online Gallery',
        'Advanced Retouching',
        'Photo Album (40 pages)',
        'Pre-Wedding Shoot'
      ],
      popular: true
    },
    {
      id: '3',
      name: 'Luxury Package',
      price: 7000,
      duration: 'Full Day',
      inclusions: [
        '2 Professional Photographers',
        '1 Videographer',
        '1000+ Edited Photos',
        'Cinematic Wedding Film',
        'Digital Delivery',
        'Online Gallery',
        'Premium Retouching',
        'Photo Album (60 pages)',
        'Pre-Wedding Shoot',
        'Same Day Edit Video'
      ],
      popular: false
    }
  ];

  // Mock reviews
  const reviews = [
    {
      id: '1',
      customer: 'Emily Johnson',
      rating: 5,
      date: '2026-01-15',
      event: 'Wedding',
      comment: 'Absolutely amazing! The photos turned out better than we could have imagined. Professional, creative, and so easy to work with.'
    },
    {
      id: '2',
      customer: 'Michael Chen',
      rating: 5,
      date: '2025-12-20',
      event: 'Wedding',
      comment: 'Elite Photography captured every moment perfectly. Their attention to detail and artistic vision made our special day even more memorable.'
    },
    {
      id: '3',
      customer: 'Sarah Williams',
      rating: 4,
      date: '2025-11-10',
      event: 'Engagement',
      comment: 'Great experience overall. Beautiful photos and very professional service. Highly recommend!'
    }
  ];

  const handleAddToEvent = () => {
    setShowConfirmModal(true);
  };

  const confirmAddVendor = () => {
    // In production, send request to backend
    console.log('Adding vendor to event');
    setShowConfirmModal(false);
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
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <ImageWithFallback
              src={vendor.profileImage}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Vendor Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-3xl font-bold text-[#16232A] mb-1">{vendor.name}</h1>
                <p className="text-lg text-[#FF5B04] font-medium mb-2">{vendor.category}</p>
                <p className="text-[#16232A]/70">{vendor.tagline}</p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-[#16232A]/60">Rating</p>
                  <p className="font-bold text-[#16232A]">{vendor.rating} ★</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[#16232A]/60">Reviews</p>
                  <p className="font-bold text-[#16232A]">{vendor.reviews}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[#16232A]/60">Experience</p>
                  <p className="font-bold text-[#16232A]">{vendor.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[#16232A]/60">Events</p>
                  <p className="font-bold text-[#16232A]">{vendor.eventsCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleAddToEvent}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white flex-1 md:flex-none"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Event
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* About */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#16232A] mb-4">About</h3>
              <p className="text-[#16232A]/70 leading-relaxed whitespace-pre-line">
                {vendor.description}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-[#16232A] mb-3">Services Offered</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {vendor.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#16232A]/70">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#16232A] mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#16232A]/50" />
                    <div>
                      <p className="text-sm text-[#16232A]/60">Location</p>
                      <p className="font-medium text-[#16232A]">{vendor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#16232A]/50" />
                    <div>
                      <p className="text-sm text-[#16232A]/60">Response Time</p>
                      <p className="font-medium text-[#16232A]">Within {vendor.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-[#16232A]/50" />
                    <div>
                      <p className="text-sm text-[#16232A]/60">Experience</p>
                      <p className="font-medium text-[#16232A]">{vendor.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#E4EEF0] rounded-xl p-6">
                <h3 className="font-bold text-[#16232A] mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-[#16232A]/50" />
                    <span className="text-[#16232A]/70">{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-[#16232A]/50" />
                    <span className="text-[#16232A]/70">{vendor.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          {portfolioCategories.map(category => (
            <div key={category.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#16232A]">
                  {category.name}
                  <span className="text-sm font-normal text-[#16232A]/60 ml-2">
                    ({category.count} photos)
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {category.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${category.name} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl p-6 border-2 ${
                  pkg.popular ? 'border-[#FF5B04]' : 'border-gray-200'
                } relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF5B04] text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#16232A] mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#FF5B04]">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#16232A]/60 mt-1">{pkg.duration}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.inclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#16232A]/70">{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleAddToEvent}
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                      : 'bg-[#16232A] hover:bg-[#16232A]/90 text-white'
                  }`}
                >
                  Select Package
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          {/* Rating Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#16232A] mb-2">{vendor.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(vendor.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#16232A]/60">{vendor.reviews} reviews</p>
              </div>

              <div className="flex-1">
                {[5, 4, 3, 2, 1].map(rating => {
                  const percentage = rating === 5 ? 85 : rating === 4 ? 12 : 3;
                  return (
                    <div key={rating} className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-[#16232A]/60 w-8">{rating} ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#16232A]/60 w-12">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-[#16232A]">{review.customer}</p>
                    <p className="text-sm text-[#16232A]/60">
                      {review.event} • {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
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
        </TabsContent>
      </Tabs>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-[#16232A] mb-4">Add Vendor to Event</h3>
            
            <div className="bg-[#E4EEF0] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#FF5B04] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#16232A]">{vendor.name}</h4>
                  <p className="text-sm text-[#16232A]/70">{vendor.category}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Important</p>
                <p className="text-sm text-amber-800 mt-1">
                  This vendor will be invited to place a bid for your event. 
                  You can review and negotiate their offer before finalizing.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAddVendor}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};