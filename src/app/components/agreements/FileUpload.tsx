import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  uploadedFile: UploadedFile | null;
  error: string | null;
  accept?: string;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  uploadedFile,
  error,
  accept = '.pdf,.doc,.docx',
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    return '📎';
  };

  return (
    <div>
      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? 'border-[#FF5B04] bg-[#FF5B04]/5'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="max-w-sm mx-auto">
            <motion.div
              animate={{
                scale: isDragging ? 1.1 : 1,
                rotate: isDragging ? 5 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDragging
                    ? 'bg-[#FF5B04]/10'
                    : error
                    ? 'bg-red-100'
                    : 'bg-gray-100'
                }`}
              >
                <Upload
                  className={`h-8 w-8 ${
                    isDragging
                      ? 'text-[#FF5B04]'
                      : error
                      ? 'text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </div>
            </motion.div>

            <h3 className="text-base font-semibold text-[#16232A] mb-2">
              {isDragging ? 'Drop your file here' : 'Upload Agreement File'}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Drag and drop your file here, or click to browse
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileInput}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-block px-6 py-2.5 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white rounded-lg transition-colors font-medium"
            >
              Choose File
            </button>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-green-200 bg-green-50 rounded-xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-3xl">{getFileIcon(uploadedFile.type)}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#16232A] truncate mb-1">
                    {uploadedFile.name}
                  </h4>
                  <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                </div>
                <button
                  onClick={onFileRemove}
                  className="ml-3 p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                  title="Remove file"
                >
                  <X className="h-5 w-5 text-red-600" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">File uploaded successfully</span>
              </div>

              {/* Progress bar animation */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
                className="mt-3 h-1 bg-green-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900 mb-1">Upload Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
