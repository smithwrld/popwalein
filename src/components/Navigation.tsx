import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import NavHeader from "@/components/ui/nav-header";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Quotation", path: "/quotation" },
    { name: "Gallery", path: "/gallery" },
    { name: "Certifications", path: "/certifications" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Card", path: "/card" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <NavHeader 
          items={navItems} 
          showUserIcon={true}
          userIconPath={user ? "/admin" : "/auth"}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed right-4 top-6 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-primary/30 hover:bg-black/80 transition-colors z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed top-20 right-4 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-2xl p-2 min-w-48 z-40">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="border-t border-white/20 pt-2 mt-2">
              {user ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-white/60 text-xs font-medium">
                    Logged in as Admin
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 block"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;