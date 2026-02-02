import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';
import {
  ArrowLeft,
  Plus,
  Upload,
  Download,
  Send,
  Users,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  QrCode,
  Search,
  Filter,
  Trash2,
  Edit,
  MessageSquare,
  AlertCircle,
  X,
  Check,
  FileText,
  Image,
  Video,
  Loader2,
  AlertTriangle,
  ChevronRight,
  Eye,
  RefreshCw,
  Calendar
} from 'lucide-react';

// Types
type GuestStatus = 'not-invited' | 'sent' | 'accepted' | 'declined' | 'maybe';
type GuestCategory = 'family' | 'friend' | 'colleague' | 'other';
type InvitationChannel = 'whatsapp' | 'email' | 'both';
type InvitationType = 'card' | 'video' | 'custom';
type InvitationStatus = 'draft' | 'ready' | 'sent';

type Guest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  category?: GuestCategory;
  status: GuestStatus;
  qrGenerated: boolean;
  qrCode?: string;
  checkedIn: boolean;
  addedAt: string;
  invitedAt?: string;
  respondedAt?: string;
};

type CSVRow = {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  errors?: string[];
};

export const EventGuestsEnhanced: React.FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<GuestStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<GuestCategory | 'all'>('all');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [showUploadCSVModal, setShowUploadCSVModal] = useState(false);
  const [showCreateInvitationModal, setShowCreateInvitationModal] = useState(false);
  const [showSendInvitationsModal, setShowSendInvitationsModal] = useState(false);
  const [showEditGuestModal, setShowEditGuestModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [deletingGuestId, setDeletingGuestId] = useState<string | null>(null);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    location: 'Grand Hotel Ballroom',
    hasInvitation: true,
    invitationStatus: 'ready' as InvitationStatus
  };

  // Mock guests data
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Emily Johnson',
      phone: '+1 234 567 8901',
      email: 'emily@example.com',
      category: 'friend',
      status: 'accepted',
      qrGenerated: true,
      qrCode: 'QR123456',
      checkedIn: false,
      addedAt: '2026-01-15T10:00:00',
      invitedAt: '2026-01-20T14:00:00',
      respondedAt: '2026-01-21T09:00:00'
    },
    {
      id: '2',
      name: 'Michael Smith',
      phone: '+1 234 567 8902',
      email: 'michael@example.com',
      category: 'family',
      status: 'maybe',
      qrGenerated: true,
      checkedIn: false,
      addedAt: '2026-01-15T10:05:00',
      invitedAt: '2026-01-20T14:00:00',
      respondedAt: '2026-01-22T11:00:00'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      phone: '+1 234 567 8903',
      email: 'sarah@example.com',
      category: 'friend',
      status: 'sent',
      qrGenerated: true,
      checkedIn: false,
      addedAt: '2026-01-15T10:10:00',
      invitedAt: '2026-01-20T14:00:00'
    },
    {
      id: '4',
      name: 'David Brown',
      phone: '+1 234 567 8904',
      category: 'colleague',
      status: 'declined',
      qrGenerated: false,
      checkedIn: false,
      addedAt: '2026-01-15T10:15:00',
      invitedAt: '2026-01-20T14:00:00',
      respondedAt: '2026-01-21T16:00:00'
    },
    {
      id: '5',
      name: 'Jessica Davis',
      phone: '+1 234 567 8905',
      email: 'jessica@example.com',
      category: 'family',
      status: 'not-invited',
      qrGenerated: false,
      checkedIn: false,
      addedAt: '2026-01-15T10:20:00'
    }
  ]);

  // Filter guests
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.phone.includes(searchQuery) ||
                         (guest.email && guest.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || guest.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate statistics
  const stats = {
    total: guests.length,
    accepted: guests.filter(g => g.status === 'accepted').length,
    declined: guests.filter(g => g.status === 'declined').length,
    maybe: guests.filter(g => g.status === 'maybe').length,
    pending: guests.filter(g => g.status === 'sent').length,
    notInvited: guests.filter(g => g.status === 'not-invited').length,
    checkedIn: guests.filter(g => g.checkedIn).length,
    qrGenerated: guests.filter(g => g.qrGenerated).length
  };

  // Get status badge styling
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

  // Get status icon
  const getStatusIcon = (status: GuestStatus) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'declined':
        return <XCircle className="h-4 w-4" />;
      case 'maybe':
        return <HelpCircle className="h-4 w-4" />;
      case 'sent':
        return <Clock className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  // Toggle guest selection
  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuests(prev =>
      prev.includes(guestId)
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  // Select all guests
  const selectAllGuests = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(g => g.id));
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterCategory('all');
  };

  // Check if filters are active
  const hasActiveFilters = searchQuery !== '' || filterStatus !== 'all' || filterCategory !== 'all';

  // Edit guest
  const handleEditGuest = (guest: Guest) => {
    setEditingGuest(guest);
    setShowEditGuestModal(true);
  };

  // Delete guest
  const handleDeleteGuest = (guestId: string) => {
    setDeletingGuestId(guestId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteGuest = () => {
    if (deletingGuestId) {
      setGuests(prev => prev.filter(g => g.id !== deletingGuestId));
      setDeletingGuestId(null);
      setShowDeleteConfirmModal(false);
    }
  };

  // Download CSV template
  const downloadCSVTemplate = () => {
    const csvContent = 'Name,Phone,Email,Category\nJohn Doe,+1234567890,john@example.com,family\nJane Smith,+1234567891,jane@example.com,friend';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/customer/events/${eventId}`)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Event
        </button>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">Guests for This Event</h1>
              <p className="text-[#16232A]/70">
                Manage guests and track their responses for <span className="font-semibold">{event.name}</span>
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-[#16232A]/60">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            {event.hasInvitation && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Invitation Ready</p>
                    <p className="text-xs text-green-700">Ready to send to guests</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guest Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <StatCard title="Total Guests" value={stats.total} color="gray" />
        <StatCard title="Accepted" value={stats.accepted} color="green" />
        <StatCard title="Declined" value={stats.declined} color="red" />
        <StatCard title="Maybe" value={stats.maybe} color="amber" />
        <StatCard title="Pending" value={stats.pending} color="blue" />
        <StatCard title="Not Invited" value={stats.notInvited} color="gray" />
        <StatCard title="QR Generated" value={stats.qrGenerated} color="purple" />
        <StatCard title="Checked In" value={stats.checkedIn} color="teal" />
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setShowAddGuestModal(true)}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
            <Button
              onClick={() => setShowUploadCSVModal(true)}
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
            <Button 
              onClick={downloadCSVTemplate}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button
              onClick={() => setShowCreateInvitationModal(true)}
              variant="outline"
              className="border-[#075056] text-[#075056] hover:bg-[#075056] hover:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Create Invitation
            </Button>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={() => setShowSendInvitationsModal(true)}
                  disabled={stats.total === 0 || !event.hasInvitation}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitations
                </Button>
              </div>
            </TooltipTrigger>
            {(!event.hasInvitation || stats.total === 0) && (
              <TooltipContent>
                {!event.hasInvitation
                  ? 'Create an invitation first before sending'
                  : 'Add guests before sending invitations'}
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as GuestStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Statuses</option>
              <option value="not-invited">Not Invited</option>
              <option value="sent">Invited (Sent)</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="maybe">Maybe</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as GuestCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Categories</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            )}
          </div>

          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
              <Filter className="h-4 w-4" />
              <span>
                Showing {filteredGuests.length} of {guests.length} guests
              </span>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedGuests.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {selectedGuests.length} guest{selectedGuests.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedGuests([])}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Clear Selection
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowSendInvitationsModal(true)}
                  disabled={!event.hasInvitation}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send to Selected
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredGuests.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                    onChange={selectAllGuests}
                    className="w-4 h-4 rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]"
                  />
                </div>
                <div className="col-span-3">
                  <p className="text-sm font-medium text-[#16232A]">Guest Name</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-[#16232A]">Contact</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-[#16232A]">Status</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-[#16232A]">QR Code</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-[#16232A]">Actions</p>
                </div>
              </div>
            </div>

            {/* Guest Rows */}
            <div className="divide-y divide-gray-200">
              {filteredGuests.map((guest, index) => (
                <motion.div
                  key={guest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Checkbox */}
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => toggleGuestSelection(guest.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]"
                      />
                    </div>

                    {/* Name */}
                    <div className="col-span-3">
                      <p className="font-medium text-[#16232A]">{guest.name}</p>
                      {guest.category && (
                        <p className="text-xs text-[#16232A]/50 capitalize mt-1">
                          {guest.category}
                        </p>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-[#16232A]/70">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{guest.phone}</span>
                        </div>
                        {guest.email && (
                          <div className="flex items-center gap-1 text-sm text-[#16232A]/70">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs truncate">{guest.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(guest.status)}`}>
                          {getStatusIcon(guest.status)}
                          <span className="capitalize">{guest.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                      {guest.checkedIn && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Checked In
                        </p>
                      )}
                    </div>

                    {/* QR Code */}
                    <div className="col-span-2">
                      {guest.qrGenerated ? (
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">Generated</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Not Generated</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditGuest(guest)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit guest details</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Send message</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteGuest(guest.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete guest</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#16232A] mb-2">
              {hasActiveFilters ? 'No guests match your filters' : 'No guests added yet'}
            </h3>
            <p className="text-[#16232A]/60 mb-6">
              {hasActiveFilters
                ? 'Try adjusting your search criteria or filters'
                : 'Start by adding guests to your event'}
            </p>
            {hasActiveFilters ? (
              <Button
                onClick={resetFilters}
                variant="outline"
                className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FF5B04] hover:text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            ) : (
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setShowAddGuestModal(true)}
                  className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Guest
                </Button>
                <Button
                  onClick={() => setShowUploadCSVModal(true)}
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload CSV
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddGuestModal
        isOpen={showAddGuestModal}
        onClose={() => setShowAddGuestModal(false)}
        onSave={(newGuest) => {
          setGuests(prev => [...prev, { ...newGuest, id: Date.now().toString(), addedAt: new Date().toISOString(), status: 'not-invited', qrGenerated: false, checkedIn: false }]);
          setShowAddGuestModal(false);
        }}
        existingGuests={guests}
      />

      <EditGuestModal
        isOpen={showEditGuestModal}
        onClose={() => {
          setShowEditGuestModal(false);
          setEditingGuest(null);
        }}
        guest={editingGuest}
        onSave={(updatedGuest) => {
          setGuests(prev => prev.map(g => g.id === updatedGuest.id ? updatedGuest : g));
          setShowEditGuestModal(false);
          setEditingGuest(null);
        }}
        existingGuests={guests}
      />

      <UploadCSVModal
        isOpen={showUploadCSVModal}
        onClose={() => setShowUploadCSVModal(false)}
        onImport={(importedGuests) => {
          setGuests(prev => [...prev, ...importedGuests]);
          setShowUploadCSVModal(false);
        }}
        existingGuests={guests}
      />

      <CreateInvitationModal
        isOpen={showCreateInvitationModal}
        onClose={() => setShowCreateInvitationModal(false)}
        eventName={event.name}
      />

      <SendInvitationsModal
        isOpen={showSendInvitationsModal}
        onClose={() => setShowSendInvitationsModal(false)}
        guests={guests}
        selectedGuestIds={selectedGuests}
        eventName={event.name}
        onSent={(guestIds) => {
          setGuests(prev => prev.map(g => 
            guestIds.includes(g.id) 
              ? { ...g, status: 'sent', invitedAt: new Date().toISOString(), qrGenerated: true } 
              : g
          ));
          setSelectedGuests([]);
          setShowSendInvitationsModal(false);
        }}
      />

      <DeleteConfirmModal
        isOpen={showDeleteConfirmModal}
        onClose={() => {
          setShowDeleteConfirmModal(false);
          setDeletingGuestId(null);
        }}
        onConfirm={confirmDeleteGuest}
        guestName={guests.find(g => g.id === deletingGuestId)?.name || ''}
      />
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  color: string;
}> = ({ title, value, color }) => {
  const colors = {
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    teal: 'text-teal-600'
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <p className="text-sm text-[#16232A]/60 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${colors[color as keyof typeof colors]}`}>{value}</p>
    </div>
  );
};

// Add Guest Modal Component
const AddGuestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: Omit<Guest, 'id' | 'addedAt' | 'status' | 'qrGenerated' | 'checkedIn'>) => void;
  existingGuests: Guest[];
}> = ({ isOpen, onClose, onSave, existingGuests }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '' as GuestCategory | ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (existingGuests.some(g => g.phone === formData.phone)) {
      newErrors.phone = 'This phone number is already added';
    }

    if (formData.email && existingGuests.some(g => g.email === formData.email)) {
      newErrors.email = 'This email is already added';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      category: formData.category || undefined
    });

    setFormData({ name: '', phone: '', email: '', category: '' });
    setErrors({});
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Add Guest</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Guest Name <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter guest name"
              className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Phone Number (WhatsApp) <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 234 567 8900"
              className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="guest@example.com"
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Guest Category (Optional)
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as GuestCategory | '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="">Select category</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Save Guest
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Edit Guest Modal Component (similar to Add Guest)
const EditGuestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
  onSave: (guest: Guest) => void;
  existingGuests: Guest[];
}> = ({ isOpen, onClose, guest, onSave, existingGuests }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '' as GuestCategory | ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name,
        phone: guest.phone,
        email: guest.email || '',
        category: guest.category || ''
      });
    }
  }, [guest]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (existingGuests.some(g => g.phone === formData.phone && g.id !== guest?.id)) {
      newErrors.phone = 'This phone number is already used';
    }

    if (formData.email && existingGuests.some(g => g.email === formData.email && g.id !== guest?.id)) {
      newErrors.email = 'This email is already used';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guest || !validateForm()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      ...guest,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      category: formData.category || undefined
    });

    setLoading(false);
  };

  if (!isOpen || !guest) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Edit Guest</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Guest Name <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Phone Number <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]`}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Guest Category (Optional)
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as GuestCategory | '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="">Select category</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Upload CSV Modal Component
const UploadCSVModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onImport: (guests: Omit<Guest, 'id' | 'addedAt' | 'status' | 'qrGenerated' | 'checkedIn'>[]) => void;
  existingGuests: Guest[];
}> = ({ isOpen, onClose, onImport, existingGuests }) => {
  const [step, setStep] = useState<'preview' | 'upload' | 'validate'>('preview');
  const [csvData, setCSVData] = useState<CSVRow[]>([]);
  const [loading, setLoading] = useState(false);

  const downloadTemplate = () => {
    const csvContent = 'Name,Phone,Email,Category\nJohn Doe,+1234567890,john@example.com,family\nJane Smith,+1234567891,jane@example.com,friend';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: CSVRow = {
        name: values[headers.indexOf('name')] || '',
        phone: values[headers.indexOf('phone')] || '',
        email: values[headers.indexOf('email')],
        category: values[headers.indexOf('category')],
        errors: []
      };

      // Validate
      if (!row.name) row.errors!.push('Name is required');
      if (!row.phone) row.errors!.push('Phone is required');
      if (existingGuests.some(g => g.phone === row.phone)) {
        row.errors!.push('Phone already exists');
      }
      if (row.email && existingGuests.some(g => g.email === row.email)) {
        row.errors!.push('Email already exists');
      }

      data.push(row);
    }

    setCSVData(data);
    setStep('validate');
  };

  const handleImport = async () => {
    const validRows = csvData.filter(row => !row.errors || row.errors.length === 0);
    if (validRows.length === 0) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    onImport(validRows.map(row => ({
      name: row.name,
      phone: row.phone,
      email: row.email || undefined,
      category: (row.category as GuestCategory) || undefined
    })));

    setCSVData([]);
    setStep('preview');
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Upload Guests via CSV</h3>
          <button
            onClick={() => {
              onClose();
              setStep('preview');
              setCSVData([]);
            }}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Step Preview */}
        {step === 'preview' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">CSV Format</h4>
              <p className="text-sm text-blue-800 mb-4">
                Your CSV file should have the following columns:
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <code className="text-sm text-[#16232A] font-mono">
                  Name, Phone, Email, Category
                </code>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-[#16232A] mb-3">Sample Data</h4>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <pre className="text-xs text-[#16232A]/70 font-mono">
{`John Doe, +1234567890, john@example.com, family
Jane Smith, +1234567891, jane@example.com, friend
Bob Johnson, +1234567892, , colleague`}
                </pre>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={downloadTemplate}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <Button
                onClick={() => setStep('upload')}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                Continue to Upload
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step Upload */}
        {step === 'upload' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#FF5B04] transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#16232A] font-medium mb-2">Drop your CSV file here</p>
              <p className="text-sm text-[#16232A]/60 mb-4">or click to browse</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button variant="outline" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('preview')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step Validate */}
        {step === 'validate' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <strong>{csvData.filter(row => !row.errors || row.errors.length === 0).length}</strong> valid guests found,{' '}
                <strong>{csvData.filter(row => row.errors && row.errors.length > 0).length}</strong> with errors
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[#16232A]">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[#16232A]">Phone</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[#16232A]">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[#16232A]">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[#16232A]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {csvData.map((row, index) => (
                    <tr key={index} className={row.errors && row.errors.length > 0 ? 'bg-red-50' : ''}>
                      <td className="px-4 py-2 text-sm">{row.name}</td>
                      <td className="px-4 py-2 text-sm">{row.phone}</td>
                      <td className="px-4 py-2 text-sm">{row.email || '-'}</td>
                      <td className="px-4 py-2 text-sm capitalize">{row.category || '-'}</td>
                      <td className="px-4 py-2 text-sm">
                        {row.errors && row.errors.length > 0 ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs">{row.errors[0]}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="text-xs">Valid</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {csvData.some(row => row.errors && row.errors.length > 0) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900">Some rows have errors</p>
                    <p className="text-sm text-amber-800">Only valid rows will be imported. Fix errors in your CSV and re-upload to import all guests.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setStep('upload');
                  setCSVData([]);
                }}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Upload Different File
              </Button>
              <Button
                onClick={handleImport}
                disabled={csvData.filter(row => !row.errors || row.errors.length === 0).length === 0 || loading}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Import {csvData.filter(row => !row.errors || row.errors.length === 0).length} Guests
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Create Invitation Modal Component
const CreateInvitationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}> = ({ isOpen, onClose, eventName }) => {
  const [invitationType, setInvitationType] = useState<InvitationType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In production, create invitation
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Create Invitation</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-[#16232A]/70 mb-6">
          Create a beautiful invitation for <strong>{eventName}</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Made by Us */}
          <button
            onClick={() => setInvitationType('card')}
            className={`p-6 border-2 rounded-xl text-left transition-all ${
              invitationType === 'card'
                ? 'border-[#FF5B04] bg-orange-50'
                : 'border-gray-200 hover:border-[#FF5B04]/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF5B04] to-[#FF8B54] rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#16232A]">Made by Us</h4>
                <p className="text-xs text-[#16232A]/60">Professional templates</p>
              </div>
            </div>
            <p className="text-sm text-[#16232A]/70">
              Choose from card or video templates with customizable text and images
            </p>
          </button>

          {/* Add Manually */}
          <button
            onClick={() => setInvitationType('custom')}
            className={`p-6 border-2 rounded-xl text-left transition-all ${
              invitationType === 'custom'
                ? 'border-[#FF5B04] bg-orange-50'
                : 'border-gray-200 hover:border-[#FF5B04]/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#075056] to-[#0a7580] rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#16232A]">Add Manually</h4>
                <p className="text-xs text-[#16232A]/60">Upload your own</p>
              </div>
            </div>
            <p className="text-sm text-[#16232A]/70">
              Upload your own invitation image, video, or PDF file
            </p>
          </button>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!invitationType || loading}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Send Invitations Modal Component
const SendInvitationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  selectedGuestIds: string[];
  eventName: string;
  onSent: (guestIds: string[]) => void;
}> = ({ isOpen, onClose, guests, selectedGuestIds, eventName, onSent }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sendTo, setSendTo] = useState<'all' | 'selected'>('all');
  const [channel, setChannel] = useState<InvitationChannel>('whatsapp');
  const [message, setMessage] = useState(`You're invited to ${eventName}! Save the date and join us for this special celebration.`);
  const [loading, setLoading] = useState(false);

  const guestsToInvite = sendTo === 'all' 
    ? guests.filter(g => g.status === 'not-invited')
    : guests.filter(g => selectedGuestIds.includes(g.id) && g.status === 'not-invited');

  const handleSend = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSent(guestsToInvite.map(g => g.id));
    setLoading(false);
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Send Invitations</h3>
          <button
            onClick={() => {
              onClose();
              setStep(1);
            }}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {['Select Guests', 'Channel', 'Message', 'Confirm'].map((label, index) => {
            const stepNum = index + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-[#FF5B04] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  <p className={`text-xs mt-2 ${isActive ? 'text-[#FF5B04] font-semibold' : 'text-gray-600'}`}>
                    {label}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`h-0.5 flex-1 ${step > stepNum ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Select Guests */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#FF5B04] transition-colors mb-3">
                <input
                  type="radio"
                  checked={sendTo === 'all'}
                  onChange={() => setSendTo('all')}
                  className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <div>
                  <p className="font-semibold text-[#16232A]">All Uninvited Guests</p>
                  <p className="text-sm text-[#16232A]/60">
                    Send to {guests.filter(g => g.status === 'not-invited').length} guests who haven't been invited yet
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#FF5B04] transition-colors">
                <input
                  type="radio"
                  checked={sendTo === 'selected'}
                  onChange={() => setSendTo('selected')}
                  disabled={selectedGuestIds.length === 0}
                  className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04] disabled:opacity-50"
                />
                <div>
                  <p className="font-semibold text-[#16232A]">Selected Guests Only</p>
                  <p className="text-sm text-[#16232A]/60">
                    Send to {selectedGuestIds.length} selected guests
                    {selectedGuestIds.length === 0 && ' (Select guests first)'}
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <strong>{guestsToInvite.length}</strong> guests will receive invitations
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={guestsToInvite.length === 0}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Channel */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-3">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#FF5B04] transition-colors">
                <input
                  type="radio"
                  checked={channel === 'whatsapp'}
                  onChange={() => setChannel('whatsapp')}
                  className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <MessageSquare className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-[#16232A]">WhatsApp</p>
                  <p className="text-sm text-[#16232A]/60">Send via WhatsApp to phone numbers</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#FF5B04] transition-colors">
                <input
                  type="radio"
                  checked={channel === 'email'}
                  onChange={() => setChannel('email')}
                  className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-[#16232A]">Email</p>
                  <p className="text-sm text-[#16232A]/60">Send via email to email addresses</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#FF5B04] transition-colors">
                <input
                  type="radio"
                  checked={channel === 'both'}
                  onChange={() => setChannel('both')}
                  className="w-4 h-4 text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <div className="flex gap-2">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#16232A]">Both</p>
                  <p className="text-sm text-[#16232A]/60">Send via WhatsApp and Email</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Message */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Invitation Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                placeholder="Enter your invitation message..."
              />
              <p className="text-xs text-[#16232A]/60 mt-2">
                This message will accompany your invitation
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-[#16232A] mb-2">Preview</h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-[#16232A]">{message}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!message.trim()}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">Confirm Before Sending</p>
                  <p className="text-sm text-amber-800">
                    Invitations will be sent to <strong>{guestsToInvite.length}</strong> guests. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#16232A]/70">Recipients:</span>
                <span className="font-semibold text-[#16232A]">{guestsToInvite.length} guests</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#16232A]/70">Channel:</span>
                <span className="font-semibold text-[#16232A] capitalize">{channel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#16232A]/70">Event:</span>
                <span className="font-semibold text-[#16232A]">{eventName}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1" disabled={loading}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Delete Confirm Modal
const DeleteConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  guestName: string;
}> = ({ isOpen, onClose, onConfirm, guestName }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onConfirm();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Delete Guest</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">This action cannot be undone</p>
              <p className="text-sm text-red-800">
                Are you sure you want to delete <strong>{guestName}</strong>? All associated data will be permanently removed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Guest
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
