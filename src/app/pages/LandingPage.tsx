import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { DemoLoginModal } from '../components/DemoLoginModal';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BarChart3,
  Globe,
  Lock,
  Headphones
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithLinkedIn } = useAuth();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/role-selection');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithLinkedIn();
      navigate('/role-selection');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { 
      icon: Calendar, 
      title: 'Smart Planning',
      description: 'AI-powered event planning that adapts to your needs'
    },
    { 
      icon: Users, 
      title: 'Vendor Network',
      description: 'Connect with verified, top-rated vendors instantly'
    },
    { 
      icon: Sparkles, 
      title: 'Experience Builder',
      description: 'Create unforgettable moments with our tools'
    },
    { 
      icon: BarChart3, 
      title: 'Analytics',
      description: 'Track performance and optimize your events'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Events Planned', growth: '+127%' },
    { value: '5,000+', label: 'Active Vendors', growth: '+89%' },
    { value: '50,000+', label: 'Happy Customers', growth: '+234%' },
    { value: '4.9/5', label: 'Average Rating', growth: '98% Satisfaction' }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast Setup',
      description: 'Get your event up and running in minutes, not hours. Our streamlined process eliminates complexity.'
    },
    {
      icon: Shield,
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
      icon: TrendingUp,
      title: 'Real-Time Insights',
      description: 'Live dashboards and analytics help you make data-driven decisions for better outcomes.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock expert support ensures your events run smoothly without interruption.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 bg-[#FF5B04] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#16232A]">EventFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium">
                Solutions
              </a>
              <a href="#benefits" className="text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium">
                Benefits
              </a>
              <a href="#pricing" className="text-[#16232A] hover:text-[#FF5B04] transition-colors font-medium">
                Pricing
              </a>
              <Link to="/login-entry">
                <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/business/login">
                <Button variant="outline" className="border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white font-medium">
                  Login as a Business
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-medium transition-all shadow-sm">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
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
              className="md:hidden py-4 space-y-3 border-t border-gray-200"
            >
              <a href="#features" className="block px-3 py-2 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50">
                Solutions
              </a>
              <a href="#benefits" className="block px-3 py-2 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50">
                Benefits
              </a>
              <a href="#pricing" className="block px-3 py-2 text-[#16232A] hover:text-[#FF5B04] font-medium rounded-lg hover:bg-gray-50">
                Pricing
              </a>
              <Link to="/login-entry" className="block">
                <Button variant="ghost" className="w-full justify-start font-medium text-[#16232A]">
                  Login
                </Button>
              </Link>
              <Link to="/business/login" className="block">
                <Button variant="outline" className="w-full justify-start border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white font-medium">
                  Login as a Business
                </Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 font-medium text-white">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#16232A] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#075056] rounded-full">
                <Star className="h-4 w-4 text-[#FF5B04] fill-[#FF5B04]" />
                <span className="text-sm font-medium text-white">Trusted by 50,000+ Event Planners</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Plan Events</span>
              <br />
              <span className="text-[#FF5B04]">Better & Faster</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              The all-in-one event management platform that connects you with top vendors, 
              streamlines planning, and delivers unforgettable experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <Link to="/signup">
                <Button size="lg" className="h-14 px-8 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-lg font-semibold transition-all shadow-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="h-14 px-8 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-[#16232A] font-semibold transition-all"
              >
                Try Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#075056]" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#075056]" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#075056]" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#E4EEF0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-[#FF5B04] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#16232A] font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-[#075056] font-medium">{stat.growth}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-[#E4EEF0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wide">Features</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-[#16232A] mt-4 mb-4"
            >
              Everything You Need to{' '}
              <span className="text-[#075056]">
                Succeed
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#16232A]/70 max-w-2xl mx-auto"
            >
              Powerful tools designed to make event planning effortless and effective
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-[#FF5B04]/20 transition-all border border-[#075056]/10 group hover:-translate-y-1"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-[#FF5B04]/10 to-[#075056]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-[#FF5B04]" />
                </div>
                <h3 className="text-xl font-bold text-[#16232A] mb-3">{feature.title}</h3>
                <p className="text-[#16232A]/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark */}
      <section id="benefits" className="py-20 px-4 bg-[#16232A] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF5B04] rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#075056] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-sm font-semibold text-[#FF5B04] uppercase tracking-wide">Benefits</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-4"
            >
              Why Event Planners{' '}
              <span className="text-[#FF5B04]">
                Choose Us
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Built for modern teams who demand excellence in every detail
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-[#075056]/20 hover:bg-white/10 hover:border-[#FF5B04]/40 transition-all group"
              >
                <div className="h-12 w-12 bg-[#FF5B04] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#FF5B04] to-[#075056] rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-[#FF5B04]/30 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to Transform Your Events?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of event planners creating extraordinary experiences with EventFlow
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/signup">
                  <Button size="lg" className="h-14 px-8 bg-white text-[#FF5B04] hover:bg-[#E4EEF0] text-lg font-semibold shadow-xl">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="h-14 px-8 bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Book a Demo
                </button>
              </div>
              <p className="text-white/80 text-sm pt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16232A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 bg-[#FF5B04] rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EventFlow</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                The modern event management platform trusted by thousands of planners worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF5B04] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF5B04] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF5B04] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-[#FF5B04] transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-[#FF5B04] transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#FF5B04] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; 2025 EventFlow. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Status</a>
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Security</a>
              <a href="#" className="hover:text-[#FF5B04] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      <DemoLoginModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
};