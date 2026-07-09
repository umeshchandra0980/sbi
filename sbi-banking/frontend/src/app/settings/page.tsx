'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { Shield, User, Key } from 'lucide-react'

const passwordSchema = z.object({
  current_password: z.string().min(1, 'Required'),
  new_password: z.string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Must include uppercase letter')
    .regex(/[0-9]/, 'Must include a number')
    .regex(/[!@#$%^&*]/, 'Must include a special character'),
  confirm_password: z.string().min(1, 'Required'),
}).refine(d => d.new_password === d.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

type PasswordForm = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'security'>('profile')

  const form = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) })

  const changePwdMutation = useMutation({
    mutationFn: (data: PasswordForm) => authApi.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully')
      form.reset()
    },
    onError: (err: any) => toast.error(err.response?.data?.detail || 'Failed to change password'),
  })

  return (
    <div className="p-5 space-y-4 max-w-3xl">
      <h2 className="text-base font-bold text-gray-800">Settings</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'profile', label: 'Profile', icon: User },
          { key: 'password', label: 'Change Password', icon: Key },
          { key: 'security', label: 'Security', icon: Shield },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key as any)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === key ? 'border-sbi-blue text-sbi-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <div className="sbi-card p-5 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-14 h-14 rounded-full bg-sbi-blue text-white flex items-center justify-center text-2xl font-bold">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div>
              <p className="font-bold text-gray-800">{user?.full_name}</p>
              <p className="text-xs text-gray-500">@{user?.username}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold mt-1 inline-block ${
                user?.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>{user?.role?.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              { label: 'Full Name', value: user?.full_name },
              { label: 'Username', value: user?.username },
              { label: 'Email Address', value: user?.email },
              { label: 'Mobile Number', value: user?.phone || 'Not set' },
              { label: 'Account Status', value: user?.status },
              { label: 'Last Login', value: user?.last_login ? new Date(user.last_login).toLocaleString('en-IN') : 'N/A' },
            ].map(({ label, value }) => (
              <div key={label} className="border-b pb-2">
                <p className="text-gray-400 text-[10px] uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
            To update your profile details, please visit your nearest SBI branch with valid identity proof.
          </div>
        </div>
      )}

      {/* Password tab */}
      {activeTab === 'password' && (
        <div className="sbi-card p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Change Login Password</h3>
          <form onSubmit={form.handleSubmit(d => changePwdMutation.mutate(d))} className="space-y-4 max-w-sm">
            <div>
              <label className="block text-xs font-bold mb-1">Current Password *</label>
              <input {...form.register('current_password')} type="password" className="sbi-input" />
              {form.formState.errors.current_password && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.current_password.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">New Password *</label>
              <input {...form.register('new_password')} type="password" className="sbi-input" />
              {form.formState.errors.new_password && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.new_password.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Confirm New Password *</label>
              <input {...form.register('confirm_password')} type="password" className="sbi-input" />
              {form.formState.errors.confirm_password && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.confirm_password.message}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-sbi-blue space-y-0.5">
              <p className="font-bold">Password requirements:</p>
              <p>• At least 8 characters</p>
              <p>• At least one uppercase letter (A-Z)</p>
              <p>• At least one number (0-9)</p>
              <p>• At least one special character (!@#$%^&*)</p>
            </div>

            <button type="submit" disabled={changePwdMutation.isPending} className="sbi-btn-primary disabled:opacity-50">
              {changePwdMutation.isPending ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      )}

      {/* Security tab */}
      {activeTab === 'security' && (
        <div className="sbi-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Security Settings</h3>
          {[
            { title: 'OTP-based Login', desc: 'Your account is secured with OTP verification on every login.', status: 'Enabled', color: 'green' },
            { title: '256-bit SSL Encryption', desc: 'All data transmitted to and from SBI is encrypted.', status: 'Active', color: 'green' },
            { title: 'Login Attempt Monitoring', desc: 'Account is auto-locked after 5 failed login attempts.', status: 'Active', color: 'green' },
            { title: 'Session Timeout', desc: 'Your session automatically expires after 30 minutes of inactivity.', status: '30 min', color: 'blue' },
          ].map(({ title, desc, status, color }) => (
            <div key={title} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="text-xs font-semibold text-gray-700">{title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                color === 'green' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>{status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
