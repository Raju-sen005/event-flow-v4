import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Search, Filter, Eye, Calendar, DollarSign, Download } from 'lucide-react';
import { ExportModal } from '../../components/admin/ExportModal';

export const RequirementsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const requirements = [
    {
      id: '1',
      title: 'Wedding Catering Service',
      customer: 'Priya Sharma',
      event: 'Wedding Reception',
      service: 'Catering',
      budget: '₹5,00,000',
      postedDate: '2024-03-10',
      bids: 12,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Photography & Videography',
      customer: 'Rahul Mehta',
      event: 'Corporate Event',
      service: 'Photography',
      budget: '₹2,50,000',
      postedDate: '2024-03-12',
      bids: 8,
      status: 'Active'
    },
    {
      id: '3',
      title: 'Event Decoration',
      customer: 'Ananya Gupta',
      event: 'Birthday Party',
      service: 'Decoration',
      budget: '₹1,50,000',
      postedDate: '2024-03-08',
      bids: 15,
      status: 'Closed'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Requirements & Events</h1>
        <p className="text-gray-600">Monitor platform requirements and event quality</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Requirements</p>
          <p className="text-3xl font-bold text-gray-900">{requirements.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Active Requirements</p>
          <p className="text-3xl font-bold text-blue-600">
            {requirements.filter(r => r.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Bids</p>
          <p className="text-3xl font-bold text-purple-600">
            {requirements.reduce((sum, r) => sum + r.bids, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={() => setShowExportModal(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {requirements.map((req) => (
          <div key={req.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-gray-900 font-semibold mb-2">{req.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div className="text-sm text-gray-600">
                    Customer: <span className="font-semibold text-gray-900">{req.customer}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Event: <span className="font-semibold text-gray-900">{req.event}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    Budget: <span className="font-semibold text-gray-900">{req.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Posted: {new Date(req.postedDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {req.service}
                  </span>
                  <span className="text-sm text-gray-600">{req.bids} bids received</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/admin/requirements/${req.id}`)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Requirements"
        availableFields={[
          { id: 'title', label: 'Requirement Title' },
          { id: 'customer', label: 'Customer Name' },
          { id: 'event', label: 'Event Type' },
          { id: 'service', label: 'Service Category' },
          { id: 'budget', label: 'Budget' },
          { id: 'bids', label: 'Number of Bids' },
          { id: 'status', label: 'Status' },
          { id: 'postedDate', label: 'Posted Date' }
        ]}
        filterOptions={{
          statuses: ['Active', 'Closed', 'Awarded'],
          categories: ['Catering', 'Photography', 'Decoration', 'Venue', 'Entertainment']
        }}
      />
    </div>
  );
};