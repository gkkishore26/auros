-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    currency TEXT DEFAULT 'INR',
    category TEXT,
    badge TEXT,
    features JSONB,
    images JSONB,
    product_file JSONB,
    is_built_in BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Function to generate slug
CREATE OR REPLACE FUNCTION public.generate_slug(name TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Lowercase the name and replace non-alphanumeric characters with hyphens
    -- Trim leading/trailing hyphens
    RETURN trim(both '-' from lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')));
END;
$$ LANGUAGE plpgsql;

-- Function to handle product slug before insert
CREATE OR REPLACE FUNCTION public.handle_product_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := public.generate_slug(NEW.name);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-fill slug
CREATE TRIGGER before_insert_products_slug
BEFORE INSERT ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_product_slug();
