import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  X,
  Upload,
  AlertCircle,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { TicketCategory, TicketPriority } from '../../types/ticket';

interface CreateTicketModalProps {
  onClose: () => void;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '' as TicketCategory | '',
    subject: '',
    description: '',
    priority: 'medium' as TicketPriority,
    relatedType: '' as 'event' | 'bid' | 'invoice' | 'payment' | '',
    relatedId: '',
    relatedReference: '',
    attachments: [] as string[]
  });

  const categories = [
    { value: 'account_issue', label: 'Account Issue', description: 'Login, profile, or account settings' },
    { value: 'payment_issue', label: 'Payment Issue', description: 'Payment delays, issues, or inquiries' },
    { value: 'bid_related', label: 'Bid Related', description: 'Questions about bids or proposals' },
    { value: 'event_related', label: 'Event Related', description: 'Event details or coordination' },
    { value: 'invoice_issue', label: 'Invoice Issue', description: 'Invoice generation or payment' },
    { value: 'attendance_issue', label: 'Attendance Issue', description: 'Mark in/out or attendance problems' },
    { value: 'technical_issue', label: 'Technical Issue', description: 'Bugs, errors, or technical problems' },
    { value: 'other', label: 'Other', description: 'General inquiries or other issues' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', description: 'Minor issue, can wait', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium', label: 'Medium', description: 'Normal priority', color: 'bg-blue-100 text-blue-700' },
    { value: 'high', label: 'High', description: 'Important, needs attention', color: 'bg-orange-100 text-orange-700' },
    { value: 'urgent', label: 'Urgent', description: 'Critical, immediate attention', color: 'bg-red-100 text-red-700' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In production, upload to server/cloud storage
      const fileNames = Array.from(files).map(f => f.name);
      setFormData({ ...formData, attachments: [...formData.attachments, ...fileNames] });
    }
  };

  const handleSubmit = () => {
    // Here you would submit to backend
    alert('Ticket created successfully!');
    navigate('/vendor/support');
    onClose();
  };

  const canProceed = step === 1 
    ? formData.category && formData.subject && formData.description 
    : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#075056] to-[#075056]/90 p-4 md:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Create Support Ticket</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-1 rounded ${step >= 1 ? 'bg-white' : 'bg-white/20'}`} />
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-white' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-3">
                  Issue Category *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      onClick={() => setFormData({ ...formData, category: cat.value as TicketCategory })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.category === cat.value
                          ? 'border-[#075056] bg-[#075056]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold text-[#16232A] mb-1">{cat.label}</h4>
                      <p className="text-xs text-gray-600">{cat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  maxLength={100}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/100 characters</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about your issue..."
                  rows={6}
                  maxLength={1000}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-3">
                  Priority *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <div
                      key={priority.value}
                      onClick={() => setFormData({ ...formData, priority: priority.value as TicketPriority })}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.priority === priority.value
                          ? 'border-[#075056] bg-[#075056]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`inline-block px-2 py-1 ${priority.color} text-xs font-semibold rounded mb-1`}>
                        {priority.label}
                      </div>
                      <p className="text-xs text-gray-600">{priority.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Related Reference */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  Related Reference (Optional)
                </label>
                <p className="text-sm text-gray-600 mb-3">Link this ticket to an event, bid, invoice, or payment</p>
                <select
                  value={formData.relatedType}
                  onChange={(e) => setFormData({ ...formData, relatedType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] mb-3"
                >
                  <option value="">No related reference</option>
                  <option value="event">Event</option>
                  <option value="bid">Bid</option>
                  <option value="invoice">Invoice</option>
                  <option value="payment">Payment</option>
                </select>

                {formData.relatedType && (
                  <input
                    type="text"
                    value={formData.relatedReference}
                    onChange={(e) => setFormData({ ...formData, relatedReference: e.target.value })}
                    placeholder={`Enter ${formData.relatedType} reference number`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                  />
                )}
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-semibold text-[#16232A] mb-2">
                  Attachments (Optional)
                </label>
                <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#075056] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">Click to upload files</p>
                    <p className="text-xs text-gray-500">Images, PDF, DOC up to 10MB each</p>
                  </div>
                </label>

                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700 flex-1">{file}</span>
                        <button
                          onClick={() => setFormData({
                            ...formData,
                            attachments: formData.attachments.filter((_, i) => i !== index)
                          })}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Review */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1 text-sm">Before submitting</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Make sure you've provided all relevant details</li>
                      <li>• Our support team will respond within 24 hours</li>
                      <li>• You'll receive email notifications for updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 flex gap-3 flex-shrink-0">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceed}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white"
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Submit Ticket
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
