import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/PetCenterLogos.png" 
                alt="PetCenter Logo" 
                className="h-24 w-24 py-1"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-700 hover:text-rose-500 transition text-base">
              Dịch Vụ
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-rose-500 transition text-base">
              Sản Phẩm
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-500 transition text-base">
              Giới Thiệu
            </Link>
            <button className="text-gray-700 hover:text-rose-500 transition relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-rose-500 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      {user.userName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <span className="hidden md:block">{user.userName || user.email}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Trang cá nhân
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Đăng Nhập
                </Link>
              )}
            </div>
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dịch Vụ
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản Phẩm
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Giới Thiệu
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-gray-50"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-rose-500 text-white hover:bg-rose-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng Nhập
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 