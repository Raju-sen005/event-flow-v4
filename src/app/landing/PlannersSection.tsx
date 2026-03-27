import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const planners = [
  {
    id: '1',
    name: 'Priya Malhotra',
    title: 'Senior Wedding Planner',
    experience: '8 years',
    events: 320,
    rating: 4.9,
    reviews: 145,
    price: '₹75,000',
    eventTypes: ['Weddings', 'Engagements', 'Reception'],
    image: 'https://images.unsplash.com/photo-1712903276259-c61ab995dcd7?w=400&q=80',
    verified: true,
    badge: 'Expert',
  },
  {
    id: '2',
    name: 'Rahul Gupta',
    title: 'Corporate Event Specialist',
    experience: '6 years',
    events: 180,
    rating: 4.8,
    reviews: 98,
    price: '₹55,000',
    eventTypes: ['Corporate Events', 'Conferences', 'Galas'],
    image: 'https://images.unsplash.com/photo-1712903276004-ea6b4a916abe?w=400&q=80',
    verified: true,
    badge: 'Certified',
  },
  {
    id: '3',
    name: 'Anita Sharma',
    title: 'Full-Service Event Coordinator',
    experience: '5 years',
    events: 220,
    rating: 4.7,
    reviews: 112,
    price: '₹45,000',
    eventTypes: ['Birthdays', 'Anniversaries', 'Baby Showers'],
    image: 'https://images.unsplash.com/photo-1650784855038-9f4d5ed154a9?w=400&q=80',
    verified: true,
    badge: 'Top Rated',
  },
];

export const PlannersSection: React.FC = () => {
  return (
    <section id="planners" className="py-24 bg-[#16232A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5B04]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#075056]/10 rounded-full blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid-dark" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark)" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-3">Event Planners</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Leave It to the{' '}
            <span className="text-[#FF5B04]">Professionals</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Our certified event planners handle every detail so you can enjoy your special day stress-free.
          </p>
        </motion.div>

        {/* Planners Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {planners.map((planner, i) => (
            <motion.div
              key={planner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#FF5B04]/40 transition-all group hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={planner.image}
                  alt={planner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16232A] via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#FF5B04] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <Award className="h-3 w-3" />
                  {planner.badge}
                </div>

                {/* Name at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-lg">{planner.name}</h3>
                  <p className="text-white/70 text-sm">{planner.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="font-bold text-white">{planner.experience}</div>
                    <div className="text-[10px] text-white/40">Experience</div>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <div className="font-bold text-white">{planner.events}+</div>
                    <div className="text-[10px] text-white/40">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="h-3 w-3 text-[#FF5B04] fill-[#FF5B04]" />
                      <span className="font-bold text-white text-sm">{planner.rating}</span>
                    </div>
                    <div className="text-[10px] text-white/40">Rating</div>
                  </div>
                </div>

                {/* Event types */}
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Specializes In</p>
                  <div className="flex flex-wrap gap-1.5">
                    {planner.eventTypes.map((type) => (
                      <span key={type} className="text-xs px-2.5 py-0.5 bg-white/10 text-white/70 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified + Price */}
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified
                  </div>
                  <div className="text-sm">
                    <span className="text-white/40 text-xs">Starting </span>
                    <span className="font-bold text-[#FF5B04]">{planner.price}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/customer/event-planners/${planner.id}`}
                    className="flex-1 py-2 text-center text-sm font-medium border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition-all"
                  >
                    View Planner
                  </Link>
                  <Link
                    to="/customer/event-planners"
                    className="flex-1 py-2 text-center text-sm font-semibold bg-[#FF5B04] text-white rounded-lg hover:bg-[#FF5B04]/90 transition-all"
                  >
                    Hire Planner
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/customer/event-planners"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all"
          >
            Browse All Planners
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
