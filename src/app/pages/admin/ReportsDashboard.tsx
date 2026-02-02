import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Download, Calendar, TrendingUp, Users, Briefcase, DollarSign } from 'lucide-react';

export const ReportsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    {
      title: 'User Growth Report',
      description: 'Track customer registration and engagement trends',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      count: '1,247 users'
    },
    {
      title: 'Vendor Performance Report',
      description: 'Analyze vendor ratings, completion rates, and revenue',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600',
      count: '384 vendors'
    },
    {
      title: 'Event Category Report',
      description: 'View popular event types and category trends',
      icon: Calendar,
      color: 'bg-green-50 text-green-600',
      count: '12 categories'
    },
    {
      title: 'Revenue Analytics',
      description: 'Platform revenue, commissions, and financial insights',
      icon: DollarSign,
      color: 'bg-orange-50 text-orange-600',
      count: '₹12.4L'
    },
  ];

  const quickStats = [
    { label: 'New Customers This Month', value: '147', change: '+12%' },
    { label: 'Active Vendors', value: '312', change: '+8%' },
    { label: 'Events This Month', value: '89', change: '+15%' },
    { label: 'Revenue Growth', value: '₹3.2L', change: '+22%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Generate insights and track platform performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 ${report.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-600">{report.count}</span>
              </div>
              <h3 className="text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-[#16232A] to-[#075056] rounded-xl p-6 text-white">
        <h3 className="mb-4">Platform Health Overview</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-300 mb-2">Customer Satisfaction</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">94%</p>
              <span className="text-sm text-green-300 mb-1">+2%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-2">Average Vendor Rating</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">4.8</p>
              <span className="text-sm text-green-300 mb-1">+0.2</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-2">Event Success Rate</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">96%</p>
              <span className="text-sm text-green-300 mb-1">+1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};