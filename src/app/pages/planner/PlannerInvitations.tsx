import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Plus, Mail, Users, CheckCircle, Clock, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerInvitations: React.FC = () => {
  const invitations = [
    {
      id: '1',
      event: 'Singh Family Wedding',
      totalInvites: 500,
      sent: 450,
      confirmed: 320,
      pending: 130,
      declined: 0,
      createdAt: '2025-01-15'
    },
    {
      id: '2',
      event: 'Tech Conference 2025',
      totalInvites: 300,
      sent: 300,
      confirmed: 180,
      pending: 100,
      declined: 20,
      createdAt: '2025-01-18'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#16232A] mb-2">Invitations</h1>
          <p className="text-[#16232A]/70">Create and manage event invitations</p>
        </div>
        <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Invitation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Send className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-blue-600">
                {invitations.reduce((sum, inv) => sum + inv.sent, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {invitations.reduce((sum, inv) => sum + inv.confirmed, 0)}
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
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {invitations.reduce((sum, inv) => sum + inv.pending, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {invitations.map((invitation, index) => (
          <motion.div
            key={invitation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#16232A] mb-1">{invitation.event}</h3>
                <p className="text-sm text-gray-600">
                  Created {new Date(invitation.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              <Link to={`/planner/invitations/${invitation.id}`}>
                <Button variant="outline" size="sm">Manage</Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Invites</p>
                <p className="text-lg font-bold text-[#075056]">{invitation.totalInvites}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Sent</p>
                <p className="text-lg font-bold text-blue-600">{invitation.sent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Confirmed</p>
                <p className="text-lg font-bold text-green-600">{invitation.confirmed}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-lg font-bold text-yellow-600">{invitation.pending}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Declined</p>
                <p className="text-lg font-bold text-red-600">{invitation.declined}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${(invitation.confirmed / invitation.totalInvites) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {((invitation.confirmed / invitation.totalInvites) * 100).toFixed(0)}% confirmed
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
