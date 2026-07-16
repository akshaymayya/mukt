'use client';
import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import FeaturesSection from '../sections/FeaturesSection';
import DashboardShowcaseSection from '../sections/DashboardShowcaseSection';
import EarlyAccessSection from '../sections/EarlyAccessSection';
import ContactSection from '../sections/ContactSection';

export default function LandingPage() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-primary selection:bg-primary/20 font-sans">
      <HeroSection onScroll={scrollTo} />
      <AboutSection />
      <FeaturesSection onScroll={scrollTo} />
      <DashboardShowcaseSection />
      <EarlyAccessSection />
      <ContactSection />
    </div>
  );
}
