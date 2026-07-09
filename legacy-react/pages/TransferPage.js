import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

const fmt = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function TransferPage() {
  const toast = useToast();
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpDemo, setOtpDemo] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    from_account_id: '', transfer_mode: 'NEFT',
    to_type: 'existing', // existing | new
    beneficiary_id: '', to_account: '', ifsc: '', to_name: '',
    amount: '', remarks: ''
  });

  useEffect(() => {
    Promise.all([api.get('/accounts'), api.get('/beneficiaries')])
      .then(([a, b]) => { setAccounts(a.data.data || []); setBeneficiaries(b.data.data || []); })
      .catch(() => {});
  }, []);

  const selectedAccount = accounts.find(a => a.id === form.from_account_id);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.from_account_id) return toast.error('Select source account');
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) return toast.error('Enter valid amount');
    if (parseFloat(form.amount) > parseFloat(selectedAccount?.available_balance || 0)) return toast.error('Insufficient balance');
    setStep(2);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/transfer/initiate', {
        from_account_id: form.from_account_id,
        to_account_number: form.to_type === 'existing'
          ? beneficiaries.find(b => b.id === form.beneficiary_id)?.account_number
          : form.to_account,
        to_ifsc: form.to_type === 'existing'
          ? beneficiaries.find(b => b.id === form.beneficiary_id)?.ifsc_code
          : form.ifsc,
        to_name: form.to_type === 'existing'
          ? beneficiaries.find(b => b.id === form.beneficiary_id)?.name
          : form.to_name,
        amount: parseFloat(form.amount),
        transaction_type: form.transfer_mode.toLowerCase(),
        remarks: form.remarks
      });
      setTransactionId(data.data.transactionId);
      setOtpDemo(data.data.otpDemo);
      setStep(3);
      toast.success('OTP sent to your registered mobile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initiate transfer');
    }
    setLoading(false);
  };

  const handleConfirm = async e => {
    e.preventDefault();
    if (!otp.trim()) return toast.error('Enter OTP');
    setLoading(true);
    try {
      const { data } = await api.post('/transfer/confirm', { transactionId, otp });
      setResult(data.data);
      setStep(4);
      toast.success('Transfer successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transfer failed');
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(1); setOtp(''); setOtpDemo(''); setTransactionId(''); setResult(null);
    setForm({ from_account_id: '', transfer_mode: 'NEFT', to_type: 'existing', beneficiary_id: '', to_account: '', ifsc: '', to_name: '', amount: '', remarks: '' });
  };

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 12, fontWeight: 'bold' }}>Fund Transfer</h2>

          {/* Progress steps */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
            {['Enter Details', 'Review', 'Verify OTP', 'Confirmation'].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', margin: '0 auto 4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > i + 1 ? '#27ae60' : step === i + 1 ? '#1a5276' : '#ddd',
                  color: '#fff', fontSize: 12, fontWeight: 'bold'
                }}>{step > i + 1 ? '✓' : i + 1}</div>
                <div style={{ fontSize: 10, color: step === i + 1 ? '#1a5276' : '#888' }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>

              {/* Step 1: Form */}
              {step === 1 && (
                <div className="card">
                  <div className="card-header">Transfer Details</div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>From Account*</label>
                        <select className="form-control" value={form.from_account_id}
                          onChange={e => setForm(f => ({ ...f, from_account_id: e.target.value }))}>
                          <option value="">-- Select Account --</option>
                          {accounts.filter(a => a.is_active).map(a => (
                            <option key={a.id} value={a.id}>
                              {a.account_type.toUpperCase()} - XXXX{a.account_number.slice(-4)} | Bal: ₹{parseFloat(a.available_balance).toLocaleString('en-IN')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Transfer Mode*</label>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          {['NEFT', 'RTGS', 'IMPS'].map(m => (
                            <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12 }}>
                              <input type="radio" name="mode" value={m} checked={form.transfer_mode === m}
                                onChange={e => setForm(f => ({ ...f, transfer_mode: e.target.value }))} />
                              {m}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Transfer To*</label>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                          {[['existing', 'Existing Beneficiary'], ['new', 'New Beneficiary']].map(([v, l]) => (
                            <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12 }}>
                              <input type="radio" name="to_type" value={v} checked={form.to_type === v}
                                onChange={e => setForm(f => ({ ...f, to_type: e.target.value }))} />
                              {l}
                            </label>
                          ))}
                        </div>
                        {form.to_type === 'existing' ? (
                          <select className="form-control" value={form.beneficiary_id}
                            onChange={e => setForm(f => ({ ...f, beneficiary_id: e.target.value }))}>
                            <option value="">-- Select Beneficiary --</option>
                            {beneficiaries.filter(b => b.is_active).map(b => (
                              <option key={b.id} value={b.id}>{b.name} ({b.nickname}) - {b.bank_name}</option>
                            ))}
                          </select>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                            <div className="form-group">
                              <label>Account Number*</label>
                              <input className="form-control" value={form.to_account}
                                onChange={e => setForm(f => ({ ...f, to_account: e.target.value }))} />
                            </div>
                            <div className="form-group">
                              <label>IFSC Code*</label>
                              <input className="form-control" value={form.ifsc}
                                onChange={e => setForm(f => ({ ...f, ifsc: e.target.value.toUpperCase() }))} />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1/-1' }}>
                              <label>Beneficiary Name*</label>
                              <input className="form-control" value={form.to_name}
                                onChange={e => setForm(f => ({ ...f, to_name: e.target.value }))} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                        <div className="form-group">
                          <label>Amount (₹)*</label>
                          <input className="form-control" type="number" min="1" step="0.01" value={form.amount}
                            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                          {selectedAccount && form.amount && (
                            <div style={{ fontSize: 10, color: parseFloat(form.amount) > parseFloat(selectedAccount.available_balance) ? '#c0392b' : '#27ae60', marginTop: 2 }}>
                              Available: {fmt(selectedAccount.available_balance)}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Remarks</label>
                          <input className="form-control" value={form.remarks}
                            onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Continue ›</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (() => {
                const ben = form.to_type === 'existing' ? beneficiaries.find(b => b.id === form.beneficiary_id) : null;
                return (
                  <div className="card">
                    <div className="card-header">Review Transfer</div>
                    <div className="card-body">
                      <table style={{ width: '100%', fontSize: 13 }}>
                        <tbody>
                          {[
                            ['From Account', `${selectedAccount?.account_type?.toUpperCase()} - XXXX${selectedAccount?.account_number?.slice(-4)}`],
                            ['Transfer Mode', form.transfer_mode],
                            ['Beneficiary', ben?.name || form.to_name],
                            ['To Account', ben?.account_number || form.to_account],
                            ['Bank/IFSC', ben ? `${ben.bank_name} | ${ben.ifsc_code}` : form.ifsc],
                            ['Amount', <strong style={{ fontSize: 18, color: '#1a5276' }}>{fmt(form.amount)}</strong>],
                            ['Remarks', form.remarks || '—'],
                          ].map(([k, v]) => (
                            <tr key={k}>
                              <td style={{ padding: '8px 0', color: '#888', width: 160, fontWeight: 'bold' }}>{k}</td>
                              <td style={{ padding: '8px 0' }}>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="alert alert-warning" style={{ marginTop: 14, fontSize: 11 }}>
                        Please verify all details carefully. Transactions once completed cannot be reversed.
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                        <button className="btn btn-primary" onClick={handleSendOtp} disabled={loading}>
                          {loading ? 'Sending OTP...' : 'Confirm & Send OTP'}
                        </button>
                        <button className="btn btn-secondary" onClick={() => setStep(1)}>Edit</button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Step 3: OTP */}
              {step === 3 && (
                <div className="card">
                  <div className="card-header">OTP Verification</div>
                  <div className="card-body">
                    <div className="alert alert-info">OTP sent to your registered mobile number.</div>
                    {otpDemo && (
                      <div className="alert alert-warning" style={{ fontSize: 11 }}>
                        <strong>Demo OTP:</strong> <strong style={{ fontSize: 18 }}>{otpDemo}</strong>
                      </div>
                    )}
                    <form onSubmit={handleConfirm}>
                      <div className="form-group">
                        <label>Enter OTP*</label>
                        <input className="form-control" value={otp} maxLength={6} style={{ width: 180, letterSpacing: 6, fontSize: 20 }}
                          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} />
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button type="submit" className="btn btn-success" disabled={loading}>
                          {loading ? 'Processing...' : '✓ Confirm Transfer'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && result && (
                <div className="card">
                  <div style={{ background: '#27ae60', color: '#fff', padding: 20, textAlign: 'center', borderRadius: '4px 4px 0 0' }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>✓</div>
                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>Transfer Successful!</div>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success">
                      <strong>Reference Number:</strong> {result.referenceNumber}
                    </div>
                    <table style={{ width: '100%', fontSize: 13 }}>
                      <tbody>
                        {[
                          ['Amount Transferred', fmt(form.amount)],
                          ['Date & Time', new Date().toLocaleString('en-IN')],
                          ['Mode', form.transfer_mode],
                          ['New Balance', result.newBalance ? fmt(result.newBalance) : '—'],
                        ].map(([k, v]) => (
                          <tr key={k}>
                            <td style={{ padding: '7px 0', color: '#888', width: 180, fontWeight: 'bold' }}>{k}</td>
                            <td style={{ padding: '7px 0', fontWeight: 'bold' }}>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={reset}>Make Another Transfer</button>
                  </div>
                </div>
              )}
            </div>

            {/* Side Info */}
            <div style={{ width: 240, flexShrink: 0 }}>
              <div className="card" style={{ marginBottom: 12 }}>
                <div className="card-header" style={{ fontSize: 12 }}>Transfer Limits</div>
                <div style={{ padding: 12, fontSize: 11 }}>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      {[['NEFT', '₹2 Lakh/txn'],['RTGS', '₹2 Lakh min'],['IMPS', '₹5 Lakh/day']].map(([m,l]) => (
                        <tr key={m}><td style={{ padding: '4px 0', color: '#888' }}>{m}</td><td style={{ fontWeight: 'bold' }}>{l}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="alert alert-warning" style={{ fontSize: 11 }}>
                <strong>⚠ Important:</strong> Never transfer money to unknown accounts. Verify beneficiary details before confirming.
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
