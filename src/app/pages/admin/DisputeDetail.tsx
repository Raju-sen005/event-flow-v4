import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { ArrowLeft, AlertCircle, User, Briefcase, Calendar, MessageSquare, FileText, Send } from 'lucide-react';

export const DisputeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resolution, setResolution] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [showResolveModal, setShowResolveModal] = useState(false);

  const dispute = {
    id: id || '1',
    title: 'Service not delivered as promised',
    customer: { name: 'Priya Sharma', email: 'priya.sharma@email.com' },
    vendor: { name: 'Royal Caterers', email: 'contact@royalcaterers.com' },
    event: 'Wedding Reception',
    raisedDate: '2024-03-15',
    status: 'open' as 'open' | 'in-progress' | 'resolved',
    priority: 'high' as 'high' | 'medium' | 'low',
    category: 'Service Quality',
    description: 'The catering service did not meet the agreed standards. Food quality was subpar and several menu items were missing. The vendor was also late in setup which caused delays in our event schedule.',
    agreedAmount: '₹2,50,000',
    paidAmount: '₹1,50,000',
  };

  const chatHistory = [
    { from: 'customer', name: 'Priya Sharma', message: 'The food quality was not as promised in our agreement.', time: '2024-03-15 10:30 AM' },
    { from: 'vendor', name: 'Royal Caterers', message: 'We apologize for the inconvenience. There were some last-minute supply issues.', time: '2024-03-15 11:15 AM' },
    { from: 'customer', name: 'Priya Sharma', message: 'This is unacceptable. My guests were disappointed.', time: '2024-03-15 12:00 PM' },
    { from: 'vendor', name: 'Royal Caterers', message: 'We understand your concern and willing to discuss compensation.', time: '2024-03-15 02:30 PM' },
  ];

  const evidenceDocuments = [
    { name: 'Original Agreement.pdf', uploadedBy: 'System', date: '2024-03-15' },
    { name: 'Event Photos.zip', uploadedBy: 'Priya Sharma', date: '2024-03-15' },
    { name: 'Menu Card.pdf', uploadedBy: 'Royal Caterers', date: '2024-03-15' },
  ];

  const handleResolve = (action: string) => {
    // Logic to resolve dispute
    setShowResolveModal(false);
  };

  const handleSendNote = () => {
    // Logic to send admin note
    setAdminNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/disputes')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-gray-900">Dispute Resolution</h1>
            <p className="text-sm text-gray-600">Case #{dispute.id}</p>
          </div>
        </div>

        {dispute.status !== 'resolved' && (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setShowResolveModal(true)}
          >
            Resolve Dispute
          </Button>
        )}
      </div>

      {/* Dispute Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-gray-900">{dispute.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                dispute.priority === 'high' ? 'bg-red-100 text-red-700' :
                dispute.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {dispute.priority.toUpperCase()} Priority
              </span>
            </div>
            <p className="text-gray-600 mb-4">{dispute.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Event:</span>
                <span className="ml-2 font-semibold text-gray-900">{dispute.event}</span>
              </div>
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-semibold text-gray-900">{dispute.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Raised Date:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {new Date(dispute.raisedDate).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-semibold text-gray-900">{dispute.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Agreed Amount</p>
            <p className="text-2xl font-bold text-gray-900">{dispute.agreedAmount}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
            <p className="text-2xl font-bold text-gray-900">{dispute.paidAmount}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Parties Involved */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Parties Involved</h3>
          <div className="space-y-4">
            {/* Customer */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{dispute.customer.name}</p>
                  <p className="text-sm text-gray-600">Customer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{dispute.customer.email}</p>
            </div>

            {/* Vendor */}
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{dispute.vendor.name}</p>
                  <p className="text-sm text-gray-600">Vendor</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{dispute.vendor.email}</p>
            </div>
          </div>
        </div>

        {/* Evidence Documents */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Evidence & Documents</h3>
          <div className="space-y-3">
            {evidenceDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded by {doc.uploadedBy} on {new Date(doc.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Communication History</h3>
        <div className="space-y-4 mb-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              chat.from === 'customer' ? 'bg-blue-50' : 'bg-purple-50'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold text-gray-900">{chat.name}</span>
                  <span className="text-xs text-gray-500">({chat.from})</span>
                </div>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-gray-700">{chat.message}</p>
            </div>
          ))}
        </div>

        {/* Admin Note */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Send Message to Both Parties
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
            <Button onClick={handleSendNote} disabled={!adminNote.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Resolve Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-gray-900 mb-4">Resolve Dispute</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Resolution Decision
                </label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="Enter your resolution decision and reasoning..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Action
                </label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve('favor-customer')}
                  >
                    Resolve in Favor of Customer
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve('favor-vendor')}
                  >
                    Resolve in Favor of Vendor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve('mutual-settlement')}
                  >
                    Mutual Settlement
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleResolve('issue-warning')}
                  >
                    Issue Warning to Vendor
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowResolveModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!resolution.trim()}
                onClick={() => handleResolve('complete')}
              >
                Confirm Resolution
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};