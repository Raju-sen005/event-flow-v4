import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { BackButton } from '../components/BackButton';
import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';

export const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    productUpdates: true,
    marketingEmails: false
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    navigate('/onboarding-complete');
  };

  const notificationOptions = [
    {
      key: 'emailNotifications' as const,
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive updates about your events and bookings'
    },
    {
      key: 'smsNotifications' as const,
      icon: MessageSquare,
      title: 'SMS Notifications',
      description: 'Get text messages for urgent updates'
    },
    {
      key: 'eventReminders' as const,
      icon: Calendar,
      title: 'Event Reminders',
      description: 'Reminders about upcoming events and tasks'
    },
    {
      key: 'productUpdates' as const,
      icon: Bell,
      title: 'Product Updates',
      description: 'Learn about new features and improvements'
    },
    {
      key: 'marketingEmails' as const,
      icon: Mail,
      title: 'Marketing Emails',
      description: 'Tips, guides, and special offers'
    }
  ];

  return (
    <AuthLayout title="Notification Preferences" subtitle="Choose how you want to stay updated">
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          {notificationOptions.map(({ key, icon: Icon, title, description }) => (
            <div key={key} className="flex items-start justify-between p-4 rounded-lg border hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <Label className="cursor-pointer">{title}</Label>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
              <Switch
                checked={preferences[key]}
                onCheckedChange={() => handleToggle(key)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            Save Preferences
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding-complete')}
            className="w-full"
          >
            Skip
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};