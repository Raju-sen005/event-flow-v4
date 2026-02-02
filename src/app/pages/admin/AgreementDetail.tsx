import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  User,
  Briefcase,
  CheckCircle,
  Clock,
  Download,
  Eye
} from 'lucide-react';

export const AgreementDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const agreement = {
    id: id || 'AGR-001',
    title: 'Wedding Catering Service Agreement',
    requirement: {
      id: 'REQ-1234',
      title: 'Wedding Catering Service'
    },
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210'
    },
    vendor: {
      id: 'VEN-001',
      name: 'Royal Caterers',
      email: 'contact@royalcaterers.com',
      phone: '+91 98765 11111'
    },
    bidAmount: '₹4,50,000',
    createdDate: '2024-03-15',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    status: 'Active',
    signedByCustomer: true,
    signedByVendor: true,
    customerSignDate: '2024-03-16',
    vendorSignDate: '2024-03-15',
    terms: [
      'The vendor will provide catering services as per the agreed menu and specifications.',
      'Payment will be made in three installments: 40% advance, 40% one week before event, and 20% after completion.',
      'The vendor must arrive at least 4 hours before the event start time for setup.',
      'Any changes to the menu must be communicated at least 7 days in advance.',
      'The vendor is responsible for food quality, hygiene, and professional service.',
      'Cancellation by customer: 50% refund if cancelled 30+ days before event, no refund if cancelled within 30 days.',
      'The vendor must have valid food safety certifications and insurance.',
      'Both parties agree to resolve disputes through mediation before legal action.'
    ],
    paymentSchedule: [
      {
        milestone: 'Advance Payment',
        amount: '₹1,80,000',
        percentage: '40%',
        dueDate: '2024-03-20',
        status: 'Paid',
        paidDate: '2024-03-18'
      },
      {
        milestone: 'Pre-Event Payment',
        amount: '₹1,80,000',
        percentage: '40%',
        dueDate: '2025-04-08',
        status: 'Pending',
        paidDate: null
      },
      {
        milestone: 'Final Payment',
        amount: '₹90,000',
        percentage: '20%',
        dueDate: '2025-04-16',
        status: 'Pending',
        paidDate: null
      }
    ],
    deliverables: [
      'Traditional Indian cuisine (5 varieties)',
      'Continental dishes (3 varieties)',
      'Welcome drinks and appetizers',
      'Live cooking counters',
      'Dessert bar with 4 varieties',
      'Professional serving staff (20 people)',
      'Table setup and decoration',
      'Premium crockery and cutlery'
    ],
    attachments: [
      { name: 'Signed Agreement.pdf', size: '850 KB', type: 'Agreement' },
      { name: 'Menu Card.pdf', size: '450 KB', type: 'Deliverable' },
      { name: 'Payment Receipt - Advance.pdf', size: '180 KB', type: 'Payment' }
    ],
    timeline: [
      { date: '2024-03-15', action: 'Agreement created', user: 'System' },
      { date: '2024-03-15', action: 'Signed by vendor', user: 'Royal Caterers' },
      { date: '2024-03-16', action: 'Signed by customer', user: 'Priya Sharma' },
      { date: '2024-03-18', action: 'Advance payment received', user: 'System' },
      { date: '2024-03-18', action: 'Agreement activated', user: 'System' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/agreements')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Agreements
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[#16232A]">{agreement.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                agreement.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : agreement.status === 'Completed'
                  ? 'bg-blue-100 text-blue-700'
                  : agreement.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {agreement.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Agreement ID: {agreement.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF5B04]/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Value</p>
              <p className="font-semibold text-gray-900">{agreement.bidAmount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Created On</p>
              <p className="font-semibold text-gray-900 text-sm">
                {new Date(agreement.createdDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Customer Signed</p>
              <p className="font-semibold text-gray-900 text-sm">
                {agreement.signedByCustomer ? 'Yes' : 'Pending'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Vendor Signed</p>
              <p className="font-semibold text-gray-900 text-sm">
                {agreement.signedByVendor ? 'Yes' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parties Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Parties Involved</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Customer</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{agreement.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{agreement.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{agreement.customer.phone}</p>
                  </div>
                  {agreement.signedByCustomer && (
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-xs text-gray-600">Signed On</p>
                      <p className="text-sm font-semibold text-green-700">
                        {new Date(agreement.customerSignDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Vendor */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Vendor</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{agreement.vendor.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{agreement.vendor.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{agreement.vendor.phone}</p>
                  </div>
                  {agreement.signedByVendor && (
                    <div className="pt-2 border-t border-purple-200">
                      <p className="text-xs text-gray-600">Signed On</p>
                      <p className="text-sm font-semibold text-green-700">
                        {new Date(agreement.vendorSignDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Terms & Conditions</h2>
            <ol className="space-y-3">
              {agreement.terms.map((term, index) => (
                <li key={index} className="flex gap-3 text-sm text-gray-700">
                  <span className="font-semibold text-gray-900 flex-shrink-0">{index + 1}.</span>
                  <span>{term}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Deliverables */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Deliverables</h2>
            <ul className="space-y-2">
              {agreement.deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Payment Schedule</h2>
            <div className="space-y-3">
              {agreement.paymentSchedule.map((payment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{payment.milestone}</h3>
                      <p className="text-xs text-gray-600">
                        Due Date: {new Date(payment.dueDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">{payment.percentage} of total</span>
                    <span className="text-lg font-bold text-[#FF5B04]">{payment.amount}</span>
                  </div>
                  {payment.paidDate && (
                    <p className="text-xs text-green-600 mt-2">
                      Paid on {new Date(payment.paidDate).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {agreement.attachments.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-[#16232A] mb-4">Attachments</h2>
              <div className="space-y-2">
                {agreement.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{file.size}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {file.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Related Records</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/admin/requirements/${agreement.requirement.id}`)}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Requirement
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/admin/vendors/${agreement.vendor.id}`)}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                View Vendor Profile
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/admin/users/${agreement.customer.name}`)}
              >
                <User className="h-4 w-4 mr-2" />
                View Customer Profile
              </Button>
            </div>
          </div>

          {/* Agreement Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Agreement Timeline</h2>
            <div className="space-y-4">
              {agreement.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-[#FF5B04]"></div>
                    {index < agreement.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      by {item.user} • {new Date(item.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Dates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-[#16232A] mb-4">Important Dates</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(agreement.startDate).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">End Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(agreement.endDate).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
