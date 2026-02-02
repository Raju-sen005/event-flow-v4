import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to the new customer dashboard
    navigate('/customer/dashboard', { replace: true });
  }, [navigate]);

  return null;
};