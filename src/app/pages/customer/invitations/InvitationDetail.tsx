import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Edit2, Send, Calendar, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface InvitationDetail {
  id: string;
  name: string;
  type: 'template' | 'uploaded';
  format: 'image' | 'video' | 'card';
  status: 'draft' | 'ready' | 'sent';
  lastEdited: string;
  sentDate?: string;
  recipientCount?: number;
  eventName: string;
  content?: {
    eventName: string;
    hostNames: string;
    date: string;
    time: string;
    venue: string;
    customMessage: string;
    colorTheme: string;
  };
}

export const InvitationDetail: React.FC = () => {
  const { eventId, invitationId } = useParams<{ eventId: string; invitationId: string }>();
  const navigate = useNavigate();
  const [showDisabledTooltip, setShowDisabledTooltip] = useState(false);

  // Mock invitation data
  const invitation: InvitationDetail = {
    id: invitationId || '1',
    name: 'Wedding Ceremony Invitation',
    type: 'template',
    format: 'card',
    status: 'ready',
    lastEdited: '2026-01-28',
    eventName: "Sarah & John's Wedding",
    content: {
      eventName: "Sarah & John's Wedding",
      hostNames: 'Mr. & Mrs. Smith',
      date: '2026-06-15',
      time: '16:00',
      venue: 'Grand Hotel Ballroom, 123 Main Street',
      customMessage: 'Join us as we celebrate our special day',
      colorTheme: 'gold',
    },
  };

  const canEdit = invitation.status !== 'sent';
  const canSend = invitation.status === 'ready';

  const handleEditClick = () => {
    if (!canEdit) {
      setShowDisabledTooltip(true);
      setTimeout(() => setShowDisabledTooltip(false), 2000);
      return;
    }

    if (invitation.type === 'template') {
      navigate(`/customer/invitations/${eventId}/templates/${invitation.id}/edit`);
    } else {
      navigate(`/customer/invitations/${eventId}/${invitation.id}/edit`);
    }
  };

  const handleSendClick = () => {
    if (!canSend) {
      return;
    }
    navigate(`/customer/invitations/${eventId}/${invitation.id}/send`);
  };

  const getStatusBadge = () => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-300',
      ready: 'bg-green-50 text-green-700 border-green-200',
      sent: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    const icons = {
      draft: Clock,
      ready: CheckCircle,
      sent: CheckCircle,
    };

    const Icon = icons[invitation.status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${styles[invitation.status]}`}>
        <Icon className="h-4 w-4" />
        {invitation.status === 'draft' ? 'Draft' : invitation.status === 'ready' ? 'Ready to Send' : 'Sent'}
      </span>
    );
  };

  const colorThemes = {
    gold: { colors: ['#D4AF37', '#FFFFF0'] },
    rose: { colors: ['#FF6B9D', '#FFF5F7'] },
    navy: { colors: ['#001F3F', '#FFFFFF'] },
    emerald: { colors: ['#50C878', '#FFFDD0'] },
  };

  const theme = colorThemes[invitation.content?.colorTheme as keyof typeof colorThemes] || colorThemes.gold;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/customer/invitations/${eventId}`)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Calendar className="h-4 w-4" />
              <span>{invitation.eventName}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#16232A]">{invitation.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={handleEditClick}
              variant="outline"
              disabled={!canEdit}
              className={!canEdit ? 'cursor-not-allowed opacity-50' : ''}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Invitation
            </Button>

            <AnimatePresence>
              {showDisabledTooltip && !canEdit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
                >
                  Sent invitations cannot be edited
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={handleSendClick}
            disabled={!canSend}
            className={`${
              canSend
                ? 'bg-[#075056] hover:bg-[#075056]/90 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invitation
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Details Panel */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Status</h3>
            <div className="space-y-4">
              <div>
                {getStatusBadge()}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Last Edited</p>
                    <p className="font-medium text-[#16232A]">
                      {new Date(invitation.lastEdited).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {invitation.status === 'sent' && invitation.sentDate && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">Sent On</p>
                      <p className="font-medium text-[#16232A]">
                        {new Date(invitation.sentDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {invitation.recipientCount} guests received
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Type</p>
                <p className="font-medium text-[#16232A] capitalize">
                  {invitation.type === 'template' ? 'Template-based' : 'Uploaded'}
                </p>
              </div>

              <div>
                <p className="text-gray-600 mb-1">Format</p>
                <p className="font-medium text-[#16232A] capitalize">
                  {invitation.format}
                </p>
              </div>

              <div>
                <p className="text-gray-600 mb-1">Linked Event</p>
                <p className="font-medium text-[#16232A]">
                  {invitation.eventName}
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          {invitation.status === 'draft' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">
                    Draft Status
                  </p>
                  <p className="text-xs text-amber-700">
                    This invitation needs to be finalized before it can be sent to guests.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {invitation.status === 'sent' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Invitation Sent
                  </p>
                  <p className="text-xs text-blue-700">
                    This invitation has been sent to your guests and cannot be edited.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-6">Invitation Preview</h3>

            <div className="flex justify-center">
              {invitation.type === 'template' && invitation.content ? (
                <div 
                  className="w-full max-w-md aspect-[3/4] rounded-lg border-2 p-8 flex flex-col justify-between shadow-xl"
                  style={{ 
                    backgroundColor: theme.colors[1],
                    borderColor: theme.colors[0]
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs mb-4 opacity-60">You're Invited</p>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors[0] }}>
                      {invitation.content.eventName}
                    </h2>
                    <p className="text-sm mb-2">{invitation.content.hostNames}</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="py-3 px-4 bg-white/50 rounded-lg">
                      <p className="text-xs opacity-60 mb-1">Date & Time</p>
                      <p className="font-medium">
                        {new Date(invitation.content.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm">{invitation.content.time}</p>
                    </div>

                    <div className="py-3 px-4 bg-white/50 rounded-lg">
                      <p className="text-xs opacity-60 mb-1">Venue</p>
                      <p className="text-sm">{invitation.content.venue}</p>
                    </div>

                    {invitation.content.customMessage && (
                      <p className="text-sm italic pt-3 border-t border-current opacity-70">
                        "{invitation.content.customMessage}"
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md aspect-[3/4] rounded-lg border-2 border-gray-200 bg-gradient-to-br from-[#FF5B04]/10 to-[#075056]/10 flex items-center justify-center shadow-xl">
                  <div className="text-center p-8">
                    <FileText className="h-16 w-16 text-[#075056]/30 mx-auto mb-4" />
                    <p className="text-sm font-medium text-gray-700">Uploaded Invitation</p>
                    <p className="text-xs text-gray-500 mt-1">{invitation.format.toUpperCase()} file</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
