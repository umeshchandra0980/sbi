-- ============================================================
-- SBI Banking Application - Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- Admin user  (password: Admin@123456)
INSERT INTO users (id, username, password_hash, full_name, email, phone, role) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'admin',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NMsBqO6zm',
  'System Administrator', 'admin@sbi.co.in', '9000000001', 'admin'
);

-- Test customer (password: Test@1234)
INSERT INTO users (id, username, password_hash, full_name, email, phone, date_of_birth, address) VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'testuser',
  '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Rajesh Kumar', 'rajesh.kumar@email.com', '9876543210',
  '1985-06-15', '123, MG Road, Bangalore, Karnataka - 560001'
);

-- Savings account for testuser
INSERT INTO accounts (id, user_id, account_number, account_type, balance, available_balance, ifsc_code, branch_name, nominee_name) VALUES (
  'c0000000-0000-0000-0000-000000000003',
  'b0000000-0000-0000-0000-000000000002',
  '10001234567890', 'savings', 85420.50, 85420.50,
  'SBIN0001234', 'Bangalore Main Branch', 'Priya Kumar'
);

-- Current account for testuser
INSERT INTO accounts (id, user_id, account_number, account_type, balance, available_balance, ifsc_code, branch_name) VALUES (
  'd0000000-0000-0000-0000-000000000004',
  'b0000000-0000-0000-0000-000000000002',
  '20001234567890', 'current', 125000.00, 125000.00,
  'SBIN0001234', 'Bangalore Main Branch'
);

-- Sample transactions
INSERT INTO transactions (from_account_id, to_account_id, transaction_type, amount, balance_after, description, reference_number, status, narration, created_at) VALUES
(NULL, 'c0000000-0000-0000-0000-000000000003', 'credit',   50000.00, 90420.50, 'Salary Credit - June 2024',  'REF202406010001', 'completed', 'SALARY/JUN/2024',     NOW() - INTERVAL '3 days'),
('c0000000-0000-0000-0000-000000000003', NULL, 'debit',    5000.00,  85420.50, 'ATM Withdrawal',             'REF202406010002', 'completed', 'ATM/BGL/MG-ROAD',    NOW() - INTERVAL '1 day'),
('c0000000-0000-0000-0000-000000000003', NULL, 'debit',    2500.00,  82920.50, 'Online Shopping - Amazon',   'REF202406010003', 'completed', 'UPI/AMAZON/PAY',     NOW() - INTERVAL '5 days'),
(NULL, 'c0000000-0000-0000-0000-000000000003', 'credit',   15000.00, 97920.50, 'Transfer from HDFC',         'REF202406010004', 'completed', 'NEFT/HDFC/9876',     NOW() - INTERVAL '7 days'),
('c0000000-0000-0000-0000-000000000003', NULL, 'debit',    1500.00,  96420.50, 'Electricity Bill - BESCOM',  'REF202406010005', 'completed', 'BBPS/BESCOM/MAY',    NOW() - INTERVAL '10 days'),
('c0000000-0000-0000-0000-000000000003', NULL, 'debit',    800.00,   95620.50, 'Mobile Recharge - Airtel',   'REF202406010006', 'completed', 'UPI/AIRTEL/RECHARGE',NOW() - INTERVAL '12 days'),
(NULL, 'c0000000-0000-0000-0000-000000000003', 'interest', 420.50,   96040.50, 'Quarterly Interest Credit',  'REF202406010007', 'completed', 'INT/Q1/2024',        NOW() - INTERVAL '15 days'),
('c0000000-0000-0000-0000-000000000003', NULL, 'debit',    12000.00, 84040.50, 'LIC Premium Payment',        'REF202406010008', 'completed', 'NACH/LIC/PREMIUM',   NOW() - INTERVAL '20 days');

-- Sample beneficiaries
INSERT INTO beneficiaries (user_id, name, account_number, ifsc_code, bank_name, is_verified, nickname) VALUES
('b0000000-0000-0000-0000-000000000002', 'Priya Kumar',  '9876543210001', 'HDFC0001234', 'HDFC Bank',  true, 'Wife'),
('b0000000-0000-0000-0000-000000000002', 'Arun Sharma',  '5432109876001', 'ICIC0001234', 'ICICI Bank', true, 'Friend'),
('b0000000-0000-0000-0000-000000000002', 'Mother',       '1122334455001', 'SBIN0005678', 'State Bank of India', true, 'Mom');

