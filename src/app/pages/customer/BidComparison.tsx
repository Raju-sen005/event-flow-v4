import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Star, Award } from 'lucide-react';

export const BidComparison: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bids = [
    {
      id: 1,
      vendor: 'Elite Photography Studio',
      rating: 4.9,
      amount: 8500,
      coverage: '8 hours',
      photos: '500+',
      album: true,
      video: false,
      delivery: '2 weeks'
    },
    {
      id: 2,
      vendor: 'Artisan Photo Works',
      rating: 4.7,
      amount: 7200,
      coverage: '6 hours',
      photos: '400+',
      album: false,
      video: true,
      delivery: '3 weeks'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bids
        </button>
        <h1 className="text-3xl font-bold text-[#16232A]">Compare Bids</h1>
        <p className="text-[#16232A]/70 mt-1">Side-by-side comparison of vendor proposals</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#16232A]">Feature</th>
              {bids.map((bid) => (
                <th key={bid.id} className="px-6 py-4 text-center">
                  <div className="font-bold text-[#16232A]">{bid.vendor}</div>
                  <div className="flex items-center justify-center gap-1 text-sm text-[#16232A]/60 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {bid.rating}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Price</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center">
                  <span className="text-2xl font-bold text-[#FF5B04]">${bid.amount.toLocaleString()}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Coverage</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center text-[#16232A]/70">{bid.coverage}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Photos</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center text-[#16232A]/70">{bid.photos}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Print Album</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center">
                  {bid.album ? (
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="h-6 w-6 text-gray-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Video Highlights</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center">
                  {bid.video ? (
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="h-6 w-6 text-gray-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#16232A]">Delivery Time</td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center text-[#16232A]/70">{bid.delivery}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4"></td>
              {bids.map((bid) => (
                <td key={bid.id} className="px-6 py-4 text-center">
                  <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                    <Award className="h-4 w-4 mr-2" />
                    Select
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
