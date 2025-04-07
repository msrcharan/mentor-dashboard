import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: '/api/',  // Relative path, proxied to http://127.0.0.1:8000/api/
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // Set a timeout (10 seconds) to avoid hanging requests
});

// Add request interceptor to attach token and log requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers['Origin'] = 'http://localhost:3000';  // Force correct origin
    console.log('Request Method:', config.method.toUpperCase());  // Debug method
    console.log('Request URL:', config.baseURL + config.url);     // Debug full URL
    console.log('Request Headers:', config.headers);             // Debug headers
    console.log('Request Data:', config.data);                   // Debug payload
    if (token) {
      config.headers.Authorization = `Token ${token}`;
      console.log('Token attached:', token);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  error => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('Response Data:', response.data);  // Debug successful responses
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Handle specific errors (e.g., 401 for unauthorized)
    if (error.response?.status === 401) {
      console.warn('Unauthorized - Redirecting to login or clearing token');
      localStorage.removeItem('token');  // Clear invalid token
      window.location.href = '/login';  // Redirect to login
    }
    return Promise.reject(error);
  }
);

// API endpoint functions
export const getMentors = () =>
  api.get('mentors/').catch(error => {
    console.error('getMentors failed:', error);
    throw error;  // Re-throw for component-level handling
  });

export const sendMessage = (message) =>
  api.post('chat/', { message }).catch(error => {
    console.error('sendMessage failed:', error);
    throw error;
  });

export const getProfile = () =>
  api.get('profile/').catch(error => {
    console.error('getProfile failed:', error);
    throw error;
  });

export const login = async (credentials) => {
  const response = await api.post('login/', credentials).catch(error => {
    console.error('login failed:', error);
    throw error;
  });
  localStorage.setItem('token', response.data.token);  // Store token on success
  return response;
};

export const register = async (userData) => {
  const response = await api.post('register/', userData).catch(error => {
    console.error('register failed:', error);
    throw error;
  });
  localStorage.setItem('token', response.data.token);  // Store token on success
  return response;
};

export default api;