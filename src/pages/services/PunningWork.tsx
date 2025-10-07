import { ArrowRight, Star, CheckCircle, Sparkles, Palette, Crown, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PunningWork = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Intricate Designs",
      description: "Exquisite handcrafted patterns and motifs that bring elegance and sophistication to your interiors"
    },
    {
      icon: Palette,
      title: "Custom Artistry",
      description: "Personalized designs tailored to your vision, from traditional to contemporary styles"
    },
    {
      icon: Crown,
      title: "Premium Quality",
      description: "Using the finest materials and techniques to ensure lasting beauty and durability"
    },
    {
      icon: Wand2,
      title: "Expert Craftsmanship",
      description: "Master artisans with decades of experience in creating stunning decorative elements"
    }
  ];

  const punningTechniques = [
    {
      name: "Classical Punning",
      description: "Traditional Rajasthani and Mughal-inspired intricate patterns and floral motifs",
      features: ["Floral patterns", "Geometric designs", "Traditional motifs", "Cultural authenticity"],
      bestFor: "Heritage homes, palaces, luxury villas"
    },
    {
      name: "Modern Punning",
      description: "Contemporary designs blending traditional techniques with modern aesthetics",
      features: ["Abstract patterns", "Minimalist designs", "Fusion styles", "Urban appeal"],
      bestFor: "Modern apartments, offices, commercial spaces"
    },
    {
      name: "Decorative Borders",
      description: "Elegant border designs that frame walls, ceilings, and architectural elements",
      features: ["Running borders", "Corner designs", "Ceiling borders", "Wall frames"],
      bestFor: "Living rooms, bedrooms, dining areas"
    },
    {
      name: "Custom Murals",
      description: "Large-scale decorative wall art and murals using punning techniques",
      features: ["Themed designs", "Landscape art", "Cultural scenes", "Brand logos"],
      bestFor: "Hotels, restaurants, showrooms, event spaces"
    },
    {
      name: "Architectural Details",
      description: "Detailed work on cornices, pillars, arches, and other architectural features",
      features: ["Cornice designs", "Pillar ornamentation", "Arch detailing", "Facade work"],
      bestFor: "Historical buildings, luxury homes, public spaces"
    },
    {
      name: "Themed Interiors",
      description: "Complete interior design themes using integrated punning work",
      features: ["Complete room sets", "Coordinated designs", "Themed spaces", "Concept execution"],
      bestFor: "Hotels, resorts, themed restaurants, luxury residences"
    }
  ];

  const applications = [
    "Luxury residential homes and villas",
    "Heritage and historical buildings",
    "Hotels and hospitality venues",
    "Restaurants and fine dining establishments",
    "Corporate offices and boardrooms",
    "Showrooms and retail spaces",
    "Wedding venues and event spaces",
    "Palaces and royal residences",
    "Museums and cultural centers",
    "Commercial complexes and malls"
  ];

  const specifications = [
    { label: "Design Complexity", value: "Simple to highly intricate" },
    { label: "Material Quality", value: "Premium plaster & compounds" },
    { label: "Finish Options", value: "Paint, texture, polish" },
    { label: "Installation Time", value: "3-14 days (based on complexity)" },
    { label: "Warranty", value: "5 years on workmanship" },
    { label: "Customization", value: "100% bespoke designs" },
    { label: "Maintenance", value: "Easy cleaning & touch-ups" },
    { label: "Pricing", value: "Starting ₹150/sq.ft" }
  ];

  const advantages = [
    "Timeless elegance and sophistication",
    "Increases property value significantly",
    "Creates unique, one-of-a-kind interiors",
    "Blends tradition with modern aesthetics",
    "Highly durable and long-lasting",
    "Environmentally friendly materials",
    "Expert craftsmanship guarantee",
    "Complete customization possible"
  ];

  return (
    <>
      <Helmet>
        <title>Punning Work | Decorative Plaster Art Gujarat | Custom Interior Designs | Popwale</title>
        <meta name="description" content="Expert Punning Work in Rajkot - Transform your space with intricate decorative plaster art. Custom designs, traditional & modern styles, premium craftsmanship. Starting ₹150/sq.ft. 500+ projects completed!" />
        <meta name="keywords" content="Punning work Rajkot, decorative plaster Rajkot, plaster art Gujarat, custom interiors Rajkot, decorative molding Gujarat, plaster designs Rajkot, interior decoration Gujarat, artistic plaster work Rajkot, decorative elements Gujarat, plaster craftsmanship Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/services/punning-work" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Punning Work Rajkot | Decorative Plaster Art Gujarat" />
        <meta property="og:description" content="Professional punning work in Rajkot. Custom decorative plaster designs, intricate patterns, traditional & modern styles. Premium craftsmanship for luxury interiors." />
        <meta property="og:url" content="https://www.popwale.in/services/punning-work" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/uploads/punningwork.jpeg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Punning Work Rajkot | Decorative Plaster Art" />
        <meta name="twitter:description" content="Expert decorative plaster work in Rajkot. Custom designs, intricate patterns, premium craftsmanship for luxury interiors." />
        <meta name="twitter:image" content="https://www.popwale.in/uploads/punningwork.jpeg" />

        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Punning Work - Rajkot",
            "description": "Professional decorative plaster work and punning services in Rajkot, Gujarat specializing in custom interior designs and intricate plaster art",
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
                "name": "Ahmedabad"
              },
              {
                "@type": "City",
                "name": "Surat"
              }
            ],
            "serviceType": ["Decorative Plaster Work", "Punning Services", "Custom Interior Design", "Plaster Art"],
            "offers": {
              "@type": "Offer",
              "priceRange": "₹150-500/sq.ft",
              "description": "Custom decorative plaster work with premium craftsmanship"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Punning Work Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Classical Punning Designs"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Modern Punning Art"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Decorative Elements"
                  }
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
                "name": "What is Punning Work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Punning work is an intricate form of decorative plaster art where skilled artisans create detailed patterns, motifs, and designs on walls and ceilings using specialized plaster compounds. It combines traditional craftsmanship with artistic vision to create unique, elegant interiors."
                }
              },
              {
                "@type": "Question",
                "name": "How much does Punning work cost in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Punning work costs in Rajkot start from ₹150 per square foot for simpler designs and can go up to ₹500/sq.ft for highly intricate, custom designs. The final cost depends on the complexity of the design, size of the area, and materials used."
                }
              },
              {
                "@type": "Question",
                "name": "How long does Punning work take to complete?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The timeline for punning work varies based on complexity: simple border designs take 3-5 days, intricate murals or large areas may take 2-4 weeks. Our team provides detailed project timelines during consultation."
                }
              },
              {
                "@type": "Question",
                "name": "Can Punning work be customized?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Punning work is highly customizable. We work closely with clients to create bespoke designs that match their vision, whether it's incorporating family crests, brand logos, cultural motifs, or completely original artistic concepts."
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
                  Punning Work - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Transform your space into a masterpiece with our expert Punning Work services in Rajkot. Intricate decorative plaster art that blends tradition with elegance, creating timeless beauty for your interiors.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    Get Custom Design Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Our Artwork
                  </Link>
                </div>
              </div>

              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img
                  src="/uploads/punningwork.jpeg"
                  alt="Exquisite punning work showcasing intricate decorative plaster art"
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
                Why Choose Our Punning Work?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the artistry of traditional plaster craftsmanship combined with modern design sensibilities.
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

        {/* Punning Techniques */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Punning Techniques
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Master the art of decorative plaster work with our diverse range of techniques, from classical designs to contemporary masterpieces.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {punningTechniques.map((technique, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {technique.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {technique.description}
                    </p>

                    <div className="space-y-2">
                      {technique.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <span className="text-sm font-medium text-primary">Best For:</span>
                      <p className="text-sm text-muted-foreground mt-1">{technique.bestFor}</p>
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
                  Punning work adds unparalleled elegance to various spaces and settings:
                </p>

                <div className="space-y-3">
                  {applications.map((application, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{application}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-elegant animate-scale-in">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Service Specifications
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
                    Request Custom Design
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
                Punning Work Advantages
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover why decorative plaster art remains the gold standard for luxury interiors.
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
                Start Your Custom Project
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="card-elegant text-center max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Punning Work Process
              </h2>
              <div className="grid md:grid-cols-4 gap-8 text-left">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">01</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary text-center">Design Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed discussion of your vision, site visit, and concept development with our design experts.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">02</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary text-center">Custom Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Creation of detailed design drawings, material specifications, and project timeline.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">03</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary text-center">Artisan Execution</h3>
                  <p className="text-sm text-muted-foreground">
                    Skilled master craftsmen execute the intricate work with precision and artistry.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">04</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary text-center">Finishing & Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Final finishing, quality inspection, and comprehensive maintenance guidance.
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

export default PunningWork;
