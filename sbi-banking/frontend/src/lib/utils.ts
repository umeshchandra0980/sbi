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
