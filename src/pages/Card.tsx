import { Helmet } from "react-helmet-async";
import { ArrowLeft, Globe, FileText, Instagram, Facebook, Phone, MapPin, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import popwaleLogo from "@/assets/popwale-mascot-logo.png";
import gyprocLogo from "@/assets/gyproc-logo.png";

const Card = () => {
  const contactLinks = [
    {
      icon: Phone,
      label: "+91 99090 94033",
      href: "tel:+919909094033",
    },
    {
      icon: Mail,
      label: "info@popwale.in",
      href: "mailto:info@popwale.in",
    },
    {
      icon: Instagram,
      label: "@popwale_in",
      href: "https://www.instagram.com/popwale_in/",
      external: true
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/channel/UC8lyfQ9Mc4fDzK0dW68TPxg",
      external: true
    },
    {
      icon: Globe,
      label: "Website",
      href: "https://www.popwale.in",
      external: true
    },
    {
      icon: FileText,
      label: "Services",
      href: "https://www.popwale.in/services",
      external: true
    },
    {
      icon: Facebook,
      label: "Popwale | Rajkot",
      href: "https://www.facebook.com/popwale.in/",
      external: true
    },
    {
      icon: MapPin,
      label: "150 Feet Ring Rd, Rajkot",
      href: "https://maps.google.com/?q=150+Feet+Ring+Rd+near+The+spire+Sheetal+Park+Shastri+Nagar+Dharam+Nagar+Rajkot+Gujarat+360007",
      external: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>Popwale - Digital Business Card | P.O.P Ceiling Services</title>
        <meta name="description" content="Popwale Digital Business Card - Premium P.O.P and Gypsum ceiling services in Rajkot, Gujarat. Contact us for all your ceiling needs." />
      </Helmet>

      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-white rounded-[20px] py-8 px-6">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>

          {/* Header Section */}
          <header className="mb-8">
            {/* Three Column Layout */}
            <div className="flex items-center justify-between gap-2 mb-4">
              {/* Left - Service Text */}
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-primary leading-tight">Ceiling Work Agency</p>
                <p className="text-[10px] text-primary/70 leading-tight">All types of ceiling work</p>
              </div>
              
              {/* Center - Popwale Logo */}
              <img 
                src={popwaleLogo} 
                alt="Popwale Logo" 
                className="w-24 h-auto flex-shrink-0"
              />
              
              {/* Right - Gyproc Branding */}
              <div className="flex-1 text-right">
                <p className="text-[8px] font-bold text-primary/80 leading-tight uppercase tracking-wide">Authorized Franchiser</p>
                <img 
                  src={gyprocLogo} 
                  alt="Gyproc by Saint-Gobain" 
                  className="h-6 w-auto ml-auto mt-1"
                />
              </div>
            </div>
            
            <h1 className="text-[22px] font-semibold text-primary tracking-tight text-center">
              P.O.P Wale
            </h1>
            <p className="text-sm text-primary/70 mt-1 text-center">
              Premium P.O.P & Ceiling Services
            </p>
          </header>

          {/* Action Buttons */}
          <main className="flex flex-col gap-3">
            {contactLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center h-14 px-3 bg-transparent border-[1.5px] border-primary rounded-[28px] no-underline transition-all duration-150 cursor-pointer hover:bg-primary/[0.08] hover:border-primary/80 active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  aria-label={link.label}
                >
                  <div className="flex items-center justify-center w-11 h-11 flex-shrink-0">
                    <IconComponent className="w-[22px] h-[22px] text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 text-[15px] font-medium text-primary px-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {link.label}
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-150">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-primary">
                      <circle cx="12" cy="6" r="1.5"></circle>
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="12" cy="18" r="1.5"></circle>
                    </svg>
                  </div>
                </a>
              );
            })}
          </main>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-primary/50">
              © {new Date().getFullYear()} Popwale. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Card;
