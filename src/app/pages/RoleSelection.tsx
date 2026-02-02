import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { BackButton } from '../components/BackButton';
import { useAuth, UserRole } from '../context/AuthContext';
import { Users, Briefcase, Shield, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'customer' as UserRole,
      title: 'Event Creator',
      description: 'Plan or manage events',
      details: 'Perfect for individuals or businesses planning weddings, birthdays, corporate events, and more.',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500'
    },
    {
      id: 'vendor' as UserRole,
      title: 'Service Provider',
      description: 'Provide event services',
      details: 'Ideal for vendors offering catering, photography, venues, decoration, and other event services.',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500'
    },
    {
      id: 'admin' as UserRole,
      title: 'Platform Manager',
      description: 'Manage platform (Internal)',
      details: 'For internal team members managing users, vendors, and platform operations.',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-500'
    }
  ];

  const handleContinue = () => {
    if (!selectedRole) return;
    
    setUserRole(selectedRole);
    
    // Navigate based on role
    if (selectedRole === 'customer') {
      navigate('/customer-onboarding');
    } else if (selectedRole === 'vendor') {
      navigate('/vendor-onboarding');
    } else {
      navigate('/admin-dashboard');
    }
  };

  return (
    <AuthLayout
      title="Welcome! Let's Get Started"
      subtitle="What do you want to do with EventFlow?"
    >
      <div className="mb-6">
        <BackButton to="/login" />
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedRole(role.id)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all
                  ${selectedRole === role.id
                    ? `${role.borderColor} border-opacity-100 ${role.bgColor}`
                    : `border-gray-200 ${role.hoverBorder} bg-white`
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    h-12 w-12 rounded-lg bg-gradient-to-br ${role.color} 
                    flex items-center justify-center flex-shrink-0
                  `}>
                    <role.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-gray-900">{role.title}</h3>
                      {selectedRole === role.id && (
                        <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                    <p className="text-xs text-gray-500">{role.details}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Continue
        </Button>

        <p className="text-xs text-gray-500 text-center">
          You can change your role later in settings
        </p>
      </div>
    </AuthLayout>
  );
};