import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  MessageSquare,
  Search,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

export const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      vendor: 'Elite Photography Studio',
      lastMessage: 'We can definitely accommodate that request!',
      timestamp: '2 hours ago',
      unread: 2,
      status: 'online',
      avatar: 'EP'
    },
    {
      id: 2,
      vendor: 'Gourmet Catering Co.',
      lastMessage: 'Here are the menu options you requested',
      timestamp: '5 hours ago',
      unread: 0,
      status: 'offline',
      avatar: 'GC'
    },
    {
      id: 3,
      vendor: 'Floral Dreams Design',
      lastMessage: 'The flower arrangements will be ready',
      timestamp: '1 day ago',
      unread: 1,
      status: 'online',
      avatar: 'FD'
    },
    {
      id: 4,
      vendor: 'DJ Beats Entertainment',
      lastMessage: 'Sure, I can play those songs!',
      timestamp: '2 days ago',
      unread: 0,
      status: 'offline',
      avatar: 'DJ'
    }
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#16232A]">Messages</h1>
        <p className="text-[#16232A]/70 mt-1">Chat with your vendors</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
        {filteredConversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/customer/messages/${conversation.id}`}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <div className="h-12 w-12 bg-[#FF5B04] rounded-full flex items-center justify-center">
                <span className="font-semibold text-white">{conversation.avatar}</span>
              </div>
              {conversation.status === 'online' && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[#16232A] truncate">{conversation.vendor}</h3>
                <span className="text-xs text-[#16232A]/60">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-[#16232A]/70 truncate">{conversation.lastMessage}</p>
            </div>

            {conversation.unread > 0 && (
              <div className="h-6 w-6 bg-[#FF5B04] rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">{conversation.unread}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No conversations found</h3>
          <p className="text-[#16232A]/60">
            {searchQuery ? 'Try a different search term' : 'Start chatting with vendors'}
          </p>
        </div>
      )}
    </div>
  );
};
