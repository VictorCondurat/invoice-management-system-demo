import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import {Invoices} from './pages/Invoices'
import {PrivateRoute} from './components/PrivateRoute'
import {DashboardLayout} from './components/DashboardLayout'
import {Placeholder} from './pages/Placeholder'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route element={<DashboardLayout/>}>
                        <Route path="/home" element={<Placeholder title="Home"/>}/>
                        <Route path="/invoices" element={<Invoices/>}/>
                        <Route path="/bills" element={<Placeholder title="Bills"/>}/>
                        <Route path="/expenses" element={<Placeholder title="Expenses"/>}/>
                        <Route path="/reports" element={<Placeholder title="Reports"/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/invoices" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App