import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Award, Users, CheckCircle, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TestimonialsSection from "@/components/TestimonialsSection";
import GyprocPartnership from "@/components/GyprocPartnership";
import Autoplay from "embla-carousel-autoplay";
const Contact = () => {
  const {
    toast
  } = useToast();
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    const whatsappURL = `https://wa.me/919909094033?text=${whatsappMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    toast({
      title: "Redirecting to WhatsApp!",
      description: "Complete your message submission via WhatsApp."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  const contactInfo = [{
    icon: <Phone className="w-6 h-6 text-primary" />,
    title: "Phone Number",
    details: ["+91 99090 94033"],
    isClickable: true,
    link: "tel:+919909094033"
  }, {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: "Email Address",
    details: ["info@popwale.in"]
  }, {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Office Address",
    details: ["150 Feet Ring Rd, near The spire", "Sheetal Park, Shastri Nagar", "Dharam Nagar, Rajkot, Gujarat 360007"]
  }];
  const serviceAreas = ["Rajkot", "Morbi", "Jamnagar", "Junagadh"];
  const supportInfo = [{
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Expert Support",
    description: "Professional guidance from initial consultation to project completion and beyond"
  }, {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Dedicated Team",
    description: "Assigned project manager for personalized attention and seamless communication"
  }, {
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: "Quality Assurance",
    description: "Comprehensive quality checks and satisfaction guarantee on all projects"
  }, {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Multi-City Coverage",
    description: "Services available across major Indian cities with local expertise"
  }];
  const responseTime = [{
    type: "Phone Calls",
    time: "Within 30 minutes",
    description: "Immediate response for urgent inquiries and consultations"
  }, {
    type: "Email Queries",
    time: "Within 2 hours",
    description: "Detailed responses with project information and quotations"
  }, {
    type: "Site Visits",
    time: "Within 24 hours",
    description: "On-site consultation and requirement analysis scheduling"
  }, {
    type: "Quote Delivery",
    time: "Within 48 hours",
    description: "Comprehensive quotation with detailed project breakdown"
  }];
  return <>
      <Helmet>
        <title>Contact Popwale - P.O.P Services in Rajkot | Get Free Quote & Expert Consultation</title>
        <meta name="description" content="Reach Popwale Rajkot for P.O.P ceiling services. Call +91-99090-94033 for free quotes & site visits. Available in Rajkot, Morbi, Jamnagar. 24-hour response time. Book your consultation now!" />
        <meta name="keywords" content="contact popwale Rajkot, POP services consultation Rajkot, free quote ceiling design Rajkot, site visit Rajkot, project discussion Rajkot, customer support Rajkot, interior design consultation Rajkot, P.O.P contractors contact Gujarat" />
        <link rel="canonical" href="https://popwale.in/contact" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Popwale - P.O.P Services in Rajkot | Get Free Quote & Expert Consultation" />
        <meta property="og:description" content="Contact Popwale for expert P.O.P services in Rajkot. Free quotes, site visits & project consultations. Serving Rajkot & surrounding areas with professional ceiling design." />
        <meta property="og:url" content="https://popwale.in/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://popwale.in/popwale-social-logo.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Popwale - P.O.P Services in Rajkot | Get Free Quote" />
        <meta name="twitter:description" content="Contact Popwale for expert P.O.P services in Rajkot. Free quotes, site visits & project consultations. Professional ceiling design services." />
        <meta name="twitter:image" content="https://popwale.in/popwale-social-logo.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Popwale",
            "description": "Leading P.O.P services provider in Rajkot specializing in ceiling design, gypsum installation, and decorative elements",
            "image": "https://popwale.in/popwale-social-logo.jpg",
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
            "telephone": "+91-99090-94033",
            "email": "info@popwale.in",
            "url": "https://popwale.in",
            "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
            "areaServed": [
              "Rajkot",
              "Morbi", 
              "Jamnagar",
              "Junagadh"
            ],
            "serviceType": [
              "P.O.P Services",
              "Ceiling Design",
              "Gypsum Installation",
              "Interior Design"
            ]
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
                "name": "What P.O.P services do you provide in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide comprehensive P.O.P services in Rajkot including ceiling design, gypsum installation, grid ceiling systems, soundproof ceilings, PVC ceilings, stretch ceilings, and decorative elements for both residential and commercial spaces."
                }
              },
              {
                "@type": "Question", 
                "name": "Do you provide free consultation and quotes in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide free consultation and quotes for all P.O.P services in Rajkot. Our experts will visit your location, assess your requirements, and provide detailed quotations with no hidden costs."
                }
              },
              {
                "@type": "Question",
                "name": "Which areas in Gujarat do you serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We primarily serve Rajkot and surrounding areas including Morbi, Jamnagar, and Junagadh. Contact us to confirm service availability in your specific location."
                }
              },
              {
                "@type": "Question",
                "name": "How long does P.O.P ceiling installation take in Rajkot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Installation time depends on the project size and complexity. Typically, a standard room ceiling takes 2-5 days. We provide detailed timelines during the consultation phase and ensure timely completion."
                }
              }
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
              Contact Popwale Rajkot
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              Ready to transform your space with expert P.O.P services in Rajkot? Get in touch with our certified professionals 
              for consultation, quotes, or any questions about our ceiling design services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Multiple ways to reach us for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => <div key={index} className="card-service text-center animate-fade-up h-full flex flex-col" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="mb-6 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2 flex-grow flex flex-col justify-center">
                  {info.details.map((detail, idx) => info.isClickable ? <a key={idx} href={info.link} className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer block font-medium">
                        {detail}
                      </a> : <div key={idx} className="text-sm text-muted-foreground leading-relaxed">
                        {detail}
                      </div>)}
                </div>
              </div>)}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="card-elegant animate-slide-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h3>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll respond promptly
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))} required className="rounded-curved" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => setFormData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))} required className="rounded-curved" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={formData.phone} onChange={e => setFormData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))} className="rounded-curved" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={value => setFormData(prev => ({
                    ...prev,
                    subject: value
                  }))}>
                    <SelectTrigger className="rounded-curved">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Request Quote</SelectItem>
                      <SelectItem value="consultation">Design Consultation</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="partnership">Business Partnership</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" value={formData.message} onChange={e => setFormData(prev => ({
                    ...prev,
                    message: e.target.value
                  }))} placeholder="Tell us about your project or inquiry..." required className="rounded-curved min-h-[120px]" />
                </div>

                <Button type="submit" className="w-full btn-hero">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Service Areas */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="card-gallery animate-scale-in">
                <div className="bg-muted h-80 flex items-center justify-center rounded-curved-xl">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h4 className="text-lg font-semibold mb-2">Find Us Here</h4>
                    <p>Interactive map will be embedded here</p>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="card-elegant animate-fade-up">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Service Areas
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {serviceAreas.map((area, index) => <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-muted-foreground">{area}</span>
                    </div>)}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Don't see your area listed? Contact us to discuss service availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Information */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Customer Support Excellence
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive support throughout your P.O.P service journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportInfo.map((info, index) => <div key={index} className="card-service text-center animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {info.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {info.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Response Time Commitments */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Response Time Commitments
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick and efficient responses to ensure your project moves forward smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {responseTime.map((response, index) => <div key={index} className="card-elegant text-center animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {response.type}
                </h3>
                <div className="text-2xl font-bold text-primary mb-3">
                  {response.time}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {response.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Google Reviews Highlight */}
      <section className="py-12">
        <div className="container-curved">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative text-center border border-white/20 shadow-2xl backdrop-blur-sm p-8 rounded-curved-xl overflow-hidden" style={{
              background: 'linear-gradient(135deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)'
            }}>
              
              {/* Improved Google Logo */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-white/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold" style={{
                        color: '#4285F4'
                      }}>G</span>
                      <span className="text-2xl font-bold" style={{
                        color: '#EA4335'
                      }}>o</span>
                      <span className="text-2xl font-bold" style={{
                        color: '#FBBC05'
                      }}>o</span>
                      <span className="text-2xl font-bold" style={{
                        color: '#4285F4'
                      }}>g</span>
                      <span className="text-2xl font-bold" style={{
                        color: '#34A853'
                      }}>l</span>
                      <span className="text-2xl font-bold" style={{
                        color: '#EA4335'
                      }}>e</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-700">Reviews</span>
                  </div>
                </div>
              </div>

              {/* Compact Rating Display */}
              <div className="mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="flex space-x-0.5 mr-2">
                    {[1, 2, 3, 4, 5].map(star => <div key={star} className="w-5 h-5 text-yellow-300">
                        ⭐
                      </div>)}
                  </div>
                  <span className="text-2xl font-bold text-white">4.9</span>
                </div>
                <p className="text-sm text-white/90">
                  Based on <span className="font-semibold text-white">150+ verified reviews</span>
                </p>
              </div>

              {/* Compact Message */}
              <div className="bg-white/20 backdrop-blur-md rounded-curved p-4 mb-6 border border-white/30">
                <h3 className="text-lg font-bold text-white mb-2">
                  Share Your Experience!
                </h3>
                <p className="text-sm text-white/90">
                  Help others find quality P.O.P services by sharing your review.
                </p>
              </div>

              {/* Compact CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                <a href="https://search.google.com/local/writereview?placeid=ChIJZb2-xGyB0UQR0Hb8JshahZo" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-800 hover:bg-white/90 px-6 py-3 rounded-curved text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group border border-white/20">
                  <span className="mr-2">⭐</span>
                  Write Review
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
                
                
              </div>

              {/* Compact Trust Indicators */}
              <div className="pt-4 border-t border-white/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">99%</div>
                    <div className="text-xs text-white/80">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">150+</div>
                    <div className="text-xs text-white/80">Reviews</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">24h</div>
                    <div className="text-xs text-white/80">Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <TestimonialsSection testimonials={testimonials} currentTestimonial={currentTestimonial} setCurrentTestimonial={setCurrentTestimonial} isMobile={isMobile} autoplayPluginRef={autoplayPluginRef} />

      {/* Gyproc Partnership */}
      <GyprocPartnership variant="contact" className="section-padding" />

      {/* Quick Contact CTA */}
      <section className="py-12">
        <div className="container-curved">
          <div className="card-elegant text-center max-w-3xl mx-auto">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For urgent inquiries or immediate assistance, call us directly. 
              Our team is ready to help with your P.O.P service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="min-w-[160px]">
                <a href="tel:+91XXXXXXXXX">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>;
};
export default Contact;