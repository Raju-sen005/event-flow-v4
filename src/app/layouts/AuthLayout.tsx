import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, icon }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Logo in top left */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">✦</span>
          </div>
          <span className="text-gray-900 font-semibold text-lg">EventFlow</span>
        </div>
      </div>

      {/* Cloud-like decorative elements at bottom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(255, 255, 255, 0.4)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-48 opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(255, 255, 255, 0.6)" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,154.7C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Clean white card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-10">
          <div className="mb-8">
            {/* Icon circle */}
            {icon && (
              <div className="flex justify-center mb-6">
                <div className="h-14 w-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                  {icon}
                </div>
              </div>
            )}
            
            {title && (
              <h2 className="text-center text-gray-900 mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-center text-gray-500 text-sm">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};