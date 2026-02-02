import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Upload, FileText, Image as ImageIcon, Video, File, CheckCircle, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const Deliverables: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const deliverables = [
    {
      id: '1',
      eventId: 'evt-1',
      eventName: 'Sharma Wedding Reception',
      customer: 'Priya Sharma',
      fileName: 'Final_Menu_Card.pdf',
      type: 'document',
      uploadedAt: '2025-01-14T15:30:00',
      status: 'approved',
      fileSize: '2.4 MB',
      notes: 'Final menu card approved by customer'
    },
    {
      id: '2',
      eventId: 'evt-1',
      eventName: 'Sharma Wedding Reception',
      customer: 'Priya Sharma',
      fileName: 'Staff_Deployment_Plan.pdf',
      type: 'document',
      uploadedAt: '2025-01-11T10:15:00',
      status: 'approved',
      fileSize: '1.8 MB',
      notes: null
    },
    {
      id: '3',
      eventId: 'evt-2',
      eventName: 'Tech Corp Annual Gala',
      customer: 'Rahul Mehta',
      fileName: 'Shot_List.xlsx',
      type: 'document',
      uploadedAt: '2025-01-13T14:20:00',
      status: 'pending',
      fileSize: '856 KB',
      notes: 'Awaiting customer review'
    },
    {
      id: '4',
      eventId: 'evt-3',
      eventName: 'Birthday Celebration',
      customer: 'Anjali Verma',
      fileName: 'Theme_Mockup.jpg',
      type: 'image',
      uploadedAt: '2025-01-12T11:00:00',
      status: 'approved',
      fileSize: '3.2 MB',
      notes: 'Customer loved the mockup!'
    },
    {
      id: '5',
      eventId: 'evt-4',
      eventName: 'Corporate Retreat',
      customer: 'Sarah Khan',
      fileName: 'Event_Highlights.mp4',
      type: 'video',
      uploadedAt: '2025-01-03T16:45:00',
      status: 'approved',
      fileSize: '128 MB',
      notes: 'Final delivery completed'
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'document': return FileText;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-blue-600 bg-blue-50';
      case 'video': return 'text-purple-600 bg-purple-50';
      case 'document': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredDeliverables = filter === 'all'
    ? deliverables
    : deliverables.filter(d => d.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Deliverables</h1>
          <p className="text-[#16232A]/70">Track and manage all your event deliverables</p>
        </div>
        <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
          <Upload className="h-4 w-4" />
          Upload Deliverable
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">{deliverables.length}</p>
              <p className="text-sm text-[#16232A]/70">Total Uploads</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {deliverables.filter(d => d.status === 'approved').length}
              </p>
              <p className="text-sm text-[#16232A]/70">Approved</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#16232A]">
                {deliverables.filter(d => d.status === 'pending').length}
              </p>
              <p className="text-sm text-[#16232A]/70">Pending Review</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'approved', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-[#075056] text-white'
                  : 'bg-gray-50 text-[#16232A] hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-4">
        {filteredDeliverables.map((deliverable, index) => {
          const TypeIcon = getTypeIcon(deliverable.type);
          const typeColor = getTypeColor(deliverable.type);

          return (
            <motion.div
              key={deliverable.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-[#075056] hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${typeColor}`}>
                  <TypeIcon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#16232A] mb-1">{deliverable.fileName}</h3>
                      <p className="text-sm text-[#16232A]/70">{deliverable.eventName}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      deliverable.status === 'approved'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {deliverable.status === 'approved' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#16232A]/70 mb-3">
                    <span>Size: {deliverable.fileSize}</span>
                    <span>•</span>
                    <span>
                      Uploaded: {new Date(deliverable.uploadedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span>Customer: {deliverable.customer}</span>
                  </div>

                  {deliverable.notes && (
                    <div className={`p-3 rounded-lg mb-3 ${
                      deliverable.status === 'approved' ? 'bg-green-50' : 'bg-yellow-50'
                    }`}>
                      <p className="text-sm text-[#16232A]">{deliverable.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Link to={`/vendor/events/${deliverable.eventId}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Event
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
