import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosInstanceConfig=axios.create({
    baseURL:import.meta.env.VITE_KINDRAISE_API_URL,
    
})


axiosInstanceConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    const publicRoutes = [
      "/api/auth/login",
      "/api/auth/register"
    ];

    const isPublicRoute = publicRoutes.some(route =>config.url?.includes(route));

     if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }

);


axiosInstanceConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceConfig;