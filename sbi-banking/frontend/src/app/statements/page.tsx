'use client'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { accountsApi, transactionsApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import { Download, FileText, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export default function StatementsPage() {
  const [selectedAccount, setSelectedAccount] = useState('')
  const [period, setPeriod] = useState('1m')
  const [format, setFormat] = useState('pdf')

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountsApi.list().then(r => r.data),
  })

  useEffect(() => {
    if (accounts && accounts.length && !selectedAccount) {
      setSelectedAccount(accounts[0].id)
    }
  }, [accounts, selectedAccount])

  const getDateRange = () => {
    const to = new Date()
    const from = new Date()
    if (period === '1m') from.setMonth(from.getMonth() - 1)
    else if (period === '3m') from.setMonth(from.getMonth() - 3)
    else if (period === '6m') from.setMonth(from.getMonth() - 6)
    else if (period === '1y') from.setFullYear(from.getFullYear() - 1)
    return { from: from.toISOString(), to: to.toISOString() }
  }

  const { data: txnData, isLoading } = useQuery({
    queryKey: ['statement', selectedAccount, period],
    queryFn: () => {
      const { from, to } = getDateRange()
      return transactionsApi.list(selectedAccount, { from_date: from, to_date: to, page_size: 100 }).then(r => r.data)
    },
    enabled: !!selectedAccount,
  })

  const selectedAcc = accounts?.find((a: any) => a.id === selectedAccount)

  const handleDownload = () => {
    toast.success(`Statement download initiated (${format.toUpperCase()})`)
  }

  const credits = txnData?.items?.filter((t: any) => t.type === 'credit').reduce((s: number, t: any) => s + parseFloat(t.amount), 0) || 0
  const debits = txnData?.items?.filter((t: any) => t.type === 'debit').reduce((s: number, t: any) => s + parseFloat(t.amount), 0) || 0

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-base font-bold text-gray-800">Account Statements</h2>

      {/* Controls */}
      <div className="sbi-card p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-600">Account</label>
          <select value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)} className="sbi-input text-xs w-64">
            {accounts?.map((a: any) => (
              <option key={a.id} value={a.id}>{a.account_number} — {a.account_type.replace('_',' ').toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-600">Period</label>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="sbi-input text-xs w-40">
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 text-gray-600">Format</label>
          <select value={format} onChange={e => setFormat(e.target.value)} className="sbi-input text-xs w-28">
            <option value="pdf">PDF</option>
            <option value="csv">CSV / Excel</option>
          </select>
        </div>
        <button onClick={handleDownload} className="flex items-center gap-2 sbi-btn-primary text-xs h-8 px-4">
          <Download size={13} /> Download
        </button>
      </div>

      {/* Summary cards */}
      {selectedAcc && (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Account Number', value: selectedAcc.account_number, mono: true },
            { label: 'Current Balance', value: formatIndianCurrency(selectedAcc.balance), color: 'text-sbi-blue' },
            { label: 'Total Credits', value: formatIndianCurrency(credits), color: 'text-green-600' },
            { label: 'Total Debits', value: formatIndianCurrency(debits), color: 'text-red-600' },
          ].map(({ label, value, mono, color }) => (
            <div key={label} className="sbi-card p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">{label}</p>
              <p className={`text-sm font-bold ${mono ? 'font-mono' : ''} ${color || 'text-gray-800'}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Statement table */}
      <div className="sbi-card overflow-hidden">
        <div className="bg-sbi-blue text-white px-4 py-2 flex justify-between items-center">
          <span className="text-xs font-semibold flex items-center gap-2"><FileText size={13} /> Statement Preview</span>
          <span className="text-xs opacity-70">{txnData?.total || 0} transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full sbi-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Ref</th>
                <th>Description</th>
                <th className="text-right">Credit (₹)</th>
                <th className="text-right">Debit (₹)</th>
                <th className="text-right">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>}
              {!isLoading && !txnData?.items?.length && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No transactions in this period</td></tr>
              )}
              {txnData?.items?.map((txn: any) => (
                <tr key={txn.id}>
                  <td className="text-[11px] whitespace-nowrap">{formatDate(txn.value_date, 'short')}</td>
                  <td className="font-mono text-[10px] text-gray-500">{txn.transaction_ref}</td>
                  <td className="text-[11px]">{txn.description}</td>
                  <td className="text-right text-xs text-green-600 font-semibold">
                    {txn.type === 'credit' ? formatIndianCurrency(txn.amount) : '—'}
                  </td>
                  <td className="text-right text-xs text-red-600 font-semibold">
                    {txn.type === 'debit' ? formatIndianCurrency(txn.amount) : '—'}
                  </td>
                  <td className="text-right text-xs font-medium">{formatIndianCurrency(txn.balance_after)}</td>
                </tr>
              ))}
            </tbody>
            {txnData?.items?.length > 0 && (
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={3} className="text-xs px-3 py-2 text-gray-600">Totals</td>
                  <td className="text-right text-xs px-3 py-2 text-green-700">{formatIndianCurrency(credits)}</td>
                  <td className="text-right text-xs px-3 py-2 text-red-700">{formatIndianCurrency(debits)}</td>
                  <td className="text-right text-xs px-3 py-2">{selectedAcc ? formatIndianCurrency(selectedAcc.balance) : '—'}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}
