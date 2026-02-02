import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Upload,
  Calendar,
  MapPin,
  DollarSign,
  CreditCard,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { AdType, AdPlacement } from '../../types/ads';

interface CreateAdWizardProps {
  onClose: () => void;
}

export const CreateAdWizard: React.FC<CreateAdWizardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [adData, setAdData] = useState({
    type: '' as AdType | '',
    placement: '' as AdPlacement | '',
    title: '',
    description: '',
    mediaUrl: '',
    category: '',
    duration: 0,
    amount: 0
  });

  const steps = [
    { number: 1, title: 'Ad Type' },
    { number: 2, title: 'Configure' },
    { number: 3, title: 'Duration & Placement' },
    { number: 4, title: 'Review & Pay' },
    { number: 5, title: 'Confirmation' }
  ];

  const adPricing = {
    banner_7days: 5000,
    banner_14days: 9000,
    banner_30days: 15000,
    featured_7days: 3000,
    featured_14days: 5500,
    featured_30days: 9000
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Here you would save the ad to the backend
    navigate('/vendor/ads');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-4 md:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Create New Advertisement</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step > s.number
                        ? 'bg-white text-[#075056]'
                        : step === s.number
                        ? 'bg-[#FF5B04] text-white ring-4 ring-[#FF5B04]/30'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {step > s.number ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : s.number}
                  </div>
                  <span className={`text-[10px] md:text-xs text-center ${step >= s.number ? 'text-white' : 'text-white/60'}`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 md:mx-2 rounded transition-all ${
                      step > s.number ? 'bg-white' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1SelectType
                adData={adData}
                setAdData={setAdData}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <Step2Configure
                adData={adData}
                setAdData={setAdData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <Step3DurationPlacement
                adData={adData}
                setAdData={setAdData}
                adPricing={adPricing}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 4 && (
              <Step4ReviewPay
                adData={adData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 5 && (
              <Step5Confirmation
                adData={adData}
                onComplete={handleComplete}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Step 1: Select Ad Type
interface Step1Props {
  adData: any;
  setAdData: (data: any) => void;
  onNext: () => void;
}

const Step1SelectType: React.FC<Step1Props> = ({ adData, setAdData, onNext }) => {
  const adTypes = [
    {
      type: 'banner' as AdType,
      title: 'Banner Advertisement',
      description: 'Large, eye-catching banners on high-traffic pages',
      icon: ImageIcon,
      features: [
        'Home page hero placement',
        'Category top banners',
        'Maximum visibility',
        'Premium positioning'
      ],
      priceRange: '₹5,000 - ₹15,000'
    },
    {
      type: 'featured_listing' as AdType,
      title: 'Featured Listing',
      description: 'Highlighted vendor profile in search results',
      icon: Star,
      features: [
        'Top of search results',
        'Featured badge',
        'Priority in categories',
        'Increased profile views'
      ],
      priceRange: '₹3,000 - ₹9,000'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-xl font-bold text-[#16232A] mb-2">Select Advertisement Type</h3>
      <p className="text-gray-600 mb-6">Choose the type of advertisement that best fits your marketing goals</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {adTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.type}
              onClick={() => setAdData({ ...adData, type: type.type })}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                adData.type === type.type
                  ? 'border-[#075056] bg-[#075056]/5 ring-2 ring-[#075056]/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  adData.type === type.type ? 'bg-[#075056] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#16232A] mb-1">{type.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <ul className="space-y-1 mb-3">
                    {type.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-700 flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-[#075056]">{type.priceRange}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!adData.type}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// Step 2: Configure Ad
const Step2Configure: React.FC<any> = ({ adData, setAdData, onNext, onBack }) => {
  const [uploadedImage, setUploadedImage] = useState(adData.mediaUrl || '');

  const categories = [
    'Photography',
    'Catering',
    'Decoration',
    'Entertainment',
    'Venue',
    'Makeup & Styling',
    'Music & DJ',
    'Video Production'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to server/cloud storage
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setUploadedImage(imageUrl);
        setAdData({ ...adData, mediaUrl: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = adData.title && adData.description && adData.category && uploadedImage;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-xl font-bold text-[#16232A] mb-2">Configure Your Advertisement</h3>
      <p className="text-gray-600 mb-6">Add compelling content to attract customers</p>

      <div className="space-y-4 mb-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-[#16232A] mb-2">
            Ad Title *
          </label>
          <input
            type="text"
            value={adData.title}
            onChange={(e) => setAdData({ ...adData, title: e.target.value })}
            placeholder="e.g., Professional Wedding Photography"
            maxLength={60}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
          />
          <p className="text-xs text-gray-500 mt-1">{adData.title.length}/60 characters</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-[#16232A] mb-2">
            Description *
          </label>
          <textarea
            value={adData.description}
            onChange={(e) => setAdData({ ...adData, description: e.target.value })}
            placeholder="Describe your services and what makes you unique..."
            maxLength={200}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
          />
          <p className="text-xs text-gray-500 mt-1">{adData.description.length}/200 characters</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-[#16232A] mb-2">
            Service Category *
          </label>
          <select
            value={adData.category}
            onChange={(e) => setAdData({ ...adData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-[#16232A] mb-2">
            Advertisement Image *
          </label>
          {uploadedImage ? (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Ad preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setUploadedImage('');
                  setAdData({ ...adData, mediaUrl: '' });
                }}
                className="absolute top-2 right-2 h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#075056] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Upload className="h-12 w-12 mb-3" />
                <p className="font-semibold">Click to upload image</p>
                <p className="text-sm">PNG, JPG up to 10MB</p>
                <p className="text-xs mt-2">Recommended: 1200x600px</p>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// Step 3: Duration & Placement
const Step3DurationPlacement: React.FC<any> = ({ adData, setAdData, adPricing, onNext, onBack }) => {
  const [selectedDuration, setSelectedDuration] = useState(adData.duration || 0);
  const [selectedPlacement, setSelectedPlacement] = useState(adData.placement || '');

  const durations = [
    { days: 7, label: '7 Days', discount: '' },
    { days: 14, label: '14 Days', discount: '10% OFF', popular: true },
    { days: 30, label: '30 Days', discount: '15% OFF' }
  ];

  const placements = adData.type === 'banner' 
    ? [
        {
          id: 'home_hero' as AdPlacement,
          title: 'Home Hero Banner',
          description: 'Prime position at the top of homepage',
          traffic: 'Very High'
        },
        {
          id: 'category_top' as AdPlacement,
          title: 'Category Top Banner',
          description: 'Top of category pages',
          traffic: 'High'
        },
        {
          id: 'home_sidebar' as AdPlacement,
          title: 'Home Sidebar',
          description: 'Sidebar on homepage',
          traffic: 'Medium'
        }
      ]
    : [
        {
          id: 'search_results' as AdPlacement,
          title: 'Search Results',
          description: 'Top of search results page',
          traffic: 'Very High'
        },
        {
          id: 'category_top' as AdPlacement,
          title: 'Category Featured',
          description: 'Featured in category listings',
          traffic: 'High'
        }
      ];

  const getPrice = () => {
    if (!adData.type || !selectedDuration) return 0;
    const key = `${adData.type}_${selectedDuration}days` as keyof typeof adPricing;
    return adPricing[key] || 0;
  };

  const handleContinue = () => {
    const price = getPrice();
    setAdData({ 
      ...adData, 
      duration: selectedDuration, 
      placement: selectedPlacement,
      amount: price
    });
    onNext();
  };

  const canProceed = selectedDuration > 0 && selectedPlacement;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-xl font-bold text-[#16232A] mb-2">Duration & Placement</h3>
      <p className="text-gray-600 mb-6">Choose how long and where your ad should run</p>

      {/* Duration */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#16232A] mb-3">Select Duration</h4>
        <div className="grid grid-cols-3 gap-3">
          {durations.map((duration) => (
            <div
              key={duration.days}
              onClick={() => setSelectedDuration(duration.days)}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedDuration === duration.days
                  ? 'border-[#075056] bg-[#075056]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {duration.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#FF5B04] text-white text-xs font-semibold rounded whitespace-nowrap">
                  POPULAR
                </span>
              )}
              {duration.discount && (
                <span className="absolute -top-2 right-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded">
                  {duration.discount}
                </span>
              )}
              <div className="text-center">
                <p className="text-2xl font-bold text-[#16232A]">{duration.days}</p>
                <p className="text-sm text-gray-600">Days</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#16232A] mb-3">Select Placement</h4>
        <div className="space-y-3">
          {placements.map((placement) => (
            <div
              key={placement.id}
              onClick={() => setSelectedPlacement(placement.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPlacement === placement.id
                  ? 'border-[#075056] bg-[#075056]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#16232A] mb-1">{placement.title}</h5>
                  <p className="text-sm text-gray-600">{placement.description}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    placement.traffic === 'Very High' 
                      ? 'bg-green-100 text-green-700'
                      : placement.traffic === 'High'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {placement.traffic} Traffic
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Preview */}
      {selectedDuration > 0 && (
        <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 text-white p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Amount</p>
              <p className="text-3xl font-bold">₹{getPrice().toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">for {selectedDuration} days</p>
              <p className="text-lg font-semibold">₹{Math.round(getPrice() / selectedDuration).toLocaleString()}/day</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!canProceed}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          Continue to Payment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// Step 4: Review & Pay
const Step4ReviewPay: React.FC<any> = ({ adData, onNext, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    // Here you would integrate with payment gateway
    // For now, simulate payment success
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  const placementLabels = {
    home_hero: 'Home Hero Banner',
    home_sidebar: 'Home Sidebar',
    category_top: 'Category Top Banner',
    search_results: 'Search Results Featured'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-xl font-bold text-[#16232A] mb-2">Review & Payment</h3>
      <p className="text-gray-600 mb-6">Review your ad details and complete payment</p>

      {/* Ad Preview */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h4 className="font-semibold text-[#16232A] mb-4">Advertisement Preview</h4>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {adData.mediaUrl && (
            <img
              src={adData.mediaUrl}
              alt={adData.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#075056]/10 text-[#075056] text-xs font-medium rounded">
                {adData.type === 'banner' ? 'Banner Ad' : 'Featured Listing'}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {adData.category}
              </span>
            </div>
            <h5 className="font-bold text-[#16232A] mb-1">{adData.title}</h5>
            <p className="text-sm text-gray-600">{adData.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Placement</p>
            <p className="text-sm font-semibold text-[#16232A]">
              {placementLabels[adData.placement as AdPlacement]}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Duration</p>
            <p className="text-sm font-semibold text-[#16232A]">{adData.duration} Days</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#16232A] mb-3">Select Payment Method</h4>
        <div className="space-y-3">
          {['UPI', 'Credit/Debit Card', 'Net Banking'].map((method) => (
            <div
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                paymentMethod === method
                  ? 'border-[#075056] bg-[#075056]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-5 w-5 text-[#075056]" />
              <span className="font-medium text-[#16232A]">{method}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amount Summary */}
      <div className="bg-gradient-to-r from-[#FF5B04] to-[#FF5B04]/90 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/90">Subtotal</span>
          <span className="text-xl font-bold">₹{adData.amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
          <span className="text-white/90">GST (18%)</span>
          <span className="text-xl font-bold">₹{Math.round(adData.amount * 0.18).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Total Amount</span>
          <span className="text-3xl font-bold">₹{Math.round(adData.amount * 1.18).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Pay ₹{Math.round(adData.amount * 1.18).toLocaleString()}
        </Button>
      </div>
    </motion.div>
  );
};

// Step 5: Confirmation
const Step5Confirmation: React.FC<any> = ({ adData, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-[#16232A] mb-3">
        Advertisement Created Successfully!
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Your advertisement "{adData.title}" has been created and will go live within 24 hours after admin approval.
      </p>

      <div className="bg-gradient-to-r from-[#075056]/10 to-[#075056]/5 rounded-xl p-6 mb-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-[#FF5B04]" />
          <h4 className="font-semibold text-[#16232A]">What's Next?</h4>
        </div>
        <ul className="text-left space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Admin will review your ad (usually within 24 hours)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>You'll receive an email when your ad goes live</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Track performance in your Ads dashboard</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Boost your ad anytime for extra visibility</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={onComplete}
        className="bg-[#075056] hover:bg-[#075056]/90 text-white px-8"
      >
        Go to Ads Dashboard
      </Button>
    </motion.div>
  );
};