import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  Search,
  AlertTriangle,
  Info
} from 'lucide-react';

// Types
type Event = {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  status: string;
  managementMode: 'self-managed' | 'planner-managed';
};

type EventPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
  title: string;
  description?: string;
  filterMode?: 'self-managed' | 'planner-managed' | 'all';
  warningMessage?: string;
  allowMultiple?: boolean;
};

export const EventPickerModal: React.FC<EventPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  title,
  description,
  filterMode = 'all',
  warningMessage,
  allowMultiple = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  // Mock events data
  const allEvents: Event[] = [
    {
      id: '1',
      name: 'Sarah & John Wedding',
      category: 'Wedding',
      date: '2026-06-15',
      location: 'Grand Hotel Ballroom, New York',
      status: 'planning',
      managementMode: 'self-managed'
    },
    {
      id: '2',
      name: 'Corporate Annual Gala',
      category: 'Corporate Event',
      date: '2026-08-20',
      location: 'Convention Center, Boston',
      status: 'vendors-finalized',
      managementMode: 'planner-managed'
    },
    {
      id: '3',
      name: 'Birthday Celebration',
      category: 'Birthday',
      date: '2026-04-10',
      location: 'Private Villa, Miami',
      status: 'planning',
      managementMode: 'self-managed'
    }
  ];

  // Filter events based on management mode
  const filteredEvents = allEvents.filter(event => {
    const matchesMode = filterMode === 'all' || event.managementMode === filterMode;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMode && matchesSearch;
  });

  // Handle event selection
  const handleSelectEvent = (eventId: string) => {
    if (allowMultiple) {
      if (selectedEventIds.includes(eventId)) {
        setSelectedEventIds(selectedEventIds.filter(id => id !== eventId));
      } else {
        setSelectedEventIds([...selectedEventIds, eventId]);
      }
    } else {
      onSelectEvent(eventId);
      handleClose();
    }
  };

  // Handle confirm (for multiple selection)
  const handleConfirm = () => {
    if (selectedEventIds.length > 0) {
      onSelectEvent(selectedEventIds[0]); // For now, just pass first
      handleClose();
    }
  };

  // Handle close
  const handleClose = () => {
    setSearchQuery('');
    setSelectedEventIds([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#16232A]">{title}</h3>
          <button
            onClick={handleClose}
            className="text-[#16232A]/50 hover:text-[#16232A] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Description */}
        {description && (
          <p className="text-[#16232A]/70 mb-4">{description}</p>
        )}

        {/* Warning Message */}
        {warningMessage && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">{warningMessage}</p>
            </div>
          </div>
        )}

        {/* Filter Info */}
        {filterMode !== 'all' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                {filterMode === 'self-managed' 
                  ? 'Only showing self-managed events where you can add vendors directly'
                  : 'Only showing planner-managed events'}
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#16232A]/40" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isSelected = selectedEventIds.includes(event.id);
              
              return (
                <button
                  key={event.id}
                  onClick={() => handleSelectEvent(event.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#FF5B04] bg-orange-50'
                      : 'border-gray-200 hover:border-[#FF5B04]/50 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-[#16232A]">{event.name}</h4>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-[#FF5B04]" />
                        )}
                      </div>
                      <p className="text-sm text-[#16232A]/70 mb-2">{event.category}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-[#16232A]/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    {event.managementMode === 'planner-managed' && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                        Planner Managed
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-[#16232A] mb-2">No events found</h4>
              <p className="text-[#16232A]/60">
                {searchQuery 
                  ? 'Try adjusting your search'
                  : 'Create an event to get started'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          {allowMultiple && (
            <Button
              onClick={handleConfirm}
              disabled={selectedEventIds.length === 0}
              className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white disabled:opacity-50"
            >
              Select {selectedEventIds.length > 0 && `(${selectedEventIds.length})`}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
