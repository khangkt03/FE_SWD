import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Hero from '../components/Hero';
import Services from '../components/Services';

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
      
    </div>
  );
};

export default Home; 