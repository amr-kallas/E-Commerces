import ax from 'axios'
import { API_BASE_URL } from '../constants/domain'
const axios=ax.create({
    baseURL:API_BASE_URL
})
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios