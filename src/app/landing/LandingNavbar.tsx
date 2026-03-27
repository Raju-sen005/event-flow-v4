import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Menu, X } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { PlanningWizardModal } from "./PlanningWizardModal";
import logo from "../../assests/gogatherhub-logo.png";


export const LandingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "How It Works", id: "how-it-works" },
    { label: "Vendors", id: "vendors" },
    { label: "Planners", id: "planners" },
    { label: "Rentals", id: "rentals" },
    { label: "Features", id: "platform-features" },
  ];

  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    setLoginOpen(true);
  };

  const handlePlanningClick = () => {
    setMobileMenuOpen(false);
    setPlanningOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#16232A]/98 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-[#16232A]"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className=" w-49 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <img src={logo} alt="Go Gather Hub Logo" />
              </div>
              {/* <span className="text-xl font-bold text-white tracking-tight">Go Gather Hub</span> */}
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Login Button — opens Login Modal */}
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors hover:bg-white/8 rounded-lg"
              >
                Login
              </button>

              {/* Start Planning — opens Planning Wizard */}
              <button
                onClick={handlePlanningClick}
                className="px-5 py-2 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-[#FF5B04]/30 flex items-center gap-1.5"
              >
                Start Planning
                <span className="text-white/70">→</span>
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-[#16232A] border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <button
                    onClick={handleLoginClick}
                    className="px-4 py-2.5 text-center border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={handlePlanningClick}
                    className="px-4 py-2.5 text-center bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-sm font-semibold rounded-lg transition-all"
                  >
                    Start Planning →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />

      {/* Planning Wizard Modal */}
      <PlanningWizardModal
        isOpen={planningOpen}
        onClose={() => setPlanningOpen(false)}
      />
    </>
  );
};
