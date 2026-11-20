-- ========================================================
-- DATA SERWARE PLATFORM - SUPABASE SCHEMA MIGRATION
-- Project: Data Serware (Enterprise Cloud, Game Servers & VPS)
-- ========================================================

-- 1. Ensure 'orders' table has all tracking and provisioning fields
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_name TEXT,
    user_email TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    original_price NUMERIC,
    currency TEXT DEFAULT 'INR',
    tracking_token TEXT UNIQUE,
    razorpay_order_id TEXT UNIQUE,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    server_name TEXT,
    domain_name TEXT,
    os TEXT,
    ssh_key TEXT,
    machine_id TEXT,
    server_region TEXT DEFAULT 'Mumbai, India',
    server_details JSONB,
    status TEXT DEFAULT 'PENDING',
    payment_status TEXT DEFAULT 'PENDING',
    provisioning_status TEXT DEFAULT 'pending',
    deployment_error TEXT,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_tracking_token ON public.orders(tracking_token);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id ON public.orders(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON public.orders(user_email);

-- 2. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id TEXT PRIMARY KEY,
    order_id TEXT REFERENCES public.orders(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    customer_name TEXT,
    customer_email TEXT,
    mobile TEXT,
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    tax_amount NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    payment_method TEXT DEFAULT 'Razorpay',
    razorpay_payment_id TEXT,
    status TEXT NOT NULL DEFAULT 'paid',
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON public.invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON public.invoices(invoice_number);

-- 3. Admin Whitelist & Role Management
CREATE TABLE IF NOT EXISTS public.admin_users (
    email TEXT PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'admin',
    added_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Super Admin
INSERT INTO public.admin_users (email, role, added_by)
VALUES 
    ('admin@dataserware.com', 'owner', 'system'),
    ('r26377269@gmail.com', 'owner', 'system')
ON CONFLICT (email) DO UPDATE SET role = 'owner';
