import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Plus, MessageSquare, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tickets = [
    {
      id: '1',
      ticketNumber: 'TKT-2025-PLN-001',
      subject: 'Payment processing issue',
      category: 'payment_issue',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2025-01-20T10:00:00',
      messages: 3
    },
    {
      id: '2',
      ticketNumber: 'TKT-2025-PLN-002',
      subject: 'Unable to add new event',
      category: 'technical_issue',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2025-01-18T09:00:00',
      messages: 5
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Support & Helpdesk</h1>
          <p className="text-[#16232A]/70">Get help with your questions and issues</p>
        </div>
        <Link to="/planner/support/create">
          <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-[#075056]">{tickets.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm font-semibold text-[#075056]">
                    {ticket.ticketNumber}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {ticket.status === 'resolved' ? 'Resolved' :
                     ticket.status === 'in_progress' ? 'In Progress' : 'Open'}
                  </span>
                  {ticket.priority === 'high' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      HIGH PRIORITY
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#16232A] mb-1">{ticket.subject}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{ticket.messages} messages</span>
                </div>
              </div>
              <Link to={`/planner/support/${ticket.id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
