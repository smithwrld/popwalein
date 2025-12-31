import { useState, useEffect } from "react";
import { Eye, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

interface GalleryProject {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  thumbnail_image_id: string | null;
  display_order: number;
}

interface GalleryImage {
  id: string;
  project_id: string | null;
  title: string;
  alt_text: string;
  image_url: string;
  description: string;
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Database states
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [tableExists, setTableExists] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          supabase.from('gallery_categories').select('*').order('display_order'),
          supabase.from('gallery_subcategories').select('*').order('display_order'),
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (subcategoriesRes.data) setSubcategories(subcategoriesRes.data);

        // Try to fetch projects
        const projectsRes = await supabase
          .from('gallery_projects' as any)
          .select('*')
          .order('display_order');

        if (projectsRes.error) {
          if (projectsRes.error.message.includes('does not exist')) {
            setTableExists(false);
            setProjects([]);
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

        if (imagesRes.data) {
          setImages(imagesRes.data.map((img: any) => ({
            ...img,
            project_id: img.project_id || null
          })) as GalleryImage[]);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchData();

    // Set up real-time subscriptions
    const projectsChannel = supabase
      .channel('gallery_projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_projects' }, () => {
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
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(imagesChannel);
    };
  }, []);

  // Create category options with "All" option
  const categoryOptions = [
    { id: "all", name: "All Categories" },
    ...categories
  ];

  // Create subcategory options for selected category with "All" option
  const getSubcategoryOptions = () => {
    if (activeCategory === "all") return [];

    const filteredSubs = subcategories.filter(sub => sub.category_id === activeCategory);
    return [
      { id: "all", name: "All Types" },
      ...filteredSubs
    ];
  };

  // Get category name
  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId || categoryId === "all") return "All Categories";
    return categories.find(cat => cat.id === categoryId)?.name || "Unknown Category";
  };

  // Get subcategory name
  const getSubcategoryName = (subcategoryId: string | null) => {
    if (!subcategoryId || subcategoryId === "all") return "All Types";
    return subcategories.find(sub => sub.id === subcategoryId)?.name || "Unknown";
  };

  // Filter projects based on selected category and subcategory
  const filteredProjects = (() => {
    let filtered = projects;

    if (activeCategory !== "all") {
      filtered = filtered.filter(project => project.category_id === activeCategory);
    }

    if (activeSubCategory !== "all") {
      filtered = filtered.filter(project => project.subcategory_id === activeSubCategory);
    }

    return filtered;
  })();

  // Check if category supports subcategories
  const categorySupportsSubcategories = (categoryId: string) => {
    if (categoryId === "all") return false;
    return subcategories.some(sub => sub.category_id === categoryId);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubCategory("all");
  };

  // Get images for a specific project
  const getProjectImages = (projectId: string) => {
    return images.filter(img => img.project_id === projectId);
  };

  // Get project thumbnail
  const getProjectThumbnail = (project: GalleryProject) => {
    if (project.thumbnail_image_id) {
      const thumbImage = images.find(img => img.id === project.thumbnail_image_id);
      if (thumbImage) return thumbImage.image_url;
    }
    const projectImages = getProjectImages(project.id);
    return projectImages[0]?.image_url || null;
  };

  // Get sorted project images (thumbnail first)
  const getSortedProjectImages = (project: GalleryProject) => {
    const projectImages = getProjectImages(project.id);
    if (!project.thumbnail_image_id) return projectImages;

    const thumbImage = projectImages.find(img => img.id === project.thumbnail_image_id);
    const otherImages = projectImages.filter(img => img.id !== project.thumbnail_image_id);

    return thumbImage ? [thumbImage, ...otherImages] : projectImages;
  };

  const handleProjectClick = (project: GalleryProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    const projectImages = getSortedProjectImages(selectedProject);
    setCurrentImageIndex(prev =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    const projectImages = getSortedProjectImages(selectedProject);
    setCurrentImageIndex(prev =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
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
            "numberOfItems": `${projects.length}`,
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
                { number: `${projects.length}+`, label: "Projects" },
                { number: `${images.length}+`, label: "Gallery Images" },
                { number: `${categories.length}+`, label: "Categories" },
                { number: "10+", label: "Years Experience" }
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

              {tableExists && (
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
                          className={`cursor-pointer ${activeCategory === category.id
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
                            className={`cursor-pointer ${activeSubCategory === subCategory.id
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
              )}
            </div>

            {/* Setup Message */}
            {!tableExists && (
              <div className="text-center py-12 bg-muted/50 rounded-lg mb-8">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg text-muted-foreground">Gallery is being set up.</p>
                <p className="text-sm text-muted-foreground mt-2">Please check back soon for our project portfolio.</p>
              </div>
            )}

            {/* Projects Grid */}
            {tableExists && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProjects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="text-muted-foreground">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No projects found for the selected filters.</p>
                      <p className="text-sm mt-2">Try selecting different categories or check back later.</p>
                    </div>
                  </div>
                ) : (
                  filteredProjects.map((project, index) => {
                    const thumbnail = getProjectThumbnail(project);
                    const imageCount = getProjectImages(project.id).length;

                    return (
                      <div
                        key={project.id}
                        className="card-gallery animate-fade-up hover-scale cursor-pointer w-full"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="relative group overflow-hidden rounded-t-lg">
                          {thumbnail ? (
                            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                              <img
                                src={thumbnail}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          ) : (
                            <div className="relative w-full bg-muted flex items-center justify-center" style={{ paddingBottom: '75%' }}>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Eye className="w-12 h-12 text-muted-foreground opacity-50" />
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex items-center justify-between text-primary-foreground">
                                <span className="text-sm font-medium">View {imageCount} Photos</span>
                                <Eye className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                          {/* Image count badge */}
                          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-full">
                            {imageCount} photos
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          )}

                          <div className="space-y-2 text-sm">
                            {project.category_id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Category:</span>
                                <span className="text-foreground font-medium">{getCategoryName(project.category_id)}</span>
                              </div>
                            )}
                            {project.subcategory_id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="text-foreground font-medium">{getSubcategoryName(project.subcategory_id)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </section>

        {/* Project Images Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-5xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden bg-background">
            {selectedProject && (() => {
              const projectImages = getSortedProjectImages(selectedProject);
              const currentImage = projectImages[currentImageIndex];

              return (
                <div className="relative flex flex-col h-full">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute right-3 top-3 z-50 p-2 bg-white/90 hover:bg-white text-black rounded-full shadow-lg transition-all backdrop-blur-sm sm:right-4 sm:top-4"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Main Image */}
                  <div className="relative bg-black flex-1">
                    {currentImage ? (
                      <img
                        src={currentImage.image_url}
                        alt={currentImage.alt_text}
                        loading="eager"
                        decoding="async"
                        className="w-full h-[60vh] sm:h-[70vh] object-contain"
                      />
                    ) : (
                      <div className="w-full h-[60vh] sm:h-[70vh] flex items-center justify-center text-muted-foreground">
                        No images in this project
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {projectImages.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/90 text-foreground h-10 w-10 sm:h-12 sm:w-12"
                          onClick={handlePrevImage}
                        >
                          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/90 text-foreground h-10 w-10 sm:h-12 sm:w-12"
                          onClick={handleNextImage}
                        >
                          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    {projectImages.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm text-foreground text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                        {currentImageIndex + 1} / {projectImages.length}
                      </div>
                    )}
                  </div>

                  {/* Project Info - Minimalistic */}
                  <div className="p-3 sm:p-4 bg-card border-t">
                    <h2 className="text-base sm:text-lg font-semibold text-foreground">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-1.5 text-xs sm:text-sm">
                      {selectedProject.category_id && (
                        <span className="text-muted-foreground">
                          {getCategoryName(selectedProject.category_id)}
                        </span>
                      )}
                      {selectedProject.subcategory_id && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {getSubcategoryName(selectedProject.subcategory_id)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Strip - Hidden on Mobile */}
                  {projectImages.length > 1 && (
                    <div className="hidden sm:block bg-muted p-2 border-t">
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {projectImages.map((img, idx) => (
                          <button
                            key={img.id}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex
                              ? 'border-primary'
                              : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                          >
                            <img
                              src={img.image_url}
                              alt={img.alt_text}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
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
                <Link to="/contact" className="btn-secondary whitespace-nowrap inline-flex items-center justify-center">
                  Discuss Your Ideas
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
