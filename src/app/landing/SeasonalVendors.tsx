import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const occasions = ['Wedding', 'Birthday', 'Corporate Event', 'Holi', 'New Year', 'Festival Events'];

const vendorsByOccasion: Record<string, Array<{
  id: string;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  image: string;
}>> = {
  Wedding: [
    { id: 'w1', name: 'Eternal Moments Photography', category: 'Photography', priceRange: '₹30K–₹80K', rating: 4.9, image: 'https://images.unsplash.com/photo-1763560836989-d3636e2f82d8?w=400&q=80' },
    { id: 'w2', name: 'Grand Feast Catering', category: 'Catering', priceRange: '₹800–₹2K/plate', rating: 4.8, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'w3', name: 'Bloom Floral Decor', category: 'Decoration', priceRange: '₹40K–₹1.5L', rating: 4.9, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
    { id: 'w4', name: 'Glamour Bridal Studio', category: 'Makeup', priceRange: '₹12K–₹30K', rating: 4.7, image: 'https://images.unsplash.com/photo-1645862754489-bba248d67609?w=400&q=80' },
  ],
  Birthday: [
    { id: 'b1', name: 'Party Animals Entertainment', category: 'Entertainment', priceRange: '₹15K–₹50K', rating: 4.7, image: 'https://images.unsplash.com/photo-1759523350278-b8f653dc68da?w=400&q=80' },
    { id: 'b2', name: 'Cupcake Dreams Bakery', category: 'Catering', priceRange: '₹3K–₹15K', rating: 4.8, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'b3', name: 'Snapz Photography', category: 'Photography', priceRange: '₹10K–₹25K', rating: 4.6, image: 'https://images.unsplash.com/photo-1748216524009-b4cc1d1ce53f?w=400&q=80' },
    { id: 'b4', name: 'Colorful Events Decor', category: 'Decoration', priceRange: '₹8K–₹25K', rating: 4.7, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
  ],
  'Corporate Event': [
    { id: 'c1', name: 'ProConference AV', category: 'AV/Technology', priceRange: '₹25K–₹80K', rating: 4.8, image: 'https://images.unsplash.com/photo-1764726354430-1b85fa37234f?w=400&q=80' },
    { id: 'c2', name: 'Executive Caterers', category: 'Catering', priceRange: '₹1K–₹2.5K/head', rating: 4.9, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'c3', name: 'Corporate Lens Studio', category: 'Photography', priceRange: '₹20K–₹60K', rating: 4.7, image: 'https://images.unsplash.com/photo-1748216524009-b4cc1d1ce53f?w=400&q=80' },
    { id: 'c4', name: 'MinimalistDecor Pro', category: 'Decoration', priceRange: '₹15K–₹40K', rating: 4.6, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
  ],
  Holi: [
    { id: 'h1', name: 'Color Burst Events', category: 'Entertainment', priceRange: '₹20K–₹60K', rating: 4.7, image: 'https://images.unsplash.com/photo-1769349268099-25a2f352ac10?w=400&q=80' },
    { id: 'h2', name: 'Festive Foods Catering', category: 'Catering', priceRange: '₹500–₹1.2K/head', rating: 4.6, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'h3', name: 'FestCapture Photography', category: 'Photography', priceRange: '₹15K–₹35K', rating: 4.8, image: 'https://images.unsplash.com/photo-1748216524009-b4cc1d1ce53f?w=400&q=80' },
    { id: 'h4', name: 'Holi Theme Decorators', category: 'Decoration', priceRange: '₹10K–₹30K', rating: 4.5, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
  ],
  'New Year': [
    { id: 'n1', name: 'NYE Sound Systems', category: 'DJ/Sound', priceRange: '₹30K–₹1L', rating: 4.9, image: 'https://images.unsplash.com/photo-1641570996860-548ddc32063e?w=400&q=80' },
    { id: 'n2', name: 'Midnight Feast Caterers', category: 'Catering', priceRange: '₹1.5K–₹3K/head', rating: 4.8, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'n3', name: 'Nightshots Photography', category: 'Photography', priceRange: '₹20K–₹50K', rating: 4.7, image: 'https://images.unsplash.com/photo-1748216524009-b4cc1d1ce53f?w=400&q=80' },
    { id: 'n4', name: 'Glitter & Glam Decor', category: 'Decoration', priceRange: '₹20K–₹60K', rating: 4.8, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
  ],
  'Festival Events': [
    { id: 'f1', name: 'Festival Vibes Entertainment', category: 'Entertainment', priceRange: '₹25K–₹75K', rating: 4.7, image: 'https://images.unsplash.com/photo-1766404848255-5c97f6457b08?w=400&q=80' },
    { id: 'f2', name: 'Traditional Feast Caterers', category: 'Catering', priceRange: '₹600–₹1.5K/head', rating: 4.6, image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?w=400&q=80' },
    { id: 'f3', name: 'Festival Frames Studio', category: 'Photography', priceRange: '₹15K–₹40K', rating: 4.7, image: 'https://images.unsplash.com/photo-1748216524009-b4cc1d1ce53f?w=400&q=80' },
    { id: 'f4', name: 'Ethnic Decor Masters', category: 'Decoration', priceRange: '₹12K–₹35K', rating: 4.8, image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80' },
  ],
};

export const SeasonalVendors: React.FC = () => {
  const [activeOccasion, setActiveOccasion] = useState('Wedding');
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const currentVendors = vendorsByOccasion[activeOccasion] || [];

  return (
    <section className="py-24 bg-[#E4EEF0]/20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-2">Occasion-Based</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A]">
            Vendors for Every{' '}
            <span className="text-[#FF5B04]">Celebration</span>
          </h2>
        </motion.div>

        {/* Occasion Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeOccasion === occ
                  ? 'bg-[#16232A] text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#16232A]/30 hover:text-[#16232A]'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentVendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex-shrink-0 w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#FF5B04]/20 transition-all group hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-xs font-medium px-2 py-0.5 bg-white/90 rounded-full text-[#16232A]">
                    {vendor.category}
                  </span>
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#16232A]/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Star className="h-3 w-3 text-[#FF5B04] fill-[#FF5B04]" />
                    <span className="text-xs font-bold text-white">{vendor.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-[#16232A] text-sm mb-1">{vendor.name}</h3>
                  <p className="text-xs text-gray-400 mb-4">{vendor.priceRange}</p>
                  <Link
                    to="/customer/global-vendors"
                    className="block w-full py-2 text-center text-sm font-semibold bg-[#FF5B04] text-white rounded-lg hover:bg-[#FF5B04]/90 transition-all"
                  >
                    Explore Vendors
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll controls */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => scroll('left')}
              className="h-9 w-9 rounded-full border-2 border-[#16232A] flex items-center justify-center hover:bg-[#16232A] hover:text-white transition-all text-[#16232A]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-9 w-9 rounded-full border-2 border-[#FF5B04] flex items-center justify-center hover:bg-[#FF5B04] hover:text-white transition-all text-[#FF5B04]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            to="/customer/global-vendors"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#16232A] text-white font-semibold rounded-xl hover:bg-[#16232A]/90 transition-all"
          >
            Explore All Vendors for {activeOccasion}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
