import { ArrowRight, CheckCircle, Users, Award, Star, Phone, Shield, Clock, Target, Lightbulb, Building, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import HeroSlider from "@/components/HeroSlider";
// Using uploaded stretch ceiling image instead
import serviceDecorative from "@/assets/service-decorative.jpg";
import TestimonialsSection from "@/components/TestimonialsSection";
import GyprocPartnership from "@/components/GyprocPartnership";
import EMISection from "@/components/EMISection";
import ClientsCarousel from "@/components/ClientsCarousel";
import { Dock } from "@/components/ui/dock";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Autoplay from "embla-carousel-autoplay";
const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayPluginRef = useRef(Autoplay({
    delay: 4000,
    stopOnInteraction: true
  }));
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const services = [{
    title: "Ceiling Design & Installation",
    description: "Transform your ceilings with innovative P.O.P designs, false ceiling installations, decorative patterns, and integrated LED lighting solutions for modern homes and offices.",
    image: "/uploads/78b6c443-1d1c-4426-b4cb-9496783482cc.png",
    link: "/services/ceiling-design",
    features: ["False Ceiling", "LED Integration", "Acoustic Solutions", "Custom Patterns"]
  }];
  const features = [{
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Certified Excellence",
    description: "ISO 9001:2015 certified with industry-recognized quality standards and professional accreditations"
  }, {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Expert Craftsmen",
    description: "Team of skilled professionals with 5+ years specialized experience in P.O.P work and interior design"
  }, {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Quality Assured",
    description: "Premium ISI marked materials, proven techniques, and multi-level quality checks for lasting results"
  }, {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Fully Insured",
    description: "Comprehensive insurance coverage for all projects ensuring complete peace of mind for our clients"
  }, {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Timely Delivery",
    description: "Committed to project timelines with efficient planning and execution without compromising quality"
  }, {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Custom Solutions",
    description: "Tailored designs and personalized solutions to match your unique vision and space requirements"
  }];
  const stats = [{
    number: "500+",
    label: "Projects Completed"
  }, {
    number: "150+",
    label: "Happy Clients"
  }, {
    number: "15+",
    label: "Years Experience"
  }, {
    number: "100%",
    label: "Quality Guarantee"
  }];
  const testimonials = [{
    name: "suresh shiyani",
    rating: 5,
    comment: "POP WALE delivers flawless results at premium rates. Their attention to detail and commitment to excellence make them worth every penny.",
    avatar: "/reviews/1.png"
  }, {
    name: "Ashutosh Dave Vlogs",
    rating: 5,
    comment: "Superb work",
    avatar: "/reviews/2.png"
  }, {
    name: "Smit Modi",
    rating: 5,
    comment: "Good job done so far.",
    avatar: "/reviews/3.png"
  }, {
    name: "parbatsinh gohil",
    rating: 5,
    comment: "Superb finishing - Fully Satisfied - Thank you popwale....",
    avatar: "/reviews/4.png"
  }, {
    name: "Sunny Tank",
    rating: 5,
    comment: "P.O.P WALE is the best in gypsum ceiling work! Their team is highly professional and skilled, delivering top-quality results every time.",
    avatar: "/reviews/5.png"
  }, {
    name: "Darshit Chavda",
    rating: 5,
    comment: "POP WALE Thank you... Your work is really greatfull .",
    avatar: "/reviews/6.png"
  }, {
    name: "Uttam Vasveliya",
    rating: 5,
    comment: "Best work done by POPWALE - Fully Satisfied with their work. Must try their work if you really want best look in Interiors...!",
    avatar: "/reviews/8.png"
  }, {
    name: "Mv Jadav",
    rating: 5,
    comment: "Super work and good service.",
    avatar: "/reviews/7.png"
  }, {
    name: "Bharat Lathiya",
    rating: 5,
    comment: "Super work and greet service - Thank you pop wale.",
    avatar: "/reviews/9.png"
  }, {
    name: "vasveliya kishan",
    rating: 5,
    comment: "Very good work… too expensive but work is like i never assumed …",
    avatar: "/reviews/10.png"
  }, {
    name: "R.P. Balasara",
    rating: 5,
    comment: "Very nice work - Excellent Work In Owner Too Pop Wale",
    avatar: "/reviews/11.png"
  }, {
    name: "Sujeetkumar Suman",
    rating: 5,
    comment: "Wow Really Wonderful Work - Thank You So Much - MR:- Pop Wale",
    avatar: "/reviews/12.png"
  }, {
    name: "Kishan Sanchaniya",
    rating: 5,
    comment: "Super work - Very costly work, but super finishing and nice conversation",
    avatar: "/reviews/13.png"
  }, {
    name: "Rushirajsinh Vala",
    rating: 5,
    comment: "Nice work and very good service",
    avatar: "/reviews/14.png"
  }, {
    name: "wevito Branding",
    rating: 5,
    comment: "Best And Professional Service provider In Rajkot.. Higley recommended",
    avatar: "/reviews/15.png"
  }, {
    name: "Akshay Mahajan",
    rating: 5,
    comment: "nice work thank you POP Wale",
    avatar: "/reviews/16.png"
  }, {
    name: "Alok Kumar",
    rating: 5,
    comment: "The prompt service I received was a positive experience. I appreciate your assistance.",
    avatar: "/reviews/17.png"
  }, {
    name: "zala jashpalsinh",
    rating: 5,
    comment: "Very good service",
    avatar: "/reviews/18.png"
  }, {
    name: "makwana jignesh",
    rating: 5,
    comment: "24/7 service great 👍 work",
    avatar: "/reviews/19.png"
  }, {
    name: "Tushar Takodra",
    rating: 5,
    comment: "Greatest service with and user friendly behaviour.",
    avatar: "/reviews/20.png"
  }, {
    name: "Dharmik N vadoliya",
    rating: 5,
    comment: "Most likely work and very nice behaviour",
    avatar: "/reviews/21.png"
  }, {
    name: "Durgesh Jaiswal",
    rating: 5,
    comment: "Nicework and good quality",
    avatar: "/reviews/22.png"
  }, {
    name: "Hardik Nadiyapara",
    rating: 5,
    comment: "Best working place for celling work",
    avatar: "/reviews/23.png"
  }, {
    name: "RADHE RADHE",
    rating: 5,
    comment: "Super work and best price",
    avatar: "/reviews/24.png"
  }, {
    name: "Sidhantbharthi Goswami",
    rating: 5,
    comment: "Nice work and behaviour",
    avatar: "/reviews/25.png"
  }, {
    name: "Vadoliya vimal",
    rating: 5,
    comment: "BEST SERVICE PROVIDER IN RAJKOT.",
    avatar: "/reviews/26.png"
  }, {
    name: "Rajesh Jaiswal",
    rating: 5,
    comment: "Super work",
    avatar: "/reviews/27.png"
  }, {
    name: "Mayur Prajapati",
    rating: 5,
    comment: "Great service",
    avatar: "/reviews/28.png"
  }, {
    name: "parth parmar",
    rating: 5,
    comment: "Excellent service",
    avatar: "/reviews/29.png"
  }, {
    name: "Surya Wooden Furniture",
    rating: 5,
    comment: "super work",
    avatar: "/reviews/30.png"
  }];
  const processSteps = [{
    step: "01",
    title: "Consultation & Design",
    description: "Free on-site consultation, requirement analysis, and custom design creation based on your vision and space."
  }, {
    step: "02",
    title: "Material Selection",
    description: "Premium quality material selection with samples, cost estimation, and detailed project planning."
  }, {
    step: "03",
    title: "Professional Installation",
    description: "Expert installation by certified craftsmen with regular quality checks and progress updates."
  }, {
    step: "04",
    title: "Final Inspection",
    description: "Thorough quality inspection, final touches, cleanup, and handover with maintenance guidelines."
  }];
  const whyChooseUs = [{
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    title: "Innovative Designs",
    description: "Creative and modern designs that reflect current trends while maintaining timeless appeal."
  }, {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "5-Year Warranty",
    description: "Comprehensive warranty on all installations with free maintenance support."
  }, {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Quick Turnaround",
    description: "Efficient project completion within agreed timelines without quality compromise."
  }, {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden costs and flexible payment options."
  }];
  return <>
      <Helmet>
        <title>Popwale - Expert P.O.P Services in Rajkot | #1 Ceiling Design Contractors Gujarat</title>
        <meta name="description" content="Rajkot's #1 P.O.P ceiling contractors with 500+ projects. Expert gypsum, grid, stretch & soundproof installations. ISO certified, EMI available, free quotes in 24hrs. Transform your home or office with premium ceilings!" />
        <meta name="keywords" content="POP services Rajkot, ceiling design Rajkot, gypsum ceiling contractors Rajkot, false ceiling Rajkot, plaster of paris work Rajkot, interior design services Rajkot, ceiling installation Rajkot, P.O.P contractors Gujarat, decorative elements Rajkot, professional ceiling work Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/" />

        {/* Enhanced Social Media Meta Tags */}
        <meta property="og:title" content="Popwale - Expert P.O.P Services in Rajkot | #1 Ceiling Design Contractors" />
        <meta property="og:description" content="Leading P.O.P services in Rajkot with 500+ projects completed. Expert ceiling design, gypsum installation & decorative elements. ISO certified quality. Get your free quote today!" />
        <meta property="og:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.popwale.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Popwale - Expert P.O.P Services in Rajkot | #1 Ceiling Design Contractors" />
        <meta name="twitter:description" content="Leading P.O.P services in Rajkot with 500+ projects completed. Expert ceiling design, gypsum installation & decorative elements. ISO certified quality." />
        <meta name="twitter:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        
        <meta name="author" content="Popwale" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Popwale",
          "description": "Leading P.O.P services in Rajkot, Gujarat specializing in ceiling design, gypsum installation, and decorative elements",
          "url": "https://www.popwale.in",
          "logo": "https://www.popwale.in/popwale-social-logo.jpg",
          "image": "https://www.popwale.in/popwale-social-logo.jpg",
          "telephone": "+91-99090-94033",
          "email": "info@popwale.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "150 Feet Ring Rd, near The spire, Sheetal Park",
            "addressLocality": "Rajkot",
            "addressRegion": "Gujarat",
            "postalCode": "360007",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "22.3039",
            "longitude": "70.8022"
          },
          "areaServed": [{
            "@type": "City",
            "name": "Rajkot"
          }, {
            "@type": "City",
            "name": "Morbi"
          }, {
            "@type": "City",
            "name": "Jamnagar"
          }, {
            "@type": "City",
            "name": "Junagadh"
          }],
          "serviceType": ["P.O.P Services", "Ceiling Design", "Gypsum Installation", "Grid Ceiling", "Soundproof Ceiling", "PVC Ceiling", "Stretch Ceiling", "Decorative Elements", "Interior Design"],
          "foundingDate": "2019",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasCredential": [{
            "@type": "EducationalOccupationalCredential",
            "name": "ISO 9001:2015 Certified"
          }],
          "sameAs": ["https://www.facebook.com/popwale", "https://www.instagram.com/popwale", "https://www.youtube.com/@popwale"]
        })}
        </script>
        
        {/* Reviews Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "Organization",
            "name": "Popwale"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "name": "Excellent P.O.P Services in Rajkot",
          "author": {
            "@type": "Person",
            "name": "Sunny Tank"
          },
          "reviewBody": "P.O.P WALE is the best in gypsum ceiling work! Their team is highly professional and skilled, delivering top-quality results every time.",
          "publisher": {
            "@type": "Organization",
            "name": "Google Reviews"
          }
        })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <HeroSlider />
        </div>
        
        {/* Logo positioned in hero section only */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-30">
          <div className="bg-black/70 backdrop-blur-sm border border-primary/30 rounded-lg sm:rounded-xl p-1.5 sm:p-3 hover:bg-black/80 transition-all duration-300 shadow-lg">
            <img src="/uploads/d945380b-ff77-456a-b9f6-8304efada3d1.png" alt="P.O.P Wale Logo" className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto object-contain" />
          </div>
        </div>
        
        {/* Dark Overlay for Content Readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="container relative z-20 text-center max-w-4xl mx-auto px-6 pt-28 sm:pt-20">

          {/* Main Headline */}
          <h1 className="font-elegant text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
          }}>
            Popwale
            
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed font-medium" style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
          }}>
            Transform your space with expert P.O.P services in Rajkot. Professional ceiling design, gypsum installation & decorative elements with 
            <span className="text-white font-semibold" style={{
              textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
            }}> ISO certified quality</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/quotation" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg">
              Get Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/gallery" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105">
              View Work
            </Link>
          </div>

          {/* Interactive Dock */}
          <div className="flex justify-center mt-8">
            <Dock items={[{
              icon: <Instagram className="w-6 h-6 text-white hover:text-pink-300 transition-colors duration-300" />,
              label: "Instagram",
              onClick: () => window.open('https://www.instagram.com/popwale_in/', '_blank')
            }, {
              icon: <Facebook className="w-6 h-6 text-white hover:text-blue-300 transition-colors duration-300" />,
              label: "Facebook",
              onClick: () => window.open('https://www.facebook.com/popwale.in/', '_blank')
            }, {
              icon: <WhatsAppIcon className="w-6 h-6 text-white hover:text-green-300 transition-colors duration-300" />,
              label: "WhatsApp",
              onClick: () => window.open('https://wa.me/919909094033', '_blank')
            }, {
              icon: <Youtube className="w-6 h-6 text-white hover:text-red-300 transition-colors duration-300" />,
              label: "YouTube",
              onClick: () => window.open('https://www.youtube.com/channel/UC8lyfQ9Mc4fDzK0dW68TPxg', '_blank')
            }]} panelHeight={60} baseItemSize={48} magnification={64} className="border-white/30 bg-white/10 backdrop-blur-md" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          
        </div>
      </section>

      {/* Stats Section */}
      

      {/* About Section */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Rajkot's Premier P.O.P Service Provider
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 5 years of expertise in plaster of paris services across Rajkot and Gujarat, Popwale has 
                established itself as the most trusted name in architectural design and custom ceiling installations. 
                We specialize in creating unique ceiling designs, decorative wall elements, 
                and ornamental pieces that transform ordinary spaces in Rajkot into extraordinary environments.
              </p>
              <div className="space-y-4 mb-8">
                {["Premium quality materials and proven techniques", "Customized solutions tailored to your vision", "Expert craftsmen with specialized experience"].map((point, index) => <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </div>)}
              </div>
              <Link to="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
              {features.map((feature, index) => <div key={index} className="card-service text-center" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="section-padding bg-card">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading companies and prestigious projects across India
            </p>
          </div>
          <ClientsCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive P.O.P solutions designed to enhance your spaces with elegance and sophistication
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              {services.map((service, index) => <Link key={index} to={service.link} className="group block">
                  <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 animate-fade-up">
                    <div className="relative">
                      <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-primary font-medium">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>)}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-hero inline-flex items-center justify-center">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to deliver exceptional P.O.P services from concept to completion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => <div key={index} className="text-center animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* EMI Section */}
      <EMISection />

      {/* Why Choose Us */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-8 bg-muted">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Choose Popwale?
            </h2>
            <p className="text-xl text-muted-foreground">
              What sets us apart in the P.O.P services industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => <div key={index} className="card-service text-center animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="mb-4 flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} currentTestimonial={currentTestimonial} setCurrentTestimonial={setCurrentTestimonial} isMobile={isMobile} autoplayPluginRef={autoplayPluginRef} />

      {/* Gyproc Partnership */}
      <GyprocPartnership variant="home" className="section-padding" />

      {/* CTA Section */}
      <section className="section-padding bg-secondary text-secondary-foreground rounded-curved-xl mx-6 sm:mx-8 lg:mx-12 my-8">
        <div className="container-curved">
          <div className="text-center max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90 leading-relaxed">
              Contact us today for a free consultation and discover how our expert P.O.P services 
              can bring your vision to life with precision and artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quotation" className="bg-accent text-accent-foreground px-8 py-4 rounded-[var(--radius-lg)] font-semibold hover:bg-accent/80 transition-all duration-200">
                Get Free Quote
              </Link>
              <a href="tel:+91XXXXXXXXX" className="bg-primary-foreground text-primary px-8 py-4 rounded-[var(--radius-lg)] font-semibold hover:bg-primary-foreground/90 transition-all duration-200 flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>;
};
export default Index;