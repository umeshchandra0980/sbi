# SBI Online Banking Portal — Team Work Division Plan

This document outlines the clear division of work among the **3 team members** to ensure efficient collaboration, smooth task delegation, and conflict-free Git workflows.

---

## 👥 Work Breakdown & Task Allocation

### 👤 Developer 1: Customer Portal & Account Management Lead
**Primary Focus**: Customer Dashboard, Account Details, Statements & UI Layouts.

* 📂 **Assigned Modules & Files**:
  - `frontend/src/app/dashboard/` — Dashboard UI & portfolio overview widgets
  - `frontend/src/app/accounts/` — Linked accounts list, account summary & filters
  - `frontend/src/app/statements/` — Period statements & PDF/CSV export downloads
  - `frontend/src/app/settings/` — Profile management, change password, notification settings
* 🎯 **Key Responsibilities**:
  1. Enhance transaction filtering (by date range, credit/debit, amount, search keywords).
  2. Implement statement download generators (PDF and Excel format).
  3. Wire live account balances & portfolio statistics to the customer dashboard.

---

### 👤 Developer 2: Fund Transfers, Beneficiaries & Services Lead
**Primary Focus**: NEFT/RTGS/IMPS Transfers, Payee Management & Video KYC.

* 📂 **Assigned Modules & Files**:
  - `frontend/src/app/transfers/` — NEFT, RTGS, IMPS transfer forms & confirmation UI
  - `frontend/src/app/transfers/beneficiaries/` — Add, view, edit & delete payees
  - `frontend/src/app/web/personal-banking/accounts/saving-account/` — Saving account application & Video KYC page
  - `backend/app/api/v1/endpoints/transfers.py` — Transfer API endpoints & validation
* 🎯 **Key Responsibilities**:
  1. Build 2-step OTP confirmation modal for high-value fund transfers.
  2. Implement daily transfer limits and instant payee validation.
  3. Complete Video KYC registration form and document upload flow.

---

### 👤 Developer 3: Backend Systems, Security, Redis & Admin Panel Lead
**Primary Focus**: FastAPI Backend, PostgreSQL Schemas, Security/Auth & Admin Operations.

* 📂 **Assigned Modules & Files**:
  - `backend/app/api/v1/endpoints/auth.py`, `admin.py`, `dashboard.py` — Core API handlers
  - `backend/app/models/models.py` & `schemas/schemas.py` — Database models & Pydantic schemas
  - `backend/app/core/security.py` & `redis.py` — JWT authentication, Redis session cache, password hashing
  - `frontend/src/app/admin/` — Admin statistics panel, user lock/unlock, platform transaction audit logs
* 🎯 **Key Responsibilities**:
  1. Manage PostgreSQL database migrations (`alembic upgrade head`).
  2. Implement account locking logic after 5 failed login attempts.
  3. Build Admin Panel for platform overview (user search, manual transaction override, system stats).

---

## 🛠️ Recommended Git Workflow for Team Collaboration

1. **Pull latest changes before starting work**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branches for each developer**:
   ```bash
   # Developer 1
   git checkout -b feature/customer-portal

   # Developer 2
   git checkout -b feature/fund-transfers

   # Developer 3
   git checkout -b feature/backend-admin
   ```

3. **Commit & push to your feature branch**:
   ```bash
   git add .
   git commit -m "feat: add statement PDF export generator"
   git push origin feature/customer-portal
   ```

4. **Create a Pull Request (PR) on GitHub** to merge into `main` after code review!
