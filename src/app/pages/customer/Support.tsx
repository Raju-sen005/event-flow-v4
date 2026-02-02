import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Send,
  X,
  AlertCircle,
  Loader2,
  HelpCircle,
  FileText,
  Book
} from 'lucide-react';

// Types
type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
type TicketCategory = 'billing' | 'technical' | 'vendor' | 'event' | 'general';

type Ticket = {
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  lastUpdate: string;
};

export const Support: React.FC = () => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '' as TicketCategory | '',
    priority: 'medium' as TicketPriority,
    description: '',
    email: ''
  });

  // Mock existing tickets
  const existingTickets: Ticket[] = [
    {
      id: 'TKT-1001',
      subject: 'Unable to finalize vendor payment',
      category: 'billing',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2026-02-01T10:00:00',
      lastUpdate: '2026-02-01T14:30:00'
    },
    {
      id: 'TKT-1002',
      subject: 'Question about guest invitation system',
      category: 'general',
      priority: 'low',
      status: 'resolved',
      createdAt: '2026-01-28T09:00:00',
      lastUpdate: '2026-01-28T15:00:00'
    }
  ];

  // Validate form
  const canSubmit = ticketForm.subject.trim() !== '' &&
                    ticketForm.category !== '' &&
                    ticketForm.description.trim() !== '' &&
                    ticketForm.email.trim() !== '';

  // Handle submit ticket
  const handleSubmitTicket = async () => {
    if (!canSubmit) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSuccess(true);
    setLoading(false);

    // Reset form after 2 seconds
    setTimeout(() => {
      setShowNewTicketModal(false);
      setSuccess(false);
      setTicketForm({
        subject: '',
        category: '' as TicketCategory | '',
        priority: 'medium',
        description: '',
        email: ''
      });
    }, 2000);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16232A] mb-2">Support Center</h1>
            <p className="text-[#16232A]/70">
              Get help with your events and account
            </p>
          </div>
          <Button
            onClick={() => setShowNewTicketModal(true)}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-[#16232A] mb-2">Email Support</h3>
          <p className="text-sm text-[#16232A]/70 mb-3">
            Get a response within 24 hours
          </p>
          <a
            href="mailto:support@eventmanager.com"
            className="text-[#FF5B04] hover:text-[#FF5B04]/90 text-sm font-medium"
          >
            support@eventmanager.com
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Phone className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-[#16232A] mb-2">Phone Support</h3>
          <p className="text-sm text-[#16232A]/70 mb-3">
            Mon-Fri, 9 AM - 6 PM EST
          </p>
          <a
            href="tel:+1234567890"
            className="text-[#FF5B04] hover:text-[#FF5B04]/90 text-sm font-medium"
          >
            +1 (234) 567-8900
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-[#16232A] mb-2">Live Chat</h3>
          <p className="text-sm text-[#16232A]/70 mb-3">
            Available during business hours
          </p>
          <button className="text-[#FF5B04] hover:text-[#FF5B04]/90 text-sm font-medium">
            Start Chat
          </button>
        </div>
      </div>

      {/* My Tickets */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-[#16232A]">My Tickets</h3>
        </div>

        {existingTickets.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {existingTickets.map((ticket) => (
              <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-[#16232A]/60">{ticket.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#16232A] mb-1">{ticket.subject}</h4>
                    <p className="text-sm text-[#16232A]/60">
                      Created: {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#16232A] mb-2">No tickets yet</h3>
            <p className="text-[#16232A]/60 mb-6">
              Create a ticket to get support from our team
            </p>
            <Button
              onClick={() => setShowNewTicketModal(true)}
              className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Create Your First Ticket
            </Button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-[#075056]" />
          <h3 className="font-semibold text-[#16232A]">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-[#16232A] mb-2">How do I add vendors to my event?</h4>
            <p className="text-sm text-[#16232A]/70">
              Browse vendors from the Vendors menu, then click "Add to Event" to select your event.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-[#16232A] mb-2">What payment methods are accepted?</h4>
            <p className="text-sm text-[#16232A]/70">
              We accept online payments via credit/debit cards and cash payments with vendor confirmation.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-[#16232A] mb-2">How do I send guest invitations?</h4>
            <p className="text-sm text-[#16232A]/70">
              Go to your event's Guests section, add guests, then use the Invitations tab to send via email or WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicketModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!success ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#16232A]">Create Support Ticket</h3>
                    <button
                      onClick={() => setShowNewTicketModal(false)}
                      className="text-[#16232A]/50 hover:text-[#16232A]"
                      disabled={loading}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Subject <span className="text-[#FF5B04]">*</span>
                      </label>
                      <input
                        type="text"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        disabled={loading}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Category <span className="text-[#FF5B04]">*</span>
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value as TicketCategory })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        disabled={loading}
                      >
                        <option value="">Select category</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="technical">Technical Issue</option>
                        <option value="vendor">Vendor Related</option>
                        <option value="event">Event Management</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Priority
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as TicketPriority })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        disabled={loading}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Email <span className="text-[#FF5B04]">*</span>
                      </label>
                      <input
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        disabled={loading}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-[#16232A] mb-2">
                        Description <span className="text-[#FF5B04]">*</span>
                      </label>
                      <textarea
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                        rows={5}
                        placeholder="Provide detailed information about your issue..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                        disabled={loading}
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                          You will receive a confirmation email at the provided address. Our support team will respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewTicketModal(false)}
                      className="flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitTicket}
                      disabled={!canSubmit || loading}
                      className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Ticket
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#16232A] mb-2">Ticket Created!</h3>
                  <p className="text-[#16232A]/70 mb-4">
                    Your support ticket has been submitted successfully.
                  </p>
                  <p className="text-sm text-[#16232A]/60">
                    Check your email for confirmation and updates.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
