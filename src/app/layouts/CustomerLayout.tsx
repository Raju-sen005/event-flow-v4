import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  Calendar,
  Users,
  ShoppingBag,
  MessageSquare,
  FileText,
  Bell,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Plus,
  Sparkles,
  Mail,
  DollarSign,
  Shield,
  HelpCircle,
  Package,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerLayout: React.FC = () => {
  const { user, logout, isDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { 
      category: 'MAIN',
      items: [
        { name: 'Dashboard', href: '/customer/dashboard', icon: Home },
        { name: 'Events', href: '/customer/events', icon: Calendar },
      ]
    },
    {
      category: 'NETWORK',
      items: [
        { name: 'Vendors', href: '/customer/global-vendors', icon: ShoppingBag },
        { name: 'Event Planners', href: '/customer/event-planners', icon: Sparkles },
        { name: 'Guests', href: '/customer/global-guests', icon: Users },
      ]
    },
    {
      category: 'SERVICES',
      items: [
        { name: 'Rental Services', href: '/customer/rental-services', icon: Package },
      ]
    },
    {
      category: 'MANAGEMENT',
      items: [
        { name: 'Invitations', href: '/customer/invitations', icon: Mail },
        { name: 'Payments & Invoices', href: '/customer/payments', icon: DollarSign },
        { name: 'Agreements', href: '/customer/agreements-new', icon: Shield },
        { name: 'Messages', href: '/customer/messages', icon: MessageSquare },
      ]
    }
  ];

  const isActive = (path: string) => {
    // Special handling for rental services - any path with /rentals is rental services
    if (path === '/customer/rental-services') {
      return (
        location.pathname === path ||
        location.pathname.startsWith(path + '/') ||
        location.pathname.includes('/rentals')
      );
    }
    
    // Special handling for Events - exclude rental paths
    if (path === '/customer/events') {
      return (
        (location.pathname === path || location.pathname.startsWith(path + '/')) &&
        !location.pathname.includes('/rentals')
      );
    }
    
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/customer/dashboard" className="flex items-center gap-2">
              <div className="h-9 w-9 bg-[#FF5B04] rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#16232A]">EventFlow</span>
            </Link>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-3">
            <Link to="/customer/events/create">
              <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New Event</span>
              </Button>
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-gray-50" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="h-5 w-5 text-[#16232A]" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#FF5B04] text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="font-medium text-[#16232A]">{user?.name}</p>
                {isDemo && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Demo</span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-14 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.category}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {section.category}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        active
                          ? 'bg-[#FF5B04] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50 font-normal'
                      }`}
                    >
                      <item.icon className={`h-[18px] w-[18px] flex-shrink-0 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Support Section */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              SUPPORT
            </p>
            <div className="space-y-1">
              <Link
                to="/customer/support"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive('/customer/support')
                    ? 'bg-[#FF5B04] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <HelpCircle className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/customer/support') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                Help & Support
              </Link>
            </div>
          </div>

          {/* Settings Section */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              SETTINGS
            </p>
            <div className="space-y-1">
              <Link
                to="/customer/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive('/customer/settings')
                    ? 'bg-[#FF5B04] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <Settings className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/customer/settings') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                Settings
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 min-h-screen bg-[#E4EEF0]">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Notifications */}
      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Overlay to close notifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowNotifications(false)}
            />
            
            {/* Notifications Dropdown */}
            <motion.div
              className="fixed top-16 right-4 z-50 bg-white border border-gray-200 shadow-2xl rounded-xl w-96 max-h-[80vh] overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-[#16232A]">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[calc(80vh-8rem)]">
                <div className="divide-y divide-gray-100">
                  {/* Notification 1 */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#16232A] mb-1">
                          New message from vendor
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Elegant Rentals Co. sent you a message regarding your booking
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <div className="h-2 w-2 bg-[#FF5B04] rounded-full flex-shrink-0 mt-2" />
                    </div>
                  </div>

                  {/* Notification 2 */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#16232A] mb-1">
                          Event confirmed
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Your event "Sarah & John's Wedding" has been confirmed
                        </p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 3 */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#16232A] mb-1">
                          Payment reminder
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Your payment for rental deposit is due in 2 days
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <div className="h-2 w-2 bg-[#FF5B04] rounded-full flex-shrink-0 mt-2" />
                    </div>
                  </div>

                  {/* Notification 4 */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#16232A] mb-1">
                          New feature available
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Check out our new Rental Services feature!
                        </p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 5 */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#16232A] mb-1">
                          Upcoming event reminder
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          "Priya Birthday Bash" is in 2 days. Are you ready?
                        </p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-sm font-medium text-[#FF5B04] hover:text-[#FF5B04]/80 transition-colors py-2">
                  View All Notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};