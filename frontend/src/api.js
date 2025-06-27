import axios from 'axios'
import { ACCESS_TOKEN } from './const'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
//Gets a token from localStorage (using the key ACCESS_TOKEN).
//If the token exists, it adds an Authorization header to the request with the value Bearer <token>.
//This way, the token is automatically sent with every API request for authentication.
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }

)

export default api