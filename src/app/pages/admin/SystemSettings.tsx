import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Shield, Users, Tag, Bell, CreditCard, FileText, Save, AlertTriangle } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const settingsSections = [
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'categories', label: 'Service Categories', icon: Tag },
    { id: 'notifications', label: 'Notification Templates', icon: Bell },
    { id: 'payments', label: 'Payment Configuration', icon: CreditCard },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
  ];

  const roles = [
    { name: 'Admin', users: 5, permissions: ['View Users', 'Manage Vendors', 'Resolve Disputes'] },
    { name: 'Super Admin', users: 2, permissions: ['All Admin Permissions', 'System Configuration', 'Role Management'] },
  ];

  const categories = [
    { name: 'Catering', vendors: 45, status: 'Active' },
    { name: 'Venue', vendors: 32, status: 'Active' },
    { name: 'Decoration', vendors: 38, status: 'Active' },
    { name: 'Photography', vendors: 28, status: 'Active' },
    { name: 'Entertainment', vendors: 22, status: 'Active' },
  ];

  const auditLogs = [
    { action: 'User Suspended', admin: 'Admin User', target: 'Neha Patel', timestamp: '2024-03-15 10:30 AM' },
    { action: 'Vendor Verified', admin: 'Super Admin', target: 'Royal Caterers', timestamp: '2024-03-15 09:15 AM' },
    { action: 'Category Created', admin: 'Super Admin', target: 'Entertainment', timestamp: '2024-03-14 04:20 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-[#FF5B04] rounded-lg flex items-center justify-center">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-600">Super Admin Only - Configure platform settings</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === section.id
                    ? 'bg-[#FF5B04] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium text-sm">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'roles' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Roles & Permissions Management</h3>
                <Button size="sm">Add New Role</Button>
              </div>
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{role.name}</h4>
                        <p className="text-sm text-gray-600">{role.users} users assigned</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Service Categories</h3>
                <Button size="sm">Add Category</Button>
              </div>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Tag className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.vendors} vendors</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {category.status}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Notification Templates</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Welcome Email</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-gray-600">Sent when a new user registers on the platform</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Bid Received</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-gray-600">Sent when a customer receives a new bid</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Agreement Signed</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-gray-600">Sent when both parties sign an agreement</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Payment Gateway Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Platform Commission (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Payment Gateway
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]">
                    <option>Razorpay</option>
                    <option>Stripe</option>
                    <option>PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="Enter API key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
                  />
                </div>
                <Button className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Audit Logs</h3>
              <div className="space-y-3">
                {auditLogs.map((log, index) => (
                  <div key={index} className="p-4 border-l-4 border-[#075056] bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-gray-900">{log.action}</p>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Admin: <span className="font-semibold">{log.admin}</span> • Target: <span className="font-semibold">{log.target}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};