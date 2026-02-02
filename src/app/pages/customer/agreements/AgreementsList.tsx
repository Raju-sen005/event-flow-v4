import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FileText, 
  Plus, 
  Eye, 
  Clock,
  Send,
  CheckCircle,
  Calendar,
  Building2,
  Search,
  Filter,
  Lock,
  Copy
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type AgreementStatus = 'draft' | 'sent' | 'accepted';
type AgreementScope = 'event' | 'template';

interface Agreement {
  id: string;
  title: string;
  scope: AgreementScope;
  status: AgreementStatus;
  eventName?: string;
  eventId?: string;
  vendorName?: string;
  vendorId?: string;
  lastUpdated: string;
  createdAt: string;
  sentAt?: string;
  acceptedAt?: string;
}

export const AgreementsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<AgreementScope | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AgreementStatus | 'all'>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');

  // Mock data
  const agreements: Agreement[] = [
    {
      id: '1',
      title: 'Catering Service Agreement',
      scope: 'event',
      status: 'accepted',
      eventName: "Sarah & John's Wedding",
      eventId: 'evt-001',
      vendorName: 'Gourmet Delights Catering',
      vendorId: 'v-001',
      lastUpdated: '2026-01-25',
      createdAt: '2026-01-20',
      sentAt: '2026-01-22',
      acceptedAt: '2026-01-25',
    },
    {
      id: '2',
      title: 'Photography Services Contract',
      scope: 'event',
      status: 'sent',
      eventName: "Sarah & John's Wedding",
      eventId: 'evt-001',
      vendorName: 'Picture Perfect Studios',
      vendorId: 'v-002',
      lastUpdated: '2026-01-28',
      createdAt: '2026-01-26',
      sentAt: '2026-01-28',
    },
    {
      id: '3',
      title: 'Standard Vendor Services Agreement',
      scope: 'template',
      status: 'draft',
      lastUpdated: '2026-01-30',
      createdAt: '2026-01-30',
    },
    {
      id: '4',
      title: 'Venue Rental Agreement',
      scope: 'event',
      status: 'draft',
      eventName: 'Priya Birthday Bash',
      eventId: 'evt-002',
      vendorName: 'Grand Ballroom Venues',
      vendorId: 'v-003',
      lastUpdated: '2026-01-29',
      createdAt: '2026-01-29',
    },
    {
      id: '5',
      title: 'Decoration Services Template',
      scope: 'template',
      status: 'draft',
      lastUpdated: '2026-01-27',
      createdAt: '2026-01-27',
    },
  ];

  // Get unique events for filter
  const events = Array.from(
    new Set(
      agreements
        .filter((a) => a.eventName)
        .map((a) => JSON.stringify({ id: a.eventId, name: a.eventName }))
    )
  ).map((str) => JSON.parse(str));

  // Filter agreements
  const filteredAgreements = agreements.filter((agreement) => {
    const matchesSearch =
      agreement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agreement.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (agreement.eventName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesScope = scopeFilter === 'all' || agreement.scope === scopeFilter;
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || agreement.eventId === eventFilter;

    return matchesSearch && matchesScope && matchesStatus && matchesEvent;
  });

  // Group by scope
  const eventAgreements = filteredAgreements.filter((a) => a.scope === 'event');
  const templateAgreements = filteredAgreements.filter((a) => a.scope === 'template');

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

  const getScopeLabel = (scope: AgreementScope) => {
    if (scope === 'template') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          <Copy className="h-3.5 w-3.5" />
          Template
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
        <Lock className="h-3.5 w-3.5" />
          Event-Specific
      </span>
    );
  };

  const handleAddAgreement = () => {
    navigate('/customer/agreements-new/add');
  };

  const handleViewAgreement = (agreement: Agreement) => {
    if (agreement.scope === 'event' && agreement.eventId) {
      navigate(`/customer/events/${agreement.eventId}/agreements/${agreement.id}`);
    } else {
      navigate(`/customer/agreements/${agreement.id}`);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setScopeFilter('all');
    setStatusFilter('all');
    setEventFilter('all');
  };

  const hasActiveFilters = searchQuery || scopeFilter !== 'all' || statusFilter !== 'all' || eventFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#16232A]">Agreements</h1>
          <p className="text-gray-600 mt-1">Manage all your agreements and templates</p>
        </div>
        <Button
          onClick={handleAddAgreement}
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agreement
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-[#16232A]">{agreements.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-xl font-bold text-[#16232A]">
                {agreements.filter((a) => a.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sent</p>
              <p className="text-xl font-bold text-[#16232A]">
                {agreements.filter((a) => a.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accepted</p>
              <p className="text-xl font-bold text-[#16232A]">
                {agreements.filter((a) => a.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agreements..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
            />
          </div>

          <select
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value as AgreementScope | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent bg-white"
          >
            <option value="all">All Scopes</option>
            <option value="event">Event-Specific</option>
            <option value="template">Templates</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AgreementStatus | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
          </select>

          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent bg-white"
          >
            <option value="all">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredAgreements.length} agreement{filteredAgreements.length !== 1 ? 's' : ''} found
            </p>
            <Button onClick={handleResetFilters} variant="outline" size="sm">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Agreements Groups */}
      {filteredAgreements.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#16232A] mb-2">
            {hasActiveFilters ? 'No agreements match your filters' : 'No agreements created yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your filters to find what you\'re looking for'
              : 'Create your first agreement to get started'}
          </p>
          {hasActiveFilters ? (
            <Button onClick={handleResetFilters} variant="outline">
              Reset Filters
            </Button>
          ) : (
            <Button onClick={handleAddAgreement} className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Agreement
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Event-Specific Agreements */}
          {eventAgreements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-[#16232A] mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Event-Specific Agreements
              </h2>
              <div className="space-y-3">
                {eventAgreements.map((agreement, index) => (
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
                            <div className="flex items-start gap-2 mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-[#16232A] mb-1">
                                  {agreement.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                  {agreement.eventName && (
                                    <span className="flex items-center gap-1 text-gray-600">
                                      <Calendar className="h-4 w-4" />
                                      {agreement.eventName}
                                    </span>
                                  )}
                                  {agreement.vendorName && (
                                    <>
                                      <span className="text-gray-400">•</span>
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <Building2 className="h-4 w-4" />
                                        {agreement.vendorName}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getScopeLabel(agreement.scope)}
                                {getStatusBadge(agreement.status)}
                              </div>
                            </div>

                            <div className="text-sm text-gray-600 mt-3">
                              Last updated: {new Date(agreement.lastUpdated).toLocaleDateString()}
                              {agreement.acceptedAt && (
                                <span className="ml-2 text-green-700 font-medium">
                                  • Accepted: {new Date(agreement.acceptedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleViewAgreement(agreement)}
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
            </div>
          )}

          {/* Template Agreements */}
          {templateAgreements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-[#16232A] mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5 text-purple-600" />
                Reusable Templates
              </h2>
              <div className="space-y-3">
                {templateAgreements.map((agreement, index) => (
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
                          <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Copy className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-[#16232A] mb-1">
                                  {agreement.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Can be reused across multiple events
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getScopeLabel(agreement.scope)}
                                {getStatusBadge(agreement.status)}
                              </div>
                            </div>

                            <div className="text-sm text-gray-600 mt-3">
                              Created: {new Date(agreement.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleViewAgreement(agreement)}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};