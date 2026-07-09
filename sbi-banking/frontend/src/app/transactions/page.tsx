'use client'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { accountsApi, transactionsApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TransactionsPage() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get('account')

  const [selectedAccount, setSelectedAccount] = useState(preselected || '')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '', type: '', from_date: '', to_date: '', min_amount: '', max_amount: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountsApi.list().then(r => r.data),
  })

  useEffect(() => {
    if (!selectedAccount && accounts?.length) setSelectedAccount(accounts[0].id)
  }, [accounts, selectedAccount])

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', selectedAccount, page, filters],
    queryFn: () => transactionsApi.list(selectedAccount, {
      page, page_size: 20,
      ...(filters.type && { type: filters.type }),
      ...(filters.search && { search: filters.search }),
      ...(filters.from_date && { from_date: filters.from_date }),
      ...(filters.to_date && { to_date: filters.to_date }),
      ...(filters.min_amount && { min_amount: filters.min_amount }),
      ...(filters.max_amount && { max_amount: filters.max_amount }),
    }).then(r => r.data),
    enabled: !!selectedAccount,
  })

  const handleFilterChange = (k: string, v: string) => {
    setFilters(f => ({ ...f, [k]: v }))
    setPage(1)
  }

  const selectedAcc = accounts?.find((a: any) => a.id === selectedAccount)

  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-gray-800">Transaction History</h2>
        <button className="flex items-center gap-1.5 text-xs border border-sbi-blue text-sbi-blue px-3 py-1.5 rounded hover:bg-sbi-blue hover:text-white transition-colors">
          <Download size={12} /> Download Statement
        </button>
      </div>

      {/* Account selector */}
      <div className="sbi-card p-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600 whitespace-nowrap">Select Account:</label>
          <select
            value={selectedAccount}
            onChange={e => { setSelectedAccount(e.target.value); setPage(1) }}
            className="border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sbi-blue"
          >
            {accounts?.map((a: any) => (
              <option key={a.id} value={a.id}>
                {a.account_number} — {a.account_type.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        {selectedAcc && (
          <div className="flex gap-4 text-xs text-gray-600 border-l pl-4">
            <span>Balance: <strong className="text-sbi-blue">{formatIndianCurrency(selectedAcc.balance)}</strong></span>
            <span>IFSC: <strong>{selectedAcc.ifsc_code}</strong></span>
          </div>
        )}
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`ml-auto flex items-center gap-1 text-xs px-3 py-1.5 rounded border transition-colors ${showFilters ? 'bg-sbi-blue text-white border-sbi-blue' : 'border-gray-300 text-gray-600 hover:border-sbi-blue'}`}
        >
          <Filter size={12} /> Filters
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="sbi-card p-4 grid grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Search</label>
            <div className="relative mt-1">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
                placeholder="Description / Ref No."
                className="sbi-input pl-7 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Type</label>
            <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)} className="sbi-input mt-1 text-xs">
              <option value="">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">From Date</label>
            <input type="date" value={filters.from_date} onChange={e => handleFilterChange('from_date', e.target.value)} className="sbi-input mt-1 text-xs" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">To Date</label>
            <input type="date" value={filters.to_date} onChange={e => handleFilterChange('to_date', e.target.value)} className="sbi-input mt-1 text-xs" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Min Amount (₹)</label>
            <input type="number" value={filters.min_amount} onChange={e => handleFilterChange('min_amount', e.target.value)} className="sbi-input mt-1 text-xs" placeholder="0" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Max Amount (₹)</label>
            <input type="number" value={filters.max_amount} onChange={e => handleFilterChange('max_amount', e.target.value)} className="sbi-input mt-1 text-xs" placeholder="Any" />
          </div>
          <div className="col-span-3 flex justify-end">
            <button onClick={() => { setFilters({ search: '', type: '', from_date: '', to_date: '', min_amount: '', max_amount: '' }); setPage(1) }}
              className="text-xs text-gray-500 hover:text-red-600 underline">
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Transactions table */}
      <div className="sbi-card overflow-hidden">
        <div className="bg-sbi-blue text-white px-4 py-2 flex justify-between items-center">
          <span className="text-xs font-semibold">Account Statement</span>
          {data && <span className="text-xs opacity-80">{data.total} transaction(s) found</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full sbi-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Ref</th>
                <th>Description</th>
                <th>Category</th>
                <th>Channel</th>
                <th className="text-right">Debit (₹)</th>
                <th className="text-right">Credit (₹)</th>
                <th className="text-right">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">Loading transactions...</td></tr>
              )}
              {!isLoading && (!data?.items?.length) && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No transactions found</td></tr>
              )}
              {data?.items?.map((txn: any) => (
                <tr key={txn.id}>
                  <td className="whitespace-nowrap text-[11px]">{formatDate(txn.value_date, 'short')}</td>
                  <td className="font-mono text-[10px] text-gray-500">{txn.transaction_ref}</td>
                  <td className="text-[11px] max-w-[200px]">
                    <p className="truncate">{txn.description}</p>
                    {txn.counterparty_name && <p className="text-[10px] text-gray-400 truncate">{txn.counterparty_name}</p>}
                  </td>
                  <td>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                      {txn.category?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="text-[10px] text-gray-500">{txn.channel}</td>
                  <td className="text-right text-red-600 font-semibold text-xs">
                    {txn.type === 'debit' ? formatIndianCurrency(txn.amount) : '—'}
                  </td>
                  <td className="text-right text-green-600 font-semibold text-xs">
                    {txn.type === 'credit' ? formatIndianCurrency(txn.amount) : '—'}
                  </td>
                  <td className="text-right text-xs font-medium">{formatIndianCurrency(txn.balance_after)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-500">
              Page {data.page} of {data.pages} — {data.total} records
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100">
                <ChevronLeft size={14} />
              </button>
              {[...Array(Math.min(data.pages, 7))].map((_, i) => {
                const p = i + 1
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-7 h-7 text-xs rounded border ${page === p ? 'bg-sbi-blue text-white border-sbi-blue' : 'border-gray-300 hover:bg-gray-100'}`}>
                    {p}
                  </button>
                )
              })}
              <button onClick={() => setPage(p => Math.min(data.pages, p + 1))} disabled={page === data.pages}
                className="p-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
