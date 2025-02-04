import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 300000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        if (
          data.message === "Token expired" ||
          data.message === "Unauthorized"
        ) {
          sessionStorage.clear();
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          window.location.href = "/login";
        }
      } else if (
        status === 500 &&
        data.detail === "Người dùng không tồn tại."
      ) {
        sessionStorage.clear();
        window.location.href = "/login";
      } else if (status === 400) {
        toast.error(data.message || "Yêu cầu không hợp lệ.");
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập.");
      } else if (status === 404) {
        toast.error("Không tìm thấy tài nguyên.");
      }
    } else {
      toast.error(
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    }
    return Promise.reject(error);
  }
);

export default instance;
