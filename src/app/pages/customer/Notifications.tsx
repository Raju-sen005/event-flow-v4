import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Bell,
  CheckCircle,
  MessageSquare,
  FileText,
  Users,
  Calendar,
  Check,
  Trash2
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'bid',
      title: 'New Bid Received',
      message: 'Elite Photography Studio submitted a bid for your photography requirement',
      time: '2 hours ago',
      read: false,
      icon: FileText,
      color: 'text-[#FF5B04] bg-[#FF5B04]/10'
    },
    {
      id: 2,
      type: 'rsvp',
      title: 'RSVP Confirmation',
      message: '5 guests confirmed attendance for Sarah & John Wedding',
      time: '4 hours ago',
      read: false,
      icon: Users,
      color: 'text-green-500 bg-green-50'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Gourmet Catering Co. sent you a message about menu options',
      time: '5 hours ago',
      read: true,
      icon: MessageSquare,
      color: 'text-blue-500 bg-blue-50'
    },
    {
      id: 4,
      type: 'agreement',
      title: 'Agreement Signed',
      message: 'Your agreement with Elite Photography Studio has been signed',
      time: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-500 bg-green-50'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'Your event "Birthday Celebration" is coming up in 3 days',
      time: '1 day ago',
      read: true,
      icon: Calendar,
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    console.log('Marking all as read');
  };

  const deleteNotification = (id: number) => {
    console.log('Deleting notification:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#16232A]">Notifications</h1>
          <p className="text-[#16232A]/70 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white' : ''}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            className={filter === 'unread' ? 'bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white' : ''}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white text-[#FF5B04] rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl p-4 border transition-all ${
              !notification.read 
                ? 'border-[#FF5B04] shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                <notification.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[#16232A]">{notification.title}</h3>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-[#FF5B04] rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-[#16232A]/70 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#16232A]/50">{notification.time}</p>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No notifications</h3>
          <p className="text-[#16232A]/60">
            {filter === 'unread' 
              ? 'You\'re all caught up! No unread notifications.'
              : 'You don\'t have any notifications yet.'}
          </p>
        </div>
      )}
    </div>
  );
};
