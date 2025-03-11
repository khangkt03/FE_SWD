import React from 'react';
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
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <h1 className="text-center text-2xl font-bold mb-8">Các dịch vụ chúng tôi cung cấp</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceData.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-base font-bold mb-2">{service.title}</h2>
                  <p className="text-gray-600 mb-3 text-sm h-12 overflow-hidden">{service.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-500 font-bold text-sm">{service.price}</span>
                    <span className="text-yellow-500 text-sm">
                      <i className="fas fa-star"></i> {service.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{service.location}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-green-500 text-white py-1.5 rounded text-sm hover:bg-green-600 transition-colors w-full">
                      Đặt lịch ngay
                    </button>
                    <button className="bg-blue-500 text-white py-1.5 rounded text-sm hover:bg-blue-600 transition-colors w-full">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-l text-sm">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="bg-blue-500 text-white px-3 py-1.5 text-sm">1</button>
            <button className="bg-white text-gray-700 px-3 py-1.5 text-sm">2</button>
            <button className="bg-white text-gray-700 px-3 py-1.5 text-sm">...</button>
            <button className="bg-white text-gray-700 px-3 py-1.5 text-sm">9</button>
            <button className="bg-white text-gray-700 px-3 py-1.5 text-sm">10</button>
            <button className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-r text-sm">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services; 