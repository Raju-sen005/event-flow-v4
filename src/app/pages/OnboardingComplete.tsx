import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const OnboardingComplete: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoToDashboard = () => {
    const dashboardRoutes = {
      customer: '/customer/dashboard',
      vendor: '/vendor-dashboard',
      admin: '/admin/dashboard',
      'super-admin': '/admin/dashboard'
    };
    
    navigate(dashboardRoutes[user?.role || 'customer']);
  };

  return (
    <AuthLayout>
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="h-24 w-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h1 className="text-gray-900">You're All Set!</h1>
          <p className="text-gray-600 text-lg">
            Welcome to EventFlow, {user?.name}! Your account is ready to use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 space-y-3"
        >
          <h3 className="text-gray-900">What's Next?</h3>
          <ul className="space-y-2 text-left text-gray-700">
            {user?.role === 'customer' && (
              <>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                  <span>Browse and connect with top vendors</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                  <span>Create your first event</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                  <span>Manage guest lists and invitations</span>
                </li>
              </>
            )}
            {user?.role === 'vendor' && (
              <>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full" />
                  <span>Complete your service profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full" />
                  <span>Upload your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full" />
                  <span>Start receiving booking requests</span>
                </li>
              </>
            )}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </AuthLayout>
  );
};