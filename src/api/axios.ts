import axios from "axios";

export const scheduleAxiosInstance = axios.create({
  baseURL: "http://158.247.198.100:32000",
  withCredentials: true,
  timeout: 5000,
});

export const refreshInstance = axios.create({
  baseURL: "http://158.247.198.100:32002",
  withCredentials: true,
});

// 요청
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

// 응답
scheduleAxiosInstance.interceptors.response.use(
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


export const notificationAxiosInstance = axios.create({
    baseURL: "http://158.247.198.100:32400",
    withCredentials: true,
});

// 요청
notificationAxiosInstance.interceptors.request.use(
    (config) => {

        // 임시 Member-Code 작성
        config.headers["Member-Code"] =
            "eyJubyI6MSwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9";

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);