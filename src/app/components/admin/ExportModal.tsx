import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { Button } from '../ui/button';

interface ExportField {
  id: string;
  label: string;
  checked: boolean;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  availableFields: { id: string; label: string }[];
  filterOptions?: {
    statuses?: string[];
    categories?: string[];
  };
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title,
  availableFields,
  filterOptions
}) => {
  const [dataScope, setDataScope] = useState<'all' | 'filtered'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [fields, setFields] = useState<ExportField[]>(
    availableFields.map(field => ({ ...field, checked: true }))
  );

  if (!isOpen) return null;

  const toggleField = (id: string) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, checked: !field.checked } : field
    ));
  };

  const selectAllFields = () => {
    setFields(fields.map(field => ({ ...field, checked: true })));
  };

  const deselectAllFields = () => {
    setFields(fields.map(field => ({ ...field, checked: false })));
  };

  const handleExport = () => {
    const selectedFields = fields.filter(f => f.checked).map(f => f.label);
    
    // Simulate export
    console.log('Exporting data:', {
      scope: dataScope,
      status: selectedStatus,
      category: selectedCategory,
      dateRange: { from: dateFrom, to: dateTo },
      format: exportFormat,
      fields: selectedFields
    });

    // Create a mock download
    const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-export-${Date.now()}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
    alert(`Export successful!\nFile: ${fileName}\nFormat: ${exportFormat.toUpperCase()}\nFields: ${selectedFields.length}\nScope: ${dataScope}`);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#16232A]">Export {title}</h3>
            <p className="text-sm text-gray-600 mt-1">Select data scope, filters, and fields to export</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Data Scope Selection */}
          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-3">Data Scope</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDataScope('all')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  dataScope === 'all'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">All Data</p>
                <p className="text-xs text-gray-600 mt-1">Export complete dataset</p>
              </button>
              <button
                onClick={() => setDataScope('filtered')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  dataScope === 'filtered'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">Filtered Data</p>
                <p className="text-xs text-gray-600 mt-1">Apply filters before export</p>
              </button>
            </div>
          </div>

          {/* Filters (shown when filtered scope is selected) */}
          {dataScope === 'filtered' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm">Apply Filters</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Status Filter */}
                {filterOptions?.statuses && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] text-sm"
                    >
                      <option value="all">All Statuses</option>
                      {filterOptions.statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Category Filter */}
                {filterOptions?.categories && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] text-sm"
                    >
                      <option value="all">All Categories</option>
                      {filterOptions.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Date Range Filter */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Field Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-[#16232A]">Select Fields</label>
              <div className="flex gap-2">
                <button
                  onClick={selectAllFields}
                  className="text-xs font-medium text-[#FF5B04] hover:text-[#FF5B04]/80"
                >
                  Select All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={deselectAllFields}
                  className="text-xs font-medium text-gray-600 hover:text-gray-800"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
              {fields.map(field => (
                <label key={field.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={field.checked}
                    onChange={() => toggleField(field.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-3">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setExportFormat('csv')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  exportFormat === 'csv'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className={`h-6 w-6 mx-auto mb-2 ${
                  exportFormat === 'csv' ? 'text-[#FF5B04]' : 'text-gray-400'
                }`} />
                <p className="font-semibold text-gray-900 text-sm">CSV</p>
                <p className="text-xs text-gray-500 mt-1">.csv file</p>
              </button>
              <button
                onClick={() => setExportFormat('excel')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  exportFormat === 'excel'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileSpreadsheet className={`h-6 w-6 mx-auto mb-2 ${
                  exportFormat === 'excel' ? 'text-[#FF5B04]' : 'text-gray-400'
                }`} />
                <p className="font-semibold text-gray-900 text-sm">Excel</p>
                <p className="text-xs text-gray-500 mt-1">.xlsx file</p>
              </button>
              <button
                onClick={() => setExportFormat('pdf')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  exportFormat === 'pdf'
                    ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <File className={`h-6 w-6 mx-auto mb-2 ${
                  exportFormat === 'pdf' ? 'text-[#FF5B04]' : 'text-gray-400'
                }`} />
                <p className="font-semibold text-gray-900 text-sm">PDF</p>
                <p className="text-xs text-gray-500 mt-1">.pdf file</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {fields.filter(f => f.checked).length} of {fields.length} fields selected
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={fields.filter(f => f.checked).length === 0}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 mr-2" />
              Export {exportFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
