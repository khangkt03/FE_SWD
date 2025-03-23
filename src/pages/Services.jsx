import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 6; // 2 dòng, mỗi dòng 3 dịch vụ

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/storeservices');
        // Lọc các dịch vụ hợp lệ (có tên, mô tả và giá)
        const validServices = response.data.$values.filter(service => 
          service.ssName && 
          service.sDesc && 
          service.price > 0 && 
          service.img && 
          service.img !== "string"
        );
        setServices(validServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        let errorMessage = 'Không thể tải dữ liệu dịch vụ';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Tính toán các dịch vụ cho trang hiện tại
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Component phân trang - luôn hiển thị ít nhất 1 trang
  const Pagination = () => {
    // Đảm bảo luôn có ít nhất 1 trang
    const minPages = Math.max(1, totalPages);

    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-rose-500 text-white hover:bg-rose-600'
          }`}
        >
          Trước
        </button>
        
        {[...Array(minPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-700 hover:bg-rose-100'
            } min-w-[32px]`} // Thêm min-width để nút số không bị co lại
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, minPages))}
          disabled={currentPage === minPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === minPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-rose-500 text-white hover:bg-rose-600'
          }`}
        >
          Sau
        </button>
      </div>
    );
  };

  const handleBookingClick = (service) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.info('Vui lòng đăng nhập để đặt lịch dịch vụ');
      navigate('/login');
    } else {
      // Lưu đầy đủ thông tin service
      localStorage.setItem('selectedService', JSON.stringify({
        sServiceID: service.sServiceID,
        serviceName: service.ssName,
        price: service.price
      }));
      navigate(`/booking/${service.sServiceID}`);
    }
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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Thử lại
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
        <div className="container mx-auto py-6 px-4 max-w-5xl">
          <h1 className="text-center text-xl font-bold mb-6">Các dịch vụ chúng tôi cung cấp</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentServices.map((service) => (
              <div key={service.sServiceID} className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow transition-shadow">
                <img
                  src={service.img}
                  alt={service.ssName}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2.5">
                  <h2 className="text-sm font-bold mb-1.5">{service.ssName}</h2>
                  <p className="text-gray-600 mb-2 text-xs h-8 overflow-hidden">{service.sDesc}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-green-500 font-bold text-xs">{formatPrice(service.price)}</span>
                    {service.discount > 0 && (
                      <span className="text-rose-500 text-xs font-semibold">
                        Giảm {service.discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <button 
                      onClick={() => handleBookingClick(service)}
                      className="bg-green-500 text-white py-1 rounded-sm text-xs hover:bg-green-600 transition-colors w-full"
                    >
                      Đặt lịch ngay
                    </button>
                    <Link 
                      to={`/services/${service.sServiceID}`} 
                      className="bg-blue-500 text-white py-1 rounded-sm text-xs hover:bg-blue-600 transition-colors w-full text-center"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Luôn hiển thị phân trang */}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Services; 