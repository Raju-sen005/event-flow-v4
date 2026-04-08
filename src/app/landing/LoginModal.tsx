import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import axios from "axios";
import logo from "../../assests/gogatherhub-logo.png";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Briefcase,
  Sparkles,
  Store,
  CalendarCheck,
  UserCog,
  Shield,
  ShieldCheck,
  Info,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // 🔥 add this

// ─── Types ─────────────────────────────────────────────────────────────────
type ModalView =
  | "login"
  | "register"
  | "business-login"
  | "business-register"
  | "demo-roles"
  | "demo-loading";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: ModalView | "demo-success"; // 'demo-success' kept for backward compat → maps to 'demo-roles'
}

interface DemoRoleState {
  title: string;
  path: string;
  accent: string;
}

interface LoginForm {
  email: string;
  password: string;
}
interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface BusinessLoginForm {
  businessEmail: string;
  businessPassword: string;
}
interface BusinessRegisterForm {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  password: string;
  confirmPassword: string;
}

// ─── Demo Role Data ─────────────────────────────────────────────────────────
const demoRoles = [
  {
    id: "customer",
    title: "Customer",
    description: "Plan events, browse vendors, manage guests & payments.",
    icon: User,
    accent: "#FF5B04",
    bgGradient: "from-[#FF5B04]/15 to-[#FF5B04]/5",
    borderIdle: "border-[#FF5B04]/15",
    borderHover: "hover:border-[#FF5B04]/50",
    ring: "ring-[#FF5B04]/25",
    iconBg: "bg-[#FF5B04]/15",
    badge: "Most Popular",
    path: "/customer/dashboard",
  },
  {
    id: "vendor",
    title: "Vendor",
    description: "Manage bids, service listings, earnings & invoices.",
    icon: Store,
    accent: "#075056",
    bgGradient: "from-[#075056]/20 to-[#075056]/5",
    borderIdle: "border-[#075056]/20",
    borderHover: "hover:border-[#075056]/60",
    ring: "ring-[#075056]/25",
    iconBg: "bg-[#075056]/20",
    badge: null,
    path: "/vendor/dashboard",
  },
  {
    id: "event-planner",
    title: "Event Manager",
    description: "Manage events, coordinate vendors and track timelines.",
    icon: CalendarCheck,
    accent: "#8B5CF6",
    bgGradient: "from-purple-500/15 to-purple-500/5",
    borderIdle: "border-purple-500/15",
    borderHover: "hover:border-purple-500/50",
    ring: "ring-purple-500/25",
    iconBg: "bg-purple-500/15",
    badge: null,
    path: "/planner/dashboard",
  },
  {
    id: "freelance-planner",
    title: "Freelancer",
    description: "Explore independent service provider workflows.",
    icon: UserCog,
    accent: "#F59E0B",
    bgGradient: "from-amber-500/15 to-amber-500/5",
    borderIdle: "border-amber-500/15",
    borderHover: "hover:border-amber-500/50",
    ring: "ring-amber-500/25",
    iconBg: "bg-amber-500/15",
    badge: null,
    path: "/vendor/dashboard",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Oversee platform activity, vendors, and disputes.",
    icon: Shield,
    accent: "#3B82F6",
    bgGradient: "from-blue-500/15 to-blue-500/5",
    borderIdle: "border-blue-500/15",
    borderHover: "hover:border-blue-500/50",
    ring: "ring-blue-500/25",
    iconBg: "bg-blue-500/15",
    badge: null,
    path: "/admin/dashboard",
  },
  {
    id: "superadmin",
    title: "Super Admin",
    description: "Full system access — configuration, permissions & reports.",
    icon: ShieldCheck,
    accent: "#EC4899",
    bgGradient: "from-pink-500/15 to-pink-500/5",
    borderIdle: "border-pink-500/15",
    borderHover: "hover:border-pink-500/50",
    ring: "ring-pink-500/25",
    iconBg: "bg-pink-500/15",
    badge: "Full Access",
    path: "/admin/superadmin-dashboard",
  },
] as const;

