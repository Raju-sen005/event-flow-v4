import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Clock,
  FileText,
  User,
  Briefcase,
  CheckCircle,
  Eye,
  TrendingUp
} from 'lucide-react';

export const RequirementDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const requirement = {
    id: id || '1',
    title: 'Wedding Catering Service',
    description: 'Looking for premium catering service for a grand wedding reception. Need both traditional Indian cuisine and continental options. Expected guest count is 500+.',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra'
    },
    event: {
      type: 'Wedding Reception',
      date: '2025-04-15',
      time: '18:00',
      location: 'Grand Ballroom, Mumbai',
      guestCount: 500
    },
    service: 'Catering',
    budget: '₹5,00,000',
    postedDate: '2024-03-10',
    status: 'Active',
    bids: [
      {
        id: '1',
        vendorName: 'Royal Caterers',
        vendorRating: 4.8,
        bidAmount: '₹4,50,000',
        submittedDate: '2024-03-11',
        status: 'Shortlisted'
      },
      {
        id: '2',
        vendorName: 'Premium Foods',
        vendorRating: 4.6,
        bidAmount: '₹4,75,000',
        submittedDate: '2024-03-12',
        status: 'Under Review'
      },
      {
        id: '3',
        vendorName: 'Elite Catering Services',
        vendorRating: 4.9,
        bidAmount: '₹5,00,000',
        submittedDate: '2024-03-11',
        status: 'Submitted'
      }
    ],
    attachments: [
      { name: 'Menu Preferences.pdf', size: '245 KB' },
      { name: 'Venue Layout.pdf', size: '1.2 MB' }
    ],
    timeline: [
      { date: '2024-03-10', action: 'Requirement posted', user: 'Priya Sharma' },
      { date: '2024-03-11', action: 'First bid received', user: 'Royal Caterers' },
      { date: '2024-03-11', action: 'Bid shortlisted', user: 'System' },
      { date: '2024-03-12', action: 'Second bid received', user: 'Premium Foods' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/requirements')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requirements
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[#16232A]">{requirement.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                requirement.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {requirement.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Requirement ID: {requirement.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Posted On</p>
            <p className="font-semibold text-gray-900">
              {new Date(requirement.postedDate).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF5B04]/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Budget</p>
              <p className="font-semibold text-gray-900">{requirement.budget}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Service</p>
              <p className="font-semibold text-gray-900">{requirement.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Bids Received</p>
              <p className="font-semibold text-gray-900">{requirement.bids.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Shortlisted</p>
              <p className="font-semibold text-gray-900">
                {requirement.bids.filter(b => b.status === 'Shortlisted').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Requirement Details</h2>
            <p className="text-gray-700 leading-relaxed">{requirement.description}</p>
          </div>

          {/* Event Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Event Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Event Type</p>
                  <p className="font-semibold text-gray-900">{requirement.event.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(requirement.event.date).toLocaleDateString('en-IN')} at {requirement.event.time}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Venue Location</p>
                  <p className="font-semibold text-gray-900">{requirement.event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Expected Guests</p>
                  <p className="font-semibold text-gray-900">{requirement.event.guestCount} people</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Bids */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Vendor Bids ({requirement.bids.length})</h2>
            <div className="space-y-3">
              {requirement.bids.map((bid) => (
                <div key={bid.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF5B04]/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{bid.vendorName}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs font-semibold">{bid.vendorRating}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          bid.status === 'Shortlisted'
                            ? 'bg-green-100 text-green-700'
                            : bid.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {bid.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-gray-600">Bid Amount: </span>
                          <span className="font-semibold text-[#FF5B04]">{bid.bidAmount}</span>
                        </div>
                        <div className="text-gray-600">
                          Submitted: {new Date(bid.submittedDate).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/bids/${bid.id}`)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Bid
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {requirement.attachments.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-[#16232A] mb-4">Attachments</h2>
              <div className="space-y-2">
                {requirement.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{requirement.customer.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900 text-sm break-all">{requirement.customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{requirement.customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{requirement.customer.location}</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate(`/admin/users/${requirement.customer.name}`)}
            >
              View Customer Profile
            </Button>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {requirement.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-[#FF5B04]"></div>
                    {index < requirement.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      by {item.user} • {new Date(item.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
