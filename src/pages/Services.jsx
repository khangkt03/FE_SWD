import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const serviceData = [
  {
    id: 1,
    title: "Spa & Grooming",
    description: "Làm đẹp và thư giãn cho thú cưng với các dịch vụ chuyên nghiệp.",
    price: "300.000đ/lần",
    rating: "4.7",
    location: "Hồ Chí Minh, Việt Nam",
    image: "https://storage.googleapis.com/a1aa/image/iAXPL7UKJQJu5_TeWeAXU58kb0Kp8ljqgvmG-ebZzfg.jpg"
  },
  {
    id: 2,
    title: "Khách sạn thú cưng 5 sao",
    description: "Chăm sóc tận tâm, không gian rộng rãi và thoải mái.",
    price: "500.000đ/ngày",
    rating: "4.8",
    location: "Hà Nội, Việt Nam",
    image: "https://storage.googleapis.com/a1aa/image/rOEND5-OWAPWw_LpNxeE3SFXomwobFBcX4z5got8ScA.jpg"
  },
  {
    id: 3,
    title: "Dịch vụ trông giữ thú cưng",
    description: "Không gian vui chơi an toàn và thoải mái cho thú cưng của bạn.",
    price: "200.000đ/ngày",
    rating: "4.6",
    location: "Đà Nẵng, Việt Nam",
    image: "https://storage.googleapis.com/a1aa/image/2sBF1lF6-bRtPcjGc2Wy6OVAjdglQoGdSSa6OEF8nJM.jpg"
  },
  {
    id: 4,
    title: "Huấn luyện thú cưng",
    description: "Huấn luyện chuyên nghiệp giúp thú cưng của bạn ngoan ngoãn và nghe lời.",
    price: "600.000đ/khóa",
    rating: "4.8",
    location: "Hồ Chí Minh, Việt Nam",
    image: "https://storage.googleapis.com/a1aa/image/NBUvzfMjq4JsUVSgZYTHRYBF_0pGT_j-zr2DA3kGWys.jpg"
  },
  {
    id: 5,
    title: "Dịch vụ thú y",
    description: "Chăm sóc sức khỏe chuyên nghiệp cho thú cưng của bạn.",
    price: "400.000đ/lần",
    rating: "4.9",
    location: "Hà Nội, Việt Nam",
    image: "https://storage.googleapis.com/a1aa/image/3ETOBJZfLIApddXEq0lq-Co6xXrW1dqpjLn6KQhUgx8.jpg"
  },
  {
    id: 6,
    title: "Giao thức ăn cho thú cưng",
    description: "Giao thức ăn chất lượng cao đến nhà cho thú cưng của bạn.",
    price: "100.000đ/gói",
    rating: "4.7",
    location: "Toàn quốc",
    image: "https://storage.googleapis.com/a1aa/image/HRgRMwVi7zYW_s7gUl0j6ugKzytusYr_9QdZ-1baZqU.jpg"
  }
];

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="bg-pink-100 min-h-screen pt-16">
        <div className="container mx-auto py-6 px-4 max-w-5xl">
          <h1 className="text-center text-xl font-bold mb-6">Các dịch vụ chúng tôi cung cấp</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceData.map((service) => (
              <div key={service.id} className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow transition-shadow">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2.5">
                  <h2 className="text-sm font-bold mb-1.5">{service.title}</h2>
                  <p className="text-gray-600 mb-2 text-xs h-8 overflow-hidden">{service.description}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-green-500 font-bold text-xs">{service.price}</span>
                    <span className="text-yellow-500 text-xs">
                      <i className="fas fa-star"></i> {service.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2 text-xs">
                    <i className="fas fa-map-marker-alt mr-1.5"></i>
                    <span>{service.location}</span>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <button className="bg-green-500 text-white py-1 rounded-sm text-xs hover:bg-green-600 transition-colors w-full">
                      Đặt lịch ngay
                    </button>
                    <Link 
                      to={`/services/${service.id}`} 
                      className="bg-blue-500 text-white py-1 rounded-sm text-xs hover:bg-blue-600 transition-colors w-full text-center"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-5">
            <button className="bg-gray-300 text-gray-700 px-2.5 py-1 rounded-l text-xs">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="bg-blue-500 text-white px-2.5 py-1 text-xs">1</button>
            <button className="bg-white text-gray-700 px-2.5 py-1 text-xs">2</button>
            <button className="bg-white text-gray-700 px-2.5 py-1 text-xs">...</button>
            <button className="bg-white text-gray-700 px-2.5 py-1 text-xs">9</button>
            <button className="bg-white text-gray-700 px-2.5 py-1 text-xs">10</button>
            <button className="bg-gray-300 text-gray-700 px-2.5 py-1 rounded-r text-xs">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services; 