// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Auth Context for managing user authentication and session state
// export type UserRole = 'customer' | 'vendor' | 'planner' | 'admin' | 'super-admin';

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   isVerified: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isDemo: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   verifyEmail: (code: string) => Promise<void>;
//   setUserRole: (role: UserRole) => void;
//   completeOnboarding: (data: any) => void;
//   loginWithGoogle: () => Promise<void>;
//   loginWithLinkedIn: () => Promise<void>;
//   demoLogin: (role: UserRole) => void;
//   resetPassword: (email: string) => Promise<void>;
//   updatePassword: (token: string, password: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isDemo, setIsDemo] = useState(false);

//   const login = async (email: string, password: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Mock user data
//     setUser({
//       id: '1',
//       email,
//       name: 'John Doe',
//       role: 'customer',
//       isVerified: true,
//     });
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     setUser({
//       id: '1',
//       email,
//       name,
//       role: 'customer',
//       isVerified: false,
//     });
//   };

//   const logout = () => {
//     setUser(null);
//     setIsDemo(false);
//   };

//   const verifyEmail = async (code: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     if (user) {
//       setUser({ ...user, isVerified: true });
//     }
//   };

//   const setUserRole = (role: UserRole) => {
//     if (user) {
//       setUser({ ...user, role });
//     }
//   };

//   const completeOnboarding = (data: any) => {
//     console.log('Onboarding data:', data);
//   };

//   const loginWithGoogle = async () => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setUser({
//       id: '1',
//       email: 'user@gmail.com',
//       name: 'Google User',
//       role: 'customer',
//       isVerified: true,
//     });
//   };

//   const loginWithLinkedIn = async () => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setUser({
//       id: '1',
//       email: 'user@linkedin.com',
//       name: 'LinkedIn User',
//       role: 'customer',
//       isVerified: true,
//     });
//   };

//   const demoLogin = (role: UserRole) => {
//     setIsDemo(true);
//     setUser({
//       id: 'demo',
//       email: `demo-${role}@eventmanager.com`,
//       name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
//       role,
//       isVerified: true,
//     });
//   };

//   const resetPassword = async (email: string) => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   };

//   const updatePassword = async (token: string, password: string) => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isDemo,
//         login,
//         signup,
//         logout,
//         verifyEmail,
//         setUserRole,
//         completeOnboarding,
//         loginWithGoogle,
//         loginWithLinkedIn,
//         demoLogin,
//         resetPassword,
//         updatePassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

export type UserRole =
  | "customer"
  | "vendor"
  | "event-planner"
  | "freelance-planner"
  | "admin"
  | "super-admin";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string | null; // 🔥 FIX
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;

  signupCustomer: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;

  signupBusiness: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole,
    businessName: string,
  ) => Promise<void>;

  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<any>(null);

  const updateUser = (newUserData: any) => {
    setUser((prev: any) => {
      const updated = {
        ...prev,
        ...newUserData,
      };

      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Auto login on refresh
  // useEffect(() => {
  //   const initAuth = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;

  //       const { data } = await api.get("/customer/profile");
  //       setUser(data);
  //     } catch {
  //       localStorage.removeItem("token");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   initAuth();
  // }, []);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 🔑 LOGIN
  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // ⭐ ADD THIS

    setUser(data.user);
    return data.user; // ⭐ IMPORTANT
  };

  // 👤 CUSTOMER REGISTER (SIMPLE)
  const signupCustomer = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword: password,
      role: "customer",
      businessName: "N/A",
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  // 🏢 BUSINESS REGISTER (ADVANCED)
  const signupBusiness = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole,
    businessName: string,
  ) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
      role,
      businessName,
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 🔥 ADD THIS
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signupCustomer,
        signupBusiness,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
