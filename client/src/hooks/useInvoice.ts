import { useQuery } from '@tanstack/react-query'
import { invoicesApi } from '../api/invoices'

export const useInvoice = (id: string | null) =>
    useQuery({
        enabled: !!id,
        queryKey: ['invoice', id],
        queryFn: () => invoicesApi.getById(id!).then(r => r.data),
    })
