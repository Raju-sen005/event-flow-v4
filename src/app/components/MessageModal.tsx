import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Paperclip } from 'lucide-react';
import { Button } from './ui/button';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, attachments?: File[]) => void;
  bid: any;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  onSend,
  bid,
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const quickMessages = [
    "I'd like to discuss the requirements in detail.",
    "Could we schedule a call to go over the specifics?",
    "I have some questions about the event timeline.",
    "Thank you for considering my bid. Looking forward to hearing from you.",
  ];

  if (!bid) return null;

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#075056]/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-[#075056]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#16232A]">Send Message</h2>
                  <p className="text-sm text-[#16232A]/70">
                    To: {bid.customer} (Customer)
                  </p>
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
            <div className="p-6 space-y-6">
              {/* Context */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Regarding:</span> {bid.title}
                </p>
              </div>

              {/* Quick Messages */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-3">
                  Quick Messages
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {quickMessages.map((quickMsg, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(quickMsg)}
                      className="text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm text-[#16232A] transition-colors"
                    >
                      {quickMsg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056] resize-none"
                />
                <p className="text-xs text-[#16232A]/50 mt-1">
                  {message.length} characters
                </p>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-[#16232A] mb-2">
                  Attachments (Optional)
                </label>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-[#16232A]">{file.name}</span>
                        <span className="text-xs text-[#16232A]/50">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <label className="block">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#075056] transition-colors">
                      <Paperclip className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-[#16232A]">
                        Click to attach files
                      </p>
                      <p className="text-xs text-[#16232A]/50 mt-1">
                        PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-xl">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};