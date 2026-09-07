import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Database, Copy, Check, Terminal } from 'lucide-react';

const MIGRATION_SQL = `-- ============================================================================
-- DYNAMIC QUOTATION BUILDER & PRICING SCHEMA
-- POPWALE.IN - Configuration-Driven Relational Architecture
-- ============================================================================

-- 1. Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    image TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Service Categories / Ceiling Types Table
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_service_categories_service_slug UNIQUE (service_id, slug)
);

-- 4. Service Parameters Table (with price_per_sqft)
CREATE TABLE IF NOT EXISTS public.service_parameters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT,
    description TEXT,
    price_per_sqft NUMERIC NOT NULL DEFAULT 0,
    is_required BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Ensure price_per_sqft column exists if table was previously created
ALTER TABLE public.service_parameters 
ADD COLUMN IF NOT EXISTS price_per_sqft NUMERIC NOT NULL DEFAULT 0;

-- 5. Parameter Products Table (with optional price_per_sqft)
CREATE TABLE IF NOT EXISTS public.parameter_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parameter_id UUID NOT NULL REFERENCES public.service_parameters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image TEXT,
    price_per_sqft NUMERIC DEFAULT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.parameter_products 
ADD COLUMN IF NOT EXISTS price_per_sqft NUMERIC DEFAULT NULL;

-- 6. Quotation System Settings Table (Fixed charges: Labour, Transport)
CREATE TABLE IF NOT EXISTS public.quotation_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO public.quotation_settings (key, value, description)
VALUES 
    ('labour_charge_per_sqft', '17'::jsonb, 'Standard Labour charge per sq.ft in INR'),
    ('transport_charge_per_sqft', '2'::jsonb, 'Standard Transportation charge per sq.ft in INR')
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- 7. Quotations Table (Customer submissions with financial snapshot columns)
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    project_location TEXT NOT NULL,
    project_type TEXT,
    area_sqft TEXT,
    description TEXT,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    service_name_snapshot TEXT,
    category_name_snapshot TEXT,
    labour_charge_per_sqft NUMERIC DEFAULT 17,
    transport_charge_per_sqft NUMERIC DEFAULT 2,
    total_material_cost NUMERIC DEFAULT 0,
    total_labour_cost NUMERIC DEFAULT 0,
    total_transport_cost NUMERIC DEFAULT 0,
    total_amount NUMERIC DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Ensure snapshot columns exist if table was already created
ALTER TABLE public.quotations 
ADD COLUMN IF NOT EXISTS labour_charge_per_sqft NUMERIC DEFAULT 17,
ADD COLUMN IF NOT EXISTS transport_charge_per_sqft NUMERIC DEFAULT 2,
ADD COLUMN IF NOT EXISTS total_material_cost NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_labour_cost NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_transport_cost NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_amount NUMERIC DEFAULT 0;

-- 8. Quotation Selections Table (Itemized component selections with price snapshots)
CREATE TABLE IF NOT EXISTS public.quotation_selections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    parameter_id UUID REFERENCES public.service_parameters(id) ON DELETE SET NULL,
    product_id UUID REFERENCES public.parameter_products(id) ON DELETE SET NULL,
    parameter_name_snapshot TEXT NOT NULL,
    product_name_snapshot TEXT NOT NULL,
    price_per_sqft NUMERIC DEFAULT 0,
    total_price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_quotation_parameter UNIQUE (quotation_id, parameter_id)
);

ALTER TABLE public.quotation_selections 
ADD COLUMN IF NOT EXISTS price_per_sqft NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_price NUMERIC DEFAULT 0;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_is_active_sort ON public.services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_service_parameters_service_id ON public.service_parameters(service_id);
CREATE INDEX IF NOT EXISTS idx_service_parameters_is_active_sort ON public.service_parameters(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_parameter_products_parameter_id ON public.parameter_products(parameter_id);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON public.quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON public.quotations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotation_selections_quotation_id ON public.quotation_selections(quotation_id);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parameter_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_selections ENABLE ROW LEVEL SECURITY;

-- Helper admin check function
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (is_admin = true OR role = 'admin')
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- RLS Policies
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Public can view active parameters" ON public.service_parameters;
CREATE POLICY "Public can view active parameters" ON public.service_parameters FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage parameters" ON public.service_parameters;
CREATE POLICY "Admins can manage parameters" ON public.service_parameters FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Public can view active products" ON public.parameter_products;
CREATE POLICY "Public can view active products" ON public.parameter_products FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage products" ON public.parameter_products;
CREATE POLICY "Admins can manage products" ON public.parameter_products FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Public can view quotation settings" ON public.quotation_settings;
CREATE POLICY "Public can view quotation settings" ON public.quotation_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage quotation settings" ON public.quotation_settings;
CREATE POLICY "Admins can manage quotation settings" ON public.quotation_settings FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Public can create quotations" ON public.quotations;
CREATE POLICY "Public can create quotations" ON public.quotations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage quotations" ON public.quotations;
CREATE POLICY "Admins can view and manage quotations" ON public.quotations FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Public can insert quotation selections" ON public.quotation_selections;
CREATE POLICY "Public can insert quotation selections" ON public.quotation_selections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage quotation selections" ON public.quotation_selections;
CREATE POLICY "Admins can view and manage quotation selections" ON public.quotation_selections FOR ALL USING (public.is_admin_user());
`;

export const QuotationSqlSetup: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MIGRATION_SQL);
    setCopied(true);
    toast({
      title: 'SQL Copied!',
      description: 'Paste this into your Supabase SQL Editor and click Run.',
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Database className="w-5 h-5 text-primary" />
              Database Migration & Setup Helper
            </CardTitle>
            <CardDescription className="mt-1">
              To apply or synchronize the relational quotation tables, parameter prices (₹/sqft), and fixed charges in your Supabase project, execute the SQL below.
            </CardDescription>
          </div>

          <Button
            onClick={handleCopy}
            className="btn-hero flex items-center gap-2 self-start sm:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard' : 'Copy Complete Migration SQL'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl">
          <Terminal className="w-4 h-4 text-primary shrink-0" />
          <span>
            Open <strong>Supabase Dashboard &gt; SQL Editor</strong>, paste this script, and click <strong>Run</strong>.
          </span>
        </div>

        <pre className="text-xs bg-muted/60 p-4 rounded-2xl overflow-x-auto max-h-80 whitespace-pre-wrap font-mono border border-border/60">
          {MIGRATION_SQL}
        </pre>
      </CardContent>
    </Card>
  );
};
