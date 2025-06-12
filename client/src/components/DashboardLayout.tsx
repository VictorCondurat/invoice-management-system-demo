import { Outlet, useLocation } from 'react-router-dom'
import {Sidebar} from './Sidebar'
import {Topbar} from './Topbar'
export const DashboardLayout =  () => {
    const { pathname } = useLocation()
    const path = pathname.split('/').filter(Boolean)
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar path={path} />
                <main className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
