import {useState} from 'react'
import {ChevronsUpDown, AlertTriangle} from 'lucide-react'
import {useInvoices} from '../hooks/useInvoices'
import {InvoiceModal} from '../components/InvoiceModal'

export const Invoices = () => {
    const {data, isLoading, error} = useInvoices()
    const [asc, setAsc] = useState(true)
    const [selected, setSelected] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    if (isLoading) return null
    if (error)
        return (
            <div className="flex items-center gap-2 p-8 text-red-600">
                <AlertTriangle size={18}/>
                <span>Couldn’t load invoices</span>
            </div>
        )
    const sorted = [...(data ?? [])].sort((a, b) =>
        asc ? +a.amount - +b.amount : +b.amount - +a.amount
    )
    return (
        <>
            <div className="p-8">
                <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-indigo-300 text-white">
                        <tr className="divide-x-2 divide-white">
                            <th className="w-12 text-left px-4 py-4">
                                <input type="checkbox" className="accent-indigo-600"/>
                            </th>
                            {['Date', 'Payee', 'Description', 'Due Date'].map(h => (
                                <th key={h} className="text-left px-4 py-4">
                                    {h}
                                </th>
                            ))}
                            <th
                                className="text-left px-4 py-4 cursor-pointer select-none"
                                onClick={() => setAsc(!asc)}
                            >
                  <span className="flex items-center gap-1">
                    Amount
                    <ChevronsUpDown size={14}/>
                  </span>
                            </th>
                            <th className="text-left px-4 py-4">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sorted.map(i => (
                            <tr
                                key={i.id}
                                className="cursor-pointer hover:bg-indigo-100/40 divide-x divide-indigo-100"
                                onClick={() => {
                                    setSelected(i.id)
                                    setOpen(true)
                                }}>
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="accent-indigo-600"/>
                                </td>
                                <td className="px-4 py-4">
                                    {new Date(i.due_date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4">{i.vendor_name}</td>
                                <td className="px-4 py-4">{i.description}</td>
                                <td className="px-4 py-4">
                                    {new Date(i.due_date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4">
                                    ${Number(i.amount).toLocaleString()}
                                </td>
                                <td className="px-4 py-4">
                    <span
                        className={
                            i.paid
                                ? 'text-green-700 bg-green-100 rounded px-2 py-0.5'
                                : 'text-blue-700 bg-blue-100 rounded px-2 py-0.5'
                        }
                    >
                      {i.paid ? 'Paid' : 'Open'}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <InvoiceModal invoiceId={selected} open={open} onOpenChange={setOpen}/>
        </>
    )
}
