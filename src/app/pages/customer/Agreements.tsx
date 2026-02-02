import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  Download,
  Eye
} from 'lucide-react';

export const Agreements: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const agreements = [
    {
      id: 1,
      vendor: 'Elite Photography Studio',
      service: 'Wedding Photography',
      event: 'Sarah & John Wedding',
      amount: 8500,
      signedDate: '2025-01-15',
      status: 'signed',
      eventDate: '2025-02-15'
    },
    {
      id: 2,
      vendor: 'Gourmet Catering Co.',
      service: 'Catering Services',
      event: 'Sarah & John Wedding',
      amount: 12000,
      signedDate: null,
      status: 'pending',
      eventDate: '2025-02-15'
    },
    {
      id: 3,
      vendor: 'DJ Beats Entertainment',
      service: 'DJ & Music',
      event: 'Annual Corporate Gala',
      amount: 3500,
      signedDate: '2025-01-10',
      status: 'signed',
      eventDate: '2025-03-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAgreements = agreements.filter((agreement) => {
    const matchesSearch = agreement.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agreement.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agreement.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#16232A]">Agreements</h1>
        <p className="text-[#16232A]/70 mt-1">Manage vendor contracts and agreements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Total Agreements</p>
              <p className="text-3xl font-bold text-[#16232A]">{agreements.length}</p>
            </div>
            <FileText className="h-10 w-10 text-[#FF5B04]" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Signed</p>
              <p className="text-3xl font-bold text-[#16232A]">
                {agreements.filter(a => a.status === 'signed').length}
              </p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#16232A]/60 mb-1">Pending</p>
              <p className="text-3xl font-bold text-[#16232A]">
                {agreements.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agreements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="all">All Status</option>
            <option value="signed">Signed</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Agreements List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase">
                  Vendor & Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAgreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#16232A]">{agreement.vendor}</p>
                      <p className="text-sm text-[#16232A]/60">{agreement.service}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-[#16232A]">{agreement.event}</p>
                      <p className="text-xs text-[#16232A]/60">
                        {new Date(agreement.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#16232A]">
                      ${agreement.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agreement.status)}`}>
                      {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/customer/agreements/${agreement.id}`}>
                        <button className="p-2 text-[#FF5B04] hover:bg-[#FF5B04]/10 rounded-lg">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      {agreement.status === 'signed' && (
                        <button className="p-2 text-[#16232A] hover:bg-gray-100 rounded-lg">
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAgreements.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No agreements found</h3>
          <p className="text-[#16232A]/60">
            {searchQuery || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'Agreements will appear here once you award projects to vendors'}
          </p>
        </div>
      )}
    </div>
  );
};
