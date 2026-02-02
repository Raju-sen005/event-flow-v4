import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  ShoppingBag,
  Plus,
  DollarSign,
  FileText,
  Mail,
  UserCheck,
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
  Ban,
  Filter,
  X,
  Check,
  Shield,
  Info,
  TrendingUp,
  LogIn,
  LogOut,
  AlertTriangle,
  QrCode,
  Gift
} from 'lucide-react';

// Types
type EventStatus = 'planning' | 'vendors-finalized' | 'in-progress' | 'completed';
type ManagementMode = 'self-managed' | 'planner-managed';
type VendorStatus = 'invited' | 'bid-received' | 'negotiation' | 'finalized';
type GuestStatus = 'not-invited' | 'sent' | 'accepted' | 'declined' | 'maybe';
type BidStatus = 'pending' | 'negotiating' | 'accepted' | 'rejected';
type PaymentStatus = 'pending' | 'paid' | 'cash-under-review' | 'overdue';

export const EventOverviewEnhanced: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Filters
  const [vendorServiceFilter, setVendorServiceFilter] = useState<string>('all');
  const [vendorStatusFilter, setVendorStatusFilter] = useState<string>('all');
  const [guestStatusFilter, setGuestStatusFilter] = useState<string>('all');
  const [bidServiceFilter, setBidServiceFilter] = useState<string>('all');
  const [bidStatusFilter, setBidStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');

  // Mock event data
  const event = {
    id: id || '1',
    name: 'Sarah & John Wedding',
    category: 'Wedding',
    date: '2026-06-15',
    time: '18:00',
    endTime: '23:00',
    location: 'Grand Hotel Ballroom, New York',
    status: 'planning' as EventStatus,
    managementMode: 'self-managed' as ManagementMode,
    budget: 50000,
    spent: 32500,
    services: ['Photography', 'Videography', 'Catering', 'DJ Services', 'Decoration', 'Venue'],
    notes: 'Vintage garden theme with elegant touches.',
    createdAt: '2026-01-15T10:00:00'
  };

  // Progress steps
  const progressSteps = [
    { id: 1, name: 'Event Created', status: 'completed', date: '2026-01-15' },
    { id: 2, name: 'Vendors Selected', status: 'in-progress', date: null },
    { id: 3, name: 'Payments In Progress', status: 'pending', date: null },
    { id: 4, name: 'Event Day', status: 'pending', date: '2026-06-15' },
    { id: 5, name: 'Event Completed', status: 'pending', date: null }
  ];

  // Mock vendors
  const vendors = [
    {
      id: '1',
      name: 'Elite Photography Studio',
      service: 'Photography',
      status: 'finalized' as VendorStatus,
      price: 5000,
      contact: '+1 234 567 8900'
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      service: 'Catering',
      status: 'negotiation' as VendorStatus,
      price: 15000,
      contact: '+1 234 567 8901'
    },
    {
      id: '3',
      name: 'DJ Beats Entertainment',
      service: 'DJ Services',
      status: 'bid-received' as VendorStatus,
      price: 3000,
      contact: '+1 234 567 8902'
    },
    {
      id: '4',
      name: 'Elegant Event Decor',
      service: 'Decoration',
      status: 'invited' as VendorStatus,
      price: 4000,
      contact: '+1 234 567 8903'
    }
  ];

  // Mock bids
  const bids = [
    {
      id: '1',
      vendorName: 'Elite Photography Studio',
      service: 'Photography',
      amount: 5000,
      status: 'accepted' as BidStatus,
      submittedAt: '2026-01-20T10:00:00'
    },
    {
      id: '2',
      vendorName: 'Gourmet Catering Co.',
      service: 'Catering',
      amount: 15000,
      status: 'negotiating' as BidStatus,
      submittedAt: '2026-01-22T14:00:00'
    },
    {
      id: '3',
      vendorName: 'DJ Beats Entertainment',
      service: 'DJ Services',
      amount: 3000,
      status: 'pending' as BidStatus,
      submittedAt: '2026-01-25T09:00:00'
    }
  ];

  // Mock guests
  const guests = [
    {
      id: '1',
      name: 'Emily Johnson',
      phone: '+1 234 567 8901',
      email: 'emily@example.com',
      status: 'accepted' as GuestStatus,
      category: 'friend'
    },
    {
      id: '2',
      name: 'Michael Smith',
      phone: '+1 234 567 8902',
      status: 'maybe' as GuestStatus,
      category: 'family'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      phone: '+1 234 567 8903',
      status: 'sent' as GuestStatus,
      category: 'friend'
    }
  ];

  // Mock payments
  const payments = [
    {
      id: '1',
      milestone: 'Booking Advance',
      amount: 11250,
      dueDate: '2026-02-01',
      status: 'paid' as PaymentStatus,
      paidDate: '2026-01-28'
    },
    {
      id: '2',
      milestone: 'First Milestone',
      amount: 11250,
      dueDate: '2026-04-01',
      status: 'pending' as PaymentStatus
    },
    {
      id: '3',
      milestone: 'Second Milestone',
      amount: 11250,
      dueDate: '2026-05-15',
      status: 'pending' as PaymentStatus
    }
  ];

  // Calculate stats
  const stats = {
    vendorsFinalized: vendors.filter(v => v.status === 'finalized').length,
    totalVendors: event.services.length,
    pendingPayments: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    guestsResponded: guests.filter(g => g.status === 'accepted' || g.status === 'declined').length,
    guestsTotal: guests.length
  };

  // Filter functions
  const filteredVendors = vendors.filter(v => {
    const serviceMatch = vendorServiceFilter === 'all' || v.service === vendorServiceFilter;
    const statusMatch = vendorStatusFilter === 'all' || v.status === vendorStatusFilter;
    return serviceMatch && statusMatch;
  });

  const filteredBids = bids.filter(b => {
    const serviceMatch = bidServiceFilter === 'all' || b.service === bidServiceFilter;
    const statusMatch = bidStatusFilter === 'all' || b.status === bidStatusFilter;
    return serviceMatch && statusMatch;
  });

  const filteredGuests = guests.filter(g => {
    return guestStatusFilter === 'all' || g.status === guestStatusFilter;
  });

  const filteredPayments = payments.filter(p => {
    return paymentStatusFilter === 'all' || p.status === paymentStatusFilter;
  });

  // Status badge helper
  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-700';
      case 'vendors-finalized':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Check if edit is allowed
  const canEditEvent = event.status === 'planning';

  // Confirmation modal helper
  const showConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmModal(true);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customer/events')}
        className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </button>

      {/* Event Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#16232A]">{event.name}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(event.status)}`}>
                {event.status.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>
            <p className="text-[#16232A]/70 mb-4">{event.category}</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-[#16232A]/70">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-[#16232A]/70">
                <Clock className="h-5 w-5" />
                <span>{event.time} - {event.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-[#16232A]/70">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Tooltip text="Event details cannot be edited after execution starts" show={!canEditEvent}>
              <Button
                onClick={() => canEditEvent && setShowEditModal(true)}
                disabled={!canEditEvent}
                variant="outline"
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
            </Tooltip>
            <Button
              onClick={() => navigate(`/customer/events/${id}/timeline`)}
              variant="outline"
            >
              <Clock className="h-4 w-4 mr-2" />
              View Timeline
            </Button>
          </div>
        </div>
      </div>

      {/* Event Progress Tracker */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-[#16232A] mb-6">Event Progress</h3>
        <div className="relative">
          <div className="flex justify-between">
            {progressSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                {/* Line connector */}
                {index < progressSteps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    style={{ zIndex: 0 }}
                  />
                )}

                {/* Step circle */}
                <button
                  onClick={() => step.status === 'completed' && setActiveTab('overview')}
                  disabled={step.status !== 'completed'}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.status === 'completed'
                      ? 'bg-green-500 text-white cursor-pointer hover:scale-110'
                      : step.status === 'in-progress'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </button>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-[#16232A]">{step.name}</p>
                  {step.date && (
                    <p className="text-xs text-[#16232A]/50 mt-1">
                      {new Date(step.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-5 gap-6">
        <QuickActionCard
          title="Vendors"
          count={`${stats.vendorsFinalized}/${stats.totalVendors}`}
          icon={ShoppingBag}
          color="blue"
          onClick={() => setActiveTab('vendors')}
          disabled={event.managementMode === 'planner-managed'}
          tooltip={event.managementMode === 'planner-managed' ? 'Vendors are managed by your Event Planner' : ''}
        />
        <QuickActionCard
          title="Bids"
          count={bids.length}
          icon={FileText}
          color="purple"
          onClick={() => setActiveTab('bids')}
          disabled={event.managementMode === 'planner-managed'}
          tooltip={event.managementMode === 'planner-managed' ? 'Bids are managed by your Event Planner' : ''}
        />
        <QuickActionCard
          title="Guests"
          count={`${stats.guestsResponded}/${stats.guestsTotal}`}
          icon={Users}
          color="green"
          onClick={() => setActiveTab('guests')}
        />
        <QuickActionCard
          title="Invitations"
          count="Ready"
          icon={Mail}
          color="amber"
          onClick={() => setActiveTab('invitations')}
        />
        <QuickActionCard
          title="Payments"
          count={`$${stats.pendingPayments.toLocaleString()}`}
          icon={DollarSign}
          color="red"
          onClick={() => setActiveTab('payments')}
        />
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200 p-1 flex-wrap h-auto w-full">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="vendors"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            {event.managementMode === 'planner-managed' ? 'Planner' : 'Vendors'}
          </TabsTrigger>
          <TabsTrigger 
            value="bids" 
            disabled={event.managementMode === 'planner-managed'}
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bids
          </TabsTrigger>
          <TabsTrigger 
            value="guests"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Guests
          </TabsTrigger>
          <TabsTrigger 
            value="invitations"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Invitations
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Payments & Invoices
          </TabsTrigger>
          <TabsTrigger 
            value="agreements"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Agreements
          </TabsTrigger>
          <TabsTrigger 
            value="execution"
            className="data-[state=active]:bg-[#FF5B04] data-[state=active]:text-white"
          >
            Execution
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <OverviewTab
            event={event}
            stats={stats}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        </TabsContent>

        {/* Vendors/Planner Tab */}
        <TabsContent value="vendors">
          {event.managementMode === 'self-managed' ? (
            <VendorsTab
              vendors={filteredVendors}
              services={event.services}
              serviceFilter={vendorServiceFilter}
              statusFilter={vendorStatusFilter}
              onServiceFilterChange={setVendorServiceFilter}
              onStatusFilterChange={setVendorStatusFilter}
              onAddVendor={() => navigate(`/customer/events/${id}/vendor-selection`)}
              onViewVendor={(vendorId) => navigate(`/customer/events/${id}/vendor-profile/${vendorId}`)}
              onViewBid={(bidId) => navigate(`/customer/events/${id}/bids/${bidId}`)}
            />
          ) : (
            <PlannerTab />
          )}
        </TabsContent>

        {/* Bids Tab */}
        <TabsContent value="bids">
          <BidsTab
            bids={filteredBids}
            services={event.services}
            serviceFilter={bidServiceFilter}
            statusFilter={bidStatusFilter}
            onServiceFilterChange={setBidServiceFilter}
            onStatusFilterChange={setBidStatusFilter}
            onViewBid={(bidId) => navigate(`/customer/events/${id}/bids/${bidId}`)}
          />
        </TabsContent>

        {/* Guests Tab */}
        <TabsContent value="guests">
          <GuestsTab
            guests={filteredGuests}
            statusFilter={guestStatusFilter}
            onStatusFilterChange={setGuestStatusFilter}
            onAddGuest={() => navigate(`/customer/events/${id}/guests`)}
            onUploadCSV={() => navigate(`/customer/events/${id}/guests`)}
          />
        </TabsContent>

        {/* Invitations Tab */}
        <TabsContent value="invitations">
          <InvitationsTab
            onCreateInvitation={() => navigate(`/customer/events/${id}/guests`)}
            onSendInvitations={() => navigate(`/customer/events/${id}/guests`)}
          />
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <PaymentsTab
            payments={filteredPayments}
            statusFilter={paymentStatusFilter}
            onStatusFilterChange={setPaymentStatusFilter}
            onPayNow={(paymentId) => navigate(`/customer/events/${id}/payments-detail`)}
            onViewDetails={() => navigate(`/customer/events/${id}/payments-detail`)}
          />
        </TabsContent>

        {/* Agreements Tab */}
        <TabsContent value="agreements">
          <AgreementsTab
            onAddAgreement={() => navigate(`/customer/events/${id}/agreements-new/add`)}
            onViewAgreements={() => navigate(`/customer/events/${id}/agreements-new`)}
          />
        </TabsContent>

        {/* Execution Tab */}
        <TabsContent value="execution">
          <ExecutionTab
            onViewExecution={() => navigate(`/customer/events/${id}/execution`)}
          />
        </TabsContent>
      </Tabs>

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <ConfirmationModal
          title={confirmAction.title}
          message={confirmAction.message}
          onConfirm={() => {
            confirmAction.onConfirm();
            setShowConfirmModal(false);
            setConfirmAction(null);
          }}
          onCancel={() => {
            setShowConfirmModal(false);
            setConfirmAction(null);
          }}
        />
      )}
    </div>
  );
};

// Tooltip Component
const Tooltip: React.FC<{
  children: React.ReactNode;
  text: string;
  show: boolean;
}> = ({ children, text, show }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {show && isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#16232A] text-white text-xs rounded-lg whitespace-nowrap z-50">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-[#16232A]" />
          </div>
        </div>
      )}
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard: React.FC<{
  title: string;
  count: string | number;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
}> = ({ title, count, icon: Icon, color, onClick, disabled = false, tooltip = '' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <Tooltip text={tooltip} show={disabled && tooltip !== ''}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-white rounded-xl p-6 border border-gray-200 text-left transition-all ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-lg cursor-pointer'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#16232A] mb-1">{count}</p>
        <p className="text-sm text-[#16232A]/60">{title}</p>
      </button>
    </Tooltip>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  event: any;
  stats: any;
  onNavigate: (tab: string) => void;
}> = ({ event, stats, onNavigate }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#16232A] mb-4">Event Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#E4EEF0] rounded-lg p-4">
            <p className="text-sm text-[#16232A]/60 mb-1">Budget</p>
            <p className="text-2xl font-bold text-[#16232A]">${event.budget.toLocaleString()}</p>
          </div>
          <div className="bg-[#E4EEF0] rounded-lg p-4">
            <p className="text-sm text-[#16232A]/60 mb-1">Spent</p>
            <p className="text-2xl font-bold text-[#16232A]">${event.spent.toLocaleString()}</p>
          </div>
          <div className="bg-[#E4EEF0] rounded-lg p-4">
            <p className="text-sm text-[#16232A]/60 mb-1">Remaining</p>
            <p className="text-2xl font-bold text-green-600">${(event.budget - event.spent).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#16232A] mb-4">Key Metrics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-[#16232A]">Vendors Finalized</span>
            </div>
            <span className="text-lg font-bold text-[#16232A]">
              {stats.vendorsFinalized} / {stats.totalVendors}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-[#16232A]">Pending Payments</span>
            </div>
            <span className="text-lg font-bold text-amber-600">
              ${stats.pendingPayments.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-[#16232A]">Guest Responses</span>
            </div>
            <span className="text-lg font-bold text-[#16232A]">
              {stats.guestsResponded} / {stats.guestsTotal}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#16232A] mb-4">Pending Actions</h3>
        <div className="space-y-2">
          {stats.vendorsFinalized < stats.totalVendors && (
            <button
              onClick={() => onNavigate('vendors')}
              className="w-full flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="text-[#16232A] font-medium">Finalize remaining vendors</span>
              </div>
              <span className="text-[#FF5B04] font-semibold">Resolve Now →</span>
            </button>
          )}
          {stats.pendingPayments > 0 && (
            <button
              onClick={() => onNavigate('payments')}
              className="w-full flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="text-[#16232A] font-medium">Complete pending payments</span>
              </div>
              <span className="text-[#FF5B04] font-semibold">Resolve Now →</span>
            </button>
          )}
          {stats.guestsResponded < stats.guestsTotal && (
            <button
              onClick={() => onNavigate('guests')}
              className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-blue-600" />
                <span className="text-[#16232A] font-medium">Follow up with pending guests</span>
              </div>
              <span className="text-[#FF5B04] font-semibold">View Guests →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Vendors Tab Component
const VendorsTab: React.FC<{
  vendors: any[];
  services: string[];
  serviceFilter: string;
  statusFilter: string;
  onServiceFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onAddVendor: () => void;
  onViewVendor: (vendorId: string) => void;
  onViewBid: (bidId: string) => void;
}> = ({
  vendors,
  services,
  serviceFilter,
  statusFilter,
  onServiceFilterChange,
  onStatusFilterChange,
  onAddVendor,
  onViewVendor,
  onViewBid
}) => {
  const getStatusBadge = (status: VendorStatus) => {
    switch (status) {
      case 'finalized':
        return 'bg-green-100 text-green-700';
      case 'negotiation':
        return 'bg-amber-100 text-amber-700';
      case 'bid-received':
        return 'bg-blue-100 text-blue-700';
      case 'invited':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#16232A]">Event Vendors</h3>
        <Button onClick={onAddVendor} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={serviceFilter}
          onChange={(e) => onServiceFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Services</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Statuses</option>
          <option value="invited">Invited</option>
          <option value="bid-received">Bid Received</option>
          <option value="negotiation">Negotiation</option>
          <option value="finalized">Finalized</option>
        </select>

        {(serviceFilter !== 'all' || statusFilter !== 'all') && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onServiceFilterChange('all');
              onStatusFilterChange('all');
            }}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Vendor List */}
      {vendors.length > 0 ? (
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#16232A] mb-1">{vendor.name}</h4>
                  <p className="text-sm text-[#16232A]/60 mb-2">{vendor.service}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(vendor.status)}`}>
                    {vendor.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewVendor(vendor.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {vendor.status !== 'invited' && (
                    <Button
                      size="sm"
                      onClick={() => onViewBid(vendor.id)}
                      className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                    >
                      View Bid
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No vendors found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {serviceFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Add vendors to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

// Planner Tab Component
const PlannerTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-[#075056]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-10 w-10 text-[#075056]" />
        </div>
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">Event Planner Managed</h3>
        <p className="text-lg text-[#16232A]/70 mb-8">
          Your event is fully managed by your assigned Event Planner. They will coordinate all vendors and services.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            Vendor selection, bidding, and negotiations are handled by your planner.
          </p>
        </div>
      </div>
    </div>
  );
};

// Bids Tab Component
const BidsTab: React.FC<{
  bids: any[];
  services: string[];
  serviceFilter: string;
  statusFilter: string;
  onServiceFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onViewBid: (bidId: string) => void;
}> = ({
  bids,
  services,
  serviceFilter,
  statusFilter,
  onServiceFilterChange,
  onStatusFilterChange,
  onViewBid
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const getStatusBadge = (status: BidStatus) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'negotiating':
        return 'bg-amber-100 text-amber-700';
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#16232A]">Event Bids</h3>
        <Button
          onClick={() => navigate(`/customer/events/${id}/bids`)}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          View All Bids & Negotiate
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {bids.filter(b => b.status === 'pending').length}
          </p>
          <p className="text-sm text-blue-900">Pending</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">
            {bids.filter(b => b.status === 'negotiating').length}
          </p>
          <p className="text-sm text-amber-900">Negotiating</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {bids.filter(b => b.status === 'accepted').length}
          </p>
          <p className="text-sm text-green-900">Accepted</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{bids.length}</p>
          <p className="text-sm text-gray-900">Total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={serviceFilter}
          onChange={(e) => onServiceFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Services</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="negotiating">Negotiating</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        {(serviceFilter !== 'all' || statusFilter !== 'all') && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onServiceFilterChange('all');
              onStatusFilterChange('all');
            }}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Bid List */}
      {bids.length > 0 ? (
        <div className="space-y-4">
          {bids.slice(0, 3).map((bid) => (
            <div key={bid.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#16232A] mb-1">{bid.vendorName}</h4>
                  <p className="text-sm text-[#16232A]/60 mb-2">{bid.service}</p>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(bid.status)}`}>
                      {bid.status}
                    </span>
                    <span className="text-2xl font-bold text-[#FF5B04]">${bid.amount.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  onClick={() => onViewBid(bid.id)}
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
          {bids.length > 3 && (
            <div className="text-center pt-4">
              <Button
                onClick={() => navigate(`/customer/events/${id}/bids`)}
                variant="outline"
                className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white"
              >
                View {bids.length - 3} More Bids
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-[#16232A] mb-2">No Bids Yet</h4>
          <p className="text-[#16232A]/60 mb-6">Vendors will submit bids when invited to your event</p>
          <Button
            onClick={() => navigate(`/customer/events/${id}/vendor-selection`)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Find Vendors
          </Button>
        </div>
      )}
    </div>
  );
};

// Guests Tab Component
const GuestsTab: React.FC<{
  guests: any[];
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddGuest: () => void;
  onUploadCSV: () => void;
}> = ({ guests, statusFilter, onStatusFilterChange, onAddGuest, onUploadCSV }) => {
  const getStatusBadge = (status: GuestStatus) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      case 'maybe':
        return 'bg-amber-100 text-amber-700';
      case 'sent':
        return 'bg-blue-100 text-blue-700';
      case 'not-invited':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#16232A]">Event Guests</h3>
        <div className="flex gap-2">
          <Button onClick={onUploadCSV} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </Button>
          <Button onClick={onAddGuest} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Statuses</option>
          <option value="not-invited">Not Invited</option>
          <option value="sent">Invited</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="maybe">Maybe</option>
        </select>

        {statusFilter !== 'all' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusFilterChange('all')}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Guest List */}
      {guests.length > 0 ? (
        <div className="space-y-3">
          {guests.map((guest) => (
            <div key={guest.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#16232A] mb-1">{guest.name}</h4>
                <p className="text-sm text-[#16232A]/60">{guest.phone}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(guest.status)}`}>
                {guest.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No guests found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {statusFilter !== 'all' ? 'Try adjusting your filter' : 'Add guests to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

// Invitations Tab Component
const InvitationsTab: React.FC<{
  onCreateInvitation: () => void;
  onSendInvitations: () => void;
}> = ({ onCreateInvitation, onSendInvitations }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">Event Invitations</h3>
        <p className="text-lg text-[#16232A]/70 mb-8">
          Create and send beautiful invitations to your guests.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onCreateInvitation} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Invitation
          </Button>
          <Button onClick={onSendInvitations} variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Send Invitations
          </Button>
        </div>
      </div>
    </div>
  );
};

// Payments Tab Component
const PaymentsTab: React.FC<{
  payments: any[];
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onPayNow: (paymentId: string) => void;
  onViewDetails: () => void;
}> = ({ payments, statusFilter, onStatusFilterChange, onPayNow, onViewDetails }) => {
  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'cash-under-review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#16232A]">Payments & Invoices</h3>
        <Button onClick={onViewDetails} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View Full Details
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>

        {statusFilter !== 'all' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusFilterChange('all')}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Payment List */}
      {payments.length > 0 ? (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#16232A] mb-1">{payment.milestone}</h4>
                  <p className="text-sm text-[#16232A]/60 mb-2">
                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(payment.status)}`}>
                    {payment.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#FF5B04] mb-2">
                    ${payment.amount.toLocaleString()}
                  </p>
                  {payment.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => onPayNow(payment.id)}
                      className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No payments found</h3>
          <p className="text-[#16232A]/60">
            {statusFilter !== 'all' ? 'Try adjusting your filter' : 'Payment information will appear here'}
          </p>
        </div>
      )}
    </div>
  );
};

// Agreements Tab Component
const AgreementsTab: React.FC<{
  onAddAgreement: () => void;
  onViewAgreements: () => void;
}> = ({ onAddAgreement, onViewAgreements }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-[#075056]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="h-10 w-10 text-[#075056]" />
        </div>
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">Event Agreements</h3>
        <p className="text-lg text-[#16232A]/70 mb-8">
          Manage formal agreements with your vendors.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onAddAgreement} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Agreement
          </Button>
          <Button onClick={onViewAgreements} variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View All Agreements
          </Button>
        </div>
      </div>
    </div>
  );
};

// Execution Tab Component
const ExecutionTab: React.FC<{
  onViewExecution: () => void;
}> = ({ onViewExecution }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#16232A] mb-4">Event Execution & Attendance</h3>
        <p className="text-lg text-[#16232A]/70 mb-8">
          Track vendor arrival, departure, and execution on the event day.
        </p>
        <Button onClick={onViewExecution} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
          <Eye className="h-4 w-4 mr-2" />
          View Execution Details
        </Button>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#16232A]">{title}</h3>
          <button onClick={onCancel} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">{message}</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
            Confirm
          </Button>
        </div>
      </motion.div>
    </div>
  );
};