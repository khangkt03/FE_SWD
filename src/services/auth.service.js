import api from '../config/api';

const login = async (username, password) => {
  try {
    const response = await api.post('/api/Login/login', {
      username,
      password,
    });

    if (response.data.isSuccess) {
      const { accessToken, refreshToken } = response.data.result;
      
      // Lưu token vào localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Tạo object user từ JWT token
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const user = {
        userId: tokenPayload.UserID,
        userName: tokenPayload.Username,
        email: tokenPayload.Email,
        fullName: tokenPayload.fullName,
        role: tokenPayload.Role
      };
      
      // Lưu user vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        user,
        token: accessToken,
        refreshToken: refreshToken
      };
    } else {
      throw new Error(response.data.message || 'Đăng nhập thất bại');
    }
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const getCurrentUser = () => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  return { token, user: user ? JSON.parse(user) : null };
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService; 