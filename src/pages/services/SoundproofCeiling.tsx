import { ArrowRight, Star, CheckCircle, Volume2, Home, Building2, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SoundproofCeiling = () => {
  const features = [
    {
      icon: Volume2,
      title: "Superior Sound Reduction",
      description: "Reduce noise transmission by up to 60dB with our advanced acoustic materials"
    },
    {
      icon: Home,
      title: "Improved Privacy", 
      description: "Create private spaces with excellent sound isolation between rooms and floors"
    },
    {
      icon: Building2,
      title: "Professional Grade",
      description: "Meet commercial building standards for noise control and acoustic performance"
    },
    {
      icon: Music,
      title: "Enhanced Acoustics",
      description: "Improve room acoustics with sound absorption and reflection control"
    }
  ];

  const acousticSolutions = [
    {
      name: "Mineral Wool Panels",
      description: "High-density mineral wool for excellent sound absorption",
      nrc: "0.85-0.95",
      applications: ["Offices", "Conference rooms", "Classrooms"]
    },
    {
      name: "Fiberglass Acoustic Tiles",
      description: "Lightweight fiberglass panels with fabric facing",
      nrc: "0.75-0.90", 
      applications: ["Restaurants", "Open offices", "Retail spaces"]
    },
    {
      name: "Perforated Metal Panels",
      description: "Metal panels with acoustic backing for industrial spaces",
      nrc: "0.70-0.85",
      applications: ["Factories", "Warehouses", "Gyms"]
    }
  ];

  const applications = [
    "Recording studios and music rooms",
    "Home theaters and entertainment rooms",
    "Office buildings and conference rooms",
    "Restaurants and hospitality venues",
    "Educational institutions and libraries",
    "Healthcare facilities and clinics",
    "Residential apartments and condos",
    "Industrial facilities and workshops"
  ];

  const specifications = [
    { label: "Sound Reduction", value: "25-60 dB" },
    { label: "NRC Rating", value: "0.70 - 0.95" },
    { label: "Fire Rating", value: "Class A non-combustible" },
    { label: "Thickness Options", value: "1\", 2\", 3\", 4\"" },
    { label: "Installation Time", value: "2-4 days (average room)" },
    { label: "Warranty", value: "10 years performance" },
    { label: "Pricing", value: "Starting ₹200/sq.ft" }
  ];

  return (
    <>
      <Helmet>
        <title>Soundproof Ceiling Installation Rajkot | Acoustic Ceiling Panels Gujarat | Noise Control Solutions</title>
        <meta name="description" content="Professional soundproof ceiling installation in Rajkot, Gujarat. Acoustic panels and noise control solutions for studios, offices, and homes. Reduce noise by up to 60dB across Gujarat region." />
        <meta name="keywords" content="soundproof ceiling Rajkot, acoustic ceiling Rajkot, noise control Gujarat, sound insulation Rajkot, acoustic panels Gujarat, sound absorption Rajkot, recording studio ceiling Gujarat, quiet ceiling Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/services/soundproof-ceiling" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Soundproof Ceiling Installation Rajkot | Acoustic Solutions Gujarat" />
        <meta property="og:description" content="Professional soundproof ceiling installation in Rajkot. Acoustic panels & noise control solutions for studios, offices & homes. Up to 60dB noise reduction." />
        <meta property="og:url" content="https://www.popwale.in/services/soundproof-ceiling" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soundproof Ceiling Installation Rajkot | Acoustic Solutions" />
        <meta name="twitter:description" content="Professional soundproof ceiling installation in Rajkot. Acoustic panels & noise control solutions across Gujarat." />
        <meta name="twitter:image" content="https://www.popwale.in/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Soundproof Ceiling Installation - Rajkot",
            "description": "Professional soundproof ceiling installation services in Rajkot, Gujarat providing acoustic solutions and noise control for various applications",
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
                "name": "Jamnagar"
              }
            ],
            "offers": {
              "@type": "Offer",
              "priceRange": "₹200-400/sq.ft",
              "description": "Professional acoustic ceiling solutions with up to 60dB noise reduction"
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
                  Soundproof Ceiling Solutions - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Advanced acoustic ceiling systems in Rajkot, Gujarat for superior noise control and sound insulation. Perfect for studios, offices, and residential spaces requiring privacy and quiet across Gujarat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Acoustic Assessment
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Installations
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src="/uploads/1775cb21-cb7a-43d8-a62e-e53562afd6eb.png" 
                  alt="Professional soundproof ceiling with acoustic panels for noise control"
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
                Why Choose Soundproof Ceilings?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our acoustic ceiling solutions provide exceptional noise control and improved comfort.
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

        {/* Acoustic Solutions */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Acoustic Material Options
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose from professional-grade acoustic materials designed for optimal sound control.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {acousticSolutions.map((solution, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {solution.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="bg-primary-muted rounded-[var(--radius-lg)] p-3">
                      <div className="text-center">
                        <span className="text-sm font-medium text-primary">NRC Rating</span>
                        <div className="text-2xl font-bold text-primary">{solution.nrc}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Best For:</span>
                      {solution.applications.map((app, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{app}</span>
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
                  Perfect Applications
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Soundproof ceilings are essential for spaces requiring noise control and acoustic comfort:
                </p>
                
                <div className="space-y-3">
                  {applications.map((application, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-elegant animate-scale-in">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Performance Specifications
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
                    Get Acoustic Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Benefits of Soundproof Ceilings
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Noise Reduction", desc: "Significantly reduce unwanted noise transmission" },
                { title: "Privacy Enhancement", desc: "Create private spaces with sound isolation" },
                { title: "Improved Productivity", desc: "Better focus in quiet work environments" },
                { title: "Sound Quality", desc: "Enhanced acoustics for music and audio" },
                { title: "Property Value", desc: "Increase property value with premium features" },
                { title: "Comfort Living", desc: "More comfortable and peaceful living spaces" }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-soft)] text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Star className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="btn-hero">
                Schedule Acoustic Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SoundproofCeiling;