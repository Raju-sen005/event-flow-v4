import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import {
  Users,
  FileText,
  Gavel,
  HeadphonesIcon,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  X,
  Calendar,
  Shield,
  Settings,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

type SuperAdminSection = 'vendors' | 'requirements' | 'support';
type MonitoringTab = 'requirements' | 'bids' | 'agreements';

interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  category: string;
  location: string;
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Suspended';
  revenue: string;
  verified: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  userName: string;
  userType: 'Customer' | 'Vendor';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  createdDate: string;
  lastUpdated: string;
}

export const SuperAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SuperAdminSection>('vendors');
  const [monitoringTab, setMonitoringTab] = useState<MonitoringTab>('requirements');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock vendors data (extended with verification info)
  const vendors: Vendor[] = [
    {
      id: 'V001',
      businessName: 'Elegance Wedding Photography',
      ownerName: 'Priya Sharma',
      category: 'Photographer',
      location: 'Mumbai, MH',
      joinedDate: '2023-05-15',
      status: 'Active',
      revenue: '₹12,50,000',
      verified: true
    },
    {
      id: 'V002',
      businessName: 'Royal Caterers',
      ownerName: 'Rajesh Kumar',
      category: 'Caterer',
      location: 'Delhi, DL',
      joinedDate: '2023-08-20',
      status: 'Active',
      revenue: '₹25,75,000',
      verified: true
    },
    {
      id: 'V003',
      businessName: 'Floral Dreams Decor',
      ownerName: 'Anjali Desai',
      category: 'Decorator',
      location: 'Bangalore, KA',
      joinedDate: '2023-11-10',
      status: 'Active',
      revenue: '₹8,30,000',
      verified: true
    },
    {
      id: 'V004',
      businessName: 'Premium Event Planners',
      ownerName: 'Vikram Singh',
      category: 'Event Planner',
      location: 'Pune, MH',
      joinedDate: '2024-01-05',
      status: 'Pending',
      revenue: '₹0',
      verified: false
    },
    {
      id: 'V005',
      businessName: 'Melody Music & DJ',
      ownerName: 'Amit Patel',
      category: 'DJ & Sound',
      location: 'Ahmedabad, GJ',
      joinedDate: '2023-07-22',
      status: 'Active',
      revenue: '₹6,90,000',
      verified: true
    }
  ];

  // Mock support tickets
  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-1234',
      subject: 'Payment not received for wedding event',
      userName: 'Priya Sharma',
      userType: 'Vendor',
      status: 'In Progress',
      priority: 'High',
      createdDate: '2025-01-05',
      lastUpdated: '2025-01-06'
    },
    {
      id: 'TKT-1235',
      subject: 'Unable to contact vendor after booking',
      userName: 'Ravi Mehta',
      userType: 'Customer',
      status: 'Open',
      priority: 'High',
      createdDate: '2025-01-06',
      lastUpdated: '2025-01-06'
    },
    {
      id: 'TKT-1236',
      subject: 'Profile verification pending',
      userName: 'Vikram Singh',
      userType: 'Vendor',
      status: 'Open',
      priority: 'Medium',
      createdDate: '2025-01-05',
      lastUpdated: '2025-01-05'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Resolved':
      case 'Closed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
      case 'Open':
        return 'bg-yellow-100 text-yellow-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      case 'Low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-[#FF5B04] to-[#075056] rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#16232A]">EventFlow</h2>
                <p className="text-xs text-gray-500">Super Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-[#16232A]">Super Admin</p>
                <p className="text-xs text-gray-500">Full Access</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-[#16232A]">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#16232A] mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-600">Platform governance, configuration, and high-level control</p>
        </div>

        {/* Stats Overview with Extended Metrics */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-green-600">+12%</span>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">247</p>
            <p className="text-sm text-gray-600">Total Vendors</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-green-600">+8%</span>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">1,843</p>
            <p className="text-sm text-gray-600">Requirements</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gavel className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-blue-600">+5%</span>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">892</p>
            <p className="text-sm text-gray-600">Active Bids</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600">+18%</span>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">₹54.2L</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xs font-medium text-red-600">12 Open</span>
            </div>
            <p className="text-2xl font-bold text-[#16232A] mb-1">45</p>
            <p className="text-sm text-gray-600">Support Tickets</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              <button
                onClick={() => setActiveSection('vendors')}
                className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                  activeSection === 'vendors'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="h-4 w-4 inline-block mr-2 mb-0.5" />
                Vendor Management
              </button>
              <button
                onClick={() => setActiveSection('requirements')}
                className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                  activeSection === 'requirements'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="h-4 w-4 inline-block mr-2 mb-0.5" />
                Requirements & Events / Bids & Activity / Agreements
              </button>
              <button
                onClick={() => setActiveSection('support')}
                className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                  activeSection === 'support'
                    ? 'border-[#FF5B04] text-[#FF5B04]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <HeadphonesIcon className="h-4 w-4 inline-block mr-2 mb-0.5" />
                Support & Helpdesk
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Vendor Management Section */}
            {activeSection === 'vendors' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#16232A]">Vendor Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Extended permissions - Full oversight & control</p>
                  </div>
                  <Button 
                    onClick={() => setShowExportModal(true)}
                    className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by business name, owner, or category..."
                      className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" className="border-gray-300">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>

                {/* Vendors Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Vendor ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Business Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Verified</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vendors.map((vendor) => (
                        <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#16232A]">{vendor.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.businessName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.ownerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(vendor.joinedDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor.status)}`}>
                              {vendor.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {vendor.verified ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                <Shield className="h-3 w-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{vendor.revenue}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="text-[#FF5B04] hover:text-[#FF5B04]/80">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Requirements & Events / Bids & Activity / Agreements Section */}
            {activeSection === 'requirements' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#16232A] mb-1">Monitoring & Compliance</h2>
                  <p className="text-sm text-gray-500 mb-4">Read-only oversight with configuration access</p>
                  
                  {/* Sub-tabs */}
                  <div className="flex gap-4 border-b border-gray-200">
                    <button
                      onClick={() => setMonitoringTab('requirements')}
                      className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                        monitoringTab === 'requirements'
                          ? 'border-[#FF5B04] text-[#FF5B04]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Requirements & Events
                    </button>
                    <button
                      onClick={() => setMonitoringTab('bids')}
                      className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                        monitoringTab === 'bids'
                          ? 'border-[#FF5B04] text-[#FF5B04]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Bids & Activity
                    </button>
                    <button
                      onClick={() => setMonitoringTab('agreements')}
                      className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                        monitoringTab === 'agreements'
                          ? 'border-[#FF5B04] text-[#FF5B04]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Agreements & Compliance
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6">
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>All Categories</option>
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Birthday Party</option>
                  </select>
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 90 Days</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                {/* Content based on active monitoring tab - Read-only view */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">Super Admin View - Read-Only Mode</p>
                      <p className="text-xs text-blue-700">
                        This section provides oversight and monitoring access. Data is displayed in read-only mode 
                        with configuration controls available through the Settings panel.
                      </p>
                    </div>
                  </div>
                </div>

                {monitoringTab === 'requirements' && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Req ID</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Event Type</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Event Date</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Budget</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#16232A]">REQ-1234</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Wedding</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Sneha Kapoor</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mumbai, MH</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2025-03-15</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹5,00,000</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Active</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="text-[#FF5B04] hover:text-[#FF5B04]/80">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* Support & Helpdesk Section */}
            {activeSection === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#16232A]">Support & Helpdesk</h2>
                    <p className="text-sm text-gray-500 mt-1">Monitoring-only access - Escalation oversight</p>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6">
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <select className="h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm">
                    <option>All User Types</option>
                    <option>Customer</option>
                    <option>Vendor</option>
                  </select>
                </div>

                {/* Tickets Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Ticket ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">User</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">User Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#16232A]">{ticket.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.userType}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(ticket.createdDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="text-[#FF5B04] hover:text-[#FF5B04]/80">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal (Same as Admin) */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
};

// Export Modal Component
const ExportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#16232A]">Export Data</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-3">Export Format</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value as 'csv')}
                  className="text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <span className="text-sm font-medium text-gray-700">CSV File</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value as 'excel')}
                  className="text-[#FF5B04] focus:ring-[#FF5B04]"
                />
                <span className="text-sm font-medium text-gray-700">Excel File (.xlsx)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-2">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="pending">Pending Only</option>
              <option value="suspended">Suspended Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#16232A] mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20 focus:border-[#FF5B04] transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-gray-300">
              Cancel
            </Button>
            <Button className="flex-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};