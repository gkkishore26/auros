-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(trim(name)) > 0),
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
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        base_slug := public.generate_slug(NEW.name);
        final_slug := base_slug;

        WHILE EXISTS (SELECT 1 FROM public.products WHERE slug = final_slug AND (NEW.id IS NULL OR id != NEW.id)) LOOP
            counter := counter + 1;
            final_slug := base_slug || '-' || counter;
        END LOOP;

        NEW.slug := final_slug;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-fill slug
CREATE TRIGGER before_insert_products_slug
BEFORE INSERT ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_product_slug();

-- Function to automatically update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on every update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
