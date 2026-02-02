import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Search, Filter, Download, Eye, CheckCircle, Clock, Ban, Star } from 'lucide-react';
import { ExportModal } from '../../components/admin/ExportModal';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  joinedDate: string;
  status: 'verified' | 'pending' | 'suspended';
  rating: number;
  completedJobs: number;
}

export const VendorsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending' | 'suspended'>('all');
  const [showExportModal, setShowExportModal] = useState(false);

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Royal Caterers',
      email: 'contact@royalcaterers.com',
      phone: '+91 98765 11111',
      service: 'Catering',
      joinedDate: '2023-11-10',
      status: 'verified',
      rating: 4.8,
      completedJobs: 45
    },
    {
      id: '2',
      name: 'Dream Venues',
      email: 'info@dreamvenues.com',
      phone: '+91 98765 22222',
      service: 'Venue',
      joinedDate: '2023-10-15',
      status: 'verified',
      rating: 4.9,
      completedJobs: 67
    },
    {
      id: '3',
      name: 'Elegant Decor',
      email: 'hello@elegantdecor.com',
      phone: '+91 98765 33333',
      service: 'Decoration',
      joinedDate: '2024-01-05',
      status: 'verified',
      rating: 4.7,
      completedJobs: 34
    },
    {
      id: '4',
      name: 'Melody Makers',
      email: 'contact@melodymakers.com',
      phone: '+91 98765 44444',
      service: 'Entertainment',
      joinedDate: '2024-02-20',
      status: 'pending',
      rating: 0,
      completedJobs: 0
    },
    {
      id: '5',
      name: 'Flash Photography',
      email: 'info@flashphoto.com',
      phone: '+91 98765 55555',
      service: 'Photography',
      joinedDate: '2023-09-12',
      status: 'suspended',
      rating: 4.2,
      completedJobs: 23
    },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vendor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vendors.length,
    verified: vendors.filter(v => v.status === 'verified').length,
    pending: vendors.filter(v => v.status === 'pending').length,
    suspended: vendors.filter(v => v.status === 'suspended').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Vendor Management</h1>
        <p className="text-gray-600">View and manage all registered vendors</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Vendors</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Verified Vendors</p>
          <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Pending Verification</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Suspended Vendors</p>
          <p className="text-3xl font-bold text-red-600">{stats.suspended}</p>
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
              placeholder="Search vendors..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Export */}
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowExportModal(true)}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Jobs Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">
                          {vendor.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">{vendor.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {vendor.service}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{vendor.email}</p>
                    <p className="text-sm text-gray-500">{vendor.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    {vendor.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{vendor.rating}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not rated</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {vendor.completedJobs}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {vendor.status === 'verified' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                    {vendor.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        <Clock className="h-3 w-3" />
                        Pending
                      </span>
                    )}
                    {vendor.status === 'suspended' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        <Ban className="h-3 w-3" />
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/vendors/${vendor.id}`)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVendors.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No vendors found</p>
          </div>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Vendors"
        availableFields={[
          { id: 'name', label: 'Vendor Name' },
          { id: 'service', label: 'Service Category' },
          { id: 'email', label: 'Email Address' },
          { id: 'phone', label: 'Phone Number' },
          { id: 'rating', label: 'Rating' },
          { id: 'completedJobs', label: 'Jobs Completed' },
          { id: 'status', label: 'Status' },
          { id: 'joinedDate', label: 'Joined Date' }
        ]}
        filterOptions={{
          statuses: ['Verified', 'Pending', 'Suspended'],
          categories: ['Catering', 'Venue', 'Decoration', 'Entertainment', 'Photography']
        }}
      />
    </div>
  );
};