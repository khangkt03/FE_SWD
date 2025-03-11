import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 pt-24">
        <h1 className="text-center text-2xl font-bold mb-8">Các dịch vụ chúng tôi cung cấp</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://storage.googleapis.com/a1aa/image/7avEf56eO57rHNVtEyiZhVmwGDB3SpJwqQFxp3F9EZY.jpg"
              alt="A dog getting groomed"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">Spa & Grooming</h2>
              <p className="text-gray-600 mb-4">
                Làm đẹp và thư giãn cho thú cưng với các dịch vụ chuyên nghiệp.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-500 font-bold">300.000đ/lần</span>
                <span className="text-yellow-500">
                  <i className="fas fa-star"></i> 4.7
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex justify-between">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Đặt lịch ngay
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
          {/* Thêm các card khác tương tự */}
        </div>
      </div>
    </>
  );
};

export default Services; 