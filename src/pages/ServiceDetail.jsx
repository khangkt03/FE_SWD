import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await api.get('/api/storeservices');
        if (response.data && response.data.$values) {
          // Tìm service có ID trùng khớp
          const serviceData = response.data.$values.find(
            (service) => service.sServiceID === id
          );
          if (serviceData) {
            setService(serviceData);
          } else {
            toast.error('Không tìm thấy dịch vụ');
          }
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        toast.error('Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  const handleBookingClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.info('Vui lòng đăng nhập để đặt lịch dịch vụ');
      navigate('/login');
      localStorage.setItem('pendingBookingService', id);
    } else {
      try {
        const serviceInfo = {
          sServiceID: service.sServiceID,
          ssName: service.ssName,
          price: service.price,
          description: service.sDesc
        };
        localStorage.setItem('selectedService', JSON.stringify(serviceInfo));
        navigate(`/booking/${service.sServiceID}`);
      } catch (error) {
        console.error('Error saving service info:', error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h2>
            <button 
              onClick={() => navigate('/services')}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Quay lại danh sách dịch vụ
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-pink-100 min-h-screen pt-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-72">
              <img
                src={service.img}
                alt={service.ssName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <button
                onClick={() => navigate('/services')}
                className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Quay lại
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{service.ssName}</h1>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thời gian: 60-90 phút
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Đảm bảo chất lượng
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Chi tiết dịch vụ</h2>
                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{service.sDesc}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Điểm nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-rose-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Nhân viên chuyên nghiệp, giàu kinh nghiệm</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-rose-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Trang thiết bị hiện đại</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-rose-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Môi trường sạch sẽ, thoải mái</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-rose-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Cam kết hài lòng 100%</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Giá dịch vụ</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-rose-600">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleBookingClick}
                    className="px-6 py-2.5 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail; 