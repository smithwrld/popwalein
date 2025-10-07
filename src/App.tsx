import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import CeilingDesign from "./pages/services/CeilingDesign";
import GypsumCeiling from "./pages/services/GypsumCeiling";
import GridCeiling from "./pages/services/GridCeiling";
import SoffitCeiling from "./pages/services/SoffitCeiling";
import StretchCeiling from "./pages/services/StretchCeiling";
import PunningWork from "./pages/services/PunningWork";


import Quotation from "./pages/Quotation";
import Gallery from "./pages/Gallery";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminPanel = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      {isAdminPanel ? (
        // Admin panel without navigation and footer
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      ) : (
        // Regular app with navigation and footer
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/ceiling-design" element={<CeilingDesign />} />
              <Route path="/services/gypsum-ceiling" element={<GypsumCeiling />} />
              <Route path="/services/grid-ceiling" element={<GridCeiling />} />
              <Route path="/services/soffit-ceiling" element={<SoffitCeiling />} />
              <Route path="/services/punning-work" element={<PunningWork />} />
              <Route path="/services/stretch-ceiling" element={<StretchCeiling />} />
              <Route path="/quotation" element={<Quotation />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
