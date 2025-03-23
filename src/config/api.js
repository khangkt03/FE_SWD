import axios from 'axios';

// Trong môi trường development, baseURL sẽ là empty string để sử dụng proxy
const API_URL = import.meta.env.DEV ? '' : 'http://fur.runasp.net';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

const TOKEN_KEY = 'accessToken';

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.message === 'Network Error') {
      return Promise.reject(new Error('Lỗi kết nối đến server. Vui lòng thử lại sau!'));
    }
    
    if (error.response) {
      // Xử lý các mã lỗi HTTP
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi unauthorized
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Xử lý lỗi forbidden
          break;
        case 404:
          // Xử lý lỗi not found
          break;
        default:
          break;
      }
    }

    // Trả về message lỗi từ server nếu có
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default api; 