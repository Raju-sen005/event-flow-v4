import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Eye, Save, Check, AlertCircle, Image as ImageIcon, Type, Palette } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface InvitationData {
  eventName: string;
  hostNames: string;
  date: string;
  time: string;
  venue: string;
  customMessage: string;
  font: string;
  colorTheme: string;
  backgroundImage: string;
}

export const TemplateEditor: React.FC = () => {
  const { eventId, templateId } = useParams<{ eventId: string; templateId: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  const [invitationData, setInvitationData] = useState<InvitationData>({
    eventName: "Sarah & John's Wedding",
    hostNames: 'Mr. & Mrs. Smith',
    date: '2026-06-15',
    time: '16:00',
    venue: 'Grand Hotel Ballroom, 123 Main Street',
    customMessage: 'Join us as we celebrate our special day',
    font: 'elegant',
    colorTheme: 'gold',
    backgroundImage: 'floral',
  });

  const fontOptions = [
    { value: 'elegant', label: 'Elegant Serif' },
    { value: 'modern', label: 'Modern Sans' },
    { value: 'classic', label: 'Classic Script' },
    { value: 'minimal', label: 'Minimal' },
  ];

  const colorThemes = [
    { value: 'gold', label: 'Gold & Ivory', colors: ['#D4AF37', '#FFFFF0'] },
    { value: 'rose', label: 'Rose & Blush', colors: ['#FF6B9D', '#FFF5F7'] },
    { value: 'navy', label: 'Navy & White', colors: ['#001F3F', '#FFFFFF'] },
    { value: 'emerald', label: 'Emerald & Cream', colors: ['#50C878', '#FFFDD0'] },
  ];

  const backgroundImages = [
    { value: 'floral', label: 'Floral Pattern' },
    { value: 'geometric', label: 'Geometric' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'minimal', label: 'Minimal White' },
  ];

  const handleSaveDraft = () => {
    // Save draft logic
    setShowSaveConfirmation(true);
    setTimeout(() => {
      setShowSaveConfirmation(false);
      navigate(`/customer/invitations/${eventId}`);
    }, 1500);
  };

  const handleFinalize = () => {
    // Finalize logic
    navigate(`/customer/invitations/${eventId}`);
  };

  const selectedTheme = colorThemes.find(t => t.value === invitationData.colorTheme);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/customer/invitations/${eventId}/templates`)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#16232A]">Customize Your Invitation</h1>
            <p className="text-gray-600">Edit content and design to match your event</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSaveDraft}
            variant="outline"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button
            onClick={() => setShowFinalizeModal(true)}
            className="bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Finalize Invitation
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'content'
                  ? 'bg-[#FF5B04] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Type className="h-4 w-4" />
              Content
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'design'
                  ? 'bg-[#FF5B04] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Palette className="h-4 w-4" />
              Design
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={invitationData.eventName}
                  onChange={(e) => setInvitationData({ ...invitationData, eventName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Name(s) *
                </label>
                <input
                  type="text"
                  value={invitationData.hostNames}
                  onChange={(e) => setInvitationData({ ...invitationData, hostNames: e.target.value })}
                  placeholder="e.g., Mr. & Mrs. Smith"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={invitationData.date}
                    onChange={(e) => setInvitationData({ ...invitationData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={invitationData.time}
                    onChange={(e) => setInvitationData({ ...invitationData, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue *
                </label>
                <textarea
                  value={invitationData.venue}
                  onChange={(e) => setInvitationData({ ...invitationData, venue: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message
                </label>
                <textarea
                  value={invitationData.customMessage}
                  onChange={(e) => setInvitationData({ ...invitationData, customMessage: e.target.value })}
                  rows={4}
                  placeholder="Add a personal message to your guests..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Design Tab */}
          {activeTab === 'design' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setInvitationData({ ...invitationData, font: font.value })}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        invitationData.font === font.value
                          ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-sm">{font.label}</p>
                      <p className="text-xs text-gray-500 mt-1">Sample text</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color Theme
                </label>
                <div className="space-y-3">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setInvitationData({ ...invitationData, colorTheme: theme.value })}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        invitationData.colorTheme === theme.value
                          ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-2">
                        {theme.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="h-10 w-10 rounded-lg border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-sm">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {backgroundImages.map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => setInvitationData({ ...invitationData, backgroundImage: bg.value })}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        invitationData.backgroundImage === bg.value
                          ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="font-medium text-sm">{bg.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#16232A]">Live Preview</h3>
              <span className="text-xs text-gray-500">Card View</span>
            </div>

            {/* Mock Invitation Preview */}
            <div 
              className="aspect-[3/4] rounded-lg border-2 border-gray-200 p-8 flex flex-col justify-between"
              style={{ 
                backgroundColor: selectedTheme?.colors[1],
                borderColor: selectedTheme?.colors[0]
              }}
            >
              <div className="text-center">
                <p className="text-xs mb-4 opacity-60">You're Invited</p>
                <h2 className="text-2xl font-bold mb-6" style={{ color: selectedTheme?.colors[0] }}>
                  {invitationData.eventName}
                </h2>
                <p className="text-sm mb-2">{invitationData.hostNames}</p>
              </div>

              <div className="text-center space-y-3">
                <div className="py-3 px-4 bg-white/50 rounded-lg">
                  <p className="text-xs opacity-60 mb-1">Date & Time</p>
                  <p className="font-medium">
                    {new Date(invitationData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm">{invitationData.time}</p>
                </div>

                <div className="py-3 px-4 bg-white/50 rounded-lg">
                  <p className="text-xs opacity-60 mb-1">Venue</p>
                  <p className="text-sm">{invitationData.venue}</p>
                </div>

                {invitationData.customMessage && (
                  <p className="text-sm italic pt-3 border-t border-current opacity-70">
                    "{invitationData.customMessage}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#16232A]">Invitation Preview</h3>
                  <p className="text-sm text-gray-600">Mobile & Card View</p>
                </div>
                <Button onClick={() => setShowPreview(false)} variant="outline">
                  Close
                </Button>
              </div>

              <div className="flex justify-center">
                <div 
                  className="w-80 aspect-[3/4] rounded-lg border-2 p-8 flex flex-col justify-between shadow-2xl"
                  style={{ 
                    backgroundColor: selectedTheme?.colors[1],
                    borderColor: selectedTheme?.colors[0]
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs mb-4 opacity-60">You're Invited</p>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: selectedTheme?.colors[0] }}>
                      {invitationData.eventName}
                    </h2>
                    <p className="text-sm mb-2">{invitationData.hostNames}</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="py-3 px-4 bg-white/50 rounded-lg">
                      <p className="text-xs opacity-60 mb-1">Date & Time</p>
                      <p className="font-medium">
                        {new Date(invitationData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm">{invitationData.time}</p>
                    </div>

                    <div className="py-3 px-4 bg-white/50 rounded-lg">
                      <p className="text-xs opacity-60 mb-1">Venue</p>
                      <p className="text-sm">{invitationData.venue}</p>
                    </div>

                    {invitationData.customMessage && (
                      <p className="text-sm italic pt-3 border-t border-current opacity-70">
                        "{invitationData.customMessage}"
                      </p>
                    )}
                  </div>
                </div>
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
                    Once finalized, design changes will be locked. You'll be able to send this invitation to your guests.
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
