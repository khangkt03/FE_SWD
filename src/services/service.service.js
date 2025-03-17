import api from '../config/api';

const ServiceAPI = {
  getAllServices: async (params) => {
    try {
      const response = await api.get('/api/services', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getServiceById: async (id) => {
    try {
      const response = await api.get(`/api/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookings: async () => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ServiceAPI; 