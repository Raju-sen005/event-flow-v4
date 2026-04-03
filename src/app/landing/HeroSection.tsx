import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Search,
  ArrowRight,
  Star,
  Users,
  Building2,
  MapPin,
  TrendingUp,
  Calendar,
  CheckCircle,
  Shield,
  CreditCard,
  Bell,
  BarChart3,
  Clock,
} from "lucide-react";
import axios from "axios";

const statsData = [
  { value: "48K+", label: "Vendors Available", icon: Building2 },
  { value: "12K+", label: "Events Hosted", icon: Calendar },
  { value: "120+", label: "Cities Covered", icon: MapPin },
  { value: "4.9★", label: "Customer Rating", icon: Star },
];

// Dashboard Preview mockup component
const DashboardMockup: React.FC = () => (
  <div className="relative w-full max-w-[520px] mx-auto">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-[#FF5B04]/20 rounded-3xl blur-3xl scale-95 opacity-60" />

    {/* Main dashboard card */}
    <div className="relative bg-[#1e2f3a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Dashboard Header */}
      <div className="bg-[#16232A] border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-white/10 rounded-md h-5 mx-8 flex items-center px-2">
          <span className="text-white/40 text-[10px]">
            eventflow.app/customer/dashboard
          </span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 space-y-3">
        {/* Top metrics row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "Active Events",
              value: "3",
              color: "text-[#FF5B04]",
              bg: "bg-[#FF5B04]/10",
            },
            {
              label: "Vendors Hired",
              value: "12",
              color: "text-[#075056]",
              bg: "bg-[#075056]/10",
            },
            {
              label: "Budget Used",
              value: "68%",
              color: "text-green-400",
              bg: "bg-green-400/10",
            },
          ].map((m, i) => (
            <div key={i} className={`${m.bg} rounded-xl p-2.5`}>
              <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
              <div className="text-[10px] text-white/50 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Event card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-white">
              Rohan & Priya Wedding
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-[#FF5B04]/20 text-[#FF5B04] rounded-full font-medium">
              In Progress
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-3 w-3 text-white/40" />
            <span className="text-[10px] text-white/50">
              March 28, 2026 · Grand Hyatt, Mumbai
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-white/10 rounded-full">
            <div className="h-full w-3/4 bg-gradient-to-r from-[#FF5B04] to-[#075056] rounded-full" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-white/40">Progress</span>
            <span className="text-[9px] text-[#FF5B04] font-medium">75%</span>
          </div>
        </div>

        {/* Vendors list */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-white/40 font-medium uppercase tracking-wide">
            Active Vendors
          </div>
          {[
            {
              name: "Kapil Photography",
              cat: "Photography",
              status: "Confirmed",
              color: "bg-green-400",
            },
            {
              name: "Royal Caterers",
              cat: "Catering",
              status: "Pending",
              color: "bg-yellow-400",
            },
            {
              name: "Bloom Decorators",
              cat: "Decoration",
              status: "Confirmed",
              color: "bg-green-400",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${v.color}`} />
                <div>
                  <div className="text-[10px] font-medium text-white/80">
                    {v.name}
                  </div>
                  <div className="text-[9px] text-white/40">{v.cat}</div>
                </div>
              </div>
              <span className="text-[9px] text-white/50">{v.status}</span>
            </div>
          ))}
        </div>

        {/* Payment progress */}
        <div className="bg-gradient-to-r from-[#FF5B04]/10 to-[#075056]/10 border border-white/10 rounded-xl p-3 flex items-center gap-3">
          <div className="h-8 w-8 bg-[#FF5B04]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="h-4 w-4 text-[#FF5B04]" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-white/80">
              Payment Milestone 2
            </div>
            <div className="text-[9px] text-white/40">
              Due March 20 · ₹45,000
            </div>
          </div>
          <div className="text-[10px] font-semibold text-[#FF5B04]">Pay →</div>
        </div>
      </div>
    </div>

    {/* Floating notification card */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-4 -left-6 bg-white rounded-xl p-3 shadow-2xl border border-gray-100 flex items-center gap-2.5 min-w-[180px]"
    >
      <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <div className="text-[10px] font-semibold text-[#16232A]">
          Bid Accepted!
        </div>
        <div className="text-[9px] text-gray-400">
          Kapil Photography • ₹85,000
        </div>
      </div>
    </motion.div>

    {/* Floating rating card */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
      className="absolute -top-4 -right-4 bg-[#16232A] border border-white/20 rounded-xl p-2.5 shadow-xl"
    >
      <div className="flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5 text-[#FF5B04] fill-[#FF5B04]" />
        <span className="text-xs font-bold text-white">4.9</span>
        <span className="text-[9px] text-white/50">Rating</span>
      </div>
      <div className="text-[9px] text-white/40 mt-0.5">48,000+ vendors</div>
    </motion.div>
  </div>
);

export const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/signup");
    }
  };

  const quickSearches = [
    "Wedding",
    "Birthday Party",
    "Corporate Event",
    "Engagement",
    "Anniversary",
  ];

  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/category-list",
        );

        setCategories(res.data.data);
      } catch (err) {
        console.log("Category load error");
      }
    };

    fetchCategories();
  }, []);
  return (
    <section className="relative pt-16 min-h-screen bg-[#16232A] overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] h-[600px] w-[600px] bg-[#075056]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[5%] h-[500px] w-[500px] bg-[#FF5B04]/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + CTAs */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5B04]/15 border border-[#FF5B04]/30 rounded-full text-[#FF5B04] text-sm font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B04] animate-pulse" />
                  #1 Event Management Platform in India
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-5xl lg:text-[3.8rem] font-bold leading-[1.1] text-white">
                  Plan Every Detail of
                  <br />
                  Your{" "}
                  <span className="text-[#FF5B04] relative">
                    Perfect Event
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="4"
                      viewBox="0 0 300 4"
                    >
                      <path
                        d="M0 2 Q75 0 150 2 Q225 4 300 2"
                        stroke="#FF5B04"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.5"
                      />
                    </svg>
                  </span>
                  .
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white/60 leading-relaxed max-w-lg"
              >
                Discover vendors, hire planners, rent essentials, manage guests,
                and track payments — all in one powerful platform.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vendors, planners, rentals..."
                    className="w-full h-14 pl-12 pr-36 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/50 focus:border-[#FF5B04]/50 text-white placeholder:text-white/30 text-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-11 px-5 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-sm font-semibold rounded-lg transition-all"
                  >
                    Search
                  </button>
                </form>

                {/* Quick searches */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-white/40">Popular:</span>
                  {/* {quickSearches.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSearchQuery(q);
                        navigate("/signup");
                      }}
                      className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white/60 hover:text-white/80 transition-all"
                    >
                      {q}
                    </button>
                  ))} */}
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSearchQuery(cat.name); // 🔥 quickSearch jaisa behavior
                        navigate("/signup"); // 🔥 same action
                      }}
                      className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white/60 hover:text-white/80 transition-all"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/30 hover:shadow-xl hover:shadow-[#FF5B04]/40 hover:-translate-y-0.5"
                >
                  Start Planning Your Event
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/customer/global-vendors"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-xl transition-all"
                >
                  Browse Vendors
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { icon: CheckCircle, label: "Verified Vendors" },
                  { icon: Shield, label: "Secure Payments" },
                  { icon: Clock, label: "Quick Responses" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-white/50 text-xs"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#075056]" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 bg-[#FF5B04] py-6">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