type DemoRole = (typeof demoRoles)[number];

// ─── Animation Variants ─────────────────────────────────────────────────────
const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.15 } },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

// ─── Shared constants ───────────────────────────────────────────────────────
const businessCategories = ["vendor", "event-planner", "freelance-planner"];

const inputClass =
  "w-full bg-white/5 border border-white/10 text-[#E4EEF0] placeholder-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FF5B04]/60 focus:bg-white/8 transition-all";

// ─── Field wrapper ──────────────────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-[#E4EEF0]/80">{label}</label>
    {children}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1">
        <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
        {error}
      </p>
    )}
  </div>
);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── Login View ─────────────────────────────────────────────────────────────
const LoginView: React.FC<{
  onRegister: () => void;
  onDemo: () => void;
  onBusiness: () => void;
  onClose: () => void;
}> = ({ onRegister, onDemo, onBusiness, onClose }) => {
  const [showPw, setShowPw] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const { login } = useAuth(); // 🔥 add this

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await login(data.email, data.password); // 🔥 use context

      onClose();

      switch (user.role) {
        case "customer":
          nav("/customer/dashboard");
          break;
        case "vendor":
          nav("/vendor/dashboard");
          break;
        case "event-planner":
          nav("/planner/dashboard");
          break;
        default:
          nav("/");
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  // const onSubmit = async (data: LoginForm) => {
  //   try {
  //     const res = await axios.post(`${BASE_URL}/auth/login-v2`, {
  //       email: data.email,
  //       password: data.password,
  //     });

  //     const { token, user } = res.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", JSON.stringify(user));

  //     onClose();

  //     // role based redirect (backend ke according)
  //     switch (user.role) {
  //       case "customer":
  //         nav("/customer/dashboard");
  //         break;
  //       case "vendor":
  //         nav("/vendor/dashboard");
  //         break;
  //       case "event-planner":
  //         nav("/planner/dashboard");
  //         break;
  //       case "freelance-planner":
  //         nav("/freelancer/dashboard");
  //         break;
  //       default:
  //         nav("/");
  //     }
  //   } catch (err: any) {
  //     alert(err?.response?.data?.message || "Login failed");
  //   }
  // };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-sm text-white/50 mt-1">
          Sign in to your Go Gather Hub account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field label="Email Address" error={errors.email?.message}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Login <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/30">or continue with</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Secondary options */}
      <div className="flex flex-col gap-2.5">
        {/* Login as Demo — now opens role picker */}
        {/* <button
          onClick={onDemo}
          className="group w-full py-2.5 bg-gradient-to-r from-[#FF5B04]/15 to-[#075056]/15 hover:from-[#FF5B04]/25 hover:to-[#075056]/25 border border-[#FF5B04]/25 hover:border-[#FF5B04]/45 text-[#E4EEF0] font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Sparkles className="h-4 w-4 text-[#FF5B04] group-hover:scale-110 transition-transform" />
          <span>Login as Demo</span>
          <span className="ml-1 px-1.5 py-0.5 bg-[#FF5B04]/20 text-[#FF5B04] text-[10px] font-semibold rounded-full">6 roles</span>
        </button> */}

        {/* Login as Business */}
        <button
          onClick={onBusiness}
          className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#E4EEF0] font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Briefcase className="h-4 w-4 text-white/50" />
          Login as Business
        </button>
      </div>

      <p className="text-center text-sm text-white/40">
        Don't have an account?{" "}
        <button
          onClick={onRegister}
          className="text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium transition-colors"
        >
          Register Now
        </button>
      </p>
    </div>
  );
};

