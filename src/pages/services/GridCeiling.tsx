import { ArrowRight, Star, CheckCircle, Building, Wrench, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GridCeiling = () => {
  const features = [
    {
      icon: Wrench,
      title: "Easy Access",
      description: "Removable tiles provide easy access to utilities and maintenance work above ceiling"
    },
    {
      icon: Building,
      title: "Modular Design", 
      description: "Flexible grid system allows for easy reconfiguration and individual tile replacement"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Economical solution for large areas with minimal installation and maintenance costs"
    },
    {
      icon: Clock,
      title: "Quick Installation",
      description: "Fast installation process minimizes disruption to your business operations"
    }
  ];

  const tileTypes = [
    {
      name: "Mineral Fiber Tiles",
      description: "Standard acoustic tiles with good sound absorption",
      features: ["Sound absorption", "Fire resistant", "Economical", "Various textures"]
    },
    {
      name: "Metal Tiles",
      description: "Durable metal tiles for high-traffic commercial areas",
      features: ["High durability", "Easy cleaning", "Modern look", "Corrosion resistant"]
    },
    {
      name: "Gypsum Tiles",
      description: "Smooth gypsum tiles for premium commercial spaces",
      features: ["Smooth finish", "Paintable surface", "Fire resistant", "Professional appearance"]
    }
  ];

  const applications = [
    "Office buildings and corporate headquarters",
    "Retail stores and shopping centers",
    "Hospitals and medical facilities",
    "Schools and educational institutions", 
    "Restaurants and food service areas",
    "Warehouses and industrial facilities"
  ];

  const specifications = [
    { label: "Grid Size", value: "24\" x 24\", 24\" x 48\"" },
    { label: "Suspension Height", value: "4\" to 12\" from ceiling" },
    { label: "Tile Thickness", value: "5/8\", 3/4\", 1\"" },
    { label: "Installation Time", value: "1 day (1000 sq.ft)" },
    { label: "Warranty", value: "3 years on system" },
    { label: "Pricing", value: "Starting ₹80/sq.ft" }
  ];

  return (
    <>
      <Helmet>
        <title>Grid Ceiling Installation Rajkot | Suspended Ceiling Systems Gujarat | Commercial Ceilings</title>
        <meta name="description" content="Professional grid ceiling installation in Rajkot, Gujarat. Suspended drop ceiling systems perfect for offices and commercial spaces. Modular design with easy access panels. Expert contractors serving Rajkot & surrounding areas." />
        <meta name="keywords" content="grid ceiling Rajkot, suspended ceiling Rajkot, drop ceiling Rajkot, office ceiling Rajkot, commercial ceiling Gujarat, modular ceiling Rajkot, acoustic ceiling tiles Rajkot, false ceiling grid Gujarat, ceiling contractors Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/services/grid-ceiling" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Grid Ceiling Installation Rajkot | Suspended Ceiling Systems Gujarat" />
        <meta property="og:description" content="Professional grid ceiling installation in Rajkot. Suspended drop ceiling systems for offices & commercial spaces. Expert contractors serving Gujarat." />
        <meta property="og:url" content="https://www.popwale.in/services/grid-ceiling" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/uploads/7b257dd9-13f9-4cfc-9326-addda647f516.png" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grid Ceiling Installation Rajkot | Commercial Ceiling Systems" />
        <meta name="twitter:description" content="Professional grid ceiling installation in Rajkot. Suspended systems for offices & commercial spaces across Gujarat." />
        <meta name="twitter:image" content="https://www.popwale.in/uploads/7b257dd9-13f9-4cfc-9326-addda647f516.png" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Grid Ceiling Installation - Rajkot",
            "description": "Professional grid ceiling installation services in Rajkot, Gujarat including suspended drop ceiling systems for commercial and office spaces",
            "provider": {
              "@type": "Organization",
              "name": "Popwale",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rajkot",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "telephone": "+91-99090-94033"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Rajkot"
              },
              {
                "@type": "City",
                "name": "Morbi"
              },
              {
                "@type": "City",
                "name": "Jamnagar"
              }
            ],
            "offers": {
              "@type": "Offer",
              "priceRange": "₹80-200/sq.ft",
              "description": "Professional grid ceiling installation with various tile options"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="primary-gradient text-primary-foreground py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-up space-y-6 lg:space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Grid Ceiling Systems - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Professional suspended grid ceiling installation in Rajkot, Gujarat perfect for offices and commercial spaces. Modular design with easy access for maintenance and utilities across Gujarat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Projects
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src="/uploads/7b257dd9-13f9-4cfc-9326-addda647f516.png" 
                  alt="Professional grid ceiling installation for commercial spaces"
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Grid Ceiling Advantages
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Grid ceilings offer unmatched flexibility and practicality for commercial environments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card border border-border rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-primary-muted rounded-[var(--radius-lg)] flex items-center justify-center mx-auto">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tile Types */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Ceiling Tile Options
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose from various tile materials to match your specific requirements and aesthetics.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tileTypes.map((tile, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {tile.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tile.description}
                    </p>
                    
                    <div className="space-y-2">
                      {tile.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications & Specifications */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="animate-slide-in">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Ideal Applications
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Grid ceilings are the preferred choice for commercial and institutional buildings:
                </p>
                
                <div className="space-y-3">
                  {applications.map((application, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-elegant animate-scale-in">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  System Specifications
                </h3>
                <div className="space-y-4">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-6 border-b border-border pb-3 items-start">
                      <span className="text-sm font-medium text-foreground">{spec.label}</span>
                      <span className="text-sm text-muted-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <Link to="/quotation" className="btn-hero w-full">
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="card-elegant text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready for Professional Grid Ceiling Installation in Rajkot?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get expert grid ceiling installation in Rajkot and across Gujarat with minimal business disruption and maximum functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quotation" className="btn-hero">
                  Get Free Estimate
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GridCeiling;