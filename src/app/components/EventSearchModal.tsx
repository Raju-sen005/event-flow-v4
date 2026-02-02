import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { 
  X, 
  Calendar,
  DollarSign,
  Users,
  MapPin,
  ChevronRight,
  Heart,
  Cake,
  Briefcase,
  GraduationCap,
  Music,
  Baby,
  PartyPopper
} from 'lucide-react';

interface EventSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventType: string;
}

// Event to vendor category mapping
const eventVendorMapping: { [key: string]: string[] } = {
  wedding: ['Photographer', 'Decorator', 'Caterer', 'Makeup Artist', 'Venue', 'DJ & Sound'],
  'birthday party': ['Decorator', 'Caterer', 'Entertainer', 'Cake Vendor', 'Photographer'],
  'corporate event': ['Venue', 'Caterer', 'AV Equipment', 'Event Planner', 'Photographer'],
  engagement: ['Photographer', 'Decorator', 'Caterer', 'Makeup Artist', 'Venue'],
  'baby shower': ['Decorator', 'Caterer', 'Cake Vendor', 'Photographer', 'Event Planner'],
  anniversary: ['Venue', 'Decorator', 'Caterer', 'Photographer', 'Entertainer'],
  'graduation party': ['Venue', 'Caterer', 'Photographer', 'Decorator'],
  'housewarming': ['Decorator', 'Caterer', 'Photographer'],
  'retirement party': ['Venue', 'Caterer', 'Decorator', 'Photographer']
};

// Event-specific questions
const eventQuestions: { [key: string]: any } = {
  wedding: {
    question1: {
      label: 'Wedding Type',
      field: 'weddingType',
      options: ['Traditional Hindu', 'Christian', 'Muslim', 'Sikh', 'Destination Wedding', 'Court Marriage']
    },
    question2: {
      label: 'Number of Events',
      field: 'numberOfEvents',
      options: ['Single Day', 'Mehendi + Wedding', 'Full 3-Day Wedding', 'Full Week Events']
    }
  },
  'birthday party': {
    question1: {
      label: 'Age Group',
      field: 'ageGroup',
      options: ['Kids (1-12 years)', 'Teens (13-19 years)', 'Adults (20-40 years)', 'Senior (40+ years)']
    },
    question2: {
      label: 'Party Theme',
      field: 'theme',
      options: ['Cartoon Characters', 'Superheroes', 'Princess', 'Bollywood', 'Retro', 'No Theme']
    }
  },
  'corporate event': {
    question1: {
      label: 'Event Type',
      field: 'corporateEventType',
      options: ['Conference', 'Product Launch', 'Team Building', 'Annual Day', 'Award Ceremony', 'Workshop']
    },
    question2: {
      label: 'Formality Level',
      field: 'formalityLevel',
      options: ['Formal', 'Semi-Formal', 'Casual']
    }
  },
  engagement: {
    question1: {
      label: 'Ceremony Type',
      field: 'ceremonyType',
      options: ['Ring Ceremony', 'Roka Ceremony', 'Engagement Party', 'Combined Ring + Reception']
    },
    question2: {
      label: 'Venue Preference',
      field: 'venuePreference',
      options: ['Banquet Hall', 'Home', 'Outdoor Garden', 'Restaurant', 'Hotel']
    }
  },
  'baby shower': {
    question1: {
      label: 'Shower Theme',
      field: 'babyShowerTheme',
      options: ['Gender Reveal', 'Traditional Godh Bharai', 'Modern Baby Shower', 'Surprise Theme']
    },
    question2: {
      label: 'Guest Type',
      field: 'guestType',
      options: ['Ladies Only', 'Mixed (Men & Women)', 'Family & Friends']
    }
  },
  anniversary: {
    question1: {
      label: 'Anniversary Milestone',
      field: 'anniversaryYear',
      options: ['1st Anniversary', '5th Anniversary', '10th Anniversary', '25th (Silver)', '50th (Golden)', 'Other']
    },
    question2: {
      label: 'Celebration Style',
      field: 'celebrationStyle',
      options: ['Intimate Family Gathering', 'Grand Party', 'Romantic Dinner', 'Surprise Celebration']
    }
  },
  'graduation party': {
    question1: {
      label: 'Graduation Level',
      field: 'graduationLevel',
      options: ['High School', 'Undergraduate', 'Masters', 'PhD', 'Professional Course']
    },
    question2: {
      label: 'Party Vibe',
      field: 'partyVibe',
      options: ['Casual & Fun', 'Formal Celebration', 'Themed Party', 'Outdoor BBQ']
    }
  },
  housewarming: {
    question1: {
      label: 'Event Style',
      field: 'housewarmingStyle',
      options: ['Traditional Puja', 'Modern Party', 'Combined Puja + Party']
    },
    question2: {
      label: 'Guest Count',
      field: 'guestCount',
      type: 'number',
      placeholder: 'e.g., 50'
    }
  },
  'retirement party': {
    question1: {
      label: 'Event Tone',
      field: 'eventTone',
      options: ['Formal & Ceremonial', 'Casual & Fun', 'Emotional Tribute', 'Celebration Party']
    },
    question2: {
      label: 'Venue Type',
      field: 'venueType',
      options: ['Office Premises', 'Restaurant', 'Banquet Hall', 'Outdoor Venue', 'Home']
    }
  }
};

