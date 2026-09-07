-- ============================================================================
-- REMOVE CATEGORY LAYER FROM QUOTATION BUILDER
-- POPWALE.IN - Relational Schema Simplification (Direct Service-to-Parameter)
-- ============================================================================

-- 1. Drop trigger and update triggers associated with service_categories
DROP TRIGGER IF EXISTS trg_service_categories_updated_at ON public.service_categories;

-- 2. Drop RLS Policies for service_categories
DROP POLICY IF EXISTS "Public can view active categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.service_categories;

-- 3. Remove category references from service_parameters
ALTER TABLE public.service_parameters DROP CONSTRAINT IF EXISTS service_parameters_category_id_fkey;
ALTER TABLE public.service_parameters DROP COLUMN IF EXISTS category_id;

-- 4. Remove category references from quotations
ALTER TABLE public.quotations DROP CONSTRAINT IF EXISTS quotations_service_category_id_fkey;
ALTER TABLE public.quotations DROP COLUMN IF EXISTS service_category_id;
ALTER TABLE public.quotations DROP COLUMN IF EXISTS category_name_snapshot;

-- 5. Drop service_categories table
DROP TABLE IF EXISTS public.service_categories CASCADE;

-- 6. Clean up indexes
DROP INDEX IF EXISTS public.idx_service_categories_service_id;
DROP INDEX IF EXISTS public.idx_service_categories_is_active_sort;
DROP INDEX IF EXISTS public.idx_service_parameters_category_id;
