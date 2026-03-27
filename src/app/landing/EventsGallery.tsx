import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

const events = [
  {
    id: '1',
    title: 'Sharma Grand Wedding',
    type: 'Wedding',
    location: 'Mumbai, MH',
    vendors: ['Photography', 'Catering', 'Decoration', 'Makeup'],
    image: 'https://images.unsplash.com/photo-1763560836989-d3636e2f82d8?w=600&q=80',
    guests: 450,
    size: 'large',
  },
  {
    id: '2',
    title: 'TechCorp Annual Gala',
    type: 'Corporate Event',
    location: 'Delhi, DL',
    vendors: ['AV Tech', 'Catering', 'Photography'],
    image: 'https://images.unsplash.com/photo-1764726354430-1b85fa37234f?w=600&q=80',
    guests: 280,
    size: 'medium',
  },
  {
    id: '3',
    title: 'Riya\'s 25th Birthday Bash',
    type: 'Birthday Party',
    location: 'Bangalore, KA',
    vendors: ['Entertainment', 'Catering', 'Decoration'],
    image: 'https://images.unsplash.com/photo-1759523350278-b8f653dc68da?w=600&q=80',
    guests: 80,
    size: 'medium',
  },
  {
    id: '4',
    title: 'Holi Festival Celebration',
    type: 'Festival Event',
    location: 'Jaipur, RJ',
    vendors: ['Entertainment', 'Catering', 'Photography'],
    image: 'https://images.unsplash.com/photo-1769349268099-25a2f352ac10?w=600&q=80',
    guests: 600,
    size: 'large',
  },
  {
    id: '5',
    title: 'New Year Eve Extravaganza',
    type: 'New Year Party',
    location: 'Goa, GA',
    vendors: ['DJ', 'Catering', 'Lighting', 'Photography'],
    image: 'https://images.unsplash.com/photo-1641570996860-548ddc32063e?w=600&q=80',
    guests: 300,
    size: 'medium',
  },
  {
    id: '6',
    title: 'Mehta Silver Anniversary',
    type: 'Anniversary',
    location: 'Pune, MH',
    vendors: ['Photography', 'Catering', 'Decoration'],
    image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?w=600&q=80',
    guests: 120,
    size: 'small',
  },
];

export const EventsGallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Split events into columns for masonry
  const leftCol = [events[0], events[3]];
  const middleCol = [events[1], events[2]];
  const rightCol = [events[4], events[5]];

  const EventCard: React.FC<{ event: typeof events[0]; i: number; tall?: boolean }> = ({ event, i, tall }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${tall ? 'h-[520px]' : 'h-[240px]'}`}
      onMouseEnter={() => setHoveredId(event.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        hoveredId === event.id
          ? 'bg-[#16232A]/80'
          : 'bg-gradient-to-t from-[#16232A]/80 via-[#16232A]/20 to-transparent'
      }`} />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Type badge */}
        <span className="self-start text-xs font-bold px-2.5 py-1 bg-[#FF5B04] text-white rounded-full">
          {event.type}
        </span>

        <div>
          <h3 className="font-bold text-white mb-0.5">{event.title}</h3>
          <p className="text-white/60 text-xs mb-2">{event.location}</p>

          {/* Vendors */}
          <div className="flex flex-wrap gap-1 mb-2">
            {event.vendors.slice(0, 3).map((v) => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/70 rounded-full">
                {v}
              </span>
            ))}
          </div>

          {/* Stats + CTA on hover */}
          <div className={`flex items-center justify-between transition-all duration-300 ${hoveredId === event.id ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Users className="h-3.5 w-3.5" />
              <span>{event.guests} guests</span>
            </div>
            <Link
              to="/signup"
              className="flex items-center gap-1 text-xs font-semibold text-[#FF5B04] hover:text-[#FF5B04]/80 transition-colors"
            >
              View Story
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="py-24 bg-[#16232A]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10 flex-wrap gap-4"
        >
          <div>
            <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-2">Gallery</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Real Events.{' '}
              <span className="text-[#FF5B04]">Real Memories.</span>
            </h2>
          </div>
          <Link
            to="/signup"
            className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white transition-colors"
          >
            View All Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Masonry Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {leftCol.map((event, i) => (
              <EventCard key={event.id} event={event} i={i} tall={i === 0} />
            ))}
          </div>

          {/* Middle column */}
          <div className="flex flex-col gap-4">
            {middleCol.map((event, i) => (
              <EventCard key={event.id} event={event} i={i + 2} />
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {rightCol.map((event, i) => (
              <EventCard key={event.id} event={event} i={i + 4} tall={i === 1} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5B04] text-white font-semibold rounded-xl hover:bg-[#FF5B04]/90 transition-all shadow-lg shadow-[#FF5B04]/30 hover:-translate-y-0.5"
          >
            Create Your Event Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};