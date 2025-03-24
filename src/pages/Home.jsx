import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PetSlider from '../components/PetSlider';
import Features from '../components/Features';
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />
      
      {/* Partners Section  */}
      <Partners />
      
      <main className="min-h-screen">
        <PetSlider />
        <Features />
        <ServicesSection />
      </main>
    </div>
  );
};

export default Home; 