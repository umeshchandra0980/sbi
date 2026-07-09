'use client'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { accountsApi, transfersApi } from '@/lib/api'
import { formatIndianCurrency, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import { ArrowRight, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'

const transferSchema = z.object({
  from_account_id: z.string().min(1, 'Select source account'),
  beneficiary_account: z.string().min(9, 'Enter valid account number'),
  beneficiary_ifsc: z.string().length(11, 'IFSC must be 11 characters'),
  beneficiary_name: z.string().min(2, 'Enter beneficiary name'),
  beneficiary_bank: z.string().optional(),
  amount: z.string().refine(v => parseFloat(v) > 0, 'Enter valid amount'),
  transfer_type: z.enum(['NEFT', 'RTGS', 'IMPS']),
  remarks: z.string().optional(),
})

type TransferForm = z.infer<typeof transferSchema>

type Step = 'form' | 'review' | 'otp' | 'success'

export default function TransfersPage() {
  const [step, setStep] = useState<Step>('form')
  const [pendingTransfer, setPendingTransfer] = useState<any>(null)
  const [demoOtp, setDemoOtp] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountsApi.list().then(r => r.data),
  })

  const { data: transferHistory } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => transfersApi.list().then(r => r.data),
    enabled: activeTab === 'history',
  })

  const form = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: { transfer_type: 'IMPS' },
  })

  const initiateMutation = useMutation({
    mutationFn: (data: TransferForm) => transfersApi.initiate({ ...data, amount: parseFloat(data.amount) }),
    onSuccess: (res) => {
      setPendingTransfer(res.data)
      setDemoOtp(res.data.demo_otp || '')
      setStep('otp')
      toast.success('OTP sent to your registered mobile')
    },
    onError: (err: any) => toast.error(err.response?.data?.detail || 'Transfer initiation failed'),
  })

  const confirmMutation = useMutation({
    mutationFn: () => transfersApi.confirm({ transfer_id: pendingTransfer.id, otp: otpValue }),
    onSuccess: () => {
      setStep('success')
      toast.success('Transfer successful!')
    },
    onError: (err: any) => toast.error(err.response?.data?.detail || 'OTP verification failed'),
  })

  const formData = form.watch()
  const fromAccount = accounts?.find((a: any) => a.id === formData.from_account_id)

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle size={14} className="text-green-600" />
    if (status === 'failed') return <XCircle size={14} className="text-red-600" />
    return <Clock size={14} className="text-yellow-500" />
  }

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-base font-bold text-gray-800">Fund Transfer</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[{ key: 'new', label: 'New Transfer' }, { key: 'history', label: 'Transfer History' }].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as any)}
            className={`px-5 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === t.key ? 'border-sbi-blue text-sbi-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'new' && (
        <div className="max-w-2xl">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-5">
            {(['form', 'otp', 'success'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s ? 'bg-sbi-blue text-white' :
                  (['otp', 'success'].indexOf(s) <= ['otp', 'success'].indexOf(step)) ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>{i + 1}</div>
                <span className={`text-xs ${step === s ? 'text-sbi-blue font-semibold' : 'text-gray-400'}`}>
                  {s === 'form' ? 'Transfer Details' : s === 'otp' ? 'OTP Verify' : 'Done'}
                </span>
                {i < 2 && <div className="w-8 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          {/* STEP 1: Form */}
          {step === 'form' && (
            <form onSubmit={form.handleSubmit(d => { setPendingTransfer(null); setStep('review') })} className="sbi-card p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">From Account *</label>
                <select {...form.register('from_account_id')} className="sbi-input">
                  <option value="">— Select Account —</option>
                  {accounts?.map((a: any) => (
                    <option key={a.id} value={a.id}>
                      {a.account_number} ({a.account_type}) — {formatIndianCurrency(a.balance)}
                    </option>
                  ))}
                </select>
                {form.formState.errors.from_account_id && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.from_account_id.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Beneficiary Account Number *</label>
                  <input {...form.register('beneficiary_account')} className="sbi-input" placeholder="Enter account number" />
                  {form.formState.errors.beneficiary_account && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.beneficiary_account.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">IFSC Code *</label>
                  <input {...form.register('beneficiary_ifsc')} className="sbi-input uppercase" placeholder="e.g. HDFC0001234" maxLength={11} />
                  {form.formState.errors.beneficiary_ifsc && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.beneficiary_ifsc.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Beneficiary Name *</label>
                  <input {...form.register('beneficiary_name')} className="sbi-input" placeholder="Full name" />
                  {form.formState.errors.beneficiary_name && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.beneficiary_name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Bank Name</label>
                  <input {...form.register('beneficiary_bank')} className="sbi-input" placeholder="Optional" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Amount (₹) *</label>
                  <input {...form.register('amount')} type="number" step="0.01" className="sbi-input" placeholder="0.00" />
                  {form.formState.errors.amount && <p className="text-red-500 text-xs mt-0.5">{form.formState.errors.amount.message}</p>}
                  {fromAccount && (
                    <p className="text-[10px] text-gray-400 mt-0.5">Available: {formatIndianCurrency(fromAccount.available_balance)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Transfer Mode *</label>
                  <select {...form.register('transfer_type')} className="sbi-input">
                    <option value="IMPS">IMPS (Instant, 24×7)</option>
                    <option value="NEFT">NEFT (Batch, Mon-Sat)</option>
                    <option value="RTGS">RTGS (Min ₹2L, Mon-Sat)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Remarks</label>
                <input {...form.register('remarks')} className="sbi-input" placeholder="Optional" />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex gap-2 text-xs text-yellow-800">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <p>Please verify beneficiary details carefully. SBI is not responsible for transfers to wrong accounts.</p>
              </div>

              <button type="submit" className="sbi-btn-primary w-full">
                Proceed to Review →
              </button>
            </form>
          )}

          {/* STEP 1b: Review */}
          {step === 'review' && (
            <div className="sbi-card p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 border-b pb-2">Review Transfer Details</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  ['From Account', formData.from_account_id ? accounts?.find((a: any) => a.id === formData.from_account_id)?.account_number : '—'],
                  ['To Account', formData.beneficiary_account],
                  ['Beneficiary Name', formData.beneficiary_name],
                  ['IFSC Code', formData.beneficiary_ifsc],
                  ['Bank', formData.beneficiary_bank || 'N/A'],
                  ['Transfer Mode', formData.transfer_type],
                  ['Remarks', formData.remarks || '—'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-gray-500">{label}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-sbi-blue text-white rounded p-3 text-center">
                  <p className="text-xs opacity-80">Transfer Amount</p>
                  <p className="text-2xl font-bold">{formatIndianCurrency(formData.amount)}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('form')} className="sbi-btn-secondary flex-1">← Edit</button>
                <button
                  onClick={() => initiateMutation.mutate(formData as TransferForm)}
                  disabled={initiateMutation.isPending}
                  className="sbi-btn-primary flex-1 disabled:opacity-50"
                >
                  {initiateMutation.isPending ? 'Processing...' : 'Confirm & Get OTP →'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === 'otp' && (
            <div className="sbi-card p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 border-b pb-2">Enter OTP to Confirm Transfer</h3>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-sbi-blue">
                <p>An OTP has been sent to your registered mobile number.</p>
                {demoOtp && (
                  <div className="mt-2 bg-yellow-50 border border-yellow-300 rounded p-2 text-yellow-800">
                    <strong>Demo OTP: {demoOtp}</strong>
                  </div>
                )}
              </div>
              <div className="text-xs space-y-1 border border-gray-200 rounded p-3 bg-gray-50">
                <p><strong>Amount:</strong> {formatIndianCurrency(pendingTransfer?.amount)}</p>
                <p><strong>To:</strong> {pendingTransfer?.beneficiary_name} ({pendingTransfer?.beneficiary_account})</p>
                <p><strong>Ref:</strong> {pendingTransfer?.transfer_ref}</p>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Enter 6-Digit OTP *</label>
                <input
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value)}
                  maxLength={6}
                  className="sbi-input text-center text-xl tracking-widest"
                  placeholder="• • • • • •"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('form')} className="sbi-btn-secondary flex-1">Cancel</button>
                <button
                  onClick={() => confirmMutation.mutate()}
                  disabled={otpValue.length !== 6 || confirmMutation.isPending}
                  className="sbi-btn-primary flex-1 disabled:opacity-50"
                >
                  {confirmMutation.isPending ? 'Verifying...' : 'Verify & Transfer'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 'success' && (
            <div className="sbi-card p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <h3 className="text-base font-bold text-green-700">Transfer Successful!</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Amount: <strong>{formatIndianCurrency(pendingTransfer?.amount)}</strong></p>
                <p>To: <strong>{pendingTransfer?.beneficiary_name}</strong></p>
                <p>Ref No: <strong className="font-mono">{pendingTransfer?.transfer_ref}</strong></p>
              </div>
              <button
                onClick={() => { setStep('form'); form.reset(); setPendingTransfer(null); setOtpValue('') }}
                className="sbi-btn-primary"
              >
                New Transfer
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transfer History tab */}
      {activeTab === 'history' && (
        <div className="sbi-card overflow-hidden">
          <table className="w-full sbi-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Ref No.</th>
                <th>Beneficiary</th>
                <th>Account</th>
                <th>Mode</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!transferHistory?.items?.length && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No transfers found</td></tr>
              )}
              {transferHistory?.items?.map((t: any) => (
                <tr key={t.id}>
                  <td className="text-[11px] whitespace-nowrap">{formatDate(t.created_at, 'short')}</td>
                  <td className="font-mono text-[10px] text-gray-500">{t.transfer_ref}</td>
                  <td className="text-[11px]">{t.beneficiary_name}</td>
                  <td className="font-mono text-[10px]">{t.beneficiary_account}</td>
                  <td><span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{t.transfer_type}</span></td>
                  <td className="text-right text-xs font-semibold text-red-600">{formatIndianCurrency(t.amount)}</td>
                  <td>
                    <span className={`flex items-center gap-1 text-[10px] font-semibold ${
                      t.status === 'completed' ? 'text-green-600' :
                      t.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {statusIcon(t.status)} {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
