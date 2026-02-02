import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, Mail, Lock, User, Briefcase, Users, Calendar, Check } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { motion } from 'motion/react';

interface BusinessRegisterFormData {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type BusinessType = 'vendor' | 'event-planner' | 'freelance-planner';

export const BusinessRegister: React.FC = () => {
  const navigate = useNavigate();
  const { signup, setUserRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<BusinessRegisterFormData>();

  const password = watch('password');

  const businessTypes = [
    {
      id: 'vendor' as BusinessType,
      title: 'Vendor',
      description: 'Provide event services like catering, photography, venues, and more',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500'
    },
    {
      id: 'event-planner' as BusinessType,
      title: 'Event Planner',
      description: 'Professional event planning agency managing multiple events',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500'
    },
    {
      id: 'freelance-planner' as BusinessType,
      title: 'Freelance Event Planner',
      description: 'Independent event planner working on individual projects',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-500'
    }
  ];

  const onSubmit = async (data: BusinessRegisterFormData) => {
    if (!selectedBusinessType) {
      setError('Please select a business type');
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await signup(data.businessName, data.email, data.password);
      
      // Set the role based on business type
      if (selectedBusinessType === 'vendor') {
        setUserRole('vendor');
        navigate('/vendor-onboarding');
      } else if (selectedBusinessType === 'event-planner' || selectedBusinessType === 'freelance-planner') {
        // Route to planner onboarding
        setUserRole('planner');
        navigate('/planner-onboarding');
      } else {
        setUserRole('vendor');
        navigate('/vendor-onboarding');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register as a Business"
      subtitle="Join our network of event professionals"
      icon={<Briefcase className="h-6 w-6 text-gray-600" />}
    >
      <div className="mb-4">
        <BackButton to="/business/login" />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Business Type Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Select Business Type <span className="text-red-500">*</span>
          </label>
          {businessTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                type="button"
                onClick={() => setSelectedBusinessType(type.id)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all text-left
                  ${selectedBusinessType === type.id
                    ? `${type.borderColor} border-opacity-100 ${type.bgColor}`
                    : `border-gray-200 ${type.hoverBorder} bg-white`
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    h-10 w-10 rounded-lg bg-gradient-to-br ${type.color} 
                    flex items-center justify-center flex-shrink-0
                  `}>
                    <type.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{type.title}</h3>
                      {selectedBusinessType === type.id && (
                        <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Registration Fields */}
        <div className="space-y-3 pt-2">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="businessName"
                type="text"
                placeholder="Business Name / Your Name"
                className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                {...register('businessName', {
                  required: 'Business name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />
            </div>
            {errors.businessName && (
              <p className="text-sm text-red-600">{errors.businessName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Business Email"
                className="pl-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="pl-12 pr-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="pl-12 pr-12 h-12 bg-gray-50 border-0 rounded-xl placeholder:text-gray-400"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl mt-6"
          disabled={isLoading || !selectedBusinessType}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating Account...
            </>
          ) : (
            'Create Business Account'
          )}
        </Button>

        <div className="pt-4 text-center">
          <p className="text-gray-500 text-sm">
            Already have a business account?{' '}
            <Link to="/business/login" className="text-gray-900 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};