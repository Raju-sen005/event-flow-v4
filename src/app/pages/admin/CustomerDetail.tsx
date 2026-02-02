import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Ban,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  MessageSquare
} from 'lucide-react';

export const CustomerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  // Mock customer data
  const customer = {
    id: id || '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    joinedDate: '2024-01-15',
    status: 'active',
    location: 'Mumbai, Maharashtra',
    lastActive: '2 hours ago',
    eventsCreated: 5,
    totalSpent: '₹2,45,000',
    disputes: 0
  };

  const events = [
    { id: '1', name: 'Wedding Reception', date: '2024-06-15', status: 'Upcoming', budget: '₹5,00,000' },
    { id: '2', name: 'Corporate Event', date: '2024-04-20', status: 'Completed', budget: '₹2,50,000' },
    { id: '3', name: 'Birthday Party', date: '2024-03-10', status: 'Completed', budget: '₹1,00,000' },
  ];

  const vendorInteractions = [
    { vendor: 'Royal Caterers', service: 'Catering', status: 'Active', budget: '₹2,50,000' },
    { vendor: 'Dream Venues', service: 'Venue', status: 'Completed', budget: '₹5,00,000' },
    { vendor: 'Elegant Decor', service: 'Decoration', status: 'Active', budget: '₹1,50,000' },
  ];

  const activityLog = [
    { action: 'Created event "Wedding Reception"', time: '2 hours ago' },
    { action: 'Accepted bid from Royal Caterers', time: '1 day ago' },
    { action: 'Sent message to Dream Venues', time: '2 days ago' },
    { action: 'Updated event requirements', time: '3 days ago' },
  ];

  const handleSuspend = () => {
    // Logic to suspend customer
    setShowSuspendModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/users')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-gray-900">Customer Details</h1>
            <p className="text-sm text-gray-600">View and manage customer information</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {customer.status === 'active' ? (
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setShowSuspendModal(true)}
            >
              <Ban className="h-4 w-4 mr-2" />
              Suspend Account
            </Button>
          ) : (
            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
              <CheckCircle className="h-4 w-4 mr-2" />
              Reactivate Account
            </Button>
          )}
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl text-blue-600 font-semibold">
              {customer.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-gray-900 mb-2">{customer.name}</h2>
                {customer.status === 'active' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Active Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    <Ban className="h-4 w-4" />
                    Suspended
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Joined {new Date(customer.joinedDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{customer.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-gray-600">Events Created</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{customer.eventsCreated}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-purple-600" />
            <p className="text-sm text-gray-600">Vendor Interactions</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendorInteractions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-gray-600">Disputes</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{customer.disputes}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{customer.totalSpent}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Events Created */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Events Created</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Budget: {event.budget}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Interactions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Vendor Interactions</h3>
          <div className="space-y-3">
            {vendorInteractions.map((interaction, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{interaction.vendor}</p>
                    <p className="text-sm text-gray-600">{interaction.service}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    interaction.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {interaction.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Budget: {interaction.budget}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Activity Log</h3>
        <div className="space-y-3">
          {activityLog.map((log, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="h-2 w-2 bg-[#075056] rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{log.action}</p>
                <p className="text-xs text-gray-500 mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Suspend Customer Account?</h3>
                <p className="text-sm text-gray-600">This action can be reversed later</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to suspend {customer.name}'s account? They won't be able to access the platform until reactivated.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSuspendModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleSuspend}
              >
                Suspend Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};