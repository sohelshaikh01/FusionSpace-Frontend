import axios from "axios";

const apiClient = axios.create({
    // baseURL: import.meta.env.VITE_API_RENDER_URL,
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export default apiClient;