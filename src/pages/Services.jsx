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
  const [servicesPerPage, setServicesPerPage] = useState(3);
  const [isListView, setIsListView] = useState(false);
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

  // Tính toán phân trang
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServicesPerPage = services.slice(indexOfFirstService, indexOfLastService);
  const totalPagesPerPage = Math.ceil(services.length / servicesPerPage);

  // Hàm xử lý thay đổi số lượng hiển thị
  const handleServicesPerPageChange = (value) => {
    setServicesPerPage(parseInt(value));
    setCurrentPage(1);
  };

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
      // Lưu service ID để sau khi đăng nhập có thể quay lại
      localStorage.setItem('pendingBookingService', service.sServiceID);
    } else {
      try {
        // Lưu đầy đủ thông tin service cần thiết
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

  // Thêm hàm giới hạn độ dài mô tả
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsListView(false)}
                  className={`p-2 rounded-md ${
                    !isListView 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Hiển thị dạng lưới"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" />
                    <path d="M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsListView(true)}
                  className={`p-2 rounded-md ${
                    isListView 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Hiển thị dạng danh sách"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="perPage" className="text-sm font-medium text-gray-600">
                  Hiển thị:
                </label>
                <select
                  id="perPage"
                  value={servicesPerPage}
                  onChange={(e) => handleServicesPerPageChange(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="3">3 dịch vụ</option>
                  <option value="6">6 dịch vụ</option>
                  <option value="9">9 dịch vụ</option>
                  <option value={services.length}>Tất cả</option>
                </select>
              </div>
            </div>
          </div>
          <div className={isListView ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
            {currentServicesPerPage.map((service) => (
              <div 
                key={service.sServiceID}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  isListView ? 'flex' : ''
                } cursor-pointer`}
                onClick={() => navigate(`/service-detail/${service.sServiceID}`)}
              >
                <img
                  src={service.img}
                  alt={service.ssName}
                  className={`object-cover ${
                    isListView ? 'w-48 h-48' : 'w-full h-48'
                  }`}
                />
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.ssName}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {truncateDescription(service.sDesc)}
                  </p>
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-bold text-rose-600">
                      {formatPrice(service.price)}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/service-detail/${service.sServiceID}`);
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookingClick(service);
                        }}
                        className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                      >
                        Đặt lịch
                      </button>
                    </div>
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