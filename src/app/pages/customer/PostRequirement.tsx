import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Upload,
  Check,
  FileText,
  Clock,
  Users
} from 'lucide-react';

export const PostRequirement: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event: '',
    category: '',
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    date: '',
    time: '',
    location: '',
    guestCount: '',
    deadline: '',
    preferences: '',
    files: [] as File[]
  });

  const categories = [
    'Photography',
    'Catering',
    'Music & DJ',
    'Decoration',
    'Transportation',
    'Makeup & Hair',
    'Entertainment',
    'Bakery & Cakes',
    'Venue',
    'Other'
  ];

  const events = [
    'Sarah & John Wedding',
    'Annual Corporate Gala',
    'Birthday Celebration'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Posting requirement:', formData);
    navigate('/customer/vendors');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-[#16232A]">Post Vendor Requirement</h1>
        <p className="text-[#16232A]/70 mt-1">Tell vendors what you need and receive competitive bids</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Select Event *
              </label>
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="">Choose an event</option>
                {events.map((event) => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Service Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Requirement Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Professional Wedding Photographer Needed"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your requirements in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Budget & Timeline</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Minimum Budget *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    required
                    placeholder="5000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Maximum Budget *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    required
                    placeholder="10000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Event Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Bid Submission Deadline *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                />
              </div>
              <p className="text-sm text-[#16232A]/60 mt-1">
                Vendors can submit bids until this date
              </p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Event Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Event Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Grand Hotel Ballroom, New York"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Expected Guest Count
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="150"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Special Preferences/Requirements
              </label>
              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                rows={4}
                placeholder="Any specific preferences, style requirements, or special requests..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Reference Files (Optional)</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-[#16232A] mb-2">Upload reference images, mood boards, or documents</p>
            <p className="text-sm text-[#16232A]/60 mb-4">PNG, JPG, PDF up to 10MB each</p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf"
            />
            <label htmlFor="file-upload">
              <Button type="button" as="span" variant="outline" className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </label>
            {formData.files.length > 0 && (
              <div className="mt-4 text-left">
                <p className="text-sm font-medium text-[#16232A] mb-2">Selected files:</p>
                <ul className="space-y-1">
                  {formData.files.map((file, index) => (
                    <li key={index} className="text-sm text-[#16232A]/70">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-[#16232A] mb-2">What happens next?</h3>
          <ul className="space-y-1 text-sm text-[#16232A]/70">
            <li>• Your requirement will be visible to relevant vendors</li>
            <li>• Vendors will submit their bids with pricing and details</li>
            <li>• You can compare bids, chat with vendors, and select the best fit</li>
            <li>• Once selected, you'll sign an agreement and proceed with planning</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Check className="h-4 w-4 mr-2" />
            Post Requirement
          </Button>
        </div>
      </form>
    </div>
  );
};
