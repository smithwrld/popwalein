import { CreditCard, Calculator, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const EMISection = () => {
  const emiFeatures = [{
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "Flexible Payment Plans",
    description: "Choose from 3, 6, 12, or 24-month EMI options that suit your budget"
  }, {
    icon: <Calculator className="w-6 h-6 text-primary" />,
    title: "Zero Processing Fee",
    description: "No hidden charges or processing fees - transparent pricing always"
  }, {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Secure Transactions",
    description: "Bank-grade security with trusted payment partners for peace of mind"
  }, {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Instant Approval",
    description: "Quick EMI approval process - start your project without delay"
  }];
  const projectTypes = ["Home Ceiling Renovation", "Office Interior Setup", "Restaurant Decoration", "Residential False Ceiling", "Commercial P.O.P Work", "Decorative Elements"];
  return <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-accent"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-secondary"></div>
      </div>

      <div className="container-curved relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-gradient">POP & Ceiling Services</span> on EMI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get premium POP work and ceiling installations with flexible EMI plans. 
              Transform your space now, pay later in easy monthly installments.
              <span className="block mt-2 text-lg font-medium text-primary">Credit card required for EMI processing</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Side - EMI Benefits */}
            <div className="animate-slide-in">
              <div className="card-elegant">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Why Choose Popwale EMI?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe everyone deserves beautiful spaces. Our EMI system makes 
                    premium P.O.P services accessible with convenient payment plans.
                  </p>
                </div>

                <div className="space-y-6">
                  {emiFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-border">
                  <Link to="/quotation">
                    <Button className="w-full btn-hero group">
                      Get EMI Quote Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Project Types & Trust Elements */}
            <div className="animate-scale-in">
              <div className="space-y-8">
                {/* Project Types */}
                <div className="card-service">
                  <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                    Perfect For All Projects
                  </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {projectTypes.map((project, index) => <div key={index} className="flex items-center space-x-3 animate-fade-up" style={{
                    animationDelay: `${index * 0.1}s`
                  }}>
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{project}</span>
                      </div>)}
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card-service text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gradient mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Secure</div>
                  </div>
                  <div className="card-service text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gradient mb-1">24 Hrs</div>
                    <div className="text-sm text-muted-foreground">Approval</div>
                  </div>
                </div>

                {/* EMI Calculator Preview */}
                <div className="card-service bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                  <div className="text-center">
                    <Calculator className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">
                      EMI Starting From
                    </h4>
                    <div className="text-3xl font-bold text-gradient mb-1">₹5,000</div>
                    <div className="text-sm text-muted-foreground">per month*</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      *Terms and conditions apply. EMI amount depends on project value and tenure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          
        </div>
      </div>
    </section>;
};
export default EMISection;