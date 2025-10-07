import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import WhatsAppIcon from "./ui/WhatsAppIcon";

const Footer = () => {
  const quickLinks = [{
    label: "Home",
    to: "/",
    description: "Return to homepage"
  }, {
    label: "About Us",
    to: "/about",
    description: "Learn about our story and expertise"
  }, {
    label: "Services",
    to: "/services",
    description: "Explore our complete range of services"
  }, {
    label: "Gallery",
    to: "/gallery",
    description: "View our completed projects"
  }, {
    label: "Certifications",
    to: "/certifications",
    description: "View our quality certifications and awards"
  }, {
    label: "Get Quote",
    to: "/quotation",
    description: "Request a free quotation for your project"
  }, {
    label: "Contact Us",
    to: "/contact",
    description: "Get in touch for your project needs"
  }];

  const services = [{
    name: "Grid Ceiling Systems",
    to: "/services/grid-ceiling",
    description: "Professional suspended ceiling installations"
  }, {
    name: "Gypsum Board Partitions",
    to: "/services/gypsum-ceiling",
    description: "Premium gypsum ceiling solutions"
  }, {
    name: "Stretch Ceiling Solutions",
    to: "/services/stretch-ceiling",
    description: "Modern stretch ceiling systems"
  }, {
    name: "Soffit Ceiling Panels",
    to: "/services/soffit-ceiling",
    description: "Waterproof PVC ceiling panels"
  }, {
    name: "Punning Work",
    to: "/services/punning-work",
    description: "Decorative plaster art and designs"
  }, {
    name: "Custom P.O.P Work",
    to: "/services/ceiling-design",
    description: "Custom ceiling design and installation"
  }];

  const legalLinks = [{
    label: "Privacy Policy",
    to: "/privacy",
    description: "How we protect your data"
  }, {
    label: "Terms of Service",
    to: "/terms",
    description: "Terms and conditions of service"
  }];

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Popwale",
          "url": "https://www.popwale.in",
          "logo": "https://www.popwale.in/popwale-social-logo.jpg",
          "description": "Leading P.O.P services and ceiling design contractors in Gujarat, specializing in gypsum ceilings, stretch ceilings, and decorative plaster work",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "150 Feet Ring Rd, Near The Spire, Sheetal Park",
            "addressLocality": "Rajkot",
            "addressRegion": "Gujarat",
            "postalCode": "360007",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-99090-94033",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/popwale.in",
            "https://www.instagram.com/popwale_in",
            "https://wa.me/919909094033",
            "https://www.youtube.com/channel/UC8lyfQ9Mc4fDzK0dW68TPxg"
          ]
        })}
      </script>

      <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10" role="contentinfo">
        <div className="container-curved py-16 lg:py-20">
          {/* Brand & Social Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="text-3xl font-bold text-accent-light font-elegant">
                  Popwale
                </div>
                <p className="text-primary-foreground/80 leading-relaxed text-base max-w-md">
                  Transform your spaces with exceptional P.O.P designs and premium ceiling solutions. 
                  Crafting dream interiors with precision, creativity, and unmatched quality since 2019.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/popwale_in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-2 rounded-lg bg-primary-foreground/5 hover:bg-accent-light/10 transition-all duration-200 hover:scale-110"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent-light transition-colors" />
                  </a>
                  <a 
                    href="https://www.facebook.com/popwale.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-2 rounded-lg bg-primary-foreground/5 hover:bg-accent-light/10 transition-all duration-200 hover:scale-110"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent-light transition-colors" />
                  </a>
                  <a 
                    href="https://wa.me/919909094033" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-2 rounded-lg bg-primary-foreground/5 hover:bg-accent-light/10 transition-all duration-200 hover:scale-110"
                    aria-label="Contact us on WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent-light transition-colors" />
                  </a>
                  <a 
                    href="https://www.youtube.com/channel/UC8lyfQ9Mc4fDzK0dW68TPxg" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-2 rounded-lg bg-primary-foreground/5 hover:bg-accent-light/10 transition-all duration-200 hover:scale-110"
                    aria-label="Subscribe to our YouTube channel"
                  >
                    <Youtube className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent-light transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-accent-light border-b border-primary-foreground/10 pb-2">
                Quick Links
              </h3>
              <nav className="space-y-3" role="navigation" aria-label="Footer quick links">
                {quickLinks.map((link) => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className="group block text-primary-foreground/80 hover:text-accent-light transition-colors duration-200 text-sm"
                    title={link.description}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-accent-light border-b border-primary-foreground/10 pb-2">
                Our Services
              </h3>
              <nav className="space-y-3" role="navigation" aria-label="Footer services links">
                {services.map((service) => (
                  <Link 
                    key={service.to} 
                    to={service.to} 
                    className="group block text-primary-foreground/80 hover:text-accent-light transition-colors duration-200 text-sm"
                    title={service.description}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-accent-light border-b border-primary-foreground/10 pb-2">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <Phone className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <a 
                      href="tel:+919909094033" 
                      className="text-primary-foreground/80 hover:text-accent-light transition-colors duration-200 block text-sm"
                      aria-label="Call us at +91 99090 94033"
                    >
                      +91 99090 94033
                    </a>
                    <span className="text-xs text-primary-foreground/60">Mon-Sat: 9AM-7PM</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <Mail className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <a 
                      href="mailto:info@popwale.in" 
                      className="text-primary-foreground/80 hover:text-accent-light transition-colors duration-200 block text-sm"
                      aria-label="Email us at info@popwale.in"
                    >
                      info@popwale.in
                    </a>
                    <span className="text-xs text-primary-foreground/60">24/7 Support</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <div className="text-primary-foreground/80 text-sm leading-relaxed">
                    <div className="font-medium">150 Feet Ring Rd</div>
                    <div className="text-xs">Near The Spire, Sheetal Park</div>
                    <div className="text-xs">Shastri Nagar, Rajkot</div>
                    <div className="text-xs font-medium text-accent-light mt-1">Gujarat - 360007</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-primary-foreground/70 text-sm text-center md:text-left">
                 {currentYear} Popwale. All rights reserved. | 
                <span className="text-accent-light">Crafting Dream Interiors Since 2019</span>
              </div>
              
              <div className="text-primary-foreground/60 text-sm text-center md:text-right">
                Made with  by 
                <a 
                  href="https://www.somethingmedia.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent-light font-medium hover:text-accent-light/80 transition-colors duration-200"
                  aria-label="Visit Something Media website"
                >
                  Something Media
                </a>
              </div>
              
              <nav className="flex flex-wrap justify-center md:justify-end space-x-6" role="navigation" aria-label="Footer legal links">
                {legalLinks.map((link) => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className="text-primary-foreground/70 hover:text-accent-light transition-colors duration-200 text-sm"
                    title={link.description}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
