import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Store, Users, Package, UserCheck, FileText, CreditCard, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router';

const services = [
  {
    icon: Store,
    title: 'Vendor Marketplace',
    description: 'Browse thousands of verified vendors for photography, catering, decor & more.',
    color: '#FF5B04',
    bg: '#FF5B04/10',
    link: '/customer/global-vendors',
  },
  {
    icon: UserCheck,
    title: 'Event Planners',
    description: 'Hire certified event planners to manage your entire event end-to-end.',
    color: '#075056',
    bg: '#075056/10',
    link: '/customer/event-planners',
  },
  {
    icon: Package,
    title: 'Rental Services',
    description: 'Rent wedding wear, decor, lighting & accessories at affordable prices.',
    color: '#FF5B04',
    bg: '#FF5B04/10',
    link: '/customer/rental-services',
  },
  {
    icon: Users,
    title: 'Guest Management',
    description: 'Manage invitations, RSVPs, seating and QR-based event entry seamlessly.',
    color: '#075056',
    bg: '#075056/10',
    link: '/customer/global-guests',
  },
  {
    icon: FileText,
    title: 'Digital Agreements',
    description: 'Create, sign and manage vendor contracts digitally with full legal protection.',
    color: '#FF5B04',
    bg: '#FF5B04/10',
    link: '/customer/agreements-new',
  },
  {
    icon: CreditCard,
    title: 'Milestone Payments',
    description: 'Pay vendors in milestones with full deposit protection and refund policies.',
    color: '#075056',
    bg: '#075056/10',
    link: '/customer/payments',
  },
  {
    icon: Mail,
    title: 'Event Invitations',
    description: 'Design beautiful digital invitations and send them to your guest list instantly.',
    color: '#FF5B04',
    bg: '#FF5B04/10',
    link: '/customer/invitations',
  },
  {
    icon: Calendar,
    title: 'Event Timeline',
    description: 'Plan and track every task and milestone in your event execution timeline.',
    color: '#075056',
    bg: '#075056/10',
    link: '/customer/events',
  },
];

export const ServicesSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => slider.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#E4EEF0]/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-2">Our Services</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A]">
              From Idea to{' '}
              <span className="text-[#FF5B04]">Celebration</span>{' '}
              in Real Steps
            </h2>
          </motion.div>

          {/* Arrow controls */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-[#16232A] text-[#16232A] hover:bg-[#16232A] hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-[260px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#FF5B04]/20 transition-all group cursor-pointer hover:-translate-y-1"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="h-6 w-6" style={{ color: service.color }} />
              </div>
              <h3 className="font-bold text-[#16232A] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
              <Link
                to={service.link}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: service.color }}
              >
                Learn More
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden justify-center gap-3 mt-4">
          <button onClick={() => scroll('left')} disabled={!canScrollLeft}
            className="h-9 w-9 rounded-full border-2 border-[#16232A] flex items-center justify-center disabled:opacity-30">
            <ChevronLeft className="h-4 w-4 text-[#16232A]" />
          </button>
          <button onClick={() => scroll('right')} disabled={!canScrollRight}
            className="h-9 w-9 rounded-full border-2 border-[#FF5B04] flex items-center justify-center disabled:opacity-30">
            <ChevronRight className="h-4 w-4 text-[#FF5B04]" />
          </button>
        </div>
      </div>
    </section>
  );
};
