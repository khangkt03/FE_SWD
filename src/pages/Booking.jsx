import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const TOKEN_KEY = 'accessToken';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({
    ownerName: '',
    startDate: '',
    daysOfUse: '1',
    timeSlot: '',
    note: ''
  });

  useEffect(() => {
    // Kiểm tra token ngay từ đầu
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    // Lấy thông tin service từ localStorage
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      setSelectedService(JSON.parse(savedService));
    }

    // Fetch danh sách pets với token
    const fetchPets = async () => {
      try {
        const response = await api.get('/api/Pet', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log('Pet Response:', response.data); // Debug log

        if (response.data.isSuccess && response.data.result?.$values) {
          setPets(response.data.result.$values);
        } else {
          throw new Error('Không thể lấy danh sách thú cưng');
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
        if (error.response?.status === 401) {
          toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
          localStorage.removeItem(TOKEN_KEY);
          navigate('/login');
        } else {
          toast.error('Không thể tải danh sách thú cưng');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setIsDropdownOpen(false);
    localStorage.setItem('selectedBookingPet', JSON.stringify(pet));
  };

  const handleConfirmBooking = () => {
    // Kiểm tra token trước khi xử lý
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    if (!selectedPet) {
      toast.error('Vui lòng chọn thú cưng của bạn');
      return;
    }

    if (!bookingData.startDate) {
      toast.error('Vui lòng chọn ngày sử dụng');
      return;
    }

    if (!bookingData.timeSlot) {
      toast.error('Vui lòng chọn giờ');
      return;
    }

    if (!selectedService) {
      toast.error('Không tìm thấy thông tin dịch vụ');
      return;
    }

    const bookingInfo = {
      petID: selectedPet.petId,
      sServiceID: selectedService.sServiceID,
      bookingName: "string",
      bookingDate: new Date(bookingData.startDate).toISOString(),
      bookingTime: bookingData.timeSlot,
      useDay: parseInt(bookingData.daysOfUse) || 1,
      status: "string",
      totalPrice: calculateTotalCost(),
      bookingProgress: 0
    };

    // Lưu token cùng với thông tin booking
    localStorage.setItem('pendingBooking', JSON.stringify({
      ...bookingInfo,
      token: token // Lưu token để sử dụng ở trang Payment
    }));

    navigate('/payment');
  };

  const calculateTotalCost = () => {
    const daysOfUse = parseInt(bookingData.daysOfUse) || 1;
    return (selectedService?.price || 500000) * daysOfUse;
  };

  return (
    <>
      <Navbar />
      <div className="bg-pink-100 min-h-screen pt-16">
        <div className="container mx-auto py-6 px-4 max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay lại
          </button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-6 text-center">Đặt lịch dịch vụ</h1>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tên dịch vụ
              </label>
              <div className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4">
                <div className="font-medium text-gray-900">{selectedService?.serviceName}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Chọn thú cưng của bạn
                </label>
                {selectedPet ? (
                  <div className="w-full bg-white border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center">
                      <img 
                        src={selectedPet.picture} 
                        alt={selectedPet.petName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{selectedPet.petName}</div>
                        <div className="text-sm text-gray-500">
                          {selectedPet.breed}, {selectedPet.age} tuổi
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-left flex items-center justify-between hover:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-200"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="text-gray-500">Chọn thú cưng của bạn</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto">
                        {loading ? (
                          <div className="flex items-center justify-center p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
                          </div>
                        ) : pets.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            <p>Bạn chưa có thú cưng nào</p>
                            <a 
                              href="/add-pet" 
                              className="mt-2 text-sm text-rose-600 hover:text-rose-700 block"
                            >
                              + Thêm thú cưng mới
                            </a>
                          </div>
                        ) : (
                          pets.map((pet) => (
                            <button
                              key={pet.petId}
                              className="w-full px-4 py-3 text-left hover:bg-rose-50 flex items-center space-x-3"
                              onClick={() => handlePetSelect(pet)}
                            >
                              <img
                                src={pet.picture}
                                alt={pet.petName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{pet.petName}</div>
                                <div className="text-sm text-gray-500">
                                  {pet.breed}, {pet.age} tuổi
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ngày sử dụng
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số ngày sử dụng
                </label>
                <input
                  type="number"
                  name="daysOfUse"
                  value={bookingData.daysOfUse}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Tối thiểu 1 ngày, tối đa 30 ngày
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Chọn giờ
                </label>
                <input
                  type="text"
                  name="timeSlot"
                  value={bookingData.timeSlot}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 08:30"
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Yêu cầu (tùy chọn)
                </label>
                <textarea
                  name="note"
                  value={bookingData.note}
                  onChange={handleInputChange}
                  placeholder="Nhập yêu cầu đặc biệt của bạn..."
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>{selectedService?.price?.toLocaleString()}đ × {bookingData.daysOfUse || 1} ngày</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span>{calculateTotalCost().toLocaleString()}đ</span>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;