import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { EventPickerModal } from '@/app/components/modals/EventPickerModal';
import {
  Mail,
  Plus,
  Eye,
  Send,
  Edit,
  Copy,
  Trash2,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Search,
  Download,
  Share2
} from 'lucide-react';

// Types
type InvitationStatus = 'draft' | 'sent' | 'delivered' | 'opened';
type InvitationType = 'digital' | 'video' | 'traditional';

type Invitation = {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  title: string;
  type: InvitationType;
  status: InvitationStatus;
  sentTo: number;
  opened: number;
  responded: number;
  createdAt: string;
  sentAt?: string;
  thumbnailColor: string;
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmColor?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = 'bg-[#FF5B04]'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-2xl font-bold text-[#16232A] mb-3">{title}</h3>
        <p className="text-[#16232A]/70 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#16232A] hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg ${confirmColor} hover:opacity-90 text-white transition-colors font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const Invitations: React.FC = () => {
  const navigate = useNavigate();
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<InvitationType | 'all'>('all');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'delete' | 'send' | null;
    invitationId: string | null;
  }>({
    isOpen: false,
    type: null,
    invitationId: null
  });

  // Mock data
  const invitations: Invitation[] = [
    {
      id: '1',
      eventId: 'evt-001',
      eventName: 'Meera & Raj Wedding',
      eventDate: '2026-03-15',
      title: 'Wedding Ceremony Invitation',
      type: 'digital',
      status: 'sent',
      sentTo: 150,
      opened: 98,
      responded: 87,
      createdAt: '2026-01-10',
      sentAt: '2026-01-15',
      thumbnailColor: '#FF5B04'
    },
    {
      id: '2',
      eventId: 'evt-001',
      eventName: 'Meera & Raj Wedding',
      eventDate: '2026-03-15',
      title: 'Sangeet Night Invitation',
      type: 'video',
      status: 'draft',
      sentTo: 0,
      opened: 0,
      responded: 0,
      createdAt: '2026-01-28',
      thumbnailColor: '#075056'
    },
    {
      id: '3',
      eventId: 'evt-002',
      eventName: 'Priya Birthday Bash',
      eventDate: '2026-02-20',
      title: '25th Birthday Celebration',
      type: 'digital',
      status: 'sent',
      sentTo: 75,
      opened: 62,
      responded: 54,
      createdAt: '2026-01-05',
      sentAt: '2026-01-08',
      thumbnailColor: '#16232A'
    },
    {
      id: '4',
      eventId: 'evt-003',
      eventName: 'Corporate Annual Gala',
      eventDate: '2026-04-10',
      title: 'Annual Gala Invitation',
      type: 'traditional',
      status: 'delivered',
      sentTo: 200,
      opened: 180,
      responded: 145,
      createdAt: '2025-12-20',
      sentAt: '2026-01-05',
      thumbnailColor: '#FF5B04'
    },
  ];

  // Filter invitations
  const filteredInvitations = invitations.filter(inv => {
    const matchesSearch = inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesType = typeFilter === 'all' || inv.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics
  const stats = {
    total: invitations.length,
    sent: invitations.filter(i => i.status === 'sent' || i.status === 'delivered' || i.status === 'opened').length,
    draft: invitations.filter(i => i.status === 'draft').length,
    totalSentTo: invitations.reduce((sum, i) => sum + i.sentTo, 0),
    totalOpened: invitations.reduce((sum, i) => sum + i.opened, 0),
  };

  const getStatusColor = (status: InvitationStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'sent':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'opened':
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  const getStatusIcon = (status: InvitationStatus) => {
    switch (status) {
      case 'draft':
        return <Edit className="h-4 w-4" />;
      case 'sent':
        return <Send className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'opened':
        return <Mail className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: InvitationType) => {
    switch (type) {
      case 'digital':
        return 'Digital Card';
      case 'video':
        return 'Video Invitation';
      case 'traditional':
        return 'Traditional Card';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleEventSelect = (eventId: string) => {
    setShowEventPicker(false);
    navigate(`/customer/invitations/${eventId}`);
  };

  const handleCreateInvitation = () => {
    setShowEventPicker(true);
  };

  const handleViewInvitation = (invitationId: string) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (invitation) {
      navigate(`/customer/invitations/${invitation.eventId}/${invitationId}`);
    }
  };

  const handleEditInvitation = (invitationId: string) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (invitation) {
      navigate(`/customer/invitations/${invitation.eventId}/${invitationId}`);
    }
  };

  const handleSendInvitation = (invitationId: string) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (invitation && invitation.status === 'draft') {
      // Navigate directly to send page for draft invitations
      navigate(`/customer/invitations/${invitation.eventId}/${invitationId}/send`);
    } else {
      setConfirmModal({
        isOpen: true,
        type: 'send',
        invitationId
      });
    }
  };

  const handleDeleteInvitation = (invitationId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      invitationId
    });
  };

  const handleConfirmAction = () => {
    if (confirmModal.type === 'delete') {
      console.log('Deleting invitation:', confirmModal.invitationId);
    } else if (confirmModal.type === 'send') {
      console.log('Sending invitation:', confirmModal.invitationId);
    }
    setConfirmModal({ isOpen: false, type: null, invitationId: null });
  };

  const handleDuplicateInvitation = (invitationId: string) => {
    console.log('Duplicating invitation:', invitationId);
  };

  const handleShareInvitation = (invitationId: string) => {
    console.log('Sharing invitation:', invitationId);
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#16232A] mb-2">Invitations</h1>
            <p className="text-[#16232A]/70">Create and manage event invitations across all your events</p>
          </div>
          <button
            onClick={handleCreateInvitation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="h-5 w-5" />
            Create Invitation
          </button>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Total Invitations</p>
            <p className="text-2xl font-bold text-[#16232A]">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Sent</p>
            <p className="text-2xl font-bold text-[#16232A]">{stats.sent}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Edit className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Draft</p>
            <p className="text-2xl font-bold text-[#16232A]">{stats.draft}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-[#16232A]/60 mb-1">Total Recipients</p>
            <p className="text-2xl font-bold text-[#16232A]">{stats.totalSentTo}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invitations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as InvitationStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as InvitationType | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="digital">Digital Card</option>
              <option value="video">Video Invitation</option>
              <option value="traditional">Traditional Card</option>
            </select>
          </div>
        </motion.div>

        {/* Invitations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {filteredInvitations.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <Mail className="h-16 w-16 text-[#16232A]/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#16232A] mb-2">No invitations found</h3>
              <p className="text-[#16232A]/60 mb-6">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first invitation to get started'}
              </p>
              {!searchQuery && statusFilter === 'all' && typeFilter === 'all' && (
                <button
                  onClick={handleCreateInvitation}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg transition-colors font-medium"
                >
                  <Plus className="h-5 w-5" />
                  Create Invitation
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvitations.map((invitation, index) => (
                <motion.div
                  key={invitation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Thumbnail */}
                  <div 
                    className="h-40 flex items-center justify-center relative"
                    style={{ backgroundColor: invitation.thumbnailColor }}
                  >
                    <Mail className="h-16 w-16 text-white/30" />
                    <span className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-white ${getStatusColor(invitation.status)}`}>
                      {getStatusIcon(invitation.status)}
                      {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-[#16232A] mb-1">{invitation.title}</h3>
                      <p className="text-sm text-[#16232A]/70">{invitation.eventName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {getTypeLabel(invitation.type)}
                        </span>
                        <span className="text-xs text-[#16232A]/50 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(invitation.eventDate)}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    {invitation.status !== 'draft' && (
                      <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-gray-200">
                        <div className="text-center">
                          <p className="text-xs text-[#16232A]/50 mb-1">Sent</p>
                          <p className="text-sm font-bold text-[#16232A]">{invitation.sentTo}</p>
                        </div>
                        <div className="text-center border-l border-gray-200">
                          <p className="text-xs text-[#16232A]/50 mb-1">Opened</p>
                          <p className="text-sm font-bold text-[#16232A]">{invitation.opened}</p>
                        </div>
                        <div className="text-center border-l border-gray-200">
                          <p className="text-xs text-[#16232A]/50 mb-1">RSVP</p>
                          <p className="text-sm font-bold text-[#16232A]">{invitation.responded}</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {invitation.status === 'draft' ? (
                        <>
                          <button
                            onClick={() => handleEditInvitation(invitation.id)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleSendInvitation(invitation.id)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white transition-colors text-sm font-medium"
                          >
                            <Send className="h-4 w-4" />
                            Send
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleViewInvitation(invitation.id)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-[#16232A] hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleShareInvitation(invitation.id)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#075056] hover:bg-[#075056]/90 text-white transition-colors text-sm font-medium"
                          >
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteInvitation(invitation.id)}
                        className="px-3 py-2 border border-red-300 rounded-md bg-white text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Event Picker Modal */}
      <EventPickerModal
        isOpen={showEventPicker}
        onClose={() => setShowEventPicker(false)}
        onSelectEvent={handleEventSelect}
        title="Select Event to Create Invitation"
      />

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen && confirmModal.type === 'delete'}
        onClose={() => setConfirmModal({ isOpen: false, type: null, invitationId: null })}
        onConfirm={handleConfirmAction}
        title="Delete Invitation"
        message="Are you sure you want to delete this invitation? This action cannot be undone."
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen && confirmModal.type === 'send'}
        onClose={() => setConfirmModal({ isOpen: false, type: null, invitationId: null })}
        onConfirm={handleConfirmAction}
        title="Send Invitation"
        message="This will send the invitation to all guests in the event. Are you sure you want to proceed?"
        confirmText="Send Now"
      />
    </div>
  );
};