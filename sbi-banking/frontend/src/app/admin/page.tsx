'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import {
  Users, Wallet, TrendingUp, AlertCircle, Lock, Unlock, UserPlus, Search,
  ShieldAlert, KeyRound, RefreshCw, ArrowUpRight, ArrowDownLeft, FileText,
  CheckCircle2, Ban, UserCheck, Building2, Activity, Filter, Eye, ShieldCheck
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
      toast.success('Password reset generated')
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
      toast.success('User account created successfully')
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
    toast.success('Refreshed real-time data')
  }

  const isAnyFetching = isStatsFetching || usersFetching || accsFetching || txnsFetching || trsFetching || auditFetching

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Real-time Indicator */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">SBI Administrative Portal</h1>
            <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time API
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Central User Control, Core Accounts, Audit Trails & Monitoring</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
              className="rounded text-sbi-blue focus:ring-sbi-blue"
            />
            Auto-refresh (10s)
          </label>

          <button
            onClick={triggerRefreshAll}
            disabled={isAnyFetching}
            className="flex items-center gap-1.5 text-xs bg-sbi-blue text-white font-semibold px-4 py-2 rounded-lg hover:bg-sbi-blue/90 transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={13} className={isAnyFetching ? 'animate-spin' : ''} />
            {isAnyFetching ? 'Syncing...' : 'Sync Now'}
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
          >
            <UserPlus size={14} /> Create User
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{stats.total_users}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <UserCheck size={12} /> {stats.active_users} Active
                </p>
              </div>
              <div className="p-2.5 bg-blue-50 text-sbi-blue rounded-lg">
                <Users size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm hover:shadow transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Locked / Flagged</p>
                <p className="text-2xl font-black text-red-600 mt-1">{stats.locked_users}</p>
                <p className="text-[11px] text-gray-500 mt-1">Requires Administrator unlock</p>
              </div>
              <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
                <ShieldAlert size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Accounts</p>
                <p className="text-2xl font-black text-indigo-900 mt-1">{stats.total_accounts}</p>
                <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                  {formatIndianCurrency(stats.total_balance)}
                </p>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Wallet size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Today's Activity</p>
                <p className="text-2xl font-black text-purple-900 mt-1">{stats.total_transactions_today}</p>
                <p className="text-[11px] text-purple-600 font-semibold mt-1">
                  {stats.total_transfers_today} Transfers ({stats.pending_transfers} Pending)
                </p>
              </div>
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <TrendingUp size={22} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-2 pt-2 rounded-t-xl shadow-xs gap-1 overflow-x-auto">
        {[
          { key: 'stats', label: 'Overview & Audit', icon: Activity },
          { key: 'users', label: 'User Directory', icon: Users, badge: usersData?.total },
          { key: 'accounts', label: 'Bank Accounts', icon: Building2, badge: accsData?.total },
          { key: 'transactions', label: 'All Transactions', icon: FileText, badge: txnsData?.total },
          { key: 'transfers', label: 'Transfers Feed', icon: ArrowUpRight, badge: trsData?.total },
          { key: 'audit_logs', label: 'Security Audit Logs', icon: ShieldCheck, badge: auditData?.total },
        ].map(t => {
          const Icon = t.icon
          const isActive = activeTab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-sbi-blue text-sbi-blue bg-blue-50/50 rounded-t-lg'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon size={15} />
              {t.label}
              {t.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-sbi-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── OVERVIEW TAB ────────────────────────────────────────────── */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions Panel */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-sbi-blue" />
              Administrative Control Operations
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setActiveTab('users'); setUserStatus('locked') }}
                className="p-3 text-left border rounded-lg bg-red-50/50 border-red-200 hover:bg-red-100/60 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-red-800">Review Locked Users</span>
                  <Lock size={14} className="text-red-600" />
                </div>
                <p className="text-[11px] text-red-600">Inspect & unlock accounts locked due to failed passwords</p>
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="p-3 text-left border rounded-lg bg-emerald-50/50 border-emerald-200 hover:bg-emerald-100/60 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-emerald-800">Create Staff / Customer</span>
                  <UserPlus size={14} className="text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-600">Provision new user accounts with instant role assignment</p>
              </button>

              <button
                onClick={() => setActiveTab('accounts')}
                className="p-3 text-left border rounded-lg bg-blue-50/50 border-blue-200 hover:bg-blue-100/60 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-sbi-blue">Account Supervision</span>
                  <Building2 size={14} className="text-sbi-blue" />
                </div>
                <p className="text-[11px] text-sbi-blue">Freeze or monitor high-value accounts across branches</p>
              </button>

              <button
                onClick={() => setActiveTab('audit_logs')}
                className="p-3 text-left border rounded-lg bg-purple-50/50 border-purple-200 hover:bg-purple-100/60 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-purple-800">Security Audit Logs</span>
                  <FileText size={14} className="text-purple-600" />
                </div>
                <p className="text-[11px] text-purple-600">Track all administrative edits, locks & password resets</p>
              </button>
            </div>
          </div>

          {/* Recent Audit Log Snapshot */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Activity size={16} className="text-purple-600" />
                Live Security Audit Log Feed
              </h3>
              <button onClick={() => setActiveTab('audit_logs')} className="text-xs text-sbi-blue hover:underline font-semibold">
                View All →
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {auditData?.items?.length ? (
                auditData.items.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="p-2.5 bg-gray-50 rounded-lg border text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 capitalize">{log.action.replace('_', ' ')}</span>
                      <span className="text-[10px] text-gray-400">{formatDate(log.created_at, 'short')}</span>
                    </div>
                    <p className="text-gray-600 text-[11px]">{log.details || 'No detail provided'}</p>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Admin: {log.admin_username || log.user_id}</span>
                      <span>IP: {log.ip_address}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center py-6 text-gray-400">No audit activity logged yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── USERS TAB ────────────────────────────────────────────── */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={userSearch}
                  onChange={e => { setUserSearch(e.target.value); setUserPage(1) }}
                  placeholder="Search by username, email, full name..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-sbi-blue focus:outline-none"
                />
              </div>
              <select
                value={userRole}
                onChange={e => { setUserRole(e.target.value); setUserPage(1) }}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-sbi-blue"
              >
                <option value="">All Roles</option>
                <option value="customer">Customer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={userStatus}
                onChange={e => { setUserStatus(e.target.value); setUserPage(1) }}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-sbi-blue"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="locked">Locked</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <span className="text-xs font-semibold text-gray-500">{usersData?.total || 0} user(s) found</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-3">User info</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Failed Logins</th>
                  <th className="p-3">Last Login</th>
                  <th className="p-3 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersLoading && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">Loading user directory...</td></tr>
                )}
                {!usersLoading && !usersData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">No users matching search filters.</td></tr>
                )}
                {usersData?.items?.map((u: any) => (
                  <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{u.full_name}</div>
                      <div className="font-mono text-[10px] text-sbi-blue">@{u.username}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-700">{u.email}</div>
                      <div className="text-[10px] text-gray-400">{u.phone || 'No phone'}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700 border border-red-200' :
                        u.role === 'manager' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        u.status === 'locked' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className={`p-3 text-center font-bold ${u.failed_login_attempts > 2 ? 'text-red-600' : 'text-gray-600'}`}>
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
                          className="p-1.5 text-gray-600 hover:text-sbi-blue bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={() => { setRoleModalUser(u); setTargetRole(u.role) }}
                          title="Change Role"
                          className="p-1.5 text-purple-700 bg-purple-50 rounded hover:bg-purple-100 border border-purple-200"
                        >
                          <ShieldCheck size={13} />
                        </button>

                        <button
                          onClick={() => resetPassMutation.mutate(u.id)}
                          title="Reset Password"
                          className="p-1.5 text-amber-700 bg-amber-50 rounded hover:bg-amber-100 border border-amber-200"
                        >
                          <KeyRound size={13} />
                        </button>

                        {u.status === 'active' ? (
                          <button
                            onClick={() => lockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded hover:bg-red-100"
                          >
                            <Lock size={12} /> Lock
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockMutation.mutate(u.id)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded hover:bg-emerald-100"
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
              <span className="text-xs text-gray-500">Page {usersData.page} of {usersData.pages}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserPage(p => Math.max(1, p - 1))}
                  disabled={userPage === 1}
                  className="px-3 py-1 text-xs border rounded-lg bg-gray-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setUserPage(p => Math.min(usersData.pages, p + 1))}
                  disabled={userPage === usersData.pages}
                  className="px-3 py-1 text-xs border rounded-lg bg-gray-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ACCOUNTS TAB ────────────────────────────────────────────── */}
      {activeTab === 'accounts' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={accSearch}
                  onChange={e => { setAccSearch(e.target.value); setAccPage(1) }}
                  placeholder="Search account number, owner name, branch..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-sbi-blue focus:outline-none"
                />
              </div>
              <select
                value={accStatus}
                onChange={e => { setAccStatus(e.target.value); setAccPage(1) }}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-sbi-blue"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="frozen">Frozen</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <span className="text-xs font-semibold text-gray-500">{accsData?.total || 0} account(s) found</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-3">Account Number</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Branch & IFSC</th>
                  <th className="p-3 text-right">Balance</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accsLoading && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">Loading accounts...</td></tr>
                )}
                {!accsLoading && !accsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">No accounts found.</td></tr>
                )}
                {accsData?.items?.map((acc: any) => (
                  <tr key={acc.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-gray-900">{acc.account_number}</td>
                    <td className="p-3">
                      <div className="font-bold text-gray-800">{acc.owner_name || 'N/A'}</div>
                      <div className="text-[10px] text-gray-400">@{acc.owner_username || 'user'}</div>
                    </td>
                    <td className="p-3 uppercase font-semibold text-gray-600">{acc.account_type}</td>
                    <td className="p-3">
                      <div>{acc.branch_name || 'Main Branch'}</div>
                      <div className="font-mono text-[10px] text-gray-400">{acc.ifsc_code}</div>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-sbi-blue">
                      {formatIndianCurrency(acc.balance)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        acc.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        acc.status === 'frozen' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {acc.status === 'active' ? (
                        <button
                          onClick={() => freezeMutation.mutate(acc.id)}
                          className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded hover:bg-red-100"
                        >
                          Freeze
                        </button>
                      ) : (
                        <button
                          onClick={() => unfreezeMutation.mutate(acc.id)}
                          className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded hover:bg-emerald-100"
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

      {/* ── TRANSACTIONS TAB ────────────────────────────────────────────── */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={txnSearch}
                  onChange={e => { setTxnSearch(e.target.value); setTxnPage(1) }}
                  placeholder="Search ref no, description..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-sbi-blue focus:outline-none"
                />
              </div>
              <select
                value={txnType}
                onChange={e => { setTxnType(e.target.value); setTxnPage(1) }}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-sbi-blue"
              >
                <option value="">All Types</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <span className="text-xs font-semibold text-gray-500">{txnsData?.total || 0} transaction(s) logged</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Ref Number</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-right">Balance After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {txnsLoading && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">Loading transaction feed...</td></tr>
                )}
                {!txnsLoading && !txnsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">No transactions recorded.</td></tr>
                )}
                {txnsData?.items?.map((t: any) => (
                  <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 text-[11px] text-gray-500 whitespace-nowrap">{formatDate(t.value_date, 'short')}</td>
                    <td className="p-3 font-mono text-gray-800 font-semibold">{t.transaction_ref}</td>
                    <td className="p-3 font-medium text-gray-800">{t.description}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-semibold capitalize">
                        {t.category?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${t.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {t.type.toUpperCase()}
                      </span>
                    </td>
                    <td className={`p-3 text-right font-mono font-bold ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {t.type === 'credit' ? '+' : '-'}{formatIndianCurrency(t.amount)}
                    </td>
                    <td className="p-3 text-right font-mono text-gray-700">{formatIndianCurrency(t.balance_after)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TRANSFERS TAB ────────────────────────────────────────────── */}
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800">Interbank & Intra-bank Fund Transfers Feed</h3>
            <span className="text-xs font-semibold text-gray-500">{trsData?.total || 0} transfer(s) logged</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Beneficiary</th>
                  <th className="p-3">Account & IFSC</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trsLoading && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">Loading transfer records...</td></tr>
                )}
                {!trsLoading && !trsData?.items?.length && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">No transfers found.</td></tr>
                )}
                {trsData?.items?.map((tr: any) => (
                  <tr key={tr.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-sbi-blue">{tr.transfer_ref}</td>
                    <td className="p-3 font-bold text-gray-800">{tr.beneficiary_name}</td>
                    <td className="p-3">
                      <div>{tr.beneficiary_account}</div>
                      <div className="font-mono text-[10px] text-gray-400">{tr.beneficiary_ifsc}</div>
                    </td>
                    <td className="p-3 font-semibold text-gray-700">{tr.transfer_mode}</td>
                    <td className="p-3 text-right font-mono font-bold text-gray-900">{formatIndianCurrency(tr.amount)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        tr.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        tr.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tr.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 whitespace-nowrap">{formatDate(tr.created_at, 'short')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── AUDIT LOGS TAB ────────────────────────────────────────────── */}
      {activeTab === 'audit_logs' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800">Complete System Audit Log Trail</h3>
            <span className="text-xs font-semibold text-gray-500">{auditData?.total || 0} audit record(s)</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Administrator</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Resource</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditLoading && (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400">Loading audit trail...</td></tr>
                )}
                {!auditLoading && !auditData?.items?.length && (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400">No audit logs recorded yet.</td></tr>
                )}
                {auditData?.items?.map((log: any) => (
                  <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 text-[11px] text-gray-500 whitespace-nowrap">{formatDate(log.created_at, 'short')}</td>
                    <td className="p-3 font-bold text-gray-800">{log.admin_username || log.user_id}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-gray-600">{log.resource}:{log.resource_id}</td>
                    <td className="p-3 font-mono text-[10px] text-gray-500">{log.ip_address}</td>
                    <td className="p-3 text-gray-700">{log.details || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CREATE USER MODAL ────────────────────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <UserPlus size={18} className="text-emerald-600" />
              Provision New User Account
            </h3>

            <form
              onSubmit={e => {
                e.preventDefault()
                createUserMutation.mutate(newUser)
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase">Username</label>
                <input
                  required
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                  placeholder="e.g. rohit.verma"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase">Full Name</label>
                <input
                  required
                  value={newUser.full_name}
                  onChange={e => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                  placeholder="e.g. Rohit Verma"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Email</label>
                  <input
                    required
                    type="email"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                    placeholder="rohit@example.com"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Phone</label>
                  <input
                    value={newUser.phone}
                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Password</label>
                  <input
                    required
                    type="password"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Role</label>
                  <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
                  >
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-600 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-4 py-1.5 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  {createUserMutation.isPending ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ROLE CHANGE MODAL ────────────────────────────────────────────── */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-purple-600" />
              Change User Access Role
            </h3>

            <p className="text-xs text-gray-600">
              Update security role for user <strong className="text-gray-900">{roleModalUser.full_name}</strong> (@{roleModalUser.username}):
            </p>

            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-sbi-blue"
            >
              <option value="customer">Customer (Standard online banking access)</option>
              <option value="manager">Manager (Branch customer manager)</option>
              <option value="admin">Administrator (Full system control & audit access)</option>
            </select>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setRoleModalUser(null)}
                className="px-3 py-1.5 text-xs text-gray-600 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => roleChangeMutation.mutate({ id: roleModalUser.id, role: targetRole })}
                disabled={roleChangeMutation.isPending}
                className="px-4 py-1.5 text-xs bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {roleChangeMutation.isPending ? 'Updating...' : 'Confirm Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESET PASSWORD RESULT MODAL ────────────────────────────────────────────── */}
      {resetPassResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2 text-amber-700">
              <KeyRound size={16} />
              Temporary Password Generated
            </h3>

            <p className="text-xs text-gray-600">
              Password for <strong>@{resetPassResult.username}</strong> has been reset:
            </p>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center font-mono font-bold text-base text-amber-900 select-all">
              {resetPassResult.tempPass}
            </div>

            <p className="text-[11px] text-gray-500">Provide this temporary password to the user. They will be required to change it upon login.</p>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setResetPassResult(null)}
                className="px-4 py-1.5 text-xs bg-sbi-blue text-white font-bold rounded-lg hover:bg-sbi-blue/90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── USER DETAIL MODAL ────────────────────────────────────────────── */}
      {selectedUserDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-bold text-gray-900">User Account Dossier</h3>
              <button onClick={() => setSelectedUserDetail(null)} className="text-xs font-bold text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg border">
                <div><span className="text-gray-400 block text-[10px]">FULL NAME</span><strong className="text-gray-900">{selectedUserDetail.full_name}</strong></div>
                <div><span className="text-gray-400 block text-[10px]">USERNAME</span><strong className="text-sbi-blue">@{selectedUserDetail.username}</strong></div>
                <div><span className="text-gray-400 block text-[10px]">EMAIL</span><span>{selectedUserDetail.email}</span></div>
                <div><span className="text-gray-400 block text-[10px]">PHONE</span><span>{selectedUserDetail.phone || 'N/A'}</span></div>
                <div><span className="text-gray-400 block text-[10px]">PAN NUMBER</span><span>{selectedUserDetail.pan_number || 'N/A'}</span></div>
                <div><span className="text-gray-400 block text-[10px]">AADHAAR (LAST 4)</span><span>{selectedUserDetail.aadhar_last4 || 'N/A'}</span></div>
              </div>

              {selectedUserDetail.address && (
                <div className="p-2.5 bg-gray-50 rounded-lg border">
                  <span className="text-gray-400 block text-[10px]">ADDRESS</span>
                  <span className="text-gray-700">{selectedUserDetail.address}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="px-4 py-1.5 text-xs bg-sbi-blue text-white font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
