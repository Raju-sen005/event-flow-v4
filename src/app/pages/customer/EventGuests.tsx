import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
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
  Check
} from 'lucide-react';

type GuestStatus = 'not-invited' | 'sent' | 'accepted' | 'declined' | 'maybe';
type GuestCategory = 'family' | 'friend' | 'colleague' | 'other';

type Guest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  category?: GuestCategory;
  status: GuestStatus;
  qrGenerated: boolean;
  checkedIn: boolean;
  addedAt: string;
};

export const EventGuests: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [showUploadCSVModal, setShowUploadCSVModal] = useState(false);
  const [showSendInvitationsModal, setShowSendInvitationsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<GuestStatus | 'all'>('all');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15'
  };

  // Mock guests data
  const guests: Guest[] = [
    {
      id: '1',
      name: 'Emily Johnson',
      phone: '+1 234 567 8901',
      email: 'emily@example.com',
      category: 'friend',
      status: 'accepted',
      qrGenerated: true,
      checkedIn: false,
      addedAt: '2026-01-15T10:00:00'
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
      addedAt: '2026-01-15T10:05:00'
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
      addedAt: '2026-01-15T10:10:00'
    },
    {
      id: '4',
      name: 'David Brown',
      phone: '+1 234 567 8904',
      category: 'colleague',
      status: 'declined',
      qrGenerated: false,
      checkedIn: false,
      addedAt: '2026-01-15T10:15:00'
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
  ];

  // Filter guests
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate guest statistics
  const stats = {
    total: guests.length,
    accepted: guests.filter(g => g.status === 'accepted').length,
    declined: guests.filter(g => g.status === 'declined').length,
    pending: guests.filter(g => g.status === 'sent' || g.status === 'maybe').length,
    notInvited: guests.filter(g => g.status === 'not-invited').length,
    checkedIn: guests.filter(g => g.checkedIn).length
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

  return (
    <div className="space-y-6 pb-8">
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
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Guests for This Event</h1>
          <p className="text-[#16232A]/70">
            Manage guests and track their responses for {event.name}.
          </p>
        </div>
      </div>

      {/* Guest Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Total Guests</p>
          <p className="text-2xl font-bold text-[#16232A]">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Accepted</p>
          <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Declined</p>
          <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Not Invited</p>
          <p className="text-2xl font-bold text-gray-600">{stats.notInvited}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-[#16232A]/60 mb-1">Checked In</p>
          <p className="text-2xl font-bold text-blue-600">{stats.checkedIn}</p>
        </div>
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
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <Button
            onClick={() => setShowSendInvitationsModal(true)}
            disabled={stats.total === 0}
            className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invitations
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
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
            <option value="sent">Invited</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="maybe">Maybe</option>
          </select>

          {/* Bulk Actions */}
          {selectedGuests.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#16232A]/70">
                {selectedGuests.length} selected
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedGuests([])}
              >
                Clear
              </Button>
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
                    checked={selectedGuests.length === filteredGuests.length}
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
                  transition={{ delay: index * 0.05 }}
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
                            <span className="text-xs">{guest.email}</span>
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
                        <p className="text-xs text-green-600 mt-1">✓ Checked In</p>
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
            <h3 className="text-xl font-semibold text-[#16232A] mb-2">No guests found</h3>
            <p className="text-[#16232A]/60 mb-6">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding guests to your event'}
            </p>
            {(!searchQuery && filterStatus === 'all') && (
              <Button
                onClick={() => setShowAddGuestModal(true)}
                className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Guest
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add Guest Modal */}
      <AddGuestModal
        isOpen={showAddGuestModal}
        onClose={() => setShowAddGuestModal(false)}
        eventId={eventId || ''}
      />

      {/* Upload CSV Modal */}
      <UploadCSVModal
        isOpen={showUploadCSVModal}
        onClose={() => setShowUploadCSVModal(false)}
        eventId={eventId || ''}
      />

      {/* Send Invitations Modal */}
      <SendInvitationsModal
        isOpen={showSendInvitationsModal}
        onClose={() => setShowSendInvitationsModal(false)}
        eventId={eventId || ''}
        guests={guests}
        selectedGuestIds={selectedGuests}
      />
    </div>
  );
};

// Add Guest Modal Component
const AddGuestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}> = ({ isOpen, onClose, eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, save to backend
    console.log('Adding guest:', formData);
    onClose();
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
              required
              placeholder="Enter guest name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Phone Number (WhatsApp) <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Guest Category (Optional)
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Guest
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
  eventId: string;
}> = ({ isOpen, onClose, eventId }) => {
  const [step, setStep] = useState<'preview' | 'upload'>('preview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Upload Guests via CSV</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 'preview' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">CSV Format</h4>
              <p className="text-sm text-blue-800 mb-4">
                Your CSV file should have the following columns:
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <code className="text-sm text-[#16232A]">
                  Name, Phone, Email, Category
                </code>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-[#16232A] mb-3">Sample Data</h4>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <pre className="text-xs text-[#16232A]/70">
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
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <Button
                onClick={() => setStep('upload')}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                Continue to Upload
              </Button>
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#16232A] font-medium mb-2">Drop your CSV file here</p>
              <p className="text-sm text-[#16232A]/60 mb-4">or click to browse</p>
              <Button variant="outline">
                Choose File
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('preview')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Import Guests
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Send Invitations Modal Component
const SendInvitationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  guests: Guest[];
  selectedGuestIds: string[];
}> = ({ isOpen, onClose, eventId, guests, selectedGuestIds }) => {
  const [step, setStep] = useState<'select-guests' | 'choose-channel' | 'message' | 'confirm'>(
    'select-guests'
  );
  const [sendTo, setSendTo] = useState<'all' | 'selected'>('all');
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [message, setMessage] = useState('');

  const guestsToInvite = sendTo === 'all' ? guests : guests.filter(g => selectedGuestIds.includes(g.id));

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
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {['Select Guests', 'Choose Channel', 'Message', 'Confirm'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= ['select-guests', 'choose-channel', 'message', 'confirm'].indexOf(step) + 1
                    ? 'bg-[#FF5B04] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 ${
                  index + 1 < ['select-guests', 'choose-channel', 'message', 'confirm'].indexOf(step) + 1
                    ? 'bg-[#FF5B04]'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {step === 'select-guests' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <button
                onClick={() => setSendTo('all')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  sendTo === 'all'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-[#FF5B04]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#16232A]">All Guests</p>
                    <p className="text-sm text-[#16232A]/60">{guests.length} guests</p>
                  </div>
                  {sendTo === 'all' && <Check className="h-5 w-5 text-[#FF5B04]" />}
                </div>
              </button>

              <button
                onClick={() => setSendTo('selected')}
                disabled={selectedGuestIds.length === 0}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  sendTo === 'selected'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-[#FF5B04]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#16232A]">Selected Guests Only</p>
                    <p className="text-sm text-[#16232A]/60">{selectedGuestIds.length} selected</p>
                  </div>
                  {sendTo === 'selected' && <Check className="h-5 w-5 text-[#FF5B04]" />}
                </div>
              </button>
            </div>

            <Button
              onClick={() => setStep('choose-channel')}
              className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 'choose-channel' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <button
                onClick={() => setChannel('whatsapp')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  channel === 'whatsapp'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-[#FF5B04]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-[#16232A]">WhatsApp</p>
                      <p className="text-sm text-[#16232A]/60">Send via WhatsApp message</p>
                    </div>
                  </div>
                  {channel === 'whatsapp' && <Check className="h-5 w-5 text-[#FF5B04]" />}
                </div>
              </button>

              <button
                onClick={() => setChannel('email')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  channel === 'email'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-[#FF5B04]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-[#16232A]">Email</p>
                      <p className="text-sm text-[#16232A]/60">Send via email</p>
                    </div>
                  </div>
                  {channel === 'email' && <Check className="h-5 w-5 text-[#FF5B04]" />}
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('select-guests')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep('message')}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'message' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#16232A] mb-2">
                Message Template
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Enter your invitation message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] resize-none"
              />
              <p className="text-xs text-[#16232A]/50 mt-2">
                Variables: {'{guest_name}'}, {'{event_name}'}, {'{event_date}'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-[#16232A] mb-2">Preview</p>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-sm text-[#16232A]/70 whitespace-pre-wrap">
                  {message || 'Your message will appear here...'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('choose-channel')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep('confirm')}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <div className="bg-[#E4EEF0] rounded-xl p-6">
              <h4 className="font-semibold text-[#16232A] mb-4">Invitation Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Recipients:</span>
                  <span className="font-medium text-[#16232A]">
                    {guestsToInvite.length} guests
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#16232A]/60">Channel:</span>
                  <span className="font-medium text-[#16232A] capitalize">{channel}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                Invitations will be sent to {guestsToInvite.length} selected guests via {channel}.
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('message')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  // Send invitations
                  console.log('Sending invitations');
                  onClose();
                }}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
