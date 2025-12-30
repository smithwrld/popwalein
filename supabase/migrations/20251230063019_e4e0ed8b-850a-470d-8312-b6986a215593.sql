-- Create SEO Keywords table linked to projects
CREATE TABLE public.project_seo_keywords (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.gallery_projects(id) ON DELETE CASCADE NOT NULL,
    keyword TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create index for faster lookups
CREATE INDEX idx_project_seo_keywords_project_id ON public.project_seo_keywords(project_id);
CREATE INDEX idx_project_seo_keywords_keyword ON public.project_seo_keywords(keyword);

-- Enable Row Level Security
ALTER TABLE public.project_seo_keywords ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view SEO keywords" ON public.project_seo_keywords
FOR SELECT USING (true);

CREATE POLICY "Admins can insert SEO keywords" ON public.project_seo_keywords
FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update SEO keywords" ON public.project_seo_keywords
FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete SEO keywords" ON public.project_seo_keywords
FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));