import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or sessionStorage)
    const token = localStorage.getItem('token');

    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Always return the config or the request will be blocked
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Simply return the response if everything is okay
    return response;
  },
  (error) => {
    // Handle unauthorized or other errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., token expired or invalid
      console.error('Unauthorized! Redirecting to login...');
      window.location.href = '/login'; // Redirect to login page
    }

    // Handle other response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;