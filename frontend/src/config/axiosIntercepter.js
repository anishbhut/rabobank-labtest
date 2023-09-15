import axios from "axios";
const axiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:8080', 
});


// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
// End of Request interceptor


// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;