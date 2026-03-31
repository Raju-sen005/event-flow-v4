import React from 'react';
import { motion } from 'motion/react';
import {
  Gavel, FileText, CreditCard, QrCode, Shield, AlertTriangle,
  CheckCircle, Calendar, Users, BarChart3, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';

const features = [
  {
    icon: Gavel,
    title: 'Smart Bidding & Negotiation',
    description: 'Post requirements and receive competitive bids. Negotiate directly with vendors for the best deal.',
    color: '#FF5B04',
  },
  {
    icon: FileText,
    title: 'Digital Agreements',
    description: 'Create, customize and sign legally binding contracts digitally. All agreements stored securely.',
    color: '#075056',
  },
  {
    icon: CreditCard,
    title: 'Milestone Payments',
    description: 'Pay in structured milestones. Funds released only on task completion, ensuring vendor accountability.',
    color: '#FF5B04',
  },
  {
    icon: QrCode,
    title: 'Guest QR Entry',
    description: 'Generate unique QR codes for guests. Track attendance in real-time with GPS verification.',
    color: '#075056',
  },
  {
    icon: Shield,
    title: 'Deposit Protection',
    description: 'Your deposits are held securely in escrow and fully refundable as per our clear refund policy.',
    color: '#FF5B04',
  },
  {
    icon: AlertTriangle,
    title: 'Dispute Resolution',
    description: 'Fair and transparent dispute resolution with admin mediation for any vendor disagreements.',
    color: '#075056',
  },
];

// Dashboard illustration component
const DashboardIllustration: React.FC = () => (
  <div className="relative w-full max-w-[440px]">
    {/* Glow */}
    <div className="absolute inset-0 bg-[#075056]/20 rounded-3xl blur-3xl" />

    <div className="relative bg-[#1a2d38] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#16232A] border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-[#FF5B04] rounded-lg flex items-center justify-center">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white">GoGatherHub OS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/50">Live</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Feature status grid */}
        {[
          { name: 'Smart Bidding', status: 'Active', count: '12 bids', icon: Gavel, color: '#FF5B04' },
          { name: 'Digital Agreements', status: 'Signed', count: '3 contracts', icon: FileText, color: '#075056' },
          { name: 'Milestone Payments', status: 'On Track', count: '₹1.2L secured', icon: CreditCard, color: '#FF5B04' },
          { name: 'Guest QR Entry', status: 'Ready', count: '280 guests', icon: QrCode, color: '#075056' },
          { name: 'Deposit Protection', status: 'Active', count: '₹45K in escrow', icon: Shield, color: '#FF5B04' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon className="h-4 w-4" style={{ color: item.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white/80">{item.name}</div>
              <div className="text-[10px] text-white/40">{item.count}</div>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-green-400/20 text-green-400 rounded-full whitespace-nowrap">
              {item.status}
            </span>
          </div>
        ))}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
          {[
            { label: 'Tasks Done', value: '24/28', color: '#FF5B04' },
            { label: 'Budget', value: '72%', color: '#075056' },
            { label: 'Days Left', value: '14', color: '#FF5B04' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[9px] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating badge */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute -top-3 -right-3 bg-[#FF5B04] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
    >
      Complete Event OS
    </motion.div>
  </div>
);

export const PlatformFeatures: React.FC = () => {
  return (
    <section id="platform-features" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-3">Platform</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A] mb-3">
            Not Just a Marketplace.{' '}
            <span className="text-[#FF5B04]">A Complete Event OS.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every tool you need to plan, manage and execute your perfect event — all under one roof.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Dashboard illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <DashboardIllustration />
          </motion.div>

          {/* Right: Feature grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-[#FF5B04]/30 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                </div>
                <h3 className="font-bold text-[#16232A] text-sm mb-1.5">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5B04] text-white font-semibold rounded-xl hover:bg-[#FF5B04]/90 transition-all shadow-lg shadow-[#FF5B04]/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore All Features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
