import { ArrowRight, Star, CheckCircle, Zap, Palette, Camera, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const StretchCeiling = () => {
  const features = [
    {
      icon: Zap,
      title: "Quick Installation",
      description: "Professional installation completed in just a few hours with minimal mess and disruption"
    },
    {
      icon: Palette,
      title: "Unlimited Designs", 
      description: "Custom colors, patterns, and finishes including high-quality digital prints and artwork"
    },
    {
      icon: Camera,
      title: "Custom Printing",
      description: "High-resolution custom images, logos, and artistic designs printed directly on ceiling material"
    },
    {
      icon: Wrench,
      title: "Easy Access",
      description: "Removable panels provide easy access to utilities while maintaining seamless appearance"
    }
  ];

  const stretchTypes = [
    {
      name: "Matte Finish",
      description: "Elegant matte surface that diffuses light evenly",
      features: ["No reflections", "Even light distribution", "Easy maintenance", "Classic appearance"],
      bestFor: "Living rooms, bedrooms, offices"
    },
    {
      name: "Glossy Finish",
      description: "High-gloss reflective surface that creates spacious feeling",
      features: ["Mirror-like reflection", "Increases room height", "Modern aesthetics", "Easy to clean"],
      bestFor: "Small rooms, bathrooms, modern interiors"
    },
    {
      name: "Satin Finish",
      description: "Semi-glossy finish combining benefits of matte and gloss",
      features: ["Subtle sheen", "Balanced reflection", "Versatile design", "Premium appearance"],
      bestFor: "Restaurants, showrooms, luxury spaces"
    },
    {
      name: "Translucent",
      description: "Light-transmitting material perfect for backlighting",
      features: ["LED integration", "Uniform lighting", "Creative effects", "Energy efficient"],
      bestFor: "Feature walls, mood lighting, modern designs"
    }
  ];

  const applications = [
    "Modern homes and luxury apartments",
    "Hotels and hospitality venues",
    "Restaurants and entertainment spaces",
    "Retail stores and showrooms",
    "Offices and corporate spaces",
    "Swimming pools and spa areas",
    "Art galleries and museums",
    "Commercial and industrial buildings"
  ];

  const specifications = [
    { label: "Material", value: "PVC membrane, Polyester fabric" },
    { label: "Thickness", value: "0.15mm - 0.27mm" },
    { label: "Width Options", value: "Up to 5 meters seamless" },
    { label: "Temperature Range", value: "-40°C to +60°C" },
    { label: "Installation Time", value: "2-6 hours (average room)" },
    { label: "Warranty", value: "12 years manufacturer warranty" },
    { label: "Pricing", value: "Starting ₹180/sq.ft" }
  ];

  const advantages = [
    "100% waterproof and moisture resistant",
    "Anti-bacterial and hygienic surface",
    "Fire retardant certified material",
    "Perfect flatness without sagging",
    "Excellent acoustic properties",
    "Eco-friendly and recyclable",
    "Maintenance-free for years",
    "Unlimited design possibilities"
  ];

  return (
    <>
      <Helmet>
        <title>Stretch Ceiling Installation Rajkot | Modern Ceiling Systems Gujarat | Custom Printed Ceilings</title>
        <meta name="description" content="Professional stretch ceiling installation in Rajkot, Gujarat with custom prints and designs. Modern ceiling systems with quick installation. Waterproof, durable, and unlimited design options across Gujarat." />
        <meta name="keywords" content="stretch ceiling Rajkot, modern ceiling Rajkot, custom printed ceiling Gujarat, seamless ceiling Rajkot, quick installation ceiling Gujarat, designer ceiling Rajkot, membrane ceiling Gujarat, stretch ceiling contractors Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/services/stretch-ceiling" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Stretch Ceiling Installation Rajkot | Modern Ceiling Systems Gujarat" />
        <meta property="og:description" content="Professional stretch ceiling installation in Rajkot with custom prints. Modern ceiling systems with quick installation across Gujarat." />
        <meta property="og:url" content="https://www.popwale.in/services/stretch-ceiling" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/uploads/e5981028-adeb-416d-852f-22f37fc9a442.png" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stretch Ceiling Installation Rajkot | Custom Design Solutions" />
        <meta name="twitter:description" content="Professional stretch ceiling installation in Rajkot. Custom prints & modern ceiling systems across Gujarat." />
        <meta name="twitter:image" content="https://www.popwale.in/uploads/e5981028-adeb-416d-852f-22f37fc9a442.png" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Stretch Ceiling Installation - Rajkot",
            "description": "Professional stretch ceiling installation services in Rajkot, Gujarat featuring modern ceiling systems with custom prints and seamless installation",
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
              "priceRange": "₹180-350/sq.ft",
              "description": "Modern stretch ceiling systems with 12-year manufacturer warranty"
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
                  Stretch Ceiling Systems - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Revolutionary stretch ceiling technology in Rajkot, Gujarat with seamless installation, custom prints, and unlimited design possibilities. Transform any space across Gujarat in just hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Design Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Designs
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src="/uploads/e5981028-adeb-416d-852f-22f37fc9a442.png" 
                  alt="Modern stretch ceiling with custom design and seamless finish"
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
                Stretch Ceiling Advantages
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the future of ceiling design with our advanced stretch ceiling technology.
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

        {/* Stretch Types */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Finish Options
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose from various finish types to achieve your desired aesthetic and functional goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stretchTypes.map((type, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                      {type.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <span className="text-xs font-medium text-primary">Ideal For:</span>
                      <p className="text-xs text-muted-foreground mt-1">{type.bestFor}</p>
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
                  Stretch ceilings are perfect for spaces requiring modern aesthetics and quick installation:
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
                  Technical Specifications
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
                    Get Custom Design Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Choose Stretch Ceilings?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] text-center animate-fade-up group hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-sm font-medium text-foreground">
                    {advantage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Installation Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our streamlined installation process ensures minimal disruption and maximum results.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Design & Measure", desc: "Custom design creation and precise measurements" },
                { step: "2", title: "Track Installation", desc: "Installing perimeter tracks with precision mounting" },
                { step: "3", title: "Heating & Stretching", desc: "Professional heating and membrane stretching process" },
                { step: "4", title: "Final Inspection", desc: "Quality check and final adjustments for perfect finish" }
              ].map((process, index) => (
                <div 
                  key={index}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {process.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {process.desc}
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
      </div>
    </>
  );
};

export default StretchCeiling;