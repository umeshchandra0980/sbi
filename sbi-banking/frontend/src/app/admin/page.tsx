'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import {
  Users, Wallet, TrendingUp, Lock, Unlock, UserPlus, Search,
  ShieldAlert, KeyRound, RefreshCw, ArrowUpRight, FileText,
  Building2, Activity, Eye, ShieldCheck, Landmark, CheckCircle2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'accounts' | 'transactions' | 'transfers' | 'audit_logs'>('stats')
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Filtering states
  const [userSearch, setUserSearch] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userStatus, setUserStatus] = useState('')
  const [userPage, setUserPage] = useState(1)

  const [accSearch, setAccSearch] = useState('')
  const [accStatus, setAccStatus] = useState('')
  const [accPage, setAccPage] = useState(1)

  const [txnSearch, setTxnSearch] = useState('')
  const [txnType, setTxnType] = useState('')
  const [txnCategory, setTxnCategory] = useState('')
  const [txnPage, setTxnPage] = useState(1)

  const [trSearch, setTrSearch] = useState('')
  const [trStatus, setTrStatus] = useState('')
  const [trPage, setTrPage] = useState(1)

  const [auditAction, setAuditAction] = useState('')
  const [auditPage, setAuditPage] = useState(1)

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '', email: '', phone: '', full_name: '', password: '', role: 'customer'
  })

  const [roleModalUser, setRoleModalUser] = useState<any>(null)
  const [targetRole, setTargetRole] = useState('customer')

  const [resetPassResult, setResetPassResult] = useState<{ username: string; tempPass: string } | null>(null)
  const [selectedUserDetail, setSelectedUserDetail] = useState<any>(null)

  const qc = useQueryClient()

  // ── Real-time Queries ─────────────────────────────────────────
  const { data: stats, isFetching: isStatsFetching, refetch: refetchStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.stats().then(r => r.data),
    refetchInterval: autoRefresh ? 10000 : false,
  })

  const { data: usersData, isLoading: usersLoading, isFetching: usersFetching, refetch: refetchUsers } = useQuery({
    queryKey: ['admin-users', userPage, userSearch, userRole, userStatus],
    queryFn: () => adminApi.listUsers({ page: userPage, page_size: 15, search: userSearch, role: userRole, status: userStatus }).then(r => r.data),
    enabled: activeTab === 'users' || activeTab === 'stats',
    refetchInterval: autoRefresh ? 10000 : false,
  })

  const { data: accsData, isLoading: accsLoading, isFetching: accsFetching, refetch: refetchAccs } = useQuery({
    queryKey: ['admin-accounts', accPage, accSearch, accStatus],
    queryFn: () => adminApi.listAccounts({ page: accPage, page_size: 15, search: accSearch, status: accStatus }).then(r => r.data),
    enabled: activeTab === 'accounts',
    refetchInterval: autoRefresh ? 10000 : false,
  })

  const { data: txnsData, isLoading: txnsLoading, isFetching: txnsFetching, refetch: refetchTxns } = useQuery({
    queryKey: ['admin-transactions', txnPage, txnSearch, txnType, txnCategory],
    queryFn: () => adminApi.listTransactions({ page: txnPage, page_size: 15, search: txnSearch, type: txnType, category: txnCategory }).then(r => r.data),
    enabled: activeTab === 'transactions',
    refetchInterval: autoRefresh ? 10000 : false,
  })

  const { data: trsData, isLoading: trsLoading, isFetching: trsFetching, refetch: refetchTrs } = useQuery({
    queryKey: ['admin-transfers', trPage, trSearch, trStatus],
    queryFn: () => adminApi.listTransfers({ page: trPage, page_size: 15, search: trSearch, status: trStatus }).then(r => r.data),
    enabled: activeTab === 'transfers',
    refetchInterval: autoRefresh ? 10000 : false,
  })

  const { data: auditData, isLoading: auditLoading, isFetching: auditFetching, refetch: refetchAudit } = useQuery({
    queryKey: ['admin-audit-logs', auditPage, auditAction],
    queryFn: () => adminApi.listAuditLogs({ page: auditPage, page_size: 15, action: auditAction }).then(r => r.data),
    enabled: activeTab === 'audit_logs' || activeTab === 'stats',
    refetchInterval: autoRefresh ? 10000 : false,
  })

  // ── Mutations ──────────────────────────────────────────────────
  const lockMutation = useMutation({
    mutationFn: (id: string) => adminApi.lockUser(id),
    onSuccess: () => {
      toast.success('User locked successfully')
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to lock user'),
  })

  const unlockMutation = useMutation({
    mutationFn: (id: string) => adminApi.unlockUser(id),
    onSuccess: () => {
      toast.success('User unlocked successfully')
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to unlock user'),
  })

  const suspendMutation = useMutation({
    mutationFn: (id: string) => adminApi.suspendUser(id),
    onSuccess: () => {
      toast.success('User suspended')
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to suspend user'),
  })

  const freezeMutation = useMutation({
    mutationFn: (id: string) => adminApi.freezeAccount(id),
    onSuccess: () => {
      toast.success('Account frozen')
      qc.invalidateQueries({ queryKey: ['admin-accounts'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to freeze account'),
  })

  const unfreezeMutation = useMutation({
    mutationFn: (id: string) => adminApi.unfreezeAccount(id),
    onSuccess: () => {
      toast.success('Account unfrozen')
      qc.invalidateQueries({ queryKey: ['admin-accounts'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to unfreeze account'),
  })

  const resetPassMutation = useMutation({
    mutationFn: (id: string) => adminApi.resetUserPassword(id),
    onSuccess: (res: any, id: string) => {
      const user = usersData?.items?.find((u: any) => u.id === id)
      setResetPassResult({ username: user?.username || 'User', tempPass: res.data.temporary_password })
      toast.success('Temporary password generated')
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to reset password'),
  })

  const roleChangeMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminApi.changeUserRole(id, role),
    onSuccess: () => {
      toast.success('User role updated')
      setRoleModalUser(null)
      qc.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to change role'),
  })

  const createUserMutation = useMutation({
    mutationFn: (data: object) => adminApi.createUser(data),
    onSuccess: () => {
      toast.success('User account provisioned successfully')
      setShowCreateModal(false)
      setNewUser({ username: '', email: '', phone: '', full_name: '', password: '', role: 'customer' })
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
    onError: (err: any) => toast.error(err?.response?.data?.detail || 'Failed to create user'),
  })

  const triggerRefreshAll = () => {
    refetchStats()
    refetchUsers()
    refetchAccs()
    refetchTxns()
    refetchTrs()
    refetchAudit()
    toast.success('Refreshed real-time SBI data')
  }

  const isAnyFetching = isStatsFetching || usersFetching || accsFetching || txnsFetching || trsFetching || auditFetching

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 space-y-5">
      {/* ── SBI BRAND EXECUTIVE HEADER ────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0d2137] via-[#154360] to-[#1a5276] text-white p-5 rounded-xl shadow-lg border-b-4 border-amber-400 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/5 skew-x-12 pointer-events-none" />
        
        <div className="flex flex-wrap justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-[#154360] flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-400">
              <Landmark size={26} className="text-[#154360]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">STATE BANK OF INDIA</h1>
                <span className="text-[10px] bg-amber-400 text-[#0d2137] font-black px-2.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
                  ADMINISTRATIVE CONSOLE
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1 flex items-center gap-2">
                <span>Central Core Banking Operations & Security Audit</span>
                <span className="text-blue-300">•</span>
                <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  REALTIME BACKEND SYNC
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-blue-100 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-xs cursor-pointer hover:bg-white/20 transition-all">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                className="rounded text-amber-400 focus:ring-amber-400"
              />
              Auto Sync (10s)
            </label>

            <button
              onClick={triggerRefreshAll}
              disabled={isAnyFetching}
              className="flex items-center gap-2 text-xs bg-amber-400 hover:bg-amber-300 text-[#0d2137] font-extrabold px-4 py-2 rounded-lg transition-all shadow-md disabled:opacity-50"
            >
              <RefreshCw size={14} className={isAnyFetching ? 'animate-spin' : ''} />
              {isAnyFetching ? 'Syncing...' : 'Sync Engine'}
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-lg transition-all shadow-md"
            >
              <UserPlus size={15} /> Provision User
            </button>
          </div>
        </div>
      </div>

      {/* ── METRICS SUMMARY CARDS ────────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-[#154360] hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">User Base</p>
                <p className="text-2xl font-black text-[#154360] mt-1">{stats.total_users}</p>
                <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 size={13} /> {stats.active_users} Active Accounts
                </p>
              </div>
              <div className="p-3 bg-blue-50 text-[#154360] rounded-lg">
                <Users size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-red-600 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Locked Accounts</p>
                <p className="text-2xl font-black text-red-600 mt-1">{stats.locked_users}</p>
                <p className="text-[11px] text-red-700 font-semibold mt-1">Requires Admin Interventions</p>
              </div>
              <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                <ShieldAlert size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-amber-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">System Deposits</p>
                <p className="text-xl font-black text-gray-900 mt-1">{formatIndianCurrency(stats.total_balance)}</p>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">{stats.total_accounts} Total Accounts</p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <Wallet size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-purple-600 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">24H Activity</p>
                <p className="text-2xl font-black text-purple-900 mt-1">{stats.total_transactions_today}</p>
                <p className="text-[11px] text-purple-700 font-semibold mt-1">
                  {stats.total_transfers_today} Transfers ({stats.pending_transfers} Pending)
                </p>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <TrendingUp size={22} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SBI BRAND TABS ────────────────────────────────────── */}
      <div className="bg-[#154360] p-1.5 rounded-xl shadow-md flex gap-1 overflow-x-auto">
        {[
          { key: 'stats', label: 'Overview & Operations', icon: Activity },
          { key: 'users', label: 'User Directory', icon: Users, count: usersData?.total },
          { key: 'accounts', label: 'Bank Accounts', icon: Building2, count: accsData?.total },
          { key: 'transactions', label: 'Transaction Ledger', icon: FileText, count: txnsData?.total },
          { key: 'transfers', label: 'Interbank Transfers', icon: ArrowUpRight, count: trsData?.total },
          { key: 'audit_logs', label: 'Security Audit Log', icon: ShieldCheck, count: auditData?.total },
        ].map(t => {
          const Icon = t.icon
          const isActive = activeTab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-[#0d2137] shadow-sm font-extrabold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Icon size={15} />
              {t.label}
              {t.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${isActive ? 'bg-[#0d2137] text-amber-400' : 'bg-white/20 text-white'}`}>
                  {t.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── OVERVIEW & OPERATIONS ────────────────────────────────────── */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Quick Operations Panel */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-[#154360] border-b border-gray-200 pb-2.5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#154360]" />
              Core Administrative Operations
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setActiveTab('users'); setUserStatus('locked') }}
                className="p-3.5 text-left border rounded-xl bg-red-50/70 border-red-200 hover:bg-red-100 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-red-800 group-hover:underline">Review Locked Users</span>
                  <Lock size={15} className="text-red-600" />
                </div>
                <p className="text-[11px] text-red-600">Inspect & unlock accounts flagged for security</p>
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="p-3.5 text-left border rounded-xl bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-emerald-900 group-hover:underline">Provision User</span>
                  <UserPlus size={15} className="text-emerald-700" />
                </div>
                <p className="text-[11px] text-emerald-700">Add Customer, Manager or Administrator</p>
              </button>

              <button
                onClick={() => setActiveTab('accounts')}
                className="p-3.5 text-left border rounded-xl bg-blue-50/70 border-blue-200 hover:bg-blue-100 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#154360] group-hover:underline">Account Supervision</span>
                  <Building2 size={15} className="text-[#154360]" />
                </div>
                <p className="text-[11px] text-[#154360]">Freeze or monitor high balance accounts</p>
              </button>

              <button
                onClick={() => setActiveTab('audit_logs')}
                className="p-3.5 text-left border rounded-xl bg-purple-50/70 border-purple-200 hover:bg-purple-100 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-purple-900 group-hover:underline">Security Audit Logs</span>
                  <FileText size={15} className="text-purple-700" />
                </div>
                <p className="text-[11px] text-purple-700">Complete audit trail of system modifications</p>
              </button>
            </div>
          </div>

          {/* Audit Trail Snapshot */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2.5">
              <h3 className="text-sm font-extrabold text-[#154360] flex items-center gap-2">
                <Activity size={18} className="text-purple-600" />
                Live Security Audit Log
              </h3>
              <button onClick={() => setActiveTab('audit_logs')} className="text-xs font-bold text-[#154360] hover:underline">
                View Full Logs →
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {auditData?.items?.length ? (
                auditData.items.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 uppercase tracking-tight">{log.action?.replace('_', ' ')}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{formatDate(log.created_at, 'short')}</span>
                    </div>
                    <p className="text-gray-700 text-[11px]">{log.details || 'No detail recorded'}</p>
                    <div className="flex justify-between text-[10px] text-gray-500 pt-0.5">
                      <span>Admin: <strong className="text-[#154360]">{log.admin_username || log.user_id}</strong></span>
                      <span>IP: <strong className="font-mono">{log.ip_address}</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center py-8 text-gray-400">No recent security events.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── USER DIRECTORY ────────────────────────────────────── */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={userSearch}
                  onChange={e => { setUserSearch(e.target.value); setUserPage(1) }}
                  placeholder="Search username, email, full name..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-yellow-50/50 focus:ring-2 focus:ring-[#154360] focus:outline-none"
                />
              </div>
              <select
                value={userRole}
                onChange={e => { setUserRole(e.target.value); setUserPage(1) }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white font-semibold text-gray-700 focus:ring-1 focus:ring-[#154360]"
              >
                <option value="">All Roles</option>
                <option value="customer">Customer</option>
                <option value="manager">Manager</option>
                <option value="admin">Administrator</option>
              </select>
              <select
                value={userStatus}
                onChange={e => { setUserStatus(e.target.value); setUserPage(1) }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white font-semibold text-gray-700 focus:ring-1 focus:ring-[#154360]"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="locked">Locked</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <span className="text-xs font-bold text-[#154360]">{usersData?.total || 0} user account(s)</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs sbi-table">
              <thead>
                <tr>
                  <th>User Identity</th>
                  <th>Contact Details</th>
                  <th>Role</th>
                  <th>Account Status</th>
                  <th className="text-center">Failed Logins</th>
                  <th>Last Login</th>
                  <th className="text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {usersLoading && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">Querying SBI user directory...</td></tr>
                )}
                {!usersLoading && !usersData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No users found matching search criteria.</td></tr>
                )}
                {usersData?.items?.map((u: any) => (
                  <tr key={u.id}>
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{u.full_name}</div>
                      <div className="font-mono text-[11px] text-[#154360] font-bold">@{u.username}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-800 font-medium">{u.email}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{u.phone || 'No phone'}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        u.role === 'admin' ? 'bg-red-100 text-red-800 border border-red-300' :
                        u.role === 'manager' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                        'bg-blue-100 text-[#154360] border border-blue-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        u.status === 'locked' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className={`p-3 text-center font-black text-sm ${u.failed_login_attempts > 2 ? 'text-red-600' : 'text-gray-700'}`}>
                      {u.failed_login_attempts || 0}
                    </td>
                    <td className="p-3 text-[11px] text-gray-500 whitespace-nowrap">
                      {u.last_login ? formatDate(u.last_login, 'short') : 'Never'}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button
                          onClick={() => setSelectedUserDetail(u)}
                          title="View Profile Details"
                          className="p-1.5 text-gray-700 hover:text-[#154360] bg-gray-100 rounded hover:bg-gray-200 border border-gray-300"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={() => { setRoleModalUser(u); setTargetRole(u.role) }}
                          title="Change Role"
                          className="p-1.5 text-purple-800 bg-purple-50 rounded hover:bg-purple-100 border border-purple-300"
                        >
                          <ShieldCheck size={13} />
                        </button>

                        <button
                          onClick={() => resetPassMutation.mutate(u.id)}
                          title="Generate Temp Password"
                          className="p-1.5 text-amber-800 bg-amber-50 rounded hover:bg-amber-100 border border-amber-300"
                        >
                          <KeyRound size={13} />
                        </button>

                        {u.status === 'active' ? (
                          <button
                            onClick={() => lockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-300 px-2.5 py-1 rounded hover:bg-red-100"
                          >
                            <Lock size={12} /> Lock
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded hover:bg-emerald-100"
                          >
                            <Unlock size={12} /> Unlock
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usersData && usersData.pages > 1 && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-semibold text-gray-600">Page {usersData.page} of {usersData.pages}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserPage(p => Math.max(1, p - 1))}
                  disabled={userPage === 1}
                  className="px-3 py-1 text-xs font-bold border rounded-lg bg-gray-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setUserPage(p => Math.min(usersData.pages, p + 1))}
                  disabled={userPage === usersData.pages}
                  className="px-3 py-1 text-xs font-bold border rounded-lg bg-gray-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── BANK ACCOUNTS DIRECTORY ────────────────────────────────────── */}
      {activeTab === 'accounts' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={accSearch}
                  onChange={e => { setAccSearch(e.target.value); setAccPage(1) }}
                  placeholder="Search account number, owner, branch..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-yellow-50/50 focus:ring-2 focus:ring-[#154360] focus:outline-none"
                />
              </div>
              <select
                value={accStatus}
                onChange={e => { setAccStatus(e.target.value); setAccPage(1) }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white font-semibold text-gray-700 focus:ring-1 focus:ring-[#154360]"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="frozen">Frozen</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <span className="text-xs font-bold text-[#154360]">{accsData?.total || 0} account(s) found</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs sbi-table">
              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Account Holder</th>
                  <th>Account Type</th>
                  <th>Branch & IFSC</th>
                  <th className="text-right">Ledger Balance</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {accsLoading && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">Fetching bank account ledger...</td></tr>
                )}
                {!accsLoading && !accsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No bank accounts located.</td></tr>
                )}
                {accsData?.items?.map((acc: any) => (
                  <tr key={acc.id}>
                    <td className="p-3 font-mono font-black text-gray-900 text-sm">{acc.account_number}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{acc.owner_name || 'N/A'}</div>
                      <div className="text-[10px] font-bold text-[#154360]">@{acc.owner_username || 'user'}</div>
                    </td>
                    <td className="p-3 uppercase font-extrabold text-gray-700">{acc.account_type?.replace('_', ' ')}</td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800">{acc.branch_name || 'Main Branch'}</div>
                      <div className="font-mono text-[10px] text-gray-500 font-bold">{acc.ifsc_code}</div>
                    </td>
                    <td className="p-3 text-right font-mono font-black text-sm text-[#154360]">
                      {formatIndianCurrency(acc.balance)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        acc.status === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        acc.status === 'frozen' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {acc.status === 'active' ? (
                        <button
                          onClick={() => freezeMutation.mutate(acc.id)}
                          className="text-[11px] font-extrabold text-red-700 bg-red-50 border border-red-300 px-3 py-1 rounded hover:bg-red-100"
                        >
                          Freeze Account
                        </button>
                      ) : (
                        <button
                          onClick={() => unfreezeMutation.mutate(acc.id)}
                          className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded hover:bg-emerald-100"
                        >
                          Unfreeze
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TRANSACTION LEDGER ────────────────────────────────────── */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={txnSearch}
                  onChange={e => { setTxnSearch(e.target.value); setTxnPage(1) }}
                  placeholder="Search ref no, description..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-yellow-50/50 focus:ring-2 focus:ring-[#154360] focus:outline-none"
                />
              </div>
              <select
                value={txnType}
                onChange={e => { setTxnType(e.target.value); setTxnPage(1) }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white font-semibold text-gray-700 focus:ring-1 focus:ring-[#154360]"
              >
                <option value="">All Types</option>
                <option value="credit">Credit (+)</option>
                <option value="debit">Debit (-)</option>
              </select>
            </div>
            <span className="text-xs font-bold text-[#154360]">{txnsData?.total || 0} transaction(s) recorded</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs sbi-table">
              <thead>
                <tr>
                  <th>Value Date</th>
                  <th>Reference Number</th>
                  <th>Transaction Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th className="text-right">Amount (₹)</th>
                  <th className="text-right">Balance After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {txnsLoading && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">Loading live transaction feed...</td></tr>
                )}
                {!txnsLoading && !txnsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No transactions recorded.</td></tr>
                )}
                {txnsData?.items?.map((t: any) => (
                  <tr key={t.id}>
                    <td className="p-3 text-[11px] text-gray-600 font-mono whitespace-nowrap">{formatDate(t.value_date, 'short')}</td>
                    <td className="p-3 font-mono font-bold text-[#154360]">{t.transaction_ref}</td>
                    <td className="p-3 font-bold text-gray-900">{t.description}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[10px] font-bold uppercase">
                        {t.category?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-black text-[10px] px-2.5 py-0.5 rounded uppercase ${t.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`p-3 text-right font-mono font-black text-sm ${t.type === 'credit' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {t.type === 'credit' ? '+' : '-'}{formatIndianCurrency(t.amount)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-gray-800">{formatIndianCurrency(t.balance_after)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── INTERBANK TRANSFERS ────────────────────────────────────── */}
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-xs font-black text-[#154360] uppercase tracking-wider">Interbank NEFT / RTGS / IMPS / UPI Live Stream</h3>
            <span className="text-xs font-bold text-[#154360]">{trsData?.total || 0} transfer(s) logged</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs sbi-table">
              <thead>
                <tr>
                  <th>Transfer Ref</th>
                  <th>Beneficiary Name</th>
                  <th>Account & IFSC</th>
                  <th>Mode</th>
                  <th className="text-right">Transfer Amount</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {trsLoading && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">Streaming interbank transfer log...</td></tr>
                )}
                {!trsLoading && !trsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No transfers found.</td></tr>
                )}
                {trsData?.items?.map((tr: any) => (
                  <tr key={tr.id}>
                    <td className="p-3 font-mono font-black text-[#154360]">{tr.transfer_ref}</td>
                    <td className="p-3 font-extrabold text-gray-900">{tr.beneficiary_name}</td>
                    <td className="p-3">
                      <div className="font-mono font-bold text-gray-800">{tr.beneficiary_account}</div>
                      <div className="font-mono text-[10px] text-gray-500 font-bold">{tr.beneficiary_ifsc}</div>
                    </td>
                    <td className="p-3 font-black text-[#154360] uppercase">{tr.transfer_mode}</td>
                    <td className="p-3 text-right font-mono font-black text-sm text-gray-900">{formatIndianCurrency(tr.amount)}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        tr.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        tr.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {tr.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">{formatDate(tr.created_at, 'short')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SECURITY AUDIT LOG TRAIL ────────────────────────────────────── */}
      {activeTab === 'audit_logs' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-xs font-black text-[#154360] uppercase tracking-wider">Cryptographic Security Audit Log Register</h3>
            <span className="text-xs font-bold text-purple-900">{auditData?.total || 0} audit log entries</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs sbi-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Administrator</th>
                  <th>Action Event</th>
                  <th>Target Resource</th>
                  <th>IP Address</th>
                  <th>Audit Detail Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {auditLoading && (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-400">Retrieving security audit log register...</td></tr>
                )}
                {!auditLoading && !auditData?.items?.length && (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-400">No security events recorded.</td></tr>
                )}
                {auditData?.items?.map((log: any) => (
                  <tr key={log.id}>
                    <td className="p-3 text-[11px] text-gray-600 font-mono whitespace-nowrap">{formatDate(log.created_at, 'short')}</td>
                    <td className="p-3 font-extrabold text-[#154360]">{log.admin_username || log.user_id}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-black uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-gray-800 font-bold">{log.resource}:{log.resource_id}</td>
                    <td className="p-3 font-mono text-[11px] text-gray-600">{log.ip_address}</td>
                    <td className="p-3 text-gray-800 font-medium">{log.details || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CREATE USER PROVISIONING MODAL ────────────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden border-2 border-[#154360]">
            <div className="bg-gradient-to-r from-[#0d2137] to-[#154360] text-white p-4 flex justify-between items-center">
              <h3 className="text-sm font-black flex items-center gap-2 tracking-wide">
                <UserPlus size={18} className="text-amber-400" />
                PROVISION NEW USER ACCOUNT
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-white hover:text-amber-400 font-bold text-sm">✕</button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault()
                createUserMutation.mutate(newUser)
              }}
              className="p-5 space-y-3"
            >
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase">Username</label>
                <input
                  required
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  className="sbi-input mt-1"
                  placeholder="e.g. rohit.verma"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase">Full Name</label>
                <input
                  required
                  value={newUser.full_name}
                  onChange={e => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="sbi-input mt-1"
                  placeholder="e.g. Rohit Verma"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black text-gray-600 uppercase">Email</label>
                  <input
                    required
                    type="email"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    className="sbi-input mt-1"
                    placeholder="rohit@example.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-600 uppercase">Phone</label>
                  <input
                    value={newUser.phone}
                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                    className="sbi-input mt-1"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black text-gray-600 uppercase">Password</label>
                  <input
                    required
                    type="password"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="sbi-input mt-1"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-600 uppercase">Role</label>
                  <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className="sbi-input mt-1 font-semibold"
                  >
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-5 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded disabled:opacity-50"
                >
                  {createUserMutation.isPending ? 'Provisioning...' : 'Provision User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ROLE CHANGE MODAL ────────────────────────────────────── */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full shadow-2xl overflow-hidden border-2 border-purple-800 space-y-4 p-5">
            <h3 className="text-sm font-black text-purple-900 border-b pb-2 flex items-center gap-2">
              <ShieldCheck size={18} />
              Update User Access Privilege
            </h3>

            <p className="text-xs text-gray-700">
              Assign role for <strong className="text-gray-900">{roleModalUser.full_name}</strong> (@{roleModalUser.username}):
            </p>

            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded text-xs bg-yellow-50/50 font-bold text-gray-800 focus:ring-2 focus:ring-purple-700"
            >
              <option value="customer">Customer (Standard Net Banking)</option>
              <option value="manager">Manager (Branch Account Supervision)</option>
              <option value="admin">Administrator (Super User Control)</option>
            </select>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setRoleModalUser(null)}
                className="px-4 py-1.5 text-xs text-gray-600 border border-gray-300 rounded font-bold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => roleChangeMutation.mutate({ id: roleModalUser.id, role: targetRole })}
                disabled={roleChangeMutation.isPending}
                className="px-4 py-1.5 text-xs bg-purple-800 text-white font-black rounded hover:bg-purple-900 disabled:opacity-50"
              >
                {roleChangeMutation.isPending ? 'Updating...' : 'Save Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESET PASSWORD RESULT MODAL ────────────────────────────────────── */}
      {resetPassResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border-2 border-amber-500 space-y-3">
            <h3 className="text-sm font-black text-amber-800 border-b pb-2 flex items-center gap-2">
              <KeyRound size={18} />
              Temporary Password Issued
            </h3>

            <p className="text-xs text-gray-700">
              Temporary credentials for user <strong className="text-gray-900">@{resetPassResult.username}</strong>:
            </p>

            <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded text-center font-mono font-black text-lg text-amber-950 select-all">
              {resetPassResult.tempPass}
            </div>

            <p className="text-[11px] text-gray-600">Provide this temporary key to the user. System will enforce password change on first login.</p>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setResetPassResult(null)}
                className="px-4 py-1.5 text-xs bg-[#154360] text-white font-extrabold rounded"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── USER DETAIL MODAL ────────────────────────────────────── */}
      {selectedUserDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border-2 border-[#154360] space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-[#154360]">Official User KYC Dossier</h3>
              <button onClick={() => setSelectedUserDetail(null)} className="text-xs font-bold text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div><span className="text-gray-500 block text-[10px] font-bold">FULL NAME</span><strong className="text-gray-900">{selectedUserDetail.full_name}</strong></div>
                <div><span className="text-gray-500 block text-[10px] font-bold">USERNAME</span><strong className="text-[#154360]">@{selectedUserDetail.username}</strong></div>
                <div><span className="text-gray-500 block text-[10px] font-bold">EMAIL</span><span className="font-semibold text-gray-800">{selectedUserDetail.email}</span></div>
                <div><span className="text-gray-500 block text-[10px] font-bold">PHONE</span><span className="font-mono">{selectedUserDetail.phone || 'N/A'}</span></div>
                <div><span className="text-gray-500 block text-[10px] font-bold">PAN NUMBER</span><span className="font-mono font-bold text-gray-900">{selectedUserDetail.pan_number || 'N/A'}</span></div>
                <div><span className="text-gray-500 block text-[10px] font-bold">AADHAAR (LAST 4)</span><span className="font-mono">{selectedUserDetail.aadhar_last4 || 'N/A'}</span></div>
              </div>

              {selectedUserDetail.address && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block text-[10px] font-bold">REGISTERED ADDRESS</span>
                  <span className="text-gray-800 font-medium">{selectedUserDetail.address}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="px-4 py-1.5 text-xs bg-[#154360] text-white font-extrabold rounded"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
