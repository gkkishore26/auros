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

-- 5. Test empty name validation
DO $$
BEGIN
    BEGIN
        INSERT INTO public.products (name, price) VALUES ('', 100.00);
        RAISE EXCEPTION 'Empty name should have failed validation';
    EXCEPTION WHEN check_violation THEN
        -- Expected
    END;
    BEGIN
        INSERT INTO public.products (name, price) VALUES ('   ', 100.00);
        RAISE EXCEPTION 'Whitespace-only name should have failed validation';
    EXCEPTION WHEN check_violation THEN
        -- Expected
    END;
END $$;

-- 6. Test slug collision handling
INSERT INTO public.products (name, price) VALUES ('Collision Product', 100.00);
INSERT INTO public.products (name, price) VALUES ('Collision Product', 200.00);

DO $$
DECLARE
    slugs TEXT[];
BEGIN
    SELECT array_agg(slug) INTO slugs FROM (SELECT slug FROM public.products WHERE name = 'Collision Product' ORDER BY created_at ASC) s;

    IF array_length(slugs, 1) != 2 THEN
        RAISE EXCEPTION 'Expected 2 products with name Collision Product, found %', array_length(slugs, 1);
    END IF;

    IF slugs[1] = slugs[2] THEN
        RAISE EXCEPTION 'Slug collision handling failed. Both products have the same slug: %', slugs[1];
    END IF;
END $$;

-- 7. Test updated_at automation
DO $$
DECLARE
    prod_id UUID;
    old_updated_at TIMESTAMPTZ;
    new_updated_at TIMESTAMPTZ;
BEGIN
    INSERT INTO public.products (name, price) VALUES ('Update Test Product', 100.00) RETURNING id, updated_at INTO prod_id, old_updated_at;

    PERFORM pg_sleep(0.1);

    UPDATE public.products SET price = 150.00 WHERE id = prod_id;

    SELECT updated_at INTO new_updated_at FROM public.products WHERE id = prod_id;

    IF new_updated_at <= old_updated_at THEN
        RAISE EXCEPTION 'updated_at did not increase. Old: %, New: %', old_updated_at, new_updated_at;
    END IF;
END $$;

ROLLBACK;
