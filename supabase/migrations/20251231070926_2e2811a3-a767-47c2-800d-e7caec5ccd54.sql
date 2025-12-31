-- Create Hero Images table
CREATE TABLE public.hero_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create index for ordering
CREATE INDEX idx_hero_images_display_order ON public.hero_images(display_order);
CREATE INDEX idx_hero_images_is_active ON public.hero_images(is_active);

-- Enable Row Level Security
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view active hero images" ON public.hero_images
FOR SELECT USING (true);

CREATE POLICY "Admins can insert hero images" ON public.hero_images
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hero images" ON public.hero_images
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hero images" ON public.hero_images
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_hero_images_updated_at
    BEFORE UPDATE ON public.hero_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();