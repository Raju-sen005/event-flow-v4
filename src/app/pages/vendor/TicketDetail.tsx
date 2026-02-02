import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  Paperclip,
  User,
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Ticket, TicketStatus } from '../../types/ticket';

export const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyMessage, setReplyMessage] = useState('');

  // Mock ticket data
  const ticket: Ticket = {
    id: id || 'ticket-1',
    ticketNumber: 'TKT-2025-001',
    vendorId: 'vendor-1',
    vendorName: 'Elite Photography Studio',
    vendorEmail: 'contact@elitephoto.com',
    category: 'payment_issue',
    subject: 'Payment not received for invoice INV-2025-001',
    description: 'I have completed the event and submitted the invoice 10 days ago, but payment has not been received yet. The event was completed successfully on Jan 10, 2025.',
    priority: 'high',
    status: 'in_progress',
    relatedType: 'invoice',
    relatedId: 'inv-001',
    relatedReference: 'INV-2025-001',
    attachments: ['invoice_INV-2025-001.pdf'],
    messages: [
      {
        id: 'msg-1',
        ticketId: 'ticket-1',
        senderId: 'vendor-1',
        senderName: 'Elite Photography Studio',
        senderRole: 'vendor',
        message: 'I have completed the event and submitted the invoice 10 days ago, but payment has not been received yet. The event was completed successfully on Jan 10, 2025.',
        attachments: ['invoice_INV-2025-001.pdf'],
        createdAt: '2025-01-20T10:00:00'
      },
      {
        id: 'msg-2',
        ticketId: 'ticket-1',
        senderId: 'admin-1',
        senderName: 'Support Team',
        senderRole: 'admin',
        message: 'Thank you for reaching out. We have reviewed your invoice and confirmed that the event was completed successfully. We are processing the payment and it should be credited to your account within 2 business days.',
        createdAt: '2025-01-20T14:30:00'
      },
      {
        id: 'msg-3',
        ticketId: 'ticket-1',
        senderId: 'vendor-1',
        senderName: 'Elite Photography Studio',
        senderRole: 'vendor',
        message: 'Thank you for the update. Looking forward to receiving the payment.',
        createdAt: '2025-01-20T15:00:00'
      }
    ],
    assignedToId: 'admin-1',
    assignedToName: 'John Admin',
    createdAt: '2025-01-20T10:00:00',
    updatedAt: '2025-01-20T15:00:00',
    lastResponseBy: 'vendor',
    lastResponseAt: '2025-01-20T15:00:00'
  };

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

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    
    // Here you would send the reply to backend
    alert('Reply sent successfully!');
    setReplyMessage('');
  };

  const statusConfig = getStatusConfig(ticket.status);
  const StatusIcon = statusConfig.icon;
  const canReply = ticket.status !== 'resolved' && ticket.status !== 'closed';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/vendor/support')}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Support
        </Button>
      </div>

      {/* Ticket Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-lg font-bold text-[#075056]">
                {ticket.ticketNumber}
              </span>
              <span className={`px-3 py-1 ${statusConfig.color} text-sm font-medium rounded flex items-center gap-1`}>
                <StatusIcon className="h-4 w-4" />
                {statusConfig.label}
              </span>
              {ticket.priority === 'high' || ticket.priority === 'urgent' ? (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                  {ticket.priority === 'urgent' ? 'URGENT' : 'HIGH PRIORITY'}
                </span>
              ) : null}
            </div>
            <h1 className="text-2xl font-bold text-[#16232A] mb-2">{ticket.subject}</h1>
            <p className="text-gray-700">{ticket.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-600 mb-1">Category</p>
            <p className="text-sm font-semibold text-[#16232A] capitalize">
              {ticket.category.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Created</p>
            <p className="text-sm font-semibold text-[#16232A]">
              {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Last Updated</p>
            <p className="text-sm font-semibold text-[#16232A]">
              {new Date(ticket.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          {ticket.relatedReference && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Reference</p>
              <p className="text-sm font-semibold text-[#075056]">{ticket.relatedReference}</p>
            </div>
          )}
        </div>

        {ticket.assignedToName && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Assigned to <strong>{ticket.assignedToName}</strong>
            </span>
          </div>
        )}
      </motion.div>

      {/* Conversation Thread */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#16232A] mb-4">Conversation</h2>
        
        <div className="space-y-4">
          {ticket.messages.map((message, index) => {
            const isVendor = message.senderRole === 'vendor';
            
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isVendor ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isVendor ? 'bg-[#075056]' : 'bg-[#FF5B04]'
                }`}>
                  <span className="text-white font-semibold text-sm">
                    {message.senderName.charAt(0)}
                  </span>
                </div>
                
                <div className={`flex-1 ${isVendor ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {!isVendor && <span className="font-semibold text-sm text-[#16232A]">{message.senderName}</span>}
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                    {isVendor && <span className="font-semibold text-sm text-[#16232A]">You</span>}
                  </div>
                  
                  <div className={`inline-block p-4 rounded-lg ${
                    isVendor 
                      ? 'bg-[#075056] text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-2 rounded ${
                              isVendor ? 'bg-white/10' : 'bg-white'
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-xs flex-1">{file}</span>
                            <Download className="h-4 w-4 cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reply Section */}
      {canReply ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Reply</h2>
          
          <div className="space-y-4">
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
            
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#075056]">
                <Paperclip className="h-4 w-4" />
                Attach files
              </button>
              
              <Button
                onClick={handleSendReply}
                disabled={!replyMessage.trim()}
                className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2"
              >
                <Send className="h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center"
        >
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            This ticket is {ticket.status === 'resolved' ? 'resolved' : 'closed'}
          </h3>
          <p className="text-gray-600">
            You cannot add more replies to this ticket. If you need further assistance, please create a new ticket.
          </p>
        </motion.div>
      )}
    </div>
  );
};
