import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { authApi } from '@/lib/api'

interface User {
  id: string
  username: string
  email: string
  full_name: string
  role: string
  status: string
  phone?: string
  last_login?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  sessionToken: string | null

  setSessionToken: (token: string) => void
  setTokens: (access: string, refresh: string) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sessionToken: null,

      setSessionToken: (token) => set({ sessionToken: token }),

      setTokens: (access, refresh) => {
        Cookies.set('access_token', access, { expires: 1/48, secure: true, sameSite: 'strict' })
        Cookies.set('refresh_token', refresh, { expires: 7, secure: true, sameSite: 'strict' })
        set({ isAuthenticated: true })
      },

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () => {
        authApi.logout().catch(() => {})
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        set({ user: null, isAuthenticated: false, sessionToken: null })
        window.location.href = '/auth/login'
      },
    }),
    {
      name: 'sbi-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
