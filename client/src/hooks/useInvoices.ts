import { useQuery } from '@tanstack/react-query'
import { invoicesApi } from '../api/invoices'

export const useInvoices = () => {
    return useQuery({
        queryKey: ['invoices'],
        queryFn: async () => {
            const response = await invoicesApi.getAll()
            return response.data
        },
    })
}