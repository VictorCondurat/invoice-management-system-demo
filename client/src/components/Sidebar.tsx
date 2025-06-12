import {NavLink} from 'react-router-dom'

const items = [
    {to: '/home', label: 'Home'},
    {to: '/invoices', label: 'Invoices'},
    {to: '/bills', label: 'Bills'},
    {to: '/expenses', label: 'Expenses'},
    {to: '/reports', label: 'Reports'},
]
export const Sidebar = () => (
    <aside className="w-60 bg-gradient-to-b from-indigo-200 to-indigo-400 text-sm">
        <div className="h-20 flex items-center px-8">
            <div className="w-32 h-14 rounded-md bg-white flex items-center justify-center text-gray-500 font-bold">
                LOGO
            </div>
        </div>
        <nav className="mt-4 space-y-2">
            {items.map(i => (
                <NavLink
                    key={i.to}
                    to={i.to}
                    className={({isActive}) =>
                        `block pl-8 pr-4 py-2 ${isActive ? 'font-medium text-indigo-800' : 'text-indigo-900'}`
                    }
                >
                    {i.label}
                </NavLink>
            ))}
        </nav>
    </aside>
)
