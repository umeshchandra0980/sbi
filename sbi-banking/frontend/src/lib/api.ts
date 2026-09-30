import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

// Custom Axios Adapter for Client-Side Offline Mock Mode
const originalAdapter = api.defaults.adapter;
api.defaults.adapter = async (config) => {
  const token = Cookies.get('access_token')
  if (token === 'mock-access-token') {
    const url = config.url || '';
    let responseData: any = null;
    
    if (url.includes('/auth/me')) {
      responseData = {
        id: 'mock-user-id',
        username: 'demo.bypass',
        email: 'demo.bypass@example.com',
        full_name: 'Bypassed Demo User',
        role: 'customer',
        status: 'active',
        is_verified: true,
        created_at: new Date().toISOString(),
      };
    } else if (url.includes('/dashboard')) {
      responseData = {
        user: { full_name: 'Bypassed Demo User', last_login: new Date().toISOString() },
        total_balance: 324050.00,
        total_accounts: 2,
        accounts: [
          {
            id: 'mock-acc-1',
            account_number: '12345678901',
            account_type: 'savings',
            status: 'active',
            balance: 248750.00,
            available_balance: 248750.00,
          },
          {
            id: 'mock-acc-2',
            account_number: '98765432109',
            account_type: 'current',
            status: 'active',
            balance: 75300.00,
            available_balance: 75300.00,
          }
        ],
        recent_transactions: [
          {
            id: 'mock-txn-1',
            transaction_ref: 'SBIMOCK12345',
            type: 'credit',
            category: 'salary',
            amount: 85000.00,
            balance_after: 248750.00,
            description: 'Mock Salary Credit',
            value_date: new Date().toISOString(),
          },
          {
            id: 'mock-txn-2',
            transaction_ref: 'SBIMOCK12346',
            type: 'debit',
            category: 'upi',
            amount: 485.00,
            balance_after: 163750.00,
            description: 'UPI - Swiggy',
            value_date: new Date(Date.now() - 3600000).toISOString(),
          }
        ]
      };
    } else if (url.includes('/accounts')) {
      responseData = [
        {
          id: 'mock-acc-1',
          account_number: '12345678901',
          account_type: 'savings',
          status: 'active',
          balance: 248750.00,
          available_balance: 248750.00,
          branch_name: 'MG Road Branch',
          ifsc_code: 'SBIN0000001',
          interest_rate: 3.50,
          is_primary: true,
          created_at: new Date().toISOString()
        },
        {
          id: 'mock-acc-2',
          account_number: '98765432109',
          account_type: 'current',
          status: 'active',
          balance: 75300.00,
          available_balance: 75300.00,
          branch_name: 'MG Road Branch',
          ifsc_code: 'SBIN0000001',
          interest_rate: 0.00,
          is_primary: false,
          created_at: new Date().toISOString()
        }
      ];
    } else if (url.includes('/transfers/beneficiaries')) {
      responseData = [
        {
          id: 'mock-ben-1',
          nickname: 'Amit',
          account_number: '98765432102',
          ifsc_code: 'HDFC0001234',
          bank_name: 'HDFC Bank',
          beneficiary_name: 'Amit Kumar',
          is_verified: true
        }
      ];
    } else if (url.includes('/transfers')) {
      responseData = [];
    } else if (url.includes('/transactions')) {
      const txList = [
        {
          id: 'mock-txn-1',
          transaction_ref: 'SBIMOCK12345',
          type: 'credit',
          category: 'salary',
          amount: 85000.00,
          balance_after: 248750.00,
          description: 'Mock Salary Credit',
          value_date: new Date().toISOString(),
        }
      ];
      responseData = {
        items: txList,
        transactions: txList,
        total: 1
      };
    } else if (url.includes('/admin/stats')) {
      responseData = {
        total_users: 10,
        active_users: 8,
        locked_users: 1,
        total_accounts: 15,
        total_balance: 1540000.00,
        total_transactions_today: 42,
        total_transfers_today: 18,
        pending_transfers: 2,
        pending_registrations: 2
      };
    } else if (url.includes('/admin/users')) {
      const userList = [
        {
          id: 'mock-user-id',
          username: 'demo.bypass',
          email: 'demo.bypass@example.com',
          full_name: 'Bypassed Demo User',
          role: 'customer',
          status: 'active',
          is_verified: true,
          failed_login_attempts: 0,
          created_at: new Date().toISOString()
        }
      ];
      responseData = {
        items: userList,
        users: userList,
        total: 1
      };
    } else if (url.includes('/admin/accounts')) {
      const accList = [
        {
          id: 'mock-acc-1',
          account_number: '12345678901',
          account_type: 'savings',
          status: 'active',
          balance: 248750.00,
          available_balance: 248750.00,
          branch_name: 'MG Road Branch, Bengaluru',
          ifsc_code: 'SBIN0000001',
          owner_name: 'Bypassed Demo User',
          owner_username: 'demo.bypass',
          created_at: new Date().toISOString()
        }
      ];
      responseData = { items: accList, total: 1 };
    } else if (url.includes('/admin/transfers')) {
      const trList = [
        {
          id: 'mock-tr-1',
          transfer_ref: 'TRF12345678',
          source_account_id: 'mock-acc-1',
          beneficiary_name: 'Amit Kumar',
          beneficiary_account: '98765432109',
          beneficiary_ifsc: 'HDFC0001234',
          amount: 15000.00,
          transfer_mode: 'IMPS',
          status: 'completed',
          remarks: 'Vendor payment',
          created_at: new Date().toISOString()
        }
      ];
      responseData = { items: trList, total: 1 };
    } else if (url.includes('/admin/audit-logs')) {
      const logList = [
        {
          id: 'mock-log-1',
          user_id: 'mock-user-id',
          admin_username: 'admin',
          action: 'login',
          resource: 'user',
          ip_address: '127.0.0.1',
          details: 'Admin logged into portal',
          created_at: new Date().toISOString()
        }
      ];
      responseData = { items: logList, total: 1 };
    } else {
      responseData = {};
    }
    
    return {
      data: responseData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: {}
    };
  }
  
  if (originalAdapter) {
    return (originalAdapter as any)(config);
  }
  throw new Error('No adapter configured');
};

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      if (typeof window !== 'undefined') window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// ── Auth ─────────────────────────────────────────────────────
export const authApi = {
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),

  demoLogin: (data: { username?: string; create_new?: boolean }) =>
    api.post('/auth/demo-login', data),

  verifyOTP: (data: { session_token: string; otp: string }) =>
    api.post('/auth/verify-otp', data),

  logout: () => api.post('/auth/logout'),

  register: (data: {
    account_number: string
    cif_number: string
    branch_code: string
    country_code: string
    mobile_number: string
    facility: string
    captcha_token: string
    captcha_answer: string
  }) => api.post('/auth/register', data),

  activate: (data: {
    temp_username: string
    cif_number: string
    date_of_birth: string
    captcha_token: string
    captcha_answer: string
  }) => api.post('/auth/activate', data),

  refresh: (refresh_token: string) =>
    api.post('/auth/refresh', { refresh_token }),

  me: () => api.get('/auth/me'),

  updateProfile: (data: { full_name?: string; email?: string; phone?: string; address?: string }) =>
    api.patch('/auth/me', data),

  changePassword: (data: { current_password: string; new_password: string; confirm_password: string }) =>
    api.post('/auth/change-password', data),

  captcha: () => api.get('/auth/captcha'),
}

