import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Download,
  FileText,
  CheckCircle,
  Calendar,
  DollarSign,
  Edit3
} from 'lucide-react';

export const AgreementViewer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSignModal, setShowSignModal] = useState(false);

  const agreement = {
    id: 1,
    vendor: 'Elite Photography Studio',
    service: 'Wedding Photography',
    event: 'Sarah & John Wedding',
    amount: 8500,
    signedDate: '2025-01-15',
    status: 'signed',
    eventDate: '2025-02-15',
    terms: [
      '8 hours of professional photography coverage',
      '500+ professionally edited high-resolution photos',
      'Online gallery for viewing and downloading',
      'Printed album with 50 selected photos',
      'Full copyright and usage rights',
      '50% deposit due upon signing',
      'Remaining balance due 7 days before event',
      'Cancellation policy: 30 days notice required'
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Agreements
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16232A]">Agreement Details</h1>
            <p className="text-[#16232A]/70 mt-1">{agreement.vendor} • {agreement.service}</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold text-[#16232A]">Agreement Signed</h3>
            <p className="text-sm text-[#16232A]/70">
              Signed on {new Date(agreement.signedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Agreement Content */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <FileText className="h-16 w-16 text-[#FF5B04] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#16232A] mb-2">Service Agreement</h2>
          <p className="text-[#16232A]/70">Between Customer and {agreement.vendor}</p>
        </div>

        {/* Agreement Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-[#16232A]/60">Service</label>
            <p className="font-semibold text-[#16232A]">{agreement.service}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#16232A]/60">Event</label>
            <p className="font-semibold text-[#16232A]">{agreement.event}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#16232A]/60">Event Date</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#FF5B04]" />
              <p className="font-semibold text-[#16232A]">
                {new Date(agreement.eventDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#16232A]/60">Total Amount</label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#FF5B04]" />
              <p className="font-semibold text-[#16232A]">
                ${agreement.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#16232A] mb-4">Terms & Conditions</h3>
          <div className="space-y-3">
            {agreement.terms.map((term, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-[#16232A]/70">{term}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          <div>
            <label className="text-sm font-medium text-[#16232A]/60 mb-2 block">Customer Signature</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="text-2xl font-bold text-[#FF5B04] mb-1">John Doe</div>
              <p className="text-sm text-[#16232A]/60">Signed on {new Date(agreement.signedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#16232A]/60 mb-2 block">Vendor Signature</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="text-2xl font-bold text-[#FF5B04] mb-1">{agreement.vendor}</div>
              <p className="text-sm text-[#16232A]/60">Signed on {new Date(agreement.signedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Print Agreement
        </Button>
      </div>
    </div>
  );
};
