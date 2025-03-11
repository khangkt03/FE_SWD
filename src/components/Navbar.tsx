import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center focus:outline-none group"
            >
              <img 
                src="/logo.png" 
                alt="PetCenter Logo" 
                className="h-12 w-auto transition-transform group-hover:scale-110"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
                PetCenter
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-rose-500 transition">
              Dịch Vụ
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-rose-500 transition">
              Sản Phẩm
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-500 transition">
              Giới Thiệu
            </Link>
            <button className="text-gray-700 hover:text-rose-500 transition relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <Link
              to="/login"
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Đăng Nhập
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-700 hover:text-rose-500 transition relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-rose-500 transition-colors"
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/services"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dịch Vụ
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản Phẩm
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Giới Thiệu
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng Nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;