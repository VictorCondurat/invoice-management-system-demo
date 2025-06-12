import axiosInstance from './axios'

export interface LoginData {
    email: string
    password: string
}

export interface LoginResponse {
    user: {
        id: string
        email: string
        name: string
    }
}

export const authApi = {
    login: (data: LoginData) =>
        axiosInstance.post<LoginResponse>('/auth/login', data),
}