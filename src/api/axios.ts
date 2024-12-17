import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 스케줄
export const scheduleAxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
});

export const refreshInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

scheduleAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode = localStorage.getItem("memberCode");

    config.headers["Member-Code"] = memberCode;
    // config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

scheduleAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 나중에 로그아웃 처리
    }
    return Promise.reject(error);
  }
);

// 멤버
export const memberAxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

memberAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode = localStorage.getItem("memberCode");

    config.headers["Member-Code"] = memberCode;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

memberAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 나중에 로그아웃 처리
    }
    return Promise.reject(error);
  }
);

// 알림
export const notificationAxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

notificationAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode = localStorage.getItem("memberCode");

    config.headers["Member-Code"] = memberCode;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

notificationAxiosInstance.interceptors.response.use(
  (config) => {
    const memberCode = localStorage.getItem("memberCode");
    config.headers["Member-Code"] = memberCode;

    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      //
    }
    return Promise.reject(error);
  }
);
