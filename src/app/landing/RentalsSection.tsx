import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Tag, Shield, Filter } from 'lucide-react';
import { Link } from 'react-router';

const rentalCategories = ['All', 'Wedding Wear', 'Formal Wear', 'Accessories', 'Decor Rentals', 'Sound Equipment'];

const rentalItems = [
  {
    id: '1',
    name: 'Bridal Lehenga (Premium)',
    category: 'Wedding Wear',
    pricePerDay: '₹8,500/day',
    deposit: '₹15,000',
    image: 'https://images.unsplash.com/photo-1745541584814-5dd9310e8438?w=400&q=80',
    available: true,
    tag: 'Most Popular',
  },
  {
    id: '2',
    name: 'Designer Tuxedo Suit',
    category: 'Formal Wear',
    pricePerDay: '₹3,200/day',
    deposit: '₹8,000',
    image: 'https://images.unsplash.com/photo-1592878897400-43fb1f1cc324?w=400&q=80',
    available: true,
    tag: 'New Arrival',
  },
  {
    id: '3',
    name: 'Bridal Jewelry Set',
    category: 'Accessories',
    pricePerDay: '₹4,500/day',
    deposit: '₹10,000',
    image: 'https://images.unsplash.com/photo-1769116416517-594639a769a7?w=400&q=80',
    available: true,
    tag: null,
  },
  {
    id: '4',
    name: 'Floral Arch Decor',
    category: 'Decor Rentals',
    pricePerDay: '₹12,000/day',
    deposit: '₹20,000',
    image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=400&q=80',
    available: true,
    tag: 'Premium',
  },
  {
    id: '5',
    name: 'Pro Sound System (2000W)',
    category: 'Sound Equipment',
    pricePerDay: '₹6,500/day',
    deposit: '₹12,000',
    image: 'https://images.unsplash.com/photo-1759803535782-3b74d13e5a5f?w=400&q=80',
    available: true,
    tag: null,
  },
  {
    id: '6',
    name: 'Sherwani Collection',
    category: 'Wedding Wear',
    pricePerDay: '₹5,000/day',
    deposit: '₹10,000',
    image: 'https://images.unsplash.com/photo-1592878897400-43fb1f1cc324?w=400&q=80',
    available: false,
    tag: 'Booked',
  },
];

export const RentalsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? rentalItems
    : rentalItems.filter((item) => item.category === activeCategory);

  return (
    <section id="rentals" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-2">Rental Services</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A]">
              Rent Everything{' '}
              <span className="text-[#FF5B04]">You Need</span>
            </h2>
            <Link
              to="/customer/rental-services"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#075056] hover:text-[#075056]/80 transition-colors"
            >
              Browse All Rentals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8 flex-wrap"
        >
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {rentalCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#075056] text-white shadow-md shadow-[#075056]/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#E4EEF0] hover:text-[#075056]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-white rounded-2xl overflow-hidden border-2 transition-all group hover:-translate-y-1 ${
                item.available
                  ? 'border-gray-100 hover:border-[#075056]/30 hover:shadow-xl shadow-sm'
                  : 'border-gray-100 opacity-70'
              }`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-[#E4EEF0]/50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Tag */}
                {item.tag && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white ${
                      item.available ? 'bg-[#FF5B04]' : 'bg-gray-500'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Availability badge */}
                <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.available ? 'Available' : 'Booked'}
                </span>

                {/* Category */}
                <span className="absolute bottom-3 left-3 text-xs font-medium px-2 py-0.5 bg-white/90 rounded-full text-[#16232A]">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#16232A] mb-3">{item.name}</h3>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#075056]">
                      <Tag className="h-3.5 w-3.5" />
                      <span className="font-bold">{item.pricePerDay}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                      <Shield className="h-3 w-3" />
                      <span>Deposit: {item.deposit}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    to="/customer/rental-services"
                    className="flex-1 py-2 text-center text-sm font-medium border-2 border-[#075056] text-[#075056] rounded-lg hover:bg-[#075056] hover:text-white transition-all"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/customer/rental-services"
                    className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition-all ${
                      item.available
                        ? 'bg-[#FF5B04] text-white hover:bg-[#FF5B04]/90'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Rent Item
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-[#E4EEF0] to-[#E4EEF0]/50 rounded-2xl p-8 flex items-center justify-between gap-6 flex-wrap"
        >
          <div>
            <h3 className="font-bold text-[#16232A] text-xl mb-1">Looking for something specific?</h3>
            <p className="text-gray-500 text-sm">Browse our complete catalog with 500+ rental items across all categories.</p>
          </div>
          <Link
            to="/customer/rental-services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#16232A] text-white font-semibold rounded-xl hover:bg-[#16232A]/90 transition-all whitespace-nowrap"
          >
            Explore Full Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
