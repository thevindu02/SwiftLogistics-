-- Fix PostgreSQL permissions for myuser
-- Run these commands in PostgreSQL as the superuser (postgres)

-- Connect to PostgreSQL as superuser
-- psql -U postgres -d swiftlogistics

-- Grant necessary permissions to myuser
GRANT ALL PRIVILEGES ON TABLE drivers TO myuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO myuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO myuser;

-- Verify permissions
\dp drivers;

-- Test that myuser can now access the table
-- \q (quit as postgres, then reconnect as myuser)
-- psql -U myuser -d swiftlogistics
-- SELECT * FROM drivers;
