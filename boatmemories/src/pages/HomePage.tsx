import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Pricing />
      <Gallery />
      <Testimonials />
    </div>
  );
};

export default HomePage;
