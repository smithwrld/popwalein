import { Building2, Shield, Award, Star } from "lucide-react";

interface GyprocPartnershipProps {
  variant?: "home" | "about" | "contact";
  className?: string;
}

const GyprocPartnership = ({ variant = "home", className = "" }: GyprocPartnershipProps) => {
  const isHome = variant === "home";
  const isContact = variant === "contact";
  
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-primary"></div>
        <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full bg-primary"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-primary"></div>
      </div>
      
      <div className="container-curved relative z-10">
        <div className={`card-elegant ${isHome ? 'p-8' : 'p-6 md:p-8'} text-center`}>
          
{/* Partnership Logo */}
<div className="inline-flex items-center justify-center rounded-2xl p-4 mb-6">
  <img 
    src="/uploads/fdfdd7dd-5f7e-4fca-907e-c148b7204f91.png" 
    alt="Gyproc by Saint-Gobain Logo" 
    className="h-36 w-auto object-contain"  // increased height from h-24 to h-36
  />
</div>


          {/* Main Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
              <Shield className="w-4 h-4 mr-2" />
              Authorized Franchise Partner
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Proud Partner of{" "}
              <span className="text-gradient font-extrabold">Gyproc</span>
              <span className="text-muted-foreground text-lg ml-2">by Saint-Gobain</span>
            </h3>
            
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              As an authorized franchise partner of Gyproc, India's leading brand for designer false ceilings 
              and drywall solutions, we bring you world-class quality and innovation backed by Saint-Gobain's 
              350+ years of expertise.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Premium Quality</h4>
                <p className="text-sm text-muted-foreground">Genuine Gyproc materials with assured quality standards</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Expert Installation</h4>
                <p className="text-sm text-muted-foreground">Certified technicians trained by Gyproc standards</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Warranty Assurance</h4>
                <p className="text-sm text-muted-foreground">Extended warranty coverage on all Gyproc products</p>
              </div>
            </div>

            {!isContact && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Gyproc by Saint-Gobain</span> - 
                  Trusted by millions for designer false ceilings, drywalls, and innovative interior solutions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GyprocPartnership;