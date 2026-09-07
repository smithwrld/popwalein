-- Create terms_conditions table for quotation terms and conditions
CREATE TABLE IF NOT EXISTS public.terms_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bullet_point TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.terms_conditions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public can view terms conditions" ON public.terms_conditions;
CREATE POLICY "Public can view terms conditions" ON public.terms_conditions 
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage terms conditions" ON public.terms_conditions;
CREATE POLICY "Admins can manage terms conditions" ON public.terms_conditions 
    FOR ALL USING (public.is_admin_user());

-- Seed default terms pointwise if the table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.terms_conditions) THEN
    INSERT INTO public.terms_conditions (bullet_point, sort_order) VALUES
    ('Prices are based on current raw material rates and are subject to change after 30 days of quotation.', 10),
    ('Standard site work requires uninterrupted power supply and water access to be provided by the client.', 20),
    ('Scaffolding for height above 10 feet shall be charged extra or arranged by the client.', 30),
    ('50% advance payment is required upon design approval, 40% running payment, and 10% upon completion.', 40),
    ('All materials used will be of premium quality (Gyproc, Saint-Gobain) as selected by the client.', 50),
    ('The company is not liable for structural cracks or issues resulting from architectural or building flaws.', 60);
  END IF;
END $$;
