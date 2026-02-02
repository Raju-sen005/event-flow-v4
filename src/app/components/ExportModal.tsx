import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileDown, FileSpreadsheet, FileText, Loader2, FileJson, Printer } from 'lucide-react';
import { Button } from './ui/button';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  exportToCSV: (data: any[], filename: string) => void;
  exportToJSON: (data: any[], filename: string) => void;
  printData: (title: string, data: any[]) => void;
  title?: string;
  filename?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  exportToCSV,
  exportToJSON,
  printData,
  title = 'Export Data',
  filename = 'export',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json' | 'print'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    {
      value: 'csv' as const,
      label: 'CSV File',
      description: 'Comma-separated values, compatible with Excel',
      icon: FileSpreadsheet,
    },
    {
      value: 'json' as const,
      label: 'JSON File',
      description: 'JavaScript Object Notation, for developers',
      icon: FileJson,
    },
    {
      value: 'print' as const,
      label: 'Print / PDF',
      description: 'Print or save as PDF from your browser',
      icon: Printer,
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
      
      if (selectedFormat === 'csv') {
        exportToCSV(data, filename);
      } else if (selectedFormat === 'json') {
        exportToJSON(data, filename);
      } else if (selectedFormat === 'print') {
        printData(title, data);
      }
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#FF5B04]/10 rounded-full flex items-center justify-center">
                  <FileDown className="h-5 w-5 text-[#FF5B04]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#16232A]">{title}</h2>
                  <p className="text-sm text-[#16232A]/70">{data.length} records to export</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-[#16232A]/70" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-3">
                {formatOptions.map((format) => {
                  const Icon = format.icon;
                  return (
                    <label
                      key={format.value}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedFormat === format.value
                          ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedFormat(format.value)}
                    >
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedFormat === format.value
                          ? 'bg-[#FF5B04] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-[#16232A]">{format.label}</span>
                        </div>
                        <p className="text-sm text-[#16232A]/60">{format.description}</p>
                      </div>
                      <input
                        type="radio"
                        name="format"
                        value={format.value}
                        checked={selectedFormat === format.value}
                        onChange={() => {}}
                        className="h-5 w-5 text-[#FF5B04] mt-2"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-xl">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
                disabled={isExporting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" />
                    Export {selectedFormat.toUpperCase()}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};