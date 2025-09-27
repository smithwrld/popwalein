import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut } from 'lucide-react';

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

interface GalleryImage {
  id: string;
  category_id: string;
  subcategory_id: string | null;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_featured: boolean;
}

const AdminPanel = () => {
  const { user, profile, loading, signOut } = useAuth();
  const { toast } = useToast();
  
  // All hooks must be called before any conditional returns
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [imageForm, setImageForm] = useState({
    title: '',
    alt_text: '',
    category_id: '',
    subcategory_id: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchData = async () => {
    console.log('AdminPanel: Starting fetchData...');
    try {
      const [categoriesRes, subcategoriesRes, imagesRes] = await Promise.all([
        supabase.from('gallery_categories').select('*').order('display_order'),
        supabase.from('gallery_subcategories').select('*').order('display_order'),
        supabase.from('gallery_images').select('*').order('display_order')
      ]);

      console.log('AdminPanel: Database responses:', {
        categories: categoriesRes,
        subcategories: subcategoriesRes,
        images: imagesRes
      });

      if (categoriesRes.error) throw categoriesRes.error;
      if (subcategoriesRes.error) throw subcategoriesRes.error;
      if (imagesRes.error) throw imagesRes.error;

      console.log('AdminPanel: Setting data...', {
        categoriesCount: categoriesRes.data?.length,
        subcategoriesCount: subcategoriesRes.data?.length,
        imagesCount: imagesRes.data?.length
      });

      setCategories(categoriesRes.data || []);
      setSubcategories(subcategoriesRes.data || []);
      setImages(imagesRes.data || []);
    } catch (error: any) {
      console.error('AdminPanel: Error in fetchData:', error);
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
    console.log('AdminPanel: useEffect called with:', { 
      user: !!user, 
      userId: user?.id, 
      profile: !!profile, 
      isAdmin: profile?.is_admin,
      loading 
    });
    
    if (user && profile?.is_admin) {
      console.log('AdminPanel: Conditions met, calling fetchData...');
      fetchData();
    } else {
      console.log('AdminPanel: Conditions not met - not calling fetchData');
      setLoadingData(false);
    }
  }, [user, profile]);

  // Check if user is admin AFTER all hooks are called
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile?.is_admin) {
    return <Navigate to="/auth" replace />;
  }

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

  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await handleFileUpload(selectedFile);
      
      const { error } = await supabase
        .from('gallery_images')
        .insert([{
          title: imageForm.title,
          alt_text: imageForm.alt_text,
          category_id: imageForm.category_id,
          subcategory_id: imageForm.subcategory_id || null,
          image_url: imageUrl,
          display_order: images.length + 1,
          uploaded_by: user.id
        }]);

      if (error) throw error;

      setImageForm({
        title: '',
        alt_text: '',
        category_id: '',
        subcategory_id: ''
      });
      setSelectedFile(null);
      fetchData();
      toast({
        title: "Success",
        description: "Image uploaded successfully"
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

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getSubcategoryName = (subcategoryId: string) => {
    return subcategories.find(s => s.id === subcategoryId)?.name || 'None';
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
              <p className="text-sm text-muted-foreground">Gallery Management System</p>
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

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Gallery Images</h2>
        </div>

        <div className="space-y-6">

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Add Gallery Image</CardTitle>
              <CardDescription>Upload images with proper categorization for the gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateImage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-title">Title *</Label>
                    <Input
                      id="image-title"
                      placeholder="Enter image title"
                      value={imageForm.title}
                      onChange={(e) => setImageForm({...imageForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-alt">Alt Text *</Label>
                    <Input
                      id="image-alt"
                      placeholder="Describe the image for accessibility"
                      value={imageForm.alt_text}
                      onChange={(e) => setImageForm({...imageForm, alt_text: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-category">Category *</Label>
                    <Select value={imageForm.category_id} onValueChange={(value) => setImageForm({...imageForm, category_id: value, subcategory_id: ''})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                  <div className="space-y-2">
                    <Label htmlFor="image-subcategory">Subcategory</Label>
                    <Select value={imageForm.subcategory_id} onValueChange={(value) => setImageForm({...imageForm, subcategory_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories
                          .filter(sub => sub.category_id === imageForm.category_id)
                          .map((subcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-file">Choose Image *</Label>
                  <div className="relative">
                    <div className="flex items-center justify-center w-full">
                      <label 
                        htmlFor="image-file" 
                        className="flex flex-col items-center justify-center w-full h-40 sm:h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 touch-manipulation"
                      >
                        <div className="flex flex-col items-center justify-center px-4 py-6 sm:py-5">
                          <Upload className="w-10 h-10 sm:w-8 sm:h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm sm:text-sm text-muted-foreground text-center">
                            <span className="font-semibold">Tap to upload</span>
                            <span className="hidden sm:inline"> or drag and drop</span>
                          </p>
                          <p className="text-xs text-muted-foreground text-center px-2">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input 
                          id="image-file" 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          required
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="p-3 sm:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            <span className="hidden sm:inline"> • {selectedFile.type}</span>
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          className="flex-shrink-0 text-muted-foreground hover:text-foreground min-w-8 min-h-8"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading Image...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Add to Gallery
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Gallery Images ({images.length})</CardTitle>
              <CardDescription>All images currently in the gallery</CardDescription>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No images in gallery yet. Add your first image above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="border rounded-lg p-3 sm:p-4 space-y-3 hover:shadow-md transition-shadow bg-card">
                      <div className="aspect-video w-full overflow-hidden rounded-md">
                        <img
                          src={image.image_url}
                          alt={image.alt_text}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm truncate" title={image.title}>{image.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {getCategoryName(image.category_id)}
                          {image.subcategory_id && ` • ${getSubcategoryName(image.subcategory_id)}`}
                        </p>
                        <p className="text-xs text-muted-foreground italic truncate" title={image.alt_text}>
                          "{image.alt_text}"
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="w-full text-xs"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;