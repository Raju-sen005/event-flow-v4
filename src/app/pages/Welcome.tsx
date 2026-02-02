import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Calendar, Users, Sparkles, ArrowRight } from 'lucide-react';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { DemoLoginModal } from '../components/DemoLoginModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export const Welcome: React.FC = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle, loginWithLinkedIn } = useAuth();
  const navigate = useNavigate();

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
    { icon: Calendar, text: 'Plan & manage events effortlessly' },
    { icon: Users, text: 'Connect with top vendors' },
    { icon: Sparkles, text: 'Create unforgettable experiences' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Logo - Text Only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex flex-col items-center gap-2">
            <h1 className="text-gray-900 text-4xl font-bold">EventFlow</h1>
            <p className="text-gray-500 text-lg">Event & Guest Management Platform</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-gray-900 text-5xl font-bold mb-6 leading-tight">
                Create Memorable Events With Ease
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're planning a wedding, corporate event, or celebration, 
                EventFlow connects you with the best vendors and tools to bring your vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Authentication Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-12"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-gray-900 text-3xl font-bold mb-3">Get Started</h3>
                <p className="text-gray-500 text-base">Join thousands of event planners</p>
              </div>

              <div className="space-y-4">
                <Link to="/signup">
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-md text-base font-medium">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-400">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-14 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                <button
                  onClick={handleLinkedInLogin}
                  disabled={isLoading}
                  className="w-full h-14 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <svg className="h-5 w-5" fill="#0077B5" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with LinkedIn</span>
                </button>
              </div>

              <div className="pt-4">
                <div className="text-center space-y-4">
                  <p className="text-gray-500">Already have an account?</p>
                  <Link to="/login">
                    <Button variant="outline" className="w-full h-14 rounded-xl border-gray-300 hover:bg-gray-50 font-medium">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Try Demo →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DemoLoginModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
};