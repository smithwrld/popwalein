import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Popwale | Service Terms & Conditions</title>
        <meta name="description" content="Read Popwale's terms of service to understand our service conditions, policies, and your rights as our customer." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container-curved section-padding">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-elegant text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: December 2024
              </p>
            </header>

            <div className="prose prose-lg max-w-none space-y-8">
              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-card-foreground/80">
                  By engaging our services or using our website, you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Our Services
                </h2>
                <p className="text-card-foreground/80 mb-4">
                  Popwale provides professional ceiling design, installation, and related services including:
                </p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Grid ceiling systems design and installation</li>
                  <li>Gypsum board partitions and ceilings</li>
                  <li>Stretch ceiling solutions</li>
                  <li>PVC ceiling panels installation</li>
                  <li>Soundproof ceiling solutions</li>
                  <li>Custom P.O.P work and decorative elements</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Quotations and Pricing
                </h2>
                <p className="text-card-foreground/80 mb-4">
                  All quotations are valid for 30 days from the date of issue. Prices may vary based on:
                </p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Material costs fluctuations</li>
                  <li>Project complexity and scope changes</li>
                  <li>Site conditions and accessibility</li>
                  <li>Timeline requirements</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Payment Terms
                </h2>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>30% advance payment upon order confirmation</li>
                  <li>40% payment upon material delivery</li>
                  <li>30% final payment upon project completion</li>
                  <li>EMI options available for qualified customers</li>
                  <li>Late payment may incur additional charges</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Warranty and Guarantees
                </h2>
                <p className="text-card-foreground/80 mb-4">
                  We provide warranty coverage as follows:
                </p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>1 year warranty on workmanship</li>
                  <li>Material warranty as per manufacturer specifications</li>
                  <li>Free maintenance visit within 6 months</li>
                  <li>24/7 customer support for warranty claims</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-card-foreground/80">
                  Our liability is limited to the value of the contract. We are not liable for 
                  indirect, incidental, or consequential damages. Customer is responsible for 
                  site preparation and ensuring proper access for our team.
                </p>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Cancellation Policy
                </h2>
                <p className="text-card-foreground/80 mb-4">
                  Cancellation terms:
                </p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Before material order: Full refund minus 10% processing fee</li>
                  <li>After material order: Refund minus material costs and 25% cancellation fee</li>
                  <li>After work commencement: No refund available</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-card-foreground/80">
                  For questions about these Terms of Service, contact us at:
                </p>
                <div className="mt-4 text-card-foreground/80">
                  <p>Email: info@popwale.in</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Address: 150 Feet Ring Rd, near The spire
Sheetal Park, Shastri Nagar
Dharam Nagar, Rajkot, Gujarat 360007</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;