
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav 
      className="w-full flex justify-between items-center py-3 md:py-4 px-4 md:px-6 bg-background/90 border-b sticky top-0 z-50 backdrop-blur-md animate-fade-in"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 animate-scale-in p-2 rounded-lg hover:bg-accent/10 transition-colors min-h-[44px] min-w-[44px] justify-center md:justify-start"
        aria-label="Kundhan Miriyala - Home"
      >
        <span className="text-xl md:text-2xl font-extrabold font-playfair tracking-tight text-primary hover:text-accent transition-colors duration-300">
          KM
        </span>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex gap-6" role="menubar">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={location.pathname === '/' ? link.href : `/${link.href}`}
              className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 px-3 py-2 relative group animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="menuitem"
              aria-label={`Navigate to ${link.label} section`}
            >
              {link.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" aria-hidden="true" />
            </a>
          ))}
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 px-3 py-2 relative group animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded min-h-[44px] flex items-center"
            style={{ animationDelay: `${navLinks.length * 0.1}s` }}
            role="menuitem"
            aria-label="View all blog posts"
          >
            All Posts
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" aria-hidden="true" />
          </Link>
        </div>
        <ThemeToggle />
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="animate-scale-in hover:scale-110 transition-transform duration-200 min-h-[44px] min-w-[44px]"
        >
          <Menu aria-hidden="true" />
        </Button>
        {menuOpen && (
          <div 
            id="mobile-menu"
            className="absolute top-16 right-4 left-4 md:left-auto md:right-6 md:w-64 bg-background/95 backdrop-blur-md rounded-md shadow-2xl flex flex-col p-4 gap-1 z-50 border animate-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={location.pathname === '/' ? link.href : `/${link.href}`}
                className="text-muted-foreground hover:text-primary font-medium transition-colors px-4 py-3 rounded hover:bg-accent/10 animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[48px] flex items-center"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setMenuOpen(false)}
                role="menuitem"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-primary font-medium transition-colors px-4 py-3 rounded hover:bg-accent/10 animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[48px] flex items-center"
              style={{ animationDelay: `${navLinks.length * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
              aria-label="View all blog posts"
            >
              All Posts
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
