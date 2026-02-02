import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Users, CheckCircle, XCircle, Clock, Calendar, MapPin } from 'lucide-react';

export const PlannerAttendance: React.FC = () => {
  const attendanceLogs = [
    {
      id: '1',
      event: 'Singh Family Wedding',
      vendor: 'Elite Photography Studio',
      category: 'Photography',
      date: '2025-02-14',
      markInTime: '09:45 AM',
      markOutTime: '11:30 PM',
      status: 'completed',
      location: 'Jaipur, Rajasthan'
    },
    {
      id: '2',
      event: 'Tech Conference 2025',
      vendor: 'Gourmet Catering Co.',
      category: 'Catering',
      date: '2025-03-10',
      markInTime: '08:00 AM',
      markOutTime: null,
      status: 'in-progress',
      location: 'Mumbai, Maharashtra'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Attendance Monitoring</h1>
        <p className="text-[#16232A]/70">Track vendor attendance across all events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceLogs.filter(a => a.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">
                {attendanceLogs.filter(a => a.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-[#075056]">{attendanceLogs.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {attendanceLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-[#16232A]">{log.vendor}</h3>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {log.category}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    log.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {log.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{log.event}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{log.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Mark In</p>
                  <p className="font-medium text-gray-900">{log.markInTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {log.markOutTime ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-600" />
                )}
                <div>
                  <p className="text-xs text-gray-500">Mark Out</p>
                  <p className="font-medium text-gray-900">{log.markOutTime || 'Pending'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
