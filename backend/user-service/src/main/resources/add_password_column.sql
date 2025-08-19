-- Add password_hash column to drivers table
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) NOT NULL DEFAULT '';
