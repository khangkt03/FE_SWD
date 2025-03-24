import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-rose-50 to-rose-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Chăm Sóc Thú Cưng Của Bạn Tận Tâm
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Kết nối với các dịch vụ chăm sóc thú cưng uy tín và chất lượng tại một nơi
          </p>
          
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium hover:bg-rose-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Xem thêm dịch vụ
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 