---
name: auros-backend-design
description: Design specification for the AUROS e-commerce Supabase backend.
date: 2026-05-24
status: approved-summary
---

# AUROS Backend Design Specification

## Overview
Implementation of a Supabase backend for the AUROS e-commerce platform specializing in digital products (Premiere Pro presets, motion graphics, etc.).

## Database Schema

### 1. products
| Column | Type | Constraints | Default |
| :--- | :--- | :--- | :--- |
| id | uuid | PK | gen_random_uuid() |
| name | text | NOT NULL | |
| slug | text | UNIQUE, NOT NULL | |
| description | text | | |
| price | numeric(10,2) | NOT NULL | |
| compare_at_price | numeric(10,2) | | |
| currency | text | | 'INR' |
| category | text | | |
| badge | text | | |
| features | jsonb | | |
| images | jsonb | | |
| product_file | jsonb | | |
| is_built_in | boolean | | false |
| in_stock | boolean | | true |
| created_at | timestamptz | | now() |
| updated_at | timestamptz | | now() |

### 2. users
| Column | Type | Constraints | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | PK, FK -> auth.users | |
| email | text | | |
| display_name | text | | |
| avatar_url | text | | |
| created_at | timestamptz | | |

### 3. orders
| Column | Type | Constraints | Default |
| :--- | :--- | :--- | :--- |
| id | uuid | PK | |
| user_id | uuid | FK -> users.id | |
| order_number | text | UNIQUE | |
| status | text | | 'completed' |
| payment_method | text | | |
| payment_intent_id | text | | |
| total | numeric(10,2) | | |
| currency | text | | |
| customer_name | text | | |
| customer_email | text | | |
| customer_address | text | | |
| customer_city | text | | |
| customer_pincode | text | | |
| created_at | timestamptz | | |

### 4. order_items
| Column | Type | Constraints | Default |
| :--- | :--- | :--- | :--- |
| id | uuid | PK | |
| order_id | uuid | FK -> orders.id (CASCADE) | |
| product_id | uuid | FK -> products.id | |
| product_name | text | | |
| product_currency | text | | |
| product_price | numeric(10,2) | | |
| quantity | integer | | 1 |
| product_file | jsonb | | |

### 5. reviews
| Column | Type | Constraints |
| :--- | :--- | :--- |
| id | uuid | PK |
| product_id | uuid | FK -> products.id |
| user_id | uuid | FK -> users.id |
| rating | integer | CHECK (1-5) |
| content | text | |
| created_at | timestamptz | |

### 6. wishlist_items
| Column | Type | Constraints |
| :--- | :--- | :--- |
| id | uuid | PK |
| user_id | uuid | FK -> users.id |
| product_id | uuid | FK -> products.id |
| created_at | timestamptz | |
| (user_id, product_id) | UNIQUE | |

## Logic & Functions

### Slug Generation
A database function `generate_slug(name text)` will be created to:
- Lowercase the string.
- Replace spaces and non-alphanumeric characters with hyphens.
- Trim trailing hyphens.
A trigger `before_insert_products_slug` will call this function if the `slug` column is null.

### User Sync
A trigger on `auth.users` will automatically insert a corresponding row into `public.users` upon user sign-up.

## Security (RLS)

| Table | Operation | Policy |
| :--- | :--- | :--- |
| products | SELECT | public (true) |
| products | ALL other | service_role only |
| users | SELECT/INSERT/UPDATE | auth.uid() = id |
| orders | SELECT/INSERT | auth.uid() = user_id |
| order_items | SELECT/INSERT | via order ownership (auth.uid() = user_id in orders) |
| reviews | SELECT | public (true) |
| reviews | ALL other | auth.uid() = user_id |
| wishlist_items | ALL | auth.uid() = user_id |

## Infrastructure

### Storage Buckets
- `product-images`: Public read, Authenticated write.
- `product-files`: Public read, Authenticated write.

### Real-time
Enabled for tables: `orders`, `order_items`.
