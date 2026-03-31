import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote, Calendar, Building2, MapPin, TrendingUp } from 'lucide-react';

const metrics = [
  { value: '12K+', label: 'Events Hosted', icon: Calendar, color: '#FF5B04' },
  { value: '48K+', label: 'Vendors Listed', icon: Building2, color: '#075056' },
  { value: '120+', label: 'Cities Covered', icon: MapPin, color: '#FF5B04' },
  { value: '4.9★', label: 'Average Rating', icon: Star, color: '#075056' },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya & Arjun Sharma',
    eventType: 'Wedding • Mumbai',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1645862754489-bba248d67609?w=200&q=80',
    quote: 'GoGatherHub made our dream wedding a reality! We found the perfect photographer, decorator, and caterer all in one place. The bidding system saved us nearly ₹2 lakhs compared to our original budget. The milestone payment feature gave us complete peace of mind.',
    verified: true,
    saved: '₹2L saved',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    eventType: 'Corporate Gala • Delhi',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1712903276004-ea6b4a916abe?w=200&q=80',
    quote: 'As an event manager for a Fortune 500 company, I\'ve tried many platforms. GoGatherHub is hands down the best. The vendor verification process is thorough, the digital agreements saved us weeks of paperwork, and the QR-based attendance tracking was flawless.',
    verified: true,
    saved: '40% time saved',
  },
  {
    id: 3,
    name: 'Anjali & Rohan Mehta',
    eventType: 'Anniversary • Bangalore',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1712903276259-c61ab995dcd7?w=200&q=80',
    quote: 'The rental service section was a lifesaver! We got beautiful decorations, lighting, and even bridal wear at a fraction of the buying cost. The deposit protection meant we had zero stress. Our anniversary party was absolutely magical!',
    verified: true,
    saved: '₹80K saved on rentals',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 bg-[#16232A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#075056]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF5B04]/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-3">Reviews</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Trusted by Thousands of{' '}
            <span className="text-[#FF5B04]">Happy Families</span>
          </h2>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${m.color}20` }}
              >
                <m.icon className="h-6 w-6" style={{ color: m.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-sm text-white/50">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/15 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto relative"
          >
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-20">
              <Quote className="h-16 w-16 text-[#FF5B04]" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#FF5B04] fill-[#FF5B04]" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl">
              "{testimonials[current].quote}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#FF5B04]/40">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white">{testimonials[current].name}</h4>
                    {testimonials[current].verified && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-white/50 text-sm">{testimonials[current].eventType}</p>
                </div>
              </div>

              {/* Savings badge */}
              <div className="flex items-center gap-1.5 bg-[#FF5B04]/20 border border-[#FF5B04]/30 rounded-full px-4 py-2">
                <TrendingUp className="h-4 w-4 text-[#FF5B04]" />
                <span className="text-sm font-semibold text-[#FF5B04]">{testimonials[current].saved}</span>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white/60 hover:border-white/40 hover:text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-[#FF5B04]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white/60 hover:border-white/40 hover:text-white transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
