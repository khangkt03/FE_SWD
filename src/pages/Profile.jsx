import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import api from '../config/api';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pets');
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Gọi API lấy danh sách pets
        const response = await api.get('/api/Pet');
        if (response.data.isSuccess) {
          setPets(response.data.result.$values || []);
        }

        // Gọi API lấy danh sách bookings
        const bookingsResponse = await api.get('/api/Booking');
        if (bookingsResponse.data.isSuccess) {
          setBookings(bookingsResponse.data.result.$values || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Không thể tải dữ liệu, vui lòng thử lại sau');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xử lý chuyển tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Format status tiếng Việt
  const getStatusText = (status) => {
    const statusMap = {
      'Pending': 'Chờ xử lý',
      'Completed': 'Hoàn thành', 
      'Cancelled': 'Đã hủy',
      'Processing': 'Đang xử lý'
    };
    return statusMap[status] || status;
  };

  // Format status color
  const getStatusColor = (status) => {
    const colorMap = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Processing': 'bg-blue-100 text-blue-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Trang cá nhân</h1>
              <p className="text-gray-600 mt-2">Quản lý thông tin thú cưng và lịch sử đặt lịch</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => handleTabChange('pets')}
                  className={`${
                    activeTab === 'pets'
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                >
                  Thú cưng của tôi
                </button>
                <button
                  onClick={() => handleTabChange('bookings')}
                  className={`${
                    activeTab === 'bookings'
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                >
                  Lịch sử đặt lịch
                </button>
              </nav>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
              </div>
            ) : (
              <>
                {/* Pets Tab */}
                {activeTab === 'pets' && (
                  <div>
                    <div className="mb-6">
                      <button 
                        onClick={() => navigate('/add-pet')}
                        className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Thêm thú cưng mới
                      </button>
                    </div>
                    
                    {pets.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pets.map((pet) => (
                          <div key={pet.petId} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={pet.picture} 
                                alt={pet.petName}
                                className="w-24 h-24 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800">{pet.petName}</h3>
                                <p className="text-gray-600">{pet.breed}</p>
                                <p className="text-gray-600">{pet.age} tuổi</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600">Bạn chưa có thú cưng nào</p>
                        <p className="text-gray-500 mt-2">Hãy thêm thú cưng đầu tiên của bạn</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div>
                    {bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div key={booking.bookingId} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {booking.bookingName}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                  Ngày: {new Date(booking.bookingDate).toLocaleDateString('vi-VN')}
                                </p>
                                <p className="text-gray-600">
                                  Thời gian: {booking.bookingTime}
                                </p>
                                <p className="text-gray-600">
                                  Số ngày: {booking.useDay}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                            </div>
                            <div className="mt-4">
                              <p className="text-gray-600">
                                Tổng tiền: {booking.totalPrice?.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600">Bạn chưa có lịch đặt nào</p>
                        <p className="text-gray-500 mt-2">Hãy đặt lịch dịch vụ ngay</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile; 