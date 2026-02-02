import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Calendar, Building, MapPin, Users, CheckCircle } from 'lucide-react';

export const PlannerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    yearsOfExperience: '',
    specializations: [] as string[],
  });

  const specializationOptions = [
    'Weddings',
    'Corporate Events',
    'Birthday Parties',
    'Conferences',
    'Product Launches',
    'Social Gatherings',
    'Destination Events',
    'Cultural Events'
  ];

  const handleSpecializationToggle = (spec: string) => {
    if (formData.specializations.includes(spec)) {
      setFormData({
        ...formData,
        specializations: formData.specializations.filter(s => s !== spec)
      });
    } else {
      setFormData({
        ...formData,
        specializations: [...formData.specializations, spec]
      });
    }
  };

  const handleSubmit = () => {
    completeOnboarding(formData);
    navigate('/planner/dashboard');
  };

  const canProceed = step === 1 
    ? formData.businessName && formData.contactPerson && formData.phone
    : formData.specializations.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4EEF0] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-[#075056] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Set up your event planning business</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-24 rounded-full ${step >= 1 ? 'bg-[#075056]' : 'bg-gray-200'}`} />
          <div className={`h-2 w-24 rounded-full ${step >= 2 ? 'bg-[#075056]' : 'bg-gray-200'}`} />
        </div>

        {/* Step 1: Business Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Business Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Elite Event Planning"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Contact Person *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Your Name"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Business Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address"
                  rows={2}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  City
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  State
                </label>
                <Input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Maharashtra"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-2">
                Years of Experience
              </label>
              <Input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                placeholder="5"
                min="0"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Specializations */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-[#16232A] mb-3">
                Select Your Specializations *
              </label>
              <p className="text-sm text-gray-600 mb-4">Choose the types of events you plan</p>
              <div className="grid grid-cols-2 gap-3">
                {specializationOptions.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.specializations.includes(spec)
                        ? 'border-[#075056] bg-[#075056]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#16232A]">{spec}</span>
                      {formData.specializations.includes(spec) && (
                        <CheckCircle className="h-5 w-5 text-[#075056]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={() => step === 1 ? setStep(2) : handleSubmit()}
            disabled={!canProceed}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {step === 1 ? 'Next' : 'Complete Setup'}
          </Button>
        </div>

        {/* Skip */}
        {step === 2 && (
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/planner/dashboard')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
