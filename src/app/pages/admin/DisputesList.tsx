import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Search, Filter, AlertCircle, Clock, CheckCircle, Eye } from 'lucide-react';

interface Dispute {
  id: string;
  title: string;
  customer: string;
  vendor: string;
  event: string;
  raisedDate: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export const DisputesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const disputes: Dispute[] = [
    {
      id: '1',
      title: 'Service not delivered as promised',
      customer: 'Priya Sharma',
      vendor: 'Royal Caterers',
      event: 'Wedding Reception',
      raisedDate: '2024-03-15',
      status: 'open',
      priority: 'high',
      category: 'Service Quality'
    },
    {
      id: '2',
      title: 'Payment dispute',
      customer: 'Rahul Mehta',
      vendor: 'Dream Venues',
      event: 'Corporate Event',
      raisedDate: '2024-03-14',
      status: 'in-progress',
      priority: 'high',
      category: 'Payment'
    },
    {
      id: '3',
      title: 'Late delivery of equipment',
      customer: 'Ananya Gupta',
      vendor: 'Elegant Decor',
      event: 'Birthday Party',
      raisedDate: '2024-03-10',
      status: 'resolved',
      priority: 'medium',
      category: 'Delivery'
    },
    {
      id: '4',
      title: 'Quality of food not satisfactory',
      customer: 'Vikram Singh',
      vendor: 'Royal Caterers',
      event: 'Anniversary Celebration',
      raisedDate: '2024-03-08',
      status: 'open',
      priority: 'medium',
      category: 'Service Quality'
    },
    {
      id: '5',
      title: 'Photographer didn\'t show up',
      customer: 'Neha Patel',
      vendor: 'Flash Photography',
      event: 'Engagement Ceremony',
      raisedDate: '2024-03-05',
      status: 'in-progress',
      priority: 'high',
      category: 'No Show'
    },
  ];

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dispute.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dispute.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dispute.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || dispute.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    inProgress: disputes.filter(d => d.status === 'in-progress').length,
    resolved: disputes.filter(d => d.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Dispute Management</h1>
        <p className="text-gray-600">Resolve conflicts between customers and vendors</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Disputes</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Open Disputes</p>
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

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>

          {/* Status Filter */}
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

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute) => (
          <div
            key={dispute.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/admin/disputes/${dispute.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    dispute.priority === 'high' ? 'bg-red-100' :
                    dispute.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertCircle className={`h-5 w-5 ${
                      dispute.priority === 'high' ? 'text-red-600' :
                      dispute.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold mb-1">{dispute.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Event: <span className="font-semibold">{dispute.event}</span></span>
                      <span>•</span>
                      <span>Category: {dispute.category}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-semibold text-gray-900">{dispute.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Vendor:</span>
                    <span className="font-semibold text-gray-900">{dispute.vendor}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Raised on {new Date(dispute.raisedDate).toLocaleDateString('en-IN')}</span>
                  <span>•</span>
                  <span className={`font-semibold ${
                    dispute.priority === 'high' ? 'text-red-600' :
                    dispute.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {dispute.priority.toUpperCase()} Priority
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 ml-6">
                {dispute.status === 'open' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                    <AlertCircle className="h-3 w-3" />
                    Open
                  </span>
                )}
                {dispute.status === 'in-progress' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    <Clock className="h-3 w-3" />
                    In Progress
                  </span>
                )}
                {dispute.status === 'resolved' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <CheckCircle className="h-3 w-3" />
                    Resolved
                  </span>
                )}

                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDisputes.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No disputes found</p>
        </div>
      )}
    </div>
  );
};