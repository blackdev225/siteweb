import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/featured", label: "Featured" },
  { href: "/gallery", label: "Gallery" },
  { href: "/interactive", label: "Interactive" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMobileMenuOpen(false), [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6",
          isScrolled || isMobileMenuOpen 
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-black/5" 
            : "bg-transparent text-white"
        )}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 z-50 relative">
            <Box className={cn("w-6 h-6 transition-colors", isScrolled || isMobileMenuOpen ? "text-black" : "text-current")} strokeWidth={1.5} />
            <span className={cn(
              "font-display font-bold text-xl tracking-tighter uppercase",
              isScrolled || isMobileMenuOpen ? "text-black" : "text-current"
            )}>
              Vision Studio 360
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors relative group py-2",
                  location === link.href 
                    ? (isScrolled ? "text-black" : "text-white") 
                    : (isScrolled ? "text-neutral-500 hover:text-black" : "text-white/70 hover:text-white")
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left",
                  location === link.href && "scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-black" : "text-white")} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "text-3xl font-display font-light uppercase tracking-tighter transition-colors",
                    location === link.href ? "text-black" : "text-neutral-400 hover:text-black"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
