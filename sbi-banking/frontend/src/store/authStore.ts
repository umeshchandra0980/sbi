import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { MOCK_USER } from '@/lib/mockData'

export interface User {
  id: string
  username: string
  email: string
  full_name: string
  role: string
  status: string
  phone?: string
  last_login?: string
  is_verified?: boolean
  created_at?: string
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
    (set) => ({
      user: MOCK_USER,
      isAuthenticated: true,
      isLoading: false,
      sessionToken: 'session_mock_123',

      setSessionToken: (token) => set({ sessionToken: token }),

      setTokens: (access, refresh) => {
        Cookies.set('access_token', access, { expires: 1 })
        Cookies.set('refresh_token', refresh, { expires: 7 })
        set({ isAuthenticated: true })
      },

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        if (typeof window !== 'undefined') {
          try {
            localStorage.clear()
            sessionStorage.clear()
          } catch (e) {
            console.error('Failed to clear storage:', e)
          }
        }
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
