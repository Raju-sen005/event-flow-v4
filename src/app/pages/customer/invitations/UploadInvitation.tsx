import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Upload, Eye, Save, Check, AlertCircle, X, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export const UploadInvitation: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [invitationName, setInvitationName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const supportedFormats = {
    image: ['image/jpeg', 'image/png', 'image/jpg'],
    video: ['video/mp4'],
    document: ['application/pdf'],
  };

  const allSupportedFormats = [
    ...supportedFormats.image,
    ...supportedFormats.video,
    ...supportedFormats.document,
  ];

  const handleFileSelect = (file: File) => {
    setUploadError(null);

    // Validate file type
    if (!allSupportedFormats.includes(file.type)) {
      setUploadError('Unsupported file format. Please upload JPG, PNG, MP4, or PDF files.');
      return;
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds 50MB limit.');
      return;
    }

    // Create preview for images
    let preview: string | undefined;
    if (supportedFormats.image.includes(file.type)) {
      preview = URL.createObjectURL(file);
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
      preview,
    });

    // Auto-fill name if empty
    if (!invitationName) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      setInvitationName(nameWithoutExt);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
    setUploadError(null);
  };

  const handleSaveDraft = () => {
    if (!invitationName || !uploadedFile) {
      return;
    }

    setShowSaveConfirmation(true);
    setTimeout(() => {
      setShowSaveConfirmation(false);
      navigate(`/customer/invitations/${eventId}`);
    }, 1500);
  };

  const handleFinalize = () => {
    navigate(`/customer/invitations/${eventId}`);
  };

  const getFileIcon = (type: string) => {
    if (supportedFormats.image.includes(type)) return ImageIcon;
    if (supportedFormats.video.includes(type)) return Video;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const canSave = invitationName.trim() && uploadedFile;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/customer/invitations/${eventId}/create`)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#16232A]">Upload Custom Invitation</h1>
            <p className="text-gray-600">Upload your pre-designed invitation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
            disabled={!uploadedFile}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            disabled={!canSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button
            onClick={() => setShowFinalizeModal(true)}
            disabled={!canSave}
            className="bg-[#075056] hover:bg-[#075056]/90 text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Check className="h-4 w-4 mr-2" />
            Finalize Invitation
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Name *
              </label>
              <input
                type="text"
                value={invitationName}
                onChange={(e) => setInvitationName(e.target.value)}
                placeholder="e.g., Wedding Invitation"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Add any notes about this invitation..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Upload File *
            </label>

            {!uploadedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="max-w-xs mx-auto">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Drag and drop your file here
                  </p>
                  <p className="text-xs text-gray-500 mb-4">or</p>
                  <label htmlFor="file-upload">
                    <span className="inline-block px-4 py-2 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg cursor-pointer transition-colors">
                      Browse Files
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.mp4,.pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-4">
                    Supported: JPG, PNG, MP4, PDF (Max 50MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {React.createElement(getFileIcon(uploadedFile.type), {
                      className: 'h-6 w-6 text-gray-600',
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#16232A] truncate">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {uploadedFile.preview && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
              >
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{uploadError}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Preview</h3>

            {uploadedFile ? (
              <div className="aspect-[3/4] rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    {React.createElement(getFileIcon(uploadedFile.type), {
                      className: 'h-16 w-16 text-gray-400 mx-auto mb-4',
                    })}
                    <p className="text-sm font-medium text-gray-700">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadedFile.type.includes('video') ? 'Video file' : 'PDF document'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <Upload className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Upload a file to see preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreview && uploadedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Full Preview</h3>
                <Button onClick={() => setShowPreview(false)} variant="outline">
                  Close
                </Button>
              </div>

              <div className="bg-white rounded-xl p-4">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt="Full preview"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                    {React.createElement(getFileIcon(uploadedFile.type), {
                      className: 'h-24 w-24 text-gray-400',
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finalize Confirmation Modal */}
      <AnimatePresence>
        {showFinalizeModal && (
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
                  <h3 className="text-lg font-bold text-[#16232A] mb-2">
                    Finalize Invitation?
                  </h3>
                  <p className="text-gray-600">
                    Once finalized, this invitation will be ready to send to your guests. You won't be able to replace the uploaded file.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setShowFinalizeModal(false)}
                  variant="outline"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleFinalize}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  Finalize
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Confirmation */}
      <AnimatePresence>
        {showSaveConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50"
          >
            <Check className="h-5 w-5" />
            <span className="font-medium">Draft saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
