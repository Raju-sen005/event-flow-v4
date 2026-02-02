import React from 'react';
import { DollarSign, TrendingUp, CreditCard, RefreshCcw } from 'lucide-react';

export const FinancialDashboard: React.FC = () => {
  const financialData = {
    totalRevenue: '₹12,45,000',
    platformCommission: '₹1,86,750',
    pendingPayouts: '₹3,45,000',
    refundRequests: 3
  };

  const transactions = [
    { id: '1', type: 'Commission', customer: 'Priya Sharma', vendor: 'Royal Caterers', amount: '₹35,625', date: '2024-03-15', status: 'Completed' },
    { id: '2', type: 'Payout', customer: '-', vendor: 'Dream Venues', amount: '₹6,37,500', date: '2024-03-14', status: 'Pending' },
    { id: '3', type: 'Refund', customer: 'Ananya Gupta', vendor: 'Elegant Decor', amount: '₹50,000', date: '2024-03-12', status: 'Processing' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Financial Monitoring</h1>
        <p className="text-gray-600">Track platform revenue and transactions</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{financialData.totalRevenue}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-gray-600">Commission Earned</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{financialData.platformCommission}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
            <p className="text-sm text-gray-600">Pending Payouts</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{financialData.pendingPayouts}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCcw className="h-5 w-5 text-red-600" />
            <p className="text-sm text-gray-600">Refund Requests</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{financialData.refundRequests}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{txn.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.vendor}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(txn.date).toLocaleDateString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};