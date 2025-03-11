import React from 'react';
import { Hotel, Scissors, Dog, Heart } from 'lucide-react';

const services = [
  {
    icon: <Hotel className="h-8 w-8" />,
    title: 'Khách Sạn Thú Cưng',
    description: 'Nơi lưu trú an toàn và thoải mái cho thú cưng khi bạn vắng nhà'
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    title: 'Cắt Tỉa & Spa',
    description: 'Dịch vụ làm đẹp chuyên nghiệp giúp thú cưng luôn sạch sẽ và khỏe mạnh'
  },
  {
    icon: <Dog className="h-8 w-8" />,
    title: 'Huấn Luyện',
    description: 'Các khóa huấn luyện chuyên nghiệp giúp cải thiện hành vi của thú cưng'
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Chăm Sóc Y Tế',
    description: 'Dịch vụ chăm sóc sức khỏe và khám chữa bệnh chuyên nghiệp'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các dịch vụ chăm sóc thú cưng toàn diện, được thiết kế để giữ cho thú cưng của bạn luôn khỏe mạnh và hạnh phúc
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-rose-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 