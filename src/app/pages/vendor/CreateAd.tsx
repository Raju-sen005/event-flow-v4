import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
  X,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Target,
  CreditCard
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { AdType, AdPlacement, AdCreationData } from '../../types/ads';

export const CreateAd: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [adData, setAdData] = useState<Partial<AdCreationData>>({
    type: 'banner',
    placement: 'home_hero',
    duration: 7
  });
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const steps = [
    { number: 1, title: 'Ad Type', description: 'Choose your ad format' },
    { number: 2, title: 'Configure', description: 'Ad details and content' },
    { number: 3, title: 'Placement', description: 'Where to show your ad' },
    { number: 4, title: 'Duration', description: 'Campaign length' },
    { number: 5, title: 'Review & Pay', description: 'Confirm and checkout' }
  ];

  const adTypes = [
    {
      type: 'banner' as AdType,
      name: 'Banner Ad',
      description: 'Large hero banner on homepage',
      price: { 7: 5000, 14: 9000, 30: 15000 },
      features: ['Prime homepage placement', 'High visibility', 'Desktop & mobile']
    },
    {
      type: 'featured_listing' as AdType,
      name: 'Featured Listing',
      description: 'Top position in search results',
      price: { 7: 3000, 14: 5500, 30: 9000 },
      features: ['Top of search results', 'Featured badge', 'Category highlighting']
    }
  ];

  const placements: { value: AdPlacement; label: string; description: string }[] = [
    { value: 'home_hero', label: 'Homepage Hero', description: 'Main banner on homepage' },
    { value: 'home_sidebar', label: 'Homepage Sidebar', description: 'Sidebar advertisement' },
    { value: 'category_top', label: 'Category Top', description: 'Top of category pages' },
    { value: 'search_results', label: 'Search Results', description: 'Featured in search' }
  ];

  const durations = [
    { days: 7, label: '7 Days', discount: 0 },
    { days: 14, label: '14 Days', discount: 10 },
    { days: 30, label: '30 Days', discount: 20 }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAdData({ ...adData, mediaUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = () => {
    const selectedType = adTypes.find(t => t.type === adData.type);
    if (!selectedType || !adData.duration) return 0;
    
    const basePrice = selectedType.price[adData.duration as 7 | 14 | 30];
    const discount = durations.find(d => d.days === adData.duration)?.discount || 0;
    return basePrice - (basePrice * discount / 100);
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Simulate payment processing
    alert('Processing payment...');
    setTimeout(() => {
      alert('Ad created successfully! Your ad will be live shortly.');
      navigate('/vendor/ads');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/vendor/ads')}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ads
        </button>
        <h1 className="text-3xl font-bold text-[#16232A]">Create New Advertisement</h1>
        <p className="text-[#16232A]/70 mt-1">Promote your services to thousands of customers</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === step.number
                    ? 'bg-[#FF5B04] text-white'
                    : currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
                </div>
                <div className="text-center mt-2">
                  <p className={`text-xs font-medium ${currentStep >= step.number ? 'text-[#16232A]' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl p-8 border border-gray-200"
        >
          {/* Step 1: Ad Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Choose Ad Type</h2>
                <p className="text-gray-600">Select the type of advertisement that best fits your needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {adTypes.map((type) => (
                  <div
                    key={type.type}
                    onClick={() => setAdData({ ...adData, type: type.type })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      adData.type === type.type
                        ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-[#16232A] mb-2">{type.name}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Starting from</p>
                      <p className="text-2xl font-bold text-[#FF5B04]">₹{type.price[7].toLocaleString()}/week</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Configure */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Configure Your Ad</h2>
                <p className="text-gray-600">Add details and creative content for your advertisement</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Ad Title *</label>
                  <Input
                    value={adData.title || ''}
                    onChange={(e) => setAdData({ ...adData, title: e.target.value })}
                    placeholder="e.g., Professional Wedding Photography"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description *</label>
                  <textarea
                    value={adData.description || ''}
                    onChange={(e) => setAdData({ ...adData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                    placeholder="Capture your special moments with our award-winning team"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category *</label>
                  <select
                    value={adData.category || ''}
                    onChange={(e) => setAdData({ ...adData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select category</option>
                    <option value="Photography">Photography</option>
                    <option value="Catering">Catering</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Venue">Venue</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Ad Image *</label>
                  {!uploadedImage ? (
                    <label className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF5B04] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded ad"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => {
                          setUploadedImage('');
                          setAdData({ ...adData, mediaUrl: undefined });
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Placement */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Choose Placement</h2>
                <p className="text-gray-600">Select where your ad will be displayed</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {placements.map((placement) => (
                  <div
                    key={placement.value}
                    onClick={() => setAdData({ ...adData, placement: placement.value })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      adData.placement === placement.value
                        ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Target className="h-6 w-6 text-[#FF5B04] flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-[#16232A] mb-1">{placement.label}</h3>
                        <p className="text-sm text-gray-600">{placement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Duration */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Select Campaign Duration</h2>
                <p className="text-gray-600">Longer campaigns get better discounts</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {durations.map((duration) => {
                  const selectedType = adTypes.find(t => t.type === adData.type);
                  const basePrice = selectedType?.price[duration.days as 7 | 14 | 30] || 0;
                  const finalPrice = basePrice - (basePrice * duration.discount / 100);

                  return (
                    <div
                      key={duration.days}
                      onClick={() => setAdData({ ...adData, duration: duration.days })}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative ${
                        adData.duration === duration.days
                          ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {duration.discount > 0 && (
                        <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {duration.discount}% OFF
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-[#FF5B04]" />
                        <h3 className="font-bold text-[#16232A]">{duration.label}</h3>
                      </div>
                      {duration.discount > 0 && (
                        <p className="text-sm text-gray-500 line-through mb-1">₹{basePrice.toLocaleString()}</p>
                      )}
                      <p className="text-2xl font-bold text-[#FF5B04]">₹{finalPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-2">{duration.days} days of promotion</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Review & Pay */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Review & Confirm</h2>
                <p className="text-gray-600">Please review your ad details before payment</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Preview */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#16232A]">Ad Preview</h3>
                  {adData.mediaUrl && (
                    <img
                      src={adData.mediaUrl}
                      alt="Ad preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  )}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-[#16232A] mb-1">{adData.title}</h4>
                    <p className="text-sm text-gray-600">{adData.description}</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-[#075056]/10 text-[#075056] text-xs rounded">
                        {adTypes.find(t => t.type === adData.type)?.name}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                        {adData.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#16232A]">Order Summary</h3>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ad Type:</span>
                      <span className="font-medium">{adTypes.find(t => t.type === adData.type)?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Placement:</span>
                      <span className="font-medium">{placements.find(p => p.value === adData.placement)?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{adData.duration} days</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-bold text-[#16232A]">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#FF5B04]">₹{calculatePrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Your ad will be reviewed and activated within 2-4 hours after payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < 5 ? (
          <Button
            onClick={handleNext}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white gap-2"
            disabled={
              (currentStep === 2 && (!adData.title || !adData.description || !adData.category || !adData.mediaUrl))
            }
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Pay ₹{calculatePrice().toLocaleString()}
          </Button>
        )}
      </div>
    </div>
  );
};
