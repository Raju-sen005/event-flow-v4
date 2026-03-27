import React from 'react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { HeroSection } from '../landing/HeroSection';
import { ServicesSlider } from '../landing/ServicesSlider';
import { HowItWorksSection } from '../landing/HowItWorksSection';
import { VendorsSection } from '../landing/VendorsSection';
import { PlannersSection } from '../landing/PlannersSection';
import { RentalsSection } from '../landing/RentalsSection';
import { SeasonalVendors } from '../landing/SeasonalVendors';
import { PlatformFeatures } from '../landing/PlatformFeatures';
import { TestimonialsSection } from '../landing/TestimonialsSection';
import { EventsGallery } from '../landing/EventsGallery';
import { SecuritySection } from '../landing/SecuritySection';
import { FinalCTA } from '../landing/FinalCTA';
import { LandingFooter } from '../landing/LandingFooter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <LandingNavbar />

      {/* Section 1: Hero + Stats Bar */}
      <HeroSection />

      {/* Section 2: Main Services Slider */}
      <ServicesSlider />

      {/* Section 3: How It Works */}
      <HowItWorksSection />

      {/* Section 4: Top-Rated Vendors */}
      <VendorsSection />

      {/* Section 5: Event Planners */}
      <PlannersSection />

      {/* Section 6: Rental Services */}
      <RentalsSection />

      {/* Section 7: Seasonal / Occasion-Based Vendors */}
      <SeasonalVendors />

      {/* Section 8: Platform Features (Event OS) */}
      <PlatformFeatures />

      {/* Section 9: Trust & Testimonials */}
      <TestimonialsSection />

      {/* Section 10: Real Events Gallery */}
      <EventsGallery />

      {/* Section 11: Security & Trust */}
      <SecuritySection />

      {/* Section 12: Final CTA */}
      <FinalCTA />

      {/* Section 13: Footer */}
      <LandingFooter />
    </div>
  );
};