// ── Captcha (backend image/audio) ────────────────────────────
export const captchaApi = {
  image: () => api.get('/captcha/image', { responseType: 'blob' }),
  audio: (token: string) => api.get(`/captcha/audio?token=${token}`, { responseType: 'blob' }),
  verify: (captcha_token: string, captcha_answer: string) =>
    api.post('/captcha/verify', { captcha_token, captcha_answer }),
}

// ── Dashboard ─────────────────────────────────────────────────
export const dashboardApi = {
  get: () => api.get('/dashboard/'),
}

// ── Accounts ──────────────────────────────────────────────────
export const accountsApi = {
  list: () => api.get('/accounts/'),
  get: (id: string) => api.get(`/accounts/${id}`),
  create: (data: object) => api.post('/accounts/', data),
}

// ── Transactions ──────────────────────────────────────────────
export const transactionsApi = {
  list: (accountId: string, params?: object) =>
    api.get(`/transactions/${accountId}`, { params }),
}

// ── Transfers ─────────────────────────────────────────────────
export const transfersApi = {
  initiate: (data: object) => api.post('/transfers/initiate', data),
  confirm: (data: { transfer_id: string; otp: string }) =>
    api.post('/transfers/confirm', data),
  list: (params?: object) => api.get('/transfers/', { params }),
  getBeneficiaries: () => api.get('/transfers/beneficiaries'),
  addBeneficiary: (data: object) => api.post('/transfers/beneficiaries', data),
}

// ── Admin ──────────────────────────────────────────────────────
export const adminApi = {
  stats: () => api.get('/admin/stats'),
  listUsers: (params?: object) => api.get('/admin/users', { params }),
  getUserDetail: (id: string) => api.get(`/admin/users/${id}`),
  createUser: (data: object) => api.post('/admin/users', data),
  editUser: (id: string, data: object) => api.patch(`/admin/users/${id}`, data),
  changeUserRole: (id: string, role: string) => api.patch(`/admin/users/${id}/role`, { role }),
  resetUserPassword: (id: string) => api.post(`/admin/users/${id}/reset-password`),
  lockUser: (id: string) => api.patch(`/admin/users/${id}/lock`),
  unlockUser: (id: string) => api.patch(`/admin/users/${id}/unlock`),
  suspendUser: (id: string) => api.patch(`/admin/users/${id}/suspend`),
  listAccounts: (params?: object) => api.get('/admin/accounts', { params }),
  freezeAccount: (id: string) => api.patch(`/admin/accounts/${id}/freeze`),
  unfreezeAccount: (id: string) => api.patch(`/admin/accounts/${id}/unfreeze`),
  listTransactions: (params?: object) => api.get('/admin/transactions', { params }),
  listTransfers: (params?: object) => api.get('/admin/transfers', { params }),
  listAuditLogs: (params?: object) => api.get('/admin/audit-logs', { params }),
}
