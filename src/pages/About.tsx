import { CheckCircle, Users, Award, Target, Clock, Shield, Star, Heart, Lightbulb, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientsCarousel from "@/components/ClientsCarousel";
import GyprocPartnership from "@/components/GyprocPartnership";
import EMISection from "@/components/EMISection";
import Autoplay from "embla-carousel-autoplay";

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayPluginRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

 const testimonials = [
    {
      name: "suresh shiyani",
      rating: 5,
      comment: "POP WALE delivers flawless results at premium rates. Their attention to detail and commitment to excellence make them worth every penny.",
      avatar: "/reviews/1.png"
    },
    {
      name: "Ashutosh Dave Vlogs",
      rating: 5,
      comment: "Superb work",
      avatar: "/reviews/2.png"
    },
    {
      name: "Smit Modi",
      rating: 5,
      comment: "Good job done so far.",
      avatar: "/reviews/3.png"
    },
    {
      name: "parbatsinh gohil",
      rating: 5,
      comment: "Superb finishing - Fully Satisfied - Thank you popwale....",
      avatar: "/reviews/4.png"
    },
    {
      name: "Sunny Tank",
      rating: 5,
      comment: "P.O.P WALE is the best in gypsum ceiling work! Their team is highly professional and skilled, delivering top-quality results every time.",
      avatar: "/reviews/5.png"
    },
    {
      name: "Darshit Chavda",
      rating: 5,
      comment: "POP WALE Thank you... Your work is really greatfull .",
      avatar: "/reviews/6.png"
    },
    {
      name: "Uttam Vasveliya",
      rating: 5,
      comment: "Best work done by POPWALE - Fully Satisfied with their work. Must try their work if you really want best look in Interiors...!",
      avatar: "/reviews/8.png"
    },
    {
      name: "Mv Jadav",
      rating: 5,
      comment: "Super work and good service.",
      avatar: "/reviews/7.png"
    },
    {
      name: "Bharat Lathiya",
      rating: 5,
      comment: "Super work and greet service - Thank you pop wale.",
      avatar: "/reviews/9.png"
    },
    {
      name: "vasveliya kishan",
      rating: 5,
      comment: "Very good work… too expensive but work is like i never assumed …",
      avatar: "/reviews/10.png"
    },
    {
      name: "R.P. Balasara",
      rating: 5,
      comment: "Very nice work - Excellent Work In Owner Too Pop Wale",
      avatar: "/reviews/11.png"
    },
    {
      name: "Sujeetkumar Suman",
      rating: 5,
      comment: "Wow Really Wonderful Work - Thank You So Much - MR:- Pop Wale",
      avatar: "/reviews/12.png"
    },
    {
      name: "Kishan Sanchaniya",
      rating: 5,
      comment: "Super work - Very costly work, but super finishing and nice conversation",
      avatar: "/reviews/13.png"
    },
    {
      name: "Rushirajsinh Vala",
      rating: 5,
      comment: "Nice work and very good service",
      avatar: "/reviews/14.png"
    },
    {
      name: "wevito Branding",
      rating: 5,
      comment: "Best And Professional Service provider In Rajkot.. Higley recommended",
      avatar: "/reviews/15.png"
    },
    {
      name: "Akshay Mahajan",
      rating: 5,
      comment: "nice work thank you POP Wale",
      avatar: "/reviews/16.png"
    },
    {
      name: "Alok Kumar",
      rating: 5,
      comment: "The prompt service I received was a positive experience. I appreciate your assistance.",
      avatar: "/reviews/17.png"
    },
    {
      name: "zala jashpalsinh",
      rating: 5,
      comment: "Very good service",
      avatar: "/reviews/18.png"
    },
    {
      name: "makwana jignesh",
      rating: 5,
      comment: "24/7 service great 👍 work",
      avatar: "/reviews/19.png"
    },
    {
      name: "Tushar Takodra",
      rating: 5,
      comment: "Greatest service with and user friendly behaviour.",
      avatar: "/reviews/20.png"
    },
    {
      name: "Dharmik N vadoliya",
      rating: 5,
      comment: "Most likely work and very nice behaviour",
      avatar: "/reviews/21.png"
    },
    {
      name: "Durgesh Jaiswal",
      rating: 5,
      comment: "Nicework and good quality",
      avatar: "/reviews/22.png"
    },
    {
      name: "Hardik Nadiyapara",
      rating: 5,
      comment: "Best working place for celling work",
      avatar: "/reviews/23.png"
    },
    {
      name: "RADHE RADHE",
      rating: 5,
      comment: "Super work and best price",
      avatar: "/reviews/24.png"
    },
    {
      name: "Sidhantbharthi Goswami",
      rating: 5,
      comment: "Nice work and behaviour",
      avatar: "/reviews/25.png"
    },
    {
      name: "Vadoliya vimal",
      rating: 5,
      comment: "BEST SERVICE PROVIDER IN RAJKOT.",
      avatar: "/reviews/26.png"
    },
    {
      name: "Rajesh Jaiswal",
      rating: 5,
      comment: "Super work",
      avatar: "/reviews/27.png"
    },
    {
      name: "Mayur Prajapati",
      rating: 5,
      comment: "Great service",
      avatar: "/reviews/28.png"
    },
    {
      name: "parth parmar",
      rating: 5,
      comment: "Excellent service",
      avatar: "/reviews/29.png"
    },
    {
      name: "Surya Wooden Furniture",
      rating: 5,
      comment: "super work",
      avatar: "/reviews/30.png"
    },
  ];
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Precision Craftsmanship",
      description: "Every detail matters in our meticulous approach to P.O.P services, ensuring flawless results."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Client-Centric Approach",
      description: "We collaborate closely with our clients to bring their vision to life with personalized solutions."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Quality Excellence",
      description: "We use premium materials and proven techniques to deliver lasting beauty and durability."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "150+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Quality Assurance" }
  ];

  const teamExpertise = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Design Specialists",
      description: "Creative professionals with architectural background and interior design expertise",
      count: "8+ Experts"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Master Craftsmen",
      description: "Skilled artisans with decades of experience in traditional and modern P.O.P techniques",
      count: "12+ Craftsmen"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Quality Inspectors",
      description: "Dedicated quality control team ensuring every project meets our high standards",
      count: "4+ Inspectors"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Safety Coordinators",
      description: "Certified safety professionals managing project safety and compliance",
      count: "3+ Coordinators"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to transform spaces through innovative P.O.P services"
    },
    {
      year: "2020",
      title: "50+ Projects",
      description: "Completed our first 50 projects with 100% customer satisfaction"
    },
    {
      year: "2021",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification for quality management systems"
    },
    {
      year: "2022",
      title: "Regional Expansion",
      description: "Expanded services to 6 major cities across India"
    },
    {
      year: "2023",
      title: "Excellence Awards",
      description: "Received multiple industry awards for craftsmanship and innovation"
    },
    {
      year: "2024",
      title: "500+ Projects",
      description: "Milestone achievement with over 500 successful project completions"
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Customer First",
      description: "Every decision we make is guided by what's best for our customers"
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our work"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Innovation",
      description: "Constantly evolving techniques and designs to stay ahead"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Integrity", 
      description: "Honest, transparent, and ethical in all our dealings"
    },
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      title: "Quality",
      description: "No compromise on quality, from materials to craftsmanship"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Reliability",
      description: "Dependable service delivery within promised timelines"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Popwale - Leading P.O.P Contractors in Rajkot, Gujarat | 500+ Projects Completed</title>
        <meta name="description" content="Discover Popwale's journey as Rajkot's premier P.O.P service provider. ISO 9001:2015 certified with 500+ completed projects across Gujarat. Expert ceiling design & installation in Rajkot since 2019." />
        <meta name="keywords" content="about popwale Rajkot, POP contractors Rajkot Gujarat, interior design company Rajkot, certified P.O.P services Rajkot, ceiling specialists Rajkot, professional contractors Gujarat, ISO certified Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/about" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="About Popwale - Leading P.O.P Contractors in Rajkot, Gujarat | 500+ Projects" />
        <meta property="og:description" content="Discover Popwale's journey as Rajkot's premier P.O.P service provider. ISO certified with 500+ completed projects across Gujarat. Expert ceiling design since 2019." />
        <meta property="og:url" content="https://www.popwale.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Popwale - Leading P.O.P Contractors in Rajkot, Gujarat" />
        <meta name="twitter:description" content="Rajkot's premier P.O.P service provider. ISO certified with 500+ completed projects across Gujarat. Expert ceiling design since 2019." />
        <meta name="twitter:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Popwale",
            "description": "Leading P.O.P contractors in Rajkot, Gujarat specializing in ceiling design, gypsum installation, and decorative elements",
            "url": "https://www.popwale.in",
            "logo": "https://www.popwale.in/popwale-social-logo.jpg",
            "image": "https://www.popwale.in/popwale-social-logo.jpg",
            "foundingDate": "2019",
            "telephone": "+91-99090-94033",
            "email": "info@popwale.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "150 Feet Ring Rd, near The spire, Sheetal Park, Shastri Nagar",
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
            "areaServed": [
              {
                "@type": "City",
                "name": "Rajkot",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Gujarat"
                }
              },
              {
                "@type": "City",
                "name": "Morbi"
              },
              {
                "@type": "City",
                "name": "Jamnagar"
              },
              {
                "@type": "City",
                "name": "Junagadh"
              }
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "ISO 9001:2015 Certified",
                "credentialCategory": "Quality Management System",
                "dateCreated": "2021"
              }
            ],
            "numberOfEmployees": "25+",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": [
              "https://www.facebook.com/popwale",
              "https://www.instagram.com/popwale",
              "https://www.youtube.com/@popwale"
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
              About Popwale - Rajkot's Premier P.O.P Specialists
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              Crafting exceptional P.O.P services and ceiling designs across Rajkot and Gujarat with passion, 
              precision, and unmatched expertise for over 5 years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Journey in Rajkot
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in Rajkot, Gujarat with a vision to transform spaces through innovative P.O.P services, 
                  Popwale has grown from a small team of local craftsmen to Gujarat's leading name in 
                  architectural ceiling design and premium plaster work.
                </p>
                <p>
                  Our journey began in the heart of Rajkot with a simple belief: that every space in Gujarat deserves to be 
                  extraordinary. Today, we continue to push the boundaries of creativity across Rajkot, Morbi, Jamnagar and beyond,
                  while maintaining the highest standards of quality and craftsmanship.
                </p>
                <p>
                  From our Rajkot headquarters, we specialize in creating unique ceiling designs, decorative wall elements, 
                  and custom P.O.P installations that reflect our Gujarati clients' personalities 
                  and enhance their living experiences throughout the region.
                </p>
              </div>
            </div>
            <div className="card-elegant animate-scale-in">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Popwale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-service animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why Choose Popwale?
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover what sets us apart in the world of P.O.P services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Expert craftsmen with years of specialized experience",
                "Premium quality materials and proven techniques",
                "Customized solutions tailored to your unique vision",
                "Timely project completion with attention to detail",
                "Competitive pricing with transparent quotations",
                "Comprehensive after-service support and warranty"
              ].map((point, index) => (
                <div key={index} className="flex items-start space-x-3 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Expertise - Enhanced Design */}
      <section className="section-padding bg-muted relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-accent"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-secondary"></div>
        </div>
        
        <div className="container-curved relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A dedicated team of professionals bringing diverse expertise and years of experience to every project we undertake
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamExpertise.map((team, index) => (
               <div 
                key={index} 
                className="group relative bg-card border border-border rounded-[var(--radius-xl)] p-4 sm:p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 animate-fade-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Header with Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {team.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {team.title}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    {team.count}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {team.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          {/* Bottom Statistics */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
                <div className="text-2xl font-bold text-primary mb-1">24+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years Combined Experience</div>
              </div>
              <div className="animate-fade-up" style={{ animationDelay: "0.7s" }}>
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Certified Professionals</div>
              </div>
              <div className="animate-fade-up" style={{ animationDelay: "0.8s" }}>
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-16">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Clients
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by leading residential, commercial, and hospitality projects across India
            </p>
          </div>

          <ClientsCarousel />
        </div>
      </section>

      {/* EMI Section */}
      <EMISection />

      {/* Company Timeline */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth and success story
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="card-service animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl font-bold text-primary mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The fundamental principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="flex items-start space-x-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gyproc Partnership */}
      <GyprocPartnership variant="about" className="section-padding bg-muted" />

      <TestimonialsSection 
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
        isMobile={isMobile}
        autoplayPluginRef={autoplayPluginRef}
      />
    </div>
    </>
  );
};

export default About;
