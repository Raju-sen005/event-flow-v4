import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { EventSearchModal } from '../components/EventSearchModal';
import { DemoSelectionModal } from '../components/DemoSelectionModal';
import { BusinessLoginModal } from '../components/BusinessLoginModal';
import { 
  Calendar, 
  Search, 
  Star, 
  ArrowRight,
  Heart,
  Cake,
  Briefcase,
  GraduationCap,
  PartyPopper,
  Users,
  CheckCircle,
  Shield,
  Clock,
  Menu,
  X,
  Quote,
  Baby,
  HomeIcon,
  Zap,
  Network,
  Wand2,
  BarChart3,
  Rocket,
  Lock,
  Target,
  Globe,
  Activity,
  Headphones
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showBusinessLoginModal, setShowBusinessLoginModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(true);
    }
  };

  // Smooth scroll handler for anchor links
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  const popularSearches = [
    { label: 'Wedding', icon: Heart },
    { label: 'Birthday Party', icon: Cake },
    { label: 'Corporate Event', icon: Briefcase },
    { label: 'Engagement', icon: PartyPopper },
    { label: 'Baby Shower', icon: Baby },
    { label: 'Anniversary', icon: HomeIcon }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Bride',
      company: 'Wedding in Mumbai',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjE4MjYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'EventFlow made finding vendors so easy! I found an amazing photographer and decorator within minutes. The platform is simple and the vendors are all verified professionals.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Corporate Event Manager',
      company: 'Tech Solutions Pvt Ltd',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjE4MjYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'As someone who organizes multiple corporate events, EventFlow has become my go-to platform. Quick search, quality vendors, and transparent pricing. Highly recommended!'
    },
    {
      name: 'Anjali Reddy',
      role: 'Event Planner',
      company: 'Dream Events Bangalore',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjE4MjYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'The platform connects me with reliable vendors in seconds. The review system and verified badges give me confidence. My clients love the smooth process!'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Happy Customers', icon: Users },
    { value: '8,000+', label: 'Verified Vendors', icon: CheckCircle },
    { value: '25,000+', label: 'Events Completed', icon: Calendar },
    { value: '4.9/5', label: 'Average Rating', icon: Star }
  ];

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 bg-[#FF5B04] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#16232A]">EventFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <a 
                href="#how-it-works" 
                onClick={(e) => handleScrollToSection(e, 'how-it-works')}
                className="px-4 py-2 text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium rounded-lg hover:bg-gray-50"
              >
                How It Works
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleScrollToSection(e, 'features')}
                className="px-4 py-2 text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium rounded-lg hover:bg-gray-50"
              >
                Features
              </a>
              <a 
                href="#benefits" 
                onClick={(e) => handleScrollToSection(e, 'benefits')}
                className="px-4 py-2 text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium rounded-lg hover:bg-gray-50"
              >
                Benefits
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleScrollToSection(e, 'testimonials')}
                className="px-4 py-2 text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium rounded-lg hover:bg-gray-50"
              >
                Testimonials
              </a>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-[#16232A] font-medium hover:bg-gray-50"
                onClick={() => setShowDemoModal(true)}
              >
                Sign Up
              </Button>
              <Button 
                className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold shadow-sm hover:shadow-md transition-all"
                onClick={() => setShowBusinessLoginModal(true)}
              >
                Login as a Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#16232A]" />
              ) : (
                <Menu className="h-6 w-6 text-[#16232A]" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden py-4 space-y-2 border-t border-gray-200"
            >
              <a 
                href="#how-it-works" 
                onClick={(e) => handleScrollToSection(e, 'how-it-works')}
                className="block px-4 py-2.5 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleScrollToSection(e, 'features')}
                className="block px-4 py-2.5 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Features
              </a>
              <a 
                href="#benefits" 
                onClick={(e) => handleScrollToSection(e, 'benefits')}
                className="block px-4 py-2.5 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Benefits
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleScrollToSection(e, 'testimonials')}
                className="block px-4 py-2.5 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Testimonials
              </a>
              <div className="pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white font-medium"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowDemoModal(true);
                  }}
                >
                  Sign Up
                </Button>
                <Button 
                  className="w-full justify-center bg-[#FF5B04] hover:bg-[#FF5B04]/90 font-semibold text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowBusinessLoginModal(true);
                  }}
                >
                  Login as a Business
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section with Search - Light Theme */}
      <section className="pt-28 pb-24 px-6 bg-gradient-to-b from-white via-[#E4EEF0]/20 to-white relative overflow-hidden">
        {/* Enhanced Light Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Soft gradient orbs */}
          <div className="absolute top-32 right-[15%] h-[500px] w-[500px] bg-[#FF5B04]/[0.04] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-[10%] h-[600px] w-[600px] bg-[#075056]/[0.05] rounded-full blur-3xl"></div>
          
          {/* Geometric shapes - light & subtle */}
          <div className="absolute top-40 left-[20%] h-32 w-32 border border-gray-200/50 rounded-2xl rotate-12"></div>
          <div className="absolute bottom-40 right-[25%] h-24 w-24 border border-gray-200/50 rounded-xl -rotate-12"></div>
          <div className="absolute top-[60%] right-[15%] h-20 w-20 border border-gray-200/40 rounded-lg rotate-45"></div>
          
          {/* Dotted pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-light" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#16232A"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-light)" />
          </svg>
          
          {/* Minimal line grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-light" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#16232A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-light)" />
          </svg>

          {/* Diagonal accent lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-[10%] h-full w-px bg-gradient-to-b from-transparent via-gray-200/40 to-transparent"></div>
            <div className="absolute top-0 left-[30%] h-full w-px bg-gradient-to-b from-transparent via-gray-200/30 to-transparent"></div>
            <div className="absolute top-0 right-[25%] h-full w-px bg-gradient-to-b from-transparent via-gray-200/40 to-transparent"></div>
            <div className="absolute top-0 right-[10%] h-full w-px bg-gradient-to-b from-transparent via-gray-200/30 to-transparent"></div>
          </div>

          {/* Additional box shapes for depth */}
          <div className="absolute top-[25%] right-[35%] h-16 w-16 border border-gray-200/40 rounded-lg rotate-45"></div>
          <div className="absolute bottom-[30%] left-[40%] h-12 w-12 border border-gray-200/40 rounded-md -rotate-12"></div>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.15] text-[#16232A] mb-6">
                Find <span className="text-[#FF5B04]">Perfect Vendors</span><br />for Your Next Event
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with verified professionals instantly
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8"
            >
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#FF5B04] transition-colors z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events like Wedding, Birthday Party, Corporate Event..."
                    className="w-full h-16 pl-14 pr-32 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-base text-[#16232A] placeholder:text-gray-400 shadow-lg hover:shadow-xl focus:shadow-xl"
                  />
                  <Button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-7 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Event Category Buttons - No Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-14"
            >
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(item.label)}
                    className="group flex items-center gap-1.5 px-4 py-2 bg-white/80 border border-gray-200 hover:border-[#FF5B04] hover:bg-white rounded-xl transition-all text-xs font-medium text-gray-700 hover:text-[#FF5B04] shadow-sm hover:shadow-md"
                  >
                    <item.icon className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#FF5B04] transition-colors" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-10 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#075056]" />
                <span>Verified vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#075056]" />
                <span>Secure platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#075056]" />
                <span>Quick responses</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-[#16232A]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-[#FF5B04]/10 rounded-xl mb-4">
                  <stat.icon className="h-8 w-8 text-[#FF5B04]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 font-medium text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#16232A] mb-5">
                How <span className="text-[#FF5B04]">It Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to find your perfect vendor
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                step: '01',
                title: 'Search for what you need',
                description: 'Type in the vendor category you\'re looking for - photographer, caterer, decorator, or any other service. Get instant results from verified professionals.'
              },
              {
                icon: CheckCircle,
                step: '02',
                title: 'Answer a few quick questions',
                description: 'Tell us your event date, budget, and preferences through our simple 3-step form. We\'ll match you with vendors that fit your exact requirements.'
              },
              {
                icon: Users,
                step: '03',
                title: 'Browse and connect',
                description: 'View matched vendors with ratings, portfolios, and pricing. Compare options and connect directly with your favorites. Login only when you\'re ready to book.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#FF5B04]/20 hover:shadow-xl transition-all"
              >
                {/* Connecting line (desktop only) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[#FF5B04]/30 to-transparent -translate-y-1/2 z-0" />
                )}

                {/* Step Number Background */}
                <div className="text-[140px] font-black text-[#E4EEF0] absolute -top-10 -left-6 -z-10 leading-none">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="relative h-20 w-20 bg-gradient-to-br from-[#FF5B04]/10 to-[#075056]/10 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <div className="absolute inset-0 bg-[#FF5B04]/5 rounded-2xl blur-xl"></div>
                  <item.icon className="relative h-10 w-10 text-[#FF5B04]" />
                </div>

                <h3 className="text-2xl font-bold text-[#16232A] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-[#E4EEF0]/30 to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#16232A] mb-5">
                Everything You Need to <span className="text-[#FF5B04]">Succeed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful tools designed to make event planning effortless and effective
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Smart Planning',
                description: 'AI-powered event planning that adapts to your needs'
              },
              {
                icon: Network,
                title: 'Vendor Network',
                description: 'Connect with verified, top-rated vendors instantly'
              },
              {
                icon: Wand2,
                title: 'Experience Builder',
                description: 'Create unforgettable moments with our tools'
              },
              {
                icon: BarChart3,
                title: 'Analytics',
                description: 'Track performance and optimize your events'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#FF5B04]/30 hover:shadow-xl transition-all group"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-[#FF5B04]/10 to-[#075056]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-[#FF5B04]" />
                </div>
                <h3 className="text-xl font-bold text-[#16232A] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark Theme */}
      <section id="benefits" className="py-24 px-6 bg-gradient-to-br from-[#16232A] via-[#16232A] to-[#075056] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 h-96 w-96 bg-[#FF5B04] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-96 w-96 bg-[#075056] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                Why Event Planners <span className="text-[#FF5B04]">Choose Us</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Built for modern teams who demand excellence in every detail
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Rocket,
                title: 'Lightning Fast Setup',
                description: 'Get your event up and running in minutes, not hours. Our streamlined process eliminates complexity.'
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                description: 'Bank-level encryption and compliance ensure your data and payments are always protected.'
              },
              {
                icon: Target,
                title: 'Precision Matching',
                description: 'Our AI matches you with the perfect vendors based on your specific requirements and budget.'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Access vendors and services worldwide. Plan events anywhere with our international network.'
              },
              {
                icon: Activity,
                title: 'Real-Time Insights',
                description: 'Live dashboards and analytics help you make data-driven decisions for better outcomes.'
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                description: 'Round-the-clock expert support ensures your events run smoothly without interruption.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/10 hover:border-[#FF5B04]/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 bg-[#FF5B04]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5B04]/30 group-hover:scale-110 transition-all">
                    <benefit.icon className="h-7 w-7 text-[#FF5B04]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-[#E4EEF0]/30">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#16232A] mb-5">
                Trusted by <span className="text-[#FF5B04]">thousands</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what our customers say about their experience with EventFlow
              </p>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#FF5B04]/20 hover:shadow-2xl transition-all"
              >
                {/* Quote icon */}
                <div className="h-12 w-12 bg-[#FF5B04]/10 rounded-xl flex items-center justify-center mb-5">
                  <Quote className="h-6 w-6 text-[#FF5B04]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FF5B04] fill-[#FF5B04]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                  <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#16232A]">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    {testimonial.company && (
                      <div className="text-xs text-gray-500">{testimonial.company}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#16232A] via-[#16232A] to-[#075056] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 h-64 w-64 bg-[#FF5B04] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-64 w-64 bg-[#075056] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to find your <span className="text-[#FF5B04]">perfect vendor?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands who trust EventFlow to connect them with the best event professionals
            </p>

            <div className="flex flex-wrap gap-5 justify-center pt-6">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                size="lg"
                className="h-14 px-10 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-lg font-bold shadow-2xl hover:shadow-[#FF5B04]/20 transition-all"
              >
                Search Now
                <Search className="ml-2.5 h-5 w-5" />
              </Button>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-white text-[#16232A] hover:bg-gray-100 text-lg font-bold shadow-2xl transition-all"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-white/70">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-[#FF5B04]" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-[#FF5B04]" />
                <span className="font-medium">Free to browse</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-[#FF5B04]" />
                <span className="font-medium">Instant results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16232A] text-white py-20 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-10 w-10 bg-[#FF5B04] rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold">EventFlow</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
                India's trusted event vendor marketplace. Connect with verified professionals for all your event needs.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gray-700 border-2 border-[#16232A]"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-white">50,000+ users</div>
                  <div className="text-gray-400">Join the community</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white">For Customers</h4>
              <ul className="space-y-3.5 text-gray-400">
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Find Vendors</a></li>
                <li><a href="#how-it-works" className="hover:text-[#FF5B04] transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-[#FF5B04] transition-colors">Testimonials</a></li>
                <li><Link to="/signup" className="hover:text-[#FF5B04] transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white">For Vendors</h4>
              <ul className="space-y-3.5 text-gray-400">
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Become a Vendor</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Vendor Benefits</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Success Stories</a></li>
                <li><Link to="/signup" className="hover:text-[#FF5B04] transition-colors">Join Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white">Company</h4>
              <ul className="space-y-3.5 text-gray-400">
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">&copy; 2025 EventFlow. All rights reserved.</p>
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Status</a>
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Security</a>
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      <EventSearchModal 
        open={showSearchModal} 
        onOpenChange={setShowSearchModal}
        eventType={searchQuery}
      />

      {/* Demo Selection Modal */}
      <DemoSelectionModal 
        open={showDemoModal} 
        onOpenChange={setShowDemoModal}
      />

      {/* Business Login Modal */}
      <BusinessLoginModal 
        open={showBusinessLoginModal} 
        onOpenChange={setShowBusinessLoginModal}
      />
    </div>
  );
};