export const EventSearchModal: React.FC<EventSearchModalProps> = ({ open, onOpenChange, eventType }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: eventType,
    eventDate: '',
    budget: '',
    location: '',
    guestCount: '',
    // Event-specific fields
    weddingType: '',
    numberOfEvents: '',
    ageGroup: '',
    theme: '',
    corporateEventType: '',
    formalityLevel: '',
    ceremonyType: '',
    venuePreference: '',
    babyShowerTheme: '',
    guestType: '',
    anniversaryYear: '',
    celebrationStyle: '',
    graduationLevel: '',
    partyVibe: '',
    housewarmingStyle: '',
    eventTone: '',
    venueType: ''
  });

  const budgetRanges = [
    { value: 'under-50000', label: 'Under ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200000-500000', label: '₹2,00,000 - ₹5,00,000' },
    { value: '500000-1000000', label: '₹5,00,000 - ₹10,00,000' },
    { value: '1000000-2000000', label: '₹10,00,000 - ₹20,00,000' },
    { value: 'over-2000000', label: 'Over ₹20,00,000' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Get relevant vendor categories for this event
    const vendorCategories = eventVendorMapping[eventType.toLowerCase()] || [];
    
    // Navigate to results page with form data and vendor categories
    navigate('/results', { 
      state: { 
        requirements: formData,
        vendorCategories: vendorCategories,
        eventType: eventType
      } 
    });
    onOpenChange(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.eventDate !== '';
      case 2:
        return formData.budget !== '';
      case 3:
        return formData.location !== '';
      case 4:
        // For step 4, at least one event-specific question should be answered
        const questions = eventQuestions[eventType.toLowerCase()];
        if (!questions) return true;
        
        const field1 = questions.question1?.field;
        const field2 = questions.question2?.field;
        
        return formData[field1 as keyof typeof formData] !== '' || 
               formData[field2 as keyof typeof formData] !== '';
      default:
        return false;
    }
  };

  // Get event-specific questions
  const getEventQuestions = () => {
    const type = eventType.toLowerCase();
    return eventQuestions[type] || null;
  };

  const questions = getEventQuestions();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-[60%] max-h-[90vh] overflow-hidden relative flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Content - No Scroll */}
              <div className="p-8 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-[#16232A] mb-1">
                    Plan Your <span className="text-[#FF5B04]">{eventType}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Tell us about your event to find perfect vendors
                  </p>
                </div>

                {/* Step Indicator - Minimal */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className={`flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold transition-all ${
                          currentStep >= step 
                            ? 'bg-[#FF5B04] text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {step}
                        </div>
                        {step < 4 && (
                          <div className={`h-0.5 w-10 rounded-full transition-all ${
                            currentStep > step ? 'bg-[#FF5B04]' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs font-medium text-gray-400">
                    Step {currentStep} of 4
                  </p>
                </div>

                {/* Form Content - Fixed Height, No Scrolling */}
                <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
                  {/* Step 1: Event Date */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center h-11 w-11 bg-[#FF5B04]/10 rounded-xl mb-3">
                          <Calendar className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#16232A] mb-1">When is your event?</h3>
                        <p className="text-xs text-gray-500">Select your preferred date</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#16232A] mb-2">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Budget */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center h-11 w-11 bg-[#FF5B04]/10 rounded-xl mb-3">
                          <DollarSign className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#16232A] mb-1">What's your budget?</h3>
                        <p className="text-xs text-gray-500">Select your total event budget</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#16232A] mb-2">
                          Total Budget (₹)
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2316232A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem'
                          }}
                        >
                          <option value="">Select your budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Location */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center h-11 w-11 bg-[#FF5B04]/10 rounded-xl mb-3">
                          <MapPin className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#16232A] mb-1">Where's your event?</h3>
                        <p className="text-xs text-gray-500">Tell us the city or area</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-[#16232A] mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g., Mumbai, Bangalore, Delhi"
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#16232A] mb-2">
                            Expected Guests <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                          </label>
                          <input
                            type="number"
                            value={formData.guestCount}
                            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                            placeholder="e.g., 150"
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Event-Specific Questions */}
                  {currentStep === 4 && questions && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center h-11 w-11 bg-[#FF5B04]/10 rounded-xl mb-3">
                          <ChevronRight className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#16232A] mb-1">A few more details</h3>
                        <p className="text-xs text-gray-500">Help us find perfect vendors</p>
                      </div>
                      <div className="space-y-3">
                        {/* Question 1 */}
                        <div>
                          <label className="block text-sm font-semibold text-[#16232A] mb-2">
                            {questions.question1.label}
                          </label>
                          {questions.question1.options ? (
                            <select
                              value={formData[questions.question1.field as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [questions.question1.field]: e.target.value })}
                              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] appearance-none cursor-pointer"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2316232A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem'
                              }}
                            >
                              <option value="">Select an option</option>
                              {questions.question1.options.map((option: string) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={questions.question1.type || 'text'}
                              value={formData[questions.question1.field as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [questions.question1.field]: e.target.value })}
                              placeholder={questions.question1.placeholder}
                              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] placeholder:text-gray-400"
                            />
                          )}
                        </div>

                        {/* Question 2 */}
                        <div>
                          <label className="block text-sm font-semibold text-[#16232A] mb-2">
                            {questions.question2.label}
                          </label>
                          {questions.question2.options ? (
                            <select
                              value={formData[questions.question2.field as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [questions.question2.field]: e.target.value })}
                              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] appearance-none cursor-pointer"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2316232A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem'
                              }}
                            >
                              <option value="">Select an option</option>
                              {questions.question2.options.map((option: string) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={questions.question2.type || 'text'}
                              value={formData[questions.question2.field as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [questions.question2.field]: e.target.value })}
                              placeholder={questions.question2.placeholder}
                              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] placeholder:text-gray-400"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Fallback */}
                  {currentStep === 4 && !questions && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center h-11 w-11 bg-[#FF5B04]/10 rounded-xl mb-3">
                          <ChevronRight className="h-5 w-5 text-[#FF5B04]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#16232A] mb-1">Almost done!</h3>
                        <p className="text-xs text-gray-500">Any additional details? (Optional)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#16232A] mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          value={formData.theme}
                          onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                          placeholder="Tell us more about your event preferences..."
                          rows={3}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-[#16232A] placeholder:text-gray-400 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="border border-gray-300 text-[#16232A] hover:bg-gray-50 font-semibold h-10 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Back
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold h-10 px-5 shadow-sm hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold h-10 px-5 shadow-sm hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Find Vendors
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Popular Events - Below Form */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center mb-2.5">Or browse popular events:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {[
                      { label: 'Wedding', icon: Heart },
                      { label: 'Birthday Party', icon: Cake },
                      { label: 'Corporate Event', icon: Briefcase },
                      { label: 'Engagement', icon: PartyPopper }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onOpenChange(false);
                          // Reopen with new event type
                          setTimeout(() => {
                            const event = new CustomEvent('quickSearch', { detail: item.label });
                            window.dispatchEvent(event);
                          }, 100);
                        }}
                        className="group flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 hover:border-[#FF5B04]/30 hover:bg-white rounded-lg transition-all text-xs font-medium text-gray-600 hover:text-[#FF5B04]"
                      >
                        <item.icon className="h-3 w-3 text-gray-400 group-hover:text-[#FF5B04] transition-colors" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};