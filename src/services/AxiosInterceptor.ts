import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_KINDRAISE_API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }

);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized. Please login again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance