import React from 'react';
import { Link } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { BackButton } from '../components/BackButton';
import { Users, Briefcase, Shield, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginEntry: React.FC = () => {
  const loginOptions = [
    {
      id: 'customer',
      title: 'Login as Customer',
      description: 'Plan and manage your events',
      details: 'Access your event dashboard, find vendors, and manage bookings',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      route: '/login'
    },
    {
      id: 'business',
      title: 'Login as a Business',
      description: 'Manage your event services',
      details: 'Access vendor dashboard, manage bids, and grow your business',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      route: '/business/login'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Platform management',
      details: 'Manage users, vendors, and platform operations',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-500',
      route: '/admin/login'
    },
    {
      id: 'super-admin',
      title: 'Super Admin',
      description: 'Full system control',
      details: 'Complete access to all platform features and settings',
      icon: Crown,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-500',
      route: '/super-admin/login'
    }
  ];

  return (
    <AuthLayout
      title="Welcome to EventFlow"
      subtitle="Select how you want to access the platform"
    >
      <div className="mb-6">
        <BackButton to="/" />
      </div>
      
      <div className="space-y-3">
        {loginOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={option.route}>
              <button
                className={`
                  w-full p-5 rounded-xl border-2 transition-all
                  border-gray-200 ${option.hoverBorder} bg-white hover:${option.bgColor}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    h-14 w-14 rounded-lg bg-gradient-to-br ${option.color} 
                    flex items-center justify-center flex-shrink-0
                  `}>
                    <option.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{option.description}</p>
                    <p className="text-xs text-gray-500">{option.details}</p>
                  </div>
                </div>
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 text-center">
        <p className="text-gray-500 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gray-900 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};