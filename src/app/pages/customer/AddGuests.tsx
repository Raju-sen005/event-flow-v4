import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  Users,
  Upload,
  Plus,
  X,
  ArrowLeft,
  Mail,
  Phone,
  Tag,
  FileSpreadsheet,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export const AddGuests: React.FC = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState<'manual' | 'csv' | 'image'>('manual');
  const [guests, setGuests] = useState<Array<{
    name: string;
    email: string;
    phone: string;
    category: string;
    plusOne: boolean;
    dietaryRestrictions: string;
  }>>([
    { name: '', email: '', phone: '', category: 'Friends', plusOne: false, dietaryRestrictions: '' }
  ]);

  const categories = ['VIP', 'Family', 'Friends', 'Colleagues', 'Other'];

  const addGuestRow = () => {
    setGuests([
      ...guests,
      { name: '', email: '', phone: '', category: 'Friends', plusOne: false, dietaryRestrictions: '' }
    ]);
  };

  const removeGuestRow = (index: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    }
  };

  const updateGuest = (index: number, field: string, value: any) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], [field]: value };
    setGuests(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding guests:', guests);
    navigate('/customer/guests');
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Uploading CSV:', file.name);
      // In real app, parse CSV and populate guests
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Uploading image for OCR:', file.name);
      // In real app, use OCR to extract guest data
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-[#16232A]">Add Guests</h1>
        <p className="text-[#16232A]/70 mt-1">Add guests manually, upload CSV, or scan guest list images</p>
      </div>

      {/* Method Selection */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-[#16232A] mb-4">Choose Method</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveMethod('manual')}
            className={`p-6 rounded-lg border-2 transition-all ${
              activeMethod === 'manual'
                ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className={`h-8 w-8 mx-auto mb-3 ${activeMethod === 'manual' ? 'text-[#FF5B04]' : 'text-gray-400'}`} />
            <h3 className="font-semibold text-[#16232A] mb-1">Manual Entry</h3>
            <p className="text-sm text-[#16232A]/60">Add guests one by one</p>
          </button>

          <button
            onClick={() => setActiveMethod('csv')}
            className={`p-6 rounded-lg border-2 transition-all ${
              activeMethod === 'csv'
                ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileSpreadsheet className={`h-8 w-8 mx-auto mb-3 ${activeMethod === 'csv' ? 'text-[#FF5B04]' : 'text-gray-400'}`} />
            <h3 className="font-semibold text-[#16232A] mb-1">CSV Upload</h3>
            <p className="text-sm text-[#16232A]/60">Upload Excel/CSV file</p>
          </button>

          <button
            onClick={() => setActiveMethod('image')}
            className={`p-6 rounded-lg border-2 transition-all ${
              activeMethod === 'image'
                ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <ImageIcon className={`h-8 w-8 mx-auto mb-3 ${activeMethod === 'image' ? 'text-[#FF5B04]' : 'text-gray-400'}`} />
            <h3 className="font-semibold text-[#16232A] mb-1">Image Scan</h3>
            <p className="text-sm text-[#16232A]/60">OCR guest list image</p>
          </button>
        </div>
      </div>

      {/* Manual Entry Form */}
      {activeMethod === 'manual' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#16232A]">Guest Information</h2>
              <Button type="button" onClick={addGuestRow} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Another
              </Button>
            </div>

            <div className="space-y-6">
              {guests.map((guest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-[#16232A]">Guest #{index + 1}</h3>
                    {guests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGuestRow(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={guest.name}
                        onChange={(e) => updateGuest(index, 'name', e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={guest.email}
                          onChange={(e) => updateGuest(index, 'email', e.target.value)}
                          required
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={guest.phone}
                          onChange={(e) => updateGuest(index, 'phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Category *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                          value={guest.category}
                          onChange={(e) => updateGuest(index, 'category', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Dietary Restrictions
                      </label>
                      <input
                        type="text"
                        value={guest.dietaryRestrictions}
                        onChange={(e) => updateGuest(index, 'dietaryRestrictions', e.target.value)}
                        placeholder="e.g., Vegetarian, Gluten-free"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={guest.plusOne}
                          onChange={(e) => updateGuest(index, 'plusOne', e.target.checked)}
                          className="w-4 h-4 text-[#FF5B04] rounded focus:ring-[#FF5B04]"
                        />
                        <span className="text-sm font-medium text-[#16232A]">Allow Plus One</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <Check className="h-4 w-4 mr-2" />
              Add {guests.length} {guests.length === 1 ? 'Guest' : 'Guests'}
            </Button>
          </div>
        </form>
      )}

      {/* CSV Upload */}
      {activeMethod === 'csv' && (
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <FileSpreadsheet className="h-16 w-16 text-[#FF5B04] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#16232A] mb-2">Upload CSV/Excel File</h2>
          <p className="text-[#16232A]/70 mb-6">
            Upload a CSV or Excel file with columns: Name, Email, Phone, Category
          </p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleCSVUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <Button as="span" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </label>
          <p className="text-sm text-[#16232A]/60 mt-4">
            <a href="#" className="text-[#FF5B04] hover:underline">Download sample template</a>
          </p>
        </div>
      )}

      {/* Image Upload */}
      {activeMethod === 'image' && (
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <ImageIcon className="h-16 w-16 text-[#FF5B04] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#16232A] mb-2">Scan Guest List Image</h2>
          <p className="text-[#16232A]/70 mb-6">
            Upload an image of your guest list and we'll extract the information using OCR
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button as="span" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </label>
          <p className="text-sm text-[#16232A]/60 mt-4">
            Supports JPG, PNG, PDF formats
          </p>
        </div>
      )}
    </div>
  );
};
