import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  PartyPopper,
  Briefcase,
  Heart,
  Gift,
  Cake,
  Users,
  AlertCircle,
  Camera,
  Video,
  Utensils,
  Music,
  Sparkles,
  Building2,
  UserCheck,
  ShieldAlert,
  MapPin,
  Clock,
  DollarSign,
  FileText
} from 'lucide-react';

// Event category type
type EventCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

// Event management mode type
type ManagementMode = 'self-managed' | 'planner-managed' | null;

// Service type
type Service = {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
};

// Event form data
type EventFormData = {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  budget: string;
  notes: string;
};

// Event categories
const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    icon: Heart,
    description: 'Make your special day unforgettable'
  },
  {
    id: 'birthday',
    name: 'Birthday Party',
    icon: Cake,
    description: 'Celebrate another year in style'
  },
  {
    id: 'corporate',
    name: 'Corporate Event',
    icon: Briefcase,
    description: 'Professional events and conferences'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    icon: Gift,
    description: 'Commemorate your milestone'
  },
  {
    id: 'other',
    name: 'Other / Custom',
    icon: PartyPopper,
    description: 'Any other special occasion'
  }
];

// Available services by category
const SERVICES_BY_CATEGORY: Record<string, Service[]> = {
  wedding: [
    { id: 'photographer', name: 'Photographer', icon: Camera, category: 'wedding' },
    { id: 'videographer', name: 'Videographer', icon: Video, category: 'wedding' },
    { id: 'catering', name: 'Catering', icon: Utensils, category: 'wedding' },
    { id: 'dj', name: 'DJ / Music', icon: Music, category: 'wedding' },
    { id: 'makeup', name: 'Makeup Artist', icon: Sparkles, category: 'wedding' },
    { id: 'decor', name: 'Decoration', icon: PartyPopper, category: 'wedding' },
    { id: 'venue', name: 'Venue', icon: Building2, category: 'wedding' }
  ],
  birthday: [
    { id: 'photographer', name: 'Photographer', icon: Camera, category: 'birthday' },
    { id: 'catering', name: 'Catering', icon: Utensils, category: 'birthday' },
    { id: 'entertainment', name: 'Entertainment', icon: Music, category: 'birthday' },
    { id: 'decor', name: 'Decoration', icon: PartyPopper, category: 'birthday' },
    { id: 'venue', name: 'Venue', icon: Building2, category: 'birthday' }
  ],
  corporate: [
    { id: 'photographer', name: 'Photographer', icon: Camera, category: 'corporate' },
    { id: 'videographer', name: 'Videographer', icon: Video, category: 'corporate' },
    { id: 'catering', name: 'Catering', icon: Utensils, category: 'corporate' },
    { id: 'av', name: 'Audio/Visual', icon: Music, category: 'corporate' },
    { id: 'venue', name: 'Venue', icon: Building2, category: 'corporate' }
  ],
  anniversary: [
    { id: 'photographer', name: 'Photographer', icon: Camera, category: 'anniversary' },
    { id: 'catering', name: 'Catering', icon: Utensils, category: 'anniversary' },
    { id: 'decor', name: 'Decoration', icon: PartyPopper, category: 'anniversary' },
    { id: 'venue', name: 'Venue', icon: Building2, category: 'anniversary' }
  ],
  other: [
    { id: 'photographer', name: 'Photographer', icon: Camera, category: 'other' },
    { id: 'videographer', name: 'Videographer', icon: Video, category: 'other' },
    { id: 'catering', name: 'Catering', icon: Utensils, category: 'other' },
    { id: 'entertainment', name: 'Entertainment', icon: Music, category: 'other' },
    { id: 'decor', name: 'Decoration', icon: PartyPopper, category: 'other' },
    { id: 'venue', name: 'Venue', icon: Building2, category: 'other' }
  ]
};

