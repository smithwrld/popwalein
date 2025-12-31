import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, Upload, Image as ImageIcon, Plus, FolderOpen, Star, Hash, X, LogOut, Sliders, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface Category {
  id: string;
  name: string;
  description: string;
  display_order: number;
}

interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
  display_order: number;
}

interface GalleryProject {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  thumbnail_image_id: string | null;
  display_order: number;
  created_at: string;
}

interface GalleryImage {
  id: string;
  project_id: string | null;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

interface SeoKeyword {
  id: string;
  project_id: string;
  keyword: string;
  created_at: string;
}

interface HeroImage {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const AdminPanel = () => {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<SeoKeyword[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [tableExists, setTableExists] = useState(true);
  const [addingKeywords, setAddingKeywords] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [heroFiles, setHeroFiles] = useState<FileList | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category_id: '',
    subcategory_id: ''
  });

  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  
  // SEO Keywords form states
  const [seoSelectedProject, setSeoSelectedProject] = useState<string>('');
  const [keywordsInput, setKeywordsInput] = useState<string>('');

  const fetchData = async () => {
    try {
      const [categoriesRes, subcategoriesRes] = await Promise.all([
        supabase.from('gallery_categories').select('*').order('display_order'),
        supabase.from('gallery_subcategories').select('*').order('display_order'),
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      if (subcategoriesRes.error) throw subcategoriesRes.error;

      setCategories(categoriesRes.data || []);
      setSubcategories(subcategoriesRes.data || []);

      // Try to fetch projects - may not exist yet
      const projectsRes = await supabase
        .from('gallery_projects' as any)
        .select('*')
        .order('display_order');

      if (projectsRes.error) {
        if (projectsRes.error.message.includes('does not exist')) {
          setTableExists(false);
          setProjects([]);
        } else {
          console.error('Projects error:', projectsRes.error);
        }
      } else {
        setTableExists(true);
        setProjects((projectsRes.data || []) as unknown as GalleryProject[]);
      }

      // Fetch images
      const imagesRes = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order');

      if (imagesRes.error) throw imagesRes.error;
      setImages((imagesRes.data || []).map((img: any) => ({
        ...img,
        project_id: img.project_id || null
      })) as GalleryImage[]);

      // Fetch SEO keywords
      const keywordsRes = await supabase
        .from('project_seo_keywords' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (!keywordsRes.error) {
        setSeoKeywords((keywordsRes.data || []) as unknown as SeoKeyword[]);
      }

      // Fetch Hero Images
      const heroRes = await supabase
        .from('hero_images' as any)
        .select('*')
        .order('display_order');

      if (!heroRes.error) {
        setHeroImages((heroRes.data || []) as unknown as HeroImage[]);
      }

    } catch (error: any) {
      console.error('Error in fetchData:', error);
      toast({
        title: "Error",
        description: "Failed to load data: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    } else {
      setLoadingData(false);
    }
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project title",
        variant: "destructive"
      });
      return;
    }

    setCreatingProject(true);
    try {
      const { error } = await supabase
        .from('gallery_projects' as any)
        .insert([{
          title: projectForm.title,
          description: projectForm.description || null,
          category_id: projectForm.category_id || null,
          subcategory_id: projectForm.subcategory_id || null,
          display_order: projects.length + 1
        }] as any);

      if (error) throw error;

      setProjectForm({ title: '', description: '', category_id: '', subcategory_id: '' });
      fetchData();
      toast({
        title: "Success",
        description: "Project created successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setCreatingProject(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleUploadImages = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project first",
        variant: "destructive"
      });
      return;
    }

    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const projectImages = images.filter(img => img.project_id === selectedProject);
      let displayOrder = projectImages.length;
      const project = projects.find(p => p.id === selectedProject);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imageUrl = await handleFileUpload(file);
        
        const { error } = await supabase
          .from('gallery_images')
          .insert([{
            project_id: selectedProject,
            category_id: project?.category_id || categories[0]?.id,
            title: file.name.replace(/\.[^/.]+$/, ''),
            alt_text: file.name.replace(/\.[^/.]+$/, ''),
            image_url: imageUrl,
            display_order: displayOrder + i + 1,
            uploaded_by: user.id
          }] as any);

        if (error) throw error;
      }

      setSelectedFiles(null);
      const fileInput = document.getElementById('images-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchData();
      toast({
        title: "Success",
        description: `${selectedFiles.length} image(s) uploaded successfully`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSetThumbnail = async (projectId: string, imageId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_projects' as any)
        .update({ thumbnail_image_id: imageId } as any)
        .eq('id', projectId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Thumbnail set successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_projects' as any)
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Project and all its images deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getSubcategoryName = (subcategoryId: string | null) => {
    if (!subcategoryId) return '';
    return subcategories.find(s => s.id === subcategoryId)?.name || '';
  };

  const getProjectImages = (projectId: string) => {
    return images.filter(img => img.project_id === projectId);
  };

  const getProjectThumbnail = (project: GalleryProject) => {
    if (project.thumbnail_image_id) {
      const thumbImage = images.find(img => img.id === project.thumbnail_image_id);
      if (thumbImage) return thumbImage.image_url;
    }
    const projectImages = getProjectImages(project.id);
    return projectImages[0]?.image_url || null;
  };

  const getProjectKeywords = (projectId: string) => {
    return seoKeywords.filter(kw => kw.project_id === projectId);
  };

  const handleAddKeywords = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoSelectedProject) {
      toast({
        title: "Error",
        description: "Please select a project first",
        variant: "destructive"
      });
      return;
    }

    if (!keywordsInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one keyword",
        variant: "destructive"
      });
      return;
    }

    setAddingKeywords(true);
    try {
      // Parse keywords - split by newlines, commas, or # and clean up
      const keywords = keywordsInput
        .split(/[\n,]+/)
        .map(kw => kw.trim().replace(/^#/, '').trim())
        .filter(kw => kw.length > 0);

      if (keywords.length === 0) {
        toast({
          title: "Error",
          description: "No valid keywords found",
          variant: "destructive"
        });
        return;
      }

      // Insert keywords in batches
      const keywordRecords = keywords.map(keyword => ({
        project_id: seoSelectedProject,
        keyword: keyword,
        created_by: user?.id
      }));

      const { error } = await supabase
        .from('project_seo_keywords' as any)
        .insert(keywordRecords as any);

      if (error) throw error;

      setKeywordsInput('');
      fetchData();
      toast({
        title: "Success",
        description: `${keywords.length} keyword(s) added successfully`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setAddingKeywords(false);
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    try {
      const { error } = await supabase
        .from('project_seo_keywords' as any)
        .delete()
        .eq('id', keywordId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Keyword deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteAllProjectKeywords = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('project_seo_keywords' as any)
        .delete()
        .eq('project_id', projectId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "All keywords deleted for this project"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Hero Image Management Functions
  const handleUploadHeroImages = async () => {
    if (!heroFiles || heroFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive"
      });
      return;
    }

    setUploadingHero(true);
    try {
      const maxOrder = heroImages.length > 0 
        ? Math.max(...heroImages.map(h => h.display_order)) 
        : 0;

      for (let i = 0; i < heroFiles.length; i++) {
        const file = heroFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `hero-${Date.now()}-${i}.${fileExt}`;
        const filePath = `hero/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        const { error: insertError } = await supabase
          .from('hero_images' as any)
          .insert({
            image_url: publicUrl,
            display_order: maxOrder + i + 1,
            is_active: true
          });

        if (insertError) throw insertError;
      }

      setHeroFiles(null);
      const fileInput = document.getElementById('hero-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchData();
      toast({
        title: "Success",
        description: `${heroFiles.length} hero image(s) uploaded successfully`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploadingHero(false);
    }
  };

  const handleDeleteHeroImage = async (heroId: string, imageUrl: string) => {
    try {
      // Extract path from URL for storage deletion
      const urlParts = imageUrl.split('/gallery/');
      if (urlParts.length > 1) {
        const path = urlParts[1];
        await supabase.storage.from('gallery').remove([path]);
      }

      const { error } = await supabase
        .from('hero_images' as any)
        .delete()
        .eq('id', heroId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Hero image deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleToggleHeroActive = async (heroId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('hero_images' as any)
        .update({ is_active: !isActive })
        .eq('id', heroId);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: `Hero image ${!isActive ? 'activated' : 'deactivated'}`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateHeroOrder = async (heroId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('hero_images' as any)
        .update({ display_order: newOrder })
        .eq('id', heroId);

      if (error) throw error;
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-elegant text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Project-Based Gallery Management</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-muted-foreground truncate">Welcome, {profile?.email}</span>
              <Button variant="outline" size="sm" onClick={signOut} className="self-start sm:self-auto">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        
        {/* Setup Warning */}
        {!tableExists && (
          <Card className="border-destructive bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">Database Setup Required</CardTitle>
              <CardDescription>
                The gallery_projects table doesn't exist yet. Please run the following SQL in your Supabase SQL Editor:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`-- =============================================
-- COMPLETE ADMIN SETUP FOR admin@popwale.com
-- Run ALL of this in Supabase SQL Editor
-- =============================================

-- Step 1: Create app_role enum type
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Step 3: Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 5: Grant admin role to admin@popwale.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'admin@popwale.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Step 6: Create gallery_projects table
CREATE TABLE IF NOT EXISTS public.gallery_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES public.gallery_subcategories(id) ON DELETE SET NULL,
    thumbnail_image_id UUID,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Add project_id column to gallery_images
ALTER TABLE public.gallery_images 
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.gallery_projects(id) ON DELETE CASCADE;

-- Step 8: Enable RLS on gallery_projects
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;

-- Step 9: Drop existing policies
DROP POLICY IF EXISTS "Anyone can view gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admins can insert gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admins can update gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admins can delete gallery projects" ON public.gallery_projects;

-- Step 10: Create RLS policies using has_role function
CREATE POLICY "Anyone can view gallery projects" ON public.gallery_projects 
FOR SELECT TO public USING (true);

CREATE POLICY "Admins can insert gallery projects" ON public.gallery_projects 
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery projects" ON public.gallery_projects 
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery projects" ON public.gallery_projects 
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Step 11: Create indexes
CREATE INDEX IF NOT EXISTS idx_gallery_images_project_id ON public.gallery_images(project_id);
CREATE INDEX IF NOT EXISTS idx_gallery_projects_category_id ON public.gallery_projects(category_id);

-- Step 12: RLS policies for user_roles table
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());`}
              </pre>
              <Button className="mt-4" onClick={() => fetchData()}>
                Refresh After Running SQL
              </Button>
            </CardContent>
          </Card>
        )}

        {tableExists && (
          <>
            {/* Hero Images Section */}
            <Card className="card-elegant border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Hero Section Images
                </CardTitle>
                <CardDescription>Manage hero slider images. Active images will be shown on the homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload New Hero Images */}
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <Label className="text-sm font-medium">Upload New Hero Images</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="hero-file-input"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setHeroFiles(e.target.files)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleUploadHeroImages} 
                      disabled={uploadingHero || !heroFiles}
                      className="whitespace-nowrap"
                    >
                      {uploadingHero ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Add Images
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Select one or more images. Recommended size: 1920x1080px</p>
                </div>

                {/* Existing Hero Images */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Current Hero Images ({heroImages.length})</Label>
                  {heroImages.length === 0 ? (
                    <div className="text-center py-8 border border-dashed rounded-lg">
                      <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No hero images yet. Upload some above.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {heroImages.map((hero, index) => (
                        <div 
                          key={hero.id} 
                          className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                            hero.is_active ? 'border-primary shadow-md' : 'border-muted opacity-60'
                          }`}
                        >
                          <img 
                            src={hero.image_url} 
                            alt={hero.title || `Hero ${index + 1}`}
                            className="w-full h-32 sm:h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Order Badge */}
                          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <GripVertical className="w-3 h-3" />
                            #{hero.display_order}
                          </div>

                          {/* Status Badge */}
                          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                            hero.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            {hero.is_active ? 'Active' : 'Inactive'}
                          </div>

                          {/* Controls */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={hero.is_active}
                                onCheckedChange={() => handleToggleHeroActive(hero.id, hero.is_active)}
                                className="data-[state=checked]:bg-green-500"
                              />
                              <span className="text-xs text-white">Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                value={hero.display_order}
                                onChange={(e) => handleUpdateHeroOrder(hero.id, parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-xs bg-white/90 text-black"
                                placeholder="Order"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteHeroImage(hero.id, hero.image_url)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Create Project Section */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create New Project
                </CardTitle>
                <CardDescription>Create a project first, then add images to it</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-title">Project Title *</Label>
                      <Input
                        id="project-title"
                        placeholder="e.g., Modern Living Room Ceiling"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-category">Category</Label>
                      <Select 
                        value={projectForm.category_id} 
                        onValueChange={(value) => setProjectForm({...projectForm, category_id: value, subcategory_id: ''})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        placeholder="Describe this project..."
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    {projectForm.category_id && subcategories.filter(s => s.category_id === projectForm.category_id).length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="project-subcategory">Subcategory</Label>
                        <Select 
                          value={projectForm.subcategory_id} 
                          onValueChange={(value) => setProjectForm({...projectForm, subcategory_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategories
                              .filter(sub => sub.category_id === projectForm.category_id)
                              .map((subcategory) => (
                                <SelectItem key={subcategory.id} value={subcategory.id}>
                                  {subcategory.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={creatingProject}>
                    {creatingProject ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Upload Images to Project */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Images to Project
                </CardTitle>
                <CardDescription>Select a project and upload multiple images at once</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadImages} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="select-project">Select Project *</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a project to add images" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title} ({getProjectImages(project.id).length} images)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="images-file">Choose Images *</Label>
                    <div className="relative">
                      <label 
                        htmlFor="images-file" 
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 hover:border-primary/50 transition-all duration-200"
                      >
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> multiple images
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB each</p>
                        </div>
                        <input 
                          id="images-file" 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={(e) => setSelectedFiles(e.target.files)}
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {selectedFiles && selectedFiles.length > 0 && (
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-foreground">
                          {selectedFiles.length} file(s) selected
                        </p>
                        <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                          {Array.from(selectedFiles).map((file, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground truncate">
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={uploading || !selectedProject}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Images
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* SEO Keywords Section */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  SEO Keywords / Hashtags
                </CardTitle>
                <CardDescription>Add keywords/hashtags to projects for better SEO. Paste thousands at once!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddKeywords} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seo-select-project">Select Project *</Label>
                      <Select value={seoSelectedProject} onValueChange={setSeoSelectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.title} ({getProjectKeywords(project.id).length} keywords)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords-input">Keywords / Hashtags *</Label>
                      <Textarea
                        id="keywords-input"
                        placeholder="Paste keywords here - one per line, comma-separated, or with # prefix&#10;&#10;Examples:&#10;#falseceiling&#10;gypsumwork, popdesign&#10;stretch ceiling&#10;modern interiors"
                        value={keywordsInput}
                        onChange={(e) => setKeywordsInput(e.target.value)}
                        rows={6}
                        className="font-mono text-sm resize-y min-h-[120px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Supports newlines, commas, or # prefixes. All formats will be parsed automatically.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" disabled={addingKeywords || !seoSelectedProject}>
                    {addingKeywords ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding Keywords...
                      </>
                    ) : (
                      <>
                        <Hash className="mr-2 h-4 w-4" />
                        Add Keywords
                      </>
                    )}
                  </Button>
                </form>

                {/* Keywords Preview for Selected Project */}
                {seoSelectedProject && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <h4 className="text-sm font-medium text-foreground">
                        Keywords for: {projects.find(p => p.id === seoSelectedProject)?.title}
                      </h4>
                      {getProjectKeywords(seoSelectedProject).length > 0 && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteAllProjectKeywords(seoSelectedProject)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete All ({getProjectKeywords(seoSelectedProject).length})
                        </Button>
                      )}
                    </div>
                    
                    {getProjectKeywords(seoSelectedProject).length === 0 ? (
                      <p className="text-sm text-muted-foreground">No keywords added yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-2 bg-muted/30 rounded-lg">
                        {getProjectKeywords(seoSelectedProject).map((kw) => (
                          <span 
                            key={kw.id} 
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full group hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
                          >
                            #{kw.keyword}
                            <button
                              type="button"
                              onClick={() => handleDeleteKeyword(kw.id)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Projects List */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Projects ({projects.length})</h2>
              </div>

              {projects.length === 0 ? (
                <Card className="card-elegant">
                  <CardContent className="py-12 text-center">
                    <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No projects yet. Create your first project above.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {projects.map((project) => {
                    const projectImages = getProjectImages(project.id);
                    const thumbnail = getProjectThumbnail(project);

                    return (
                      <Card key={project.id} className="card-elegant overflow-hidden">
                        <CardHeader className="pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex items-start gap-4">
                              {thumbnail ? (
                                <img 
                                  src={thumbnail} 
                                  alt={project.title}
                                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                <CardDescription>
                                  {getCategoryName(project.category_id)}
                                  {project.subcategory_id && ` • ${getSubcategoryName(project.subcategory_id)}`}
                                  {' • '}{projectImages.length} images
                                </CardDescription>
                                {project.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete Project
                            </Button>
                          </div>
                        </CardHeader>
                        
                        {projectImages.length > 0 && (
                          <CardContent className="pt-0">
                            <p className="text-sm font-medium text-foreground mb-3">Project Images:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                              {projectImages.map((image) => (
                                <div 
                                  key={image.id} 
                                  className={`relative group rounded-lg overflow-hidden border-2 ${
                                    project.thumbnail_image_id === image.id 
                                      ? 'border-primary' 
                                      : 'border-transparent'
                                  }`}
                                >
                                  <img
                                    src={image.image_url}
                                    alt={image.alt_text}
                                    className="w-full aspect-square object-cover"
                                  />
                                  {project.thumbnail_image_id === image.id && (
                                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-current" />
                                      Thumb
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="h-7 text-xs"
                                      onClick={() => handleSetThumbnail(project.id, image.id)}
                                    >
                                      <Star className="w-3 h-3 mr-1" />
                                      Set Thumb
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="h-7 text-xs px-2"
                                      onClick={() => handleDeleteImage(image.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
