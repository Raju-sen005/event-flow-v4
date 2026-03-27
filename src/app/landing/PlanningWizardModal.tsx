import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ArrowLeft, ArrowRight, ChevronRight, MapPin, Calendar, Users,
  Star, Camera, Music2, UtensilsCrossed, Sparkles, Palette, Heart,
  Lock, CheckCircle, PartyPopper, Briefcase, Package, MapPinned
} from 'lucide-react';
import { LoginModal } from './LoginModal';

// ─── Types ─────────────────────────────────────────────────────────────────
interface PlanningWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EventDetailsForm {
  eventDate: string;
  location: string;
  guestCount: string;
}

type WizardStep = 1 | 2 | 3 | 4;

// ─── Data ──────────────────────────────────────────────────────────────────
const eventTypes = [
  { id: 'wedding', label: 'Wedding', icon: Heart, gradient: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', iconColor: 'text-pink-400' },
  { id: 'birthday', label: 'Birthday', icon: PartyPopper, gradient: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', iconColor: 'text-yellow-400' },
  { id: 'corporate', label: 'Corporate Event', icon: Briefcase, gradient: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', iconColor: 'text-blue-400' },
  { id: 'festival', label: 'Festival', icon: Sparkles, gradient: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
  { id: 'party', label: 'Party', icon: Music2, gradient: 'from-[#FF5B04]/20 to-orange-600/20', border: 'border-[#FF5B04]/30', iconColor: 'text-[#FF5B04]' },
  { id: 'other', label: 'Other', icon: Calendar, gradient: 'from-[#075056]/20 to-teal-600/20', border: 'border-[#075056]/40', iconColor: 'text-teal-400' },
];

const services = [
  { id: 'photographer', label: 'Photographer', icon: Camera },
  { id: 'dj', label: 'DJ', icon: Music2 },
  { id: 'catering', label: 'Catering', icon: UtensilsCrossed },
  { id: 'decor', label: 'Decor', icon: Palette },
  { id: 'makeup', label: 'Makeup', icon: Sparkles },
  { id: 'rentals', label: 'Rental Items', icon: Package },
  { id: 'planner', label: 'Event Planner', icon: MapPinned },
];

const vendorDatabase = [
  {
    id: 1,
    name: 'Aria Photography Studio',
    category: 'Photographer',
    serviceIds: ['photographer'],
    rating: 4.9,
    reviews: 312,
    price: '$800 – $2,500',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1769230385107-bc6eaa7a123e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['wedding', 'corporate', 'birthday'],
    badge: 'Top Rated',
  },
  {
    id: 2,
    name: 'Feast & Co. Catering',
    category: 'Catering',
    serviceIds: ['catering'],
    rating: 4.8,
    reviews: 198,
    price: '$45 – $120 / head',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1761110429384-0678d7015545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['wedding', 'corporate', 'festival'],
    badge: 'Most Booked',
  },
  {
    id: 3,
    name: 'Bass Drop DJ Services',
    category: 'DJ',
    serviceIds: ['dj'],
    rating: 4.7,
    reviews: 241,
    price: '$400 – $1,200',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1772187727850-821f4e091f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['party', 'festival', 'birthday'],
    badge: 'Fan Favorite',
  },
  {
    id: 4,
    name: 'Bloom & Blossom Decor',
    category: 'Decor',
    serviceIds: ['decor'],
    rating: 4.9,
    reviews: 175,
    price: '$600 – $3,000',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1768878288634-407dd70e1d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['wedding', 'birthday', 'party'],
    badge: 'Top Rated',
  },
  {
    id: 5,
    name: 'Glam Touch Artistry',
    category: 'Makeup',
    serviceIds: ['makeup'],
    rating: 4.8,
    reviews: 143,
    price: '$150 – $600',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1648671095421-61976aabbd3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['wedding', 'birthday'],
    badge: null,
  },
  {
    id: 6,
    name: 'Grand Events Planner',
    category: 'Event Planner',
    serviceIds: ['planner'],
    rating: 4.9,
    reviews: 88,
    price: '$1,200 – $5,000',
    location: 'Houston, TX',
    image: 'https://images.unsplash.com/photo-1712903276040-c99b32a057eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tags: ['wedding', 'corporate', 'festival'],
    badge: 'Premium',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 26, stiffness: 280 } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.15 } },
};

const stepVariants = {
  enter: (dir: number) => ({ x: dir * 50, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.22 } },
  exit: (dir: number) => ({ x: dir * -50, opacity: 0, transition: { duration: 0.15 } }),
};

const inputClass = 'w-full bg-white/5 border border-white/10 text-[#E4EEF0] placeholder-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FF5B04]/60 focus:bg-white/8 transition-all';

// ─── Step Progress ─────────────────────────────────────────────────────────
const StepProgress: React.FC<{ current: WizardStep; total: number }> = ({ current, total }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
      <React.Fragment key={step}>
        <div className={`flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold transition-all ${
          step < current ? 'bg-[#FF5B04] text-white' :
          step === current ? 'bg-[#FF5B04] text-white ring-2 ring-[#FF5B04]/30' :
          'bg-white/10 text-white/30'
        }`}>
          {step < current ? <CheckCircle className="h-3.5 w-3.5" /> : step}
        </div>
        {step < total && (
          <div className={`flex-1 h-0.5 rounded-full transition-all ${step < current ? 'bg-[#FF5B04]' : 'bg-white/10'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const stepLabels = ['Event Type', 'Details', 'Services', 'Vendors'];

// ─── Step 1 ─────────────────────────────────────────────────────────────────
const Step1: React.FC<{
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}> = ({ selected, onSelect, onNext }) => (
  <div className="flex flex-col gap-6">
    <div>
      <h3 className="text-xl font-bold text-white">What type of event are you planning?</h3>
      <p className="text-sm text-white/40 mt-1">Select one to get started</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {eventTypes.map(({ id, label, icon: Icon, gradient, border, iconColor }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`relative flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all ${
            selected === id
              ? `bg-gradient-to-br ${gradient} ${border} ring-2 ring-[#FF5B04]/40`
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
          }`}
        >
          {selected === id && (
            <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-[#FF5B04] flex items-center justify-center">
              <CheckCircle className="h-2.5 w-2.5 text-white" />
            </div>
          )}
          <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${selected === id ? `bg-gradient-to-br ${gradient}` : ''}`}>
            <Icon className={`h-5 w-5 ${selected === id ? iconColor : 'text-white/40'}`} />
          </div>
          <span className={`text-sm font-medium ${selected === id ? 'text-white' : 'text-white/60'}`}>{label}</span>
        </button>
      ))}
    </div>
    <button
      onClick={onNext}
      disabled={!selected}
      className="w-full py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      Next <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

// ─── Step 2 ─────────────────────────────────────────────────────────────────
const Step2: React.FC<{
  onBack: () => void;
  onNext: (data: EventDetailsForm) => void;
}> = ({ onBack, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventDetailsForm>();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold text-white">Tell us about your event</h3>
        <p className="text-sm text-white/40 mt-1">We'll use this to match you with the best vendors</p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#E4EEF0]/80">Event Date</label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register('eventDate', { required: 'Please select a date' })}
              type="date"
              min={today}
              className={`${inputClass} pl-10 [color-scheme:dark]`}
            />
          </div>
          {errors.eventDate && <p className="text-xs text-red-400">{errors.eventDate.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#E4EEF0]/80">Event Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register('location', { required: 'Location is required' })}
              placeholder="City, State or Venue Name"
              className={`${inputClass} pl-10`}
            />
          </div>
          {errors.location && <p className="text-xs text-red-400">{errors.location.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#E4EEF0]/80">Estimated Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <select
              {...register('guestCount', { required: 'Please select guest count' })}
              className={`${inputClass} pl-10 bg-[#1a2d38]`}
            >
              <option value="">Select range…</option>
              <option value="1-25">1 – 25 guests</option>
              <option value="26-50">26 – 50 guests</option>
              <option value="51-100">51 – 100 guests</option>
              <option value="101-200">101 – 200 guests</option>
              <option value="201-500">201 – 500 guests</option>
              <option value="500+">500+ guests</option>
            </select>
          </div>
          {errors.guestCount && <p className="text-xs text-red-400">{errors.guestCount.message}</p>}
        </div>

        <div className="flex gap-3 mt-2">
          <button type="button" onClick={onBack} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button type="submit" className="flex-[2] py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 flex items-center justify-center gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Step 3 ─────────────────────────────────────────────────────────────────
const Step3: React.FC<{
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}> = ({ selected, onToggle, onBack, onNext }) => (
  <div className="flex flex-col gap-6">
    <div>
      <h3 className="text-xl font-bold text-white">What services do you need?</h3>
      <p className="text-sm text-white/40 mt-1">Select all that apply — you can change this later</p>
    </div>

    <div className="grid grid-cols-2 gap-2.5">
      {services.map(({ id, label, icon: Icon }) => {
        const isSelected = selected.includes(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
              isSelected
                ? 'bg-[#FF5B04]/10 border-[#FF5B04]/40 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 text-white/60'
            }`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#FF5B04]/20' : 'bg-white/5'}`}>
              <Icon className={`h-4 w-4 ${isSelected ? 'text-[#FF5B04]' : 'text-white/40'}`} />
            </div>
            <span className="text-sm font-medium">{label}</span>
            {isSelected && (
              <CheckCircle className="h-4 w-4 text-[#FF5B04] ml-auto flex-shrink-0" />
            )}
          </button>
        );
      })}
    </div>

    {selected.length > 0 && (
      <div className="flex items-center gap-2 text-xs text-white/40">
        <div className="h-1.5 w-1.5 rounded-full bg-[#FF5B04]" />
        {selected.length} service{selected.length > 1 ? 's' : ''} selected
      </div>
    )}

    <div className="flex gap-3">
      <button onClick={onBack} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <button
        onClick={onNext}
        disabled={selected.length === 0}
        className="flex-[2] py-3 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        Show Vendors <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

// ─── Vendor Card ────────────────────────────────────────────────────────────
const VendorCard: React.FC<{
  vendor: typeof vendorDatabase[0];
  onViewProfile: (vendor: typeof vendorDatabase[0]) => void;
}> = ({ vendor, onViewProfile }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#1a2d38] border border-white/8 rounded-xl overflow-hidden group hover:border-white/15 transition-all"
  >
    <div className="relative h-36 overflow-hidden">
      <img
        src={vendor.image}
        alt={vendor.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d38] to-transparent" />
      {vendor.badge && (
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#FF5B04] text-white text-[10px] font-semibold rounded-full">
          {vendor.badge}
        </div>
      )}
      <div className="absolute bottom-2.5 left-3 flex items-center gap-1">
        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
        <span className="text-white text-xs font-semibold">{vendor.rating}</span>
        <span className="text-white/40 text-xs">({vendor.reviews})</span>
      </div>
    </div>

    <div className="p-3">
      <p className="text-white font-semibold text-sm leading-tight line-clamp-1">{vendor.name}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[10px] font-medium px-2 py-0.5 bg-[#075056]/30 text-teal-300 rounded-full">{vendor.category}</span>
      </div>
      <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
        <MapPin className="h-3 w-3 flex-shrink-0" />
        {vendor.location}
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[#FF5B04] text-xs font-semibold">{vendor.price}</span>
        <button
          onClick={() => onViewProfile(vendor)}
          className="px-3 py-1.5 bg-[#FF5B04]/10 hover:bg-[#FF5B04]/20 border border-[#FF5B04]/30 text-[#FF5B04] text-xs font-semibold rounded-lg transition-all"
        >
          View Profile
        </button>
      </div>
    </div>
  </motion.div>
);

// ─── Login Required Modal ───────────────────────────────────────────────────
const LoginRequiredModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onDemo: () => void;
}> = ({ isOpen, onClose, onLogin, onRegister, onDemo }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }}
          exit={{ opacity: 0, scale: 0.92, y: 8 }}
          className="w-full max-w-sm bg-[#16232A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-0">
            <div className="h-10 w-10 rounded-xl bg-[#FF5B04]/15 border border-[#FF5B04]/25 flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#FF5B04]" />
            </div>
            <button onClick={onClose} className="h-7 w-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <X className="h-3.5 w-3.5 text-white/50" />
            </button>
          </div>

          <div className="px-5 py-5">
            <h3 className="text-lg font-bold text-white mt-2">Login Required</h3>
            <p className="text-sm text-white/50 mt-1.5 leading-relaxed">
              Please log in to view full vendor details, portfolios, and contact information.
            </p>

            <div className="flex flex-col gap-2.5 mt-5">
              <button
                onClick={onLogin}
                className="w-full py-2.5 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 flex items-center justify-center gap-2"
              >
                Login <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={onRegister}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[#E4EEF0] font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Register
              </button>
              <button
                onClick={onDemo}
                className="w-full py-2.5 bg-[#075056]/30 hover:bg-[#075056]/50 border border-[#075056]/40 text-[#E4EEF0] font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="h-4 w-4 text-[#FF5B04]" />
                Login as Demo
              </button>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF5B04]/30 to-transparent" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Step 4 ─────────────────────────────────────────────────────────────────
const Step4: React.FC<{
  eventType: string;
  location: string;
  selectedServices: string[];
  onBack: () => void;
  onClose: () => void;
}> = ({ eventType, location, selectedServices, onBack, onClose }) => {
  const [loginRequired, setLoginRequired] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginInitialView, setLoginInitialView] = useState<'login' | 'register' | 'demo-roles'>('login');

  // Filter vendors based on selected services and event type
  const filteredVendors = vendorDatabase.filter(v => {
    const serviceMatch = selectedServices.length === 0 || v.serviceIds.some(sid => selectedServices.includes(sid));
    return serviceMatch;
  });

  const displayVendors = filteredVendors.length > 0 ? filteredVendors : vendorDatabase.slice(0, 4);

  const handleViewProfile = () => {
    setLoginRequired(true);
  };

  const handleLoginClick = (view: 'login' | 'register' | 'demo-roles' = 'login') => {
    setLoginRequired(false);
    setLoginInitialView(view);
    setShowLogin(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-xl font-bold text-white">Recommended Vendors</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-white/40 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location || 'Your area'}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-xs text-white/40">{displayVendors.length} vendors matched</span>
          </div>
        </div>

        {/* Vendor filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedServices.map(sid => {
            const svc = services.find(s => s.id === sid);
            return svc ? (
              <span key={sid} className="px-3 py-1 bg-[#FF5B04]/10 border border-[#FF5B04]/25 text-[#FF5B04] text-xs font-medium rounded-full">
                {svc.label}
              </span>
            ) : null;
          })}
        </div>

        {/* Vendor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
          {displayVendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 } }}
            >
              <VendorCard vendor={vendor} onViewProfile={handleViewProfile} />
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          <button onClick={onBack} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={() => { setLoginInitialView('login'); setShowLogin(true); }}
            className="flex-[2] py-2.5 bg-[#075056] hover:bg-[#075056]/80 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Login to Book <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <LoginRequiredModal
        isOpen={loginRequired}
        onClose={() => setLoginRequired(false)}
        onLogin={() => handleLoginClick('login')}
        onRegister={() => handleLoginClick('register')}
        onDemo={() => handleLoginClick('demo-roles')}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        initialView={loginInitialView}
      />
    </>
  );
};

// ─── Main Modal ────────────────────────────────────────────────────────────
export const PlanningWizardModal: React.FC<PlanningWizardModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState(1);
  const [eventType, setEventType] = useState('');
  const [eventDetails, setEventDetails] = useState<EventDetailsForm>({ eventDate: '', location: '', guestCount: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Lock scroll
  React.useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on open
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEventType('');
      setSelectedServices([]);
    }
  }, [isOpen]);

  const goTo = (s: WizardStep, dir: number) => {
    setDirection(dir);
    setStep(s);
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Step sizing: step 4 is wider
  const isWide = step === 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative bg-[#16232A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-[max-width] duration-300 w-full ${isWide ? 'max-w-2xl' : 'max-w-lg'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#FF5B04] rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Start Planning</p>
                  <p className="text-xs text-white/35">{stepLabels[step - 1]}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-6 pt-5 pb-0">
              <StepProgress current={step} total={4} />
            </div>

            {/* Content */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {step === 1 && (
                    <Step1
                      selected={eventType}
                      onSelect={setEventType}
                      onNext={() => goTo(2, 1)}
                    />
                  )}
                  {step === 2 && (
                    <Step2
                      onBack={() => goTo(1, -1)}
                      onNext={(data) => { setEventDetails(data); goTo(3, 1); }}
                    />
                  )}
                  {step === 3 && (
                    <Step3
                      selected={selectedServices}
                      onToggle={toggleService}
                      onBack={() => goTo(2, -1)}
                      onNext={() => goTo(4, 1)}
                    />
                  )}
                  {step === 4 && (
                    <Step4
                      eventType={eventType}
                      location={eventDetails.location}
                      selectedServices={selectedServices}
                      onBack={() => goTo(3, -1)}
                      onClose={onClose}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer glow */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF5B04]/40 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};