-- SBI Banking Portal - Initial DB Setup
-- This runs automatically on first postgres container start

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure timezone is set
SET timezone = 'Asia/Kolkata';
