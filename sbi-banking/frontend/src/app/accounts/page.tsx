'use client'
import { useQuery } from '@tanstack/react-query'
import { accountsApi } from '@/lib/api'
import { formatIndianCurrency, formatDate, maskAccountNumber } from '@/lib/utils'
import Link from 'next/link'
import { Wallet, TrendingUp, Building2, CreditCard } from 'lucide-react'

const typeIcons: Record<string, any> = {
  savings: Wallet,
  current: CreditCard,
  fixed_deposit: TrendingUp,
  recurring_deposit: TrendingUp,
  salary: Building2,
}

const typeColors: Record<string, string> = {
  savings: 'bg-blue-50 border-blue-300',
  current: 'bg-purple-50 border-purple-300',
  fixed_deposit: 'bg-green-50 border-green-300',
  recurring_deposit: 'bg-yellow-50 border-yellow-300',
  salary: 'bg-orange-50 border-orange-300',
}

export default function AccountsPage() {
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountsApi.list().then(r => r.data),
  })

  if (isLoading) return (
    <div className="p-5 animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-36 bg-gray-200 rounded" />)}
    </div>
  )

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-bold text-gray-800">My Accounts</h2>
        <span className="text-xs text-gray-500">{accounts?.length} account(s) linked</span>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {accounts?.map((acc: any) => {
          const Icon = typeIcons[acc.account_type] || Wallet
          const colorClass = typeColors[acc.account_type] || 'bg-gray-50 border-gray-300'
          return (
            <div key={acc.id} className={`sbi-card border-l-4 ${colorClass} overflow-hidden`}>
              {/* Account header */}
              <div className="bg-sbi-blue text-white px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="text-sm font-semibold capitalize">
                    {acc.account_type.replace('_', ' ')} Account
                  </span>
                  {acc.is_primary && (
                    <span className="bg-yellow-400 text-sbi-blue text-[9px] font-bold px-1.5 py-0.5 rounded">PRIMARY</span>
                  )}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  acc.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-white'
                }`}>
                  {acc.status.toUpperCase()}
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Account number */}
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Account Number</p>
                    <p className="text-sm font-mono font-bold text-gray-800">{acc.account_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Currency</p>
                    <p className="text-sm font-bold text-gray-800">{acc.currency || 'INR'}</p>
                  </div>
                </div>

                {/* Balance */}
                <div className="bg-gray-50 rounded p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500">Available Balance</p>
                      <p className="text-lg font-bold text-sbi-blue">{formatIndianCurrency(acc.available_balance)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500">Ledger Balance</p>
                      <p className="text-lg font-bold text-gray-700">{formatIndianCurrency(acc.balance)}</p>
                    </div>
                  </div>
                </div>

                {/* Branch & IFSC */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] text-gray-400">Branch</p>
                    <p className="text-gray-700 font-medium">{acc.branch_name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">IFSC Code</p>
                    <p className="text-gray-700 font-mono font-medium">{acc.ifsc_code || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Interest Rate</p>
                    <p className="text-gray-700 font-medium">{acc.interest_rate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Opened On</p>
                    <p className="text-gray-700 font-medium">{formatDate(acc.created_at, 'short')}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/transactions?account=${acc.id}`}
                    className="flex-1 text-center border border-sbi-blue text-sbi-blue text-xs py-1.5 rounded hover:bg-sbi-blue hover:text-white transition-colors"
                  >
                    View Transactions
                  </Link>
                  <Link
                    href={`/statements?account=${acc.id}`}
                    className="flex-1 text-center border border-gray-400 text-gray-600 text-xs py-1.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    Download Statement
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
