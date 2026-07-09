'use client'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet, RefreshCw, AlertCircle } from 'lucide-react'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.get().then(r => r.data),
  })

  if (isLoading) return <DashboardSkeleton />

  if (error) return (
    <div className="p-6 flex items-center gap-3 text-red-600">
      <AlertCircle size={18} />
      <span className="text-sm">Failed to load dashboard. <button onClick={() => refetch()} className="underline">Retry</button></span>
    </div>
  )

  const { user, accounts, recent_transactions, total_balance, total_accounts } = data

  return (
    <div className="p-5 space-y-5">
      {/* Welcome bar */}
      <div className="bg-sbi-blue text-white rounded px-5 py-3 flex justify-between items-center">
        <div>
          <p className="text-base font-semibold">Welcome, {user.full_name}</p>
          <p className="text-xs opacity-80">Last login: {user.last_login ? formatDate(user.last_login) : 'First time login'}</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-70">Total Portfolio Value</p>
          <p className="text-xl font-bold">{formatIndianCurrency(total_balance)}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Total Accounts" value={total_accounts} color="blue" />
        <StatCard icon={TrendingUp} label="Total Balance" value={formatIndianCurrency(total_balance)} color="green" />
        <StatCard icon={ArrowDownLeft} label="Credits (This Month)" value="₹1,35,312" color="green" />
        <StatCard icon={ArrowUpRight} label="Debits (This Month)" value="₹87,784" color="red" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Accounts list */}
        <div className="col-span-1 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-700">My Accounts</h3>
            <Link href="/accounts" className="text-xs text-sbi-blue hover:underline">View All</Link>
          </div>
          {accounts.map((acc: any) => (
            <div key={acc.id} className="sbi-card p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-semibold text-gray-700 capitalize">{acc.account_type.replace('_', ' ')} Account</p>
                  <p className="text-[11px] text-gray-500 font-mono">{acc.account_number}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  acc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {acc.status.toUpperCase()}
                </span>
              </div>
              <p className="text-base font-bold text-sbi-blue">{formatIndianCurrency(acc.balance)}</p>
              <p className="text-[10px] text-gray-400">Available: {formatIndianCurrency(acc.available_balance)}</p>
              <Link
                href={`/transactions?account=${acc.id}`}
                className="text-[11px] text-sbi-blue hover:underline mt-1 block"
              >
                View Transactions →
              </Link>
            </div>
          ))}
          <Link href="/transfers" className="block sbi-btn-primary text-center text-xs py-2">
            Transfer Funds
          </Link>
        </div>

        {/* Recent transactions */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-700">Recent Transactions</h3>
            <Link href="/transactions" className="text-xs text-sbi-blue hover:underline">View All</Link>
          </div>
          <div className="sbi-card overflow-hidden">
            <table className="w-full sbi-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Ref No.</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {recent_transactions.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-6 text-gray-400">No transactions yet</td></tr>
                )}
                {recent_transactions.map((txn: any) => (
                  <tr key={txn.id}>
                    <td className="text-[11px] whitespace-nowrap">{formatDate(txn.value_date, 'short')}</td>
                    <td className="text-[11px] max-w-[160px] truncate">{txn.description}</td>
                    <td className="text-[10px] text-gray-400 font-mono">{txn.transaction_ref.slice(0, 12)}...</td>
                    <td className={`text-right font-semibold text-xs ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'credit' ? '+' : '-'}{formatIndianCurrency(txn.amount)}
                    </td>
                    <td className="text-right text-xs text-gray-600">{formatIndianCurrency(txn.balance_after)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="sbi-card p-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Quick Services</h3>
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'NEFT Transfer', href: '/transfers?type=NEFT' },
            { label: 'RTGS Transfer', href: '/transfers?type=RTGS' },
            { label: 'IMPS Transfer', href: '/transfers?type=IMPS' },
            { label: 'View Statement', href: '/statements' },
            { label: 'Change Password', href: '/settings/password' },
            { label: 'Manage Beneficiaries', href: '/transfers/beneficiaries' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-center border border-sbi-blue rounded p-2 text-[11px] text-sbi-blue hover:bg-sbi-blue hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-sbi-blue border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <div className={`sbi-card p-4 border ${colors[color as keyof typeof colors]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-base font-bold">{value}</p>
        </div>
        <Icon size={20} className="opacity-60" />
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="p-5 space-y-5 animate-pulse">
      <div className="h-16 bg-gray-200 rounded" />
      <div className="grid grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded" />)}</div>
      <div className="grid grid-cols-3 gap-5">
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded" />)}</div>
        <div className="col-span-2 h-64 bg-gray-200 rounded" />
      </div>
    </div>
  )
}
