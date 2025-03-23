import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    // Lấy đường dẫn từ state hoặc pendingBookingService
    const from = location.state?.from || '/';
    const pendingService = localStorage.getItem('pendingBookingService');
    
    if (pendingService) {
      localStorage.removeItem('pendingBookingService');
      navigate(`/booking/${pendingService}`);
    } else {
      navigate(from);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      if (response && response.token) {
        toast.success('Đăng nhập thành công');
        navigate('/'); // hoặc navigate về trang trước đó
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  // ... rest of login code ...

  return (
    // ... render component ...
  );
};

export default Login; 