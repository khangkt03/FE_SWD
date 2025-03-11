import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const serviceDetails = {
    title: "Khách sạn thú cưng",
    image: "https://storage.googleapis.com/a1aa/image/rOEND5-OWAPWw_LpNxeE3SFXomwobFBcX4z5got8ScA.jpg",
    description: "Chăm sóc tận tâm, không gian rộng rãi và thoải mái cho thú cưng của bạn. Chúng tôi cung cấp dịch vụ chăm sóc 24/7 với đội ngũ nhân viên chuyên nghiệp và yêu thương thú cưng.",
    price: "500.000đ/ngày",
    rating: "4.8",
    location: "Hà Nội, Việt Nam",
    services: [
      "Chỗ ở thoải mái và an toàn",
      "Chăm sóc sức khỏe và dinh dưỡng",
      "Chơi đùa và tập thể dục hàng ngày",
      "Giám sát và chăm sóc 24/7"
    ],
    timeService: "24/7"
  };

  return (
    <>
      <Navbar />
      <div className="bg-pink-100 min-h-screen pt-16">
        <div className="container mx-auto py-6 px-4 max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay lại
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <img
                src={serviceDetails.image}
                alt={serviceDetails.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                <h1 className="text-white text-2xl font-bold px-4 text-center">{serviceDetails.title}</h1>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 mb-4 text-sm">{serviceDetails.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h2 className="text-lg font-bold mb-3">Thông tin chi tiết:</h2>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold min-w-20">Giá:</span>
                      <span>{serviceDetails.price}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold min-w-20">Địa điểm:</span>
                      <span>{serviceDetails.location}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold min-w-20">Đánh giá:</span>
                      <span className="text-yellow-500">
                        <i className="fas fa-star"></i> {serviceDetails.rating}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold min-w-20">Thời gian:</span>
                      <span>{serviceDetails.timeService}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h2 className="text-lg font-bold mb-3">Dịch vụ bao gồm:</h2>
                  <ul className="space-y-1.5 text-sm">
                    {serviceDetails.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to={`/booking/${id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors flex-1 text-center"
                >
                  Đặt lịch ngay
                </Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors flex-1 text-center">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail; 