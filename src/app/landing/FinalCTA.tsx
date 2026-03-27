import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Store, UserCheck } from 'lucide-react';
import { Link } from 'react-router';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#16232A] via-[#0f1d24] to-[#075056] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#FF5B04]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#075056]/20 rounded-full blur-3xl" />
        {/* Stars/dots */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="stars" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" />
              <circle cx="5" cy="5" r="0.5" fill="white" />
              <circle cx="55" cy="55" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5B04]/20 border border-[#FF5B04]/30 rounded-full text-[#FF5B04] text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Start Your Journey Today
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Plan Something{' '}
            <span className="text-[#FF5B04]">Unforgettable?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg mb-10 leading-relaxed"
          >
            Join thousands of event planners who trust EventFlow to create magical experiences. 
            Start free — no credit card required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-10"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-bold rounded-xl transition-all shadow-2xl shadow-[#FF5B04]/30 hover:shadow-3xl hover:-translate-y-1 text-base"
            >
              <Sparkles className="h-5 w-5" />
              Start Planning Your Event
            </Link>
            <Link
              to="/customer/global-vendors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all text-base"
            >
              <Store className="h-5 w-5" />
              Browse Vendors
            </Link>
            <Link
              to="/business/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#075056] hover:bg-[#075056]/90 border border-[#075056] text-white font-semibold rounded-xl transition-all text-base"
            >
              <UserCheck className="h-5 w-5" />
              Join as Vendor
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm"
          >
            <span>✓ Free to sign up</span>
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 48K+ verified vendors</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
