import axios from 'axios'

import {store} from '../store/store'
import {logout} from '../store/authSlice'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
axiosInstance.interceptors.response.use(
    r => r,
    e => {
        if (e.response?.status === 401) store.dispatch(logout())
        return Promise.reject(e)
    }
)
export default axiosInstance