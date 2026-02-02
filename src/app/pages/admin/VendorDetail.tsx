import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Star,
  Ban,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Award,
  Download,
  AlertCircle
} from 'lucide-react';

export const VendorDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showActionModal, setShowActionModal] = useState<'verify' | 'suspend' | null>(null);

  // Mock vendor data
  const vendor = {
    id: id || '1',
    name: 'Royal Caterers',
    email: 'contact@royalcaterers.com',
    phone: '+91 98765 11111',
    service: 'Catering',
    joinedDate: '2023-11-10',
    status: 'pending' as 'verified' | 'pending' | 'suspended',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    completedJobs: 45,
    activeJobs: 8,
    totalRevenue: '₹12,45,000',
    description: 'Premium catering services for weddings and corporate events with 10+ years of experience.',
  };

  const documents = [
    { name: 'GST Certificate', status: 'Uploaded', verified: true },
    { name: 'Business License', status: 'Uploaded', verified: true },
    { name: 'ID Proof (Aadhar)', status: 'Uploaded', verified: false },
    { name: 'Bank Details', status: 'Uploaded', verified: true },
  ];

  const recentJobs = [
    { id: '1', event: 'Wedding Reception', customer: 'Priya Sharma', amount: '₹2,50,000', status: 'Completed', date: '2024-03-15' },
    { id: '2', event: 'Corporate Event', customer: 'TechCorp', amount: '₹1,75,000', status: 'Active', date: '2024-04-20' },
    { id: '3', event: 'Birthday Party', customer: 'Rahul Mehta', amount: '₹85,000', status: 'Completed', date: '2024-02-28' },
  ];

  const reviews = [
    { customer: 'Priya Sharma', rating: 5, comment: 'Excellent service, food quality was outstanding!', date: '2024-03-16' },
    { customer: 'Ananya Gupta', rating: 4, comment: 'Good experience, timely delivery.', date: '2024-03-01' },
    { customer: 'Vikram Singh', rating: 5, comment: 'Highly professional and cooperative team.', date: '2024-02-15' },
  ];

  const handleVerify = () => {
    // Logic to verify vendor
    setShowActionModal(null);
  };

  const handleSuspend = () => {
    // Logic to suspend vendor
    setShowActionModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/vendors')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-gray-900">Vendor Details</h1>
            <p className="text-sm text-gray-600">Review and verify vendor information</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {vendor.status === 'pending' && (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowActionModal('verify')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Vendor
            </Button>
          )}
          {vendor.status === 'verified' && (
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setShowActionModal('suspend')}
            >
              <Ban className="h-4 w-4 mr-2" />
              Suspend Vendor
            </Button>
          )}
        </div>
      </div>

      {/* Vendor Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl text-purple-600 font-semibold">
              {vendor.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-gray-900 mb-2">{vendor.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {vendor.service}
                  </span>
                  {vendor.status === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  )}
                  {vendor.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                      <Clock className="h-4 w-4" />
                      Pending Verification
                    </span>
                  )}
                  {vendor.status === 'suspended' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      <Ban className="h-4 w-4" />
                      Suspended
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{vendor.description}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Joined {new Date(vendor.joinedDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{vendor.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendor.rating}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600">Completed Jobs</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendor.completedJobs}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-gray-600">Active Jobs</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendor.activeJobs}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendor.totalRevenue}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Documents */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Documents & Verification</h3>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.verified ? (
                    <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  ) : (
                    <Button variant="outline" size="sm">Verify</Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Recent Jobs</h3>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{job.event}</p>
                    <p className="text-sm text-gray-600">{job.customer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{job.amount}</span>
                  <span>{new Date(job.date).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{review.customer}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-IN')}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verify Modal */}
      {showActionModal === 'verify' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Verify Vendor?</h3>
                <p className="text-sm text-gray-600">Allow this vendor to receive bookings</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Please ensure all documents are verified before approving {vendor.name}. Verified vendors can start receiving booking requests.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowActionModal(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleVerify}
              >
                Verify Vendor
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {showActionModal === 'suspend' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Suspend Vendor?</h3>
                <p className="text-sm text-gray-600">This action can be reversed later</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to suspend {vendor.name}? They won't be able to receive new bookings until reactivated.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowActionModal(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleSuspend}
              >
                Suspend Vendor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};