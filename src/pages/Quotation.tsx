import React from "react";
import { Helmet } from "react-helmet-async";
import EMISection from "@/components/EMISection";
import { QuotationBuilder } from "@/components/quotation/QuotationBuilder";

const Quotation = () => {
  return (    
    <>
      <Helmet>
        <title>Get Free P.O.P Quote Rajkot | Ceiling Design Estimate | Popwale Quotation</title>
        <meta name="description" content="Request free P.O.P ceiling quotes in Rajkot. Instant estimates for gypsum, grid, soundproof & stretch ceilings. 24-hour response, site visit included. EMI available. Compare prices & save on your ceiling project!" />
        <meta name="keywords" content="free POP quote Rajkot, ceiling design estimate Rajkot, P.O.P quotation Rajkot, gypsum ceiling cost Rajkot, interior design quote Rajkot, project estimate Rajkot, ceiling installation cost, free consultation Rajkot" />
        <link rel="canonical" href="https://www.popwale.in/quotation" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Get Free P.O.P Quote Rajkot | Ceiling Design Estimate | Popwale" />
        <meta property="og:description" content="Get free personalized P.O.P service quotes in Rajkot. Professional estimates for ceiling design, gypsum installation & decorative elements. Quick 24-hour response." />
        <meta property="og:url" content="https://www.popwale.in/quotation" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        <meta property="og:site_name" content="Popwale" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Free P.O.P Quote Rajkot | Ceiling Design Estimate" />
        <meta name="twitter:description" content="Get free personalized P.O.P service quotes in Rajkot. Professional estimates for ceiling design & decorative elements. Quick 24-hour response." />
        <meta name="twitter:image" content="https://www.popwale.in/popwale-social-logo.jpg" />
        
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Rajkot" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Free P.O.P Quote Service - Rajkot",
            "description": "Free quotation service for P.O.P ceiling design and installation projects in Rajkot",
            "provider": {
              "@type": "Organization",
              "name": "Popwale",
              "telephone": "+91-99090-94033",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rajkot",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              }
            },
            "areaServed": {
              "@type": "Place",
              "name": "Rajkot, Gujarat"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "description": "Free consultation and quotation for P.O.P services"
            }
          })}
        </script>
      </Helmet>
      
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="primary-gradient text-primary-foreground py-8 sm:py-12">
        <div className="container-curved">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
              Interactive Ceiling Quotation Builder
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Configure your space, pick your preferred brand materials, and receive a customized 
              bill-of-quantities estimate for your Rajkot project.
            </p>
          </div>
        </div>
      </section>

      {/* Progressive Quotation Builder Section */}
      <section className="py-6 sm:py-10 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <QuotationBuilder />
        </div>
      </section>

      {/* EMI Section */}
      <EMISection />
    </div>
    </>
  );
};

export default Quotation;