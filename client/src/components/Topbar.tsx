import {
    Home,
    Search,
    Filter,
    Bell,
    Settings,
    Moon,
    User,
    LogOut,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const Topbar = ({ path }: { path: string[] }) => {
    const { logout } = useAuth()
    return (
        <header className="flex items-center gap-6 px-8 pt-4 pb-2 border-b">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Home size={16} />
                <span>Home</span>
                <span>/</span>
                <span className="capitalize">{path[0] ?? ''}</span>
            </div>

            <div className="ml-auto relative">
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <Filter size={18} className="absolute right-3 top-2.5 text-gray-400" />
                <input className="pl-9 pr-9 py-2 rounded-md bg-gray-100 text-sm" placeholder="Search" />
            </div>

            <Bell size={20} />
            <Settings size={20} />
            <Moon size={20} />

            <div className="relative group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={18} />
                </div>
                <button
                    onClick={logout}
                    className="absolute right-0 top-full hidden group-hover:flex bg-white border rounded shadow py-1 px-3 text-sm items-center gap-2"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </header>
    )
}
