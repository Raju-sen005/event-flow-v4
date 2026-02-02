import React from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { User, Shield, Crown, Briefcase, Calendar, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DemoSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoSelectionModal: React.FC<DemoSelectionModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const handleDemoSelection = (role: 'customer' | 'vendor' | 'planner' | 'admin' | 'super-admin', name: string) => {
    const dashboardRoutes = {
      customer: '/customer/dashboard',
      vendor: '/vendor/dashboard',
      planner: '/planner/dashboard',
      admin: '/admin/dashboard',
      'super-admin': '/admin/dashboard'
    };

    // Use demoLogin to set up the demo user properly
    demoLogin(role);
    onOpenChange(false);
    navigate(dashboardRoutes[role]);
  };

  const demoOptions = [
    {
      role: 'customer' as const,
      name: 'Customer',
      title: 'Demo as Customer',
      description: 'Explore event planning features',
      icon: User,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      role: 'vendor' as const,
      name: 'Vendor',
      title: 'Demo as Vendor',
      description: 'Manage services and bids',
      icon: Briefcase,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    },
    {
      role: 'planner' as const,
      name: 'Event Planner',
      title: 'Demo as Event Planner',
      description: 'Professional event planning agency',
      icon: Calendar,
      color: 'bg-[#075056]',
      hoverColor: 'hover:bg-[#075056]/90'
    },
    {
      role: 'planner' as const,
      name: 'Freelance Planner',
      title: 'Demo as Freelance Planner',
      description: 'Independent event planning professional',
      icon: Users,
      color: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700'
    },
    {
      role: 'admin' as const,
      name: 'Admin',
      title: 'Demo as Admin',
      description: 'Platform management tools',
      icon: Shield,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      role: 'super-admin' as const,
      name: 'Super Admin',
      title: 'Demo as Super Admin',
      description: 'Full system control',
      icon: Crown,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-[#E4EEF0] to-white sticky top-0 z-10">
          <DialogTitle className="text-2xl font-bold text-[#16232A]">
            Select Demo Experience
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Choose a role to explore the platform without signing up
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-3">
          {demoOptions.map((option, index) => (
            <button
              key={`${option.role}-${index}`}
              onClick={() => handleDemoSelection(option.role, option.name)}
              className="w-full group"
            >
              <div className={`${option.color} ${option.hoverColor} text-white rounded-xl p-5 transition-all shadow-md hover:shadow-xl flex items-center gap-4`}>
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">{option.title}</h3>
                  <p className="text-sm text-white/90">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 pb-6">
          <div className="text-xs text-center text-gray-500 mb-3">
            Demo accounts use sample data and reset after each session
          </div>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
