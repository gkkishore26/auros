-- Verification script for products table and slug logic
BEGIN;

-- 1. Test table existence
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'products') THEN
        RAISE EXCEPTION 'Table products does not exist';
    END IF;
END $$;

-- 2. Test manual slug
INSERT INTO public.products (name, slug, price)
VALUES ('Test Product 1', 'test-product-1', 100.00);

-- 3. Test auto slug (missing slug)
INSERT INTO public.products (name, price)
VALUES ('Test Product 2!', 200.00);

-- 4. Verify slugs
-- Expected: 'test-product-1' and 'test-product-2'
DO $$
DECLARE
    slug_1 TEXT;
    slug_2 TEXT;
BEGIN
    SELECT slug INTO slug_1 FROM public.products WHERE name = 'Test Product 1';
    SELECT slug INTO slug_2 FROM public.products WHERE name = 'Test Product 2!';

    IF slug_1 != 'test-product-1' THEN
        RAISE EXCEPTION 'Manual slug failed. Expected test-product-1, got %', slug_1;
    END IF;

    IF slug_2 != 'test-product-2' THEN
        RAISE EXCEPTION 'Auto slug failed. Expected test-product-2, got %', slug_2;
    END IF;
END $$;

ROLLBACK;
