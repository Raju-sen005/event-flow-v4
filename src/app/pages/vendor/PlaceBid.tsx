import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Plus,
  X,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface BidFormData {
  price: string;
  packageName: string;
  description: string;
  timeline: string;
  addons: string;
  notes: string;
}

export const PlaceBid: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requirementId = searchParams.get('requirement');
  const { register, handleSubmit, formState: { errors } } = useForm<BidFormData>();
  const [portfolioSamples, setPortfolioSamples] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock requirement data
  const requirement = {
    id: requirementId,
    title: 'Wedding Photography & Videography',
    eventName: 'Singh Family Wedding',
    date: '2025-02-14',
    budget: { min: 80000, max: 120000 }
  };

  const onSubmit = async (data: BidFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate('/vendor/bids');
  };

  const handleAddSample = () => {
    setPortfolioSamples([...portfolioSamples, `sample-${portfolioSamples.length + 1}`]);
  };

  const handleRemoveSample = (index: number) => {
    setPortfolioSamples(portfolioSamples.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        to={`/vendor/requirements/${requirementId}`}
        className="inline-flex items-center gap-2 text-[#075056] hover:text-[#075056]/80 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requirement
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-[#16232A] mb-2">Place Your Bid</h1>
        <p className="text-[#16232A]/70">Submit your proposal for this event opportunity</p>
      </div>

      {/* Requirement Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="font-semibold text-[#16232A] mb-2">{requirement.title}</h3>
        <p className="text-sm text-[#16232A]/70 mb-3">{requirement.eventName}</p>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-[#16232A]/70">
            Event Date: <span className="font-medium text-[#16232A]">
              {new Date(requirement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </span>
          <span className="text-[#16232A]/70">
            Budget: <span className="font-medium text-[#075056]">
              ₹{requirement.budget.min.toLocaleString('en-IN')} - ₹{requirement.budget.max.toLocaleString('en-IN')}
            </span>
          </span>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Pricing</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Your Quote Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#16232A]/50">₹</span>
                <input
                  type="number"
                  {...register('price', { required: 'Price is required' })}
                  placeholder="Enter your price"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
              )}
              <p className="text-xs text-[#16232A]/50 mt-1">
                Customer's budget range: ₹{requirement.budget.min.toLocaleString('en-IN')} - ₹{requirement.budget.max.toLocaleString('en-IN')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Package Name *
              </label>
              <input
                type="text"
                {...register('packageName', { required: 'Package name is required' })}
                placeholder="e.g., Premium Wedding Photography Package"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
              />
              {errors.packageName && (
                <p className="text-sm text-red-600 mt-1">{errors.packageName.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Package Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Package Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Package Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={6}
                placeholder="Describe what's included in your package..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Timeline & Availability *
              </label>
              <textarea
                {...register('timeline', { required: 'Timeline is required' })}
                rows={3}
                placeholder="e.g., Available for all 3 days, Delivery within 30 days..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
              {errors.timeline && (
                <p className="text-sm text-red-600 mt-1">{errors.timeline.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Add-ons / Optional Services
              </label>
              <textarea
                {...register('addons')}
                rows={3}
                placeholder="List any additional services available at extra cost..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Portfolio Samples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="h-5 w-5 text-[#075056]" />
            <h2 className="text-[#16232A]">Portfolio Samples</h2>
          </div>

          <div className="mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSample}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Sample Work
            </Button>
            <p className="text-xs text-[#16232A]/50 mt-2">
              Add relevant samples from your previous work (Images, videos, or links)
            </p>
          </div>

          {portfolioSamples.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {portfolioSamples.map((sample, index) => (
                <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSample(index)}
                    className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-[#16232A] mb-4">Additional Notes</h2>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder="Any additional information for the customer..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
          />
        </motion.div>

        {/* Terms Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#16232A] font-medium mb-1">Important Notice</p>
              <p className="text-sm text-[#16232A]/70">
                By submitting this bid, you agree to deliver the services as described. Once awarded, 
                you'll need to sign a formal agreement with the customer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor/requirements')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Bid'}
          </Button>
        </div>
      </form>
    </div>
  );
};
