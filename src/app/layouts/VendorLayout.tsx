import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  Briefcase,
  Search,
  FileText,
  Award,
  MessageSquare,
  Upload,
  DollarSign,
  User,
  Calendar,
  Settings,
  Bell,
  LogOut,
  Home,
  Menu,
  X,
  Sparkles,
  Image,
  Package,
  Receipt,
  ClipboardCheck,
  TrendingUp,
  HeadphonesIcon
} from 'lucide-react';

export const VendorLayout: React.FC = () => {
  const { user, logout, isDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount] = useState(5);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { 
      category: 'MAIN',
      items: [
        { name: 'Dashboard', href: '/vendor/dashboard', icon: Home },
        { name: 'Requirements', href: '/vendor/requirements', icon: Search },
        { name: 'My Bids', href: '/vendor/bids', icon: FileText },
        { name: 'Awarded Events', href: '/vendor/events', icon: Award },
      ]
    },
    {
      category: 'SHOWCASE',
      items: [
        { name: 'Portfolio', href: '/vendor/portfolio', icon: Image },
        { name: 'Packages', href: '/vendor/packages', icon: Package },
        { name: 'Ads & Promotions', href: '/vendor/ads', icon: TrendingUp },
      ]
    },
    {
      category: 'MANAGEMENT',
      items: [
        { name: 'Messages', href: '/vendor/messages', icon: MessageSquare },
        { name: 'Deliverables', href: '/vendor/deliverables', icon: Upload },
        { name: 'Attendance', href: '/vendor/attendance', icon: ClipboardCheck },
        { name: 'Earnings', href: '/vendor/earnings', icon: DollarSign },
        { name: 'Invoices', href: '/vendor/invoices', icon: Receipt },
        { name: 'Profile', href: '/vendor/profile', icon: User },
      ]
    }
  ];

  const isActive = (path: string) => {
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
            <Link to="/vendor/dashboard" className="flex items-center gap-2">
              <div className="h-9 w-9 bg-[#075056] rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#16232A]">EventFlow</span>
              <span className="hidden sm:inline text-sm text-[#075056] font-medium">Vendor</span>
            </Link>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-3">
            <Link to="/vendor/requirements">
              <Button className="bg-[#075056] hover:bg-[#075056]/90 text-white">
                <Search className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Find Events</span>
              </Button>
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-gray-50">
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
          {navigation.map((section, sectionIndex) => (
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
                          ? 'bg-[#075056] text-white font-medium'
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

          {/* Settings Section - Now part of scrollable content */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              SETTINGS
            </p>
            <div className="space-y-1">
              <Link
                to="/vendor/support"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive('/vendor/support')
                    ? 'bg-[#075056] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <HeadphonesIcon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/vendor/support') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                Support
              </Link>
              <Link
                to="/vendor/availability"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive('/vendor/availability')
                    ? 'bg-[#075056] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <Calendar className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/vendor/availability') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                Availability
              </Link>
              <Link
                to="/vendor/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive('/vendor/settings')
                    ? 'bg-[#075056] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <Settings className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/vendor/settings') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
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
    </div>
  );
};