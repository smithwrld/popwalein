import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Send, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import EMISection from "@/components/EMISection";

const Quotation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    area: "",
    location: "",
    description: "",
    services: [] as string[]
  });

  const serviceOptions = [
    "Gypsum Ceiling",
    "Grid Ceiling", 
    "Soundproof Ceiling",
    "PVC Ceiling",
    "Stretch Ceiling"
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare message for WhatsApp
    const message = `🏗️ *New Quote Request*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
🏢 *Project Type:* ${formData.projectType || "Not specified"}
📏 *Area:* ${formData.area ? formData.area + " sq.ft" : "Not specified"}
📍 *Location:* ${formData.location}
🛠️ *Services:* ${formData.services.length > 0 ? formData.services.join(", ") : "Not specified"}
📝 *Description:* ${formData.description || "No additional details provided"}`;
    
    // WhatsApp URL - using the web version for better compatibility
    const whatsappNumber = "919909094033";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    console.log("WhatsApp URL:", whatsappUrl);
    
    try {
      // Try to open WhatsApp
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (!newWindow) {
        // If popup blocked, show the URL to user
        toast({
          title: "Please enable popups",
          description: "Copy this link to send via WhatsApp: " + whatsappUrl,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Redirecting to WhatsApp!",
        description: "Your quote details are being sent via WhatsApp.",
      });
      
      // Reset form after successful redirect
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          area: "",
          location: "",
          description: "",
          services: []
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast({
        title: "Error opening WhatsApp",
        description: "Please contact us directly at +91 99090 94033",
        variant: "destructive",
      });
    }
  };

  const estimateSteps = [
    {
      icon: <Calculator className="w-6 h-6 text-primary" />,
      title: "Fill the Form",
      description: "Provide detailed information about your project requirements"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Review & Analysis",
      description: "Our experts analyze your needs and prepare a detailed estimate"
    },
    {
      icon: <Send className="w-6 h-6 text-primary" />,
      title: "Receive Quote",
      description: "Get a comprehensive quotation within 24 hours"
    }
  ];

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
      {/* Hero Section */}
      <section className="primary-gradient text-primary-foreground section-padding">
        <div className="container-curved">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get Your Free P.O.P Quote - Rajkot
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              Tell us about your ceiling design project in Rajkot and receive a detailed, 
              personalized quotation tailored to your needs within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-muted">
        <div className="container-curved">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to get your personalized quote
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {estimateSteps.map((step, index) => (
              <div key={index} className="card-service text-center animate-fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section-padding">
        <div className="container-curved">
          <div className="max-w-4xl mx-auto">
            <div className="card-elegant animate-scale-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Project Details Form
                </h2>
                <p className="text-muted-foreground">
                  Please provide as much detail as possible for an accurate quote
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="rounded-curved"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="rounded-curved"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="rounded-curved"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Project Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                      className="rounded-curved"
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                      <SelectTrigger className="rounded-curved">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="new-construction">New Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq.ft)</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                      placeholder="e.g., 1200"
                      className="rounded-curved"
                    />
                  </div>
                </div>


                {/* Services Required */}
                <div className="space-y-4">
                  <Label>Services Required</Label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                        />
                        <Label htmlFor={service} className="text-sm font-normal">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please describe your project requirements, design preferences, and any specific details..."
                    className="rounded-curved min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full btn-hero">
                  Submit Quote Request
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Section */}
      <EMISection />
    </div>
    </>
  );
};

export default Quotation;