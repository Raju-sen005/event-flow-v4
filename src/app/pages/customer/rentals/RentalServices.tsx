import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Package, Calendar, Plus, Search } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
  location: string;
}

export const RentalServices: React.FC = () => {
  const navigate = useNavigate();
  const [showEventPicker, setShowEventPicker] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock events data
  const events: Event[] = [
    {
      id: 'evt-001',
      name: "Sarah & John's Wedding",
      date: '2026-06-15',
      type: 'Wedding',
      location: 'Grand Ballroom, Mumbai',
    },
    {
      id: 'evt-002',
      name: 'Priya Birthday Bash',
      date: '2026-02-20',
      type: 'Birthday',
      location: 'Sunset Gardens, Delhi',
    },
    {
      id: 'evt-003',
      name: 'Corporate Annual Gala',
      date: '2026-04-10',
      type: 'Corporate',
      location: 'Hilton Conference Hall, Bangalore',
    },
    {
      id: 'evt-004',
      name: 'Tech Conference 2026',
      date: '2026-05-20',
      type: 'Conference',
      location: 'Convention Center, Pune',
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEvent = (eventId: string) => {
    navigate(`/customer/events/${eventId}/rentals`);
  };

  const handleCreateEvent = () => {
    navigate('/customer/events/create');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#16232A]">Rental Services</h1>
          <p className="text-gray-600 mt-1">
            Browse and rent items for your events
          </p>
        </div>
      </div>

      {/* Event Picker Modal */}
      <AnimatePresence>
        {showEventPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 bg-[#FF5B04]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Package className="h-7 w-7 text-[#FF5B04]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#16232A] mb-2">
                      Select an Event
                    </h2>
                    <p className="text-gray-600">
                      Please select an event to view rental items
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Events List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">No events found</p>
                    </div>
                  ) : (
                    filteredEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => handleSelectEvent(event.id)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#FF5B04] hover:bg-[#FF5B04]/5 transition-all text-left group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 bg-[#075056]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5B04]/20 transition-colors">
                            <Calendar className="h-6 w-6 text-[#075056] group-hover:text-[#FF5B04] transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#16232A] mb-1">
                              {event.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                              <span>•</span>
                              <span>{event.type}</span>
                              <span>•</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Don't have an event yet?
                  </p>
                  <Button
                    onClick={handleCreateEvent}
                    className="bg-[#075056] hover:bg-[#075056]/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
