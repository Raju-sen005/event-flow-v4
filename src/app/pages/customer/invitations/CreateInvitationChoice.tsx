import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { X, Palette, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type CreationMethod = 'template' | 'upload' | null;

export const CreateInvitationChoice: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<CreationMethod>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleContinue = () => {
    if (!selectedMethod) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    if (selectedMethod === 'template') {
      navigate(`/customer/invitations/${eventId}/templates`);
    } else {
      navigate(`/customer/invitations/${eventId}/upload`);
    }
  };

  const options = [
    {
      id: 'template' as const,
      icon: Palette,
      title: 'Use a Template',
      description: 'Choose from professionally designed templates and customize them to match your event',
      features: ['Editable content', 'Multiple styles', 'Quick customization'],
    },
    {
      id: 'upload' as const,
      icon: Upload,
      title: 'Upload My Own Invitation',
      description: 'Already have a design? Upload your custom invitation image, video, or card',
      features: ['Support for images & videos', 'PDF cards supported', 'Maintain your brand'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#E4EEF0] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/80 p-6 text-white relative">
          <button
            onClick={() => navigate(`/customer/invitations/${eventId}`)}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Create Your Invitation</h2>
          <p className="text-white/90">Choose how you want to create your invitation</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {options.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedMethod === option.id;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedMethod(option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-4 right-4 h-8 w-8 bg-[#FF5B04] rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="h-5 w-5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-[#FF5B04] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[#16232A] mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? 'bg-[#FF5B04]' : 'bg-gray-400'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end relative">
            <Button
              onClick={handleContinue}
              disabled={!selectedMethod}
              className={`px-8 ${
                selectedMethod
                  ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </Button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && !selectedMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
                >
                  Please select one option to continue
                  <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
