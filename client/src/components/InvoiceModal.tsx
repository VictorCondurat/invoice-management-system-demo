import * as Dialog from '@radix-ui/react-dialog'
import { X, Loader2, AlertTriangle } from 'lucide-react'
import { useInvoice } from '../hooks/useInvoice'

export const InvoiceModal = ({
                                 invoiceId,
                                 open,
                                 onOpenChange,
                             }: {
    invoiceId: string | null
    open: boolean
    onOpenChange: (v: boolean) => void
}) => {
    const { data, isLoading, error } = useInvoice(invoiceId)

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg ring-1 ring-indigo-200">
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b">
                        <h2 className="text-lg font-semibold text-indigo-700">Invoice details</h2>
                        <Dialog.Close className="text-gray-500 hover:text-indigo-600">
                            <X size={20} />
                        </Dialog.Close>
                    </div>

                    {isLoading && (
                        <div className="p-6 flex justify-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="p-6 flex items-center gap-2 text-red-600">
                            <AlertTriangle size={18} />
                            Couldn’t load invoice
                        </div>
                    )}

                    {data && (
                        <div className="p-6 grid grid-cols-2 gap-y-3 text-sm">
                            <span className="text-gray-500">ID</span>
                            <span className="break-all">{data.id}</span>

                            <span className="text-gray-500">Vendor</span>
                            <span>{data.vendor_name}</span>

                            <span className="text-gray-500">Description</span>
                            <span className="break-all">{data.description}</span>

                            <span className="text-gray-500">Amount</span>
                            <span>${Number(data.amount).toLocaleString()}</span>

                            <span className="text-gray-500">Due date</span>
                            <span>{new Date(data.due_date).toLocaleDateString()}</span>

                            <span className="text-gray-500">Status</span>
                            <span
                                className={
                                    data.paid
                                        ? 'text-green-700 bg-green-100 rounded px-2 py-0.5 text-center'
                                        : 'text-blue-700 bg-blue-100 rounded px-2 py-0.5 text-center'
                                }
                            >
                {data.paid ? 'Paid' : 'Open'}
              </span>
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
