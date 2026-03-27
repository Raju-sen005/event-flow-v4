import React from 'react';
import { motion } from 'motion/react';
import {
  Lock, CheckCircle, FileText, RotateCcw, Eye, Shield, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'All payments are processed through PCI-DSS compliant gateways with end-to-end encryption. Your financial data is never stored on our servers.',
    color: '#FF5B04',
  },
  {
    icon: CheckCircle,
    title: 'Verified Vendors',
    description: 'Every vendor undergoes a thorough background check, document verification, and rating review before listing on our platform.',
    color: '#075056',
  },
  {
    icon: FileText,
    title: 'Contract Protection',
    description: 'Digital agreements with legally binding clauses protect both parties. Dispute resolution ensures fair outcomes for every contract.',
    color: '#FF5B04',
  },
  {
    icon: RotateCcw,
    title: 'Refund Policies',
    description: 'Clear, transparent refund policies with structured timelines. Deposits returned within 7 business days if vendors cancel.',
    color: '#075056',
  },
  {
    icon: Eye,
    title: 'Admin Monitoring',
    description: 'Dedicated admin team monitors all transactions, vendor activity, and dispute cases 24/7 to ensure platform integrity.',
    color: '#FF5B04',
  },
  {
    icon: Shield,
    title: 'Deposit Escrow',
    description: 'All deposits held in secure escrow accounts. Funds released only upon mutually agreed milestone completion.',
    color: '#075056',
  },
];

const trustBadges = [
  { label: 'SSL Encrypted', icon: Lock },
  { label: 'PCI Compliant', icon: Shield },
  { label: 'GDPR Ready', icon: Eye },
  { label: 'ISO Certified', icon: CheckCircle },
];

export const SecuritySection: React.FC = () => {
  return (
    <section className="py-24 bg-[#E4EEF0]/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wider mb-3">Trust & Safety</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#16232A] mb-4">
            Your Money. Your Trust.{' '}
            <span className="text-[#FF5B04]">Our Responsibility.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We've built enterprise-grade security and trust systems so you can plan your event with complete confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border-2 border-transparent hover:border-[#FF5B04]/20 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[#16232A] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-[#16232A] text-lg mb-1">Enterprise-Grade Security Standards</h3>
              <p className="text-gray-500 text-sm">Your data and transactions protected by industry-leading standards.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-[#E4EEF0]/50 rounded-full border border-[#075056]/20"
                >
                  <badge.icon className="h-4 w-4 text-[#075056]" />
                  <span className="text-sm font-semibold text-[#075056]">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
