import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === "true",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User;}>) => {
            localStorage.setItem('isAuthenticated', "true")
            state.user = action.payload.user
            state.isAuthenticated = true
        },
        logout: (state) => {
            localStorage.setItem('isAuthenticated', "false")
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const {loginSuccess, logout} = authSlice.actions
export default authSlice.reducer