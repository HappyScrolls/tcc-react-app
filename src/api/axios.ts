import axios from "axios";

// 스케줄
export const scheduleAxiosInstance = axios.create({
  baseURL: "https://api.togethery.store",
  withCredentials: true,
  timeout: 5000,
});

export const refreshInstance = axios.create({
  baseURL: "https://api.togethery.store",
  withCredentials: true,
});

scheduleAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode =
      localStorage.getItem("memberCode") ||
      "eyJubyI6NSwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9";

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
  baseURL: "https://api.togethery.store",
  withCredentials: true,
});

memberAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode =
      localStorage.getItem("memberCode");

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
  baseURL: "https://api.togethery.store",
  withCredentials: true,
});

notificationAxiosInstance.interceptors.request.use(
  (config) => {
    const memberCode =
      localStorage.getItem("memberCode") ||
      "eyJubyI6NSwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9";

    config.headers["Member-Code"] = memberCode;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

notificationAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //
    }
    return Promise.reject(error);
  }
);
