import React from 'react';
import { X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

interface LoginGatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginGatingModal: React.FC<LoginGatingModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onOpenChange(false);
    navigate('/login');
  };

  const handleSignup = () => {
    onOpenChange(false);
    navigate('/signup');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 bg-[#FF5B04]/10 rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-[#FF5B04]" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#16232A] mb-3">
                  Login Required
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Please log in to view full vendor details, contact vendors, and save your favorites. 
                  It only takes a minute to create your free account.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleLogin}
                  className="w-full h-12 bg-[#075056] hover:bg-[#075056]/90 text-white font-semibold"
                >
                  Log In
                </Button>
                <Button
                  onClick={handleSignup}
                  className="w-full h-12 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white font-semibold"
                >
                  Create Free Account
                </Button>
              </div>

              {/* Footer text */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Free forever • No credit card required
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
