-- ============================================================
-- SBI Banking Application - Complete Database Schema
-- Run this file to create all tables from scratch
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables (safe re-run)
DROP TABLE IF EXISTS audit_logs    CASCADE;
DROP TABLE IF EXISTS transactions  CASCADE;
DROP TABLE IF EXISTS beneficiaries CASCADE;
DROP TABLE IF EXISTS accounts      CASCADE;
DROP TABLE IF EXISTS otps          CASCADE;
DROP TABLE IF EXISTS sessions      CASCADE;
DROP TABLE IF EXISTS users         CASCADE;

-- ── USERS ──────────────────────────────────────────────────
CREATE TABLE users (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username             VARCHAR(50)  UNIQUE NOT NULL,
  password_hash        VARCHAR(255) NOT NULL,
  full_name            VARCHAR(100) NOT NULL,
  email                VARCHAR(100) UNIQUE NOT NULL,
  phone                VARCHAR(15)  UNIQUE NOT NULL,
  date_of_birth        DATE,
  address              TEXT,
  pan_number           VARCHAR(10),
  role                 VARCHAR(20)  DEFAULT 'customer' CHECK (role IN ('customer','admin','manager')),
  is_active            BOOLEAN      DEFAULT true,
  is_locked            BOOLEAN      DEFAULT false,
  failed_login_attempts INTEGER     DEFAULT 0,
  last_login           TIMESTAMP,
  password_changed_at  TIMESTAMP    DEFAULT NOW(),
  created_at           TIMESTAMP    DEFAULT NOW(),
  updated_at           TIMESTAMP    DEFAULT NOW()
);

-- ── ACCOUNTS ────────────────────────────────────────────────
CREATE TABLE accounts (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  account_number      VARCHAR(20) UNIQUE NOT NULL,
  account_type        VARCHAR(20) NOT NULL CHECK (account_type IN ('savings','current','fd','rd')),
  balance             DECIMAL(15,2) DEFAULT 0.00,
  available_balance   DECIMAL(15,2) DEFAULT 0.00,
  currency            VARCHAR(3)    DEFAULT 'INR',
  ifsc_code           VARCHAR(11)   DEFAULT 'SBIN0000001',
  branch_name         VARCHAR(100)  DEFAULT 'Main Branch',
  is_active           BOOLEAN       DEFAULT true,
  daily_transfer_limit DECIMAL(15,2) DEFAULT 100000.00,
  interest_rate       DECIMAL(5,2)  DEFAULT 4.00,
  nominee_name        VARCHAR(100),
  created_at          TIMESTAMP     DEFAULT NOW(),
  updated_at          TIMESTAMP     DEFAULT NOW()
);

-- ── TRANSACTIONS ────────────────────────────────────────────
CREATE TABLE transactions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_account_id  UUID REFERENCES accounts(id),
  to_account_id    UUID REFERENCES accounts(id),
  transaction_type VARCHAR(30) NOT NULL CHECK (transaction_type IN ('credit','debit','transfer','neft','rtgs','imps','upi','atm','interest','charges')),
  amount           DECIMAL(15,2) NOT NULL,
  balance_after    DECIMAL(15,2),
  description      TEXT,
  reference_number VARCHAR(60) UNIQUE,
  status           VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending','completed','failed','reversed')),
  narration        TEXT,
  channel          VARCHAR(30) DEFAULT 'internet_banking',
  ip_address       VARCHAR(45),
  created_at       TIMESTAMP DEFAULT NOW()
);

-- ── BENEFICIARIES ───────────────────────────────────────────
CREATE TABLE beneficiaries (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  name            VARCHAR(100) NOT NULL,
  account_number  VARCHAR(20)  NOT NULL,
  ifsc_code       VARCHAR(11)  NOT NULL,
  bank_name       VARCHAR(100),
  branch_name     VARCHAR(100),
  is_verified     BOOLEAN  DEFAULT false,
  is_active       BOOLEAN  DEFAULT true,
  nickname        VARCHAR(50),
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ── OTPS ────────────────────────────────────────────────────
CREATE TABLE otps (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  phone       VARCHAR(15),
  otp_code    VARCHAR(6) NOT NULL,
  purpose     VARCHAR(30) NOT NULL,
  is_used     BOOLEAN DEFAULT false,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── SESSIONS ────────────────────────────────────────────────
CREATE TABLE sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash    VARCHAR(255) NOT NULL,
  ip_address    VARCHAR(45),
  user_agent    TEXT,
  is_active     BOOLEAN DEFAULT true,
  expires_at    TIMESTAMP NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

-- ── AUDIT LOGS ──────────────────────────────────────────────
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  resource    VARCHAR(50),
  ip_address  VARCHAR(45),
  user_agent  TEXT,
  status      VARCHAR(20) DEFAULT 'success',
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── INDEXES ─────────────────────────────────────────────────
CREATE INDEX idx_users_username    ON users(username);
CREATE INDEX idx_users_phone       ON users(phone);
CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_accounts_user     ON accounts(user_id);
CREATE INDEX idx_accounts_number   ON accounts(account_number);
CREATE INDEX idx_txn_from          ON transactions(from_account_id);
CREATE INDEX idx_txn_to            ON transactions(to_account_id);
CREATE INDEX idx_txn_created       ON transactions(created_at DESC);
CREATE INDEX idx_otp_user_purpose  ON otps(user_id, purpose);
CREATE INDEX idx_audit_user        ON audit_logs(user_id);

-- ── AUTO-UPDATE updated_at ────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at    BEFORE UPDATE ON users    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

