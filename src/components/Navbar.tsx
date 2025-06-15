
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
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-background/90 border-b sticky top-0 z-50 backdrop-blur-md animate-fade-in">
      <Link to="/" className="flex items-center gap-2 animate-scale-in">
        <span className="text-2xl font-extrabold font-playfair tracking-tight text-primary hover:text-accent transition-colors duration-300">
          KM
        </span>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={location.pathname === '/' ? link.href : `/${link.href}`}
              className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 px-1 py-0.5 relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 px-1 py-0.5 relative group animate-fade-in"
            style={{ animationDelay: `${navLinks.length * 0.1}s` }}
          >
            All Posts
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
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
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="animate-scale-in hover:scale-110 transition-transform duration-200"
        >
          <Menu />
        </Button>
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-background/95 backdrop-blur-md rounded-md shadow-2xl flex flex-col p-4 gap-2 z-50 border animate-fade-in">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={location.pathname === '/' ? link.href : `/${link.href}`}
                className="text-muted-foreground hover:text-primary font-medium transition-colors px-2 py-1 rounded hover:bg-accent/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-primary font-medium transition-colors px-2 py-1 rounded hover:bg-accent/10 animate-fade-in"
              style={{ animationDelay: `${navLinks.length * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
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
