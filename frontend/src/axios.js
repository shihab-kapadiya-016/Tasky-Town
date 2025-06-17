import axios from "axios";


const api = axios.create({
    baseURL: "/api/v1",  
    withCredentials: true,
});


api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await api.get("/auth/refresh-token"); 
            return api(originalRequest); 
        } catch (refreshError) {
            console.log("Refresh token failed", refreshError);
            return Promise.reject(refreshError);
        }
        }

        return Promise.reject(error);
    }
);

export default api;