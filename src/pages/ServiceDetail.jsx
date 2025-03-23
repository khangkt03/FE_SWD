import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/api';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        // Lấy toàn bộ danh sách dịch vụ
        const response = await api.get('/api/storeservices');
        // Tìm dịch vụ có ID tương ứng
        const foundService = response.data.$values.find(
          service => service.sServiceID === id
        );
        
        if (!foundService) {
          throw new Error('Không tìm thấy dịch vụ');
        }
        
        setService(foundService);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError(error.message || 'Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Danh sách dịch vụ cố định
  const includedServices = [
    "Chỗ ở thoải mái và an toàn",
    "Chăm sóc sức khỏe và dinh dưỡng",
    "Chơi đùa và tập thể dục hàng ngày",
    "Giám sát và chăm sóc 24/7"
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate(-1)}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-pink-50 min-h-screen pt-12">
        <div className="container mx-auto py-6 px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
              type="button"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
            <h1 className="text-xl font-bold text-gray-900">Chi Tiết Dịch Vụ</h1>
            <div className="w-16"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-72">
              <img
                src={service.img}
                alt={service.ssName}
                className="w-full h-full object-cover"
              />
              {service.discount > 0 && (
                <div className="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Giảm {service.discount}%
                </div>
              )}
            </div>

            <div className="p-5">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{service.ssName}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-rose-500">
                  {formatPrice(service.price)}
                </span>
                <button
                  onClick={() => navigate(`/booking/${service.sServiceID}`)}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors text-base font-medium"
                >
                  Đặt lịch ngay
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Mô tả dịch vụ</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{service.sDesc}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Dịch vụ bao gồm</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {includedServices.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-xs">
                  * Giá có thể thay đổi tùy theo yêu cầu cụ thể. Vui lòng liên hệ để biết thêm chi tiết.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail; 