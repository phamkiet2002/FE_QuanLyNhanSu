import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 300000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    //console.log("Request sent with config:", config); // Debugging log
    return config;
  },
  function (error) {
    //console.log("Request error:", error); // Debugging log
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    //console.log("Response received:", response); // Debugging log
    return response && response.data ? response.data : response;
  },
  function (error) {
    //console.log("Response error:", error); // Debugging log
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance ;
