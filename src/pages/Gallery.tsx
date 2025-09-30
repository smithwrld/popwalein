import { useState, useEffect } from "react";
import { Eye, ArrowRight, X, MapPin, Calendar, Users, CheckCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import serviceCeiling from "@/assets/service-ceiling.jpg";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
}

interface GalleryImage {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  category_id: string;
  subcategory_id: string | null;
  description: string;
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<GalleryImage | null>(null);
  
  // Database states
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes, imagesRes] = await Promise.all([
          supabase.from('gallery_categories').select('*').order('display_order'),
          supabase.from('gallery_subcategories').select('*').order('display_order'),
          supabase.from('gallery_images').select('*').order('display_order')
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (subcategoriesRes.data) setSubcategories(subcategoriesRes.data);
        if (imagesRes.data) setImages(imagesRes.data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchData();

    // Set up real-time subscriptions
    const categoriesChannel = supabase
      .channel('gallery_categories_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_categories' }, () => {
        fetchData();
      })
      .subscribe();

    const subcategoriesChannel = supabase
      .channel('gallery_subcategories_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_subcategories' }, () => {
        fetchData();
      })
      .subscribe();

    const imagesChannel = supabase
      .channel('gallery_images_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(subcategoriesChannel);
      supabase.removeChannel(imagesChannel);
    };
  }, []);

  // Create category options with "All" option
  const categoryOptions = [
    { id: "all", name: "All Ceiling Types" },
    ...categories
  ];

  // Create subcategory options for selected category with "All" option
  const getSubcategoryOptions = () => {
    if (activeCategory === "all") return [];
    
    const filteredSubs = subcategories.filter(sub => sub.category_id === activeCategory);
    return [
      { id: "all", name: "All Ceilings" },
      ...filteredSubs
    ];
  };

  // Get category name
  const getCategoryName = (categoryId: string) => {
    if (categoryId === "all") return "All Ceiling Types";
    return categories.find(cat => cat.id === categoryId)?.name || "Unknown Category";
  };

  // Get subcategory name
  const getSubcategoryName = (subcategoryId: string) => {
    if (subcategoryId === "all") return "All Ceilings";
    return subcategories.find(sub => sub.id === subcategoryId)?.name || "Unknown Subcategory";
  };

  // Filter images based on selected category and subcategory
  const filteredImages = (() => {
    let filtered = images;
    
    // Filter by main category
    if (activeCategory !== "all") {
      filtered = filtered.filter(image => image.category_id === activeCategory);
    }
    
    // Filter by sub-category
    if (activeSubCategory !== "all") {
      filtered = filtered.filter(image => image.subcategory_id === activeSubCategory);
    }
    
    return filtered;
  })();

  // Check if category supports subcategories (you can modify this logic based on your needs)
  const categorySupportsSubcategories = (categoryId: string) => {
    if (categoryId === "all") return false;
    return subcategories.some(sub => sub.category_id === categoryId);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubCategory("all"); // Reset sub-category when main category changes
  };

  return (
    <>
      <Helmet>
        <title>P.O.P Work Gallery Rajkot | Ceiling Design Portfolio | Popwale Projects</title>
        <meta name="description" content="Browse 500+ P.O.P ceiling designs in Rajkot's largest portfolio. View completed gypsum, grid, stretch & soundproof ceiling projects. Real installations from homes, offices & commercial spaces. Get design inspiration today!" />
        <meta name="keywords" content="POP work gallery Rajkot, ceiling design portfolio Rajkot, P.O.P projects Rajkot, gypsum ceiling photos Rajkot, interior design gallery Rajkot, completed projects Rajkot, ceiling installation photos, decorative elements gallery Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/gallery" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="P.O.P Work Gallery Rajkot | Ceiling Design Portfolio | Popwale Projects" />
        <meta property="og:description" content="Explore Popwale's stunning P.O.P work gallery featuring 500+ completed projects in Rajkot. View ceiling designs, gypsum installations & decorative elements." />
        <meta property="og:url" content="https://www.popwale.in/gallery" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="P.O.P Work Gallery Rajkot | Ceiling Design Portfolio" />
        <meta name="twitter:description" content="Explore Popwale's stunning P.O.P work gallery featuring 500+ completed projects in Rajkot. View ceiling designs & decorative elements." />
        <meta name="twitter:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* ImageGallery Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Popwale P.O.P Work Gallery - Rajkot",
            "description": "Gallery showcasing completed P.O.P projects, ceiling designs, and decorative elements in Rajkot by Popwale",
            "creator": {
              "@type": "Organization",
              "name": "Popwale",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rajkot",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              }
            },
            "numberOfItems": `${images.length}`,
            "about": [
              "P.O.P Services",
              "Ceiling Design", 
              "Gypsum Installation",
              "Decorative Elements",
              "Interior Design"
            ]
          })}
        </script>
      </Helmet>
      
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="primary-gradient text-primary-foreground section-padding">
        <div className="container-curved">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our P.O.P Work Gallery - Rajkot
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              Explore our portfolio of exceptional P.O.P projects completed across Rajkot and Gujarat that showcase 
              our craftsmanship, attention to detail, and innovative ceiling designs.
            </p>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${images.length}+`, label: "Gallery Images" },
              { number: `${categories.length}+`, label: "Categories" },
              { number: `${subcategories.length}+`, label: "Subcategories" },
              { number: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Featured Projects
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {/* Category Dropdown */}
              <DropdownMenu>
                 <DropdownMenuTrigger className="inline-flex items-center justify-center px-6 py-3 bg-card text-card-foreground border border-border rounded-curved font-medium hover:bg-accent hover:text-accent-foreground transition-colors min-w-[200px] z-50">
                  {getCategoryName(activeCategory)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg z-50">
                  {categoryOptions.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`cursor-pointer ${
                        activeCategory === category.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Subcategory Dropdown - Only show if category has subcategories */}
              {categorySupportsSubcategories(activeCategory) && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center px-6 py-3 bg-card text-card-foreground border border-border rounded-curved font-medium hover:bg-accent hover:text-accent-foreground transition-colors min-w-[200px] z-50">
                    {getSubcategoryName(activeSubCategory)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg z-50">
                    {getSubcategoryOptions().map((subCategory) => (
                      <DropdownMenuItem
                        key={subCategory.id}
                        onClick={() => setActiveSubCategory(subCategory.id)}
                        className={`cursor-pointer ${
                          activeSubCategory === subCategory.id
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {subCategory.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No images found for the selected filters.</p>
                  <p className="text-sm mt-2">Try selecting different categories or check back later.</p>
                </div>
              </div>
            ) : (
              filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="card-gallery animate-fade-up hover-scale cursor-pointer" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedProject(image)}
                >
                  <div className="relative group overflow-hidden">
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between text-primary-foreground">
                          <span className="text-sm font-medium">View Details</span>
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {image.description || image.alt_text}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="text-foreground font-medium">{getCategoryName(image.category_id)}</span>
                      </div>
                      {image.subcategory_id && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="text-foreground font-medium">{getSubcategoryName(image.subcategory_id)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Project Detail Modal - Simplified to show only image and title */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <div className="relative">
              {/* Image */}
              <img 
                src={selectedProject.image_url} 
                alt={selectedProject.alt_text}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h2>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="card-elegant text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Masterpiece in Rajkot?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let us bring your vision to life with our expert P.O.P services and innovative ceiling designs in Rajkot and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quotation" className="btn-hero whitespace-nowrap inline-flex items-center">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Discuss Ideas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Gallery;
