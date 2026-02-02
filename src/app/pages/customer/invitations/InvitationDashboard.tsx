import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  Plus, 
  Eye, 
  Send, 
  Edit2, 
  Calendar,
  Image as ImageIcon,
  FileText,
  Video,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface Invitation {
  id: string;
  name: string;
  type: 'template' | 'uploaded';
  format: 'image' | 'video' | 'card';
  status: 'draft' | 'ready' | 'sent';
  lastEdited: string;
  sentDate?: string;
  recipientCount?: number;
}

export const InvitationDashboard: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      name: 'Wedding Ceremony Invitation',
      type: 'template',
      format: 'card',
      status: 'ready',
      lastEdited: '2026-01-28',
    },
    {
      id: '2',
      name: 'Reception Video Invite',
      type: 'uploaded',
      format: 'video',
      status: 'sent',
      lastEdited: '2026-01-25',
      sentDate: '2026-01-26',
      recipientCount: 150,
    },
    {
      id: '3',
      name: 'Save the Date',
      type: 'template',
      format: 'image',
      status: 'draft',
      lastEdited: '2026-01-30',
    },
  ]);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Mock event name
  const eventName = "Sarah & John's Wedding";

  const getStatusBadge = (status: Invitation['status']) => {
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

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        <Icon className="h-3.5 w-3.5" />
        {status === 'draft' ? 'Draft' : status === 'ready' ? 'Ready to Send' : 'Sent'}
      </span>
    );
  };

  const getTypeIcon = (type: string, format: string) => {
    if (format === 'video') return Video;
    if (format === 'image') return ImageIcon;
    return FileText;
  };

  const handleSendClick = (invitation: Invitation) => {
    if (invitation.status !== 'ready') {
      setShowTooltip(invitation.id);
      setTimeout(() => setShowTooltip(null), 2000);
      return;
    }
    navigate(`/customer/invitations/${eventId}/${invitation.id}/send`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4" />
            <span>{eventName}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#16232A]">Invitations for This Event</h1>
          <p className="text-gray-600 mt-1">Create, manage, and send invitations to your guests</p>
        </div>
        <Button
          onClick={() => navigate(`/customer/invitations/${eventId}/create`)}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Invitation
        </Button>
      </div>

      {/* Invitations List */}
      {invitations.length === 0 ? (
        // Empty State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#16232A] mb-2">
              No invitations created yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first invitation using our templates or upload your own design
            </p>
            <Button
              onClick={() => navigate(`/customer/invitations/${eventId}/create`)}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Invitation
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((invitation, index) => {
            const TypeIcon = getTypeIcon(invitation.type, invitation.format);
            const canSend = invitation.status === 'ready';

            return (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Preview Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-[#FF5B04]/10 to-[#075056]/10 flex items-center justify-center">
                  <TypeIcon className="h-16 w-16 text-[#075056]/30" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#16232A] mb-2">{invitation.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {invitation.type === 'template' ? 'Template-based' : 'Uploaded'}
                      </span>
                      {getStatusBadge(invitation.status)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Last edited: {new Date(invitation.lastEdited).toLocaleDateString()}</p>
                    {invitation.status === 'sent' && invitation.sentDate && (
                      <p className="text-green-700">
                        Sent on {new Date(invitation.sentDate).toLocaleDateString()} • {invitation.recipientCount} guests
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Link
                      to={`/customer/invitations/${eventId}/${invitation.id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full text-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>

                    <div className="relative flex-1">
                      <Button
                        onClick={() => handleSendClick(invitation)}
                        disabled={!canSend}
                        className={`w-full text-sm ${
                          canSend
                            ? 'bg-[#075056] hover:bg-[#075056]/90 text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                      
                      {/* Tooltip for disabled state */}
                      {showTooltip === invitation.id && !canSend && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10"
                        >
                          {invitation.status === 'draft' 
                            ? 'Only finalized invitations can be sent' 
                            : 'Invitation already sent'}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