export const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [managementMode, setManagementMode] = useState<ManagementMode>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<EventFormData>();

  const formData = watch();

  const totalSteps = 6;

  // Get services for selected category
  const availableServices = selectedCategory ? SERVICES_BY_CATEGORY[selectedCategory] || [] : [];

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Handle management mode selection
  const handleManagementModeSelect = (mode: ManagementMode) => {
    setManagementMode(mode);
  };

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Add custom service
  const addCustomService = () => {
    if (customService.trim()) {
      setSelectedServices(prev => [...prev, `custom-${customService}`]);
      setCustomService('');
    }
  };

  // Form submission
  const onSubmit = (data: EventFormData) => {
    // In production, save to backend
    const eventData = {
      ...data,
      category: selectedCategory,
      managementMode,
      services: selectedServices,
      createdAt: new Date().toISOString()
    };

    console.log('Creating event:', eventData);

    // Navigate based on management mode
    if (managementMode === 'self-managed') {
      navigate('/customer/events/1'); // Event details with vendor selection
    } else {
      navigate('/customer/events/1'); // Event details with planner selection
    }
  };

  // Navigation helpers
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1EntryScreen onContinue={goToNextStep} />;
      case 2:
        return (
          <Step2CategorySelection
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
            onContinue={goToNextStep}
          />
        );
      case 3:
        return (
          <Step3ManagementMode
            selectedMode={managementMode}
            onSelect={handleManagementModeSelect}
            onContinue={goToNextStep}
          />
        );
      case 4:
        return (
          <Step4ServiceSelection
            managementMode={managementMode}
            services={availableServices}
            selectedServices={selectedServices}
            onToggle={toggleService}
            customService={customService}
            onCustomServiceChange={setCustomService}
            onAddCustom={addCustomService}
            onContinue={goToNextStep}
          />
        );
      case 5:
        return (
          <Step5EventDetails
            register={register}
            errors={errors}
            onContinue={goToNextStep}
          />
        );
      case 6:
        return (
          <Step6Review
            category={selectedCategory}
            managementMode={managementMode}
            services={selectedServices}
            formData={formData}
            onEdit={() => setCurrentStep(5)}
            onSubmit={handleSubmit(onSubmit)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          {currentStep > 1 && (
            <button
              onClick={goToPreviousStep}
              className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          {currentStep === 1 && (
            <button
              onClick={() => navigate('/customer/events')}
              className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </button>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-[#16232A]/70">
                Step {currentStep} of {totalSteps}
              </p>
              <p className="text-sm font-medium text-[#FF5B04]">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </p>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-[#FF5B04]"
              />
            </div>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Step 1: Entry Screen
const Step1EntryScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-[#FF5B04]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="h-10 w-10 text-[#FF5B04]" />
        </div>

        <h1 className="text-4xl font-bold text-[#16232A] mb-4">Create a New Event</h1>
        <p className="text-lg text-[#16232A]/70 mb-8">
          Set up your event in a few simple steps.
        </p>

        <Button
          onClick={onContinue}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white px-8 py-6 text-lg h-auto"
        >
          Start Event Setup
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 2: Category Selection
const Step2CategorySelection: React.FC<{
  selectedCategory: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}> = ({ selectedCategory, onSelect, onContinue }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">Select Event Category</h2>
        <p className="text-[#16232A]/70">
          Choose the type of event you're planning
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {EVENT_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onSelect(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                  : 'border-gray-200 hover:border-[#FF5B04]/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#FF5B04]' : 'bg-[#E4EEF0]'
                  }`}
                >
                  <Icon
                    className={`h-7 w-7 ${isSelected ? 'text-white' : 'text-[#16232A]'}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#16232A] text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#16232A]/60">{category.description}</p>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-[#FF5B04] rounded-full flex items-center justify-center"
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={!selectedCategory}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: Management Mode Selection
const Step3ManagementMode: React.FC<{
  selectedMode: ManagementMode;
  onSelect: (mode: ManagementMode) => void;
  onContinue: () => void;
}> = ({ selectedMode, onSelect, onContinue }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">
          How would you like to manage this event?
        </h2>
        <p className="text-[#16232A]/70">
          Choose your preferred management approach
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Self-Managed Option */}
        <motion.button
          onClick={() => onSelect('self-managed')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            selectedMode === 'self-managed'
              ? 'border-[#FF5B04] bg-[#FF5B04]/5'
              : 'border-gray-200 hover:border-[#FF5B04]/30'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedMode === 'self-managed' ? 'bg-[#FF5B04]' : 'bg-[#E4EEF0]'
              }`}
            >
              <UserCheck
                className={`h-7 w-7 ${
                  selectedMode === 'self-managed' ? 'text-white' : 'text-[#16232A]'
                }`}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#16232A] text-lg mb-2">Manage Myself</h3>
              <p className="text-[#16232A]/70">
                I want to select and manage vendors directly.
              </p>
            </div>
            {selectedMode === 'self-managed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-[#FF5B04] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </div>
        </motion.button>

        {/* Planner-Managed Option */}
        <motion.button
          onClick={() => onSelect('planner-managed')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            selectedMode === 'planner-managed'
              ? 'border-[#075056] bg-[#075056]/5'
              : 'border-gray-200 hover:border-[#075056]/30'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedMode === 'planner-managed' ? 'bg-[#075056]' : 'bg-[#E4EEF0]'
              }`}
            >
              <Sparkles
                className={`h-7 w-7 ${
                  selectedMode === 'planner-managed' ? 'text-white' : 'text-[#16232A]'
                }`}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#16232A] text-lg mb-2">
                Hire an Event Planner
              </h3>
              <p className="text-[#16232A]/70">
                I want a planner to manage vendors and coordination.
              </p>
            </div>
            {selectedMode === 'planner-managed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-[#075056] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Warning */}
      {selectedMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3"
        >
          <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Important</p>
            <p className="text-sm text-amber-800 mt-1">
              This choice cannot be changed later for this event.
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={!selectedMode}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm & Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 4: Service Selection
const Step4ServiceSelection: React.FC<{
  managementMode: ManagementMode;
  services: Service[];
  selectedServices: string[];
  onToggle: (id: string) => void;
  customService: string;
  onCustomServiceChange: (value: string) => void;
  onAddCustom: () => void;
  onContinue: () => void;
}> = ({
  managementMode,
  services,
  selectedServices,
  onToggle,
  customService,
  onCustomServiceChange,
  onAddCustom,
  onContinue
}) => {
  // If planner-managed, skip service selection
  if (managementMode === 'planner-managed') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-[#075056]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-[#075056]" />
          </div>

          <h2 className="text-3xl font-bold text-[#16232A] mb-4">Services Handled by Planner</h2>
          <p className="text-lg text-[#16232A]/70 mb-8">
            Your event planner will manage all services for you.
          </p>

          <Button
            onClick={onContinue}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">Select Required Services</h2>
        <p className="text-[#16232A]/70">
          Choose the services you need for your event
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedServices.includes(service.id);

          return (
            <motion.button
              key={service.id}
              onClick={() => onToggle(service.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                  : 'border-gray-200 hover:border-[#FF5B04]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#FF5B04]' : 'bg-[#E4EEF0]'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-[#16232A]'}`}
                  />
                </div>
                <span className="font-medium text-[#16232A]">{service.name}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-5 h-5 bg-[#FF5B04] rounded-full flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Add Custom Service */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h3 className="font-semibold text-[#16232A] mb-3">Add Custom Service</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customService}
            onChange={(e) => onCustomServiceChange(e.target.value)}
            placeholder="Enter service name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAddCustom();
              }
            }}
          />
          <Button
            type="button"
            onClick={onAddCustom}
            disabled={!customService.trim()}
            className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50"
          >
            Add
          </Button>
        </div>

        {/* Show custom services */}
        {selectedServices.filter(s => s.startsWith('custom-')).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedServices
              .filter(s => s.startsWith('custom-'))
              .map((service) => (
                <div
                  key={service}
                  className="px-3 py-1.5 bg-[#075056]/10 text-[#075056] rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {service.replace('custom-', '')}
                  <button
                    onClick={() => onToggle(service)}
                    className="hover:text-[#075056]/70"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={selectedServices.length === 0}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 5: Event Details Form
const Step5EventDetails: React.FC<{
  register: any;
  errors: any;
  onContinue: () => void;
}> = ({ register, errors, onContinue }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">Event Details</h2>
        <p className="text-[#16232A]/70">
          Provide the essential information about your event
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Event Name <span className="text-[#FF5B04]">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('name', { required: 'Event name is required' })}
              type="text"
              placeholder="e.g., Sarah & John Wedding"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Event Date <span className="text-[#FF5B04]">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('date', { required: 'Event date is required' })}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Time Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Start Time <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('startTime', { required: 'Start time is required' })}
                type="time"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              End Time <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('endTime', { required: 'End time is required' })}
                type="time"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Location <span className="text-[#FF5B04]">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('location', { required: 'Location is required' })}
              type="text"
              placeholder="e.g., Grand Hotel Ballroom, New York"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Estimated Budget (Optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('budget')}
              type="number"
              placeholder="e.g., 50000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-[#16232A] mb-2">
            Notes / Special Instructions (Optional)
          </label>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder="Any special requirements or notes..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          Review Event
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 6: Review & Create
const Step6Review: React.FC<{
  category: string | null;
  managementMode: ManagementMode;
  services: string[];
  formData: EventFormData;
  onEdit: () => void;
  onSubmit: () => void;
}> = ({ category, managementMode, services, formData, onEdit, onSubmit }) => {
  const categoryName = EVENT_CATEGORIES.find(c => c.id === category)?.name || '';

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">Review & Create Event</h2>
        <p className="text-[#16232A]/70">
          Please review your event details before creating
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-6 mb-8">
        {/* Category */}
        <div className="bg-[#E4EEF0] rounded-xl p-6">
          <h3 className="font-semibold text-[#16232A] mb-3">Event Category</h3>
          <p className="text-[#16232A]/70">{categoryName}</p>
        </div>

        {/* Management Mode */}
        <div className="bg-[#E4EEF0] rounded-xl p-6">
          <h3 className="font-semibold text-[#16232A] mb-3">Management Mode</h3>
          <p className="text-[#16232A]/70">
            {managementMode === 'self-managed' ? 'Self-Managed' : 'Event Planner Managed'}
          </p>
        </div>

        {/* Services */}
        {managementMode === 'self-managed' && services.length > 0 && (
          <div className="bg-[#E4EEF0] rounded-xl p-6">
            <h3 className="font-semibold text-[#16232A] mb-3">Selected Services</h3>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-[#16232A]"
                >
                  {service.startsWith('custom-')
                    ? service.replace('custom-', '')
                    : SERVICES_BY_CATEGORY[category || '']?.find(s => s.id === service)?.name ||
                      service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="bg-[#E4EEF0] rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#16232A]">Event Details</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-[#FF5B04] hover:text-[#FF5B04]/80"
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#16232A]/60">Name:</span>
              <span className="font-medium text-[#16232A]">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#16232A]/60">Date:</span>
              <span className="font-medium text-[#16232A]">
                {formData.date ? new Date(formData.date).toLocaleDateString() : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#16232A]/60">Time:</span>
              <span className="font-medium text-[#16232A]">
                {formData.startTime} - {formData.endTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#16232A]/60">Location:</span>
              <span className="font-medium text-[#16232A]">{formData.location}</span>
            </div>
            {formData.budget && (
              <div className="flex justify-between">
                <span className="text-[#16232A]/60">Budget:</span>
                <span className="font-medium text-[#16232A]">
                  ${Number(formData.budget).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`border-2 rounded-xl p-4 mb-8 ${
          managementMode === 'planner-managed'
            ? 'bg-[#075056]/5 border-[#075056]'
            : 'bg-[#FF5B04]/5 border-[#FF5B04]'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
              managementMode === 'planner-managed' ? 'text-[#075056]' : 'text-[#FF5B04]'
            }`}
          />
          <div>
            <p className="text-sm font-medium text-[#16232A]">Important Notice</p>
            <p className="text-sm text-[#16232A]/70 mt-1">
              {managementMode === 'planner-managed'
                ? 'This event will be managed by an Event Planner. Direct vendor selection will be disabled.'
                : 'You will manage vendors and bids for this event.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={onEdit}>
          Edit Details
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <Check className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>
    </div>
  );
};
