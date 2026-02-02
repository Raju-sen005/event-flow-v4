import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Save, 
  Edit,
  Plus,
  Trash2,
  X,
  Upload,
  Calendar,
  Eye,
  EyeOff,
  Check,
  Image as ImageIcon,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { VendorKYC } from '../../components/vendor/VendorKYC';

interface VendorProfile {
  businessName: string;
  ownerName: string;
  category: string;
  location: string;
  experience: string;
  phone: string;
  email: string;
  description: string;
  serviceLocations: string;
  rating: number;
  totalReviews: number;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  eventType: string;
  images: string[];
  date: string;
  notes?: string;
  isActive: boolean;
}

interface PackageItem {
  id: string;
  name: string;
  description: string;
  price: string;
  inclusions: string[];
  exclusions: string[];
  isActive: boolean;
}

export const VendorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Vendor profile state
  const [vendorProfile, setVendorProfile] = useState<VendorProfile>({
    businessName: 'Elegance Wedding Photography',
    ownerName: 'Priya Sharma',
    category: 'Photographer',
    location: 'Mumbai, Maharashtra',
    experience: '8 years',
    phone: '+91 98765 43210',
    email: 'priya@elegancephoto.com',
    description: 'We are a premium photography service provider specializing in weddings, corporate events, and special occasions. With over 8 years of experience, we deliver exceptional visual storytelling that captures your most precious moments.',
    serviceLocations: 'Mumbai, Pune, Goa, Bangalore',
    rating: 4.8,
    totalReviews: 127
  });

  const [editedProfile, setEditedProfile] = useState<VendorProfile>(vendorProfile);

  // Profile handlers
  const handleEditProfile = () => {
    setEditedProfile(vendorProfile);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setVendorProfile(editedProfile);
    setIsEditingProfile(false);
  };

  const handleCancelEditProfile = () => {
    setEditedProfile(vendorProfile);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#16232A] mb-2">Vendor Profile</h1>
        <p className="text-gray-600">Manage your business profile, portfolio, and service packages</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-[#FF5B04] text-[#FF5B04]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-4 w-4" />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'kyc'
                  ? 'border-[#FF5B04] text-[#FF5B04]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield className="h-4 w-4" />
              KYC
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Details Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#16232A]">Business Profile</h2>
                {!isEditingProfile ? (
                  <Button 
                    onClick={handleEditProfile}
                    className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleCancelEditProfile}
                      className="border-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              {!isEditingProfile ? (
                // View Mode
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Business Name</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1">{vendorProfile.businessName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner Name</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1">{vendorProfile.ownerName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1">{vendorProfile.category}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1">{vendorProfile.experience}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {vendorProfile.location}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Service Locations</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1">{vendorProfile.serviceLocations}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {vendorProfile.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {vendorProfile.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rating</label>
                      <p className="text-base font-semibold text-[#16232A] mt-1 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        {vendorProfile.rating} ({vendorProfile.totalReviews} reviews)
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Business Description</label>
                    <p className="text-base text-gray-700 mt-2 leading-relaxed">{vendorProfile.description}</p>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Business Name *</label>
                      <input
                        type="text"
                        value={editedProfile.businessName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, businessName: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Owner Name *</label>
                      <input
                        type="text"
                        value={editedProfile.ownerName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, ownerName: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Category *</label>
                      <select
                        value={editedProfile.category}
                        onChange={(e) => setEditedProfile({ ...editedProfile, category: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      >
                        <option value="Photographer">Photographer</option>
                        <option value="Caterer">Caterer</option>
                        <option value="Decorator">Decorator</option>
                        <option value="Event Planner">Event Planner</option>
                        <option value="DJ & Sound">DJ & Sound</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Experience *</label>
                      <input
                        type="text"
                        value={editedProfile.experience}
                        onChange={(e) => setEditedProfile({ ...editedProfile, experience: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Location *</label>
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Service Locations *</label>
                      <input
                        type="text"
                        value={editedProfile.serviceLocations}
                        onChange={(e) => setEditedProfile({ ...editedProfile, serviceLocations: e.target.value })}
                        placeholder="e.g., Mumbai, Pune, Goa"
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Phone *</label>
                      <input
                        type="text"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#16232A] mb-2 block">Email *</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#16232A] mb-2 block">Business Description *</label>
                    <textarea
                      value={editedProfile.description}
                      onChange={(e) => setEditedProfile({ ...editedProfile, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* KYC Tab */}
          {activeTab === 'kyc' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VendorKYC />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};