import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Gavel,
  FileSignature,
  DollarSign,
  BarChart3,
  Headphones,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  superAdminOnly?: boolean;
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'User Management', icon: Users, path: '/admin/users' },
  { label: 'Vendor Management', icon: Briefcase, path: '/admin/vendors' },
  { label: 'Requirements', icon: FileText, path: '/admin/requirements' },
  { label: 'Bids & Activity', icon: Gavel, path: '/admin/bids' },
  { label: 'Disputes', icon: Shield, path: '/admin/disputes' },
  { label: 'Agreements', icon: FileSignature, path: '/admin/agreements' },
  { label: 'Financial', icon: DollarSign, path: '/admin/financial' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { label: 'Support', icon: Headphones, path: '/admin/support' },
  { label: 'System Settings', icon: Settings, path: '/admin/settings', superAdminOnly: true },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isSuperAdmin = user?.role === 'super-admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNavItems = navigationItems.filter(
    item => !item.superAdminOnly || isSuperAdmin
  );

  return (
    <div className="min-h-screen bg-[#E4EEF0]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#16232A] border-b border-gray-700">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Logo & Menu Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link to="/admin/dashboard" className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#FF5B04] rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold">EventFlow Admin</h1>
                  {isSuperAdmin && (
                    <span className="text-xs text-[#FF5B04]">Super Admin</span>
                  )}
                </div>
              </Link>
            </div>

            {/* Right - Search, Notifications, User */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5B04] w-64 text-sm"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <div className="h-8 w-8 bg-[#075056] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-14 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#FF5B04] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
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