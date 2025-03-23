import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <img 
              src="/PetCenterLogos.png" 
              alt="PetCenter Logo" 
              className="h-32 w-auto" 
            />
          </div>

          {/* Hỗ trợ trực tuyến */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Hỗ trợ trực tuyến</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-gray-600 hover:text-rose-500">
                  Trung tâm hỗ trợ khách hàng
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-rose-500">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-600 hover:text-rose-500">
                  Trở thành thành viên của của hàng
                </Link>
              </li>
              <li>
                <a href="mailto:petcenter@gmail.com" className="text-gray-600 hover:text-rose-500">
                  petcenter@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Mạng xã hội</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-rose-500">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-rose-500">
                  Chính sách giao hàng và đổi trả
                </Link>
              </li>
              <li>
                <Link to="/purchase" className="text-gray-600 hover:text-rose-500">
                  Chính sách mua hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2024 PetCenter. Tất cả các quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 