import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const VendorMessages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');
  const [messageText, setMessageText] = useState('');

  const chats = [
    {
      id: '1',
      customer: 'Priya Sharma',
      avatar: 'PS',
      lastMessage: 'Can we finalize the menu by tomorrow?',
      time: '2 hours ago',
      unread: 2,
      eventName: 'Sharma Wedding Reception',
      online: true
    },
    {
      id: '2',
      customer: 'Vikram Singh',
      avatar: 'VS',
      lastMessage: 'Thanks for sharing the portfolio!',
      time: '5 hours ago',
      unread: 0,
      eventName: 'Singh Family Wedding',
      online: false
    },
    {
      id: '3',
      customer: 'Neha Kapoor',
      avatar: 'NK',
      lastMessage: 'When can we schedule a call?',
      time: '1 day ago',
      unread: 1,
      eventName: 'Tech Summit 2025',
      online: false
    },
  ];

  const messages = [
    { id: '1', from: 'customer', text: 'Hi! I wanted to discuss the menu options', time: '10:30 AM', avatar: 'PS' },
    { id: '2', from: 'vendor', text: 'Hello! Sure, I\'d be happy to help. What would you like to know?', time: '10:32 AM', avatar: 'You' },
    { id: '3', from: 'customer', text: 'Can we add a live pasta counter?', time: '10:35 AM', avatar: 'PS' },
    { id: '4', from: 'vendor', text: 'Yes, we can arrange that. It will be an additional ₹15,000', time: '10:40 AM', avatar: 'You' },
    { id: '5', from: 'customer', text: 'That sounds good. Can we finalize the menu by tomorrow?', time: '11:15 AM', avatar: 'PS' },
  ];

  const filteredChats = chats.filter(chat =>
    chat.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Messages</h1>
        <p className="text-[#16232A]/70">Communicate with your customers</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
        <div className="grid grid-cols-12 h-full">
          {/* Chat List */}
          <div className="col-span-12 md:col-span-4 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#16232A]/40" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#075056]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                    selectedChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 bg-[#075056] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">{chat.avatar}</span>
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-[#16232A] truncate">{chat.customer}</p>
                        <span className="text-xs text-[#16232A]/50 whitespace-nowrap ml-2">{chat.time}</span>
                      </div>
                      <p className="text-sm text-[#16232A]/70 truncate mb-1">{chat.lastMessage}</p>
                      <p className="text-xs text-[#16232A]/50 truncate">{chat.eventName}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="h-5 w-5 bg-[#FF5B04] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white font-medium">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#075056] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{activeChat.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#16232A]">{activeChat.customer}</p>
                      <p className="text-xs text-[#16232A]/50">{activeChat.eventName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/vendor/events/${activeChat.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Event
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5 text-[#16232A]" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 ${
                        message.from === 'vendor' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.from === 'vendor' ? 'bg-[#075056]' : 'bg-gray-300'
                      }`}>
                        <span className="text-xs text-white font-medium">
                          {message.from === 'vendor' ? 'You' : message.avatar}
                        </span>
                      </div>
                      <div className={`max-w-[70%] ${
                        message.from === 'vendor' ? 'items-end' : 'items-start'
                      }`}>
                        <div className={`p-3 rounded-lg ${
                          message.from === 'vendor'
                            ? 'bg-[#075056] text-white'
                            : 'bg-gray-100 text-[#16232A]'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-[#16232A]/50 mt-1 px-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Paperclip className="h-5 w-5 text-[#16232A]/70" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && messageText.trim()) {
                          setMessageText('');
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
                    />
                    <Button
                      disabled={!messageText.trim()}
                      className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-[#16232A]/20 mx-auto mb-4" />
                  <p className="text-[#16232A]/70">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
