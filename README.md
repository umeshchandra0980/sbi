# SBI Online Banking Portal

A premium, interactive clone of the State Bank of India (SBI) Online Banking interface. It features standard retail banking workflows with a FastAPI backend and a Next.js frontend, enhanced with developer bypass features and client-side offline mock mode.

## 🚀 Features

- **Personal Net Banking Dashboard**: View savings, current, and FD accounts, real-time balances, and interactive transaction history charts.
- **Fund Transfer & Beneficiary Management**: Add beneficiaries and perform IMPS/NEFT/RTGS transfers with OTP simulation.
- **Admin Panel**: Manage users, lock/unlock accounts, and view detailed audit logs.
- **Developer Bypass Panel**: Easily bypass OTP/Captcha on the login screen, dynamically seed new users, or run in client-only offline mock mode.
- **Local Link Safety**: All external references route inside `localhost`.

## 📦 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript, Zustand, React Query
- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Redis (with in-memory fallback)

## 🛠️ Vercel Deployment

This repository is configured for deployment on Vercel:
- **vercel.json** configuration routing is defined in the root monorepo directory.
- Next.js framework build configuration is configured in `sbi-banking/frontend/vercel.json`.
- Set `NEXT_PUBLIC_API_URL` to point to your backend endpoint in your Vercel Project settings.
