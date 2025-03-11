import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petType: '',
    ownerName: '',
    bookingDate: '',
    numberOfDays: '1',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đặt lịch ở đây
    console.log('Form submitted:', formData);
    // Có thể thêm thông báo thành công và chuyển hướng
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
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thú cưng của bạn
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                >
                  <option value="">Chọn thú cưng</option>
                  <option value="dog">Chó</option>
                  <option value="cat">Mèo</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên chủ
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số ngày sử dụng
                </label>
                <select
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 14, 30].map(days => (
                    <option key={days} value={days}>
                      {days} ngày {days >= 7 ? `(${Math.floor(days/7)} tuần${days >= 30 ? ' - 1 tháng' : ''})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yêu cầu (tùy chọn)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nhập yêu cầu đặc biệt của bạn..."
                ></textarea>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Chi phí dự tính:</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">500.000đ × {formData.numberOfDays} ngày</span>
                  <span className="text-lg font-bold text-green-500">
                    {(500000 * parseInt(formData.numberOfDays)).toLocaleString()}đ
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Xác nhận đặt lịch
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking; 