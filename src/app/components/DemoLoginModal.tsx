import React from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Users, Briefcase, Shield, Crown, Calendar } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

interface DemoLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoLoginModal: React.FC<DemoLoginModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const handleDemoLogin = (role: UserRole) => {
    demoLogin(role);
    onOpenChange(false);
    
    // Navigate to appropriate dashboard
    const dashboardRoutes = {
      customer: '/customer/dashboard',
      vendor: '/vendor/dashboard',
      planner: '/planner/dashboard',
      admin: '/admin/dashboard',
      'super-admin': '/admin/dashboard'
    };
    
    navigate(dashboardRoutes[role]);
  };

  const demoOptions = [
    {
      role: 'customer' as UserRole,
      title: 'Customer Demo',
      description: 'Explore event planning features',
      icon: Users,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      role: 'vendor' as UserRole,
      title: 'Vendor Demo',
      description: 'Manage services and bids',
      icon: Briefcase,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    {
      role: 'planner' as UserRole,
      title: 'Event Planner Demo',
      description: 'Plan and coordinate events',
      icon: Calendar,
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200'
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin Demo',
      description: 'Platform management tools',
      icon: Shield,
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      role: 'super-admin' as UserRole,
      title: 'Super Admin Demo',
      description: 'Full system control',
      icon: Crown,
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Try Demo Mode</DialogTitle>
          <DialogDescription>
            Select a role to explore the platform without signing up. Demo data will be automatically loaded.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          {demoOptions.map(({ role, title, description, icon: Icon, color }) => (
            <Button
              key={role}
              variant="outline"
              className={`h-auto p-4 justify-start ${color} border-2 transition-all`}
              onClick={() => handleDemoLogin(role)}
            >
              <div className="flex items-start gap-4 w-full">
                <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold">{title}</div>
                  <div className="text-sm text-gray-600 mt-1">{description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-2">
          Demo accounts use sample data and reset after each session
        </div>
      </DialogContent>
    </Dialog>
  );
};