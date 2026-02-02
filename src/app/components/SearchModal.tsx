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
  Clock,
  Camera,
  Utensils,
  Music,
  Sparkles,
  Home as HomeIcon,
  Palette,
  Briefcase
} from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange, searchQuery }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: searchQuery,
    eventDate: '',
    budget: '',
    guestCount: '',
    eventDuration: '',
    venueType: '',
    cuisineType: '',
    musicGenre: '',
    photographyStyle: '',
    decorTheme: '',
    location: ''
  });

  // Category-specific questions mapping
  const categoryQuestions: { [key: string]: any } = {
    photographer: {
      question1: {
        label: 'Photography Style',
        field: 'photographyStyle',
        options: ['Candid', 'Traditional', 'Cinematic', 'Documentary', 'Fashion']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['Half Day (4-5 hours)', 'Full Day (8-10 hours)', 'Multiple Days']
      }
    },
    photography: {
      question1: {
        label: 'Photography Style',
        field: 'photographyStyle',
        options: ['Candid', 'Traditional', 'Cinematic', 'Documentary', 'Fashion']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['Half Day (4-5 hours)', 'Full Day (8-10 hours)', 'Multiple Days']
      }
    },
    caterer: {
      question1: {
        label: 'Cuisine Type',
        field: 'cuisineType',
        options: ['Indian', 'Chinese', 'Continental', 'Italian', 'Multi-Cuisine', 'South Indian']
      },
      question2: {
        label: 'Expected Guest Count',
        field: 'guestCount',
        type: 'number',
        placeholder: 'e.g., 100'
      }
    },
    catering: {
      question1: {
        label: 'Cuisine Type',
        field: 'cuisineType',
        options: ['Indian', 'Chinese', 'Continental', 'Italian', 'Multi-Cuisine', 'South Indian']
      },
      question2: {
        label: 'Expected Guest Count',
        field: 'guestCount',
        type: 'number',
        placeholder: 'e.g., 100'
      }
    },
    decorator: {
      question1: {
        label: 'Decoration Theme',
        field: 'decorTheme',
        options: ['Traditional', 'Modern', 'Vintage', 'Floral', 'Minimal', 'Luxury']
      },
      question2: {
        label: 'Venue Type',
        field: 'venueType',
        options: ['Indoor', 'Outdoor', 'Banquet Hall', 'Garden', 'Farmhouse']
      }
    },
    decoration: {
      question1: {
        label: 'Decoration Theme',
        field: 'decorTheme',
        options: ['Traditional', 'Modern', 'Vintage', 'Floral', 'Minimal', 'Luxury']
      },
      question2: {
        label: 'Venue Type',
        field: 'venueType',
        options: ['Indoor', 'Outdoor', 'Banquet Hall', 'Garden', 'Farmhouse']
      }
    },
    dj: {
      question1: {
        label: 'Music Genre',
        field: 'musicGenre',
        options: ['Bollywood', 'EDM', 'House', 'Hip-Hop', 'Retro', 'Mixed']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['2-3 hours', '4-5 hours', '6-8 hours', 'Full Night']
      }
    },
    'dj & sound': {
      question1: {
        label: 'Music Genre',
        field: 'musicGenre',
        options: ['Bollywood', 'EDM', 'House', 'Hip-Hop', 'Retro', 'Mixed']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['2-3 hours', '4-5 hours', '6-8 hours', 'Full Night']
      }
    },
    venue: {
      question1: {
        label: 'Venue Type',
        field: 'venueType',
        options: ['Banquet Hall', 'Outdoor Garden', 'Farmhouse', 'Hotel', 'Resort', 'Rooftop']
      },
      question2: {
        label: 'Expected Guest Count',
        field: 'guestCount',
        type: 'number',
        placeholder: 'e.g., 200'
      }
    },
    makeup: {
      question1: {
        label: 'Service Type',
        field: 'photographyStyle',
        options: ['Bridal Makeup', 'Party Makeup', 'HD Makeup', 'Airbrush', 'Hair Styling']
      },
      question2: {
        label: 'Location Preference',
        field: 'location',
        options: ['At Venue', 'At Salon', 'Both Available']
      }
    },
    'makeup & hair': {
      question1: {
        label: 'Service Type',
        field: 'photographyStyle',
        options: ['Bridal Makeup', 'Party Makeup', 'HD Makeup', 'Airbrush', 'Hair Styling']
      },
      question2: {
        label: 'Location Preference',
        field: 'location',
        options: ['At Venue', 'At Salon', 'Both Available']
      }
    },
    planner: {
      question1: {
        label: 'Service Level',
        field: 'photographyStyle',
        options: ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Consultation Only']
      },
      question2: {
        label: 'Expected Guest Count',
        field: 'guestCount',
        type: 'number',
        placeholder: 'e.g., 150'
      }
    },
    'event planner': {
      question1: {
        label: 'Service Level',
        field: 'photographyStyle',
        options: ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Consultation Only']
      },
      question2: {
        label: 'Expected Guest Count',
        field: 'guestCount',
        type: 'number',
        placeholder: 'e.g., 150'
      }
    },
    videographer: {
      question1: {
        label: 'Video Style',
        field: 'photographyStyle',
        options: ['Cinematic', 'Traditional', 'Documentary', 'Highlights Only', 'Full Coverage']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['Half Day (4-5 hours)', 'Full Day (8-10 hours)', 'Multiple Days']
      }
    },
    videography: {
      question1: {
        label: 'Video Style',
        field: 'photographyStyle',
        options: ['Cinematic', 'Traditional', 'Documentary', 'Highlights Only', 'Full Coverage']
      },
      question2: {
        label: 'Event Duration',
        field: 'eventDuration',
        options: ['Half Day (4-5 hours)', 'Full Day (8-10 hours)', 'Multiple Days']
      }
    }
  };

  const budgetRanges = [
    { value: 'under-25000', label: 'Under ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200000-500000', label: '₹2,00,000 - ₹5,00,000' },
    { value: 'over-500000', label: 'Over ₹5,00,000' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Navigate to results page with form data
    navigate('/results', { state: { requirements: formData } });
    onOpenChange(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.eventDate !== '';
      case 2:
        return formData.budget !== '';
      case 3:
        // For step 3, at least one category-specific question should be answered
        const category = searchQuery.toLowerCase();
        const questions = categoryQuestions[category];
        if (!questions) return true;
        
        const field1 = questions.question1?.field;
        const field2 = questions.question2?.field;
        
        return formData[field1 as keyof typeof formData] !== '' || 
               formData[field2 as keyof typeof formData] !== '';
      default:
        return false;
    }
  };

  // Get category-specific questions
  const getCategoryQuestions = () => {
    const category = searchQuery.toLowerCase();
    return categoryQuestions[category] || null;
  };

  const questions = getCategoryQuestions();

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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#16232A] mb-2">
                  Tell us about your event
                </h2>
                <p className="text-gray-600">
                  We'll find the perfect {searchQuery} for you
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold text-sm transition-all ${
                        currentStep >= step 
                          ? 'bg-[#FF5B04] text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-3 rounded-full transition-all ${
                          currentStep > step ? 'bg-[#FF5B04]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">
                    Step {currentStep} of 3
                  </p>
                </div>
              </div>

              {/* Step 1: Event Date */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#16232A] mb-2">When is your event?</h3>
                    <p className="text-gray-600">Select your preferred date</p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-semibold text-[#16232A] mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#FF5B04]" />
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#16232A] mb-2">What's your budget?</h3>
                    <p className="text-gray-600">Select your budget range in Indian Rupees</p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-semibold text-[#16232A] mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-[#FF5B04]" />
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
                    >
                      <option value="">Select your budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Category-Specific Questions */}
              {currentStep === 3 && questions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#16232A] mb-2">A few more details</h3>
                    <p className="text-gray-600">Help us find the perfect match for you</p>
                  </div>
                  <div className="max-w-md mx-auto space-y-6">
                    {/* Question 1 */}
                    <div>
                      <label className="block text-sm font-semibold text-[#16232A] mb-3">
                        {questions.question1.label}
                      </label>
                      {questions.question1.options ? (
                        <select
                          value={formData[questions.question1.field as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [questions.question1.field]: e.target.value })}
                          className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
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
                          className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium placeholder:text-gray-400"
                        />
                      )}
                    </div>

                    {/* Question 2 */}
                    <div>
                      <label className="block text-sm font-semibold text-[#16232A] mb-3">
                        {questions.question2.label}
                      </label>
                      {questions.question2.options ? (
                        <select
                          value={formData[questions.question2.field as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [questions.question2.field]: e.target.value })}
                          className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium"
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
                          className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Fallback for categories without specific questions */}
              {currentStep === 3 && !questions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#16232A] mb-2">Any additional details?</h3>
                    <p className="text-gray-600">Optional - helps us find better matches</p>
                  </div>
                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#16232A] mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#FF5B04]" />
                        Expected Guest Count
                      </label>
                      <input
                        type="number"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="e.g., 100"
                        className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#16232A] mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#FF5B04]" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City or area"
                        className="w-full h-14 px-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent transition-all text-[#16232A] font-medium placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="border-2 border-gray-300 text-[#16232A] hover:bg-gray-50 font-semibold h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-bold h-12 px-8 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-bold h-12 px-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    Find Vendors
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
