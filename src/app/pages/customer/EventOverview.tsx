import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Edit,
  Settings,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  ShoppingBag,
  MessageSquare,
  Plus,
  DollarSign,
  FileText,
  Mail,
  UserCheck,
  TrendingUp,
  Sparkles,
  Camera,
  Video,
  Utensils,
  Music,
  PartyPopper,
  Phone,
  Download,
  Eye,
  Send,
  Upload,
  Ban
} from 'lucide-react';

// Mock data types
type EventStatus = 'planning' | 'vendors-finalized' | 'in-progress' | 'completed';
type ManagementMode = 'self-managed' | 'planner-managed';
type VendorStatus = 'bid-received' | 'negotiation' | 'finalized' | 'confirmed';
type GuestStatus = 'invited' | 'accepted' | 'declined' | 'maybe';
type InvitationStatus = 'draft' | 'sent';
type PaymentStatus = 'pending' | 'paid' | 'overdue';

export const EventOverview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock event data - In production, fetch from backend based on id
  const event = {
    id: '1',
    name: 'Sarah & John Wedding',
    category: 'Wedding',
    date: '2026-06-15',
    time: '18:00',
    location: 'Grand Hotel Ballroom, New York',
    status: 'planning' as EventStatus,
    managementMode: 'self-managed' as ManagementMode, // or 'planner-managed'
    budget: 50000,
    spent: 32500,
    services: ['Photographer', 'Videographer', 'Catering', 'DJ', 'Decor', 'Venue'],
    notes: 'Vintage garden theme with elegant touches. Focus on natural lighting for photos.',
    createdAt: '2026-01-15'
  };

  // Mock vendors data
  const vendors = [
    {
      id: '1',
      name: 'Elite Photography',
      service: 'Photographer',
      status: 'finalized' as VendorStatus,
      avatar: 'EP',
      price: 5000,
      contact: '+1 234 567 8900'
    },
    {
      id: '2',
      name: 'Dream Catering',
      service: 'Catering',
      status: 'negotiation' as VendorStatus,
      avatar: 'DC',
      price: 15000,
      contact: '+1 234 567 8901'
    },
    {
      id: '3',
      name: 'Sound Beats DJ',
      service: 'DJ',
      status: 'bid-received' as VendorStatus,
      avatar: 'SB',
      price: 3000,
      contact: '+1 234 567 8902'
    }
  ];

  // Mock planner data (for planner-managed events)
  const planner = {
    id: '1',
    name: 'Perfect Events Co.',
    package: 'Premium Wedding Package',
    price: 25000,
    contact: '+1 234 567 8999',
    email: 'contact@perfectevents.com',
    assignedVendors: [
      { name: 'Elite Photography', service: 'Photographer' },
      { name: 'Dream Catering', service: 'Catering' },
      { name: 'Floral Designs', service: 'Decor' }
    ]
  };

  // Mock bids data
  const bids = [
    {
      id: '1',
      vendor: 'Elite Photography',
      service: 'Photographer',
      price: 5000,
      status: 'finalized' as VendorStatus,
      submittedAt: '2026-01-20'
    },
    {
      id: '2',
      vendor: 'Dream Catering',
      service: 'Catering',
      price: 15000,
      status: 'negotiation' as VendorStatus,
      submittedAt: '2026-01-22'
    },
    {
      id: '3',
      vendor: 'Sound Beats DJ',
      service: 'DJ',
      price: 3000,
      status: 'bid-received' as VendorStatus,
      submittedAt: '2026-01-25'
    }
  ];

  // Mock guests data
  const guests = [
    {
      id: '1',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      status: 'accepted' as GuestStatus,
      plusOne: true
    },
    {
      id: '2',
      name: 'Michael Smith',
      email: 'michael@example.com',
      status: 'maybe' as GuestStatus,
      plusOne: false
    },
    {
      id: '3',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      status: 'invited' as GuestStatus,
      plusOne: true
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      status: 'declined' as GuestStatus,
      plusOne: false
    }
  ];

  const guestStats = {
    total: guests.length,
    accepted: guests.filter(g => g.status === 'accepted').length,
    declined: guests.filter(g => g.status === 'declined').length,
    pending: guests.filter(g => g.status === 'invited' || g.status === 'maybe').length
  };

  // Mock invitations data
  const invitations = [
    {
      id: '1',
      type: 'Digital Card',
      status: 'sent' as InvitationStatus,
      sentTo: 150,
      createdAt: '2026-01-18'
    },
    {
      id: '2',
      type: 'Video Invitation',
      status: 'draft' as InvitationStatus,
      sentTo: 0,
      createdAt: '2026-01-28'
    }
  ];

  // Mock payments data
  const payments = [
    {
      id: '1',
      description: 'Venue Booking - 50% Advance',
      amount: 7500,
      dueDate: '2026-02-15',
      status: 'paid' as PaymentStatus,
      paidDate: '2026-02-10'
    },
    {
      id: '2',
      description: 'Photography - Advance Payment',
      amount: 2500,
      dueDate: '2026-03-01',
      status: 'pending' as PaymentStatus
    },
    {
      id: '3',
      description: 'Catering - First Milestone',
      amount: 5000,
      dueDate: '2026-02-01',
      status: 'overdue' as PaymentStatus
    }
  ];

  const paymentStats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    paid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    overdue: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  };

  // Mock agreements data
  const agreements = [
    {
      id: '1',
      name: 'Photography Contract',
      vendor: 'Elite Photography',
      status: 'accepted',
      uploadedAt: '2026-01-22'
    },
    {
      id: '2',
      name: 'Venue Agreement',
      vendor: 'Grand Hotel',
      status: 'sent',
      uploadedAt: '2026-01-20'
    }
  ];

  // Calculate event progress
  const calculateProgress = () => {
    const steps = {
      created: true,
      vendorsSelected: vendors.filter(v => v.status === 'finalized').length > 0,
      paymentsStarted: payments.filter(p => p.status === 'paid').length > 0,
      eventDay: new Date(event.date) <= new Date(),
      completed: event.status === 'completed'
    };

    const completedSteps = Object.values(steps).filter(Boolean).length;
    return (completedSteps / Object.keys(steps).length) * 100;
  };

  const progress = calculateProgress();

  // Progress steps
  const progressSteps = [
    { label: 'Event Created', completed: true },
    {
      label: event.managementMode === 'planner-managed' ? 'Planner Selected' : 'Vendors Selected',
      completed: vendors.filter(v => v.status === 'finalized').length > 0
    },
    { label: 'Payments In Progress', completed: payments.filter(p => p.status === 'paid').length > 0 },
    { label: 'Event Day', completed: new Date(event.date) <= new Date() },
    { label: 'Event Completed', completed: event.status === 'completed' }
  ];

  const currentStepIndex = progressSteps.findIndex(step => !step.completed);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/customer/events')}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-[#16232A]">{event.name}</h1>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    event.status === 'planning'
                      ? 'bg-blue-100 text-blue-700'
                      : event.status === 'vendors-finalized'
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'in-progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {event.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    event.managementMode === 'planner-managed'
                      ? 'bg-[#075056]/10 text-[#075056]'
                      : 'bg-[#FF5B04]/10 text-[#FF5B04]'
                  }`}
                >
                  {event.managementMode === 'planner-managed' ? 'Planner-Managed' : 'Self-Managed'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[#16232A]/70">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Progress Indicator */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#16232A]">Event Progress</h2>
          <span className="text-2xl font-bold text-[#FF5B04]">{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute h-full bg-[#FF5B04]"
            />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-5 gap-2">
          {progressSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step.completed
                    ? 'bg-[#FF5B04] text-white'
                    : index === currentStepIndex
                    ? 'bg-[#FF5B04]/20 text-[#FF5B04]'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              <p className={`text-xs ${step.completed ? 'text-[#16232A]' : 'text-[#16232A]/50'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to={`/customer/guests/add?event=${id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#075056] transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-[#075056]/10 rounded-lg flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-[#075056]" />
            </div>
            <p className="font-semibold text-[#16232A]">Manage Guests</p>
            <p className="text-xs text-[#16232A]/60 mt-1">{guestStats.total} guests</p>
          </motion.div>
        </Link>

        {event.managementMode === 'self-managed' && (
          <Link to={`/customer/events/${id}/vendor-selection`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#FF5B04] transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#FF5B04]/10 rounded-lg flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-[#FF5B04]" />
              </div>
              <p className="font-semibold text-[#16232A]">Add Vendors</p>
              <p className="text-xs text-[#16232A]/60 mt-1">Select vendors</p>
            </motion.div>
          </Link>
        )}

        {event.managementMode === 'self-managed' && (
          <Link to={`/customer/events/${id}/bids`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#075056] transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#075056]/10 rounded-lg flex items-center justify-center mb-3">
                <ShoppingBag className="h-6 w-6 text-[#075056]" />
              </div>
              <p className="font-semibold text-[#16232A]">View Bids</p>
              <p className="text-xs text-[#16232A]/60 mt-1">{bids.length} bids received</p>
            </motion.div>
          </Link>
        )}

        <Link to="/customer/messages">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-blue-500" />
            </div>
            <p className="font-semibold text-[#16232A]">Messages</p>
            <p className="text-xs text-[#16232A]/60 mt-1">Chat with vendors</p>
          </motion.div>
        </Link>

        <Link to={`/customer/events/${id}/payments`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-500 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <p className="font-semibold text-[#16232A]">Payments</p>
            <p className="text-xs text-[#16232A]/60 mt-1">
              ${paymentStats.pending.toLocaleString()} pending
            </p>
          </motion.div>
        </Link>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">
            {event.managementMode === 'planner-managed' ? 'Planner' : 'Vendors'}
          </TabsTrigger>
          {event.managementMode === 'self-managed' && <TabsTrigger value="bids">Bids</TabsTrigger>}
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Event Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#16232A] mb-4">Event Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Category:</span>
                  <span className="font-medium text-[#16232A]">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Management:</span>
                  <span className="font-medium text-[#16232A]">
                    {event.managementMode === 'planner-managed'
                      ? 'Event Planner'
                      : 'Self-Managed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Services:</span>
                  <span className="font-medium text-[#16232A]">{event.services.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Budget:</span>
                  <span className="font-medium text-[#16232A]">
                    ${event.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              {event.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-[#16232A] mb-2">Notes</p>
                  <p className="text-sm text-[#16232A]/70">{event.notes}</p>
                </div>
              )}
            </div>

            {/* Key Status Highlights */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#16232A] mb-4">Status Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#16232A]">Vendors Finalized</p>
                      <p className="text-sm text-[#16232A]/60">
                        {vendors.filter(v => v.status === 'finalized').length} of {vendors.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#16232A]">Payments Pending</p>
                      <p className="text-sm text-[#16232A]/60">
                        ${paymentStats.pending.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#16232A]">Guest RSVPs</p>
                      <p className="text-sm text-[#16232A]/60">
                        {guestStats.accepted} accepted / {guestStats.total} invited
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#16232A]">Invitations</p>
                      <p className="text-sm text-[#16232A]/60">
                        {invitations.filter(i => i.status === 'sent').length} sent
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Required */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-4">Services Required</h3>
            <div className="flex flex-wrap gap-2">
              {event.services.map((service, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#E4EEF0] text-[#16232A] rounded-lg font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Vendors/Planner Tab */}
        <TabsContent value="vendors" className="space-y-6">
          {event.managementMode === 'self-managed' ? (
            // Self-Managed: Show Vendors
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#16232A]">Selected Vendors</h3>
                <Link to="/customer/vendors/post-requirement">
                  <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vendor
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {vendors.map(vendor => (
                  <div
                    key={vendor.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FF5B04] rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">{vendor.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A]">{vendor.name}</p>
                        <p className="text-sm text-[#16232A]/60">{vendor.service}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-[#16232A]">
                          ${vendor.price.toLocaleString()}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            vendor.status === 'finalized'
                              ? 'bg-green-100 text-green-700'
                              : vendor.status === 'negotiation'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {vendor.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Planner-Managed: Show Planner Info
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#075056] to-[#075056]/80 rounded-xl p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{planner.name}</h3>
                      <p className="text-white/80">{planner.package}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">Package Price</p>
                    <p className="text-2xl font-bold">${planner.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="secondary" size="sm" className="bg-white text-[#075056]">
                    <Phone className="h-4 w-4 mr-2" />
                    {planner.contact}
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white text-[#075056]">
                    <Mail className="h-4 w-4 mr-2" />
                    {planner.email}
                  </Button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900">
                  <strong>This event is managed by an Event Planner.</strong> All vendor
                  coordination and management is handled by your planner. Direct vendor
                  selection is disabled.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#16232A] mb-4">Assigned Vendors</h3>
                <p className="text-sm text-[#16232A]/60 mb-4">
                  These vendors have been selected by your event planner
                </p>
                <div className="space-y-3">
                  {planner.assignedVendors.map((vendor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
                    >
                      <div className="w-10 h-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-[#075056]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#16232A]">{vendor.name}</p>
                        <p className="text-sm text-[#16232A]/60">{vendor.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Bids Tab (Self-Managed Only) */}
        {event.managementMode === 'self-managed' && (
          <TabsContent value="bids" className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#16232A] mb-6">Received Bids</h3>

              <div className="space-y-3">
                {bids.map(bid => (
                  <div
                    key={bid.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[#16232A]">{bid.vendor}</p>
                      <p className="text-sm text-[#16232A]/60">{bid.service}</p>
                      <p className="text-xs text-[#16232A]/50 mt-1">
                        Submitted: {new Date(bid.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#16232A]">
                          ${bid.price.toLocaleString()}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            bid.status === 'finalized'
                              ? 'bg-green-100 text-green-700'
                              : bid.status === 'negotiation'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {bid.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {bid.status !== 'finalized' && (
                          <Button size="sm" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                            Negotiate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        )}

        {/* Guests Tab */}
        <TabsContent value="guests" className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#16232A]">Guest List</h3>
                <p className="text-sm text-[#16232A]/60 mt-1">
                  {guestStats.total} guests • {guestStats.accepted} accepted • {guestStats.declined} declined
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
                <Link to={`/customer/guests/add?event=${id}`}>
                  <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Guests
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              {guests.map(guest => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E4EEF0] rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-[#16232A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#16232A]">{guest.name}</p>
                      <p className="text-sm text-[#16232A]/60">{guest.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {guest.plusOne && (
                      <span className="text-xs text-[#16232A]/50">+1</span>
                    )}
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        guest.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : guest.status === 'declined'
                          ? 'bg-red-100 text-red-700'
                          : guest.status === 'maybe'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {guest.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Invitations Tab */}
        <TabsContent value="invitations" className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#16232A]">Invitations</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Custom
                </Button>
                <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {invitations.map(invitation => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#16232A]">{invitation.type}</p>
                      <p className="text-sm text-[#16232A]/60">
                        {invitation.status === 'sent'
                          ? `Sent to ${invitation.sentTo} guests`
                          : 'Not sent yet'}
                      </p>
                      <p className="text-xs text-[#16232A]/50 mt-1">
                        Created: {new Date(invitation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        invitation.status === 'sent'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {invitation.status}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {invitation.status === 'draft' && (
                        <Button size="sm" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          {/* Payment Summary */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#16232A]/60 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-[#16232A]">
                ${paymentStats.total.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#16232A]/60 mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-600">
                ${paymentStats.paid.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#16232A]/60 mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-600">
                ${paymentStats.pending.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#16232A]/60 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                ${paymentStats.overdue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment List */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#16232A] mb-6">Payment Schedule</h3>

            <div className="space-y-3">
              {payments.map(payment => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-[#16232A]">{payment.description}</p>
                    <p className="text-sm text-[#16232A]/60">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                    {payment.paidDate && (
                      <p className="text-xs text-green-600 mt-1">
                        Paid on {new Date(payment.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#16232A]">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : payment.status === 'overdue'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    {payment.status !== 'paid' && (
                      <Button size="sm" className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Agreements Tab */}
        <TabsContent value="agreements" className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#16232A]">Agreements & Contracts</h3>
              <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Agreement
              </Button>
            </div>

            <div className="space-y-3">
              {agreements.map(agreement => (
                <div
                  key={agreement.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#075056]/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-[#075056]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#16232A]">{agreement.name}</p>
                      <p className="text-sm text-[#16232A]/60">{agreement.vendor}</p>
                      <p className="text-xs text-[#16232A]/50 mt-1">
                        Uploaded: {new Date(agreement.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        agreement.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : agreement.status === 'sent'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {agreement.status}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};