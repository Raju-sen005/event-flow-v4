import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Search, Filter, Headphones, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const SupportTickets: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

  const tickets = [
    {
      id: '1',
      title: 'Unable to upload documents',
      customer: 'Priya Sharma',
      category: 'Technical',
      priority: 'high',
      status: 'open',
      createdDate: '2024-03-15',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'Payment gateway error',
      customer: 'Rahul Mehta',
      category: 'Payment',
      priority: 'high',
      status: 'in-progress',
      createdDate: '2024-03-14',
      lastUpdated: '5 hours ago'
    },
    {
      id: '3',
      title: 'How to verify my account?',
      customer: 'Ananya Gupta',
      category: 'Account',
      priority: 'medium',
      status: 'resolved',
      createdDate: '2024-03-12',
      lastUpdated: '2 days ago'
    },
    {
      id: '4',
      title: 'Cannot find vendor in search',
      customer: 'Vikram Singh',
      category: 'Technical',
      priority: 'low',
      status: 'open',
      createdDate: '2024-03-10',
      lastUpdated: '4 days ago'
    },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Support & Helpdesk</h1>
        <p className="text-gray-600">Manage customer support requests and tickets</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
          <p className="text-3xl font-bold text-red-600">{stats.open}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Resolved</p>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    ticket.priority === 'high' ? 'bg-red-100' :
                    ticket.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Headphones className={`h-5 w-5 ${
                      ticket.priority === 'high' ? 'text-red-600' :
                      ticket.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold mb-1">{ticket.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Customer: <span className="font-semibold">{ticket.customer}</span></span>
                      <span>•</span>
                      <span>Category: {ticket.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Created {new Date(ticket.createdDate).toLocaleDateString('en-IN')}</span>
                  <span>•</span>
                  <span>Last updated: {ticket.lastUpdated}</span>
                  <span>•</span>
                  <span className={`font-semibold ${
                    ticket.priority === 'high' ? 'text-red-600' :
                    ticket.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {ticket.priority.toUpperCase()} Priority
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 ml-6">
                {ticket.status === 'open' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                    <AlertCircle className="h-3 w-3" />
                    Open
                  </span>
                )}
                {ticket.status === 'in-progress' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    <Clock className="h-3 w-3" />
                    In Progress
                  </span>
                )}
                {ticket.status === 'resolved' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <CheckCircle className="h-3 w-3" />
                    Resolved
                  </span>
                )}

                <Button variant="outline" size="sm">
                  View Ticket
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No tickets found</p>
        </div>
      )}
    </div>
  );
};