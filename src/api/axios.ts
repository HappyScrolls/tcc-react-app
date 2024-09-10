import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8084",
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: "http://localhost:8084",
  withCredentials: true,
});

// 요청
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 임시 Member-Code 작성
    config.headers["Member-Code"] =
      "eyJubyI6MSwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 나중에 로그아웃 처리
    }
    return Promise.reject(error);
  }
);


export const memberAxiosInstance = axios.create({
    baseURL: "http://158.247.198.100:32002",
    withCredentials: true,
});
