import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  ArrowLeft,
  Plus,
  FileText,
  Upload,
  Eye,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  Check,
  Shield,
  Info
} from 'lucide-react';

type AgreementStatus = 'sent' | 'viewed' | 'accepted';

type Agreement = {
  id: string;
  title: string;
  vendorName: string;
  vendorId: string;
  fileName: string;
  fileSize: string;
  dateAdded: string;
  dateSent: string;
  status: AgreementStatus;
  viewedAt?: string;
  acceptedAt?: string;
  notes?: string;
};

export const EventAgreements: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15'
  };

  // Mock agreements
  const agreements: Agreement[] = [
    {
      id: '1',
      title: 'Photography Service Agreement',
      vendorName: 'Elite Photography Studio',
      vendorId: '1',
      fileName: 'photography-contract.pdf',
      fileSize: '2.4 MB',
      dateAdded: '2026-01-22T10:00:00',
      dateSent: '2026-01-22T10:05:00',
      status: 'accepted',
      viewedAt: '2026-01-23T14:30:00',
      acceptedAt: '2026-01-24T09:15:00',
      notes: 'Standard photography service contract with cancellation policy'
    },
    {
      id: '2',
      title: 'Catering Service Agreement',
      vendorName: 'Gourmet Catering Co.',
      vendorId: '2',
      fileName: 'catering-terms.pdf',
      fileSize: '1.8 MB',
      dateAdded: '2026-01-25T15:00:00',
      dateSent: '2026-01-25T15:10:00',
      status: 'viewed',
      viewedAt: '2026-01-26T11:20:00',
      notes: 'Menu confirmation and dietary requirements'
    },
    {
      id: '3',
      title: 'Venue Rental Agreement',
      vendorName: 'Grand Hotel Ballroom',
      vendorId: '3',
      fileName: 'venue-contract.pdf',
      fileSize: '3.1 MB',
      dateAdded: '2026-01-20T09:00:00',
      dateSent: '2026-01-20T09:15:00',
      status: 'sent'
    }
  ];

  const getStatusBadge = (status: AgreementStatus) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'viewed':
        return 'bg-blue-100 text-blue-700';
      case 'sent':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: AgreementStatus) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'viewed':
        return <Eye className="h-4 w-4" />;
      case 'sent':
        return <Send className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">Agreements for This Event</h1>
              <p className="text-[#16232A]/70">
                Manage formal agreements with vendors for {event.name}.
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Agreement
            </Button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Important</p>
          <p className="text-sm text-blue-800 mt-1">
            Vendors will be notified when you add an agreement. They must acknowledge receipt 
            before the status changes to "Accepted". Agreements cannot be edited after sending.
          </p>
        </div>
      </div>

      {/* Agreements List */}
      {agreements.length > 0 ? (
        <div className="space-y-4">
          {agreements.map((agreement, index) => (
            <motion.div
              key={agreement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#075056]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="h-7 w-7 text-[#075056]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#16232A] mb-1">{agreement.title}</h3>
                    <p className="text-[#16232A]/70 mb-2">{agreement.vendorName}</p>
                    <div className="flex items-center gap-3 text-sm text-[#16232A]/50">
                      <span>{agreement.fileName}</span>
                      <span>•</span>
                      <span>{agreement.fileSize}</span>
                      <span>•</span>
                      <span>Added {new Date(agreement.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${getStatusBadge(agreement.status)}`}>
                    {getStatusIcon(agreement.status)}
                    <span className="capitalize">{agreement.status}</span>
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-[#16232A]/60">Sent:</span>
                    <span className="font-medium text-[#16232A]">
                      {new Date(agreement.dateSent).toLocaleString()}
                    </span>
                  </div>

                  {agreement.viewedAt && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-[#16232A]/60">Viewed:</span>
                      <span className="font-medium text-[#16232A]">
                        {new Date(agreement.viewedAt).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {agreement.acceptedAt && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-[#16232A]/60">Accepted:</span>
                      <span className="font-medium text-[#16232A]">
                        {new Date(agreement.acceptedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {agreement.notes && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-[#16232A]/70 italic">"{agreement.notes}"</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAgreement(agreement)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>

                {agreement.status === 'sent' && (
                  <div className="ml-auto">
                    <span className="text-xs text-amber-600 font-medium">
                      Awaiting vendor acknowledgment
                    </span>
                  </div>
                )}

                {agreement.status === 'viewed' && (
                  <div className="ml-auto">
                    <span className="text-xs text-blue-600 font-medium">
                      Vendor has viewed, awaiting acceptance
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No Agreements Yet</h3>
          <p className="text-[#16232A]/60 mb-6">
            Add formal agreements to ensure clear terms with your vendors.
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Agreement
          </Button>
        </div>
      )}

      {/* Add Agreement Modal */}
      {showAddModal && (
        <AddAgreementModal
          eventId={eventId || ''}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Agreement Detail Modal */}
      {selectedAgreement && (
        <AgreementDetailModal
          agreement={selectedAgreement}
          onClose={() => setSelectedAgreement(null)}
        />
      )}
    </div>
  );
};

// Add Agreement Modal
const AddAgreementModal: React.FC<{
  eventId: string;
  onClose: () => void;
}> = ({ eventId, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    vendorId: '',
    notes: ''
  });
  const [file, setFile] = useState<File | null>(null);

  // Mock vendors for selection
  const vendors = [
    { id: '1', name: 'Elite Photography Studio' },
    { id: '2', name: 'Gourmet Catering Co.' },
    { id: '3', name: 'DJ Beats Entertainment' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, upload file and send to backend
    console.log('Adding agreement:', formData, file);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Add Agreement</h3>
          <button onClick={onClose} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Agreement Title <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Photography Service Agreement"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Select Vendor <span className="text-[#FF5B04]">*</span>
            </label>
            <select
              value={formData.vendorId}
              onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="">Choose a vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Upload Document <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-[#075056]" />
                  <div className="text-left">
                    <p className="font-medium text-[#16232A]">{file.name}</p>
                    <p className="text-sm text-[#16232A]/60">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="ml-auto text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-[#16232A] font-medium mb-2">Drop your file here</p>
                  <p className="text-sm text-[#16232A]/60 mb-4">or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    className="hidden"
                    id="agreement-upload"
                  />
                  <label htmlFor="agreement-upload">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('agreement-upload')?.click()}>
                      Choose File
                    </Button>
                  </label>
                  <p className="text-xs text-[#16232A]/50 mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Add any notes about this agreement..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">Vendor Notification</p>
              <p className="text-sm text-amber-800 mt-1">
                The vendor will be notified when you send this agreement. You cannot edit the 
                agreement after sending. Make sure all details are correct before proceeding.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title || !formData.vendorId || !file}
              className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Agreement
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Agreement Detail Modal
const AgreementDetailModal: React.FC<{
  agreement: Agreement;
  onClose: () => void;
}> = ({ agreement, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Agreement Details</h3>
          <button onClick={onClose} className="text-[#16232A]/50 hover:text-[#16232A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Agreement Info */}
          <div className="bg-[#E4EEF0] rounded-xl p-6">
            <h4 className="font-semibold text-[#16232A] mb-4">{agreement.title}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#16232A]/60">Vendor:</span>
                <span className="font-medium text-[#16232A]">{agreement.vendorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16232A]/60">File:</span>
                <span className="font-medium text-[#16232A]">{agreement.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16232A]/60">Size:</span>
                <span className="font-medium text-[#16232A]">{agreement.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16232A]/60">Status:</span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                  agreement.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  agreement.status === 'viewed' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {agreement.status === 'accepted' ? <CheckCircle2 className="h-3 w-3" /> :
                   agreement.status === 'viewed' ? <Eye className="h-3 w-3" /> :
                   <Send className="h-3 w-3" />}
                  <span className="capitalize">{agreement.status}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Log */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timestamp Log
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#16232A]">Agreement Sent</p>
                  <p className="text-xs text-[#16232A]/60">
                    {new Date(agreement.dateSent).toLocaleString()}
                  </p>
                </div>
              </div>

              {agreement.viewedAt && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#16232A]">Viewed by Vendor</p>
                    <p className="text-xs text-[#16232A]/60">
                      {new Date(agreement.viewedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {agreement.acceptedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#16232A]">Accepted by Vendor</p>
                    <p className="text-xs text-[#16232A]/60">
                      {new Date(agreement.acceptedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {agreement.notes && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">Notes</p>
              <p className="text-sm text-blue-800">{agreement.notes}</p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">Read-Only</p>
              <p className="text-sm text-amber-800 mt-1">
                This agreement cannot be edited after sending. All timestamps are logged 
                for dispute resolution purposes.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Agreement
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
