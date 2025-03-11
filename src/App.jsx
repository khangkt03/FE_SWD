import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PetSlider from './components/PetSlider';
import Hero from './components/Hero';
import ServicesSection from './components/Services';
import Services from './pages/Services';
import Features from './components/Features';
import FeaturedProducts from './components/FeaturedProducts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function HomePage() {
  return (
    <>
      <Navbar />
      <PetSlider />
      <Hero />
      <FeaturedProducts />
      <ServicesSection />
      <Features />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 