-- Check current constraint on drivers table
-- Run this in PostgreSQL to see the constraint

\d+ drivers;

-- Check the exact constraint definition
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'drivers'::regclass 
AND contype = 'c';

-- Fix the constraint to match Java enum values
ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_status_check;

ALTER TABLE drivers ADD CONSTRAINT drivers_status_check 
CHECK (status IN ('PENDING', 'APPROVED', 'SUSPENDED', 'INACTIVE'));

-- Verify the new constraint
\d+ drivers;
