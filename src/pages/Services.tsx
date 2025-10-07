import { ArrowRight, Star, Wrench, Palette, Shield, MessageSquare, Calendar, Package, Award, CheckCircle, Lightbulb, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import serviceCeiling from "@/assets/hero-gypsum-ceiling.jpg";
import serviceWalls from "@/assets/service-walls.jpg";
import serviceDecorative from "@/assets/service-decorative.jpg";

const Services = () => {
  const services = [
    {
      title: "Ceiling Design & Installation",
      description: "Transform your ceilings with our innovative P.O.P designs, from modern minimalist to intricate traditional patterns.",
      image: serviceCeiling,
      features: [
        "False ceiling installations",
        "Decorative ceiling patterns",
        "LED integration solutions",
        "Sound insulation options"
      ],
      pricing: "Starting from ₹60/sq.ft"
    }
  ];

  const additionalServices = [
    {
      icon: Wrench,
      title: "Repair & Restoration",
      description: "Expert restoration of damaged P.O.P work with seamless matching to existing designs"
    },
    {
      icon: Palette,
      title: "Color & Texture Matching",
      description: "Precise color and texture matching for repairs and extensions to existing installations"
    },
    {
      icon: Shield,
      title: "Maintenance Services",
      description: "Regular maintenance and care to keep your P.O.P installations looking pristine"
    },
    {
      icon: MessageSquare,
      title: "Design Consultation",
      description: "Professional design advice and planning for your perfect P.O.P installation"
    },
    {
      icon: Calendar,
      title: "Project Planning",
      description: "Comprehensive project planning and timeline management for seamless execution"
    },
    {
      icon: Package,
      title: "Material Supply",
      description: "Premium quality P.O.P materials and supplies for contractors and DIY enthusiasts"
    }
  ];

  const serviceBenefits = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Professional Design",
      description: "Custom designs created by experienced professionals to match your vision"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Quality Materials",
      description: "Only premium ISI marked materials from trusted manufacturers"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Expert Installation",
      description: "Skilled craftsmen with 5+ years experience in P.O.P installations"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Timely Completion",
      description: "Projects completed on schedule with efficient planning"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Custom Solutions",
      description: "Tailored designs to suit your specific requirements and budget"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Innovation",
      description: "Latest techniques and modern design trends for contemporary appeal"
    }
  ];

  const processFlow = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "Free site visit, requirement analysis, and design discussion"
    },
    {
      step: "02",
      title: "Design & Quote",
      description: "Custom design creation with detailed quotation and timeline"
    },
    {
      step: "03",
      title: "Material Sourcing",
      description: "Premium quality material procurement and preparation"
    },
    {
      step: "04",
      title: "Installation",
      description: "Professional installation by certified craftsmen"
    },
    {
      step: "05",
      title: "Quality Check",
      description: "Multi-level quality inspection and final touches"
    },
    {
      step: "06",
      title: "Handover",
      description: "Project completion, cleanup, and maintenance guidelines"
    }
  ];

  return (
    <>
      <Helmet>
        <title>P.O.P Services in Rajkot | Professional Ceiling Design & Installation | Popwale</title>
        <meta name="description" content="Complete P.O.P ceiling solutions in Rajkot: Gypsum, Grid, Stretch, Soundproof & PVC installations. 5+ specialized services, ISO certified quality, 500+ projects. Free consultation & quotes. Transform your space today!" />
        <meta name="keywords" content="POP services Rajkot, ceiling installation Rajkot, decorative elements Rajkot, false ceiling Rajkot, repair services Rajkot, maintenance Rajkot, interior design Rajkot, professional POP contractors Rajkot, ceiling design services Rajkot, P.O.P work Gujarat" />
        <link rel="canonical" href="https://www.popwale.in/services" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="P.O.P Services in Rajkot | Professional Ceiling Design & Installation" />
        <meta property="og:description" content="Complete P.O.P services in Rajkot with expert craftsmanship. Ceiling design, gypsum installation & decorative elements. 500+ projects completed. Get free consultation!" />
        <meta property="og:url" content="https://www.popwale.in/services" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="P.O.P Services in Rajkot | Professional Ceiling Design & Installation" />
        <meta name="twitter:description" content="Complete P.O.P services in Rajkot with expert craftsmanship. Ceiling design, gypsum installation & decorative elements. 500+ projects completed." />
        <meta name="twitter:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "P.O.P Services in Rajkot",
            "description": "Professional plaster of paris services including ceiling design, gypsum installation, and decorative elements in Rajkot, Gujarat",
            "provider": {
              "@type": "Organization",
              "name": "Popwale",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "150 Feet Ring Rd, near The spire, Sheetal Park",
                "addressLocality": "Rajkot",
                "addressRegion": "Gujarat",
                "postalCode": "360007",
                "addressCountry": "IN"
              },
              "telephone": "+91-99090-94033"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Rajkot, Gujarat, India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "P.O.P Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ceiling Design & Installation"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Gypsum Ceiling Installation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Grid Ceiling Systems"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Soundproof Ceiling Solutions"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="primary-gradient text-primary-foreground section-padding">
        <div className="container-curved">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our P.O.P Services
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              Comprehensive P.O.P solutions for residential and commercial spaces in Rajkot and Gujarat, 
              crafted with precision and artistic flair by certified professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`animate-slide-in ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-primary-muted rounded-curved mb-6 gap-3 sm:gap-4">
                    <span className="font-semibold text-primary text-sm sm:text-base">{service.pricing}</span>
                    <Link to="/services/ceiling-design" className="btn-hero text-sm px-4 py-2 w-full sm:w-auto justify-center inline-flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className={`card-gallery animate-scale-in ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        {/* Our Ceiling Solutions */}
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Our Ceiling Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our complete range of ceiling solutions and decorative services, each crafted for specific needs and environments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Gypsum Ceiling */}
            <div className="card-service group animate-fade-up">
              <h3 className="text-xl font-bold text-foreground mb-3">Gypsum Ceiling</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Premium gypsum board ceilings with smooth finishes and modern aesthetics
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Fire resistant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Sound insulation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Smooth finish</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Easy installation</span>
                </div>
              </div>
              <Link 
                to="/services/gypsum-ceiling" 
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Grid Ceiling */}
            <div className="card-service group animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-foreground mb-3">Grid Ceiling</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Suspended grid ceiling systems perfect for commercial and office spaces
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Easy access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Modular design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Cost effective</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Professional look</span>
                </div>
              </div>
              <Link 
                to="/services/grid-ceiling" 
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* PVC Ceiling */}
            <div className="card-service group animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-bold text-foreground mb-3">Soffit Ceiling</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Waterproof Soffit ceiling panels ideal for bathrooms and moisture-prone areas
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Waterproof</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Easy maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Durable</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Variety of designs</span>
                </div>
              </div>
              <Link 
                to="/services/soffit-ceiling" 
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Stretch Ceiling */}
            <div className="card-service group animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold text-foreground mb-3">Stretch Ceiling</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Modern stretch ceiling systems with seamless installation and custom prints
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Seamless finish</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Custom prints</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Quick installation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Modern aesthetics</span>
                </div>
              </div>
              <Link 
                to="/services/stretch-ceiling" 
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Punning Work */}
            <div className="card-service group animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-bold text-foreground mb-3">Punning Work</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Intricate decorative plaster art that transforms spaces into masterpieces
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Custom artistry</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Intricate designs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Premium quality</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Expert craftsmanship</span>
                </div>
              </div>
              <Link
                to="/services/punning-work"
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        {/* Additional Services */}
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Complete support for all your P.O.P needs, from planning to maintenance. 
              Our comprehensive services ensure your project's success from start to finish.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index} 
                  className="group bg-card border border-border rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:scale-105 transition-all duration-300 animate-fade-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-muted rounded-[var(--radius-lg)] flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-2">
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200 whitespace-nowrap"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Need a custom service not listed above?
            </p>
            <Link to="/contact" className="btn-hero">
              Discuss Custom Requirements
            </Link>
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive benefits that come with every project we undertake
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Our Service Process
            </h2>
            <p className="text-xl text-muted-foreground">
              A systematic approach ensuring exceptional results every time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processFlow.map((process, index) => (
              <div key={index} className="card-service text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {process.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="card-elegant text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact Rajkot's leading P.O.P service provider today for a free consultation and personalized quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quotation" className="btn-hero">
                Get Free Quote
              </Link>
              <Link to="/gallery" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;

