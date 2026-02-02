import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  MessageSquare,
  Share2,
  Heart,
  CheckCircle,
  Award,
  Users,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

export const VendorProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock vendor data
  const vendor = {
    id: 1,
    name: 'Elite Photography Studio',
    category: 'Photography',
    rating: 4.9,
    reviews: 127,
    priceRange: '$$$',
    location: 'New York, NY',
    verified: true,
    yearsInBusiness: 10,
    eventsCompleted: 450,
    responseTime: '< 2 hours',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=400&fit=crop',
    description: 'Elite Photography Studio specializes in capturing life\'s most precious moments with artistic excellence. Our team of award-winning photographers brings over a decade of experience in wedding, corporate, and special event photography.',
    services: [
      'Wedding Photography',
      'Pre-wedding Shoots',
      'Candid Photography',
      'Drone Photography',
      'Album Design',
      'Same-day Editing'
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587271449860-56bb5e4d25b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1525490829609-d166ddb58678?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400&h=300&fit=crop'
    ]
  };

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2 weeks ago',
      event: 'Wedding',
      comment: 'Absolutely phenomenal! Elite Photography captured our special day perfectly. Every shot was artistic and emotional. Highly recommended!'
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 5,
      date: '1 month ago',
      event: 'Corporate Event',
      comment: 'Professional, punctual, and creative. They made our corporate gala look amazing. Will definitely hire again!'
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      rating: 4,
      date: '2 months ago',
      event: 'Birthday Party',
      comment: 'Great experience overall. Beautiful photos and excellent communication throughout the process.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </button>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white">{vendor.name}</h1>
                {vendor.verified && (
                  <div className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-white/80">({vendor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {vendor.priceRange}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <Award className="h-8 w-8 text-[#FF5B04] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#16232A]">{vendor.yearsInBusiness}+</p>
          <p className="text-sm text-[#16232A]/60">Years Experience</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <Calendar className="h-8 w-8 text-[#FF5B04] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#16232A]">{vendor.eventsCompleted}+</p>
          <p className="text-sm text-[#16232A]/60">Events Completed</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <Star className="h-8 w-8 text-[#FF5B04] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#16232A]">{vendor.rating}/5</p>
          <p className="text-sm text-[#16232A]/60">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <Clock className="h-8 w-8 text-[#FF5B04] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#16232A]">{vendor.responseTime}</p>
          <p className="text-sm text-[#16232A]/60">Response Time</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                : 'text-[#16232A]/60 hover:text-[#16232A]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'portfolio'
                ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                : 'text-[#16232A]/60 hover:text-[#16232A]'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                : 'text-[#16232A]/60 hover:text-[#16232A]'
            }`}
          >
            Reviews ({vendor.reviews})
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-3">About</h2>
                <p className="text-[#16232A]/70 leading-relaxed">{vendor.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-3">Services Offered</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {vendor.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-[#16232A]">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Vendor
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Check Availability
                </Button>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#16232A]">Our Work</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.portfolio.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#16232A]">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-[#16232A]">{vendor.rating}</span>
                  <span className="text-[#16232A]/60">/ 5</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-[#16232A]">{review.author}</p>
                        <p className="text-sm text-[#16232A]/60">{review.event} • {review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#16232A]/70">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
