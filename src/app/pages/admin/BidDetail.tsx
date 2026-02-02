import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Star,
  TrendingUp,
  Package
} from 'lucide-react';

export const BidDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const bid = {
    id: id || '1',
    requirement: {
      id: 'REQ-1234',
      title: 'Wedding Catering Service',
      eventType: 'Wedding Reception',
      eventDate: '2025-04-15',
      location: 'Grand Ballroom, Mumbai',
      budget: '₹5,00,000'
    },
    vendor: {
      id: 'VEN-001',
      name: 'Royal Caterers',
      email: 'contact@royalcaterers.com',
      phone: '+91 98765 11111',
      service: 'Catering',
      rating: 4.8,
      completedJobs: 45,
      location: 'Mumbai, Maharashtra'
    },
    bidAmount: '₹4,50,000',
    submittedDate: '2024-03-11',
    validUntil: '2024-04-11',
    status: 'Shortlisted',
    proposal: 'We are pleased to submit our proposal for catering services for your wedding reception. Our team specializes in creating memorable dining experiences with a perfect blend of traditional Indian cuisine and continental options. We have successfully catered to over 45 weddings and events with consistent 5-star reviews.',
    inclusions: [
      'Traditional Indian cuisine (5 varieties)',
      'Continental dishes (3 varieties)',
      'Welcome drinks and appetizers',
      'Live cooking counters',
      'Dessert bar with 4 varieties',
      'Professional serving staff (20 people)',
      'Table setup and decoration',
      'Premium crockery and cutlery'
    ],
    exclusions: [
      'Venue rental',
      'Alcohol and beverages',
      'Additional day charges',
      'Overtime beyond 6 hours'
    ],
    paymentTerms: {
      advance: '40% at booking',
      milestone: '40% one week before event',
      final: '20% after event completion'
    },
    timeline: [
      { date: '2024-03-11', action: 'Bid submitted', status: 'Completed' },
      { date: '2024-03-12', action: 'Under admin review', status: 'Completed' },
      { date: '2024-03-13', action: 'Shortlisted by customer', status: 'Completed' },
      { date: '2024-03-15', action: 'Awaiting customer decision', status: 'In Progress' }
    ],
    attachments: [
      { name: 'Menu Card.pdf', size: '450 KB' },
      { name: 'Sample Photos.pdf', size: '2.1 MB' },
      { name: 'Terms & Conditions.pdf', size: '180 KB' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/bids')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bids
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[#16232A]">Bid Details</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                bid.status === 'Shortlisted'
                  ? 'bg-green-100 text-green-700'
                  : bid.status === 'Under Review'
                  ? 'bg-blue-100 text-blue-700'
                  : bid.status === 'Accepted'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {bid.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Bid ID: {bid.id}</p>
          </div>
          <div className="text-2xl font-bold text-[#FF5B04]">{bid.bidAmount}</div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Submitted</p>
              <p className="font-semibold text-gray-900 text-sm">
                {new Date(bid.submittedDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Valid Until</p>
              <p className="font-semibold text-gray-900 text-sm">
                {new Date(bid.validUntil).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Vendor Rating</p>
              <p className="font-semibold text-gray-900">{bid.vendor.rating} ★</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Completed Jobs</p>
              <p className="font-semibold text-gray-900">{bid.vendor.completedJobs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Requirement Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Requirement Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Requirement ID</span>
                <span className="font-semibold text-[#FF5B04]">{bid.requirement.id}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Title</p>
                <p className="font-semibold text-gray-900">{bid.requirement.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Event Type</p>
                  <p className="font-semibold text-gray-900">{bid.requirement.eventType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Budget</p>
                  <p className="font-semibold text-gray-900">{bid.requirement.budget}</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate(`/admin/requirements/${bid.requirement.id}`)}
            >
              View Full Requirement
            </Button>
          </div>

          {/* Bid Proposal */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Bid Proposal</h2>
            <p className="text-gray-700 leading-relaxed">{bid.proposal}</p>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Package Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Inclusions
                </h3>
                <ul className="space-y-2">
                  {bid.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-600" />
                  Exclusions
                </h3>
                <ul className="space-y-2">
                  {bid.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Payment Terms</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Advance Payment</span>
                <span className="font-semibold text-gray-900">{bid.paymentTerms.advance}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Milestone Payment</span>
                <span className="font-semibold text-gray-900">{bid.paymentTerms.milestone}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Final Payment</span>
                <span className="font-semibold text-gray-900">{bid.paymentTerms.final}</span>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {bid.attachments.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-[#16232A] mb-4">Attachments</h2>
              <div className="space-y-2">
                {bid.attachments.map((file, index) => (
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
          {/* Vendor Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Vendor Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Vendor Name</p>
                  <p className="font-semibold text-gray-900">{bid.vendor.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Service Type</p>
                  <p className="font-semibold text-gray-900">{bid.vendor.service}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Rating</p>
                  <p className="font-semibold text-gray-900">{bid.vendor.rating} / 5.0</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900 text-sm break-all">{bid.vendor.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{bid.vendor.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{bid.vendor.location}</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate(`/admin/vendors/${bid.vendor.id}`)}
            >
              View Vendor Profile
            </Button>
          </div>

          {/* Bid Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Bid Timeline</h2>
            <div className="space-y-4">
              {bid.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-2 w-2 rounded-full ${
                      item.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    {index < bid.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(item.date).toLocaleDateString('en-IN')}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
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
