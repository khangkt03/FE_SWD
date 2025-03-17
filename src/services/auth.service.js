import api from '../config/api';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/api/Login/login', {
        username,
        password
      });
      
      console.log('Login response:', response);
      
      // Kiểm tra response có data không
      if (!response.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }

      // Lưu thông tin user
      const userData = {
        username: username,
        // Có thể thêm các thông tin khác từ response.data
      };

      // Lưu token nếu có
      const token = response.data.token || response.data.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }

      localStorage.setItem('user', JSON.stringify(userData));
      
      return {
        user: userData,
        token: token
      };
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/api/User/register', {
        userName: userData.userName,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        passWord: userData.passWord,
        confirmPassword: userData.confirmPassword,
        avatar: ""
      });
      
      console.log('Register response:', response);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default AuthService; 