import React from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-rose-50 to-rose-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Chăm Sóc Thú Cưng Của Bạn Tận Tâm
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kết nối với các dịch vụ chăm sóc thú cưng uy tín và mua sắm các sản phẩm chất lượng tại một nơi
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border rounded-lg px-4 py-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm dịch vụ hoặc sản phẩm"
                  className="ml-2 w-full outline-none"
                />
              </div>
              <div className="flex items-center border rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Địa điểm"
                  className="ml-2 w-full outline-none"
                />
              </div>
              <button className="bg-rose-500 text-white px-8 py-2 rounded-lg hover:bg-rose-600 transition">
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 