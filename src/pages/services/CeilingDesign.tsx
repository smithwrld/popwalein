import { ArrowRight, Star, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gypsumCeilingImage from "@/assets/hero-gypsum-ceiling.jpg";

const CeilingDesign = () => {
  const ceilingTypes = [
    {
      name: "Gypsum Ceiling",
      description: "Premium gypsum board ceilings with smooth finishes and modern aesthetics",
      link: "/services/gypsum-ceiling",
      features: ["Fire resistant", "Sound insulation", "Smooth finish", "Easy installation"]
    },
    {
      name: "Grid Ceiling",
      description: "Suspended grid ceiling systems perfect for commercial and office spaces",
      link: "/services/grid-ceiling", 
      features: ["Easy access", "Modular design", "Cost effective", "Professional look"]
    },
    {
      name: "Sofit Ceiling",
      description: "Waterproof Sofit ceiling panels ideal for bathrooms and moisture-prone areas",
      link: "/services/sofit-ceiling",
      features: ["Waterproof", "Easy maintenance", "Durable", "Variety of designs"]
    },
    {
      name: "Stretch Ceiling",
      description: "Modern stretch ceiling systems with seamless installation and custom prints",
      link: "/services/stretch-ceiling",
      features: ["Seamless finish", "Custom prints", "Quick installation", "Modern aesthetics"]
    }
  ];

  const benefits = [
    "Enhanced interior aesthetics",
    "Improved lighting integration", 
    "Better acoustics and insulation",
    "Increased property value",
    "Professional installation",
    "Quality materials and finish"
  ];

  return (
    <>
      <Helmet>
        <title>Ceiling Design & Installation Services in Rajkot | Expert P.O.P Contractors Gujarat</title>
        <meta name="description" content="Custom ceiling design Rajkot - 500+ unique projects. Specializing in gypsum, grid, stretch, soundproof & PVC ceilings. 3D previews, expert consultation, competitive pricing. Elevate your space aesthetically!" />
        <meta name="keywords" content="ceiling design Rajkot, ceiling installation Rajkot, P.O.P contractors Rajkot, false ceiling Rajkot, gypsum ceiling Rajkot, grid ceiling Rajkot, professional ceiling services Gujarat, interior design Rajkot, ceiling contractors Gujarat" />
        <link rel="canonical" href="https://www.popwale.in/services/ceiling-design" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Ceiling Design & Installation Services in Rajkot | Expert P.O.P Contractors" />
        <meta property="og:description" content="Professional ceiling design & installation in Rajkot, Gujarat. Expert P.O.P contractors for gypsum, grid, soundproof & decorative ceilings. 500+ projects completed." />
        <meta property="og:url" content="https://www.popwale.in/services/ceiling-design" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/assets/hero-gypsum-ceiling.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ceiling Design & Installation Services in Rajkot | Expert P.O.P Contractors" />
        <meta name="twitter:description" content="Professional ceiling design & installation in Rajkot, Gujarat. Expert P.O.P contractors for all ceiling types." />
        <meta name="twitter:image" content="https://www.popwale.in/assets/hero-gypsum-ceiling.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ceiling Design & Installation Services - Rajkot",
            "description": "Professional ceiling design and installation services in Rajkot, Gujarat including gypsum, grid, soundproof, PVC and stretch ceilings",
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
              "telephone": "+91-99090-94033",
              "url": "https://www.popwale.in"
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
            "serviceType": [
              "Gypsum Ceiling Installation",
              "Grid Ceiling Systems", 
              "Soundproof Ceiling Solutions",
              "PVC Ceiling Panels",
              "Stretch Ceiling Systems"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Ceiling Services Rajkot",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Gypsum Ceiling Installation"
                  },
                  "priceRange": "₹150-300/sq.ft"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Grid Ceiling Systems"
                  },
                  "priceRange": "₹80-200/sq.ft"
                }
              ]
            }
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What ceiling design services do you offer in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer comprehensive ceiling design services in Rajkot including gypsum ceiling installation, grid ceiling systems, soundproof ceiling solutions, PVC ceiling panels, and stretch ceiling systems for residential and commercial properties."
                }
              },
              {
                "@type": "Question",
                "name": "How much does ceiling installation cost in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Ceiling installation costs in Rajkot vary by type: Gypsum ceilings start from ₹150/sq.ft, Grid ceilings from ₹80/sq.ft, PVC ceilings from ₹90/sq.ft, and Stretch ceilings from ₹180/sq.ft. Contact us for accurate quotes."
                }
              },
              {
                "@type": "Question",
                "name": "Do you serve areas outside Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we serve Rajkot and surrounding areas including Morbi, Jamnagar, and Junagadh. Our expert team provides ceiling installation services across Gujarat with the same quality standards."
                }
              }
            ]
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
                  Ceiling Design & Installation - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Transform your space in Rajkot with our premium ceiling solutions. From modern gypsum designs to acoustic panels, we create ceilings across Gujarat that combine functionality with stunning aesthetics.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/contact" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call Now
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src={gypsumCeilingImage} 
                  alt="Professional ceiling design and installation"
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ceiling Types */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Our Ceiling Solutions
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Choose from our comprehensive range of ceiling types, each designed for specific needs and environments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {ceilingTypes.map((type, index) => (
                <Link 
                  key={index}
                  to={type.link}
                  className="group bg-card border border-border rounded-[var(--radius-xl)] p-6 sm:p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition-all duration-300 animate-fade-up block"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {type.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex items-center text-primary font-medium text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-slide-in space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Why Choose Our Ceiling Services?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  With over a decade of experience in ceiling design and installation, we deliver exceptional quality and craftsmanship in every project.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-elegant text-center animate-scale-in p-6 sm:p-8 mt-8 lg:mt-0">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Ready to Start?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Get a personalized quote for your ceiling project today.
                </p>
                <div className="space-y-4">
                  <Link to="/quotation" className="btn-hero w-full text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Request Quote
                  </Link>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Free Consultation
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Quick Response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CeilingDesign;