import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type {RootState} from '../store/store'
import { loginSuccess, logout } from '../store/authSlice'
import { authApi, type LoginData } from '../api/auth'

export const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector((state: RootState) => state.auth)

    const loginMutation = useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
        onSuccess: (response) => {
            dispatch(loginSuccess({
                user: response.data.user,
            }))
            navigate('/invoices')
        },
    })

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return {
        ...auth,
        login: loginMutation.mutate,
        logout: handleLogout,
        isLoading: loginMutation.isPending,
        error: loginMutation.error,
    }
}