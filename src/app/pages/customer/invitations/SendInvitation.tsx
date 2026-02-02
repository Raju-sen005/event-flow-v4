import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Users, 
  Send, 
  CheckCircle, 
  Mail, 
  MessageSquare,
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
}

type Step = 'recipients' | 'channel' | 'preview' | 'confirm';
type RecipientSelection = 'all' | 'selected';
type Channel = 'whatsapp' | 'email';

export const SendInvitation: React.FC = () => {
  const { eventId, invitationId } = useParams<{ eventId: string; invitationId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('recipients');
  const [recipientSelection, setRecipientSelection] = useState<RecipientSelection>('all');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [message, setMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock data
  const invitationName = 'Wedding Ceremony Invitation';
  const eventName = "Sarah & John's Wedding";

  const guests: Guest[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', category: 'Family' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', category: 'Friends' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', category: 'Colleagues' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', phone: '+1234567893', category: 'Family' },
    { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1234567894', category: 'Friends' },
  ];

  const defaultMessages = {
    whatsapp: `You're invited to ${eventName}! 🎉\n\nPlease find your invitation attached. Looking forward to celebrating with you!`,
    email: `Dear Guest,\n\nYou are cordially invited to ${eventName}.\n\nPlease find your invitation attached to this email.\n\nWe look forward to your presence.\n\nBest regards`,
  };

  const handleGuestToggle = (guestId: string) => {
    setSelectedGuests((prev) =>
      prev.includes(guestId)
        ? prev.filter((id) => id !== guestId)
        : [...prev, guestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedGuests.length === guests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(guests.map((g) => g.id));
    }
  };

  const handleStepContinue = () => {
    if (currentStep === 'recipients') {
      if (recipientSelection === 'all') {
        setSelectedGuests(guests.map((g) => g.id));
      }
      if (recipientSelection === 'all' || selectedGuests.length > 0) {
        setCurrentStep('channel');
      }
    } else if (currentStep === 'channel') {
      if (channel) {
        setMessage(defaultMessages[channel]);
        setCurrentStep('preview');
      }
    } else if (currentStep === 'preview') {
      setShowConfirmModal(true);
    }
  };

  const handleSend = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    navigate(`/customer/invitations/${eventId}`);
  };

  const canContinue = () => {
    if (currentStep === 'recipients') {
      return recipientSelection === 'all' || selectedGuests.length > 0;
    }
    if (currentStep === 'channel') {
      return channel !== null;
    }
    return true;
  };

  const recipientCount = recipientSelection === 'all' ? guests.length : selectedGuests.length;

  const steps = [
    { id: 'recipients', label: 'Select Recipients', icon: Users },
    { id: 'channel', label: 'Choose Channel', icon: MessageSquare },
    { id: 'preview', label: 'Review & Send', icon: Send },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/customer/invitations/${eventId}/${invitationId}`)}
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#16232A]">Send Invitation</h1>
          <p className="text-gray-600">{invitationName}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-[#FF5B04] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isActive ? 'text-[#16232A]' : isCompleted ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500">Step {index + 1}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                    <div
                      className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Recipients */}
          {currentStep === 'recipients' && (
            <motion.div
              key="recipients"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-2">Select Recipients</h2>
                <p className="text-gray-600">Choose who will receive this invitation</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setRecipientSelection('all')}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    recipientSelection === 'all'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          recipientSelection === 'all' ? 'bg-[#FF5B04] text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A]">All Guests</p>
                        <p className="text-sm text-gray-600">Send to all {guests.length} guests</p>
                      </div>
                    </div>
                    {recipientSelection === 'all' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setRecipientSelection('selected')}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    recipientSelection === 'selected'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          recipientSelection === 'selected' ? 'bg-[#FF5B04] text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#16232A]">Selected Guests</p>
                        <p className="text-sm text-gray-600">Choose specific guests</p>
                      </div>
                    </div>
                    {recipientSelection === 'selected' && (
                      <CheckCircle className="h-6 w-6 text-[#FF5B04]" />
                    )}
                  </div>
                </button>
              </div>

              {recipientSelection === 'selected' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      {selectedGuests.length} of {guests.length} selected
                    </p>
                    <Button onClick={handleSelectAll} variant="outline" size="sm">
                      {selectedGuests.length === guests.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {guests.map((guest) => (
                      <label
                        key={guest.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedGuests.includes(guest.id)}
                          onChange={() => handleGuestToggle(guest.id)}
                          className="h-4 w-4 text-[#FF5B04] border-gray-300 rounded focus:ring-[#FF5B04]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#16232A]">{guest.name}</p>
                          <p className="text-sm text-gray-600">{guest.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {guest.category}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Channel */}
          {currentStep === 'channel' && (
            <motion.div
              key="channel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-2">Choose Channel</h2>
                <p className="text-gray-600">Select how you want to send the invitation</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setChannel('whatsapp')}
                  className={`p-6 border-2 rounded-xl text-left transition-all ${
                    channel === 'whatsapp'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        channel === 'whatsapp' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'
                      }`}
                    >
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    {channel === 'whatsapp' && <CheckCircle className="h-6 w-6 text-[#FF5B04]" />}
                  </div>
                  <h3 className="font-semibold text-[#16232A] mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-600">
                    Send invitation directly via WhatsApp to guests' phone numbers
                  </p>
                </button>

                <button
                  onClick={() => setChannel('email')}
                  className={`p-6 border-2 rounded-xl text-left transition-all ${
                    channel === 'email'
                      ? 'border-[#FF5B04] bg-[#FF5B04]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        channel === 'email' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <Mail className="h-6 w-6" />
                    </div>
                    {channel === 'email' && <CheckCircle className="h-6 w-6 text-[#FF5B04]" />}
                  </div>
                  <h3 className="font-semibold text-[#16232A] mb-2">Email</h3>
                  <p className="text-sm text-gray-600">
                    Send formal invitation via email with attachment
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {currentStep === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-[#16232A] mb-2">Review & Send</h2>
                <p className="text-gray-600">Review your message and invitation details</p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Recipients</p>
                    <p className="font-semibold text-[#16232A]">{recipientCount} guests</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Channel</p>
                    <p className="font-semibold text-[#16232A] capitalize">{channel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Invitation</p>
                    <p className="font-semibold text-[#16232A]">{invitationName}</p>
                  </div>
                </div>
              </div>

              {/* Message Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Preview
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This message will be sent along with your invitation
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={() => {
              if (currentStep === 'recipients') {
                navigate(`/customer/invitations/${eventId}/${invitationId}`);
              } else if (currentStep === 'channel') {
                setCurrentStep('recipients');
              } else if (currentStep === 'preview') {
                setCurrentStep('channel');
              }
            }}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleStepContinue}
            disabled={!canContinue()}
            className={`${
              canContinue()
                ? 'bg-[#075056] hover:bg-[#075056]/90 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === 'preview' ? (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
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
                <div className="h-12 w-12 bg-[#FF5B04]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="h-6 w-6 text-[#FF5B04]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#16232A] mb-2">
                    Send Invitation Now?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This invitation will be sent to {recipientCount} selected {recipientCount === 1 ? 'guest' : 'guests'} via {channel}.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="text-gray-700">
                      <strong>Invitation:</strong> {invitationName}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <strong>Recipients:</strong> {recipientCount} {recipientCount === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={() => setShowConfirmModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
              </div>
            </motion.div>
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
              className="bg-white rounded-2xl max-w-md w-full p-6 text-center"
            >
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#16232A] mb-2">
                Invitation Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your invitation has been sent to {recipientCount} {recipientCount === 1 ? 'guest' : 'guests'} via {channel}.
              </p>
              <Button
                onClick={handleSuccessClose}
                className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white"
              >
                Back to Invitations
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
