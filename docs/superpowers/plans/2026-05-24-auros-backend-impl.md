# AUROS Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full Supabase backend for AUROS e-commerce including tables, RLS, triggers, and storage.

**Architecture:** Pure PostgreSQL/Supabase. Uses a public `users` table synchronized with `auth.users` via triggers. RLS is used for granular access control.

**Tech Stack:** Supabase (PostgreSQL, PostgREST, GoTrue, Realtime).

---

### Task 1: Products Table & Slug Logic

**Files:**
- SQL Script: `supabase/migrations/01_products.sql`

- [ ] **Step 1: Create the `products` table**
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    compare_at_price NUMERIC(10,2),
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
```

- [ ] **Step 2: Create the `generate_slug` function**
```sql
CREATE OR REPLACE FUNCTION generate_slug(name TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;
```

- [ ] **Step 3: Create the product slug trigger**
```sql
CREATE OR REPLACE FUNCTION handle_product_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_slug(NEW.name);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_products_slug
BEFORE INSERT ON products
FOR EACH ROW EXECUTE FUNCTION handle_product_slug();
```

- [ ] **Step 4: Verify products and slug logic**
Run:
```sql
INSERT INTO products (name, price) VALUES ('Cinematic LUTs Vol 1', 2900);
SELECT name, slug FROM products WHERE name = 'Cinematic LUTs Vol 1';
```
Expected: `slug` is `cinematic-luts-vol-1`.

- [ ] **Step 5: Commit**
```bash
git add supabase/migrations/01_products.sql
git commit -m "feat(db): implement products table and slug generation"
```

### Task 2: User Synchronization

**Files:**
- SQL Script: `supabase/migrations/02_users.sql`

- [ ] **Step 1: Create the `users` table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 2: Create the user sync function**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, display_name, avatar_url)
    VALUES (
        NEW.id, 
        NEW.email, 
        NEW.raw_user_meta_data->>'display_name', 
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

- [ ] **Step 3: Create the auth trigger**
```sql
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

- [ ] **Step 4: Verify user sync**
(Simulated via SQL since we can't easily trigger auth.users in migration)
```sql
-- This requires service_role or direct DB access to insert into auth.users
INSERT INTO auth.users (id, email) VALUES ('00000000-0000-0000-0000-000000000000', 'test@example.com');
SELECT * FROM public.users WHERE email = 'test@example.com';
```
Expected: Row exists in `public.users`.

- [ ] **Step 5: Commit**
```bash
git add supabase/migrations/02_users.sql
git commit -m "feat(db): implement users table and auth sync trigger"
```

### Task 3: Orders & Order Items

**Files:**
- SQL Script: `supabase/migrations/03_orders.sql`

- [ ] **Step 1: Create the `orders` table**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    order_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'completed',
    payment_method TEXT,
    payment_intent_id TEXT,
    total NUMERIC(10,2),
    currency TEXT,
    customer_name TEXT,
    customer_email TEXT,
    customer_address TEXT,
    customer_city TEXT,
    customer_pincode TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 2: Create the `order_items` table**
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name TEXT,
    product_currency TEXT,
    product_price NUMERIC(10,2),
    quantity INTEGER DEFAULT 1,
    product_file JSONB
);
```

- [ ] **Step 3: Verify relationships**
```sql
-- Create test user and product
INSERT INTO users (id, email) VALUES ('00000000-0000-0000-0000-000000000000', 'test@example.com');
INSERT INTO products (name, slug, price) VALUES ('Test Prod', 'test-prod', 100);

-- Create order
INSERT INTO orders (user_id, order_number, total) 
VALUES ('00000000-0000-0000-0000-000000000000', 'AUROS-001', 100);

-- Create item
INSERT INTO order_items (order_id, product_id, product_name, product_price)
SELECT id, (SELECT id FROM products WHERE slug = 'test-prod'), 'Test Prod', 100 
FROM orders WHERE order_number = 'AUROS-001';
```
Expected: Both inserts succeed.

- [ ] **Step 4: Commit**
```bash
git add supabase/migrations/03_orders.sql
git commit -m "feat(db): implement orders and order_items tables"
```

### Task 4: Reviews & Wishlist

**Files:**
- SQL Script: `supabase/migrations/04_social.sql`

- [ ] **Step 1: Create the `reviews` table**
```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    user_id UUID REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 2: Create the `wishlist_items` table**
```sql
CREATE TABLE wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, product_id)
);
```

- [ ] **Step 3: Verify constraints**
```sql
-- Test rating check constraint
INSERT INTO reviews (product_id, user_id, rating, content) 
VALUES ((SELECT id FROM products LIMIT 1), '00000000-0000-0000-0000-000000000000', 6, 'Too high');
```
Expected: FAIL with check constraint violation.

- [ ] **Step 4: Commit**
```bash
git add supabase/migrations/04_social.sql
git commit -m "feat(db): implement reviews and wishlist tables"
```

### Task 5: RLS Policies

**Files:**
- SQL Script: `supabase/migrations/05_rls.sql`

- [ ] **Step 1: Enable RLS on all tables**
```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 2: Implement Product policies**
```sql
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
-- All other operations restricted to service_role by default (no policy created)
```

- [ ] **Step 3: Implement User policies**
```sql
CREATE POLICY "Users can manage their own profile" ON users 
FOR ALL USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);
```

- [ ] **Step 4: Implement Order policies**
```sql
CREATE POLICY "Users can view and create their own orders" ON orders 
FOR SELECT, INSERT USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
```

- [ ] **Step 5: Implement Order Item policies**
```sql
CREATE POLICY "Users can view and create their own order items" ON order_items 
FOR SELECT, INSERT USING (
    EXISTS (
        SELECT 1 FROM orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id = auth.uid()
    )
);
```

- [ ] **Step 6: Implement Review policies**
```sql
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage their own reviews" ON reviews 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
```

- [ ] **Step 7: Implement Wishlist policies**
```sql
CREATE POLICY "Users can manage their own wishlist" ON wishlist_items 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
```

- [ ] **Step 8: Commit**
```bash
git add supabase/migrations/05_rls.sql
git commit -m "feat(db): implement RLS policies for all tables"
```

### Task 6: Storage, Realtime & Config

**Files:**
- SQL Script: `supabase/migrations/06_infra.sql`
- Config: `.env`

- [ ] **Step 1: Create Storage Buckets**
(Note: These are typically created via Dashboard or API, but we can use SQL for the internal bucket table if needed. For the plan, we'll document the required bucket creation)
```sql
-- This is conceptual for the plan as bucket creation usually happens via CLI/Dashboard
-- CREATE BUCKET "product-images" PUBLIC;
-- CREATE BUCKET "product-files" PUBLIC;
```

- [ ] **Step 2: Enable Realtime**
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
```

- [ ] **Step 3: Setup Environment Variables**
Ensure `.env` contains:
```text
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

- [ ] **Step 4: Commit**
```bash
git add supabase/migrations/06_infra.sql
git commit -m "feat(infra): enable realtime and configure storage buckets"
```
