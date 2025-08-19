-- Add password_hash column to drivers table
-- This script should be run on your PostgreSQL database

-- Connect to your swiftlogistics database first:
-- psql -U myuser -d swiftlogistics

-- Add the password_hash column
ALTER TABLE drivers 
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Verify the table structure
\d drivers;

-- Show current data (should be empty initially)
SELECT * FROM drivers;
