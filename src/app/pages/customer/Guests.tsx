import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Phone,
  Tag,
  Edit,
  Trash2,
  Eye,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { ExportModal } from '../../components/ExportModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Checkbox } from '../../components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export const Guests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRSVP, setFilterRSVP] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Mock data
  const guests = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      category: 'Family',
      rsvp: 'confirmed',
      event: 'Sarah & John Wedding',
      plusOne: true,
      dietaryRestrictions: 'Vegetarian'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@email.com',
      phone: '+1 (555) 234-5678',
      category: 'Friends',
      rsvp: 'confirmed',
      event: 'Sarah & John Wedding',
      plusOne: false,
      dietaryRestrictions: null
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+1 (555) 345-6789',
      category: 'VIP',
      rsvp: 'pending',
      event: 'Sarah & John Wedding',
      plusOne: true,
      dietaryRestrictions: null
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.d@email.com',
      phone: '+1 (555) 456-7890',
      category: 'Family',
      rsvp: 'confirmed',
      event: 'Sarah & John Wedding',
      plusOne: false,
      dietaryRestrictions: 'Gluten-free'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.w@email.com',
      phone: '+1 (555) 567-8901',
      category: 'Colleagues',
      rsvp: 'declined',
      event: 'Sarah & John Wedding',
      plusOne: false,
      dietaryRestrictions: null
    },
    {
      id: 6,
      name: 'Jennifer Martinez',
      email: 'jennifer.m@email.com',
      phone: '+1 (555) 678-9012',
      category: 'Friends',
      rsvp: 'pending',
      event: 'Sarah & John Wedding',
      plusOne: true,
      dietaryRestrictions: null
    },
  ];

  const stats = [
    { label: 'Total Invited', value: guests.length, icon: Users, color: 'bg-[#16232A]' },
    { label: 'Confirmed', value: guests.filter(g => g.rsvp === 'confirmed').length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Pending', value: guests.filter(g => g.rsvp === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Declined', value: guests.filter(g => g.rsvp === 'declined').length, icon: XCircle, color: 'bg-red-500' },
  ];

  const getRSVPColor = (rsvp: string) => {
    switch (rsvp) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'VIP':
        return 'bg-purple-100 text-purple-700';
      case 'Family':
        return 'bg-blue-100 text-blue-700';
      case 'Friends':
        return 'bg-green-100 text-green-700';
      case 'Colleagues':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || guest.category === filterCategory;
    const matchesRSVP = filterRSVP === 'all' || guest.rsvp === filterRSVP;
    return matchesSearch && matchesCategory && matchesRSVP;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#16232A]">Guest Management</h1>
          <p className="text-[#16232A]/70 mt-1">Manage your guest list and track RSVPs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowExportModal(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link to="/customer/guests/add">
            <Button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Guests
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#16232A]/60 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#16232A]">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All Categories</option>
              <option value="VIP">VIP</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Colleagues">Colleagues</option>
            </select>
            <select
              value={filterRSVP}
              onChange={(e) => setFilterRSVP(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
            >
              <option value="all">All RSVP Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  RSVP Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  Plus One
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#16232A]/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#16232A]">{guest.name}</p>
                      {guest.dietaryRestrictions && (
                        <p className="text-xs text-[#16232A]/60">
                          {guest.dietaryRestrictions}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                        <Mail className="h-3 w-3" />
                        {guest.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#16232A]/70">
                        <Phone className="h-3 w-3" />
                        {guest.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(guest.category)}`}>
                      {guest.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRSVPColor(guest.rsvp)}`}>
                      {guest.rsvp.charAt(0).toUpperCase() + guest.rsvp.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {guest.plusOne ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-[#16232A]/60" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Confirm
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredGuests.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#16232A] mb-2">No guests found</h3>
          <p className="text-[#16232A]/60 mb-6">
            {searchQuery || filterCategory !== 'all' || filterRSVP !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first guest to get started'}
          </p>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        title="Export Guest List"
        description="Choose a format to export your guest list"
        formats={['csv', 'pdf', 'excel']}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the guest from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Perform delete action here
                setDeleteConfirmId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};