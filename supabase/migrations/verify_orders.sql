-- Verification script for orders and order_items
BEGIN;

DO $$
DECLARE
    v_user_id UUID;
    v_product_id UUID;
    v_order_id UUID;
    v_item_id UUID;
    v_count INTEGER;
BEGIN
    -- 1. Setup: Create test user and product
    INSERT INTO users (id, email, full_name)
    VALUES (gen_random_uuid(), 'testuser@example.com', 'Test User')
    RETURNING id INTO v_user_id;

    INSERT INTO products (id, name, description, price, currency)
    VALUES (gen_random_uuid(), 'Test Product', 'Test Description', 99.99, 'USD')
    RETURNING id INTO v_product_id;

    -- 2. Create an order
    INSERT INTO orders (user_id, order_number, total, currency, customer_name, customer_email)
    VALUES (v_user_id, 'ORD-12345', 99.99, 'USD', 'Test User', 'testuser@example.com')
    RETURNING id INTO v_order_id;

    -- 3. Create an order item
    INSERT INTO order_items (order_id, product_id, product_name, product_currency, product_price, quantity)
    VALUES (v_order_id, v_product_id, 'Test Product', 'USD', 99.99, 1)
    RETURNING id INTO v_item_id;

    -- 4. Verify order and item exist
    SELECT count(*) INTO v_count FROM orders WHERE id = v_order_id;
    IF v_count != 1 THEN RAISE EXCEPTION 'Order was not created'; END IF;

    SELECT count(*) INTO v_count FROM order_items WHERE id = v_item_id AND order_id = v_order_id;
    IF v_count != 1 THEN RAISE EXCEPTION 'Order item was not created'; END IF;

    -- 5. Test CASCADE DELETE
    DELETE FROM orders WHERE id = v_order_id;

    SELECT count(*) INTO v_count FROM order_items WHERE order_id = v_order_id;
    IF v_count != 0 THEN RAISE EXCEPTION 'Order items were not deleted via CASCADE'; END IF;

    RAISE NOTICE 'Verification successful: Orders and Order Items working correctly with CASCADE DELETE';
END $$;

ROLLBACK;
