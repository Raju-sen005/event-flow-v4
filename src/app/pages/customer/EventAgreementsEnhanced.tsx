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
  Info,
  Loader2,
  AlertTriangle,
  Calendar,
  User,
  Building2,
  CheckCheck,
  EyeOff,
  Mail
} from 'lucide-react';

// Types
type AgreementStatus = 'sent' | 'viewed' | 'accepted';

type Agreement = {
  id: string;
  title: string;
  vendorName: string;
  vendorId: string;
  service: string;
  fileName: string;
  fileSize: string;
  fileUrl?: string;
  dateAdded: string;
  dateSent: string;
  status: AgreementStatus;
  viewedAt?: string;
  acceptedAt?: string;
  notes?: string;
  immutable: boolean; // Once sent, cannot be edited
};

type Vendor = {
  id: string;
  name: string;
  service: string;
  email: string;
  phone: string;
};

export const EventAgreementsEnhanced: React.FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // State management
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmSendModal, setShowConfirmSendModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Add agreement form state
  const [agreementForm, setAgreementForm] = useState<{
    title: string;
    selectedVendors: string[];
    file: File | null;
    notes: string;
  }>({
    title: '',
    selectedVendors: [],
    file: null,
    notes: ''
  });

  // Mock event data
  const event = {
    id: eventId || '1',
    name: 'Sarah & John Wedding',
    date: '2026-06-15',
    location: 'Grand Hotel Ballroom'
  };

  // Mock finalized vendors
  const vendors: Vendor[] = [
    {
      id: 'vendor-1',
      name: 'Elite Photography',
      service: 'Photography',
      email: 'contact@elitephoto.com',
      phone: '+1 234 567 8901'
    },
    {
      id: 'vendor-2',
      name: 'Gourmet Catering',
      service: 'Catering',
      email: 'info@gourmetcatering.com',
      phone: '+1 234 567 8902'
    }
  ];

  // Mock agreements
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: 'agr-1',
      title: 'Photography Service Agreement',
      vendorName: 'Elite Photography',
      vendorId: 'vendor-1',
      service: 'Photography',
      fileName: 'photography-agreement.pdf',
      fileSize: '2.5 MB',
      fileUrl: '/agreements/photography-agreement.pdf',
      dateAdded: '2026-01-10T10:00:00',
      dateSent: '2026-01-10T10:05:00',
      status: 'accepted',
      viewedAt: '2026-01-10T14:30:00',
      acceptedAt: '2026-01-11T09:00:00',
      notes: 'Standard photography package with 8 hours coverage',
      immutable: true
    },
    {
      id: 'agr-2',
      title: 'Catering Service Agreement',
      vendorName: 'Gourmet Catering',
      vendorId: 'vendor-2',
      service: 'Catering',
      fileName: 'catering-agreement.pdf',
      fileSize: '3.1 MB',
      fileUrl: '/agreements/catering-agreement.pdf',
      dateAdded: '2026-01-12T11:00:00',
      dateSent: '2026-01-12T11:10:00',
      status: 'viewed',
      viewedAt: '2026-01-12T15:00:00',
      notes: 'Menu for 200 guests with vegetarian options',
      immutable: true
    }
  ]);

  // Get status badge styling
  const getStatusBadge = (status: AgreementStatus) => {
    switch (status) {
      case 'sent':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: Send,
          label: 'Sent'
        };
      case 'viewed':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-700',
          icon: Eye,
          label: 'Viewed'
        };
      case 'accepted':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: CheckCircle2,
          label: 'Accepted'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF or Word document');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setAgreementForm(prev => ({ ...prev, file }));
      setError(null);
    }
  };

  // Toggle vendor selection
  const toggleVendorSelection = (vendorId: string) => {
    setAgreementForm(prev => ({
      ...prev,
      selectedVendors: prev.selectedVendors.includes(vendorId)
        ? prev.selectedVendors.filter(id => id !== vendorId)
        : [...prev.selectedVendors, vendorId]
    }));
  };

  // Validate form
  const canSubmit = 
    agreementForm.title.trim() !== '' &&
    agreementForm.selectedVendors.length > 0 &&
    agreementForm.file !== null;

  // Handle add agreement
  const handleAddAgreement = () => {
    if (!canSubmit) return;
    setShowConfirmSendModal(true);
  };

  // Confirm send agreement
  const confirmSendAgreement = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new agreement(s) for each selected vendor
    const newAgreements: Agreement[] = agreementForm.selectedVendors.map(vendorId => {
      const vendor = vendors.find(v => v.id === vendorId)!;
      const now = new Date().toISOString();
      
      return {
        id: `agr-${Date.now()}-${vendorId}`,
        title: agreementForm.title,
        vendorName: vendor.name,
        vendorId: vendor.id,
        service: vendor.service,
        fileName: agreementForm.file!.name,
        fileSize: `${(agreementForm.file!.size / (1024 * 1024)).toFixed(2)} MB`,
        dateAdded: now,
        dateSent: now,
        status: 'sent',
        notes: agreementForm.notes,
        immutable: true // Immutable once sent
      };
    });

    setAgreements(prev => [...newAgreements, ...prev]);
    
    // Reset form
    setAgreementForm({
      title: '',
      selectedVendors: [],
      file: null,
      notes: ''
    });
    
    setLoading(false);
    setShowConfirmSendModal(false);
    setShowAddModal(false);
  };

  // Handle view agreement
  const handleViewAgreement = (agreement: Agreement) => {
    setSelectedAgreement(agreement);
    setShowViewModal(true);
  };

  // Handle download
  const handleDownloadAgreement = (agreement: Agreement) => {
    console.log('Downloading agreement:', agreement.fileName);
    // In production, trigger actual download
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
              <h1 className="text-3xl font-bold text-[#16232A] mb-2">Event Agreements</h1>
              <p className="text-[#16232A]/70">
                Manage formal agreements with vendors for <span className="font-semibold">{event.name}</span>
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">About Agreements</p>
            <p className="text-sm text-blue-800">
              Agreements become read-only after sending and cannot be edited. Vendors will be notified via email and can view/accept the agreement from their dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Agreements List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-[#16232A]">All Agreements</h3>
        </div>

        {agreements.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {agreements.map((agreement, index) => {
              const statusConfig = getStatusBadge(agreement.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={agreement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
                        <StatusIcon className={`h-6 w-6 ${statusConfig.text}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-[#16232A] mb-1">{agreement.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                <span>{agreement.vendorName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>{agreement.service}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-[#16232A]/60 mb-1">File</p>
                            <p className="font-medium text-[#16232A]">{agreement.fileName}</p>
                            <p className="text-xs text-[#16232A]/50">{agreement.fileSize}</p>
                          </div>
                          <div>
                            <p className="text-[#16232A]/60 mb-1">Sent</p>
                            <p className="font-medium text-[#16232A]">
                              {new Date(agreement.dateSent).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-[#16232A]/50">
                              {new Date(agreement.dateSent).toLocaleTimeString()}
                            </p>
                          </div>
                          {agreement.viewedAt && (
                            <div>
                              <p className="text-[#16232A]/60 mb-1">Viewed</p>
                              <p className="font-medium text-[#16232A]">
                                {new Date(agreement.viewedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-[#16232A]/50">
                                {new Date(agreement.viewedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          )}
                          {agreement.acceptedAt && (
                            <div>
                              <p className="text-[#16232A]/60 mb-1">Accepted</p>
                              <p className="font-medium text-[#16232A]">
                                {new Date(agreement.acceptedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-[#16232A]/50">
                                {new Date(agreement.acceptedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          )}
                        </div>

                        {agreement.notes && (
                          <div className="mt-3 text-sm">
                            <p className="text-[#16232A]/60 mb-1">Notes</p>
                            <p className="text-[#16232A]/70 italic">"{agreement.notes}"</p>
                          </div>
                        )}

                        {agreement.immutable && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-[#16232A]/60">
                            <Shield className="h-3 w-3" />
                            <span>Read-only (sent)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewAgreement(agreement)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View agreement details</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadAgreement(agreement)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download PDF</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#16232A] mb-2">No agreements added yet</h3>
            <p className="text-[#16232A]/60 mb-6">
              Start by adding your first agreement for this event
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
      </div>

      {/* Modals */}
      <AddAgreementModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAgreementForm({
            title: '',
            selectedVendors: [],
            file: null,
            notes: ''
          });
          setError(null);
        }}
        formData={agreementForm}
        onFormChange={setAgreementForm}
        vendors={vendors}
        onFileSelect={handleFileSelect}
        onToggleVendor={toggleVendorSelection}
        onSubmit={handleAddAgreement}
        canSubmit={canSubmit}
        error={error}
      />

      <ConfirmSendModal
        isOpen={showConfirmSendModal}
        onClose={() => setShowConfirmSendModal(false)}
        onConfirm={confirmSendAgreement}
        formData={agreementForm}
        vendors={vendors}
        loading={loading}
      />

      <ViewAgreementModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedAgreement(null);
        }}
        agreement={selectedAgreement}
        onDownload={handleDownloadAgreement}
      />
    </div>
  );
};

// Add Agreement Modal
const AddAgreementModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormChange: (data: any) => void;
  vendors: Vendor[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVendor: (vendorId: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  error: string | null;
}> = ({ isOpen, onClose, formData, onFormChange, vendors, onFileSelect, onToggleVendor, onSubmit, canSubmit, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Add Agreement</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Agreement Title */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Agreement Title <span className="text-[#FF5B04]">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              placeholder="e.g., Photography Service Agreement"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          {/* Select Vendors */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Select Vendor(s) <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="space-y-2">
              {vendors.map(vendor => (
                <label
                  key={vendor.id}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    formData.selectedVendors.includes(vendor.id)
                      ? 'border-[#FF5B04] bg-orange-50'
                      : 'border-gray-200 hover:border-[#FF5B04]/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedVendors.includes(vendor.id)}
                    onChange={() => onToggleVendor(vendor.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]"
                  />
                  <Building2 className="h-8 w-8 text-[#16232A]/70" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#16232A]">{vendor.name}</p>
                    <p className="text-sm text-[#16232A]/60">{vendor.service}</p>
                  </div>
                  <Mail className="h-5 w-5 text-[#16232A]/40" />
                </label>
              ))}
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Upload Agreement File <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#FF5B04] transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {formData.file ? (
                <div>
                  <p className="font-medium text-[#16232A] mb-1">{formData.file.name}</p>
                  <p className="text-sm text-[#16232A]/60">
                    {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => onFormChange({ ...formData, file: null })}
                    className="text-sm text-red-600 hover:text-red-700 mt-2"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[#16232A] font-medium mb-2">Drop your file here or click to browse</p>
                  <p className="text-sm text-[#16232A]/60 mb-4">PDF or Word document (Max 10MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => onFormChange({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Add any additional notes about this agreement..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Agreement
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Confirm Send Modal
const ConfirmSendModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: any;
  vendors: Vendor[];
  loading: boolean;
}> = ({ isOpen, onClose, onConfirm, formData, vendors, loading }) => {
  if (!isOpen) return null;

  const selectedVendorNames = formData.selectedVendors
    .map((id: string) => vendors.find(v => v.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Confirm Send Agreement</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Important</p>
              <p className="text-sm text-amber-800">
                This agreement will be sent to the selected vendor(s). You will not be able to edit it later.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <div>
            <p className="text-sm text-[#16232A]/60 mb-1">Agreement Title</p>
            <p className="font-semibold text-[#16232A]">{formData.title}</p>
          </div>
          <div>
            <p className="text-sm text-[#16232A]/60 mb-1">Will be sent to</p>
            <ul className="space-y-1">
              {selectedVendorNames.map((name: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-[#16232A]">
                  <CheckCheck className="h-4 w-4 text-green-600" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-[#16232A]/60 mb-1">File</p>
            <p className="text-[#16232A]">{formData.file?.name}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Vendors will receive an email notification and can view/accept the agreement from their dashboard.
            </p>
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
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
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
      </motion.div>
    </div>
  );
};

// View Agreement Modal
const ViewAgreementModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  agreement: Agreement | null;
  onDownload: (agreement: Agreement) => void;
}> = ({ isOpen, onClose, agreement, onDownload }) => {
  if (!isOpen || !agreement) return null;

  const statusConfig = {
    sent: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Send, label: 'Sent' },
    viewed: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Eye, label: 'Viewed' },
    accepted: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Accepted' }
  }[agreement.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#16232A]">Agreement Details</h3>
          <button
            onClick={onClose}
            className="text-[#16232A]/50 hover:text-[#16232A]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
            <StatusIcon className="h-4 w-4" />
            {statusConfig.label}
          </span>
        </div>

        {/* Agreement Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Agreement Title</p>
              <p className="font-semibold text-[#16232A]">{agreement.title}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Vendor</p>
              <p className="font-semibold text-[#16232A]">{agreement.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Service</p>
              <p className="font-semibold text-[#16232A]">{agreement.service}</p>
            </div>
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">File</p>
              <p className="font-semibold text-[#16232A]">{agreement.fileName}</p>
              <p className="text-xs text-[#16232A]/50">{agreement.fileSize}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-[#16232A] mb-4">Timeline</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Send className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-[#16232A]">Agreement Sent</p>
                <p className="text-sm text-[#16232A]/60">
                  {new Date(agreement.dateSent).toLocaleString()}
                </p>
              </div>
            </div>
            
            {agreement.viewedAt && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-[#16232A]">Viewed by Vendor</p>
                  <p className="text-sm text-[#16232A]/60">
                    {new Date(agreement.viewedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            
            {agreement.acceptedAt && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[#16232A]">Accepted by Vendor</p>
                  <p className="text-sm text-[#16232A]/60">
                    {new Date(agreement.acceptedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {agreement.notes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-blue-900 mb-1">Notes</p>
            <p className="text-sm text-blue-800 italic">"{agreement.notes}"</p>
          </div>
        )}

        {/* Read-Only Notice */}
        {agreement.immutable && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Read-Only Agreement</p>
                <p className="text-sm text-amber-800">
                  This agreement has been sent and cannot be edited. Any changes require creating a new agreement.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => onDownload(agreement)}
            className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
