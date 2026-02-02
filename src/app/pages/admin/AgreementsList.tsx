import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Search, Filter, Eye, Download, FileSignature, CheckCircle, Clock } from 'lucide-react';
import { ExportModal } from '../../components/admin/ExportModal';

export const AgreementsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const agreements = [
    {
      id: '1',
      title: 'Catering Service Agreement',
      customer: 'Priya Sharma',
      vendor: 'Royal Caterers',
      amount: '₹4,75,000',
      createdDate: '2024-03-12',
      signedDate: '2024-03-13',
      status: 'Signed'
    },
    {
      id: '2',
      title: 'Venue Rental Agreement',
      customer: 'Rahul Mehta',
      vendor: 'Dream Venues',
      amount: '₹8,50,000',
      createdDate: '2024-03-14',
      signedDate: null,
      status: 'Pending'
    },
    {
      id: '3',
      title: 'Decoration Service Agreement',
      customer: 'Ananya Gupta',
      vendor: 'Elegant Decor',
      amount: '₹1,25,000',
      createdDate: '2024-03-10',
      signedDate: '2024-03-11',
      status: 'Signed'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Agreements & Compliance</h1>
        <p className="text-gray-600">Monitor legal agreements and maintain audit trail</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Agreements</p>
          <p className="text-3xl font-bold text-gray-900">{agreements.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Signed Agreements</p>
          <p className="text-3xl font-bold text-green-600">
            {agreements.filter(a => a.status === 'Signed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Pending Signature</p>
          <p className="text-3xl font-bold text-yellow-600">
            {agreements.filter(a => a.status === 'Pending').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-4">
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Agreement</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {agreements.map((agreement) => (
              <tr key={agreement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">{agreement.title}</p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(agreement.createdDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{agreement.customer}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{agreement.vendor}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-[#FF5B04]">{agreement.amount}</span>
                </td>
                <td className="px-6 py-4">
                  {agreement.status === 'Signed' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <CheckCircle className="h-3 w-3" />
                      Signed
                    </span>
                  )}
                  {agreement.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Agreements"
        availableFields={[
          { id: 'title', label: 'Agreement Title' },
          { id: 'customer', label: 'Customer Name' },
          { id: 'vendor', label: 'Vendor Name' },
          { id: 'amount', label: 'Agreement Value' },
          { id: 'createdDate', label: 'Created Date' },
          { id: 'signedDate', label: 'Signed Date' },
          { id: 'status', label: 'Status' }
        ]}
        filterOptions={{
          statuses: ['Signed', 'Pending', 'Expired', 'Terminated'],
          categories: ['Catering', 'Venue', 'Decoration', 'Photography', 'Entertainment']
        }}
      />
    </div>
  );
};
