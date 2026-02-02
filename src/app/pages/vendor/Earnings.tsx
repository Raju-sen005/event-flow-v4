import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Calendar, Download, Award, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const Earnings: React.FC = () => {
  const stats = [
    { label: 'Total Earnings', value: '₹8,45,000', change: '+24%', icon: DollarSign, color: 'bg-[#075056]' },
    { label: 'This Month', value: '₹2,45,000', change: '+18%', icon: Calendar, color: 'bg-[#FF5B04]' },
    { label: 'Completed Events', value: '12', change: '+3 this month', icon: Award, color: 'bg-green-600' },
    { label: 'Pending Payouts', value: '₹65,000', change: '2 payments', icon: CheckCircle, color: 'bg-yellow-600' },
  ];

  const transactions = [
    { id: '1', event: 'Sharma Wedding Reception', amount: 142500, status: 'received', date: '2025-01-03', type: 'advance' },
    { id: '2', event: 'Tech Corp Gala', amount: 47500, status: 'received', date: '2025-01-05', type: 'advance' },
    { id: '3', event: 'Birthday Celebration', amount: 21000, status: 'received', date: '2025-01-06', type: 'advance' },
    { id: '4', event: 'Corporate Retreat', amount: 75000, status: 'received', date: '2025-01-02', type: 'full' },
    { id: '5', event: 'Gupta Anniversary', amount: 65000, status: 'pending', date: '2025-01-15', type: 'advance' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Earnings & Payments</h1>
        <p className="text-[#16232A]/70">Track your revenue and payment history</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-[#16232A] mb-1">{stat.value}</p>
            <p className="text-sm text-[#16232A]/70 mb-1">{stat.label}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#16232A]">Transaction History</h2>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#075056] transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-[#16232A] mb-1">{transaction.event}</p>
                <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                  <span>{new Date(transaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="capitalize">{transaction.type} Payment</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#075056]">₹{transaction.amount.toLocaleString('en-IN')}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'received'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {transaction.status === 'received' ? 'Received' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
