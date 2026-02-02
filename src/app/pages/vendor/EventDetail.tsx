import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  DollarSign,
  FileText,
  Upload,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const event = {
    id,
    name: 'Sharma Wedding Reception',
    customer: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      avatar: 'PS'
    },
    date: '2025-01-15',
    location: 'The Grand, Andheri West, Mumbai - 400053',
    category: 'Catering',
    amount: 285000,
    status: 'in-progress',
    progress: 65,
    agreementStatus: 'signed',
    paymentStatus: 'partial',
    paidAmount: 142500,
    details: {
      eventType: 'Wedding Reception',
      guests: 300,
      timing: '7:00 PM - 11:00 PM',
      requirements: [
        'Multi-cuisine buffet setup',
        'Live food counters',
        'Dessert station',
        'Welcome drinks',
        'Staff for service'
      ]
    },
    deliverables: [
      { id: '1', name: 'Menu finalization', status: 'completed', dueDate: '2025-01-05', completedDate: '2025-01-03' },
      { id: '2', name: 'Advance preparation checklist', status: 'completed', dueDate: '2025-01-08', completedDate: '2025-01-07' },
      { id: '3', name: 'Ingredient procurement confirmation', status: 'completed', dueDate: '2025-01-10', completedDate: '2025-01-09' },
      { id: '4', name: 'Staff deployment plan', status: 'completed', dueDate: '2025-01-12', completedDate: '2025-01-11' },
      { id: '5', name: 'Final menu card', status: 'pending', dueDate: '2025-01-14', completedDate: null },
      { id: '6', name: 'Post-event feedback form', status: 'pending', dueDate: '2025-01-16', completedDate: null },
    ],
    timeline: [
      { date: '2025-01-02', event: 'Bid Awarded', description: 'Your bid was accepted by the customer' },
      { date: '2025-01-03', event: 'Agreement Signed', description: 'Contract signed by both parties' },
      { date: '2025-01-03', event: 'Advance Payment', description: '50% advance payment received (₹1,42,500)' },
      { date: '2025-01-11', event: 'Deliverable Submitted', description: 'Staff deployment plan approved' },
    ],
    messages: [
      { id: '1', from: 'customer', text: 'Can we add a live pasta counter?', time: '2 hours ago' },
      { id: '2', from: 'vendor', text: 'Yes, we can arrange that. It will be an additional ₹15,000', time: '1 hour ago' },
    ]
  };

  return (
    <div className="space-y-6">
      <Link
        to="/vendor/events"
        className="inline-flex items-center gap-2 text-[#075056] hover:text-[#075056]/80 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full font-medium">
                In Progress
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                {event.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#16232A] mb-2">{event.name}</h1>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#075056] rounded-full flex items-center justify-center">
                <span className="text-sm text-white font-medium">{event.customer.avatar}</span>
              </div>
              <div>
                <p className="font-medium text-[#16232A]">{event.customer.name}</p>
                <p className="text-xs text-[#16232A]/50">{event.customer.phone}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#075056]">₹{event.amount.toLocaleString('en-IN')}</p>
            <p className="text-sm text-green-600">₹{event.paidAmount.toLocaleString('en-IN')} received</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-[#16232A]/50">Event Date</p>
              <p className="font-medium text-[#16232A]">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs text-[#16232A]/50">Timing</p>
              <p className="font-medium text-[#16232A]">{event.details.timing}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-[#16232A]/50">Guests</p>
              <p className="font-medium text-[#16232A]">{event.details.guests}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-[#075056]" />
            <div>
              <p className="text-xs text-[#16232A]/50">Progress</p>
              <p className="font-medium text-[#16232A]">{event.progress}%</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#16232A]">{event.location}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['overview', 'deliverables', 'communication', 'timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#075056] text-[#075056]'
                    : 'border-transparent text-[#16232A]/70 hover:text-[#16232A]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#16232A] mb-3">Event Requirements</h3>
                <div className="space-y-2">
                  {event.details.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-[#075056] flex-shrink-0 mt-0.5" />
                      <p className="text-[#16232A]/70">{req}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-[#16232A] mb-3">Agreement Status</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Signed by both parties</span>
                  </div>
                  <Link to={`/vendor/agreements/${id}`}>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      View Agreement
                    </Button>
                  </Link>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-[#16232A] mb-3">Payment Status</h4>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#16232A]/70">Received</span>
                      <span className="font-medium text-[#16232A]">₹{event.paidAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-[#16232A]/50">
                    Remaining: ₹{(event.amount - event.paidAmount).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[#16232A]/70">
                  {event.deliverables.filter(d => d.status === 'completed').length} of {event.deliverables.length} completed
                </p>
                <Link to={`/vendor/deliverables/upload?event=${id}`}>
                  <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Deliverable
                  </Button>
                </Link>
              </div>

              {event.deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className={`p-4 border rounded-lg ${
                    deliverable.status === 'completed'
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {deliverable.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        )}
                        <h4 className="font-medium text-[#16232A]">{deliverable.name}</h4>
                      </div>
                      <p className="text-sm text-[#16232A]/70">
                        Due: {new Date(deliverable.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {deliverable.completedDate && (
                          <span className="ml-2 text-green-600">
                            • Completed on {new Date(deliverable.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-[#16232A]">Messages</h3>
                <Link to={`/vendor/messages/${id}`}>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Open Chat
                  </Button>
                </Link>
              </div>

              {event.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.from === 'vendor'
                      ? 'bg-[#075056]/10 ml-12'
                      : 'bg-gray-50 mr-12'
                  }`}
                >
                  <p className="text-sm text-[#16232A] mb-1">{message.text}</p>
                  <p className="text-xs text-[#16232A]/50">{message.time}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {event.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 bg-[#075056] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    {index < event.timeline.length - 1 && (
                      <div className="flex-1 w-0.5 bg-gray-200 my-2" style={{ minHeight: '40px' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-medium text-[#16232A] mb-1">{item.event}</p>
                    <p className="text-sm text-[#16232A]/70 mb-1">{item.description}</p>
                    <p className="text-xs text-[#16232A]/50">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
