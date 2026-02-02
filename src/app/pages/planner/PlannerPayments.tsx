import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Download, Calendar, CheckCircle, Clock, FileText, Filter, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const PlannerPayments: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const payments = [
    {
      id: '1',
      invoice: 'INV-2025-001',
      vendor: 'Elite Photography Studio',
      event: 'Singh Family Wedding',
      amount: 95000,
      status: 'paid',
      dueDate: '2025-02-20',
      paidDate: '2025-02-18'
    },
    {
      id: '2',
      invoice: 'INV-2025-002',
      vendor: 'Gourmet Catering Co.',
      event: 'Tech Conference 2025',
      amount: 450000,
      status: 'pending',
      dueDate: '2025-03-15',
      paidDate: null
    },
    {
      id: '3',
      invoice: 'INV-2025-003',
      vendor: 'Decor Dreams',
      event: 'Birthday Celebration',
      amount: 75000,
      status: 'paid',
      dueDate: '2025-03-01',
      paidDate: '2025-02-28'
    }
  ];

  const filteredPayments = payments.filter(p => filterStatus === 'all' || p.status === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#16232A] mb-2">Payments & Invoices</h1>
        <p className="text-[#16232A]/70">View payment history and download invoices</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{(payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) / 100000).toFixed(1)}L
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
                ₹{(payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-[#075056]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#075056]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-[#075056]">
                ₹{(payments.reduce((sum, p) => sum + p.amount, 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075056]"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-[#16232A]">{payment.vendor}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {payment.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{payment.event}</p>
                <p className="text-xs text-gray-500 mt-1">Invoice: {payment.invoice}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#075056]">₹{payment.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}</span>
                </div>
                {payment.paidDate && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Paid: {new Date(payment.paidDate).toLocaleDateString('en-IN')}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
