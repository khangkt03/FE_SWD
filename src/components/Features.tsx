import React from 'react';
import { Shield, Clock, Star, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'An Toàn & Đáng Tin Cậy',
    description: 'Tất cả các đối tác của chúng tôi đều được kiểm tra và xác minh kỹ lưỡng'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Đặt Lịch Dễ Dàng',
    description: 'Đặt lịch nhanh chóng và theo dõi hoạt động của thú cưng theo thời gian thực'
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Dịch Vụ Chất Lượng',
    description: 'Cam kết mang đến trải nghiệm tốt nhất cho thú cưng của bạn'
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn mọi lúc'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại Sao Chọn FurEver?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến dịch vụ chăm sóc thú cưng tốt nhất với những ưu điểm vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-rose-100 rounded-full p-3 inline-block text-rose-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;