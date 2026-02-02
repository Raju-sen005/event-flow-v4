import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  FileText, 
  Plus, 
  Eye, 
  Clock,
  Send,
  CheckCircle,
  Calendar,
  Building2
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

type AgreementStatus = 'draft' | 'sent' | 'accepted';

interface Agreement {
  id: string;
  title: string;
  vendorName: string;
  vendorId: string;
  status: AgreementStatus;
  lastUpdated: string;
  createdAt: string;
  sentAt?: string;
  acceptedAt?: string;
  fileUrl?: string;
}

export const EventAgreements: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Mock data
  const eventName = "Sarah & John's Wedding";
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: '1',
      title: 'Catering Service Agreement',
      vendorName: 'Gourmet Delights Catering',
      vendorId: 'v-001',
      status: 'accepted',
      lastUpdated: '2026-01-25',
      createdAt: '2026-01-20',
      sentAt: '2026-01-22',
      acceptedAt: '2026-01-25',
    },
    {
      id: '2',
      title: 'Photography Services Contract',
      vendorName: 'Picture Perfect Studios',
      vendorId: 'v-002',
      status: 'sent',
      lastUpdated: '2026-01-28',
      createdAt: '2026-01-26',
      sentAt: '2026-01-28',
    },
    {
      id: '3',
      title: 'Venue Rental Agreement',
      vendorName: 'Grand Ballroom Venues',
      vendorId: 'v-003',
      status: 'draft',
      lastUpdated: '2026-01-30',
      createdAt: '2026-01-30',
    },
  ]);

  const getStatusBadge = (status: AgreementStatus) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-300',
      sent: 'bg-blue-50 text-blue-700 border-blue-200',
      accepted: 'bg-green-50 text-green-700 border-green-200',
    };

    const icons = {
      draft: Clock,
      sent: Send,
      accepted: CheckCircle,
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        <Icon className="h-3.5 w-3.5" />
        {status === 'draft' ? 'Draft' : status === 'sent' ? 'Sent' : 'Accepted'}
      </span>
    );
  };

  const handleAddAgreement = () => {
    navigate(`/customer/events/${eventId}/agreements-new/add`);
  };

  const handleViewAgreement = (agreementId: string) => {
    navigate(`/customer/events/${eventId}/agreements/${agreementId}`);
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
          <h1 className="text-2xl font-bold text-[#16232A]">Agreements for This Event</h1>
          <p className="text-gray-600 mt-1">Manage vendor agreements and contracts</p>
        </div>
        <Button
          onClick={handleAddAgreement}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agreement
        </Button>
      </div>

      {/* Agreements List */}
      {agreements.length === 0 ? (
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
              No agreements added for this event
            </h3>
            <p className="text-gray-600 mb-6">
              Create agreements with your vendors to formalize your contracts
            </p>
            <Button
              onClick={handleAddAgreement}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Agreement
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {agreements.map((agreement, index) => (
            <motion.div
              key={agreement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-[#075056]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-[#075056]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#16232A] mb-1">
                            {agreement.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="h-4 w-4" />
                            <span>{agreement.vendorName}</span>
                          </div>
                        </div>
                        {getStatusBadge(agreement.status)}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span>Last updated: {new Date(agreement.lastUpdated).toLocaleDateString()}</span>
                        {agreement.sentAt && (
                          <span>• Sent: {new Date(agreement.sentAt).toLocaleDateString()}</span>
                        )}
                        {agreement.acceptedAt && (
                          <span className="text-green-700 font-medium">
                            • Accepted: {new Date(agreement.acceptedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewAgreement(agreement.id)}
                  variant="outline"
                  className="ml-4"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};