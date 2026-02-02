import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Save, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const VendorAvailability: React.FC = () => {
  const [blockedDates, setBlockedDates] = useState(['2025-01-15', '2025-01-20', '2025-01-22']);

  const bookedDates = [
    { date: '2025-01-15', event: 'Sharma Wedding Reception', status: 'confirmed' },
    { date: '2025-01-20', event: 'Tech Corp Annual Gala', status: 'confirmed' },
    { date: '2025-01-22', event: 'Birthday Celebration', status: 'confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Availability Calendar</h1>
        <p className="text-[#16232A]/70">Manage your availability and prevent double bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#16232A]">January 2025</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-[#16232A]/70 p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const dateStr = `2025-01-${day.toString().padStart(2, '0')}`;
                const isBooked = bookedDates.some(d => d.date === dateStr);
                const isBlocked = blockedDates.includes(dateStr);

                return (
                  <button
                    key={day}
                    className={`aspect-square p-2 rounded-lg text-sm font-medium transition-colors ${
                      isBooked
                        ? 'bg-[#075056] text-white'
                        : isBlocked
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-[#16232A] hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#075056] rounded" />
              <span className="text-[#16232A]/70">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-red-50 border border-red-200 rounded" />
              <span className="text-[#16232A]/70">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-50 border border-gray-200 rounded" />
              <span className="text-[#16232A]/70">Available</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {bookedDates.map((booking) => (
                <div key={booking.date} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-[#16232A]">
                      {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-sm text-[#16232A]/70">{booking.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-[#16232A] mb-4">Working Hours</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-[#16232A]/70 mb-2">Service Radius</label>
                <input
                  type="text"
                  defaultValue="50 km from Mumbai"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-[#16232A]/70 mb-2">Default Hours</label>
                <input
                  type="text"
                  defaultValue="9:00 AM - 11:00 PM"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
