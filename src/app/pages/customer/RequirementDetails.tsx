import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  FileText,
  MessageSquare
} from 'lucide-react';

export const RequirementDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const requirement = {
    id: 1,
    title: 'Professional Wedding Photographer Needed',
    category: 'Photography',
    event: 'Sarah & John Wedding',
    status: 'open',
    description: 'Looking for an experienced wedding photographer with artistic style for our special day.',
    budget: { min: 5000, max: 10000 },
    eventDate: '2025-02-15',
    eventTime: '18:00',
    location: 'Grand Hotel Ballroom, New York',
    guestCount: 150,
    deadline: '2025-01-20',
    bidsReceived: 8,
    postedDate: '2025-01-10'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#16232A]/70 hover:text-[#16232A] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16232A]">{requirement.title}</h1>
            <p className="text-[#16232A]/70 mt-1">{requirement.category} • Posted {new Date(requirement.postedDate).toLocaleDateString()}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            {requirement.status.charAt(0).toUpperCase() + requirement.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-[#16232A] mb-4">Description</h2>
        <p className="text-[#16232A]/70 leading-relaxed">{requirement.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#FF5B04]" />
              <div>
                <p className="text-sm text-[#16232A]/60">Event Date</p>
                <p className="font-medium text-[#16232A]">{new Date(requirement.eventDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#FF5B04]" />
              <div>
                <p className="text-sm text-[#16232A]/60">Location</p>
                <p className="font-medium text-[#16232A]">{requirement.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-[#FF5B04]" />
              <div>
                <p className="text-sm text-[#16232A]/60">Budget Range</p>
                <p className="font-medium text-[#16232A]">
                  ${requirement.budget.min.toLocaleString()} - ${requirement.budget.max.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#FF5B04]" />
              <div>
                <p className="text-sm text-[#16232A]/60">Guest Count</p>
                <p className="font-medium text-[#16232A]">{requirement.guestCount} guests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#16232A] mb-4">Bidding Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-bold text-2xl text-[#16232A]">{requirement.bidsReceived}</p>
                <p className="text-sm text-[#16232A]/60">Bids Received</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
            <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
              <Clock className="h-4 w-4" />
              <span>Deadline: {new Date(requirement.deadline).toLocaleDateString()}</span>
            </div>
            <Link to={`/customer/requirements/${id}/bids`}>
              <Button className="w-full bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                View All Bids
              </Button>
            </Link>
            <Link to={`/customer/requirements/${id}/compare`}>
              <Button variant="outline" className="w-full">
                Compare Bids
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
