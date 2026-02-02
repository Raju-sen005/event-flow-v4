import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  FileText, 
  Edit2, 
  Send, 
  Trash2,
  Download,
  Clock,
  CheckCircle,
  Calendar,
  Building2,
  Lock,
  Copy,
  AlertCircle,
  User
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type AgreementStatus = 'draft' | 'sent' | 'accepted';
type AgreementScope = 'event' | 'template';

interface AgreementDetail {
  id: string;
  title: string;
  scope: AgreementScope;
  status: AgreementStatus;
  eventName?: string;
  eventId?: string;
  vendorName?: string;
  vendorId?: string;
  notes?: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  createdBy: string;
  sentAt?: string;
  acceptedAt?: string;
  acceptedBy?: string;
}

export const AgreementDetail: React.FC = () => {
  const { eventId, agreementId } = useParams<{ eventId?: string; agreementId: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  // Mock data
  const agreement: AgreementDetail = {
    id: agreementId || '1',
    title: 'Catering Service Agreement',
    scope: 'event',
    status: 'sent',
    eventName: "Sarah & John's Wedding",
    eventId: 'evt-001',
    vendorName: 'Gourmet Delights Catering',
    vendorId: 'v-001',
    notes: 'Standard catering agreement with menu specifications and service requirements.',
    fileName: 'catering-agreement.pdf',
    fileSize: 2456789,
    createdAt: '2026-01-20',
    createdBy: 'Sarah Johnson',
    sentAt: '2026-01-22',
  };

  const canEdit = agreement.status === 'draft';
  const canDelete = agreement.status === 'draft';
  const canSend = agreement.status === 'draft';
  const canDownload = agreement.status === 'accepted';

  const getStatusBadge = () => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-300',
      sent: 'bg-blue-50 text-blue-700 border-blue-200',
      accepted: 'bg-green-50 text-green-700 border-green-200',
    };

    const icons = {
      draft: Clock,
      sent: Send,
      accepted: CheckCircle,
    };

    const Icon = icons[agreement.status];

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${styles[agreement.status]}`}>
        <Icon className="h-5 w-5" />
        {agreement.status === 'draft' ? 'Draft' : agreement.status === 'sent' ? 'Sent' : 'Accepted'}
      </span>
    );
  };

  const getScopeLabel = () => {
    if (agreement.scope === 'template') {
      return (
        <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Copy className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-purple-900">📄 Reusable Agreement Template</p>
            <p className="text-sm text-purple-700">You can attach this to events later</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Lock className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-blue-900">🔒 Event-Specific Agreement</p>
          <p className="text-sm text-blue-700">Applies only to {agreement.eventName}</p>
        </div>
      </div>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleEdit = () => {
    if (!canEdit) {
      setShowEditTooltip(true);
      setTimeout(() => setShowEditTooltip(false), 2000);
      return;
    }
    // Navigate to edit page
    if (eventId) {
      navigate(`/customer/events/${eventId}/agreements/${agreement.id}/edit`);
    } else {
      navigate(`/customer/agreements/${agreement.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (!canDelete) {
      setShowDeleteTooltip(true);
      setTimeout(() => setShowDeleteTooltip(false), 2000);
      return;
    }
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // Delete logic
    if (eventId) {
      navigate(`/customer/events/${eventId}/agreements`);
    } else {
      navigate('/customer/agreements');
    }
  };

  const handleSend = () => {
    if (!canSend) return;
    setShowSendModal(true);
  };

  const handleConfirmSend = () => {
    setShowSendModal(false);
    // Send logic - status would change to 'sent'
  };

  const handleDownload = () => {
    // Download logic
    console.log('Downloading agreement...');
  };

  const handleBack = () => {
    if (eventId) {
      navigate(`/customer/events/${eventId}/agreements`);
    } else {
      navigate('/customer/agreements');
    }
  };

  const getDisabledMessage = (action: string) => {
    if (action === 'edit' && agreement.status === 'sent') {
      return 'This agreement has already been sent';
    }
    if (action === 'edit' && agreement.status === 'accepted') {
      return 'This agreement is accepted and locked';
    }
    if (action === 'delete' && agreement.status !== 'draft') {
      return 'Only draft agreements can be deleted';
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            {agreement.eventName && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Calendar className="h-4 w-4" />
                <span>{agreement.eventName}</span>
              </div>
            )}
            <h1 className="text-2xl font-bold text-[#16232A]">{agreement.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {canDownload && (
            <Button
              onClick={handleDownload}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}

          <div className="relative">
            <Button
              onClick={handleEdit}
              variant="outline"
              disabled={!canEdit}
              className={!canEdit ? 'cursor-not-allowed opacity-50' : ''}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>

            <AnimatePresence>
              {showEditTooltip && !canEdit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
                >
                  {getDisabledMessage('edit')}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {canSend && (
            <Button
              onClick={handleSend}
              className="bg-[#075056] hover:bg-[#075056]/90 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Agreement
            </Button>
          )}

          <div className="relative">
            <Button
              onClick={handleDelete}
              variant="outline"
              disabled={!canDelete}
              className={`border-red-300 text-red-600 hover:bg-red-50 ${
                !canDelete ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {showDeleteTooltip && !canDelete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
                >
                  {getDisabledMessage('delete')}
                  <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scope Label */}
          {getScopeLabel()}

          {/* Agreement Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Agreement Document</h3>

            <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#16232A] mb-1">{agreement.fileName}</h4>
                  <p className="text-sm text-gray-600 mb-3">{formatFileSize(agreement.fileSize)}</p>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                </div>
              </div>
            </div>

            {agreement.notes && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                <p className="text-gray-600">{agreement.notes}</p>
              </div>
            )}
          </div>

          {/* Status Information */}
          {agreement.status === 'accepted' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">Agreement Accepted & Locked</p>
                  <p className="text-sm text-green-700">
                    This agreement has been accepted and is now legally binding. It cannot be modified.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {agreement.status === 'sent' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <Send className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Waiting for Vendor Response</p>
                  <p className="text-sm text-blue-700">
                    This agreement has been sent to the vendor. Once accepted, it will be locked.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Status</h3>
            <div className="mb-4">
              {getStatusBadge()}
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Details</h3>
            <div className="space-y-4 text-sm">
              {agreement.vendorName && (
                <div>
                  <p className="text-gray-600 mb-1 flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    Vendor
                  </p>
                  <p className="font-medium text-[#16232A]">{agreement.vendorName}</p>
                </div>
              )}

              {agreement.eventName && (
                <div>
                  <p className="text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Event
                  </p>
                  <p className="font-medium text-[#16232A]">{agreement.eventName}</p>
                </div>
              )}

              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Created By
                </p>
                <p className="font-medium text-[#16232A]">{agreement.createdBy}</p>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#16232A]">Created</p>
                  <p className="text-sm text-gray-600">
                    {new Date(agreement.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {agreement.sentAt && (
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#16232A]">Sent</p>
                    <p className="text-sm text-gray-600">
                      {new Date(agreement.sentAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {agreement.acceptedAt && (
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#16232A]">Accepted</p>
                    <p className="text-sm text-gray-600">
                      {new Date(agreement.acceptedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    {agreement.acceptedBy && (
                      <p className="text-xs text-gray-500 mt-1">by {agreement.acceptedBy}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Confirmation Modal */}
      <AnimatePresence>
        {showSendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#16232A] mb-2">Send Agreement?</h3>
                  <p className="text-gray-600 mb-3">
                    Once sent, this agreement cannot be edited. The vendor will be notified and can review the agreement.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="font-medium text-[#16232A] mb-1">Sending to:</p>
                    <p className="text-gray-700">{agreement.vendorName}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={() => setShowSendModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSend}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#16232A] mb-2">Delete Agreement?</h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete this agreement? This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={() => setShowDeleteModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
