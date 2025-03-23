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
      
      // Cấu hình mặc định cho axios với token mới
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      return {
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