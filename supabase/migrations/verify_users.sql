-- Verification script for User Synchronization

-- Start a transaction to ensure we can rollback the test data
BEGIN;

-- 1. Insert a mock user into auth.users to trigger the synchronization
-- We use a fixed UUID for consistency in testing
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, role, confirmation_token)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'test-sync@example.com',
    '{"display_name": "Sync Test User", "avatar_url": "https://example.com/avatar.jpg"}',
    now(),
    now(),
    'authenticated',
    'test-token'
);

-- 2. Check if the user was synchronized to public.users
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.users
        WHERE id = '00000000-0000-0000-0000-000000000001'
        AND email = 'test-sync@example.com'
        AND display_name = 'Sync Test User'
        AND avatar_url = 'https://example.com/avatar.jpg'
    ) THEN
        RAISE NOTICE 'SUCCESS: User synchronization verified.';
    ELSE
        RAISE EXCEPTION 'FAILURE: User synchronization failed. Check trigger and function logic.';
    END IF;
END $$;

-- Rollback the transaction to clean up the test data
ROLLBACK;
