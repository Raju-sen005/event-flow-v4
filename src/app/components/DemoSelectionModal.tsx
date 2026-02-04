import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../context/AuthContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { VisuallyHidden } from './ui/visually-hidden';
import { LoadingSpinner } from './LoadingSpinner';

type TabType = 'login' | 'register';

interface CustomerAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoSelectionModal: React.FC<CustomerAuthModalProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const { login, signupCustomer } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // signup
  const [name, setName] = useState('');

  const reset = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setShowPassword(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      onOpenChange(false);
      navigate('/customer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signupCustomer(name, email, password);
      onOpenChange(false);
      navigate("/customer/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          reset();
          setActiveTab('login');
        }
      }}
    >
      <DialogContent className="sm:max-w-md p-0 bg-white shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Customer Authentication</DialogTitle>
          <DialogDescription>Login or create account</DialogDescription>
        </VisuallyHidden>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <User className="h-7 w-7 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold text-[#16232A]">
              {activeTab === 'login' ? 'Customer Login' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeTab === 'login'
                ? 'Login to manage your events'
                : 'Sign up to start planning events'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['login', 'register'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  reset();
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === tab
                    ? 'bg-[#16232A] text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {tab === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-12 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="pl-12 pr-12 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#FF5B04] hover:bg-[#FF5B04]/90"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : 'Login'}
              </Button>
            </form>
          )}

          {/* REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-12 h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-12 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-12 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#16232A] hover:bg-[#16232A]/90"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
