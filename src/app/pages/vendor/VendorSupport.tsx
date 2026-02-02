import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Ticket, TicketStatus } from '../../types/ticket';
import { CreateTicketModal } from '../../components/vendor/CreateTicketModal';

export const VendorSupport: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tickets data
  const tickets: Ticket[] = [
    {
      id: 'ticket-1',
      ticketNumber: 'TKT-2025-001',
      vendorId: 'vendor-1',
      vendorName: 'Elite Photography Studio',
      vendorEmail: 'contact@elitephoto.com',
      category: 'payment_issue',
      subject: 'Payment not received for invoice INV-2025-001',
      description: 'I have completed the event and submitted the invoice 10 days ago, but payment has not been received yet.',
      priority: 'high',
      status: 'in_progress',
      relatedType: 'invoice',
      relatedId: 'inv-001',
      relatedReference: 'INV-2025-001',
      messages: [
        {
          id: 'msg-1',
          ticketId: 'ticket-1',
          senderId: 'vendor-1',
          senderName: 'Elite Photography Studio',
          senderRole: 'vendor',
          message: 'I have completed the event and submitted the invoice 10 days ago, but payment has not been received yet.',
          createdAt: '2025-01-20T10:00:00'
        },
        {
          id: 'msg-2',
          ticketId: 'ticket-1',
          senderId: 'admin-1',
          senderName: 'Support Team',
          senderRole: 'admin',
          message: 'Thank you for reaching out. We are reviewing your invoice and will process the payment within 2 business days.',
          createdAt: '2025-01-20T14:30:00'
        }
      ],
      assignedToId: 'admin-1',
      assignedToName: 'John Admin',
      createdAt: '2025-01-20T10:00:00',
      updatedAt: '2025-01-20T14:30:00',
      lastResponseBy: 'admin',
      lastResponseAt: '2025-01-20T14:30:00'
    },
    {
      id: 'ticket-2',
      ticketNumber: 'TKT-2025-002',
      vendorId: 'vendor-1',
      vendorName: 'Elite Photography Studio',
      vendorEmail: 'contact@elitephoto.com',
      category: 'technical_issue',
      subject: 'Unable to upload portfolio images',
      description: 'Getting an error when trying to upload images to my portfolio section.',
      priority: 'medium',
      status: 'resolved',
      messages: [
        {
          id: 'msg-3',
          ticketId: 'ticket-2',
          senderId: 'vendor-1',
          senderName: 'Elite Photography Studio',
          senderRole: 'vendor',
          message: 'Getting an error when trying to upload images to my portfolio section.',
          createdAt: '2025-01-18T09:00:00'
        },
        {
          id: 'msg-4',
          ticketId: 'ticket-2',
          senderId: 'admin-2',
          senderName: 'Tech Support',
          senderRole: 'admin',
          message: 'The issue has been fixed. Please try uploading again.',
          createdAt: '2025-01-18T11:00:00'
        }
      ],
      createdAt: '2025-01-18T09:00:00',
      updatedAt: '2025-01-18T11:00:00',
      resolvedAt: '2025-01-18T11:00:00',
      lastResponseBy: 'admin',
      lastResponseAt: '2025-01-18T11:00:00'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusConfig = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return {
          label: 'Open',
          color: 'bg-blue-100 text-blue-700',
          icon: AlertCircle
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock
        };
      case 'waiting_for_vendor':
        return {
          label: 'Waiting for You',
          color: 'bg-orange-100 text-orange-700',
          icon: AlertTriangle
        };
      case 'resolved':
        return {
          label: 'Resolved',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        };
      case 'closed':
        return {
          label: 'Closed',
          color: 'bg-gray-100 text-gray-700',
          icon: XCircle
        };
    }
  };

  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress' || t.status === 'waiting_for_vendor').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Support & Helpdesk</h1>
          <p className="text-[#16232A]/70">Get help with your issues and questions</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#075056] hover:bg-[#075056]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-[#075056]">{tickets.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-yellow-600">{openTickets}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by number or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as TicketStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting_for_vendor">Waiting for You</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tickets Found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first support ticket to get help'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#075056] hover:bg-[#075056]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            )}
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const statusConfig = getStatusConfig(ticket.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-[#075056]">
                        {ticket.ticketNumber}
                      </span>
                      <span className={`px-2 py-1 ${statusConfig.color} text-xs font-medium rounded flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                      {ticket.priority === 'high' || ticket.priority === 'urgent' ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          {ticket.priority === 'urgent' ? 'URGENT' : 'HIGH PRIORITY'}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="text-lg font-bold text-[#16232A] mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{ticket.messages.length} messages</span>
                    </div>
                    {ticket.relatedReference && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {ticket.relatedReference}
                      </span>
                    )}
                  </div>
                  <Link to={`/vendor/support/${ticket.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <CreateTicketModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
