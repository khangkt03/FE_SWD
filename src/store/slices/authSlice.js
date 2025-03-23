import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'accessToken';

const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem(TOKEN_KEY),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.error('Error saving credentials:', error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export default authSlice.reducer; 