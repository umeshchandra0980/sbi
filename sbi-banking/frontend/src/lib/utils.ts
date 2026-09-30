import { format, parseISO } from 'date-fns'

export function formatIndianCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '₹0.00'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(num)
}

export function formatDate(dateStr: string, style: 'full' | 'short' = 'full'): string {
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr)
    if (style === 'short') return format(d, 'dd MMM yy')
    return format(d, 'dd MMM yyyy, hh:mm a')
  } catch {
    return dateStr
  }
}

export function maskAccountNumber(acc: string): string {
  if (!acc || acc.length < 4) return acc
  return 'XXXX XXXX ' + acc.slice(-4)
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function downloadTransactionStatement(
  transactions: any[],
  accountNumber: string = 'SBI-ACCOUNT',
  fileFormat: string = 'csv'
) {
  if (!transactions || transactions.length === 0) {
    return false
  }

  const header = ['Date', 'Transaction Ref', 'Description', 'Category', 'Type', 'Debit (INR)', 'Credit (INR)', 'Balance (INR)']
  const rows = transactions.map(t => [
    `"${t.value_date ? formatDate(t.value_date, 'short') : ''}"`,
    `"${t.transaction_ref || ''}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${t.category || ''}"`,
    `"${(t.type || '').toUpperCase()}"`,
    `"${t.type === 'debit' ? t.amount : '0.00'}"`,
    `"${t.type === 'credit' ? t.amount : '0.00'}"`,
    `"${t.balance_after || '0.00'}"`
  ])

  const ext = fileFormat === 'pdf' ? 'csv' : fileFormat
  const csvContent = [header.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `SBI_Statement_${accountNumber}_${new Date().toISOString().slice(0, 10)}.${ext}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  return true
}
