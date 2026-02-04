import { Helmet } from "react-helmet-async";
import { Phone, Mail, Instagram, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import popwaleLogo from "@/assets/popwale-card-logo.png";

const Card = () => {
  const contactLinks = [
    {
      icon: Phone,
      label: "+91 99090 94033",
      href: "tel:+919909094033",
    },
    {
      icon: Mail,
      label: "popwale33@gmail.com",
      href: "mailto:popwale33@gmail.com",
    },
    {
      icon: Instagram,
      label: "@popwale.in",
      href: "https://instagram.com/popwale.in",
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
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src={popwaleLogo} 
                alt="P.O.P Wale Logo" 
                className="w-52 h-auto"
              />
            </div>
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
