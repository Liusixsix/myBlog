import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use(function (config) {
  config.headers.token = localStorage.getItem('token') || ''
  return config
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios