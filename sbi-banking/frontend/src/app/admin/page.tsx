'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import { Users, Wallet, TrendingUp, AlertCircle, Lock, Unlock, UserPlus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'transactions'>('stats')
  const [userSearch, setUserSearch] = useState('')
  const [userPage, setUserPage] = useState(1)
  const [txnPage, setTxnPage] = useState(1)
  const qc = useQueryClient()

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.stats().then(r => r.data),
  })

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users', userPage, userSearch],
    queryFn: () => adminApi.listUsers({ page: userPage, page_size: 20, search: userSearch }).then(r => r.data),
    enabled: activeTab === 'users',
  })

  const { data: txns } = useQuery({
    queryKey: ['admin-transactions', txnPage],
    queryFn: () => adminApi.listTransactions({ page: txnPage, page_size: 20 }).then(r => r.data),
    enabled: activeTab === 'transactions',
  })

  const lockMutation = useMutation({
    mutationFn: (id: string) => adminApi.lockUser(id),
    onSuccess: () => { toast.success('User locked'); qc.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  const unlockMutation = useMutation({
    mutationFn: (id: string) => adminApi.unlockUser(id),
    onSuccess: () => { toast.success('User unlocked'); qc.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-gray-800">Admin Panel</h2>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">Administrator</span>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: stats.total_users, icon: Users, color: 'blue' },
            { label: 'Active Users', value: stats.active_users, icon: Users, color: 'green' },
            { label: 'Locked Users', value: stats.locked_users, icon: AlertCircle, color: 'red' },
            { label: 'Total Accounts', value: stats.total_accounts, icon: Wallet, color: 'blue' },
            { label: 'Total Balance', value: formatIndianCurrency(stats.total_balance), icon: TrendingUp, color: 'green' },
            { label: "Today's Transactions", value: stats.total_transactions_today, icon: TrendingUp, color: 'blue' },
            { label: "Today's Transfers", value: stats.total_transfers_today, icon: TrendingUp, color: 'purple' },
            { label: 'Pending Transfers', value: stats.pending_transfers, icon: AlertCircle, color: 'yellow' },
          ].map(({ label, value, icon: Icon, color }) => {
            const colorMap: Record<string, string> = {
              blue: 'bg-blue-50 border-blue-200 text-sbi-blue',
              green: 'bg-green-50 border-green-200 text-green-700',
              red: 'bg-red-50 border-red-200 text-red-600',
              purple: 'bg-purple-50 border-purple-200 text-purple-700',
              yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
            }
            return (
              <div key={label} className={`sbi-card border p-4 ${colorMap[color]}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-xl font-bold">{value}</p>
                  </div>
                  <Icon size={20} className="opacity-50" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'stats', label: 'Overview' },
          { key: 'users', label: 'Users' },
          { key: 'transactions', label: 'All Transactions' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as any)}
            className={`px-5 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === t.key ? 'border-sbi-blue text-sbi-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Users tab */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={userSearch}
                onChange={e => { setUserSearch(e.target.value); setUserPage(1) }}
                placeholder="Search username / email..."
                className="sbi-input pl-8 text-xs w-64"
              />
            </div>
            <span className="text-xs text-gray-500">{users?.total || 0} users total</span>
          </div>

          <div className="sbi-card overflow-hidden">
            <table className="w-full sbi-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Failed Logins</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersLoading && <tr><td colSpan={9} className="text-center py-8 text-gray-400">Loading...</td></tr>}
                {users?.items?.map((u: any) => (
                  <tr key={u.id}>
                    <td className="font-mono text-[11px] font-semibold">{u.username}</td>
                    <td className="text-[11px]">{u.full_name}</td>
                    <td className="text-[11px] text-gray-500">{u.email}</td>
                    <td className="text-[11px]">{u.phone || '—'}</td>
                    <td>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700' :
                        u.role === 'manager' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{u.role}</span>
                    </td>
                    <td>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        u.status === 'active' ? 'bg-green-100 text-green-700' :
                        u.status === 'locked' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{u.status}</span>
                    </td>
                    <td className={`text-xs text-center ${u.failed_login_attempts > 3 ? 'text-red-600 font-bold' : ''}`}>
                      {u.failed_login_attempts}
                    </td>
                    <td className="text-[10px] text-gray-400 whitespace-nowrap">
                      {u.last_login ? formatDate(u.last_login, 'short') : 'Never'}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {u.status === 'active' ? (
                          <button
                            onClick={() => lockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded hover:bg-red-100"
                          >
                            <Lock size={10} /> Lock
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[10px] bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded hover:bg-green-100"
                          >
                            <Unlock size={10} /> Unlock
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users && users.pages > 1 && (
              <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50">
                <span className="text-xs text-gray-500">Page {users.page} of {users.pages}</span>
                <div className="flex gap-1">
                  <button onClick={() => setUserPage(p => Math.max(1, p - 1))} disabled={userPage === 1}
                    className="text-xs border px-2 py-1 rounded disabled:opacity-40">Prev</button>
                  <button onClick={() => setUserPage(p => Math.min(users.pages, p + 1))} disabled={userPage === users.pages}
                    className="text-xs border px-2 py-1 rounded disabled:opacity-40">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transactions tab */}
      {activeTab === 'transactions' && (
        <div className="sbi-card overflow-hidden">
          <table className="w-full sbi-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Ref No.</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Balance After</th>
              </tr>
            </thead>
            <tbody>
              {txns?.items?.map((t: any) => (
                <tr key={t.id}>
                  <td className="text-[11px] whitespace-nowrap">{formatDate(t.value_date, 'short')}</td>
                  <td className="font-mono text-[10px] text-gray-500">{t.transaction_ref}</td>
                  <td className="text-[11px] max-w-[200px] truncate">{t.description}</td>
                  <td><span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded capitalize">{t.category?.replace('_', ' ')}</span></td>
                  <td>
                    <span className={`text-[10px] font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td className={`text-right text-xs font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'credit' ? '+' : '-'}{formatIndianCurrency(t.amount)}
                  </td>
                  <td className="text-right text-xs">{formatIndianCurrency(t.balance_after)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {txns && txns.pages > 1 && (
            <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50">
              <span className="text-xs text-gray-500">Page {txns.page} of {txns.pages}</span>
              <div className="flex gap-1">
                <button onClick={() => setTxnPage(p => Math.max(1, p - 1))} disabled={txnPage === 1}
                  className="text-xs border px-2 py-1 rounded disabled:opacity-40">Prev</button>
                <button onClick={() => setTxnPage(p => Math.min(txns.pages, p + 1))} disabled={txnPage === txns.pages}
                  className="text-xs border px-2 py-1 rounded disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
