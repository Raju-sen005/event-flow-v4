import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  MessageSquare,
  Award
} from 'lucide-react';

export const BidsList: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bids = [
    {
      id: 1,
      vendor: {
        name: 'Elite Photography Studio',
        rating: 4.9,
        reviews: 127,
        verified: true
      },
      amount: 8500,
      deliverables: ['8 hours coverage', '500+ edited photos', 'Online gallery', 'Print album'],
      proposedDate: '2 days ago',
      status: 'pending'
    },
    {
      id: 2,
      vendor: {
        name: 'Artisan Photo Works',
        rating: 4.7,
        reviews: 89,
        verified: true
      },
      amount: 7200,
      deliverables: ['6 hours coverage', '400+ edited photos', 'Online gallery'],
      proposedDate: '3 days ago',
      status: 'pending'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Requirement
        </button>
        <h1 className="text-3xl font-bold text-[#16232A]">Bids Received</h1>
        <p className="text-[#16232A]/70 mt-1">{bids.length} vendors have submitted their proposals</p>
      </div>

      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-[#16232A]">{bid.vendor.name}</h3>
                  {bid.vendor.verified && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#16232A]/60">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{bid.vendor.rating}</span>
                    <span>({bid.vendor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {bid.proposedDate}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-2xl font-bold text-[#FF5B04]">
                  <DollarSign className="h-6 w-6" />
                  {bid.amount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-[#16232A] mb-2">Deliverables:</h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {bid.deliverables.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#16232A]/70">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(`/customer/requirements/${id}/bids/${bid.id}`)}
              >
                View Details & Negotiate
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};