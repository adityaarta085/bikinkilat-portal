-- Migration 001: Initial Schema for BikinKilat Ecosystem
-- Database: Supabase PostgreSQL (Project oonozobspxhvztoikakt)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table users (Centralized Token Wallet)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    tokens INT NOT NULL DEFAULT 5 CHECK (tokens >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Table transactions (QRIS Cashier Logs)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    package_name TEXT NOT NULL,
    amount_idr INT NOT NULL,
    tokens_added INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Table slide_projects (slide.bikinkilat.id)
CREATE TABLE IF NOT EXISTS public.slide_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    education_level TEXT NOT NULL,
    group_members TEXT,
    slides_json JSONB NOT NULL,
    paper_markdown TEXT NOT NULL,
    qa_cheat_sheet JSONB NOT NULL,
    is_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slide_projects ENABLE ROW LEVEL SECURITY;

-- Set RLS policies
DROP POLICY IF EXISTS "Public users access" ON public.users;
CREATE POLICY "Public users access" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public transactions access" ON public.transactions;
CREATE POLICY "Public transactions access" ON public.transactions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public slide_projects access" ON public.slide_projects;
CREATE POLICY "Public slide_projects access" ON public.slide_projects FOR ALL USING (true) WITH CHECK (true);

-- Seed Demo Account with 5 Free Tokens
INSERT INTO public.users (id, email, name, tokens)
VALUES ('11111111-1111-1111-1111-111111111111', 'demo@bikinkilat.id', 'Demo User BikinKilat', 5)
ON CONFLICT (id) DO UPDATE 
SET tokens = 5, name = 'Demo User BikinKilat';
