import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

export const ChatDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const vendor = {
    name: 'Elite Photography Studio',
    status: 'online',
    avatar: 'EP'
  };

  const messages = [
    {
      id: 1,
      sender: 'vendor',
      content: 'Hi! Thank you for your interest. I would love to discuss your photography needs.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'customer',
      content: 'Hello! Yes, we are looking for a photographer for our wedding on February 15th.',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'vendor',
      content: 'That sounds wonderful! I have availability on that date. What style of photography are you looking for?',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      sender: 'customer',
      content: 'We prefer candid and artistic shots. Also, we would need coverage for about 8 hours.',
      timestamp: '10:38 AM'
    },
    {
      id: 5,
      sender: 'vendor',
      content: 'Perfect! That is exactly my specialty. Would you like to schedule a call to discuss the details and pricing?',
      timestamp: '10:40 AM'
    }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="relative">
              <div className="h-10 w-10 bg-[#FF5B04] rounded-full flex items-center justify-center">
                <span className="font-semibold text-white">{vendor.avatar}</span>
              </div>
              {vendor.status === 'online' && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-[#16232A]">{vendor.name}</h2>
              <p className="text-sm text-green-600">{vendor.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md px-4 py-3 rounded-2xl ${
                msg.sender === 'customer'
                  ? 'bg-[#FF5B04] text-white'
                  : 'bg-white text-[#16232A] border border-gray-200'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === 'customer' ? 'text-white/70' : 'text-[#16232A]/50'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm">
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          />
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
