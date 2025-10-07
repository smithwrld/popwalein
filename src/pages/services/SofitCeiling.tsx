import { ArrowRight, Star, CheckCircle, Droplets, Shield, Brush, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SofitCeiling = () => {
  const features = [
    {
      icon: Droplets,
      title: "100% Waterproof",
      description: "Perfect for bathrooms, kitchens, and moisture-prone areas with complete water resistance"
    },
    {
      icon: Brush,
      title: "Easy Maintenance", 
      description: "Simple cleaning with just soap and water - no special maintenance required"
    },
    {
      icon: Shield,
      title: "Durable & Long-lasting",
      description: "Resistant to termites, corrosion, and wear with 15+ years lifespan"
    },
    {
      icon: Clock,
      title: "Quick Installation",
      description: "Fast and clean installation process with minimal disruption to daily activities"
    }
  ];

  const sofitTypes = [
    {
      name: "Plain Sofit Panels",
      description: "Clean, minimalist finish perfect for modern interiors with seamless aesthetics",
      features: ["Smooth surface", "Easy to clean", "Wide color range", "Cost effective"],
      bestFor: "Modern bathrooms, kitchens, contemporary homes"
    },
    {
      name: "Designer Sofit Panels",
      description: "Elegant textures and patterns that add character and hide imperfections beautifully",
      features: ["Attractive patterns", "Flawless finish", "Designer appeal", "Quick installation"],
      bestFor: " Living rooms, bedrooms, dining areas, offices"
    },
    {
      name: "Wood Grain Sofit Panels",
      description: "Authentic wood appearance without the maintenance hassles of real wood",
      features: ["Natural wood look", "Termite resistant", "Waterproof", "Premium finish"],
      bestFor: "Restaurants, cafes, offices, luxury interiors"
    },
    {
      name: "Metallic Sofit Panels",
      description: "Contemporary metallic finishes that add sophistication and modern appeal",
      features: ["Metallic sheen", "Scratch resistant", "Durable finish", "High-end look"],
      bestFor: "Commercial spaces, showrooms, modern offices"
    },
    {
      name: "Glossy Sofit Panels",
      description: "High-shine surfaces that reflect light and create spacious, luxurious environments",
      features: ["Mirror-like finish", "Light reflective", "Easy cleaning", "Elegant appearance"],
      bestFor: "Small spaces, bathrooms, commercial areas"
    },
    {
      name: "Matte Sofit Panels",
      description: "Subtle, sophisticated matte finish that provides a contemporary, understated elegance",
      features: ["No-glare surface", "Fingerprint resistant", "Modern aesthetic", "Versatile styling"],
      bestFor: "Contemporary homes, offices, minimalist designs"
    }
  ];

  const applications = [
    "Bathrooms and shower areas",
    "Kitchens and pantries",
    "Balconies and outdoor covered areas",
    "Swimming pool areas",
    "Laundry and utility rooms",
    "Commercial washrooms",
    "Food processing areas",
    "Basement and storage rooms"
  ];

  const specifications = [
    { label: "Panel Width", value: "200mm, 250mm, 300mm" },
    { label: "Panel Length", value: "2.95m, 5.95m" },
    { label: "Thickness", value: "8mm, 10mm" },
    { label: "Colors Available", value: "50+ colors & finishes" },
    { label: "Installation Time", value: "1-2 days (average room)" },
    { label: "Warranty", value: "10 years against defects" },
    { label: "Pricing", value: "Starting ₹90/sq.ft" }
  ];

  const advantages = [
    "Waterproof and moisture resistant",
    "Termite and pest proof",
    "Easy to clean and maintain",
    "Quick and clean installation",
    "Cost-effective solution",
    "Wide variety of designs",
    "Long-lasting durability",
    "Eco-friendly recyclable material"
  ];

  return (
    <>
      <Helmet>
        <title>Sofit Ceiling Installation Rajkot | Waterproof Ceiling Panels Gujarat | Bathroom Ceiling Solutions</title>
        <meta name="description" content="Sofit ceiling Rajkot from ₹60/sq.ft. 100% waterproof panels ideal for bathrooms & kitchens. Termite-proof, easy maintenance, quick installation. 10+ color options, 5-year warranty. Get instant quote now!" />
        <meta name="keywords" content="Sofit ceiling Rajkot, waterproof ceiling Rajkot, bathroom ceiling Rajkot, kitchen ceiling Gujarat, moisture resistant ceiling Rajkot, plastic ceiling panels Gujarat, easy maintenance ceiling Rajkot, Sofit contractors Gujarat" />
        <link rel="canonical" href="https://www.popwale.in/services/sofit-ceiling" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Sofit Ceiling Installation Rajkot | Waterproof Ceiling Panels Gujarat" />
        <meta property="og:description" content="Professional Sofit ceiling installation in Rajkot. Waterproof panels for bathrooms & kitchens. Easy maintenance & durable solutions across Gujarat." />
        <meta property="og:url" content="https://www.popwale.in/services/sofit-ceiling" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sofit Ceiling Installation Rajkot | Waterproof Solutions" />
        <meta name="twitter:description" content="Professional Sofit ceiling installation in Rajkot. Waterproof panels for bathrooms & moisture-prone areas across Gujarat." />
        <meta name="twitter:image" content="https://www.popwale.in/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Sofit Ceiling Installation - Rajkot",
            "description": "Professional Sofit ceiling installation services in Rajkot, Gujarat specializing in waterproof ceiling panels for bathrooms and moisture-prone areas",
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
              }
            ],
            "offers": {
              "@type": "Offer",
              "priceRange": "₹90-180/sq.ft",
              "description": "Waterproof PVC ceiling panels with 10-year warranty"
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
                  Sofit Ceiling Panels - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Waterproof Sofit ceiling panels in Rajkot, Gujarat perfect for bathrooms, kitchens, and moisture-prone areas. Easy maintenance, quick installation, and long-lasting durability across Gujarat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Designs
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src="/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" 
                  alt="Waterproof Sofit ceiling panels for bathrooms and kitchens"
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
                Why Choose Sofit Ceilings?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Sofit ceilings offer unmatched practicality and aesthetics for moisture-prone environments.
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

        {/* Sofit Types */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Sofit Panel Varieties
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our extensive collection of premium Sofit panel varieties, each designed to elevate your space with style, functionality, and unmatched quality. From minimalist modern looks to luxurious designer finishes, find the perfect Sofit solution for your unique vision.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sofitTypes.map((type, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {type.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <span className="text-sm font-medium text-primary">Best For:</span>
                      <p className="text-sm text-muted-foreground mt-1">{type.bestFor}</p>
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
                  Perfect Applications
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Sofit ceilings are ideal for areas with high moisture and humidity:
                </p>
                
                <div className="space-y-3">
                  {applications.map((application, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-elegant animate-scale-in">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Product Specifications
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
                    Get Sofit Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Sofit Ceiling Advantages
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover why Sofit ceilings are the smart choice for modern homes and commercial spaces.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    {advantage}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="btn-hero">
                Schedule Installation
              </Link>
            </div>
          </div>
        </section>

        {/* Maintenance Tips */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="card-elegant text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Easy Maintenance Tips
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary">Regular Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean with mild soap and water using a soft cloth or sponge. Avoid abrasive cleaners.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary">Stain Removal</h3>
                  <p className="text-sm text-muted-foreground">
                    For stubborn stains, use a paste of baking soda and water. Rinse thoroughly after cleaning.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary">Long-term Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Check joints periodically and ensure proper ventilation to maximize lifespan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SofitCeiling;