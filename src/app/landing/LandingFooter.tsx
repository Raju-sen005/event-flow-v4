import React from "react";
import { Calendar, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assests/gogatherhub-logo.png";

const footerLinks = {
  "For Customers": [
    { label: "Browse Vendors", to: "/customer/global-vendors" },
    { label: "Event Planners", to: "/customer/event-planners" },
    { label: "Rental Services", to: "/customer/rental-services" },
    { label: "Guest Management", to: "/customer/global-guests" },
    { label: "Event Invitations", to: "/customer/invitations" },
    { label: "Create Your Event", to: "/customer/events/create" },
  ],
  "For Vendors": [
    { label: "Join as Vendor", to: "/business/register" },
    { label: "Vendor Dashboard", to: "/vendor/dashboard" },
    { label: "Post Requirements", to: "/vendor/requirements" },
    { label: "Manage Bids", to: "/vendor/bids" },
    { label: "Vendor Ads", to: "/vendor/ads" },
    { label: "Vendor Profile", to: "/vendor/profile" },
  ],
  "For Planners": [
    { label: "Become a Planner", to: "/planner-onboarding" },
    { label: "Planner Dashboard", to: "/planner/dashboard" },
    { label: "Manage Events", to: "/planner/events" },
    { label: "Planner Payments", to: "/planner/payments" },
    { label: "Planner Attendance", to: "/planner/attendance" },
  ],
  "Rental Policies": [
    { label: "How Rentals Work", to: "/customer/rental-services" },
    { label: "Deposit Policy", to: "/customer/rental-services" },
    { label: "Return Policy", to: "/customer/rental-services" },
    { label: "Damage Waiver", to: "/customer/rental-services" },
    { label: "Cancellation Policy", to: "/customer/rental-services" },
  ],
  Support: [
    { label: "Help Center", to: "/customer/support" },
    { label: "Contact Us", to: "/customer/support" },
    { label: "Dispute Resolution", to: "/customer/support" },
    { label: "Report an Issue", to: "/customer/support" },
    { label: "Community Forum", to: "/customer/support" },
  ],
  Company: [
    { label: "About GoGatherHub", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Press", to: "/" },
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#16232A] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-49 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <img src={logo} alt="Go Gather Hub Logo" />
              </div>
              {/* <span className="text-xl font-bold">Go Gather Hub</span> */}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              India's most trusted event management & vendor marketplace
              platform. Plan, manage, and celebrate.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Mail className="h-3.5 w-3.5" />
                <span>hello@eventflow.app</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Phone className="h-3.5 w-3.5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <MapPin className="h-3.5 w-3.5" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-9 w-9 bg-white/5 hover:bg-[#FF5B04] border border-white/10 hover:border-[#FF5B04] rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/40 hover:text-[#FF5B04] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter banner */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h4 className="font-semibold text-white mb-1">Stay Updated</h4>
              <p className="text-white/40 text-sm">
                Get the latest vendor deals, event tips & platform updates.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 px-4 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5B04]/50 focus:bg-white/10 transition-all w-56"
              />
              <button className="h-10 px-4 bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white text-sm font-semibold rounded-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2026 GoGatherHub Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className="text-white/30 hover:text-[#FF5B04] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-white/30 hover:text-[#FF5B04] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-white/30 hover:text-[#FF5B04] transition-colors"
              >
                Cookie Policy
              </Link>
              <a
                href="#"
                className="text-white/30 hover:text-[#FF5B04] transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