// ─── Demo Role Card ─────────────────────────────────────────────────────────
const DemoRoleCard: React.FC<{
  role: DemoRole;
  isLoading: boolean;
  onSelect: (role: DemoRole) => void;
}> = ({ role, isLoading, onSelect }) => {
  const Icon = role.icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col bg-gradient-to-br ${role.bgGradient} border ${role.borderIdle} ${role.borderHover} rounded-xl p-4 transition-all cursor-pointer group`}
      onClick={() => !isLoading && onSelect(role)}
    >
      {/* Badge */}
      {role.badge && (
        <div
          className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-semibold rounded-full"
          style={{ backgroundColor: `${role.accent}25`, color: role.accent }}
        >
          {role.badge}
        </div>
      )}

      {/* Icon */}
      <div
        className={`h-10 w-10 rounded-xl ${role.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
      >
        <Icon className="h-5 w-5" style={{ color: role.accent }} />
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-white mb-1 leading-tight">
        {role.title}
      </p>

      {/* Description */}
      <p className="text-xs text-white/45 leading-relaxed flex-1 mb-4">
        {role.description}
      </p>

      {/* Login button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isLoading) onSelect(role);
        }}
        disabled={isLoading}
        className="w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-60"
        style={{
          backgroundColor: `${role.accent}20`,
          color: role.accent,
          border: `1px solid ${role.accent}35`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            `${role.accent}35`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            `${role.accent}20`;
        }}
      >
        {isLoading ? (
          <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Login as {role.title}
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </motion.div>
  );
};

// ─── Demo Roles View ───────��────────────────────────────────────────────────
const DemoRolesView: React.FC<{
  onBack: () => void;
  onSelectRole: (role: DemoRole) => void;
}> = ({ onBack, onSelectRole }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSelect = async (role: DemoRole) => {
    if (loadingId) return;

    try {
      setLoadingId(role.id);

      const res = await axios.post("/auth/demo-login", {
        role: role.id,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onSelectRole(role);
    } catch (err) {
      alert("Demo login failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4 text-white/60" />
        </button>
        <div>
          {/* <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#FF5B04]" />
            Login as Demo
          </h2> */}
          <p className="text-xs text-white/40 mt-0.5">
            Choose a role to explore the platform
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
        <div className="h-7 w-7 rounded-lg bg-[#FF5B04]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="h-3.5 w-3.5 text-[#FF5B04]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#E4EEF0]/80">
            No sign-up required
          </p>
          <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
            Each demo role uses a predefined account. Data is read-only and
            resets daily.
          </p>
        </div>
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-2 gap-3">
        {demoRoles.map((role) => (
          <DemoRoleCard
            key={role.id}
            role={role}
            isLoading={loadingId === role.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <div className="h-px flex-1 bg-white/8" />
        <p className="text-xs text-white/25 px-2">6 demo roles available</p>
        <div className="h-px flex-1 bg-white/8" />
      </div>
    </div>
  );
};

// ─── Demo Loading View ──────────────────────────────────────────────────────
const DemoLoadingView: React.FC<{
  role: DemoRoleState;
  onClose: () => void;
}> = ({ role, onClose }) => {
  const nav = useNavigate();

  React.useEffect(() => {
    const t = setTimeout(() => {
      onClose();
      nav(role.path);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      {/* Animated icon */}
      <div className="relative">
        <div
          className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-xl"
          style={{
            backgroundColor: `${role.accent}20`,
            border: `1px solid ${role.accent}35`,
          }}
        >
          <Zap className="h-9 w-9" style={{ color: role.accent }} />
        </div>
        {/* Orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-2xl border-2 border-dashed"
          style={{ borderColor: `${role.accent}40` }}
        />
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-green-500 border-2 border-[#16232A] flex items-center justify-center"
        >
          <CheckCircle className="h-4 w-4 text-white" />
        </motion.div>
      </div>

      {/* Text */}
      <div className="text-center space-y-1.5">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-bold text-white"
        >
          Logging in as {role.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-white/45"
        >
          Loading your demo dashboard…
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: role.accent }}
        />
      </div>

      {/* Role pill */}
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
        style={{
          backgroundColor: `${role.accent}15`,
          color: role.accent,
          border: `1px solid ${role.accent}25`,
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: role.accent }}
        />
        Demo · {role.title} Mode
      </div>
    </div>
  );
};

// ─── Register View ───────────────────────────────────────────────────────────
const RegisterView: React.FC<{ onBack: () => void; onClose: () => void }> = ({
  onBack,
  onClose,
}) => {
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();
  const pw = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register-v2`, {
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "customer",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess(true);

      setTimeout(() => {
        onClose();
        nav("/customer/dashboard");
      }, 1500);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">Account Created!</p>
          <p className="text-sm text-white/50 mt-1">
            Redirecting you to setup your profile…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-white/60" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Create Account</h2>
          <p className="text-xs text-white/40">
            Join thousands of event creators
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        <Field label="Full Name" error={errors.fullName?.message}>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="John Smith"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <Field label="Email Address" error={errors.email?.message}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
              type={showPw ? "text" : "password"}
              placeholder="Min 8 characters"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        <Field label="Confirm Password" error={errors.confirmPassword?.message}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (v) => v === pw || "Passwords do not match",
              })}
              type={showCPw ? "text" : "password"}
              placeholder="Repeat password"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowCPw(!showCPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showCPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 mt-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// ─── Business Login View ────────────────────────────────────────────────────
const BusinessLoginView: React.FC<{
  onBack: () => void;
  onRegister: () => void;
  onClose: () => void;
}> = ({ onBack, onRegister, onClose }) => {
  const [showPw, setShowPw] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessLoginForm>();

  const onSubmit = async (data: BusinessLoginForm) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email: data.businessEmail,
        password: data.businessPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onClose();
      nav("/vendor/dashboard");
    } catch (err: any) {
      alert("Business login failed");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-white/60" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Business Login</h2>
          <p className="text-xs text-white/40">
            Access your vendor or business dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 bg-[#075056]/20 border border-[#075056]/30 rounded-xl px-4 py-3">
        <div className="h-9 w-9 rounded-lg bg-[#075056]/40 flex items-center justify-center flex-shrink-0">
          <Briefcase className="h-4 w-4 text-[#E4EEF0]/80" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#E4EEF0]">
            Vendor & Business Portal
          </p>
          <p className="text-xs text-white/40">
            Manage your services, bids & bookings
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field label="Business Email" error={errors.businessEmail?.message}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("businessEmail", {
                required: "Business email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              type="email"
              placeholder="business@company.com"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <Field label="Password" error={errors.businessPassword?.message}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("businessPassword", {
                required: "Password is required",
              })}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-[#075056] hover:bg-[#075056]/80 text-white font-semibold rounded-xl transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Login as Business <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/40">
        No business account?{" "}
        <button
          onClick={onRegister}
          className="text-[#FF5B04] hover:text-[#FF5B04]/80 font-medium transition-colors"
        >
          Register as a Business
        </button>
      </p>
    </div>
  );
};

// ─── Business Register View ──────────────────────────────────────────────────
const BusinessRegisterView: React.FC<{
  onBack: () => void;
  onClose: () => void;
}> = ({ onBack, onClose }) => {
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BusinessRegisterForm>();
  const pw = watch("password");

  const onSubmit = async (data: BusinessRegisterForm) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name: data.ownerName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "vendor",
        businessName: data.businessName,
        phone: data.phone,
        category: data.category,
      });

      localStorage.setItem("token", res.data.token);

      setSuccess(true);

      setTimeout(() => {
        onClose();
        nav("/vendor/dashboard");
      }, 1500);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Business register failed");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">
            Business Account Created!
          </p>
          <p className="text-sm text-white/50 mt-1">
            Redirecting to vendor onboarding…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-white/60" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Register as Business</h2>
          <p className="text-xs text-white/40">
            Create your vendor profile and start bidding
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Field label="Business Name" error={errors.businessName?.message}>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              placeholder="Elegant Events Co."
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <Field label="Owner Name" error={errors.ownerName?.message}>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              {...register("ownerName", { required: "Owner name is required" })}
              placeholder="Jane Doe"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Email" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid",
                  },
                })}
                type="email"
                placeholder="email@biz.com"
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>
          <Field label="Phone Number" error={errors.phone?.message}>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                {...register("phone", {
                  required: "Phone required",
                  pattern: {
                    value: /^\+?[\d\s\-()]{8,}$/,
                    message: "Invalid phone",
                  },
                })}
                placeholder="+1 234 567 8900"
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>
        </div>

        <Field label="Partner Category" error={errors.category?.message}>
          <select
            {...register("category", { required: "Select a category" })}
            className={`${inputClass} bg-[#1a2d38] text-white`}
          >
            <option value="" className="text-black">
              Select category…
            </option>

            {businessCategories.map((c) => (
              <option key={c} value={c} className="text-black">
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                {...register("password", {
                  required: "Required",
                  minLength: { value: 8, message: "Min 8 chars" },
                })}
                type={showPw ? "text" : "password"}
                placeholder="Min 8 chars"
                className={`${inputClass} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>
          <Field
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (v) => v === pw || "No match",
                })}
                type={showCPw ? "text" : "password"}
                placeholder="Repeat"
                className={`${inputClass} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowCPw(!showCPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showCPw ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 mt-1 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF5B04]/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Business Account <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// ─── Main Modal ─────────────────────────────────────────────────────────────
export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  initialView = "login",
}) => {
  // Normalize 'demo-success' (backward compat) → 'demo-roles'
  const resolveInitial = (v: string): ModalView => {
    if (v === "demo-success") return "demo-roles";
    return v as ModalView;
  };

  const [view, setView] = useState<ModalView>(resolveInitial(initialView));
  const [direction, setDirection] = useState(1);
  const [demoRole, setDemoRole] = useState<DemoRoleState | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setView(resolveInitial(initialView));
      setDemoRole(null);
    }
  }, [isOpen, initialView]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goTo = (next: ModalView, dir = 1) => {
    setDirection(dir);
    setView(next);
  };

  const handleRoleSelect = (role: DemoRole) => {
    setDemoRole({ title: role.title, path: role.path, accent: role.accent });
    goTo("demo-loading");
  };

  const isWide = view === "business-register" || view === "demo-roles";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative bg-[#16232A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full transition-[max-width] duration-300 ${isWide ? "max-w-lg" : "max-w-md"}`}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <div className="flex items-center gap-2">
                <div className="h-17 w-39 rounded-lg flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Go Gather Hub"
                    style={{ maxWidth: "515%", height: "30px" }}
                  />
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            {/* Content area */}
            <div className="px-6 py-6 max-h-[88vh] overflow-y-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={view}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {view === "login" && (
                    <LoginView
                      onRegister={() => goTo("register")}
                      onDemo={() => goTo("demo-roles")}
                      onBusiness={() => goTo("business-login")}
                      onClose={onClose}
                    />
                  )}
                  {view === "register" && (
                    <RegisterView
                      onBack={() => goTo("login", -1)}
                      onClose={onClose}
                    />
                  )}
                  {view === "business-login" && (
                    <BusinessLoginView
                      onBack={() => goTo("login", -1)}
                      onRegister={() => goTo("business-register")}
                      onClose={onClose}
                    />
                  )}
                  {view === "business-register" && (
                    <BusinessRegisterView
                      onBack={() => goTo("business-login", -1)}
                      onClose={onClose}
                    />
                  )}
                  {view === "demo-roles" && (
                    <DemoRolesView
                      onBack={() => goTo("login", -1)}
                      onSelectRole={handleRoleSelect}
                    />
                  )}
                  {view === "demo-loading" && demoRole && (
                    <DemoLoadingView role={demoRole} onClose={onClose} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF5B04]/40 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
