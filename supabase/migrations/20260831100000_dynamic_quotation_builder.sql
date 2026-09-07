-- ============================================================================
-- DYNAMIC QUOTATION BUILDER SCHEMA & SEED DATA
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

-- 4. Service Parameters Table
CREATE TABLE IF NOT EXISTS public.service_parameters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT,
    description TEXT,
    is_required BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 5. Parameter Products Table
CREATE TABLE IF NOT EXISTS public.parameter_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parameter_id UUID NOT NULL REFERENCES public.service_parameters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Quotations Table (Customer submissions)
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
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 7. Quotation Selections Table (Exactly 1 product per parameter snapshot)
CREATE TABLE IF NOT EXISTS public.quotation_selections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    parameter_id UUID REFERENCES public.service_parameters(id) ON DELETE SET NULL,
    product_id UUID REFERENCES public.parameter_products(id) ON DELETE SET NULL,
    parameter_name_snapshot TEXT NOT NULL,
    product_name_snapshot TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_quotation_parameter UNIQUE (quotation_id, parameter_id)
);

-- ============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_services_is_active_sort ON public.services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_service_categories_service_id ON public.service_categories(service_id);
CREATE INDEX IF NOT EXISTS idx_service_categories_is_active_sort ON public.service_categories(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_service_parameters_service_id ON public.service_parameters(service_id);
CREATE INDEX IF NOT EXISTS idx_service_parameters_category_id ON public.service_parameters(category_id);
CREATE INDEX IF NOT EXISTS idx_service_parameters_is_active_sort ON public.service_parameters(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_parameter_products_parameter_id ON public.parameter_products(parameter_id);
CREATE INDEX IF NOT EXISTS idx_parameter_products_is_active_sort ON public.parameter_products(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON public.quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON public.quotations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotation_selections_quotation_id ON public.quotation_selections(quotation_id);

-- ============================================================================
-- AUTO-UPDATE TIMESTAMPS TRIGGERS
-- ============================================================================
DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_service_categories_updated_at ON public.service_categories;
CREATE TRIGGER trg_service_categories_updated_at BEFORE UPDATE ON public.service_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_service_parameters_updated_at ON public.service_parameters;
CREATE TRIGGER trg_service_parameters_updated_at BEFORE UPDATE ON public.service_parameters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_parameter_products_updated_at ON public.parameter_products;
CREATE TRIGGER trg_parameter_products_updated_at BEFORE UPDATE ON public.parameter_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_quotations_updated_at ON public.quotations;
CREATE TRIGGER trg_quotations_updated_at BEFORE UPDATE ON public.quotations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parameter_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_selections ENABLE ROW LEVEL SECURITY;

-- Helper admin check function fallback if needed
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

-- Services Policies
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.is_admin_user());

-- Service Categories Policies
DROP POLICY IF EXISTS "Public can view active categories" ON public.service_categories;
CREATE POLICY "Public can view active categories" ON public.service_categories FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage categories" ON public.service_categories;
CREATE POLICY "Admins can manage categories" ON public.service_categories FOR ALL USING (public.is_admin_user());

-- Service Parameters Policies
DROP POLICY IF EXISTS "Public can view active parameters" ON public.service_parameters;
CREATE POLICY "Public can view active parameters" ON public.service_parameters FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage parameters" ON public.service_parameters;
CREATE POLICY "Admins can manage parameters" ON public.service_parameters FOR ALL USING (public.is_admin_user());

-- Parameter Products Policies
DROP POLICY IF EXISTS "Public can view active products" ON public.parameter_products;
CREATE POLICY "Public can view active products" ON public.parameter_products FOR SELECT USING (is_active = true OR public.is_admin_user());

DROP POLICY IF EXISTS "Admins can manage products" ON public.parameter_products;
CREATE POLICY "Admins can manage products" ON public.parameter_products FOR ALL USING (public.is_admin_user());

-- Quotations Policies
DROP POLICY IF EXISTS "Public can create quotations" ON public.quotations;
CREATE POLICY "Public can create quotations" ON public.quotations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage quotations" ON public.quotations;
CREATE POLICY "Admins can view and manage quotations" ON public.quotations FOR ALL USING (public.is_admin_user());

-- Quotation Selections Policies
DROP POLICY IF EXISTS "Public can insert quotation selections" ON public.quotation_selections;
CREATE POLICY "Public can insert quotation selections" ON public.quotation_selections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage quotation selections" ON public.quotation_selections;
CREATE POLICY "Admins can view and manage quotation selections" ON public.quotation_selections FOR ALL USING (public.is_admin_user());

-- ============================================================================
-- COMPREHENSIVE INITIAL SEED DATA
-- ============================================================================

DO $$
DECLARE
    srv_gypsum_id UUID;
    srv_grid_id UUID;
    srv_pvc_id UUID;
    srv_stretch_id UUID;
    srv_punning_id UUID;
    
    cat_gyp_std_id UUID;
    cat_gyp_dsg_id UUID;
    cat_gyp_acoust_id UUID;
    
    cat_grid_std_id UUID;
    cat_grid_met_id UUID;
    
    cat_pvc_plain_id UUID;
    cat_pvc_wood_id UUID;

    cat_str_gloss_id UUID;
    cat_str_print_id UUID;

    cat_pun_level_id UUID;
    cat_pun_paint_id UUID;

    param_gyp_channel_id UUID;
    param_gyp_sheet_id UUID;
    param_gyp_screws_id UUID;
    param_gyp_joint_id UUID;
    param_gyp_edge_id UUID;

    param_grid_tile_id UUID;
    param_grid_tee_id UUID;
    param_grid_hanger_id UUID;

    param_pvc_panel_id UUID;
    param_pvc_frame_id UUID;
    param_pvc_trim_id UUID;

    param_str_foil_id UUID;
    param_str_profile_id UUID;
    param_str_light_id UUID;

    param_pun_compound_id UUID;
    param_pun_mesh_id UUID;
BEGIN
    -- Only seed if services table is currently empty
    IF NOT EXISTS (SELECT 1 FROM public.services LIMIT 1) THEN

        -- 1. GYPSUM CEILING
        INSERT INTO public.services (name, slug, title, description, image, is_active, sort_order)
        VALUES ('Gypsum Ceiling', 'gypsum-ceiling', 'Premium Gypsum False Ceiling', 'Seamless, durable, fire-resistant and modern false ceiling designs with flush finish.', '/assets/hero-gypsum-ceiling.jpg', true, 1)
        RETURNING id INTO srv_gypsum_id;

        -- 2. GRID CEILING
        INSERT INTO public.services (name, slug, title, description, image, is_active, sort_order)
        VALUES ('Grid Ceiling', 'grid-ceiling', 'Commercial Modular Grid Ceiling', 'Easy-to-access 2x2 acoustic modular ceiling panels for offices and retail spaces.', '/assets/hero-grid-ceiling.jpg', true, 2)
        RETURNING id INTO srv_grid_id;

        -- 3. PVC CEILING
        INSERT INTO public.services (name, slug, title, description, image, is_active, sort_order)
        VALUES ('PVC Ceiling', 'pvc-ceiling', 'Waterproof & Moisture-Proof PVC Ceiling', 'Lightweight, low maintenance, termite-proof and 100% waterproof ceiling panels.', '/assets/hero-soffit-channel.jpg', true, 3)
        RETURNING id INTO srv_pvc_id;

        -- 4. STRETCH CEILING
        INSERT INTO public.services (name, slug, title, description, image, is_active, sort_order)
        VALUES ('Stretch Ceiling', 'stretch-ceiling', 'Luxurious Translucent Stretch Ceiling', 'Ultra-modern backlit, printed, and high-gloss polymer stretch ceilings.', '/assets/hero-stretch-ceiling.jpg', true, 4)
        RETURNING id INTO srv_stretch_id;

        -- 5. PUNNING WORK
        INSERT INTO public.services (name, slug, title, description, image, is_active, sort_order)
        VALUES ('Punning Work', 'punning-work', 'Ultra-Smooth Wall & Ceiling Punning', 'Mirror-finish surface leveling using high-grade Gyproc punning compound.', '/assets/service-walls.jpg', true, 5)
        RETURNING id INTO srv_punning_id;

        -- -------------------------------------------------------------
        -- GYPSUM CEILING CATEGORIES
        -- -------------------------------------------------------------
        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_gypsum_id, 'Standard Plain Ceiling', 'standard-plain', 'Classic Flat Ceiling with Peripheral Cove', 'Clean minimal flat ceiling design with ambient warm perimeter LED coving.', '/assets/hero-gypsum-ceiling.jpg', true, 1)
        RETURNING id INTO cat_gyp_std_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_gypsum_id, 'Designer Multi-Level Ceiling', 'designer-multi-level', 'Geometric & Multi-Tier Layered Ceiling', 'Architectural stepped drops, geometric cutouts, and customized recessed profiles.', '/assets/service-ceiling.jpg', true, 2)
        RETURNING id INTO cat_gyp_dsg_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_gypsum_id, 'Acoustic / Soundproof Ceiling', 'acoustic-soundproof', 'Acoustic Sound Absorption Ceiling', 'Engineered perforated gypsum boards with high sound absorption (NRC rating).', '/assets/service-decorative.jpg', true, 3)
        RETURNING id INTO cat_gyp_acoust_id;

        -- -------------------------------------------------------------
        -- GRID CEILING CATEGORIES
        -- -------------------------------------------------------------
        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_grid_id, 'Mineral Fiber Tile Grid', 'mineral-fiber-grid', 'Standard Mineral Fiber Acoustic Tiles', 'High thermal insulation and noise reduction acoustic tiles.', '/assets/hero-grid-ceiling.jpg', true, 1)
        RETURNING id INTO cat_grid_std_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_grid_id, 'Metal Clip-In Grid', 'metal-clip-in-grid', 'Aluminum & GI Metal Tile Grid', 'Long-lasting, washable, heavy-duty perforated metal panels.', '/assets/hero-grid-ceiling.jpg', true, 2)
        RETURNING id INTO cat_grid_met_id;

        -- -------------------------------------------------------------
        -- PVC CEILING CATEGORIES
        -- -------------------------------------------------------------
        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_pvc_id, 'Solid Plain Finish PVC', 'solid-plain-pvc', 'Minimalist High-Gloss White Panels', 'Smooth, high-reflectance finish ideal for kitchens, balconies, and bathrooms.', '/assets/hero-soffit-channel.jpg', true, 1)
        RETURNING id INTO cat_pvc_plain_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_pvc_id, 'Wooden Texture PVC', 'wooden-texture-pvc', 'Natural Wood Grain Panels', 'Warm timber look with all weather durability and zero polish maintenance.', '/assets/hero-soffit-channel.jpg', true, 2)
        RETURNING id INTO cat_pvc_wood_id;

        -- -------------------------------------------------------------
        -- STRETCH CEILING CATEGORIES
        -- -------------------------------------------------------------
        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_stretch_id, 'Translucent Backlit Membrane', 'translucent-backlit', 'Diffused Ambient Light Ceiling', 'Uniform glow light box effect with dimmable LED backlighting.', '/assets/hero-stretch-ceiling.jpg', true, 1)
        RETURNING id INTO cat_str_gloss_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_stretch_id, 'High-Gloss Mirror Stretch', 'high-gloss-mirror', 'Reflective Gloss Finish', 'Spacious visual height effect with crystal clear reflection.', '/assets/hero-stretch-ceiling.jpg', true, 2)
        RETURNING id INTO cat_str_print_id;

        -- -------------------------------------------------------------
        -- PUNNING CATEGORIES
        -- -------------------------------------------------------------
        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_punning_id, 'Gypsum Wall Punning', 'gypsum-wall-punning', 'Direct Over Brickwork / Plaster', 'Smooth 6mm-12mm Gyproc leveling layer eliminating uneven sand plaster.', '/assets/service-walls.jpg', true, 1)
        RETURNING id INTO cat_pun_level_id;

        INSERT INTO public.service_categories (service_id, name, slug, title, description, image, is_active, sort_order)
        VALUES (srv_punning_id, 'Ceiling Punning & Leveling', 'ceiling-punning-leveling', 'Soffit RCC Slab Leveling', 'Zero-crack flawless ceiling surface ready for primer and luxury emulsion.', '/assets/service-walls.jpg', true, 2)
        RETURNING id INTO cat_pun_paint_id;

        -- =============================================================
        -- PARAMETERS & PRODUCTS FOR GYPSUM (Standard Category)
        -- =============================================================
        -- 1. Channel
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_std_id, 'Channel', 'channel', 'Ceiling Framing Channel', 'Select the galvanized steel framing section for load support and rust resistance.', true, true, 1)
        RETURNING id INTO param_gyp_channel_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_channel_id, 'Saint-Gobain Gyproc Ultra Channel', 'gyproc-ultra-channel', 'Gyproc Ultra GI Channel (0.50mm, 150 GSM)', 'Engineered with ribbed knurling for maximum screw grip and zero sag.', true, 1),
        (param_gyp_channel_id, 'USG Boral Steel Section', 'usg-boral-steel', 'USG Boral Heavy-Duty Framing (0.55mm)', 'Premium galvanized steel with exceptional tensile rigidity and load rating.', true, 2),
        (param_gyp_channel_id, 'Standard Heavy 0.45mm GI Section', 'standard-045-gi', 'Commercial Grade 0.45mm Section', 'Standard 120 GSM zinc coated channel with anti-corrosion coating.', true, 3),
        (param_gyp_channel_id, 'Economy 0.40mm Channel', 'economy-040-channel', 'Value Economy Framing (0.40mm)', 'Budget-friendly galvanized channel for compact residential rooms.', true, 4);

        -- 2. Sheet
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_std_id, 'Sheet', 'sheet', 'Gypsum Board Type', 'Choose the gypsum ceiling board specification and performance grade.', true, true, 2)
        RETURNING id INTO param_gyp_sheet_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_sheet_id, 'Saint-Gobain Gyproc Regular 12.5mm', 'gyproc-regular-125', 'Gyproc Regular 12.5mm Board', 'Industry benchmark standard gypsum board with tapered edges for seamless jointing.', true, 1),
        (param_gyp_sheet_id, 'Gyproc Moisture Resistant (MR) 12.5mm', 'gyproc-mr-125', 'Gyproc MR Green Board 12.5mm', 'Silicone-treated water-repellent core ideal for kitchens, bathrooms, and humid climates.', true, 2),
        (param_gyp_sheet_id, 'USG Boral Sheetrock 12.5mm', 'usg-sheetrock-125', 'USG Boral Sheetrock Brand Board', 'High strength-to-weight ratio with superior sag resistance.', true, 3),
        (param_gyp_sheet_id, 'Gyproc FireLine 12.5mm (Fire Rated)', 'gyproc-fireline-125', 'Gyproc FireLine Pink Board', 'Glass fiber reinforced core providing up to 2-hour fire resistance.', true, 4);

        -- 3. Screws & Fasteners
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_std_id, 'Fasteners', 'fasteners', 'Screws & Anchor Fasteners', 'Fasteners securing the ceiling framing directly into the RCC slab.', true, true, 3)
        RETURNING id INTO param_gyp_screws_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_screws_id, 'Corrosion-Resistant Drywall Screws & Metal Anchor', 'zinc-screws-metal-anchor', 'Gyproc High-Tensile Black Drywall Screws + Metal Soffit Cleat', 'Full metal expansion anchors with 25mm bugle head screws.', true, 1),
        (param_gyp_screws_id, 'Standard Drywall Screws & Rawl Plugs', 'standard-screws-rawl', 'Standard Carbon Steel Screws + Heavy PVC Anchors', 'Standard zinc-phosphated screws with durable rawl fasteners.', true, 2);

        -- 4. Joint Compound & Tape
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_std_id, 'Joint Compound', 'joint-compound', 'Joint Finishing System', 'Compounds and reinforced tapes for completely invisible joints.', true, true, 4)
        RETURNING id INTO param_gyp_joint_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_joint_id, 'Gyproc ProTop & Paper Tape System', 'gyproc-protop-system', 'Gyproc ProTop Ready-Mix Compound + Joint Paper Tape', 'High crack-resistance, easy sanding, flawless mirror-smooth joint finish.', true, 1),
        (param_gyp_joint_id, 'Gyproc Jointing Powder & Fiber Mesh Tape', 'gyproc-powder-mesh', 'Gyproc Jointing Powder + Self-Adhesive Glass Fiber Mesh', 'Quick setting air-drying compound with flexible reinforcement.', true, 2);

        -- 5. Edge / Perimeter Trim
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_std_id, 'Edge Trim', 'edge-trim', 'Perimeter Wall Angle & Beads', 'Finishing perimeter edge between wall and ceiling.', true, true, 5)
        RETURNING id INTO param_gyp_edge_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_edge_id, 'Shadow Line Reveal Bead (Architectural Groove)', 'shadow-line-bead', 'Minimalist 10mm Shadow Reveal Profile', 'Creates a modern floating ceiling illusion with sharp straight edge lines.', true, 1),
        (param_gyp_edge_id, 'Standard GI Wall Angle (Flush Cove)', 'standard-gi-wall-angle', 'Heavy Duty 25x25mm GI Wall Angle', 'Classic solid flush connection to perimeter masonry walls.', true, 2);

        -- Also link parameters to Designer Gypsum Category
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_dsg_id, 'Framing & Channel', 'framing-channel', 'Framework Grade', 'Precision framework for stepped tiers.', true, true, 1)
        RETURNING id INTO param_gyp_channel_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_channel_id, 'Gyproc Ultra Heavy Duty Precision Framework', 'gyproc-ultra-precision', 'Gyproc 0.50mm Precision Ribbed Frame', 'Zero deflection for complex step-downs and floating island bulkheads.', true, 1),
        (param_gyp_channel_id, 'Custom Curved Flexi-Track Profile', 'custom-curved-track', 'Special Flexible Track for Organic Curves', 'Allows smooth radii and circular ceiling drops.', true, 2);

        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_gypsum_id, cat_gyp_dsg_id, 'Board Material', 'board-material', 'Board Material', 'Multi-layer gypsum substrate.', true, true, 2)
        RETURNING id INTO param_gyp_sheet_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_gyp_sheet_id, 'Gyproc Regular 12.5mm + Edge Protectors', 'gyproc-regular-edges', 'Gyproc 12.5mm with Metal Corner Beads', 'Crisp 90-degree outer corners for sharp stepped tiers.', true, 1),
        (param_gyp_sheet_id, 'Gyproc Flex Board 6mm (for Curves)', 'gyproc-flex-6mm', 'Gyproc Flexible 6mm Radius Board', 'Designed specifically for circular and serpentine ceiling curves.', true, 2);

        -- =============================================================
        -- GRID CEILING PARAMETERS
        -- =============================================================
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_grid_id, cat_grid_std_id, 'Ceiling Tile', 'ceiling-tile', 'Acoustic Tile Type (2x2 ft)', 'Choose tile finish and sound absorption rating.', true, true, 1)
        RETURNING id INTO param_grid_tile_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_grid_tile_id, 'Armstrong Dune Tegular Tile (2x2 ft)', 'armstrong-dune', 'Armstrong Dune Fine Fissured Tile (15mm)', 'Premium humidity resistance with NRC 0.55 sound rating.', true, 1),
        (param_grid_tile_id, 'Saint-Gobain Gyproc Gyptone Acoustic Tile', 'gyproc-gyptone', 'Gyptone ActivAir Perforated Tile', 'Indoor air purifying technology with perforated modern pattern.', true, 2),
        (param_grid_tile_id, 'Standard Vinyl Laminated Gypsum Tile', 'vinyl-laminated-tile', 'PVC Cleanable Vinyl Laminated Tile (9mm)', 'Wipeable surface ideal for clinics, kitchens, and retail.', true, 3);

        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_grid_id, cat_grid_std_id, 'Grid Runner System', 'grid-runner', 'T-Grid Suspension System', 'Main and cross tee structural suspension frame.', true, true, 2)
        RETURNING id INTO param_grid_tee_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_grid_tee_id, 'Armstrong Silhouette 15mm Micro-Look Grid', 'armstrong-silhouette', 'Armstrong 15mm Black/White Reveal Grid', 'Ultra-sleek modern grid with recessed reveal detail.', true, 1),
        (param_grid_tee_id, 'Gyproc Regular 24mm Exposed T-Grid', 'gyproc-24mm-tgrid', 'Gyproc 24mm White Galvanized T-Grid', 'Robust, heavy load-carrying commercial grade exposed grid.', true, 2);

        -- =============================================================
        -- PVC CEILING PARAMETERS
        -- =============================================================
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_pvc_id, cat_pvc_wood_id, 'Panel Grade', 'panel-grade', 'PVC Panel Thickness & Finish', 'Select panel wall thickness and wood-grain pattern.', true, true, 1)
        RETURNING id INTO param_pvc_panel_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_pvc_panel_id, 'Teak Wood Heavy 8mm PVC Panel', 'teak-wood-8mm', 'Deep Natural Teak Wood Grain (8mm)', 'Heavy gauge PVC with UV protection and interlocking tongue-and-groove.', true, 1),
        (param_pvc_panel_id, 'Walnut Dark Finish 8mm PVC Panel', 'walnut-dark-8mm', 'Contemporary Dark Walnut Grain (8mm)', 'Sophisticated rich tone panel with anti-fading polymer film.', true, 2),
        (param_pvc_panel_id, 'Pine Wood Light 7mm PVC Panel', 'pine-light-7mm', 'Scandinavian Pine Light Texture (7mm)', 'Bright airy wood grain pattern for modern residential aesthetics.', true, 3);

        -- =============================================================
        -- STRETCH CEILING PARAMETERS
        -- =============================================================
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_stretch_id, cat_str_gloss_id, 'Membrane Spec', 'membrane-spec', 'Polymer Stretch Membrane', 'Ultra-durable European polymer stretch membrane.', true, true, 1)
        RETURNING id INTO param_str_foil_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_str_foil_id, '75% Light Diffusing Translucent Membrane (White)', 'translucent-75-white', 'Premium Translucent Membrane (0.18mm)', 'Provides soft diffused lighting without hot spots.', true, 1),
        (param_str_foil_id, 'Acoustic Micro-Perforated Translucent Membrane', 'acoustic-translucent', 'Sound Absorbing Micro-Perforated Membrane', 'Combines illuminated ceiling aesthetics with superior acoustic absorption.', true, 2);

        -- =============================================================
        -- PUNNING PARAMETERS
        -- =============================================================
        INSERT INTO public.service_parameters (service_id, category_id, name, slug, title, description, is_required, is_active, sort_order)
        VALUES (srv_punning_id, cat_pun_level_id, 'Punning Compound', 'punning-compound', 'Punning Material Grade', 'High-purity hemihydrate gypsum formulation.', true, true, 1)
        RETURNING id INTO param_pun_compound_id;

        INSERT INTO public.parameter_products (parameter_id, name, slug, title, description, is_active, sort_order) VALUES
        (param_pun_compound_id, 'Saint-Gobain Gyproc Elite Punning Gypsum', 'gyproc-elite-punning', 'Gyproc Elite Super-White Punning (25kg)', 'Guaranteed zero cracking, smooth mirror gloss, paint saving formula.', true, 1),
        (param_pun_compound_id, 'Birla White Wall Seal Punning Compound', 'birla-white-punning', 'Birla White Super Finish Punning', 'Polymer modified white cement based leveling compound.', true, 2);

    END IF;
END $$;
