import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleViewBookingHistory = () => {
    // Lưu trạng thái tab vào localStorage trước khi chuyển trang
    localStorage.setItem('activeProfileTab', 'bookings');
    navigate('/profile');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pink-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {/* Icon và Tiêu đề */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Đặt lịch thành công!
              </h1>
              <p className="text-gray-600">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
              </p>
            </div>

            {/* Đường phân cách */}
            <div className="border-t border-dashed border-gray-200 my-6"></div>

            {/* Thông tin bổ sung */}
            <div className="space-y-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận lịch hẹn
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  Bạn có thể xem chi tiết đặt lịch trong phần "Lịch sử đặt lịch" ở trang cá nhân
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleViewBookingHistory}
                className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Xem lịch sử đặt lịch
              </button>
              
              <button
                onClick={() => navigate('/services')}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Xem thêm dịch vụ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSuccess; 