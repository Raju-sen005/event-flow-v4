import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Briefcase, Calendar, Users, AlertCircle, CheckCircle2, User, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { LoadingSpinner } from './LoadingSpinner';
import { VisuallyHidden } from './ui/visually-hidden';

interface BusinessLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type BusinessRole = 'vendor' | 'event-planner' | 'freelance-planner';
type TabType = 'login' | 'register';

export const BusinessLoginModal: React.FC<BusinessLoginModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { login, demoLogin, loginWithGoogle, signupBusiness } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [selectedRole, setSelectedRole] = useState<BusinessRole | null>(null);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerBusinessName, setRegisterBusinessName] = useState('');

  const businessRoles = [
    {
      id: 'vendor' as BusinessRole,
      title: 'Vendor',
      description: 'Provide services for events',
      icon: Briefcase,
      color: 'border-[#075056] hover:bg-[#075056]/5',
      activeColor: 'border-[#075056] bg-[#075056]/10'
    },
    {
      id: 'event-planner' as BusinessRole,
      title: 'Event Planner',
      description: 'Plan and manage events',
      icon: Calendar,
      color: 'border-[#FF5B04] hover:bg-[#FF5B04]/5',
      activeColor: 'border-[#FF5B04] bg-[#FF5B04]/10'
    },
    {
      id: 'freelance-planner' as BusinessRole,
      title: 'Freelance Planner',
      description: 'Independent event planning',
      icon: Users,
      color: 'border-[#16232A] hover:bg-[#16232A]/5',
      activeColor: 'border-[#16232A] bg-[#16232A]/10'
    }
  ];

  const passwordRequirements = [
    { met: registerPassword.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(registerPassword), text: 'One uppercase letter' },
    { met: /[a-z]/.test(registerPassword), text: 'One lowercase letter' },
    { met: /[0-9]/.test(registerPassword), text: 'One number' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(loginEmail, loginPassword);
      onOpenChange(false);
      navigate('/vendor/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      onOpenChange(false);
      navigate('/vendor/dashboard');
    } catch (error) {
      setError('Failed to sign in with Google');
    } finally {
      setSocialLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin('vendor');
    onOpenChange(false);
    navigate('/vendor/dashboard');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a business role to continue.');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    if (!allRequirementsMet) {
      setError('Please meet all password requirements.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signupBusiness(registerName,
        registerEmail,
        registerPassword,
        registerConfirmPassword,
        selectedRole,
        registerBusinessName);

      const dashboardRoutes: Record<BusinessRole, string> = {
        'vendor': '/vendor/dashboard',
        'event-planner': '/vendor/dashboard',
        'freelance-planner': '/vendor/dashboard'
      };

      onOpenChange(false);
      navigate(dashboardRoutes[selectedRole]);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!selectedRole) {
      setError('Please select a business role first.');
      return;
    }

    setSocialLoading(true);
    setError('');
    try {
      await loginWithGoogle();

      const dashboardRoutes: Record<BusinessRole, string> = {
        'vendor': '/vendor/dashboard',
        'event-planner': '/vendor/dashboard',
        'freelance-planner': '/vendor/dashboard'
      };

      onOpenChange(false);
      navigate(dashboardRoutes[selectedRole]);
    } catch (error) {
      setError('Failed to sign up with Google');
    } finally {
      setSocialLoading(false);
    }
  };

  const resetForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterBusinessName('');
    setSelectedRole(null);
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        resetForm();
        setActiveTab('login');
      }
    }}>
      <DialogContent className="sm:max-w-md p-0 bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-h-[90vh]">
        <VisuallyHidden>
          <DialogTitle>
            {activeTab === 'login' ? 'Business Login' : 'Create Business Account'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login' ? 'Sign in to access your dashboard' : 'Join EventFlow and grow your business'}
          </DialogDescription>
        </VisuallyHidden>

        <div className="p-10">
          {/* Header with Icon */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-14 w-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-gray-600" />
              </div>
            </div>

            <h2 className="text-center text-gray-900 mb-2">
              {activeTab === 'login' ? 'Business Login' : 'Create Business Account'}
            </h2>
            <p className="text-center text-gray-500 text-sm">
              {activeTab === 'login' ? 'Sign in to access your dashboard' : 'Join EventFlow and grow your business'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2.5 font-medium text-sm rounded-lg transition-colors ${activeTab === 'login'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-2.5 font-medium text-sm rounded-lg transition-colors ${activeTab === 'register'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Tab */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email"
                    className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="pl-12 pr-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl mt-6"
                disabled={isLoading || socialLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-gray-400">Or sign in with</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={socialLoading || isLoading}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  disabled={socialLoading || isLoading}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                <button
                  type="button"
                  disabled={socialLoading || isLoading}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </button>
              </div>

              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Demo as a Business →
                </button>
              </div>
            </form>
          )}

          {/* Register Tab */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">Select Business Role *</label>
                <div className="grid gap-3">
                  {businessRoles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-xl transition-all text-left ${selectedRole === role.id
                          ? role.activeColor
                          : role.color
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedRole === role.id ? 'bg-white/50' : 'bg-gray-50'
                          }`}>
                          <role.icon className="h-5 w-5 text-[#16232A]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#16232A]">{role.title}</h4>
                          <p className="text-xs text-gray-600">{role.description}</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedRole === role.id
                            ? 'border-gray-900 bg-gray-900'
                            : 'border-gray-300'
                          }`}>
                          {selectedRole === role.id && (
                            <div className="h-2 w-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Full Name"
                    className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    value={registerBusinessName}
                    onChange={(e) => setRegisterBusinessName(e.target.value)}
                    placeholder="Business Name"
                    className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="Email"
                    className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Password"
                    className="pl-12 pr-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {registerPassword && (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="pl-12 pr-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !selectedRole || socialLoading}
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl mt-6"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={socialLoading || isLoading || !selectedRole}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  disabled={socialLoading || isLoading || !selectedRole}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                <button
                  type="button"
                  disabled={socialLoading || isLoading || !selectedRole}
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};