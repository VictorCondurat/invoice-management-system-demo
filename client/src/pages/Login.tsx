import { useState, type FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { loginSchema } from '../lib/schema'

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const { login, isLoading, error, isAuthenticated } = useAuth()

    if (isAuthenticated) return <Navigate to="/invoices" replace />

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const res = loginSchema.safeParse(form)
        if (!res.success) {
            const fieldErrors = res.error.flatten().fieldErrors
            setErrors({ email: fieldErrors.email?.[0], password: fieldErrors.password?.[0] })
            return
        }
        setErrors({})
        login(res.data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-3xl font-bold text-center">Sign in</h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {(error) && (
                        <div className="text-red-500 text-sm text-center">
                            {error ? 'Invalid credentials' : 'Fix highlighted fields'}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="Email address"
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                placeholder="Password"
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
