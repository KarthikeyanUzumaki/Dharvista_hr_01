import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// 👇 YOUR LOGO IMPORT
import logo from "@/assets/favicon.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);

  // Keep CSS var for nav top to support sticky elements below header
  useEffect(() => {
    function updateNavTop() {
      const h = headerRef.current?.offsetHeight ?? 64;
      const topValue = isHidden ? '0px' : `${h}px`;
      document.documentElement.style.setProperty('--nav-top', topValue);
    }
    updateNavTop();
    window.addEventListener('resize', updateNavTop);
    return () => window.removeEventListener('resize', updateNavTop);
  }, [isHidden, isOpen]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      
      // If mobile menu is open, keep header visible
      if (isOpen) {
        lastScrollY.current = y;
        setIsHidden(false);
        return;
      }

      if (y > lastScrollY.current && y > 100) {
        // scrolling down
        setIsHidden(true);
      } else if (y < lastScrollY.current) {
        // scrolling up
        setIsHidden(false);
      }
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300",
        isHidden && "-translate-y-full"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* 🟢 LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 group">
             <div className="relative overflow-hidden rounded-md shadow-sm border border-gray-100 h-10 w-10">
               <img 
                 src={logo} 
                 alt="Dharvista Logo" 
                 className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
               />
             </div>
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">
               Dharvista
            </span>
          </Link>

          {/* 🟢 DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "nav-link text-sm uppercase tracking-wide font-medium text-gray-600 hover:text-primary transition-colors",
                  location.pathname === link.href && "text-primary font-bold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-4 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "nav-link text-base py-2 font-medium",
                    location.pathname === link.href && "text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}