import { ArrowRight, Star, CheckCircle, Shield, Thermometer, Volume2, Paintbrush } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gypsumCeilingImage from "@/assets/hero-gypsum-ceiling.jpg";

const GypsumCeiling = () => {
  const features = [
    {
      icon: Shield,
      title: "Fire Resistant",
      description: "Gypsum boards are naturally fire-resistant, providing enhanced safety for your space"
    },
    {
      icon: Volume2,
      title: "Sound Insulation", 
      description: "Excellent acoustic properties help reduce noise transmission between floors"
    },
    {
      icon: Thermometer,
      title: "Thermal Efficiency",
      description: "Provides good thermal insulation, helping maintain comfortable room temperatures"
    },
    {
      icon: Paintbrush,
      title: "Smooth Finish",
      description: "Creates perfectly smooth surfaces ready for any paint or decorative finish"
    }
  ];

  const applications = [
    "Residential homes and apartments",
    "Office buildings and corporate spaces", 
    "Retail stores and showrooms",
    "Hotels and hospitality venues",
    "Educational institutions",
    "Healthcare facilities"
  ];

  const specifications = [
    { label: "Thickness Options", value: "12mm, 15mm, 18mm" },
    { label: "Standard Size", value: "4ft x 8ft, 4ft x 12ft" },
    { label: "Fire Rating", value: "Class A fire resistant" },
    { label: "Installation Time", value: "1-3 days (avg room)" },
    { label: "Warranty", value: "5 years structural" },
    { label: "Pricing", value: "Starting ₹150/sq.ft" }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Gypsum Ceiling Installation Rajkot | Drywall & Plasterboard Services</title>
        <meta name="description" content="Professional gypsum ceiling Rajkot from ₹150/sq.ft. Fire-resistant drywall & plasterboard installation. Smooth finish, 5-year warranty, 1-3 day installation. ISO certified. Get free quote for false ceiling today!" />
        <meta name="keywords" content="gypsum ceiling Rajkot, drywall ceiling Rajkot, plasterboard ceiling Rajkot, false ceiling Rajkot, gypsum board installation Rajkot, fire resistant ceiling Rajkot, smooth ceiling finish Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/services/gypsum-ceiling" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Professional Gypsum Ceiling Installation Rajkot | Drywall Services" />
        <meta property="og:description" content="Expert gypsum ceiling installation in Rajkot. Fire-resistant drywall and plasterboard ceilings with smooth finish. ISO certified contractors." />
        <meta property="og:url" content="https://www.popwale.in/services/gypsum-ceiling" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.popwale.in/assets/hero-gypsum-ceiling.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="primary-gradient text-primary-foreground py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-up space-y-6 lg:space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Gypsum Ceiling Installation - Rajkot
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                  Premium gypsum board ceilings (drywall/plasterboard) in Rajkot offering fire resistance, smooth finishes, and superior durability. Perfect for modern homes and commercial spaces across Gujarat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/quotation" className="btn-hero text-base px-8 py-4 whitespace-nowrap inline-flex items-center justify-center">
                    Get Free Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link to="/gallery" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center">
                    View Gallery
                  </Link>
                </div>
              </div>
              
              <div className="card-gallery animate-scale-in mt-8 lg:mt-0">
                <img 
                  src={gypsumCeilingImage} 
                  alt="Professional gypsum ceiling installation with smooth finish"
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Why Choose Gypsum Ceilings?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Gypsum ceilings combine functionality with aesthetics, offering superior performance and beautiful finishes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card border border-border rounded-[var(--radius-xl)] p-4 sm:p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-muted rounded-[var(--radius-lg)] flex items-center justify-center mx-auto">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Applications & Specifications */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="animate-slide-in">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Perfect For
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Gypsum ceilings are versatile and suitable for various applications:
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
                  Specifications
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
                    Get Custom Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Installation Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional installation ensures optimal performance and longevity of your gypsum ceiling.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Site Assessment", desc: "Detailed measurement and structural evaluation" },
                { step: "2", title: "Framework Setup", desc: "Installing metal framework and support structure" },
                { step: "3", title: "Board Installation", desc: "Precise cutting and mounting of gypsum boards" },
                { step: "4", title: "Finishing", desc: "Joint treatment, priming, and final surface preparation" }
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

export default GypsumCeiling;