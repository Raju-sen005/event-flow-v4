import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const { user, verifyEmail } = useAuth();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await verifyEmail(code);
      setSuccess(true);
      setTimeout(() => {
        navigate('/role-selection');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code. Please try again.');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCanResend(false);
      setCountdown(60);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={`We sent a verification code to ${user?.email}`}
    >
      <div className="mb-6">
        <BackButton to="/signup" />
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Email verified successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600 text-center">
              Enter the 6-digit code we sent to your email
            </p>
            
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              disabled={isLoading || success}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LoadingSpinner size="sm" />
                <span>Verifying...</span>
              </div>
            )}
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive the code?
            </p>
            
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Resend in {countdown}s</span>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Sending...
                  </>
                ) : (
                  'Resend Code'
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Check your spam folder if you don't see the email. 
              The code expires in 15 minutes.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};