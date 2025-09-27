import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import WhatsAppIcon from "./ui/WhatsAppIcon";
const Footer = () => {
  const quickLinks = [{
    label: "About Us",
    to: "/about"
  }, {
    label: "Services",
    to: "/services"
  }, {
    label: "Gallery",
    to: "/gallery"
  }, {
    label: "Contact Us",
    to: "/contact"
  }];
  return <footer className="bg-primary text-primary-foreground">
      <div className="container-curved section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="text-2xl font-bold text-accent-light">
              Popwale
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">Transform your spaces with exceptional P.O.P designs. We bring precision, creativity, and unmatched quality to every project, creating dream interiors that reflect your style and vision.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent-light transition-colors">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent-light transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map(({
              label,
              to
            }) => <Link key={label} to={to} className="flex items-center text-primary-foreground/80 hover:text-accent-light transition-colors group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  {label}
                </Link>)}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="space-y-3">
              <Link to="/services/grid-ceiling" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                Grid Ceiling Systems
              </Link>
              <Link to="/services/gypsum-ceiling" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                Gypsum Board Partitions
              </Link>
              <Link to="/services/stretch-ceiling" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                Stretch Ceiling Solutions
              </Link>
              <Link to="/services/pvc-ceiling" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                PVC Ceiling Panels
              </Link>
              <Link to="/services/soundproof-ceiling" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                Sound Proof Ceilings
              </Link>
              <Link to="/services/ceiling-design" className="block text-primary-foreground/80 hover:text-accent-light transition-colors">
                Custom P.O.P Work
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" />
              <div className="text-primary-foreground/80">
                <a href="tel:+919909094033" className="hover:text-accent-light transition-colors">
                  +91 99090 94033
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" />
              <div className="text-primary-foreground/80">
                <a href="mailto:info@popwale.in" className="hover:text-accent-light transition-colors">
                  info@popwale.in
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" />
              <div className="text-primary-foreground/80 leading-relaxed">
                <div className="font-medium">150 Feet Ring Rd</div>
                <div className="text-sm">Near The Spire, Sheetal Park</div>
                <div className="text-sm">Shastri Nagar, Dharam Nagar</div>
                <div className="text-sm font-medium mt-1">
                  Rajkot, Gujarat <span className="text-accent-light">360007</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2025 Popwale. All rights reserved.
            </div>
            <div className="text-primary-foreground/60 text-sm">
              Made with 💗 by <a href="https://www.somethingmedia.in/" target="_blank" rel="noopener noreferrer" className="text-accent-light font-medium hover:text-accent-light/80 transition-colors">Something Media</a>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/80 hover:text-accent-light transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/80 hover:text-accent-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;