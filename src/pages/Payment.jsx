import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';
import api from '../config/api';

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Lấy thông tin từ localStorage
  const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));
  const selectedService = JSON.parse(localStorage.getItem('selectedService'));
  
  // Thông tin tài khoản Sacombank
  const bankInfo = {
    bankId: "970403", // Mã ngân hàng Sacombank
    accountNo: "070127672571", // Số tài khoản của bạn
    accountName: "NGUYEN VAN A", // Cần thay bằng tên tài khoản thật của bạn
  };

  // Tạo chuỗi dữ liệu cho VietQR
  const createVietQRString = () => {
    return `https://api.vietqr.io/image/${bankInfo.bankId}/${bankInfo.accountNo}/${pendingBooking?.totalPrice}/${encodeURIComponent(`Thanh toan ${selectedService?.serviceName}`)}`;
  };

  const handlePaymentConfirm = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Vui lòng đăng nhập lại');
      }

      if (!pendingBooking || !selectedService) {
        throw new Error('Thông tin đặt lịch không hợp lệ');
      }

      console.log('Sending booking data:', pendingBooking); // Debug log

      const response = await api.post('/api/Booking', pendingBooking, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response:', response.data); // Debug log

      if (response.data.isSuccess) {
        // Xóa data sau khi đặt lịch thành công
        localStorage.removeItem('pendingBooking');
        localStorage.removeItem('selectedBookingPet');
        localStorage.removeItem('selectedService');
        
        toast.success('Đặt lịch thành công!');
        navigate('/booking-success');
      } else {
        throw new Error(response.data.message || 'Đặt lịch thất bại');
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Nút Quay lại */}
      <div className="max-w-md mx-auto mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-rose-500 transition-colors duration-200 group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Quay lại</span>
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-rose-500 px-4 py-5 text-white">
          <h2 className="text-xl font-bold text-center">Thanh toán chuyển khoản</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Thông tin đơn hàng */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Thông tin thanh toán</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Dịch vụ:</span>
                <span className="font-medium">{selectedService?.serviceName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Số ngày:</span>
                <span className="font-medium">{pendingBooking?.useDay} ngày</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Tổng cộng:</span>
                <span className="font-medium text-rose-600">
                  {pendingBooking?.totalPrice?.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Ngân hàng: Sacombank</p>
                <p>Số tài khoản: {bankInfo.accountNo}</p>
                <p>Tên tài khoản: {bankInfo.accountName}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Quét mã QR bằng ứng dụng ngân hàng để thanh toán
            </p>
            <div className="bg-white p-4 rounded-lg inline-block border-2 border-gray-200">
              <QRCodeSVG 
                value={createVietQRString()}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Hướng dẫn */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-800 mb-2">Hướng dẫn thanh toán:</h4>
            <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
              <li>Mở ứng dụng ngân hàng trên điện thoại</li>
              <li>Chọn chức năng quét mã QR</li>
              <li>Quét mã QR ở trên</li>
              <li>Kiểm tra thông tin và xác nhận thanh toán</li>
              <li>Nhấn "Đã thanh toán" sau khi hoàn tất</li>
            </ol>
          </div>

          {/* Nút thanh toán */}
          <button
            onClick={handlePaymentConfirm}
            disabled={isProcessing}
            className={`w-full py-3 rounded-lg font-medium text-white 
              ${isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
              } transition-colors duration-200`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </div>
            ) : (
              'Đã chuyển khoản'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment; 