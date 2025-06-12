import axiosInstance from './axios'

export interface Invoice {
    id: string
    vendor_name: string
    amount: string
    due_date: string
    description: string
    paid: boolean
    user_id: string
}

export const invoicesApi = {
    getAll: () => axiosInstance.get<Invoice[]>('/invoices'),
    getById: (id: string) => axiosInstance.get<Invoice>(`/invoices/${id}`),
}