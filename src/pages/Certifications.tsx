import { Award, Shield, CheckCircle, Star, Users, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Certifications = () => {
  const certifications = [{
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "ISO 9001:2015 Certified",
    organization: "International Organization for Standardization",
    year: "2022",
    description: "Quality management systems certification ensuring consistent delivery of high-quality P.O.P services."
  }, {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Construction Safety Certificate",
    organization: "National Safety Council",
    year: "2023",
    description: "Comprehensive safety training and compliance certification for construction and installation work."
  }, {
    icon: <Trophy className="w-12 h-12 text-primary" />,
    title: "Excellence in Craftsmanship",
    organization: "Indian Building Congress",
    year: "2023",
    description: "Recognition for outstanding quality and innovation in plaster of paris design and installation."
  }, {
    icon: <Star className="w-12 h-12 text-primary" />,
    title: "Green Building Practices",
    organization: "IGBC - Indian Green Building Council",
    year: "2022",
    description: "Certification for implementing sustainable and eco-friendly practices in construction projects."
  }];
  
  const awards = [{
    title: "Best P.O.P Service Provider",
    year: "2023",
    organization: "Regional Business Excellence Awards"
  }, {
    title: "Innovation in Interior Design",
    year: "2022",
    organization: "State Interior Designers Association"
  }, {
    title: "Customer Satisfaction Excellence",
    year: "2023",
    organization: "Consumer Choice Awards"
  }, {
    title: "Quality Assurance Recognition",
    year: "2022",
    organization: "Building Materials Council"
  }];
  
  const memberships = ["Indian Building Congress (IBC)", "Associated Cement Companies Ltd. (ACC)", "Confederation of Indian Industry (CII)", "Builder's Association of India (BAI)", "National Association of Contractors", "Interior Design Society of India"];
  
  const qualityStandards = [{
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Premium Materials Only",
    description: "We use only ISI marked and certified materials from trusted manufacturers"
  }, {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Skilled Workforce",
    description: "All our craftsmen are trained professionals with minimum 5 years experience"
  }, {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Quality Assurance",
    description: "Multi-level quality checks at every stage of the project execution"
  }, {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Industry Standards",
    description: "Adherence to all national and international building codes and standards"
  }];

  return (
    <>
      <Helmet>
        <title>Professional Certifications & Awards | ISO Certified P.O.P Contractors Rajkot</title>
        <meta name="description" content="Popwale certifications: ISO 9001:2015 quality certified, industry awards & recognitions. Verified P.O.P contractors in Rajkot with proven excellence. Trust certified professionals for your ceiling project." />
        <meta name="keywords" content="ISO certified POP contractors Rajkot, professional certifications Rajkot, quality assurance Rajkot, industry awards Rajkot, certified craftsmen Rajkot, building certifications Gujarat" />
        <link rel="canonical" href="https://www.popwale.in/certifications" />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Popwale",
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "ISO 9001:2015 Certified",
                "credentialCategory": "Quality Management System"
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
                Certifications & Recognition
              </h1>
              <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
                Our commitment to excellence is validated by industry certifications, 
                awards, and the trust of our valued clients.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Certifications */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Professional Certifications
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional qualifications and achievements demonstrating expertise across P.O.P services, 
                safety standards, and innovation.
              </p>
            </div>

            <div className="space-y-12">
              {certifications.map((cert, index) => (
                <div key={index} className="card-elegant animate-fade-up" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Certificate Image Placeholder */}
                    <div className="order-2 lg:order-1">
                      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            {cert.icon}
                          </div>
                          <div className="space-y-2">
                            <div className="text-lg font-semibold text-foreground">Certificate Image</div>
                          </div>
                          <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block">
                            Upload your {cert.title} certificate
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="order-1 lg:order-2 space-y-4">
                      <div className="inline-block">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          CERTIFICATE OF ACHIEVEMENT
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground leading-tight">
                        {cert.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>

                      <div className="space-y-3 pt-4">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="font-medium text-foreground">{cert.organization}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">Issued: {cert.year}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">Status: Active & Valid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Awards & Recognition
              </h2>
              <p className="text-xl text-muted-foreground">
                Industry acknowledgments of our exceptional work and service
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="card-service text-center animate-fade-up" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <Trophy className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {award.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    {award.year}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {award.organization}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="section-padding bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-muted-foreground/10 rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 bg-muted/30 rounded-lg transform rotate-45"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-muted-foreground/10 rounded-lg"></div>
          </div>
          
          <div className="container-curved relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-xs font-medium text-primary bg-primary/20 px-4 py-2 rounded-full">
                  OUR COMMITMENT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Quality Standards
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our unwavering commitment to delivering exceptional quality in every project
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="text-center animate-fade-up bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {standard.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {standard.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Memberships */}
        <section className="section-padding bg-muted">
          <div className="container-curved">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Professional Memberships
              </h2>
              <p className="text-xl text-muted-foreground">
                Active participation in industry organizations and councils
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberships.map((membership, index) => (
                <div key={index} className="card-service text-center animate-fade-up" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-base font-medium text-foreground">
                    {membership}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="section-padding">
          <div className="container-curved">
            <div className="card-elegant text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Our Certifications Matter
              </h2>
              <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div className="animate-fade-up">
                  <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                  <div className="text-muted-foreground">Compliance with Safety Standards</div>
                </div>
                <div className="animate-fade-up" style={{
                  animationDelay: "0.1s"
                }}>
                  <div className="text-3xl font-bold text-gradient mb-2">5★</div>
                  <div className="text-muted-foreground">Quality Assurance Rating</div>
                </div>
                <div className="animate-fade-up" style={{
                  animationDelay: "0.2s"
                }}>
                  <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                  <div className="text-muted-foreground">Certified Installations</div>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Our certifications ensure that every project meets the highest industry standards 
                for quality, safety, and environmental responsibility. When you choose Popwale, 
                you're choosing certified excellence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Certifications;