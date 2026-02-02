import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Lock, Globe, User, LogOut, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export const VendorSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Settings</h1>
        <p className="text-[#16232A]/70">Manage your account preferences and settings</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'preferences', label: 'Preferences', icon: Globe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#075056] text-[#075056]'
                    : 'border-transparent text-[#16232A]/70 hover:text-[#16232A]'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    'New requirement matching your profile',
                    'Bid status updates',
                    'New messages from customers',
                    'Event reminders',
                    'Payment confirmations',
                  ].map((item) => (
                    <label key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm text-[#16232A]">{item}</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-[#075056]" />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">Push Notifications</h3>
                <div className="space-y-3">
                  {[
                    'Urgent event updates',
                    'Agreement signatures required',
                    'Customer messages',
                  ].map((item) => (
                    <label key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm text-[#16232A]">{item}</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-[#075056]" />
                    </label>
                  ))}
                </div>
              </div>

              <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                  </div>
                  <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-[#16232A] mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-[#16232A]/70 mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-4">Language & Region</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">Language</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#16232A] mb-2">Timezone</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]">
                      <option>IST (India Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-[#16232A] mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2 text-[#16232A]"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};