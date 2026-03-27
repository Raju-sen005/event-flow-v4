import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Store, Users, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const steps = [
  {
    step: '01',
    icon: Calendar,
    title: 'Create Your Event',
    description: 'Start by creating your event — add the date, venue, type, and estimated budget. Our smart system sets up your planning workspace instantly.',
    color: '#FF5B04',
    link: '/customer/events/create',
    features: ['Event type selection', 'Budget planning', 'Timeline setup'],
  },
  {
    step: '02',
    icon: Store,
    title: 'Choose Vendors or Hire a Planner',
    description: 'Browse verified vendors or hire a certified event planner. Post requirements, receive bids, compare options, and negotiate directly.',
    color: '#075056',
    link: '/customer/global-vendors',
    features: ['Smart bidding system', 'Vendor comparison', 'Direct negotiation'],
  },
  {
    step: '03',
    icon: Users,
    title: 'Manage Guests, Agreements & Rentals',
    description: 'Invite guests, track RSVPs, sign digital contracts, and rent everything you need — all from your event dashboard.',
    color: '#FF5B04',
    link: '/customer/global-guests',
    features: ['QR-based entry', 'Digital agreements', 'Rental services'],
  },
  {
    step: '04',
    icon: CreditCard,
    title: 'Track Payments & Execution',
    description: 'Pay vendors in milestones, monitor execution progress, and ensure everything runs smoothly on the big day.',
    color: '#075056',
    link: '/customer/payments',
    features: ['Milestone payments', 'Deposit protection', 'Real-time tracking'],
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-3">Simple Process</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A] mb-4">
            From Idea to Celebration in{' '}
            <span className="text-[#FF5B04]">Four Steps</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our streamlined workflow makes event planning effortless from start to finish.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0 translate-x-3" />
              )}

              <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-6 h-full hover:border-[#FF5B04]/30 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                {/* Step number watermark */}
                <div
                  className="absolute -top-4 -right-2 text-[80px] font-black opacity-5 leading-none select-none"
                  style={{ color: step.color }}
                >
                  {step.step}
                </div>

                {/* Step badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    Step {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <step.icon className="h-6 w-6" style={{ color: step.color }} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-[#16232A] mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {step.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: step.color }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={step.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:gap-2"
                  style={{ color: step.color }}
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-all" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#16232A] hover:bg-[#16232A]/90 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
