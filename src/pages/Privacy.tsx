import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Popwale | Your Privacy Matters</title>
        <meta name="description" content="Read Popwale's privacy policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container-curved section-padding">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-elegant text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: December 2024
              </p>
            </header>

            <div className="prose prose-lg max-w-none space-y-8">
              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="text-card-foreground/80 mb-4">
                  We collect information you provide directly to us, such as when you contact us for quotes, 
                  schedule consultations, or communicate with our team.
                </p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Name and contact information (phone, email, address)</li>
                  <li>Project details and requirements</li>
                  <li>Communication preferences</li>
                  <li>Website usage data through cookies</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Provide quotes and project consultations</li>
                  <li>Schedule and manage appointments</li>
                  <li>Communicate about services and updates</li>
                  <li>Improve our services and website experience</li>
                  <li>Send promotional materials (with your consent)</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Information Sharing
                </h2>
                <p className="text-card-foreground/80">
                  We do not sell, trade, or share your personal information with third parties 
                  except as described in this policy. We may share information with trusted 
                  service providers who assist us in operating our business, subject to 
                  confidentiality agreements.
                </p>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Data Security
                </h2>
                <p className="text-card-foreground/80">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Your Rights
                </h2>
                <p className="text-card-foreground/80 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-card-foreground/80 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section className="bg-card p-8 rounded-curved shadow-soft">
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-card-foreground/80">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 text-card-foreground/80">
                  <p>Email: info@popwale.in</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>150 Feet Ring Rd, near The spire
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

export default Privacy;