import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Building, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Settings</h1>
        <p className="text-[#16232A]/70">Manage your planner profile and preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#16232A] mb-6">Profile Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Business Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Elite Event Planning"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Contact Person
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Rajesh Kumar"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  defaultValue="contact@eliteeventplanning.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                rows={3}
                defaultValue="123 Business Park, Mumbai, Maharashtra 400001"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
