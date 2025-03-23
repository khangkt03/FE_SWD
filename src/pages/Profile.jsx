import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import api from '../config/api';
import AddPetModal from '../components/AddPetModal';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pets');
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPageOption, setPetsPerPageOption] = useState(2);
  const petsPerPage = petsPerPageOption;
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [bookingsPerPageOption, setBookingsPerPageOption] = useState(2);
  const bookingsPerPage = bookingsPerPageOption;
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [isBookingGridLayout, setIsBookingGridLayout] = useState(true);

  // Di chuyển các hàm helper lên trước
  const getStatusText = (status) => {
    const statusMap = {
      'Comming Soon': 'Sắp tới',
      'Pending': 'Sắp tới',
      'Success': 'Hoàn thành',
      'Completed': 'Hoàn thành',
      'Cancelled': 'Đã hủy',
      'Processing': 'Đang xử lý'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'Comming Soon': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Pending': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Success': 'bg-green-100 text-green-800 border border-green-200',
      'Completed': 'bg-green-100 text-green-800 border border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border border-red-200',
      'Processing': 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Tính toán pets cho trang hiện tại
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Đầu tiên filter bookings theo status
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return getStatusText(booking.status) === filterStatus;
  });

  // Sau đó mới tính toán phân trang từ filteredBookings
  const indexOfLastBooking = currentBookingPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalBookingPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  // Thêm hàm helper để tạo mảng số trang
  const getPaginationRange = (currentPage, totalPages) => {
    const delta = 2; // Số trang hiển thị mỗi bên
    const range = [];
    const rangeWithDots = [];

    // Luôn hiển thị trang đầu
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Luôn hiển thị trang cuối nếu không phải trang 1
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Thêm dấu ... vào giữa các khoảng cách
    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Gọi API lấy danh sách pets
        const petsResponse = await api.get('/api/Pet');
        if (petsResponse.data.isSuccess) {
          setPets(petsResponse.data.result.$values || []);
        }

        // Gọi API lấy lịch sử đặt lịch
        const bookingsResponse = await api.get('/api/Booking/booking');
        if (bookingsResponse.data.isSuccess) {
          setBookings(bookingsResponse.data.result.$values || []);
        }
      } catch (error) {
        console.error('Error:', error);
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

  // Thêm hàm refresh pets
  const refreshPets = async () => {
    try {
      const response = await api.get('/api/Pet');
      if (response.data.isSuccess) {
        setPets(response.data.result.$values || []);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm chuyển trang cho bookings
  const handleBookingPageChange = (pageNumber) => {
    setCurrentBookingPage(pageNumber);
  };

  // Thêm vào phần xử lý click filter
  const handleFilterClick = (status) => {
    setFilterStatus(status);
    setCurrentBookingPage(1); // Reset về trang 1 khi đổi filter
  };

  // Thêm hàm xử lý khi thay đổi số lượng hiển thị
  const handleBookingsPerPageChange = (value) => {
    setBookingsPerPageOption(parseInt(value));
    setCurrentBookingPage(1); // Reset về trang 1 khi đổi số lượng hiển thị
  };

  // Thêm hàm xử lý thay đổi số lượng pet hiển thị
  const handlePetsPerPageChange = (value) => {
    setPetsPerPageOption(parseInt(value));
    setCurrentPage(1); // Reset về trang 1
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8">
              <div className="mb-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors w-fit"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Quay về trang chủ
                </button>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Trang cá nhân</h1>
                <p className="text-gray-600 mt-2">Quản lý thông tin thú cưng và lịch sử đặt lịch</p>
              </div>
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
                    <div className="mb-6 flex justify-between items-center">
                      <button 
                        onClick={() => setIsAddPetModalOpen(true)}
                        className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Thêm thú cưng mới
                      </button>

                      <div className="flex items-center gap-4">
                        {/* Layout Toggle */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsGridLayout(true)}
                            className={`p-2 rounded-md ${
                              isGridLayout 
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
                            onClick={() => setIsGridLayout(false)}
                            className={`p-2 rounded-md ${
                              !isGridLayout 
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

                        {/* Per Page Dropdown */}
                        <div className="flex items-center gap-2">
                          <label htmlFor="petsPerPage" className="text-sm font-medium text-gray-600">
                            Hiển thị:
                          </label>
                          <select
                            id="petsPerPage"
                            value={petsPerPageOption}
                            onChange={(e) => handlePetsPerPageChange(e.target.value)}
                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="1">1 thú cưng</option>
                            <option value="2">2 thú cưng</option>
                            <option value="3">3 thú cưng</option>
                            <option value="4">4 thú cưng</option>
                            <option value="6">6 thú cưng</option>
                            <option value={pets.length}>Tất cả</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <AddPetModal 
                      isOpen={isAddPetModalOpen}
                      onClose={() => setIsAddPetModalOpen(false)}
                      onSuccess={refreshPets}
                    />
                    
                    {pets.length > 0 ? (
                      <>
                        <div className={`${
                          isGridLayout 
                            ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                            : 'flex flex-col gap-4'
                        }`}>
                          {currentPets.map((pet) => (
                            <div 
                              key={pet.petId} 
                              className={`bg-white rounded-lg shadow-md p-6 ${
                                !isGridLayout && 'flex items-center justify-between'
                              }`}
                            >
                              <div className={`flex items-center ${!isGridLayout ? 'gap-6' : 'space-x-4'}`}>
                                <img 
                                  src={pet.picture || '/default-pet.png'} 
                                  alt={pet.petName}
                                  className="w-24 h-24 rounded-full object-cover"
                                />
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800">{pet.petName}</h3>
                                  <p className="text-gray-600">
                                    <span className="font-bold">Giống</span>: {pet.breed}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-bold">Tuổi</span>: {pet.age} tuổi
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Phân trang - đã bỏ điều kiện totalPages > 1 */}
                        <div className="flex justify-center mt-6 space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md ${
                              currentPage === 1
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-rose-500 text-white hover:bg-rose-600'
                            }`}
                          >
                            Trước
                          </button>
                          
                          {[...Array(totalPages || 1)].map((_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => handlePageChange(index + 1)}
                              className={`px-4 py-2 rounded-md ${
                                currentPage === index + 1
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md ${
                              currentPage === totalPages
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-rose-500 text-white hover:bg-rose-600'
                            }`}
                          >
                            Sau
                          </button>
                        </div>
                      </>
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
                  <div className="space-y-6">
                    {/* Filter và Per Page Selection */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      {/* Filter Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleFilterClick('all')}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${filterStatus === 'all' 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          Tất cả
                        </button>
                        <button
                          onClick={() => handleFilterClick('Sắp tới')}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${filterStatus === 'Sắp tới' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          Sắp tới
                        </button>
                        <button
                          onClick={() => handleFilterClick('Hoàn thành')}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${filterStatus === 'Hoàn thành' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          Hoàn thành
                        </button>
                        <button
                          onClick={() => handleFilterClick('Đã hủy')}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${filterStatus === 'Đã hủy' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          Đã hủy
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Layout Toggle */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsBookingGridLayout(true)}
                            className={`p-2 rounded-md ${
                              isBookingGridLayout 
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
                            onClick={() => setIsBookingGridLayout(false)}
                            className={`p-2 rounded-md ${
                              !isBookingGridLayout 
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

                        {/* Per Page Dropdown */}
                        <div className="flex items-center gap-2">
                          <label htmlFor="perPage" className="text-sm font-medium text-gray-600">
                            Hiển thị:
                          </label>
                          <select
                            id="perPage"
                            value={bookingsPerPageOption}
                            onChange={(e) => handleBookingsPerPageChange(e.target.value)}
                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="1">1 dịch vụ</option>
                            <option value="2">2 dịch vụ</option>
                            <option value="3">3 dịch vụ</option>
                            <option value="5">5 dịch vụ</option>
                            <option value="10">10 dịch vụ</option>
                            <option value="15">15 dịch vụ</option>
                            <option value={filteredBookings.length}>Tất cả</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Bookings List với layout động */}
                    <div className={`${
                      isBookingGridLayout 
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                        : 'flex flex-col gap-4'
                    }`}>
                      {currentBookings.map((booking) => (
                        <div 
                          key={booking.$id} 
                          className={`bg-white rounded-lg shadow-md overflow-hidden ${
                            !isBookingGridLayout && 'flex'
                          }`}
                        >
                          <div className={`${!isBookingGridLayout ? 'flex-1' : ''} p-6`}>
                            {isBookingGridLayout ? (
                              // Layout lưới
                              <>
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-xl font-semibold text-gray-800">
                                    {booking.sService?.ssName}
                                  </h3>
                                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                    {getStatusText(booking.status)}
                                  </span>
                                </div>
                                <div className="flex gap-6">
                                  <img 
                                    src={booking.sService?.img || '/default-service.png'}
                                    alt={booking.sService?.ssName}
                                    className="w-24 h-24 rounded-lg object-cover shadow-sm"
                                  />
                                  <div className="space-y-2">
                                    <div className="space-y-1">
                                      <p className="text-gray-600">
                                        <span className="font-medium">Thú cưng:</span> {booking.pet?.petName}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Ngày sử dụng dịch vụ:</span> {formatDate(booking.bookingDate)}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Thời gian bắt đầu:</span> {booking.bookingTime}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Số ngày sử dụng:</span> {booking.useDay}
                                      </p>
                                      <p className="mt-2">
                                        <span className="font-medium text-gray-600">Tổng tiền:</span>{' '}
                                        <span className="text-lg font-bold text-rose-600">
                                          {booking.totalPrice?.toLocaleString('vi-VN')}đ
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // Layout danh sách (giữ nguyên code cũ)
                              <div className="flex items-center justify-between">
                                <div className="flex gap-6">
                                  <img 
                                    src={booking.sService?.img || '/default-service.png'}
                                    alt={booking.sService?.ssName}
                                    className="w-24 h-24 rounded-lg object-cover shadow-sm"
                                  />
                                  <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                      {booking.sService?.ssName}
                                    </h3>
                                    <div className="space-y-1">
                                      <p className="text-gray-600">
                                        <span className="font-medium">Thú cưng:</span> {booking.pet?.petName}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Ngày sử dụng dịch vụ:</span> {formatDate(booking.bookingDate)}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Thời gian bắt đầu:</span> {booking.bookingTime}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium">Số ngày sử dụng:</span> {booking.useDay}
                                      </p>
                                      <p className="mt-2">
                                        <span className="font-medium text-gray-600">Tổng tiền:</span>{' '}
                                        <span className="text-lg font-bold text-rose-600">
                                          {booking.totalPrice?.toLocaleString('vi-VN')}đ
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600">Không tìm thấy lịch đặt nào</p>
                        <p className="text-gray-500 mt-2">
                          {filterStatus === 'all' 
                            ? 'Hãy đặt lịch dịch vụ ngay' 
                            : 'Thử chọn bộ lọc khác'}
                        </p>
                      </div>
                    ) : (
                      // Phân trang cho bookings
                      <div className="flex justify-center mt-6 space-x-2">
                        <button
                          onClick={() => handleBookingPageChange(currentBookingPage - 1)}
                          disabled={currentBookingPage === 1}
                          className={`px-4 py-2 rounded-md ${
                            currentBookingPage === 1
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-rose-500 text-white hover:bg-rose-600'
                          }`}
                        >
                          Trước
                        </button>
                        
                        {getPaginationRange(currentBookingPage, totalBookingPages).map((pageNumber, index) => (
                          <React.Fragment key={index}>
                            {pageNumber === '...' ? (
                              <span className="px-4 py-2 text-gray-500">...</span>
                            ) : (
                              <button
                                onClick={() => handleBookingPageChange(pageNumber)}
                                className={`px-4 py-2 rounded-md ${
                                  currentBookingPage === pageNumber
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            )}
                          </React.Fragment>
                        ))}
                        
                        <button
                          onClick={() => handleBookingPageChange(currentBookingPage + 1)}
                          disabled={currentBookingPage === totalBookingPages}
                          className={`px-4 py-2 rounded-md ${
                            currentBookingPage === totalBookingPages
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-rose-500 text-white hover:bg-rose-600'
                          }`}
                        >
                          Sau
                        </button>
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