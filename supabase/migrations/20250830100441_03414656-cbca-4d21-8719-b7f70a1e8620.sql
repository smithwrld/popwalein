-- Create gallery management tables for admin panel

-- Categories table
CREATE TABLE public.gallery_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Subcategories table
CREATE TABLE public.gallery_subcategories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.gallery_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category_id, name)
);

-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.gallery_categories(id) ON DELETE CASCADE,
  subcategory_id UUID REFERENCES public.gallery_subcategories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_categories
CREATE POLICY "Anyone can view categories" 
ON public.gallery_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage categories" 
ON public.gallery_categories 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for gallery_subcategories
CREATE POLICY "Anyone can view subcategories" 
ON public.gallery_subcategories 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage subcategories" 
ON public.gallery_subcategories 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for gallery_images
CREATE POLICY "Anyone can view gallery images" 
ON public.gallery_images 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage gallery images" 
ON public.gallery_images 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
CREATE POLICY "Anyone can view gallery files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Only admins can upload gallery files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can update gallery files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can delete gallery files" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Add updated_at triggers
CREATE TRIGGER update_gallery_categories_updated_at
  BEFORE UPDATE ON public.gallery_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_subcategories_updated_at
  BEFORE UPDATE ON public.gallery_subcategories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default categories
INSERT INTO public.gallery_categories (name, description, display_order) VALUES
('Residential Projects', 'Ceiling installations for homes and residential spaces', 1),
('Commercial Projects', 'Ceiling solutions for offices and commercial buildings', 2),
('Industrial Projects', 'Heavy-duty ceiling installations for industrial facilities', 3),
('Decorative Ceilings', 'Artistic and decorative ceiling designs', 4);

-- Insert some default subcategories
INSERT INTO public.gallery_subcategories (category_id, name, description, display_order) VALUES
((SELECT id FROM public.gallery_categories WHERE name = 'Residential Projects'), 'Living Rooms', 'Ceiling designs for living spaces', 1),
((SELECT id FROM public.gallery_categories WHERE name = 'Residential Projects'), 'Bedrooms', 'Bedroom ceiling installations', 2),
((SELECT id FROM public.gallery_categories WHERE name = 'Residential Projects'), 'Kitchens', 'Kitchen ceiling solutions', 3),
((SELECT id FROM public.gallery_categories WHERE name = 'Commercial Projects'), 'Offices', 'Office ceiling installations', 1),
((SELECT id FROM public.gallery_categories WHERE name = 'Commercial Projects'), 'Retail Stores', 'Retail space ceiling designs', 2),
((SELECT id FROM public.gallery_categories WHERE name = 'Commercial Projects'), 'Restaurants', 'Restaurant ceiling solutions', 3);