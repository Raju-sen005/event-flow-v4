import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Globe,
  ListChecks,
  Edit3,
  FileUp,
  Calendar,
  Shield,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { FileUpload } from '@/app/components/agreements/FileUpload';

type CreationMethod = 'create' | 'upload' | null;
type ApplicationScope = 'all-events' | 'selected-events' | null;

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
}

type Step = 'method' | 'scope' | 'content' | 'events' | 'summary';

export const AddAgreement: React.FC = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const navigate = useNavigate();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [creationMethod, setCreationMethod] = useState<CreationMethod>(null);
  const [applicationScope, setApplicationScope] = useState<ApplicationScope>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [agreementType, setAgreementType] = useState('');
  const [description, setDescription] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  // UI state
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock data
  const events: Event[] = [
    { id: 'evt-001', name: "Sarah & John's Wedding", date: '2026-06-15', type: 'Wedding' },
    { id: 'evt-002', name: 'Priya Birthday Bash', date: '2026-02-20', type: 'Birthday' },
    { id: 'evt-003', name: 'Corporate Annual Gala', date: '2026-04-10', type: 'Corporate' },
    { id: 'evt-004', name: 'Tech Conference 2026', date: '2026-05-20', type: 'Conference' },
    { id: 'evt-005', name: 'Summer Music Festival', date: '2026-07-15', type: 'Festival' },
  ];

  const agreementTypes = [
    'Service Agreement',
    'Vendor Contract',
    'Catering Agreement',
    'Photography Contract',
    'Venue Rental Agreement',
    'DJ Services Contract',
    'Decoration Services Agreement',
    'Entertainment Contract',
    'Custom Agreement',
  ];

  const handleFileSelect = (file: File) => {
    setUploadError(null);

    // Validate file type
    const supportedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!supportedTypes.includes(file.type)) {
      setUploadError('Unsupported file format. Please upload PDF or DOC files.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadError(null);
  };

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleContinueMethod = () => {
    if (!creationMethod) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setCurrentStep('scope');
  };

  const handleContinueScope = () => {
    if (!applicationScope) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setCurrentStep('content');
  };

  const handleContinueContent = () => {
    if (applicationScope === 'selected-events') {
      setCurrentStep('events');
    } else {
      setCurrentStep('summary');
    }
  };

  const handleContinueEvents = () => {
    setCurrentStep('summary');
  };

  const handleSaveAgreement = () => {
    // Save logic here
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    navigate('/customer/agreements-new');
  };

  const canContinueContent = 
    title.trim() && 
    (creationMethod === 'create' ? content.trim() : uploadedFile);

  const canContinueEvents = selectedEvents.length > 0;

  const getScopeLabel = () => {
    if (applicationScope === 'all-events') {
      return (
        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">🌍 Applies to All Events</p>
            <p className="text-sm text-blue-700">This agreement can be used across all your events</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl">
        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <ListChecks className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-purple-900">📋 Applies to Selected Events</p>
          <p className="text-sm text-purple-700">
            This agreement will only be available for {selectedEvents.length} selected event{selectedEvents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    );
  };

  const getStepNumber = () => {
    const steps: Step[] = ['method', 'scope', 'content'];
    if (applicationScope === 'selected-events') {
      steps.push('events');
    }
    steps.push('summary');
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = () => {
    return applicationScope === 'selected-events' ? 5 : 4;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (currentStep === 'method') {
                navigate('/customer/agreements-new');
              } else if (currentStep === 'scope') {
                setCurrentStep('method');
              } else if (currentStep === 'content') {
                setCurrentStep('scope');
              } else if (currentStep === 'events') {
                setCurrentStep('content');
              } else if (currentStep === 'summary') {
                if (applicationScope === 'selected-events') {
                  setCurrentStep('events');
                } else {
                  setCurrentStep('content');
                }
              }
            }}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#16232A]">Create New Agreement</h1>
            <p className="text-gray-600">
              Step {getStepNumber()} of {getTotalSteps()}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: getTotalSteps() }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full transition-colors ${
                index < getStepNumber() ? 'bg-[#FF5B04]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Choose Creation Method */}
        {currentStep === 'method' && (
          <motion.div
            key="method"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-[#FF5B04]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#FF5B04]" />
                </div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">
                  How would you like to create this agreement?
                </h2>
                <p className="text-gray-600">Choose your preferred method to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setCreationMethod('create')}
                  className={`p-6 border-2 rounded-xl text-left transition-all group hover:shadow-md ${
                    creationMethod === 'create'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
                        creationMethod === 'create'
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                      }`}
                    >
                      <Edit3 className="h-7 w-7" />
                    </div>
                    {creationMethod === 'create' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#16232A] mb-2">
                    ✍️ Create Agreement
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fill out a form to create a new agreement from scratch
                  </p>
                </button>

                <button
                  onClick={() => setCreationMethod('upload')}
                  className={`p-6 border-2 rounded-xl text-left transition-all group hover:shadow-md ${
                    creationMethod === 'upload'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
                        creationMethod === 'upload'
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                      }`}
                    >
                      <FileUp className="h-7 w-7" />
                    </div>
                    {creationMethod === 'upload' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#16232A] mb-2">
                    📤 Upload Agreement
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload an existing agreement document (PDF, DOC, DOCX)
                  </p>
                </button>
              </div>

              <div className="flex justify-end relative">
                <Button
                  onClick={handleContinueMethod}
                  disabled={!creationMethod}
                  className={`${
                    creationMethod
                      ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>

                <AnimatePresence>
                  {showTooltip && !creationMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
                    >
                      Please select a creation method
                      <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Choose Application Scope */}
        {currentStep === 'scope' && (
          <motion.div
            key="scope"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-[#075056]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-[#075056]" />
                </div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">
                  Where should this agreement apply?
                </h2>
                <p className="text-gray-600">Choose how broadly you want to use this agreement</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setApplicationScope('all-events')}
                  className={`p-6 border-2 rounded-xl text-left transition-all group hover:shadow-md ${
                    applicationScope === 'all-events'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
                        applicationScope === 'all-events'
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                      }`}
                    >
                      <Globe className="h-7 w-7" />
                    </div>
                    {applicationScope === 'all-events' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#16232A] mb-2">
                    🌍 Apply to All Events
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Make this agreement available for all current and future events
                  </p>
                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>Agreement will be saved as Draft. You'll send it to vendors separately.</p>
                  </div>
                </button>

                <button
                  onClick={() => setApplicationScope('selected-events')}
                  className={`p-6 border-2 rounded-xl text-left transition-all group hover:shadow-md ${
                    applicationScope === 'selected-events'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
                        applicationScope === 'selected-events'
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                      }`}
                    >
                      <ListChecks className="h-7 w-7" />
                    </div>
                    {applicationScope === 'selected-events' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#16232A] mb-2">
                    📋 Apply to Selected Events
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Choose specific events where this agreement will be available
                  </p>
                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>You'll select which events in the next step</p>
                  </div>
                </button>
              </div>

              <div className="flex justify-end relative">
                <Button
                  onClick={handleContinueScope}
                  disabled={!applicationScope}
                  className={`${
                    applicationScope
                      ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>

                <AnimatePresence>
                  {showTooltip && !applicationScope && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
                    >
                      Please select an application scope
                      <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Create/Upload Agreement Content */}
        {currentStep === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Scope Label */}
            <div className="mb-6">{getScopeLabel()}</div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-1">
                  {creationMethod === 'create' ? 'Create Agreement' : 'Upload Agreement'}
                </h2>
                <p className="text-gray-600">
                  {creationMethod === 'create'
                    ? 'Fill in the agreement details'
                    : 'Upload your agreement document'}
                </p>
              </div>

              {/* Agreement Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Standard Vendor Service Agreement"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                />
              </div>

              {/* Agreement Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Type (Optional)
                </label>
                <select
                  value={agreementType}
                  onChange={(e) => setAgreementType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                >
                  <option value="">Choose an agreement type...</option>
                  {agreementTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Brief description of the agreement..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                />
              </div>

              {creationMethod === 'create' ? (
                <>
                  {/* Agreement Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agreement Content *
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={12}
                      placeholder="Enter the full agreement text here..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none font-mono text-sm"
                    />
                  </div>

                  {/* Date Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Effective Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Payment Terms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms (Optional)
                    </label>
                    <textarea
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      rows={4}
                      placeholder="Specify payment terms and conditions..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Cancellation Policy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy (Optional)
                    </label>
                    <textarea
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(e.target.value)}
                      rows={4}
                      placeholder="Specify cancellation terms..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                    />
                  </div>
                </>
              ) : (
                /* File Upload */
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Agreement File *
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleRemoveFile}
                    uploadedFile={uploadedFile}
                    error={uploadError}
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes or instructions..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button
                  onClick={handleContinueContent}
                  disabled={!canContinueContent}
                  className={`${
                    canContinueContent
                      ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Select Events (Conditional) */}
        {currentStep === 'events' && applicationScope === 'selected-events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Scope Label */}
            <div className="mb-6">{getScopeLabel()}</div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#16232A] mb-1">Select Events</h2>
                <p className="text-gray-600">
                  Choose which events will have access to this agreement
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {events.map((event) => (
                  <label
                    key={event.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedEvents.includes(event.id)
                        ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleEventToggle(event.id)}
                      className="mt-1 h-5 w-5 text-[#FF5B04] border-gray-300 rounded focus:ring-[#FF5B04]"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#16232A]">{event.name}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span>•</span>
                            <span>{event.type}</span>
                          </div>
                        </div>
                        {selectedEvents.includes(event.id) && (
                          <CheckCircle className="h-5 w-5 text-[#FF5B04] flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {selectedEvents.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">
                    {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleContinueEvents}
                  disabled={!canContinueEvents}
                  className={`${
                    canContinueEvents
                      ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Summary */}
        {currentStep === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#16232A] mb-2">Review & Save</h2>
                <p className="text-gray-600">
                  Review your agreement details before saving as draft
                </p>
              </div>

              {/* Scope Label */}
              <div className="mb-6">{getScopeLabel()}</div>

              <div className="space-y-6">
                {/* Agreement Details */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#075056]" />
                    Agreement Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium text-[#16232A]">{title}</span>
                    </div>
                    {agreementType && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-[#16232A]">{agreementType}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Creation Method:</span>
                      <span className="font-medium text-[#16232A]">
                        {creationMethod === 'create' ? '✍️ Created' : '📤 Uploaded'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                        <FileText className="h-3.5 w-3.5" />
                        Draft
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Events */}
                {applicationScope === 'selected-events' && selectedEvents.length > 0 && (
                  <div className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-[#16232A] mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#075056]" />
                      Selected Events ({selectedEvents.length})
                    </h3>
                    <div className="space-y-2">
                      {events
                        .filter((e) => selectedEvents.includes(e.id))
                        .map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-[#16232A] text-sm">{event.name}</p>
                              <p className="text-xs text-gray-600">
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Important Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-2">Important Notice</p>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Agreement will be saved as <strong>Draft</strong></li>
                        <li>• No vendors will be notified automatically</li>
                        <li>• You can send this to vendors later from the agreement detail page</li>
                        <li>• Agreement can be edited until it is sent to vendors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => {
                    if (applicationScope === 'selected-events') {
                      setCurrentStep('events');
                    } else {
                      setCurrentStep('content');
                    }
                  }}
                  variant="outline"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleSaveAgreement}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Agreement
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
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
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            >
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#16232A] mb-3">
                Agreement Saved Successfully!
              </h3>
              <p className="text-gray-600 mb-2">
                Your agreement has been saved as <strong>Draft</strong>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                {applicationScope === 'all-events'
                  ? 'Available for all events • No vendors notified'
                  : `Available for ${selectedEvents.length} event${selectedEvents.length !== 1 ? 's' : ''} • No vendors notified`}
              </p>
              <Button
                onClick={handleSuccessClose}
                className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
              >
                View Agreements
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
