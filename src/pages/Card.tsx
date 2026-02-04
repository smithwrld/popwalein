import { Helmet } from "react-helmet-async";
import { User, Globe, FileText, Instagram, Facebook, Phone, MapPin, Mail } from "lucide-react";
import popwaleLogo from "@/assets/popwale-logo.png";

const Card = () => {
  const contactLinks = [
    {
      icon: User,
      label: "Contact Info",
      href: "tel:+919898aborana",
      action: "contact"
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
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/popwale.in",
      external: true
    },
    {
      icon: Facebook,
      label: "Popwale | Rajkot",
      href: "https://facebook.com/popwale.in",
      external: true
    },
    {
      icon: Phone,
      label: "+91 98985 15888",
      href: "tel:+919898515888",
    },
    {
      icon: Mail,
      label: "info@popwale.in",
      href: "mailto:info@popwale.in",
    },
    {
      icon: MapPin,
      label: "Rajkot, Gujarat",
      href: "https://maps.google.com/?q=Popwale+Rajkot",
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
          {/* Header Section */}
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src={popwaleLogo} 
                alt="Popwale Logo" 
                className="w-28 h-auto"
              />
            </div>
            <h1 className="text-[22px] font-semibold text-primary tracking-tight">
              Popwale
            </h1>
            <p className="text-sm text-primary/70 mt-1">
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
