-- Create orders table
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

-- Create order_items table
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

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
-- Users can view their own orders
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policies for order_items
-- Users can view items of their own orders
CREATE POLICY "Users can view their own order items" ON order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );
